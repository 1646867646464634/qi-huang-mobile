// ===== 岐黄·辅助诊疗系统 - 危重症状红旗警示 =====
// 命中下列症状组合时，强制提示用户立即就医，避免因依赖辅助工具而延误诊疗。
const DANGER_SIGNALS = {
    '胸痛': '剧烈胸痛或压榨样疼痛',
    '剧烈头痛': '突发剧烈头痛',
    '高热': '高热(≥39℃)持续不退',
    '呼吸困难': '进行性呼吸困难',
    '意识障碍': '意识模糊或昏迷',
    '大量出血': '呕血、咯血、便血等大量出血',
    '呕血': '呕血或柏油样黑便',
    '黑便': '呕血或柏油样黑便',
    '剧烈腹痛': '剧烈腹痛伴腹肌紧张',
    '晕厥': '突然晕倒、不省人事'
};

/**
 * 检查症状列表中是否包含危重信号
 * @param {string[]|string} symptomList - 症状数组或逗号分隔字符串
 * @returns {Array<{key:string, desc:string}>} 命中的危重信号（按字典序去重）
 */
function checkDangerSymptoms(symptomList) {
    if (!symptomList) return [];
    const list = Array.isArray(symptomList) ? symptomList : String(symptomList).split(/[,，、]/);
    const hitSet = new Set();
    const result = [];

    Object.entries(DANGER_SIGNALS).forEach(([key, desc]) => {
        // 包含匹配：选中"胸痛"或"胸痛胸闷"均命中"胸痛"
        const matched = list.some(s => s && s.includes(key));
        if (matched && !hitSet.has(key)) {
            hitSet.add(key);
            result.push({ key, desc });
        }
    });
    return result;
}

/**
 * 生成危重信号红色横幅 HTML（无命中返回空串）
 */
function dangerBannerHTML(symptomList) {
    const hits = checkDangerSymptoms(symptomList);
    if (hits.length === 0) return '';
    const detail = hits.map(h => `${h.key}（${h.desc}）`).join('、');
    return `
        <div class="danger-banner" role="alert">
            ⚠ 您选择的症状包含危重信号：${detail}。请立即前往急诊就医，勿延误！
        </div>
    `;
}

// 浏览器全局导出
if (typeof window !== 'undefined') {
    window.DANGER_SIGNALS = DANGER_SIGNALS;
    window.checkDangerSymptoms = checkDangerSymptoms;
    window.dangerBannerHTML = dangerBannerHTML;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DANGER_SIGNALS, checkDangerSymptoms, dangerBannerHTML };
}
