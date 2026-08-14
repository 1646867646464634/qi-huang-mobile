// ===== 岐黄·辅助诊疗系统 - 舌诊问诊规则表 =====
// 结构化问诊表单字段定义 + 选项 → 证型特征关键词映射（供 diagnosis-engine 打分）
const TongueRules = {
    fields: [
        {
            key: 'tongueColor', label: '舌色', hint: '观察舌体的颜色',
            options: [
                { value: '淡红', label: '淡红', keywords: ['淡红', '舌质淡红'], desc: '正常舌色，气血调和' },
                { value: '淡白', label: '淡白', keywords: ['淡白', '舌淡', '色淡'], desc: '气血亏虚、阳气不足之象' },
                { value: '红', label: '红', keywords: ['红', '舌红', '边尖红'], desc: '热证表现，邪热亢盛' },
                { value: '绛红', label: '绛红', keywords: ['绛红', '深红'], desc: '热入营血、阴虚火旺' },
                { value: '青紫', label: '青紫', keywords: ['青紫', '紫暗', '瘀斑'], desc: '血瘀、寒凝血滞之象' }
            ]
        },
        {
            key: 'tongueShape', label: '舌形', hint: '观察舌体的形态',
            options: [
                { value: '正常', label: '正常', keywords: [], desc: '舌体大小适中，活动自如' },
                { value: '胖大', label: '胖大', keywords: ['胖大', '淡胖'], desc: '水湿痰饮内停' },
                { value: '瘦薄', label: '瘦薄', keywords: ['瘦薄'], desc: '阴血亏虚、舌体失养' },
                { value: '齿痕', label: '齿痕', keywords: ['齿痕'], desc: '脾虚湿盛之象' },
                { value: '裂纹', label: '裂纹', keywords: ['裂纹'], desc: '阴液亏虚、血虚不润' },
                { value: '点刺', label: '点刺', keywords: ['点刺', '芒刺'], desc: '热入营血、脏腑热盛' }
            ]
        },
        {
            key: 'coatingColor', label: '苔色', hint: '观察舌苔的颜色',
            options: [
                { value: '白', label: '白苔', keywords: ['苔白', '薄白', '白滑', '白腻'], desc: '表证、寒证、湿证' },
                { value: '黄', label: '黄苔', keywords: ['苔黄', '黄腻', '黄燥'], desc: '里证、热证' },
                { value: '灰黑', label: '灰黑苔', keywords: ['灰黑', '黑苔'], desc: '热极或寒极之重证' }
            ]
        },
        {
            key: 'coatingQuality', label: '苔质', hint: '观察舌苔的质地',
            options: [
                { value: '薄', label: '薄苔', keywords: ['薄白', '薄黄'], desc: '邪轻病浅，多见于表证' },
                { value: '厚', label: '厚苔', keywords: ['厚', '厚腻'], desc: '邪盛入里，痰饮食积' },
                { value: '腻', label: '腻苔', keywords: ['腻'], desc: '湿浊内蕴、痰饮停聚' },
                { value: '燥', label: '燥苔', keywords: ['燥', '干'], desc: '津液耗伤' },
                { value: '润', label: '润苔', keywords: ['润', '滑'], desc: '津液未伤或水湿内停' },
                { value: '剥落', label: '剥落苔', keywords: ['剥落', '剥苔'], desc: '胃阴枯竭、胃气大伤' }
            ]
        }
    ]
};

if (typeof window !== 'undefined') {
    window.TongueRules = TongueRules;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TongueRules };
}
