// ===== 岐黄·辅助诊疗系统 - 智谱 GLM-4V-Flash 视觉识别前端封装 =====
// 职责：图片读取/压缩、经 Vercel 代理调用智谱、JSON 解析、按规则表校验回填、Prompt 生成。
// 依赖浏览器 API：FileReader / canvas / fetch / AbortController。

const GLM_CONFIG = {
    proxyUrl: 'https://<your-vercel-app>.vercel.app/api/glm', // 占位符，部署后替换（见 README 部署说明）
    model: 'glm-4.6v-flash',
    enabled: true,
    timeoutMs: 60000,
    retries: 3,             // 429/5xx/网络错误时的重试次数
    retryBaseMs: 2000,      // 指数退避基准：2s、4s、8s
    maxImageBytes: 5 * 1024 * 1024,
    maxImageEdge: 2000,     // 压缩后最长边
    jpegQuality: 0.9
};

// 代理地址可被 <meta name="glm-proxy-url" content="https://..."> 覆盖（部署免改 JS）
(function resolveProxy() {
    try {
        const meta = document.querySelector && document.querySelector('meta[name="glm-proxy-url"]');
        if (meta && meta.content) GLM_CONFIG.proxyUrl = meta.content;
    } catch (e) { /* 静默 */ }
    if (!GLM_CONFIG.proxyUrl || GLM_CONFIG.proxyUrl.indexOf('<your-vercel-app>') !== -1) {
        GLM_CONFIG.enabled = false;
    }
})();

/**
 * 读取图片 → 校验 → canvas 压缩 → base64 data URL
 * @param {File} file
 * @returns {Promise<string>} data:image/jpeg;base64,...
 * @throws {{code:string,message:string}} code: FORMAT | SIZE | READ_ERROR | COMPRESS_ERROR
 */
function readImage(file) {
    return new Promise((resolve, reject) => {
        const okTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!file || okTypes.indexOf(file.type) === -1) {
            return reject({ code: 'FORMAT', message: '仅支持 JPG/PNG 图片' });
        }
        if (file.size > GLM_CONFIG.maxImageBytes) {
            return reject({ code: 'SIZE', message: '图片不能超过 5MB' });
        }
        const reader = new FileReader();
        reader.onerror = () => reject({ code: 'READ_ERROR', message: '图片读取失败' });
        reader.onload = () => {
            const img = new Image();
            img.onerror = () => reject({ code: 'READ_ERROR', message: '图片解码失败' });
            img.onload = () => {
                try {
                    const dataUrl = compressToJpeg(img, GLM_CONFIG.maxImageEdge, GLM_CONFIG.jpegQuality);
                    resolve(dataUrl);
                } catch (e) {
                    reject({ code: 'COMPRESS_ERROR', message: '图片压缩失败' });
                }
            };
            img.src = reader.result;
        };
        reader.readAsDataURL(file);
    });
}

/** 等比缩放至最长边 ≤ maxEdge，转 JPEG（PNG 透明底先垫白） */
function compressToJpeg(img, maxEdge, quality) {
    let width = img.naturalWidth || img.width;
    let height = img.naturalHeight || img.height;
    const scale = Math.min(1, maxEdge / Math.max(width, height));
    width = Math.round(width * scale);
    height = Math.round(height * scale);
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, width, height); // PNG 透明垫白
    ctx.drawImage(img, 0, 0, width, height);
    return canvas.toDataURL('image/jpeg', quality);
}

/**
 * 发送视觉识别请求（超时 + 指数退避重试 + 错误分类）
 * @param {string} analysisType 'face' | 'tongue'
 * @param {string} imageBase64  readImage 返回的 data URL
 * @param {string} userPrompt   中文中医望诊 prompt
 * @returns {Promise<string>} 模型返回的纯文本（应为 JSON）
 * @throws {{code:string,message:string}} code: DISABLED|NO_PROXY|TIMEOUT|NETWORK|HTTP_401|HTTP_429|HTTP_5xx|HTTP_xxx|BAD_RESPONSE
 */
async function analyzeImage(analysisType, imageBase64, userPrompt) {
    if (!GLM_CONFIG.enabled) throw { code: 'DISABLED', message: 'AI 识别未启用（未配置代理地址）' };
    if (!GLM_CONFIG.proxyUrl) throw { code: 'NO_PROXY', message: '代理地址未配置' };

    const payload = {
        model: GLM_CONFIG.model,
        messages: [{
            role: 'user',
            content: [
                { type: 'image_url', image_url: { url: imageBase64 } },
                { type: 'text', text: userPrompt }
            ]
        }],
        max_tokens: 2048,   // 推理模型需预留推理 token 空间
        temperature: 0.1
    };

    let lastErr = null;
    for (let attempt = 0; attempt <= GLM_CONFIG.retries; attempt++) {
        if (attempt > 0) {
            const wait = GLM_CONFIG.retryBaseMs * Math.pow(2, attempt - 1); // 1s、3s
            await new Promise(r => setTimeout(r, wait));
        }
        try {
            return await postOnce(analysisType, payload);
        } catch (err) {
            lastErr = err;
            const retriable = ['HTTP_429', 'HTTP_5xx', 'NETWORK', 'TIMEOUT'].indexOf(err.code) !== -1;
            if (!retriable) break; // 401/400/格式错误等不重试
        }
    }
    throw lastErr;
}

async function postOnce(analysisType, payload) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), GLM_CONFIG.timeoutMs);
    let resp;
    try {
        resp = await fetch(GLM_CONFIG.proxyUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-Analysis-Type': analysisType },
            body: JSON.stringify(payload),
            signal: controller.signal
        });
    } catch (err) {
        clearTimeout(timer);
        if (err && err.name === 'AbortError') throw { code: 'TIMEOUT', message: 'AI 识别超时（30s）' };
        throw { code: 'NETWORK', message: '网络异常，请检查网络连接' };
    }
    clearTimeout(timer);

    let data = null;
    try { data = await resp.json(); } catch (e) { data = null; }

    if (resp.status === 401) throw { code: 'HTTP_401', message: 'AI 服务鉴权失败（代理 Key 无效）' };
    if (resp.status === 429) throw { code: 'HTTP_429', message: 'AI 服务繁忙（限流），请稍后重试' };
    if (resp.status >= 500) throw { code: 'HTTP_5xx', message: 'AI 服务异常（' + resp.status + '），请稍后重试' };
    if (!resp.ok) throw { code: 'HTTP_' + resp.status, message: 'AI 识别失败（' + resp.status + '）' };

    const content = data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
    if (!content || typeof content !== 'string') throw { code: 'BAD_RESPONSE', message: 'AI 返回格式异常' };
    return content;
}

/**
 * 剥离 markdown 代码围栏，提取首个完整 JSON 对象
 * @param {string} text
 * @returns {Object|null}
 */
function parseVisionJSON(text) {
    if (!text) return null;
    let s = text.trim();
    // 去掉 ```json ... ``` / ``` ... ``` 围栏
    s = s.replace(/^\s*```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '');
    s = s.trim();
    const start = s.indexOf('{');
    if (start === -1) return null;
    let depth = 0, inStr = false, esc = false;
    for (let i = start; i < s.length; i++) {
        const ch = s[i];
        if (inStr) {
            if (esc) { esc = false; continue; }
            if (ch === '\\') { esc = true; continue; }
            if (ch === '"') inStr = false;
            continue;
        }
        if (ch === '"') { inStr = true; continue; }
        if (ch === '{') { depth++; continue; }
        if (ch === '}') {
            depth--;
            if (depth === 0) {
                try { return JSON.parse(s.slice(start, i + 1)); }
                catch (e) { return null; }
            }
        }
    }
    return null;
}

// 模型常见口语化输出 → 规则表 value
const _aliasMap = {
    '舌质淡红': '淡红', '舌淡': '淡白', '色淡': '淡白', '淡胖': '胖大',
    '深红': '绛红', '紫暗': '青紫', '瘀斑': '青紫', '芒刺': '点刺',
    '面白': '淡白', '面色苍白': '淡白', '面色晄白': '淡白', '面色黄': '萎黄',
    '面赤': '赤红', '两颧红': '赤红', '面色青': '晦暗', '青紫面': '晦暗',
    '苔薄': '薄', '苔厚': '厚', '苔腻': '腻', '苔燥': '燥', '苔润': '润',
    '黄腻': '黄', '白腻': '白', '薄白': '白', '黄燥': '黄'
};

/** 归一化：去空格 + 转小写 */
function _norm(v) {
    return String(v || '').replace(/\s+/g, '').toLowerCase();
}

/** 单值匹配：候选 value 与模型输出是否等价 */
function _matchValue(candidate, raw) {
    const c = _norm(candidate), r = _norm(raw);
    if (!r) return false;
    if (c === r) return true; // 完全一致
    if (c.indexOf(r) !== -1 || r.indexOf(c) !== -1) return true; // "红"∈"淡红" 双向子串
    const alias = _aliasMap[r];
    if (alias && _norm(alias) === c) return true;
    if (r.indexOf('苔') !== -1 && c === r.replace('苔', '')) return true; // "白苔"→"白"
    if (r.indexOf('面色') !== -1 && c === r.replace('面色', '')) return true; // "面色红润"→"红润"
    return false;
}

/**
 * 将模型解析出的对象映射为可回填的 selection（仅接受合法 value）
 * @param {Object} rules  FaceRules | TongueRules
 * @param {Object} parsed parseVisionJSON 的结果
 * @returns {Object} { fieldKey: [合法value,...] }
 */
function mapToSelection(rules, parsed) {
    const selection = {};
    if (!rules || !rules.fields || !parsed) return selection;
    rules.fields.forEach(field => {
        const raw = parsed[field.key];
        if (raw === undefined || raw === null) return;
        const raws = Array.isArray(raw) ? raw : [raw];
        const matched = [];
        raws.forEach(r => {
            const s = String(r).trim();
            if (!s || s === '不确定' || s === '无法确定' || s === '不清楚') return; // 空/不确定 → 跳过
            const opt = field.options.find(o => _matchValue(o.value, s));
            if (opt && matched.indexOf(opt.value) === -1) matched.push(opt.value);
        });
        if (matched.length) selection[field.key] = matched;
    });
    return selection;
}

/**
 * 依据规则表动态生成中文望诊 prompt（规则表变更自动同步取值列表）
 * @param {string} analysisType 'face' | 'tongue'
 * @param {Object} rules FaceRules | TongueRules
 * @returns {string}
 */
function buildPrompt(analysisType, rules) {
    const lines = [];
    const subject = analysisType === 'tongue' ? '舌象' : '面部';
    lines.push('你是专业中医望诊助手。请仔细观察这张' + subject + '照片，按以下字段输出结构化识别结果。');
    lines.push('');
    lines.push('字段及可选值（必须严格从下列取值中选择，不得自造、不得超出范围）：');

    (rules.fields || []).forEach(field => {
        const opts = (field.options || []).map(o => o.value).join('、');
        lines.push('- ' + field.key + '（' + field.label + (field.multi ? '，可多选' : '，单选') + '）：' + opts);
    });

    lines.push('');
    lines.push('输出要求：');
    lines.push('1. 只输出一个 JSON 对象，不要任何解释、思考过程、注释、markdown 代码围栏或其他文字。');
    lines.push('2. 单选字段输出字符串；某字段无法确定时输出空字符串 ""。');
    lines.push('3. 多选字段输出 JSON 数组；无发现时输出空数组 []。');
    lines.push('4. 若图片不是清晰' + subject + '或无法辨识，单选字段输出 ""，多选字段输出 []。');
    lines.push('5. 直接给出 JSON 结果，禁止输出分析过程。');

    const sample = analysisType === 'tongue'
        ? '{"tongueColor":"红","tongueShape":"胖大","coatingColor":"白","coatingQuality":"腻"}'
        : '{"faceColor":"红润","faceLuster":"荣润","facePart":["口唇"],"faceFeature":["痤疮"]}';
    lines.push('');
    lines.push('JSON 格式示例（仅示意格式，请按实际观察填写）：');
    lines.push(sample);
    return lines.join('\n');
}

// 全局导出
const GLMVision = {
    GLM_CONFIG: GLM_CONFIG,
    readImage: readImage,
    compressToJpeg: compressToJpeg,
    analyzeImage: analyzeImage,
    parseVisionJSON: parseVisionJSON,
    mapToSelection: mapToSelection,
    buildPrompt: buildPrompt
};

if (typeof window !== 'undefined') {
    window.GLMVision = GLMVision;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GLMVision };
}
