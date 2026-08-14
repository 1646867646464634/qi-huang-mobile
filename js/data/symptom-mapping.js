// ===== 岐黄·辅助诊疗系统 - 症状-证型映射 =====
const symptomSyndromeMapping = {
    // 头面部
    "头痛": [
        { syndromeId: "syn_001", keyword: "头痛", weight: 10 },
        { syndromeId: "syn_002", keyword: "头痛", weight: 10 },
        { syndromeId: "syn_022", keyword: "头痛", weight: 8 },
        { syndromeId: "syn_080", keyword: "头痛", weight: 8 },
        { syndromeId: "syn_021", keyword: "头痛", weight: 7 },
        { syndromeId: "syn_071", keyword: "头痛", weight: 5 }
    ],
    "头晕": [
        { syndromeId: "syn_022", keyword: "头晕", weight: 10 },
        { syndromeId: "syn_023", keyword: "头晕", weight: 9 },
        { syndromeId: "syn_050", keyword: "头晕", weight: 8 },
        { syndromeId: "syn_071", keyword: "头晕", weight: 7 },
        { syndromeId: "syn_074", keyword: "头晕", weight: 7 },
        { syndromeId: "syn_070", keyword: "头晕", weight: 6 }
    ],
    "眩晕": [
        { syndromeId: "syn_022", keyword: "眩晕", weight: 10 },
        { syndromeId: "syn_050", keyword: "眩晕", weight: 9 },
        { syndromeId: "syn_052", keyword: "眩晕", weight: 8 }
    ],
    "耳鸣": [
        { syndromeId: "syn_050", keyword: "耳鸣", weight: 10 },
        { syndromeId: "syn_022", keyword: "耳鸣", weight: 9 },
        { syndromeId: "syn_052", keyword: "耳鸣", weight: 8 },
        { syndromeId: "syn_021", keyword: "耳鸣", weight: 7 }
    ],

    // 胸腹
    "胸胁胀痛": [
        { syndromeId: "syn_020", keyword: "胸胁胀痛", weight: 10 },
        { syndromeId: "syn_081", keyword: "胸胁胀痛", weight: 8 }
    ],
    "心悸": [
        { syndromeId: "syn_010", keyword: "心悸", weight: 10 },
        { syndromeId: "syn_011", keyword: "心悸", weight: 9 },
        { syndromeId: "syn_071", keyword: "心悸", weight: 7 },
        { syndromeId: "syn_073", keyword: "心悸", weight: 7 }
    ],
    "胸闷": [
        { syndromeId: "syn_074", keyword: "胸闷", weight: 10 },
        { syndromeId: "syn_042", keyword: "胸闷", weight: 7 },
        { syndromeId: "syn_070", keyword: "胸闷", weight: 6 }
    ],
    "腹胀": [
        { syndromeId: "syn_030", keyword: "腹胀", weight: 10 },
        { syndromeId: "syn_062", keyword: "腹胀", weight: 9 },
        { syndromeId: "syn_032", keyword: "腹胀", weight: 8 }
    ],
    "胃痛": [
        { syndromeId: "syn_061", keyword: "胃痛", weight: 10 },
        { syndromeId: "syn_062", keyword: "胃痛", weight: 8 },
        { syndromeId: "syn_031", keyword: "胃痛", weight: 7 }
    ],
    "腹痛": [
        { syndromeId: "syn_031", keyword: "腹痛", weight: 10 },
        { syndromeId: "syn_032", keyword: "腹痛", weight: 8 },
        { syndromeId: "syn_062", keyword: "腹痛", weight: 8 }
    ],

    // 消化
    "食欲不振": [
        { syndromeId: "syn_030", keyword: "食欲不振", weight: 10 },
        { syndromeId: "syn_033", keyword: "食欲不振", weight: 8 },
        { syndromeId: "syn_062", keyword: "食欲不振", weight: 8 },
        { syndromeId: "syn_081", keyword: "食欲不振", weight: 7 }
    ],
    "恶心": [
        { syndromeId: "syn_033", keyword: "恶心", weight: 9 },
        { syndromeId: "syn_074", keyword: "恶心", weight: 8 },
        { syndromeId: "syn_024", keyword: "恶心", weight: 7 },
        { syndromeId: "syn_081", keyword: "恶心", weight: 7 }
    ],
    "呕吐": [
        { syndromeId: "syn_033", keyword: "呕吐", weight: 9 },
        { syndromeId: "syn_062", keyword: "呕吐", weight: 8 },
        { syndromeId: "syn_081", keyword: "呕吐", weight: 8 }
    ],
    "便秘": [
        { syndromeId: "syn_003", keyword: "便秘", weight: 9 },
        { syndromeId: "syn_061", keyword: "便秘", weight: 8 },
        { syndromeId: "syn_075", keyword: "便秘", weight: 8 },
        { syndromeId: "syn_021", keyword: "便秘", weight: 7 }
    ],
    "腹泻": [
        { syndromeId: "syn_030", keyword: "腹泻", weight: 9 },
        { syndromeId: "syn_032", keyword: "腹泻", weight: 8 },
        { syndromeId: "syn_031", keyword: "腹泻", weight: 8 },
        { syndromeId: "syn_033", keyword: "腹泻", weight: 7 }
    ],
    "大便溏薄": [
        { syndromeId: "syn_030", keyword: "大便溏薄", weight: 10 },
        { syndromeId: "syn_031", keyword: "大便溏薄", weight: 10 },
        { syndromeId: "syn_004", keyword: "大便溏薄", weight: 8 }
    ],

    // 呼吸
    "咳嗽": [
        { syndromeId: "syn_042", keyword: "咳嗽", weight: 10 },
        { syndromeId: "syn_043", keyword: "咳嗽", weight: 9 },
        { syndromeId: "syn_040", keyword: "咳嗽", weight: 8 },
        { syndromeId: "syn_001", keyword: "咳嗽", weight: 7 },
        { syndromeId: "syn_002", keyword: "咳嗽", weight: 7 }
    ],
    "气喘": [
        { syndromeId: "syn_043", keyword: "气喘", weight: 10 },
        { syndromeId: "syn_040", keyword: "气喘", weight: 8 }
    ],
    "咳痰": [
        { syndromeId: "syn_074", keyword: "咳痰", weight: 9 },
        { syndromeId: "syn_043", keyword: "咳痰", weight: 9 },
        { syndromeId: "syn_042", keyword: "咳痰", weight: 8 }
    ],
    "咽痛": [
        { syndromeId: "syn_002", keyword: "咽痛", weight: 10 },
        { syndromeId: "syn_003", keyword: "咽痛", weight: 7 }
    ],

    // 全身
    "发热": [
        { syndromeId: "syn_002", keyword: "发热", weight: 10 },
        { syndromeId: "syn_090", keyword: "发热", weight: 10 },
        { syndromeId: "syn_003", keyword: "发热", weight: 9 },
        { syndromeId: "syn_001", keyword: "发热", weight: 8 },
        { syndromeId: "syn_080", keyword: "发热", weight: 7 }
    ],
    "恶寒": [
        { syndromeId: "syn_001", keyword: "恶寒", weight: 10 },
        { syndromeId: "syn_042", keyword: "恶寒", weight: 9 },
        { syndromeId: "syn_004", keyword: "恶寒", weight: 7 }
    ],
    "自汗": [
        { syndromeId: "syn_040", keyword: "自汗", weight: 10 },
        { syndromeId: "syn_070", keyword: "自汗", weight: 9 }
    ],
    "盗汗": [
        { syndromeId: "syn_050", keyword: "盗汗", weight: 10 },
        { syndromeId: "syn_011", keyword: "盗汗", weight: 9 },
        { syndromeId: "syn_041", keyword: "盗汗", weight: 9 }
    ],
    "乏力": [
        { syndromeId: "syn_070", keyword: "乏力", weight: 10 },
        { syndromeId: "syn_030", keyword: "乏力", weight: 9 },
        { syndromeId: "syn_040", keyword: "乏力", weight: 8 },
        { syndromeId: "syn_004", keyword: "乏力", weight: 7 },
        { syndromeId: "syn_073", keyword: "乏力", weight: 7 }
    ],
    "畏寒": [
        { syndromeId: "syn_004", keyword: "畏寒", weight: 10 },
        { syndromeId: "syn_051", keyword: "畏寒", weight: 10 },
        { syndromeId: "syn_031", keyword: "畏寒", weight: 8 }
    ],

    // 精神
    "失眠": [
        { syndromeId: "syn_010", keyword: "失眠", weight: 10 },
        { syndromeId: "syn_011", keyword: "失眠", weight: 10 },
        { syndromeId: "syn_050", keyword: "失眠", weight: 8 },
        { syndromeId: "syn_022", keyword: "失眠", weight: 7 },
        { syndromeId: "syn_021", keyword: "失眠", weight: 7 }
    ],
    "多梦": [
        { syndromeId: "syn_010", keyword: "多梦", weight: 10 },
        { syndromeId: "syn_011", keyword: "多梦", weight: 9 },
        { syndromeId: "syn_050", keyword: "多梦", weight: 7 }
    ],
    "烦躁": [
        { syndromeId: "syn_003", keyword: "烦躁", weight: 9 },
        { syndromeId: "syn_043", keyword: "烦躁", weight: 8 },
        { syndromeId: "syn_021", keyword: "烦躁", weight: 7 }
    ],
    "抑郁": [
        { syndromeId: "syn_020", keyword: "抑郁", weight: 10 }
    ],
    "急躁易怒": [
        { syndromeId: "syn_021", keyword: "急躁易怒", weight: 10 },
        { syndromeId: "syn_022", keyword: "急躁易怒", weight: 9 }
    ],

    // 泌尿
    "小便黄赤": [
        { syndromeId: "syn_003", keyword: "小便黄赤", weight: 9 },
        { syndromeId: "syn_024", keyword: "小便黄赤", weight: 8 },
        { syndromeId: "syn_033", keyword: "小便黄赤", weight: 7 }
    ],
    "小便清长": [
        { syndromeId: "syn_004", keyword: "小便清长", weight: 10 },
        { syndromeId: "syn_051", keyword: "小便清长", weight: 10 }
    ],
    "夜尿频多": [
        { syndromeId: "syn_051", keyword: "夜尿频多", weight: 10 },
        { syndromeId: "syn_053", keyword: "夜尿频多", weight: 9 }
    ],

    // 妇科
    "月经不调": [
        { syndromeId: "syn_020", keyword: "月经不调", weight: 10 },
        { syndromeId: "syn_023", keyword: "月经不调", weight: 8 },
        { syndromeId: "syn_072", keyword: "月经不调", weight: 7 }
    ],
    "痛经": [
        { syndromeId: "syn_072", keyword: "痛经", weight: 10 },
        { syndromeId: "syn_020", keyword: "痛经", weight: 7 }
    ],
    "带下异常": [
        { syndromeId: "syn_024", keyword: "带下异常", weight: 9 },
        { syndromeId: "syn_033", keyword: "带下异常", weight: 7 }
    ],

    // 腰膝
    "腰膝酸软": [
        { syndromeId: "syn_050", keyword: "腰膝酸软", weight: 10 },
        { syndromeId: "syn_051", keyword: "腰膝酸软", weight: 10 },
        { syndromeId: "syn_052", keyword: "腰膝酸软", weight: 9 },
        { syndromeId: "syn_053", keyword: "腰膝酸软", weight: 8 }
    ],
    "腰膝酸冷": [
        { syndromeId: "syn_051", keyword: "腰膝酸冷", weight: 10 },
        { syndromeId: "syn_004", keyword: "腰膝酸冷", weight: 8 }
    ],

    // 体表
    "口苦": [
        { syndromeId: "syn_024", keyword: "口苦", weight: 10 },
        { syndromeId: "syn_081", keyword: "口苦", weight: 10 },
        { syndromeId: "syn_021", keyword: "口苦", weight: 9 }
    ],
    "口干": [
        { syndromeId: "syn_075", keyword: "口干", weight: 10 },
        { syndromeId: "syn_041", keyword: "口干", weight: 9 },
        { syndromeId: "syn_002", keyword: "口干", weight: 7 },
        { syndromeId: "syn_050", keyword: "口干", weight: 7 }
    ],
    "口臭": [
        { syndromeId: "syn_061", keyword: "口臭", weight: 10 },
        { syndromeId: "syn_033", keyword: "口臭", weight: 7 }
    ],
    "面色萎黄": [
        { syndromeId: "syn_030", keyword: "面色萎黄", weight: 10 },
        { syndromeId: "syn_071", keyword: "面色萎黄", weight: 9 },
        { syndromeId: "syn_073", keyword: "面色萎黄", weight: 8 }
    ],
    "面红": [
        { syndromeId: "syn_003", keyword: "面红", weight: 9 },
        { syndromeId: "syn_021", keyword: "面红", weight: 9 }
    ],
    "面色苍白": [
        { syndromeId: "syn_004", keyword: "面色苍白", weight: 10 },
        { syndromeId: "syn_051", keyword: "面色苍白", weight: 8 },
        { syndromeId: "syn_071", keyword: "面色苍白", weight: 8 }
    ],

    // 四肢
    "四肢不温": [
        { syndromeId: "syn_004", keyword: "四肢不温", weight: 10 },
        { syndromeId: "syn_051", keyword: "四肢不温", weight: 9 },
        { syndromeId: "syn_031", keyword: "四肢不温", weight: 8 }
    ],
    "手足心热": [
        { syndromeId: "syn_050", keyword: "手足心热", weight: 10 },
        { syndromeId: "syn_011", keyword: "手足心热", weight: 9 },
        { syndromeId: "syn_041", keyword: "手足心热", weight: 8 }
    ],
    "肢体麻木": [
        { syndromeId: "syn_023", keyword: "肢体麻木", weight: 10 },
        { syndromeId: "syn_071", keyword: "肢体麻木", weight: 8 }
    ],
    "肢体困重": [
        { syndromeId: "syn_074", keyword: "肢体困重", weight: 10 },
        { syndromeId: "syn_032", keyword: "肢体困重", weight: 9 },
        { syndromeId: "syn_033", keyword: "肢体困重", weight: 8 }
    ],
    "浮肿": [
        { syndromeId: "syn_030", keyword: "浮肿", weight: 9 },
        { syndromeId: "syn_032", keyword: "浮肿", weight: 8 },
        { syndromeId: "syn_031", keyword: "浮肿", weight: 8 }
    ],

    // 舌象相关（用于舌诊关联）
    "舌红": [
        { syndromeId: "syn_003", keyword: "舌红", weight: 9 },
        { syndromeId: "syn_043", keyword: "舌红", weight: 8 },
        { syndromeId: "syn_002", keyword: "舌红", weight: 7 },
        { syndromeId: "syn_011", keyword: "舌红", weight: 7 }
    ],
    "舌淡": [
        { syndromeId: "syn_070", keyword: "舌淡", weight: 9 },
        { syndromeId: "syn_071", keyword: "舌淡", weight: 9 },
        { syndromeId: "syn_030", keyword: "舌淡", weight: 8 },
        { syndromeId: "syn_004", keyword: "舌淡", weight: 8 }
    ],
    "苔黄": [
        { syndromeId: "syn_003", keyword: "苔黄", weight: 10 },
        { syndromeId: "syn_043", keyword: "苔黄", weight: 9 },
        { syndromeId: "syn_061", keyword: "苔黄", weight: 8 }
    ],
    "苔白": [
        { syndromeId: "syn_001", keyword: "苔白", weight: 9 },
        { syndromeId: "syn_042", keyword: "苔白", weight: 9 },
        { syndromeId: "syn_074", keyword: "苔白", weight: 8 }
    ],
    "苔腻": [
        { syndromeId: "syn_074", keyword: "苔腻", weight: 10 },
        { syndromeId: "syn_024", keyword: "苔腻", weight: 9 },
        { syndromeId: "syn_033", keyword: "苔腻", weight: 9 },
        { syndromeId: "syn_062", keyword: "苔腻", weight: 7 }
    ]
};

// 合并自动生成的扩展映射（symptom-mapping-extension.js，覆盖证型库全部可输入症状）
// 通过 globalThis/window 属性访问，避免直接引用顶层 const（Node 下存在 TDZ 风险）
(function () {
    const extMap = (typeof globalThis !== 'undefined' && globalThis.symptomMappingExtension) ||
                   (typeof window !== 'undefined' && window.symptomMappingExtension);
    if (extMap) {
        Object.assign(symptomSyndromeMapping, extMap);
    }
})();

/**
 * 根据症状关键词搜索证型
 * @param {string} query - 搜索关键词
 * @returns {Array} 匹配的证型列表（按匹配分排序）
 */
function searchSyndromes(query) {
    if (!query || query.trim().length < 1) return [];
    
    const results = {};
    const q = query.trim().toLowerCase();
    
    // 模糊匹配所有症状关键词
    Object.entries(symptomSyndromeMapping).forEach(([symptom, mappings]) => {
        if (symptom.includes(q) || q.includes(symptom)) {
            // 关键词匹配度系数
            const matchQuality = symptom === q ? 1.0 : 
                                 symptom.startsWith(q) ? 0.8 :
                                 symptom.includes(q) ? 0.6 : 0.4;
            
            mappings.forEach(({ syndromeId, weight }) => {
                if (!results[syndromeId]) {
                    results[syndromeId] = { 
                        syndromeId, 
                        score: 0, 
                        matchedSymptoms: [] 
                    };
                }
                const adjustedWeight = weight * matchQuality;
                results[syndromeId].score += adjustedWeight;
                results[syndromeId].matchedSymptoms.push(symptom);
            });
        }
    });
    
    // 转换为数组并按分数排序
    return Object.values(results)
        .sort((a, b) => b.score - a.score)
        .slice(0, 10)
        .map(result => {
            const syndrome = syndromesDatabase.find(s => s.id === result.syndromeId);
            return {
                ...result,
                syndrome: syndrome || null
            };
        });
}

/**
 * 多症状组合辨证（用户选择多个症状）
 * 走 DiagnosisEngine.diagnose v2 引擎（必见/矛盾/分层加权/推理依据），
 * 返回结构兼容旧版 { syndrome, score, matchedSymptoms } 并扩展新字段。
 * @param {string[]} symptoms - 用户选中的症状列表
 * @returns {Array} 综合辨证结果
 */
function multiSymptomDiagnosis(symptoms) {
    if (typeof DiagnosisEngine !== 'undefined' && typeof DiagnosisEngine.diagnose === 'function') {
        return DiagnosisEngine.diagnose({ symptoms });
    }

    // 回退：旧版简单加权求和（引擎未加载时）
    const results = {};
    symptoms.forEach(symptom => {
        const mappings = symptomSyndromeMapping[symptom];
        if (!mappings) return;
        mappings.forEach(({ syndromeId, weight }) => {
            if (!results[syndromeId]) {
                results[syndromeId] = { syndromeId, score: 0, matchedSymptoms: [] };
            }
            results[syndromeId].score += weight;
            results[syndromeId].matchedSymptoms.push(symptom);
        });
    });

    return Object.values(results)
        .sort((a, b) => b.score - a.score)
        .slice(0, 10)
        .map(result => {
            const syndrome = syndromesDatabase.find(s => s.id === result.syndromeId);
            return { ...result, syndrome: syndrome || null };
        });
}

// 挂载到全局
if (typeof window !== 'undefined') {
    window.symptomSyndromeMapping = symptomSyndromeMapping;
    window.searchSyndromes = searchSyndromes;
    window.multiSymptomDiagnosis = multiSymptomDiagnosis;
}
// Node 导出（供校验/测试脚本使用）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { symptomSyndromeMapping, searchSyndromes, multiSymptomDiagnosis };
}
