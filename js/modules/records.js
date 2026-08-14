// ===== 岐黄·辅助诊疗系统 - 诊断记录模块 =====
// 记录各模块的辨证结果，支持 列表/详情/对比/导出（JSON/Markdown）
// 存储 key: tcm_diag_records（上限 100 条）
const Records = {
    KEY: 'tcm_diag_records',
    MAX: 100,

    list() {
        return Storage.get(this.KEY, []);
    },

    /**
     * 保存一条诊断记录（供 symptom/comprehensive/tongue/face 调用）
     * @param {{type:string, input:Object, results:Array}} rec
     */
    save(rec) {
        const records = this.list();
        const item = {
            id: 'rec_' + Date.now(),
            time: Date.now(),
            type: rec.type || 'symptom',
            input: rec.input || {},
            results: rec.results || [],
            notes: rec.notes || ''
        };
        records.unshift(item);
        Storage.set(this.KEY, records.slice(0, this.MAX));
        Toast.show('诊断记录已保存 ✓', 'success');
        EventBus.emit('records:changed', { id: item.id });
        return item;
    },

    remove(id) {
        Storage.set(this.KEY, this.list().filter(r => r.id !== id));
        EventBus.emit('records:changed', { id });
    },

    get(id) {
        return this.list().find(r => r.id === id) || null;
    },

    /**
     * 查找近期相似症状的诊断记录（上次就诊提醒）
     * @param {string[]} symptoms - 当前症状
     * @param {number} days - 时间窗口（默认30天）
     * @returns {Object|null} 最近的相似记录
     */
    findRecent(symptoms, days) {
        if (!symptoms || !symptoms.length) return null;
        days = days || 30;
        const now = Date.now();
        const windowMs = days * 24 * 60 * 60 * 1000;
        let best = null;
        this.list().forEach(r => {
            if (now - r.time > windowMs) return;
            const prev = (r.input && r.input.symptoms) || [];
            const overlap = symptoms.filter(s => prev.includes(s)).length;
            if (overlap > 0 && (!best || overlap > best._overlap)) {
                best = Object.assign({ _overlap: overlap, _daysAgo: Math.floor((now - r.time) / 86400000) }, r);
            }
        });
        return best;
    }
};

class RecordsModule {
    constructor() {
        this.activeRecord = null;   // 当前查看的记录
        this.compareIds = [];       // 对比选中的记录 id
        this.filter = 'all';        // 类型过滤
    }

    destroy() {}

    render(container) {
        const records = Records.list();
        const types = ['all', ...new Set(records.map(r => r.type))];

        container.innerHTML = `
            <div class="module-page records-page">
                <div class="page-header">
                    <h2 class="page-title">
                        <span class="seal-stamp">录</span>
                        诊断记录
                    </h2>
                    <p class="page-subtitle">历次辨证结果留存 · 对比复盘 · 导出健康档案</p>
                </div>

                <div class="fav-section-tabs" style="margin-bottom: var(--space-md);">
                    ${types.map(t => `
                        <button class="fav-section-tab ${this.filter === t ? 'active' : ''}" data-filter="${t}">
                            ${t === 'all' ? '全部' : { symptom: '病症', comprehensive: '四诊合参', tongue: '舌诊', face: '面诊' }[t] || t}
                        </button>
                    `).join('')}
                </div>

                <div id="recordsContent"></div>
            </div>
        `;

        container.querySelectorAll('.fav-section-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                this.filter = tab.dataset.filter;
                this.activeRecord = null;
                this.compareIds = [];
                this.render(container);
            });
        });

        this.renderBody(container);
    }

    renderBody(container) {
        const content = container.querySelector('#recordsContent');
        if (this.activeRecord) { this.renderDetail(content, container); return; }
        if (this.compareIds.length === 2) { this.renderCompare(content, container); return; }

        const records = Records.list().filter(r => this.filter === 'all' || r.type === this.filter);
        const typeLabel = { symptom: '病症辨证', comprehensive: '四诊合参', tongue: '舌诊', face: '面诊' };

        if (records.length === 0) {
            content.innerHTML = `<p class="study-empty">暂无诊断记录。在辨证结果页点击「保存诊断记录」即可留存。</p>`;
            return;
        }

        content.innerHTML = `
            <div style="display:flex;gap:10px;margin-bottom:var(--space-md);flex-wrap:wrap;">
                <button class="btn btn-ghost" id="exportAllBtn">📤 导出全部（Markdown）</button>
                <button class="btn btn-ghost" id="exportAllJsonBtn">导出全部（JSON）</button>
                <button class="btn btn-ghost" id="clearAllBtn">🗑 清空记录</button>
            </div>
            <div class="fav-grid">
                ${records.map(r => `
                    <div class="fav-card" data-record-id="${r.id}">
                        <div class="fav-card-type">${typeLabel[r.type] || r.type}</div>
                        <div class="fav-card-name">${(r.results && r.results[0] && r.results[0].name) || '（未匹配证型）'}${r.results && r.results.length > 1 ? ' 等' + r.results.length + '项' : ''}</div>
                        <div class="fav-card-time">${new Date(r.time).toLocaleString('zh-CN')}</div>
                        <div style="margin-top:8px;font-size:12px;color:var(--color-ink-pale);">症状：${(r.input.symptoms || []).join('、') || '—'}</div>
                        <div style="display:flex;gap:10px;margin-top:8px;">
                            <button class="fav-card-remove" data-compare="${r.id}">⚖ 对比</button>
                            <button class="fav-card-remove" data-remove="${r.id}">✕ 删除</button>
                        </div>
                    </div>
                `).join('')}
            </div>
            <p style="font-size:var(--text-xs);color:var(--color-ink-pale);margin-top:var(--space-md);">点击卡片查看详情；「对比」勾选两条后可并排对比。</p>
        `;

        content.querySelectorAll('.fav-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.closest('[data-remove]') || e.target.closest('[data-compare]')) return;
                this.activeRecord = card.dataset.recordId;
                this.renderBody(container);
            });
        });
        content.querySelectorAll('[data-remove]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                Records.remove(btn.dataset.remove);
                this.renderBody(container);
            });
        });
        content.querySelectorAll('[data-compare]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = btn.dataset.compare;
                if (this.compareIds.includes(id)) { this.compareIds = this.compareIds.filter(x => x !== id); }
                else {
                    if (this.compareIds.length >= 2) this.compareIds.shift();
                    this.compareIds.push(id);
                }
                if (this.compareIds.length === 2) this.renderBody(container);
                else Toast.show(`已选 ${this.compareIds.length}/2 条记录对比`, 'info');
            });
        });
        content.querySelector('#exportAllBtn').addEventListener('click', () => {
            const text = records.map(r => ExportUtils.recordToMarkdown(r)).join('\n\n---\n\n');
            ExportUtils.downloadText('岐黄诊断记录_' + new Date().toISOString().slice(0, 10) + '.md', text);
        });
        content.querySelector('#exportAllJsonBtn').addEventListener('click', () => {
            ExportUtils.downloadJSON('岐黄诊断记录_' + new Date().toISOString().slice(0, 10) + '.json', records);
        });
        content.querySelector('#clearAllBtn').addEventListener('click', () => {
            if (confirm('确定清空全部诊断记录吗？此操作不可恢复。')) {
                Storage.remove(Records.KEY);
                this.render(container);
            }
        });
    }

    renderDetail(content, container) {
        const rec = Records.get(this.activeRecord);
        if (!rec) { this.activeRecord = null; this.renderBody(container); return; }
        const typeLabel = { symptom: '病症辨证', comprehensive: '四诊合参', tongue: '舌诊', face: '面诊' };
        content.innerHTML = `
            <div class="card" style="padding:var(--space-lg);margin-bottom:var(--space-md);">
                <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
                    <div>
                        <h3 style="font-family:var(--font-display);color:var(--color-vermillion-dark);margin:0;">${typeLabel[rec.type] || rec.type}记录</h3>
                        <p style="font-size:var(--text-sm);color:var(--color-ink-light);margin:6px 0 0 0;">${new Date(rec.time).toLocaleString('zh-CN')}</p>
                    </div>
                    <div style="display:flex;gap:8px;">
                        <button class="btn btn-ghost" id="recBackBtn">← 返回列表</button>
                        <button class="btn btn-ghost" id="recExportBtn">📤 导出</button>
                    </div>
                </div>
                <div style="margin-top:var(--space-md);">
                    <p style="font-size:var(--text-sm);">症状：${(rec.input.symptoms || []).join('、') || '—'}</p>
                    ${rec.input.constitution ? `<p style="font-size:var(--text-sm);">体质：${rec.input.constitution}</p>` : ''}
                </div>
            </div>
            <div>
                ${(rec.results || []).slice(0, 5).map((r, i) => {
                    const syndrome = (window.syndromesDatabase || []).find(s => s.id === r.syndromeId);
                    return `
                        <div class="card" style="padding:var(--space-md);margin-bottom:var(--space-sm);display:flex;justify-content:space-between;align-items:center;">
                            <div>
                                <b style="font-size:var(--text-base);color:var(--color-vermillion-dark);">${r.name}</b>
                                ${syndrome ? `<span class="tag tag-plain" style="margin-left:8px;">${syndrome.category || ''}</span>` : ''}
                            </div>
                            <div style="display:flex;align-items:center;gap:10px;">
                                <span class="tag tag-formula">匹配 ${r.matchScore || '—'}%</span>
                                ${syndrome ? `<button class="btn btn-ghost btn-sm rec-detail" data-type="syndrome" data-id="${syndrome.id}">详情</button>` : ''}
                            </div>
                        </div>
                    `;
                }).join('') || '<p class="study-empty">该记录未匹配到证型</p>'}
            </div>
        `;
        content.querySelector('#recBackBtn').addEventListener('click', () => { this.activeRecord = null; this.renderBody(container); });
        content.querySelector('#recExportBtn').addEventListener('click', () => {
            ExportUtils.downloadText('岐黄诊断记录_' + rec.id + '.md', ExportUtils.recordToMarkdown(rec));
        });
        content.querySelectorAll('.rec-detail').forEach(btn => {
            btn.addEventListener('click', () => { DetailModal.open(btn.dataset.type, btn.dataset.id); });
        });
    }

    renderCompare(content, container) {
        const [a, b] = this.compareIds.map(id => Records.get(id)).filter(Boolean);
        if (!a || !b) { this.compareIds = []; this.renderBody(container); return; }
        const fmt = r => (r.results || []).slice(0, 5).map(x => `${x.name}(${x.matchScore}%)`).join('、') || '—';
        content.innerHTML = `
            <div class="card" style="padding:var(--space-lg);margin-bottom:var(--space-md);">
                <div style="display:flex;justify-content:space-between;align-items:center;">
                    <h3 style="font-family:var(--font-display);color:var(--color-vermillion-dark);margin:0;">记录对比</h3>
                    <button class="btn btn-ghost" id="cmpBackBtn">← 返回</button>
                </div>
            </div>
            <div class="grid-2">
                <div class="card" style="padding:var(--space-md);">
                    <p style="font-size:var(--text-xs);color:var(--color-ink-pale);">${new Date(a.time).toLocaleString('zh-CN')}</p>
                    <h4 style="margin:6px 0;">症状：${(a.input.symptoms || []).join('、') || '—'}</h4>
                    <p style="font-size:var(--text-sm);color:var(--color-ink-light);">结果：${fmt(a)}</p>
                </div>
                <div class="card" style="padding:var(--space-md);">
                    <p style="font-size:var(--text-xs);color:var(--color-ink-pale);">${new Date(b.time).toLocaleString('zh-CN')}</p>
                    <h4 style="margin:6px 0;">症状：${(b.input.symptoms || []).join('、') || '—'}</h4>
                    <p style="font-size:var(--text-sm);color:var(--color-ink-light);">结果：${fmt(b)}</p>
                </div>
            </div>
            <div class="card" style="padding:var(--space-md);margin-top:var(--space-md);">
                <h4 style="color:var(--color-bronze-dark);margin-bottom:var(--space-sm);">💡 对比提示</h4>
                <p style="font-size:var(--text-sm);color:var(--color-ink-light);line-height:1.9;">
                    对比两次记录的证型与匹配度变化，可帮助观察调理期间身体状态的转变（如「虚寒→平和」提示阳气渐复）。
                    若症状趋重或证型反复，建议及时线下就医。
                </p>
            </div>
        `;
        content.querySelector('#cmpBackBtn').addEventListener('click', () => { this.compareIds = []; this.renderBody(container); });
    }
}

if (typeof window !== 'undefined') {
    window.Records = Records;
    window.RecordsModule = RecordsModule;
}
