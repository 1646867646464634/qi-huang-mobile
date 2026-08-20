// ===== 岐黄·辅助诊疗系统 - GLM 对话前端封装（流式 SSE） =====
// 职责：系统提示构建、输入脱敏、前端限流、流式对话请求与 SSE 解析。
// 依赖：window.Storage（js/utils/storage.js）、window.Toast（js/utils/dom.js）

const GLM_CHAT_CONFIG = {
    proxyUrl: 'https://qi-huang-123.vercel.app/api/glm',
    model: 'glm-4.7-flash',          // 免费文本对话模型（200K 上下文，思考模型）
    enabled: true,
    timeoutMs: 60000,                // Vercel 函数 maxDuration=60s 上限对齐
    maxTokens: 4096,                 // 关闭 thinking 后 4K 足够
    temperature: 0.7,
    // 不传 thinking：GLM-4.7-Flash 是思考模型，传 disabled 可能导致模型把异常字段写入 content
    // 让模型用默认行为（启用思考），前端只取 content 字符串（rejection/空内容都有防御）
    // 前端本地限流（localStorage 计数，60s 内 ≤8 次）
    RATE_KEY: 'tcm_chat_ratelimit',
    RATE_WINDOW_MS: 60000,
    RATE_MAX: 8
};

// 复用 <meta name="glm-proxy-url"> 覆盖（与视觉 GLMVision 一致，部署免改 JS）
(function resolveChatProxy() {
    try {
        const meta = document.querySelector && document.querySelector('meta[name="glm-proxy-url"]');
        if (meta && meta.content) GLM_CHAT_CONFIG.proxyUrl = meta.content;
    } catch (e) { /* 静默 */ }
    if (!GLM_CHAT_CONFIG.proxyUrl || GLM_CHAT_CONFIG.proxyUrl.indexOf('<your-vercel-app>') !== -1) {
        GLM_CHAT_CONFIG.enabled = false;
    }
})();

/** 前端本地限流：返回 true 表示允许发送，超限返回 false（由模块 Toast 提示） */
function checkFrontRateLimit() {
    const now = Date.now();
    let rec = Storage.get(GLM_CHAT_CONFIG.RATE_KEY, null);
    if (!rec || now - rec.ts > GLM_CHAT_CONFIG.RATE_WINDOW_MS) rec = { ts: now, count: 0 };
    rec.count += 1;
    Storage.set(GLM_CHAT_CONFIG.RATE_KEY, rec);
    return rec.count <= GLM_CHAT_CONFIG.RATE_MAX;
}

/**
 * 脱敏：手机号 / 身份证 / 连续 8+ 数字 → 打码
 * 仅对字符串生效；非字符串返回空（避免 [object Object] 渗入 prompt）
 */
function sanitize(text) {
    if (typeof text !== 'string') return '';
    let s = text;
    s = s.replace(/1[3-9]\d{9}/g, '1**********');  // 手机号
    s = s.replace(/\d{17}[\dXx]/g, '***');          // 身份证
    s = s.replace(/\d{8,}/g, '***');                // 连续 8 位及以上数字
    return s;
}

/**
 * 构建 system prompt：中医科普助手人设 + 边界 + 脱敏画像 + 最近诊断记录摘要
 * @param {Object|null} profile Profile.get() 返回的画像对象
 * @param {Array|null} recentRecords Records.list() 前 3 条
 */
function buildSystemPrompt(profile, recentRecords) {
    const lines = [];
    lines.push('你是"岐黄·辅助诊疗系统"的中医健康科普助手，面向普通用户做中医知识科普与日常调理参考。');
    lines.push('');
    lines.push('回答原则：');
    lines.push('1. 用通俗中文，可引用中医基础理论（阴阳、气血、脏腑、经络、体质等）做科普解释。');
    lines.push('2. 只做健康科普与调理方向参考，不做医疗诊断、不承诺疗效、不给出具体处方与药物剂量。');
    lines.push('3. 涉及急危重症信号（剧烈胸痛、呼吸困难、意识障碍、大出血、持续高热等）时，必须明确提示用户立即前往正规医疗机构或急诊就医。');
    lines.push('4. 信息不足时主动询问关键信息（持续时间、伴随症状、既往病史），不臆测。');
    lines.push('5. 回答控制在 300 字以内，必要时分点。');

    const p = profile || {};
    const pf = [];
    if (p.age) pf.push('年龄：' + sanitize(p.age));
    if (p.gender) pf.push('性别：' + sanitize(p.gender));
    if (p.region) pf.push('所在地区：' + sanitize(p.region));
    if (p.pregnancyState && p.pregnancyState === 'pregnant') pf.push('孕产状态：妊娠期');
    if (p.pregnancyState && p.pregnancyState === 'nursing') pf.push('孕产状态：哺乳期');
    if (p.allergyHistory) pf.push('过敏史：' + sanitize(p.allergyHistory));
    if (p.chronicDisease) pf.push('慢病史：' + sanitize(p.chronicDisease));
    if (pf.length) {
        lines.push('');
        lines.push('用户健康画像（脱敏后，仅作背景参考）：');
        lines.push(pf.join('；') + '。');
    }

    const recs = (recentRecords || []).slice(0, 3);
    if (recs.length) {
        lines.push('');
        lines.push('最近诊断记录摘要（脱敏后，最多 3 条）：');
        recs.forEach((r, i) => {
            const symptoms = (r && r.input && Array.isArray(r.input.symptoms))
                ? r.input.symptoms.filter(x => typeof x === 'string').join('、')
                : '';
            const names = (Array.isArray(r && r.results))
                ? r.results.slice(0, 3).map(x => x && typeof x.name === 'string' ? x.name : '').filter(Boolean).join('、')
                : '';
            lines.push((i + 1) + '. ' + (new Date(r.time)).toLocaleDateString('zh-CN') +
                ' 症状：' + symptoms +
                '；辨证：' + (names || '—'));
        });
    }
    lines.push('');
    lines.push('注意：以上背景信息由系统从本机画像与历史记录脱敏后提供，如与用户当前描述冲突，以用户当前描述为准。');
    return lines.join('\n');
}

function _classifyHttpError(status) {
    if (status === 401) return { code: 'HTTP_401', message: 'AI 服务鉴权失败（代理 Key 无效）' };
    if (status === 429) return { code: 'HTTP_429', message: 'AI 服务繁忙（限流），请稍后重试' };
    if (status >= 500) return { code: 'HTTP_5xx', message: 'AI 服务异常（' + status + '），请稍后重试' };
    return { code: 'HTTP_' + status, message: '请求失败（' + status + '）' };
}

/**
 * 流式对话（SSE）
 * @param {Array} messages 完整上下文（已含 system + 历史 + 新 user 消息）
 * @param {{onDelta?:function(string), onReasoning?:function(string), signal?:AbortSignal}} opts
 * @returns {Promise<string>} 完整正文（供落盘）
 * @throws {{code,message}} DISABLED|NO_PROXY|TIMEOUT|NETWORK|HTTP_401|HTTP_429|HTTP_5xx|HTTP_xxx|BAD_RESPONSE|STREAM_ERROR
 */
async function streamChat(messages, opts) {
    opts = opts || {};
    if (!GLM_CHAT_CONFIG.enabled) throw { code: 'DISABLED', message: 'AI 对话未启用（未配置代理地址）' };
    if (!GLM_CHAT_CONFIG.proxyUrl) throw { code: 'NO_PROXY', message: '代理地址未配置' };

    const onDelta = opts.onDelta || function () {};
    const onReasoning = opts.onReasoning || function () {};

    // 内部超时 + 外部停止信号（AbortSignal.any 现代浏览器可用）
    const timeoutController = new AbortController();
    const timer = setTimeout(() => timeoutController.abort(), GLM_CHAT_CONFIG.timeoutMs);
    const signal = (opts.signal && typeof AbortSignal.any === 'function')
        ? AbortSignal.any([opts.signal, timeoutController.signal])
        : timeoutController.signal;

    const payload = {
        model: GLM_CHAT_CONFIG.model,
        messages: messages,
        // 不传 thinking：让 GLM-4.7-Flash 用默认思考行为（content 字符串 + reasoning_content 可选）
        // 不传 stream：非流式 POST 一次性返回完整 JSON。Vercel Node runtime 对 SSE 流式支持不佳（连接池满/缓冲），
        // 非流式 2s 内返回，体验稳定。流式打字效果改为前端 setInterval 模拟。
        max_tokens: GLM_CHAT_CONFIG.maxTokens,
        temperature: GLM_CHAT_CONFIG.temperature
    };

    let resp;
    try {
        resp = await fetch(GLM_CHAT_CONFIG.proxyUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            signal: signal
        });
    } catch (err) {
        clearTimeout(timer);
        if (err && err.name === 'AbortError') throw { code: 'TIMEOUT', message: 'AI 对话超时（60s）' };
        throw { code: 'NETWORK', message: '网络异常，请检查网络连接' };
    }
    clearTimeout(timer);

    // HTTP 错误（含代理限流 429 / 智谱 401/429/5xx）
    if (!resp.ok) {
        let msg = null;
        try { const d = await resp.json(); msg = d && (d.message || d.error); } catch (e) {}
        const e = _classifyHttpError(resp.status);
        // 关键修复：智谱 429 限流可能返回 {"error":{...}} 嵌套结构，msg 可能是对象
        // 只接受字符串 message，避免 [object Object] 渗入前端气泡
        if (typeof msg === 'string') e.message = msg;
        throw e;
    }
    if (!resp.body) throw { code: 'BAD_RESPONSE', message: 'AI 返回格式异常' };

    // ---- 分支：流式（SSE） / 非流式（JSON）----
    const ct = (resp.headers.get('Content-Type') || '').toLowerCase();
    const isEventStream = ct.indexOf('text/event-stream') !== -1;

    if (!isEventStream) {
        // 非流式：一次性读取 JSON 提取 content（更快、更兼容 Vercel 部署）
        try {
            const text = await resp.text();
            let json = null;
            try { json = JSON.parse(text); } catch (e) { throw { code: 'BAD_RESPONSE', message: 'AI 返回 JSON 解析失败：' + text.slice(0, 100) }; }
            const msg = json && json.choices && json.choices[0] && json.choices[0].message;
            const content = msg && typeof msg.content === 'string' ? msg.content : '';
            const reasoning = msg && typeof msg.reasoning_content === 'string' ? msg.reasoning_content : '';
            if (reasoning) onReasoning(reasoning);
            if (!content) throw { code: 'BAD_RESPONSE', message: 'AI 返回内容为空' };
            onDelta(content);
            return content;
        } catch (err) {
            if (err && err.code) throw err;
            throw { code: 'BAD_RESPONSE', message: String((err && err.message) || err) };
        }
    }

    // ---- SSE 解析：buffer 按 \n\n 分块，逐行取 data: ----
    const reader = resp.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';
    let full = '';

    const emitEvent = (data) => {
        const json = JSON.parse(data);
        const delta = json && json.choices && json.choices[0] && json.choices[0].delta;
        if (!delta) return;
        if (typeof delta.reasoning_content === 'string' && delta.reasoning_content) {
            onReasoning(delta.reasoning_content);
        }
        if (typeof delta.content === 'string' && delta.content) {
            onDelta(delta.content);
            full += delta.content;
        }
    };
    const processBuffer = () => {
        let idx;
        while ((idx = buffer.indexOf('\n\n')) !== -1) {
            const block = buffer.slice(0, idx);
            buffer = buffer.slice(idx + 2);
            block.split('\n').forEach(line => {
                const t = line.trim();
                if (t.indexOf('data:') !== 0) return;
                const data = t.slice(5).trim();
                if (data === '[DONE]') return;
                try { emitEvent(data); } catch (e) { /* 跳过无法解析的分片 */ }
            });
        }
    };

    try {
        for (;;) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            processBuffer();
        }
        buffer += decoder.decode(); // 收尾 flush
        processBuffer();
    } catch (err) {
        if (err && err.name === 'AbortError') throw { code: 'TIMEOUT', message: 'AI 对话超时或已停止' };
        throw { code: 'STREAM_ERROR', message: '对话流中断：' + String((err && err.message) || err) };
    }

    if (!full) throw { code: 'BAD_RESPONSE', message: 'AI 返回内容为空' };
    return full;
}

const GLMChat = {
    GLM_CHAT_CONFIG: GLM_CHAT_CONFIG,
    streamChat: streamChat,
    buildSystemPrompt: buildSystemPrompt,
    sanitize: sanitize,
    checkFrontRateLimit: checkFrontRateLimit
};

if (typeof window !== 'undefined') window.GLMChat = GLMChat;
if (typeof module !== 'undefined' && module.exports) module.exports = { GLMChat };
