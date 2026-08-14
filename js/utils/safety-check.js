// ===== 岐黄·辅助诊疗系统 - 方剂/中药安全辅助 =====
// 十八反、十九畏、有毒药材限量、妊娠哺乳禁忌 检查
// 仅供学习参考，不构成用药建议。
const SAFETY = {
    // 十八反：每行三药（乌头类含 川乌/草乌/附子）
    INCOMPATIBILITY: [
        { group: '甘草反', herbs: ['甘草'], against: ['甘遂', '大戟', '海藻', '芫花'], detail: '甘草反甘遂、大戟、海藻、芫花' },
        { group: '乌头反', herbs: ['乌头', '川乌', '草乌', '附子'], against: ['半夏', '瓜蒌', '贝母', '白蔹', '白及'], detail: '乌头（含附子）反半夏、瓜蒌、贝母、白蔹、白及' },
        { group: '藜芦反', herbs: ['藜芦'], against: ['人参', '沙参', '丹参', '玄参', '细辛', '芍药'], detail: '藜芦反人参、沙参、丹参、玄参、细辛、芍药' }
    ],

    // 十九畏（歌诀：硫黄原是火中精，朴硝一见便相争…）
    FEAR: [
        { a: '硫黄', b: '朴硝', detail: '硫黄畏朴硝' },
        { a: '水银', b: '砒霜', detail: '水银畏砒霜' },
        { a: '狼毒', b: '密陀僧', detail: '狼毒畏密陀僧' },
        { a: '巴豆', b: '牵牛', detail: '巴豆畏牵牛（子）' },
        { a: '丁香', b: '郁金', detail: '丁香畏郁金' },
        { a: '川乌', b: '犀角', detail: '川乌、草乌畏犀角（广角）' },
        { a: '草乌', b: '犀角', detail: '川乌、草乌畏犀角（广角）' },
        { a: '牙硝', b: '三棱', detail: '牙硝畏三棱' },
        { a: '官桂', b: '石脂', detail: '官桂（肉桂）畏石脂' },
        { a: '人参', b: '五灵脂', detail: '人参畏五灵脂' }
    ],

    // 有毒药材限量参考（仅供学习，非处方依据）
    TOXIC_HERBS: {
        '附子': { limit: '3~15g，宜先煎0.5~1小时以减毒', note: '含乌头碱，中毒可致心律失常；孕妇忌服' },
        '川乌': { limit: '1.5~3g，先煎久煎', note: '毒性强，须炮制后入药' },
        '草乌': { limit: '1.5~3g，先煎久煎', note: '毒性强于川乌，须炮制后入药' },
        '细辛': { limit: '1~3g，不入散剂', note: '超量或长期使用有肾毒性风险' },
        '马钱子': { limit: '0.3~0.6g，炮制后入丸散', note: '含士的宁，过量可致惊厥' },
        '朱砂': { limit: '0.1~0.5g，入丸散，不宜久服', note: '含硫化汞，肝肾功能不全者忌用' },
        '雄黄': { limit: '0.05~0.1g，入丸散', note: '含砷化物，孕妇及肝肾功能不全者忌用' },
        '巴豆': { limit: '0.1~0.3g，入丸散', note: '峻下逐水，力猛，体虚者忌用' },
        '斑蝥': { limit: '0.03~0.06g，外用为主', note: '有大毒，内服极须谨慎' },
        '蟾酥': { limit: '0.015~0.03g，入丸散', note: '有毒，过量可致循环衰竭' },
        '甘遂': { limit: '0.5~1.5g，醋制，入丸散', note: '反甘草，孕妇忌用' },
        '大戟': { limit: '1.5~3g，醋制', note: '反甘草，孕妇忌用' },
        '芫花': { limit: '1.5~3g，醋制', note: '反甘草，孕妇忌用' },
        '洋金花': { limit: '0.3~0.6g，入丸散', note: '含东莨菪碱，过量致中毒' }
    },

    // 妊娠/哺乳禁忌（常见）
    PREGNANCY_BAN: ['麝香', '水蛭', '虻虫', '三棱', '莪术', '巴豆', '斑蝥', '马钱子', '牵牛子', '甘遂', '大戟', '芫花', '附子', '川乌', '草乌', '雄黄', '朱砂', '蟾酥', '红花', '桃仁', '牛膝', '大黄', '芒硝', '枳实', '益母草', '王不留行', '穿山甲', '皂角刺'],

    // 去炮制前缀
    _plain(name) {
        if (!name) return '';
        return String(name).replace(/^(炙|炒|煅|生|制|焦|蜜炙|盐|醋|酒|姜|水飞|麸炒)/, '');
    },

    /**
     * 检查一组药物（或单个方剂）的安全性
     * @param {Object|string[]} formulaOrHerbs - 方剂对象（含 composition）或药名数组
     * @returns {{ pairs:Array, toxic:Array, pregnancy:Array, all:Array }}
     */
    checkFormulaSafety(formulaOrHerbs) {
        const herbs = Array.isArray(formulaOrHerbs)
            ? formulaOrHerbs
            : (formulaOrHerbs && formulaOrHerbs.composition ? formulaOrHerbs.composition.map(c => c.herbName) : []);
        const plainNames = herbs.map(h => this._plain(h)).filter(Boolean);
        const nameSet = new Set(plainNames);
        const out = { pairs: [], toxic: [], pregnancy: [], all: [] };

        // 十八反
        this.INCOMPATIBILITY.forEach(group => {
            const hitHerbs = plainNames.filter(h => group.herbs.includes(h));
            const hitAgainst = plainNames.filter(h => group.against.includes(h));
            if (hitHerbs.length && hitAgainst.length) {
                out.pairs.push({ type: '十八反', a: hitHerbs.join('、'), b: hitAgainst.join('、'), detail: group.detail });
            }
        });
        // 十九畏
        this.FEAR.forEach(pair => {
            if (nameSet.has(pair.a) && nameSet.has(pair.b)) {
                out.pairs.push({ type: '十九畏', a: pair.a, b: pair.b, detail: pair.detail });
            }
        });
        // 有毒限量
        plainNames.forEach(h => {
            const t = this.TOXIC_HERBS[h];
            if (t) out.toxic.push({ name: h, limit: t.limit, note: t.note });
        });
        // 妊娠禁忌
        plainNames.forEach(h => {
            if (this.PREGNANCY_BAN.includes(h)) out.pregnancy.push(h);
        });

        out.all = [...out.pairs, ...out.toxic.map(t => ({ type: '有毒限量', name: t.name, limit: t.limit, note: t.note })), ...out.pregnancy.map(p => ({ type: '妊娠禁忌', name: p }))];
        return out;
    }
};

if (typeof window !== 'undefined') {
    window.SAFETY = SAFETY;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SAFETY };
}
