// ===== 岐黄·辅助诊疗系统 - 面诊问诊规则表 =====
// 结构化问诊表单字段定义 + 选项 → 证型特征关键词映射
const FaceRules = {
    fields: [
        {
            key: 'faceColor', label: '面色', hint: '观察面部整体颜色',
            options: [
                { value: '红润', label: '红润', keywords: ['面色红润', '面色红', '面红'], desc: '正常或热证' },
                { value: '淡白', label: '淡白', keywords: ['面色白', '面色晄白', '面色苍白', '淡白'], desc: '气血亏虚、阳虚' },
                { value: '萎黄', label: '萎黄', keywords: ['萎黄', '面色黄', '淡黄'], desc: '脾虚湿盛、气血不足' },
                { value: '晦暗', label: '晦暗', keywords: ['晦暗', '面色青', '青紫', '黧黑'], desc: '瘀血内阻、肾阳虚衰' },
                { value: '赤红', label: '赤红', keywords: ['赤红', '面赤', '两颧红'], desc: '实热或阴虚火旺' }
            ]
        },
        {
            key: 'faceLuster', label: '光泽', hint: '观察面部光泽度',
            options: [
                { value: '荣润', label: '荣润有华', keywords: ['润泽', '有华'], desc: '气血充足，正常状态' },
                { value: '少华', label: '少华', keywords: ['少华', '少泽'], desc: '气血亏虚' },
                { value: '无华', label: '晦暗无华', keywords: ['无华', '晦暗'], desc: '脏腑精气衰败' }
            ]
        },
        {
            key: 'facePart', label: '重点分部', hint: '观察面部特定部位（可多选）',
            multi: true,
            options: [
                { value: '眼睑', label: '眼睑', keywords: ['眼睑', '目胞'], desc: '眼睑属脾，观脾之盈亏' },
                { value: '口唇', label: '口唇', keywords: ['唇', '口唇'], desc: '口唇属脾，观气血盛衰' },
                { value: '鼻头', label: '鼻头', keywords: ['鼻', '鼻头'], desc: '鼻属脾肺，观湿热内蕴' }
            ]
        },
        {
            key: 'faceFeature', label: '附加特征', hint: '观察面部有无特殊表现（可多选）',
            multi: true,
            options: [
                { value: '浮肿', label: '浮肿', keywords: ['浮肿', '水肿'], desc: '水湿泛滥，多属脾肾' },
                { value: '色斑', label: '色斑', keywords: ['斑', '色斑', '色素沉着'], desc: '瘀血内停、肝郁' },
                { value: '痤疮', label: '痤疮', keywords: ['痤疮', '粉刺'], desc: '肺胃热盛、湿热' }
            ]
        }
    ]
};

if (typeof window !== 'undefined') {
    window.FaceRules = FaceRules;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FaceRules };
}
