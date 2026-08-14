// ===== 岐黄·辅助诊疗系统 - 常用方案模块 =====
// 保存体质调理方案、辨证结果、推荐方剂，支持重命名/备注/导出。
// 存储 key: tcm_plans
const PLANS_KEY = 'tcm_plans';

const Plans = {
    KEY: PLANS_KEY,

    list() {
        return Storage.get(PLANS_KEY, []);
    },

    // 供 constitution/symptom/comprehensive/formula 调用
    save(plan) {
        const plans = this.list();
        const item = {
            id: 'plan_' + Date.now(),
            time: Date.now(),
            title: plan.title || '未命名方案',
            type: plan.type || 'syndrome',
            note: plan.note || '',
            data: plan.data || {}
        };
        plans.unshift(item);
        Storage.set(PLANS_KEY, plans.slice(0, 100));
        Toast.show('已保存为常用方案 ✓', 'success');
        EventBus.emit('plans:changed', { id: item.id });
        return item;
    },

    update(id, patch) {
        Storage.set(PLANS_KEY, this.list().map(p => p.id === id ? Object.assign({}, p, patch) : p));
        EventBus.emit('plans:changed', { id });
    },

    remove(id) {
        Storage.set(PLANS_KEY, this.list().filter(p => p.id !== id));
        EventBus.emit('plans:changed', { id });
    }
};

class PlansModule {
    constructor() {
        this.editingId = null;
    }

    destroy() {}

    render(container) {
        container.innerHTML = `
            <div class="module-page plans-page">
                <div class="page-header">
                    <h2 class="page-title">
                        <span class="seal-stamp">案</span>
                        常用方案
                    </h2>
                    <p class="page-subtitle">保存体质调理、辨证结果与推荐方剂，随时回看与导出</p>
                </div>
                <div id="plansContent"></div>
            </div>
        `;
        this.renderBody(container);
    }

    renderBody(container) {
        const content = container.querySelector('#plansContent');
        const plans = Plans.list();
        const typeLabel = { constitution: '体质方案', syndrome: '辨证方案', formula: '方剂方案' };

        if (plans.length === 0) {
            content.innerHTML = `<p class="study-empty">暂无保存的方案。在体质结果页、辨证结果页或方剂详情中点击「保存为方案」即可加入。</p>`;
            return;
        }

        content.innerHTML = `
            <div style="display:flex;gap:10px;margin-bottom:var(--space-md);">
                <button class="btn btn-ghost" id="exportAllBtn">📤 导出全部（Markdown）</button>
            </div>
            <div class="fav-grid">
                ${plans.map(p => `
                    <div class="fav-card" data-plan-id="${p.id}">
                        <div class="fav-card-type">${typeLabel[p.type] || p.type}</div>
                        <div class="fav-card-name">${p.title}</div>
                        <div class="fav-card-time">${new Date(p.time).toLocaleString('zh-CN')}</div>
                        ${p.note ? `<div style="margin-top:6px;font-size:12px;color:var(--color-ink-light);">${this._esc(p.note)}</div>` : ''}
                        <div style="display:flex;gap:10px;margin-top:8px;flex-wrap:wrap;">
                            <button class="fav-card-remove" data-edit="${p.id}">✏ 编辑</button>
                            <button class="fav-card-remove" data-export="${p.id}">📤 导出</button>
                            <button class="fav-card-remove" data-remove="${p.id}">✕ 删除</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        content.querySelectorAll('.fav-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.closest('[data-edit]') || e.target.closest('[data-export]') || e.target.closest('[data-remove]')) return;
                const plan = Plans.list().find(p => p.id === card.dataset.planId);
                if (plan) this.viewDetail(plan, container);
            });
        });
        content.querySelectorAll('[data-remove]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                Plans.remove(btn.dataset.remove);
                this.renderBody(container);
            });
        });
        content.querySelectorAll('[data-export]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const plan = Plans.list().find(p => p.id === btn.dataset.export);
                if (plan && typeof ExportUtils !== 'undefined') {
                    ExportUtils.downloadText('岐黄方案_' + plan.title + '.md', ExportUtils.planToMarkdown(plan));
                }
            });
        });
        content.querySelectorAll('[data-edit]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.editingId = btn.dataset.edit;
                const plan = Plans.list().find(p => p.id === this.editingId);
                if (plan) this.renderEditor(plan, container);
            });
        });
        content.querySelector('#exportAllBtn').addEventListener('click', () => {
            const text = plans.map(p => ExportUtils.planToMarkdown(p)).join('\n\n---\n\n');
            ExportUtils.downloadText('岐黄常用方案_' + new Date().toISOString().slice(0, 10) + '.md', text);
        });
    }

    renderEditor(plan, container) {
        const content = container.querySelector('#plansContent');
        content.innerHTML = `
            <div class="card" style="max-width:560px;margin:0 auto;padding:var(--space-lg);">
                <h3 style="font-family:var(--font-heading);color:var(--color-vermillion-dark);margin-bottom:var(--space-md);">编辑方案</h3>
                <div style="margin-bottom:var(--space-md);">
                    <label class="form-field-label" style="display:block;margin-bottom:6px;">标题</label>
                    <input type="text" class="search-input" id="planTitle" value="${this._esc(plan.title)}" style="width:100%;">
                </div>
                <div style="margin-bottom:var(--space-md);">
                    <label class="form-field-label" style="display:block;margin-bottom:6px;">备注</label>
                    <textarea class="search-input" id="planNote" rows="3" style="width:100%;resize:vertical;">${this._esc(plan.note)}</textarea>
                </div>
                <div style="display:flex;gap:10px;">
                    <button class="btn btn-primary" id="planSaveBtn">保存修改</button>
                    <button class="btn btn-ghost" id="planCancelBtn">返回</button>
                </div>
            </div>
        `;
        content.querySelector('#planSaveBtn').addEventListener('click', () => {
            Plans.update(this.editingId, {
                title: content.querySelector('#planTitle').value.trim() || '未命名方案',
                note: content.querySelector('#planNote').value.trim()
            });
            Toast.show('方案已更新 ✓', 'success');
            this.editingId = null;
            this.renderBody(container);
        });
        content.querySelector('#planCancelBtn').addEventListener('click', () => {
            this.editingId = null;
            this.renderBody(container);
        });
    }

    viewDetail(plan, container) {
        const content = container.querySelector('#plansContent');
        const data = plan.data || {};
        let detailHtml = '';
        if (data.typeName) detailHtml += `<p style="font-size:var(--text-sm);"><b>主体：</b>${this._esc(data.typeName)}</p>`;
        if (data.symptoms && data.symptoms.length) detailHtml += `<p style="font-size:var(--text-sm);"><b>症状：</b>${data.symptoms.join('、')}</p>`;
        if (data.description) detailHtml += `<p style="font-size:var(--text-sm);">${this._esc(data.description)}</p>`;
        if (data.formulas && data.formulas.length) {
            detailHtml += `<p style="font-size:var(--text-sm);"><b>相关方剂：</b></p><div class="result-tags">`;
            detailHtml += data.formulas.map(f => {
                const name = typeof f === 'string' ? f : f.name;
                const id = typeof f === 'string' ? '' : f.id;
                return id
                    ? `<span class="tag tag-formula formula-link" data-formula-id="${id}" style="cursor:pointer;">${this._esc(name)}</span>`
                    : `<span class="tag tag-formula">${this._esc(name)}</span>`;
            }).join('');
            detailHtml += `</div>`;
        }

        content.innerHTML = `
            <div class="card" style="padding:var(--space-lg);margin-bottom:var(--space-md);">
                <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
                    <h3 style="font-family:var(--font-display);color:var(--color-vermillion-dark);margin:0;">${this._esc(plan.title)}</h3>
                    <button class="btn btn-ghost" id="planBackBtn">← 返回</button>
                </div>
                ${plan.note ? `<p style="font-size:var(--text-sm);color:var(--color-ink-light);margin-top:var(--space-sm);">备注：${this._esc(plan.note)}</p>` : ''}
                <div style="margin-top:var(--space-md);">${detailHtml || '<p class="study-empty">该方案暂无详细内容</p>'}</div>
            </div>
        `;
        content.querySelector('#planBackBtn').addEventListener('click', () => this.renderBody(container));
        content.querySelectorAll('.formula-link').forEach(tag => {
            tag.addEventListener('click', () => { if (typeof DetailModal !== 'undefined') DetailModal.open('formula', tag.dataset.formulaId); });
        });
    }

    _esc(v) {
        return String(v || '').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
}

if (typeof window !== 'undefined') {
    window.Plans = Plans;
    window.PlansModule = PlansModule;
}
