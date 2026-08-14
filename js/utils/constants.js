// ===== 岐黄·辅助诊疗系统 - 全局常量 =====
const CONSTANTS = {
    APP_NAME: '岐黄·辅助诊疗系统',
    APP_VERSION: '1.3.1',
    
    // 体质类型
    CONSTITUTION_TYPES: [
        '平和质', '气虚质', '阳虚质', '阴虚质',
        '痰湿质', '湿热质', '血瘀质', '气郁质', '特禀质'
    ],
    
    // 问题选项
    QUESTION_OPTIONS: [
        { value: 1, label: '没有' },
        { value: 2, label: '很少' },
        { value: 3, label: '有时' },
        { value: 4, label: '经常' },
        { value: 5, label: '总是' }
    ],
    
    // 评分阈值
    SCORING: {
        BALANCED_THRESHOLD: 60,     // 平和质判定阈值
        BIASED_THRESHOLD: 40,       // 偏颇体质判定阈值
        TENDENCY_THRESHOLD: 30      // 倾向阈值
    },
    
    // 舌诊API（已停用：改为本地规则引擎，见 diagnosis-engine.js）
    // TONGUE_API 已移除
    
    // Storage键
    STORAGE_KEYS: {
        QUESTIONNAIRE: 'tcm_questionnaire',
        CONSTITUTION_RESULT: 'tcm_constitution_result'
    },
    
    // 首页联系方式（真实联系方式）
    CONTACT_INFO: {
        email: '',
        phone: '15369753689',
        wechat: 'qin15369753689'
    },
    CONTACT_REAL: true, // 置 true 表示已填写真实联系方式
    
    // 数据来源与版本标注
    DATA_VERSION: '2026-08',
    DATA_SOURCES: '《中医诊断学》《方剂学》规划教材、中华中医药学会体质判定标准 ZYYXH/T157-2009'
};
