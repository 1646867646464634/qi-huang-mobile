// ===== 岐黄·辅助诊疗系统 - 收藏夹与浏览历史模块 =====
class FavoritesModule {
    constructor() {
        this.activeSection = 'favorites';
    }

    render(container) {
        container.innerHTML = `
            <div class="module-page favorites-page">
                <div class="page-header">
                    <h2 class="page-title">
                        <span class="seal-stamp">藏</span>
                        收藏夹与浏览历史
                    </h2>
                    <p class="page-subtitle">收藏的重点知识与最近浏览记录，一键回到详情</p>
                </div>

                <div class="fav-section-tabs">
                    <button class="fav-section-tab ${this.activeSection === 'favorites' ? 'active' : ''}" data-section="favorites">⭐ 收藏夹</button>
                    <button class="fav-section-tab ${this.activeSection === 'history' ? 'active' : ''}" data-section="history">🕘 浏览历史</button>
                </div>

                <div id="favContent"></div>
            </div>
        `;

        container.querySelectorAll('.fav-section-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                this.activeSection = tab.dataset.section;
                container.querySelectorAll('.fav-section-tab').forEach(t => t.classList.toggle('active', t === tab));
                this.renderSection(container);
            });
        });

        this.renderSection(container);
    }

    renderSection(container) {
        const content = container.querySelector('#favContent');
        const key = this.activeSection === 'favorites' ? 'tcm_favorites' : 'tcm_history';
        const items = Storage.get(key, []);
        const typeLabel = { herb: '中药', formula: '方剂', syndrome: '证型' };

        if (items.length === 0) {
            content.innerHTML = `<p class="study-empty">${this.activeSection === 'favorites' ? '收藏夹还是空的。在中药/方剂/证型详情弹窗中点击「收藏」即可加入。' : '暂无浏览记录。'}</p>`;
            return;
        }

        content.innerHTML = `
            <div class="fav-grid">
                ${items.map((item, i) => `
                    <div class="fav-card" data-type="${item.type}" data-id="${item.id}">
                        <div class="fav-card-type">${typeLabel[item.type] || item.type}</div>
                        <div class="fav-card-name">${item.title || ''}</div>
                        <div class="fav-card-time">${new Date(item.time).toLocaleString('zh-CN')}</div>
                        ${this.activeSection === 'favorites'
                            ? `<button class="fav-card-remove" data-idx="${i}">✕ 移除收藏</button>`
                            : `<button class="fav-card-remove" data-idx="${i}">✕ 清除记录</button>`}
                    </div>
                `).join('')}
            </div>
            <div style="margin-top: var(--space-lg);">
                <button class="btn btn-ghost" id="clearAllFavsBtn">${this.activeSection === 'favorites' ? '清空全部收藏' : '清空浏览记录'}</button>
            </div>
        `;

        content.querySelectorAll('.fav-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.classList.contains('fav-card-remove')) return;
                if (typeof DetailModal !== 'undefined') {
                    DetailModal.open(card.dataset.type, card.dataset.id);
                }
            });
        });

        content.querySelectorAll('.fav-card-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const items = Storage.get(key, []);
                items.splice(parseInt(btn.dataset.idx, 10), 1);
                Storage.set(key, items);
                Toast.show('已移除', 'info');
                this.renderSection(container);
            });
        });

        const clearBtn = content.querySelector('#clearAllFavsBtn');
        if (clearBtn) clearBtn.addEventListener('click', () => {
            if (confirm(`确定清空${this.activeSection === 'favorites' ? '全部收藏' : '浏览记录'}吗？`)) {
                Storage.remove(key);
                Toast.show('已清空', 'success');
                this.renderSection(container);
            }
        });
    }
}

if (typeof window !== 'undefined') {
    window.FavoritesModule = FavoritesModule;
}
