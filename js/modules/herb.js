// ===== 岐黄·辅助诊疗系统 - 中药百科模块 =====
class HerbModule {
    constructor() {
        this.currentCategory = null;
        this.searchQuery = '';
        this.activeModal = null;
    }

    render(container) {
        this.currentCategory = this.currentCategory || '__all__';
        const herbs = this.getFilteredHerbs();

        container.innerHTML = `
            <div class="module-page herb-page">
                <div class="page-header">
                    <h2 class="page-title">
                        <span class="seal-stamp">药</span>
                        中药百科
                    </h2>
                    <p class="page-subtitle">收录${herbsDatabase.length}味常用中药材，按中医传统分类浏览</p>
                </div>

                <div class="search-wrapper">
                    <span class="search-icon">🔍</span>
                    <input type="text" class="search-input" id="herbSearchInput"
                           placeholder="搜索中药名称、拼音、功效、关键词..."
                           value="${this.escapeHtml(this.searchQuery)}">
                </div>

                ${this.renderCategoryTabs(container)}

                <div class="herb-stats" style="margin-bottom:var(--space-md);font-size:var(--text-sm);color:var(--color-ink-light);">
                    当前分类：<strong style="color:var(--color-vermillion-dark);">${this.currentCategory === '__all__' ? '全部分类' : this.currentCategory}</strong>，共 <strong>${herbs.length}</strong> 味
                </div>

                ${herbs.length > 0 ? this.renderHerbGrid(herbs) : this.renderEmptyState()}
            </div>
        `;

        this.bindEvents(container);
    }

    renderCategoryTabs(container) {
        const categories = Object.keys(herbCategories);
        return `
            <div class="category-tabs" id="herbCategoryTabs">
                <button class="category-tab ${this.currentCategory === '__all__' ? 'active' : ''}"
                        data-category="__all__">
                    全部分类
                </button>
                ${categories.map(cat => `
                    <button class="category-tab ${cat === this.currentCategory ? 'active' : ''}"
                            data-category="${this.escapeHtml(cat)}">
                        ${cat}
                    </button>
                `).join('')}
            </div>
        `;
    }

    renderHerbGrid(herbs) {
        return `
            <div class="grid-3" id="herbGrid">
                ${herbs.map(herb => this.renderHerbCard(herb)).join('')}
            </div>
        `;
    }

    renderHerbCard(herb) {
        const natureClass = getNatureTagClass(herb.nature);
        const firstTaste = herb.tastes[0] || '';
        const firstMeridian = herb.meridians[0] || '';
        const firstFunc = herb.functions[0] || '';

        return `
            <div class="card herb-card" data-herb-id="${herb.id}" style="cursor:pointer;">
                <div class="herb-card-header" style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:var(--space-sm);">
                    <div>
                        <h3 style="font-family:var(--font-heading);font-size:var(--text-xl);color:var(--color-ink-dark);margin:0;">
                            ${herb.name}
                        </h3>
                        <span style="font-size:var(--text-xs);color:var(--color-ink-pale);display:block;margin-top:2px;">
                            ${herb.pinyin}
                        </span>
                    </div>
                    <span class="tag ${natureClass}" style="font-size:var(--text-sm);padding:4px 10px;">
                        ${herb.nature}性
                    </span>
                </div>

                <div style="margin-bottom:var(--space-sm);">
                    <span style="font-size:var(--text-xs);color:var(--color-ink-pale);">${herb.category}</span>
                    ${herb.subcategory ? `<span style="font-size:var(--text-xs);color:var(--color-ink-pale);margin-left:4px;">· ${herb.subcategory}</span>` : ''}
                </div>

                <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:var(--space-sm);">
                    ${herb.tastes.map(t => `<span class="tag tag-plain">${t}</span>`).join('')}
                    <span class="tag tag-plain">${firstMeridian}</span>
                </div>

                <p style="font-size:var(--text-sm);color:var(--color-ink-light);line-height:1.5;margin:0;">
                    ${firstFunc}${herb.functions.length > 1 ? '…' : ''}
                </p>
            </div>
        `;
    }

    renderEmptyState() {
        return `
            <div style="text-align:center;padding:var(--space-3xl);">
                <div style="font-size:48px;margin-bottom:var(--space-md);opacity:0.3;">🌿</div>
                <p style="color:var(--color-ink-light);font-size:var(--text-lg);">未找到匹配的中药</p>
                <p style="color:var(--color-ink-pale);font-size:var(--text-sm);margin-top:var(--space-xs);">
                    尝试更换搜索关键词或切换分类
                </p>
            </div>
        `;
    }

    // ===== 筛选逻辑 =====

    getFilteredHerbs() {
        let herbs = [];

        if (this.currentCategory && this.currentCategory !== '__all__') {
            herbs = this.getHerbsByCategory(this.currentCategory);
        } else {
            herbs = [...herbsDatabase];
        }

        if (this.searchQuery.trim()) {
            herbs = this.searchHerbs(herbs, this.searchQuery.trim());
        }

        return herbs;
    }

    getHerbsByCategory(categoryName) {
        const cat = herbCategories[categoryName];
        if (!cat) return [];

        const ids = new Set();
        Object.values(cat).forEach(subCatHerbs => {
            if (Array.isArray(subCatHerbs)) {
                subCatHerbs.forEach(h => ids.add(h.id));
            }
        });

        return herbsDatabase.filter(h => ids.has(h.id));
    }

    searchHerbs(herbs, query) {
        const q = query.toLowerCase();
        return herbs.filter(h => {
            if (h.name.toLowerCase().includes(q)) return true;
            if (h.pinyin.toLowerCase().includes(q)) return true;
            if (h.keywords && h.keywords.some(k => k.toLowerCase().includes(q))) return true;
            if (h.functions && h.functions.some(f => f.toLowerCase().includes(q))) return true;
            if (h.indications && h.indications.some(i => i.toLowerCase().includes(q))) return true;
            if (h.tastes && h.tastes.some(t => t.toLowerCase().includes(q))) return true;
            if (h.latinName && h.latinName.toLowerCase().includes(q)) return true;
            return false;
        });
    }

    // ===== 详情弹窗 =====

    renderComparisons(herb) {
        // 查找包含当前药名的对比组
        const groups = window.herbComparisons || [];
        const related = groups.filter(g =>
            g.items.some(item => item.name.includes(herb.name) || herb.name.includes(item.name.split(' ')[0]) || item.name.split(' ')[0] === herb.name)
        );
        if (related.length === 0) return '';

        return related.map(group => `
            <div class="card detail-full" style="padding:var(--space-md);background:rgba(59,94,139,0.04);border-color:rgba(59,94,139,0.2);">
                <h4 style="font-family:var(--font-heading);color:var(--color-blue-porcelain,#3B5E8B);font-size:var(--text-base);margin:0 0 var(--space-sm) 0;padding-bottom:var(--space-xs);border-bottom:1px solid rgba(59,94,139,0.15);">
                    ⚖ 同类对比 · ${group.group}
                </h4>
                <div style="display:grid;gap:var(--space-sm);">
                    ${group.items.map(item => `
                        <div style="font-size:var(--text-sm);line-height:1.8;">
                            <strong style="color:var(--color-ink-dark);">${item.name}：</strong>
                            <span style="color:var(--color-ink-light);">${item.items}</span>
                        </div>
                    `).join('')}
                </div>
                <p style="font-size:var(--text-xs);color:var(--color-ink-pale);margin-top:var(--space-sm);border-top:1px dashed rgba(59,94,139,0.2);padding-top:var(--space-xs);">
                    ${group.summary}
                </p>
            </div>
        `).join('');
    }

    // 药材影像展示（原貌图 + 饮片图），来源见 js/data/herb-images.js；未配置则显示占位
    renderHerbImages(herb) {
        const img = (typeof herbImages !== 'undefined') ? herbImages.get(herb.id) : null;
        // 优先本地路径（运行 download-herb-images.js 后生成），否则用远程直链
        const originalUrl = (img && img.localOriginal) || (img && img.originalUrl) || '';
        const yinpianUrl = (img && img.localYinpian) || (img && img.yinpianUrl) || '';
        const hasAny = originalUrl || yinpianUrl;

        // 远程 wikimedia 直链追加宽度缩略参数以减小下载量；本地路径不做处理
        const optimizeUrl = (url) => {
            if (!url) return '';
            if (url.indexOf('upload.wikimedia.org') !== -1 && url.indexOf('?') === -1) {
                return url + '?width=800';
            }
            return url;
        };

        const imgCard = (url, label, alt) => `
            <div class="herb-img-item">
                ${url ? `
                    <a href="${url}" target="_blank" rel="noopener noreferrer" class="herb-img-link">
                        <img src="${optimizeUrl(url)}" alt="${alt}" loading="lazy" decoding="async" class="herb-img"
                             onerror="this.parentElement.classList.add('img-error');this.remove();">
                        <span class="herb-img-zoom">🔍 查看大图</span>
                    </a>
                ` : `
                    <div class="herb-img-placeholder">
                        <span class="herb-img-ph">🖼</span>
                        <span class="herb-img-placeholder-text">图片待补充</span>
                    </div>
                `}
                <span class="herb-img-label">${label}</span>
            </div>
        `;

        return `
            <div class="herb-images ${hasAny ? '' : 'herb-images-empty'}" style="margin-top:var(--space-md);">
                ${imgCard(originalUrl, '药材原貌', `${herb.name} 药材原貌图`)}
                ${imgCard(yinpianUrl, '中药饮片', `${herb.name} 中药饮片图`)}
            </div>
        `;
    }

    showHerbDetail(herbId) {
        const herb = herbsDatabase.find(h => h.id === herbId);
        if (!herb) return;

        this.closeModal();
        this.activeModal = this.renderModal(herb);
        document.body.appendChild(this.activeModal);
        this.bindModalEvents();
    }

    renderModal(herb) {
        const natureClass = getNatureTagClass(herb.nature);
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay herb-detail-modal';
        overlay.id = 'herbDetailModal';
        overlay.innerHTML = `
            <div class="modal-content" style="max-width:780px;">
                <button class="modal-close" id="herbModalClose">&times;</button>

                <div class="modal-title" style="display:flex;align-items:center;gap:var(--space-md);flex-wrap:wrap;">
                    <span style="font-family:var(--font-display);font-size:var(--text-2xl);">${herb.name}</span>
                    <span style="font-size:var(--text-lg);color:var(--color-ink-light);">${herb.pinyin}</span>
                    <span class="tag ${natureClass}" style="font-size:var(--text-sm);padding:4px 12px;">${herb.nature}性</span>
                </div>

                ${this.renderHerbImages(herb)}

                <div class="detail-grid" style="margin-top:var(--space-lg);">
                    <!-- 基本信息 -->
                    <div class="card detail-full" style="padding:var(--space-md);">
                        <h4 style="font-family:var(--font-heading);color:var(--color-vermillion-dark);font-size:var(--text-base);margin:0 0 var(--space-sm) 0;padding-bottom:var(--space-xs);border-bottom:1px solid rgba(184,134,11,0.15);">基本信息</h4>
                        <div class="report-field">
                            <span class="report-label">拉丁名</span>
                            <span class="report-value" style="font-style:italic;">${herb.latinName}</span>
                        </div>
                        <div class="report-field">
                            <span class="report-label">分类</span>
                            <span class="report-value">${herb.category}${herb.subcategory ? ' > ' + herb.subcategory : ''}</span>
                        </div>
                    </div>

                    <!-- 性味归经 -->
                    <div class="card" style="padding:var(--space-md);">
                        <h4 style="font-family:var(--font-heading);color:var(--color-vermillion-dark);font-size:var(--text-base);margin:0 0 var(--space-sm) 0;padding-bottom:var(--space-xs);border-bottom:1px solid rgba(184,134,11,0.15);">性味</h4>
                        <div style="display:flex;flex-wrap:wrap;gap:6px;">
                            <span class="tag ${natureClass}" style="padding:4px 12px;font-size:var(--text-sm);">${herb.nature}性</span>
                            ${herb.tastes.map(t => `<span class="tag tag-plain" style="padding:4px 12px;font-size:var(--text-sm);">${t}</span>`).join('')}
                        </div>
                    </div>

                    <div class="card" style="padding:var(--space-md);">
                        <h4 style="font-family:var(--font-heading);color:var(--color-vermillion-dark);font-size:var(--text-base);margin:0 0 var(--space-sm) 0;padding-bottom:var(--space-xs);border-bottom:1px solid rgba(184,134,11,0.15);">归经</h4>
                        <div style="display:flex;flex-wrap:wrap;gap:6px;">
                            ${herb.meridians.map(m => `<span class="tag tag-plain" style="padding:4px 12px;font-size:var(--text-sm);">${m}</span>`).join('')}
                        </div>
                    </div>

                    <!-- 功效 -->
                    <div class="card detail-full" style="padding:var(--space-md);">
                        <h4 style="font-family:var(--font-heading);color:var(--color-vermillion-dark);font-size:var(--text-base);margin:0 0 var(--space-sm) 0;padding-bottom:var(--space-xs);border-bottom:1px solid rgba(184,134,11,0.15);">功效</h4>
                        <div class="composition-list">
                            ${herb.functions.map(f => `
                                <span class="composition-item" style="background:rgba(192,64,64,0.06);color:var(--color-vermillion-dark);font-weight:500;">
                                    ${f}
                                </span>
                            `).join('')}
                        </div>
                    </div>

                    <!-- 主治 -->
                    <div class="card detail-full" style="padding:var(--space-md);">
                        <h4 style="font-family:var(--font-heading);color:var(--color-vermillion-dark);font-size:var(--text-base);margin:0 0 var(--space-sm) 0;padding-bottom:var(--space-xs);border-bottom:1px solid rgba(184,134,11,0.15);">主治</h4>
                        <ul style="list-style:disc;padding-left:var(--space-lg);margin:0;">
                            ${herb.indications.map(i => `
                                <li style="margin-bottom:var(--space-xs);font-size:var(--text-sm);color:var(--color-ink-light);line-height:1.6;">${i}</li>
                            `).join('')}
                        </ul>
                    </div>

                    <!-- 用法 -->
                    <div class="card detail-full" style="padding:var(--space-md);">
                        <h4 style="font-family:var(--font-heading);color:var(--color-vermillion-dark);font-size:var(--text-base);margin:0 0 var(--space-sm) 0;padding-bottom:var(--space-xs);border-bottom:1px solid rgba(184,134,11,0.15);">用法</h4>
                        <p style="font-size:var(--text-sm);color:var(--color-ink-light);line-height:1.8;margin:0;">
                            ${herb.usage}
                        </p>
                    </div>

                    <!-- 禁忌 -->
                    <div class="card detail-full" style="padding:var(--space-md);border-color:rgba(192,64,64,0.2);">
                        <h4 style="font-family:var(--font-heading);color:var(--color-danger);font-size:var(--text-base);margin:0 0 var(--space-sm) 0;padding-bottom:var(--space-xs);border-bottom:1px solid rgba(192,64,64,0.15);">
                            ⚠ 使用注意
                        </h4>
                        <ul style="list-style:disc;padding-left:var(--space-lg);margin:0;">
                            ${herb.contraindications.map(c => `
                                <li style="margin-bottom:var(--space-xs);font-size:var(--text-sm);color:var(--color-danger);line-height:1.6;">${c}</li>
                            `).join('')}
                        </ul>
                    </div>

                    ${typeof herbComparisons !== 'undefined' ? this.renderComparisons(herb) : ''}

                    ${herb.tags && herb.tags.length > 0 ? `
                    <!-- 标签 -->
                    <div class="card detail-full" style="padding:var(--space-md);">
                        <h4 style="font-family:var(--font-heading);color:var(--color-vermillion-dark);font-size:var(--text-base);margin:0 0 var(--space-sm) 0;padding-bottom:var(--space-xs);border-bottom:1px solid rgba(184,134,11,0.15);">标签</h4>
                        <div class="composition-list">
                            ${herb.tags.map(t => `<span class="tag tag-plain">${t}</span>`).join('')}
                        </div>
                    </div>
                    ` : ''}
                </div>

                <div class="disclaimer" style="margin-top:var(--space-lg);">
                    <strong>提示：</strong>以上内容仅供参考学习，具体用药请遵医嘱。中药使用需辨证论治，不可自行随意服用。
                </div>
            </div>
        `;

        return overlay;
    }

    closeModal() {
        if (this.activeModal) {
            this.activeModal.remove();
            this.activeModal = null;
        }
    }

    bindModalEvents() {
        if (!this.activeModal) return;

        // 关闭按钮
        const closeBtn = this.activeModal.querySelector('#herbModalClose');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeModal());
        }

        // 点击遮罩关闭
        this.activeModal.addEventListener('click', (e) => {
            if (e.target === this.activeModal) {
                this.closeModal();
            }
        });

        // ESC 关闭
        this._escHandler = (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        };
        document.addEventListener('keydown', this._escHandler);
    }

    // ===== 事件绑定 =====

    bindEvents(container) {
        // 分类标签页切换
        DOM.$$('.category-tab', container).forEach(tab => {
            tab.addEventListener('click', () => {
                this.currentCategory = tab.dataset.category;
                this.render(container);
            });
        });

        // 搜索输入
        const searchInput = DOM.$('#herbSearchInput', container);
        if (searchInput) {
            let debounceTimer;
            searchInput.addEventListener('input', () => {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(() => {
                    this.searchQuery = searchInput.value;
                    this.render(container);
                }, 300);
            });
        }

        // 药材卡片点击（统一走 DetailModal，支持收藏/历史/交叉链接）
        DOM.$$('.herb-card', container).forEach(card => {
            card.addEventListener('click', () => {
                if (typeof DetailModal !== 'undefined') {
                    DetailModal.open('herb', card.dataset.herbId);
                } else {
                    this.showHerbDetail(card.dataset.herbId);
                }
            });
        });
    }

    escapeHtml(str) {
        if (!str) return '';
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    destroy() {
        this.closeModal();
        if (this._escHandler) {
            document.removeEventListener('keydown', this._escHandler);
            this._escHandler = null;
        }
    }
}

// ===== 辅助函数 =====

/**
 * 根据药性获取对应的标签CSS类名
 */
function getNatureTagClass(nature) {
    if (!nature) return 'tag-plain';
    if (nature.includes('热') || nature === '大热') return 'tag-hot';
    if (nature.includes('温') || nature === '微温') return 'tag-warm';
    if (nature.includes('寒') || nature === '大寒' || nature === '微寒') return 'tag-cold';
    if (nature.includes('凉')) return 'tag-cool';
    if (nature.includes('平')) return 'tag-neutral';
    return 'tag-plain';
}
