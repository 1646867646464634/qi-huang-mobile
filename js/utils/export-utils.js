// ===== 岐黄·辅助诊疗系统 - 通用导出工具 =====
// 供 诊断记录/常用方案/学习中心 复用：文本下载、Markdown/JSON 序列化
const ExportUtils = {
    // 触发浏览器下载文本文件（Blob）
    downloadText(filename, text, mime) {
        const blob = new Blob([text], { type: mime || 'text/markdown;charset=utf-8' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            URL.revokeObjectURL(a.href);
            a.remove();
        }, 200);
    },

    // 诊断记录 → Markdown
    recordToMarkdown(record) {
        const lines = [];
        lines.push(`# 岐黄诊断记录 · ${new Date(record.time).toLocaleString('zh-CN')}`);
        lines.push('');
        if (record.input) {
            const input = record.input;
            if (input.symptoms && input.symptoms.length) lines.push(`- **症状**：${input.symptoms.join('、')}`);
            if (input.tongue && Object.keys(input.tongue).length) lines.push(`- **舌象**：已选 ${Object.keys(input.tongue).length} 项`);
            if (input.face && Object.keys(input.face).length) lines.push(`- **面象**：已选 ${Object.keys(input.face).length} 项`);
            if (input.constitution) lines.push(`- **体质**：${input.constitution}`);
        }
        lines.push('');
        lines.push('## 辨证结果');
        (record.results || []).slice(0, 5).forEach((r, i) => {
            lines.push(`${i + 1}. ${r.name}（匹配 ${r.matchScore}%）`);
        });
        lines.push('');
        lines.push('> 本记录由岐黄·辅助诊疗系统生成，仅供学习参考，不构成医疗诊断。');
        return lines.join('\n');
    },

    // 常用方案 → Markdown
    planToMarkdown(plan) {
        const lines = [];
        lines.push(`# ${plan.title}`);
        if (plan.note) lines.push('');
        lines.push(`> 备注：${plan.note}`);
        lines.push('');
        lines.push(`- **类型**：${plan.type || ''}`);
        lines.push(`- **保存时间**：${new Date(plan.time).toLocaleString('zh-CN')}`);
        if (plan.data) {
            lines.push('');
            lines.push('## 方案内容');
            if (plan.data.typeName) lines.push(`- **体质/证型**：${plan.data.typeName}`);
            if (plan.data.symptoms && plan.data.symptoms.length) lines.push(`- **症状**：${plan.data.symptoms.join('、')}`);
            if (plan.data.formulas && plan.data.formulas.length) {
                lines.push(`- **相关方剂**：${plan.data.formulas.map(f => f.name || f).join('、')}`);
            }
        }
        lines.push('');
        lines.push('> 本方案由岐黄·辅助诊疗系统生成，仅供学习参考，不构成医疗诊断。');
        return lines.join('\n');
    },

    // 通用：对象 → JSON 下载
    downloadJSON(filename, data) {
        this.downloadText(filename, JSON.stringify(data, null, 2), 'application/json;charset=utf-8');
    }
};

if (typeof window !== 'undefined') {
    window.ExportUtils = ExportUtils;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ExportUtils };
}
