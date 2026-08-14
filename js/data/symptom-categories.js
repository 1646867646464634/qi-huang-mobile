// ===== 岐黄·辅助诊疗系统 - 症状二维分类 =====
// 对 symptomSyndromeMapping 的 55 个症状，按"部位"和"感受"两个维度分类
// 用于学习/辨证模块的"快速选择症状"树形结构展示
const SymptomCategories = {
    // 部位维度（注：舌象作为望诊特殊部位单列）
    body: {
        label: '按部位',
        groups: [
            { key: 'head', label: '头面部', icon: '🧠', symptoms: ['头痛', '头晕', '眩晕', '耳鸣', '口苦', '口干', '口臭', '面色萎黄', '面红', '面色苍白'] },
            { key: 'throat', label: '颈咽部', icon: '👄', symptoms: ['咽痛'] },
            { key: 'chest', label: '胸部', icon: '🫁', symptoms: ['胸闷', '心悸', '胸胁胀痛', '咳嗽', '气喘', '咳痰'] },
            { key: 'abdomen', label: '腹部', icon: '🫃', symptoms: ['腹胀', '胃痛', '腹痛', '食欲不振', '恶心', '呕吐', '便秘', '腹泻', '大便溏薄'] },
            { key: 'waist', label: '腰背', icon: '🦴', symptoms: ['腰膝酸软', '腰膝酸冷'] },
            { key: 'limbs', label: '四肢', icon: '🦵', symptoms: ['四肢不温', '肢体麻木', '肢体困重', '手足心热'] },
            { key: 'skin', label: '皮肤', icon: '🩹', symptoms: ['浮肿'] },
            { key: 'systemic', label: '全身寒热', icon: '🌡', symptoms: ['发热', '恶寒', '畏寒', '自汗', '盗汗', '乏力'] },
            { key: 'mental', label: '神志', icon: '🧘', symptoms: ['失眠', '多梦', '烦躁', '抑郁', '急躁易怒'] },
            { key: 'urinary', label: '泌尿', icon: '💧', symptoms: ['小便黄赤', '小便清长', '夜尿频多'] },
            { key: 'gyneco', label: '妇科', icon: '🌸', symptoms: ['月经不调', '痛经', '带下异常'] },
            { key: 'tongue', label: '舌象', icon: '👅', symptoms: ['舌红', '舌淡', '苔黄', '苔白', '苔腻'] }
        ]
    },
    // 感受维度
    sensation: {
        label: '按感受',
        groups: [
            { key: 'pain', label: '疼痛', icon: '💢', symptoms: ['头痛', '胸胁胀痛', '胃痛', '腹痛', '痛经', '腰膝酸软', '腰膝酸冷', '咽痛'] },
            { key: 'heat', label: '灼热', icon: '🔥', symptoms: ['发热', '口干', '手足心热', '舌红', '苔黄', '小便黄赤', '面红', '口苦'] },
            { key: 'cold', label: '寒凉', icon: '🥶', symptoms: ['恶寒', '畏寒', '四肢不温', '面色苍白', '小便清长', '舌淡', '苔白'] },
            { key: 'distention', label: '酸胀', icon: '😣', symptoms: ['腹胀', '肢体困重'] },
            { key: 'numbness', label: '麻木', icon: '🫥', symptoms: ['肢体麻木'] },
            { key: 'mental', label: '神志', icon: '🧠', symptoms: ['失眠', '多梦', '烦躁', '抑郁', '急躁易怒', '头晕', '眩晕'] },
            { key: 'weakness', label: '虚弱', icon: '😮‍💨', symptoms: ['乏力', '心悸', '自汗', '盗汗', '腰膝酸软', '腰膝酸冷', '耳鸣', '胸闷'] },
            { key: 'respiratory', label: '咳痰喘', icon: '🤧', symptoms: ['咳嗽', '气喘', '咳痰'] },
            { key: 'gi', label: '呕恶', icon: '🤢', symptoms: ['恶心', '呕吐', '食欲不振', '胃痛', '口臭'] },
            { key: 'excretion', label: '二便', icon: '🚽', symptoms: ['便秘', '腹泻', '大便溏薄', '小便黄赤', '小便清长', '夜尿频多'] },
            { key: 'fluid', label: '水液异常', icon: '💧', symptoms: ['浮肿'] },
            { key: 'gyneco', label: '妇科', icon: '🌸', symptoms: ['月经不调', '痛经', '带下异常'] },
            { key: 'appearance', label: '望诊', icon: '👀', symptoms: ['面色萎黄', '面色苍白', '面红', '舌红', '舌淡', '苔黄', '苔白', '苔腻'] }
        ]
    }
};

// 快速工具：按维度返回症状集合（用于校验）
SymptomCategories.collectAll = function (dim) {
    const set = new Set();
    (SymptomCategories[dim].groups || []).forEach(g => g.symptoms.forEach(s => set.add(s)));
    return set;
};

// 动态兜底：将症状映射中未被分组的症状自动并入"其他"组，保证快速选择树覆盖全部可辨证症状
SymptomCategories.groupsWithFallback = function (dim) {
    const groups = (SymptomCategories[dim] && SymptomCategories[dim].groups) || [];
    const mapped = typeof symptomSyndromeMapping !== 'undefined'
        ? Object.keys(symptomSyndromeMapping) : [];
    const covered = new Set();
    groups.forEach(g => (g.symptoms || []).forEach(s => covered.add(s)));
    const rest = mapped.filter(s => !covered.has(s));
    if (rest.length === 0) return groups;
    return groups.concat([{ key: 'other', label: '其他症状', icon: '📦', symptoms: rest }]);
};

if (typeof window !== 'undefined') {
    window.SymptomCategories = SymptomCategories;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SymptomCategories };
}
