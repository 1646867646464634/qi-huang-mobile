// ===== api/glm.js — 智谱 GLM 代理（视觉识别 + AI 对话，均非流式） =====
// 职责：注入 ZHIPU_API_KEY、CORS、白名单透传、轻量限流、上游 JSON 透传。
// 重要：必须用 CommonJS `module.exports = (req, res)` + res.end() 写法。
//       Vercel Node runtime 只识别该签名并等待 res.end()；返回 Web `Response` 对象
//       仅对 ESM `export default` 生效，CommonJS 返回 Response 会导致响应挂起、前端超时。
// 部署后 URL: https://<your-vercel-app>.vercel.app/api/glm
// 注意：package.json 无 "type":"module"，用 CommonJS 导出。

const ZHIPU_ENDPOINT = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';
const DEFAULT_MAX_TOKENS = 2048;
const DEFAULT_TEMPERATURE = 0.1;
const UPSTREAM_TIMEOUT_MS = 60000;

// 白名单字段（stream/thinking 保留透传兼容；前端当前为非流式，stream 默认为 false）
const ALLOWED_FIELDS = ['model', 'messages', 'max_tokens', 'temperature', 'stream', 'thinking'];

// ---- CORS 头 ----
function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Analysis-Type');
  res.setHeader('Access-Control-Max-Age', '86400');
}

// ---- 轻量限流（Serverless 尽力而为：实例内存不共享，冷启动重置；前端另有 localStorage 限流兜底）----
const RATE_WINDOW_MS = 60000;
const RATE_MAX = 10;          // 60s 内同一 IP 最多 10 次
const MAX_MESSAGES = 40;      // 对话消息条数上限
const MAX_TOTAL_CHARS = 20000;// 对话消息总字符上限
const _rateMap = new Map();   // ip -> { count, ts }

function getClientIp(req) {
  const xff = req.headers['x-forwarded-for'];
  if (xff) return String(xff).split(',')[0].trim();
  return req.headers['x-real-ip'] || 'unknown';
}
function rateLimited(ip) {
  const now = Date.now();
  const rec = _rateMap.get(ip);
  if (!rec || now - rec.ts > RATE_WINDOW_MS) {
    _rateMap.set(ip, { count: 1, ts: now });
    return false;
  }
  rec.count += 1;
  return rec.count > RATE_MAX;
}
function messageTotalChars(messages) {
  let n = 0;
  (messages || []).forEach(m => {
    const c = m && m.content;
    if (typeof c === 'string') n += c.length;
    else if (Array.isArray(c)) c.forEach(p => { if (p && typeof p.text === 'string') n += p.text.length; });
  });
  return n;
}
function sendJson(res, status, obj) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(obj));
}

module.exports = async function handler(req, res) {
  // ---- CORS ----
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }
  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'method_not_allowed' });
  }

  // ---- Key 注入（仅存于 Vercel 环境变量） ----
  const apiKey = process.env.ZHIPU_API_KEY;
  if (!apiKey) {
    return sendJson(res, 500, { error: 'ZHIPU_API_KEY not configured on Vercel' });
  }

  // ---- 请求体白名单透传 ----
  let body = {};
  try { body = (req.body && typeof req.body === 'object') ? req.body : {}; } catch (e) { /* 非 JSON 忽略 */ }
  const payload = { messages: undefined };
  for (const k of ALLOWED_FIELDS) {
    if (body[k] !== undefined) payload[k] = body[k];
  }
  if (!Array.isArray(payload.messages) || payload.messages.length === 0) {
    return sendJson(res, 400, { error: 'messages array is required' });
  }
  if (!payload.model) payload.model = 'glm-4.6v-flash';
  if (payload.max_tokens === undefined) payload.max_tokens = DEFAULT_MAX_TOKENS;
  if (payload.temperature === undefined) payload.temperature = DEFAULT_TEMPERATURE;

  const isStream = payload.stream === true;
  if (isStream) {
    // 限流与长度校验仅作用于流式对话请求；非流式视觉路径保持原逻辑（避免 base64 图被误杀）
    if (rateLimited(getClientIp(req))) {
      return sendJson(res, 429, { error: 'rate_limited', message: '请求过于频繁，请稍后再试' });
    }
    if (payload.messages.length > MAX_MESSAGES || messageTotalChars(payload.messages) > MAX_TOTAL_CHARS) {
      return sendJson(res, 429, { error: 'payload_too_large', message: '对话内容过长，请精简后重试' });
    }
  }

  // ---- 转发智谱，60s 超时；客户端断开中止上游 ----
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);
  res.on('close', () => { if (!res.writableEnded && !controller.signal.aborted) controller.abort(); });

  try {
    const upstream = await fetch(ZHIPU_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    clearTimeout(timer);

    // 透传上游响应（JSON；若上游为 SSE 也原样透传文本，前端按 Content-Type 分支解析）
    const text = await upstream.text();
    res.statusCode = upstream.status;
    res.setHeader('Content-Type', upstream.headers.get('Content-Type') || 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    res.end(text);
  } catch (err) {
    clearTimeout(timer);
    if (err && err.name === 'AbortError') {
      return sendJson(res, 504, { error: 'upstream_timeout', message: '智谱 API 响应超时' });
    }
    return sendJson(res, 502, { error: 'upstream_error', message: String((err && err.message) || err) });
  }
};
