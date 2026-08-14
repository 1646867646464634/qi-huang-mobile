// ===== 岐黄·辅助诊疗系统 - 方剂推荐模块 =====
class FormulaModule {
    constructor() {
        this.currentCategory = null;
        this.searchQuery = '';
        this.activeModal = null;
        this.showRecommendations = true;
    }

    render(container) {
        const constitutionResult = Storage.get(CONSTANTS.STORAGE_KEYS.CONSTITUTION_RESULT);
        const hasConstitution = constitutionResult && constitutionResult.primaryType;

        this.currentCategory = this.currentCategory || '__all__';
        const formulas = this.getFilteredFormulas();
        const recommendedFormulas = hasConstitution ? this.getConstitutionRecommendations(constitutionResult) : [];

        container.innerHTML = `
            <div class="module-page formula-page">
                <div class="page-header">
                    <h2 class="page-title">
                        <span class="seal-stamp">方</span>
                        方剂推荐
                    </h2>
                    <p class="page-subtitle">收录${formulasDatabase.length}首经典方剂，覆盖${Object.keys(formulaCategories).length}大类方剂学体系</p>
                </div>

                ${hasConstitution && this.showRecommendations && recommendedFormulas.length > 0 ? this.renderRecommendationSection(recommendedFormulas, constitutionResult, container) : ''}

                <div class="search-wrapper">
                    <span class="search-icon">🔍</span>
                    <input type="text" class="search-input" id="formulaSearchInput"
                           placeholder="搜索方剂名称、功效、主治、关键词..."
                           value="${this.escapeHtml(this.searchQuery)}">
                </div>

                ${this.renderCategoryTabs()}

                <div style="margin-bottom:var(--space-md);font-size:var(--text-sm);color:var(--color-ink-light);">
                    当前分类：<strong style="color:var(--color-vermillion-dark);">${this.currentCategory === '__all__' ? '全部分类' : this.currentCategory}</strong>，共 <strong>${formulas.length}</strong> 方
                </div>

                ${formulas.length > 0 ? this.renderFormulaGrid(formulas) : this.renderEmptyState()}
            </div>
        `;

        this.bindEvents(container);
    }

    // ===== 体质推荐区块 =====

    renderRecommendationSection(formulas, constitutionResult, container) {
        const { primaryType, biasedTypes } = constitutionResult;

        let recommendDesc = '';
        if (Array.isArray(biasedTypes) && biasedTypes.length > 0) {
            const types = biasedTypes.includes(primaryType) ? biasedTypes : [primaryType, ...biasedTypes];
            recommendDesc = `根据您的体质辨识结果（${types.join('、')}），以下方剂与您的体质特征相关，供您了解学习`;
        } else {
            recommendDesc = `根据您的体质辨识结果（${primaryType}），以下方剂与您的体质特征相关，供您了解学习`;
        }

        // 画像个性化：妊娠/哺乳期过滤含禁忌药的方剂
        let displayFormulas = formulas;
        let pregnancyNote = '';
        if (typeof Profile !== 'undefined' && typeof SAFETY !== 'undefined' && Profile.isPregnantOrNursing()) {
            const safe = formulas.filter(f => {
                const report = SAFETY.checkFormulaSafety(f);
                return report.pregnancy.length === 0;
            });
            const filteredCount = formulas.length - safe.length;
            displayFormulas = safe;
            pregnancyNote = filteredCount > 0
                ? `（已为您过滤 ${filteredCount} 首含孕产禁忌药的方剂）`
                : '';
        }

        return `
            <div class="card fret-border" style="margin-bottom:var(--space-xl);padding:var(--space-lg);background:rgba(192,64,64,0.03);border-color:rgba(192,64,64,0.2);">
                <div style="display:flex;align-items:center;gap:var(--space-md);margin-bottom:var(--space-md);">
                    <span class="seal-stamp" style="width:40px;height:40px;font-size:12px;">荐</span>
                    <div>
                        <h3 style="font-family:var(--font-heading);color:var(--color-vermillion-dark);margin:0;">为您推荐</h3>
                        <p style="font-size:var(--text-sm);color:var(--color-ink-light);margin:4px 0 0 0;">${recommendDesc}${pregnancyNote}</p>
                    </div>
                </div>

                <div class="grid-2" style="margin-top:var(--space-md);">
                    ${displayFormulas.slice(0, 4).map(f => this.renderFormulaCard(f, true)).join('')}
                </div>

                ${displayFormulas.length > 4 ? `
                    <div style="text-align:center;margin-top:var(--space-md);">
                        <span style="font-size:var(--text-xs);color:var(--color-ink-pale);">
                            共找到 ${displayFormulas.length} 方与您的体质相关
                        </span>
                    </div>
                ` : ''}
                ${displayFormulas.length === 0 ? `
                    <p style="font-size:var(--text-sm);color:var(--color-bronze-dark);margin-top:var(--space-sm);">
                        当前体质相关方剂均含孕产禁忌成分，建议咨询专业中医师选择合适方案。
                    </p>
                ` : ''}
            </div>
        `;
    }

    // ===== 分类标签 =====

    renderCategoryTabs() {
        const categories = Object.keys(formulaCategories);
        return `
            <div class="category-tabs" id="formulaCategoryTabs">
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

    // ===== 方剂卡片网格 =====

    renderFormulaGrid(formulas) {
        return `
            <div class="grid-2" id="formulaGrid">
                ${formulas.map(f => this.renderFormulaCard(f, false)).join('')}
            </div>
        `;
    }

    renderFormulaCard(formula, isRecommend) {
        const firstFunc = formula.functions[0] || '';
        const firstIndication = formula.indications[0] || '';
        const itemCount = formula.composition ? formula.composition.length : 0;

        return `
            <div class="card formula-card" data-formula-id="${formula.id}" style="cursor:pointer;${isRecommend ? 'border-left:3px solid var(--color-vermillion);' : ''}">
                <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:var(--space-sm);">
                    <div>
                        <h3 style="font-family:var(--font-heading);font-size:var(--text-xl);color:var(--color-ink-dark);margin:0;">
                            ${isRecommend ? '<span style="font-size:var(--text-xs);color:var(--color-vermillion);">★</span> ' : ''}${formula.name}
                        </h3>
                        <div style="font-size:var(--text-xs);color:var(--color-ink-pale);margin-top:2px;">
                            ${formula.pinyin} · ${formula.source}
                        </div>
                    </div>
                    <span class="tag tag-plain" style="font-size:var(--text-xs);">${formula.category}</span>
                </div>

                <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:var(--space-sm);">
                    ${formula.functions.slice(0, 3).map(fn => `
                        <span class="tag tag-plain" style="background:rgba(184,134,11,0.08);color:var(--color-bronze-dark);">${fn}</span>
                    `).join('')}
                    ${formula.functions.length > 3 ? `<span class="tag tag-plain">+${formula.functions.length - 3}</span>` : ''}
                </div>

                <p style="font-size:var(--text-sm);color:var(--color-ink-light);line-height:1.5;margin:0 0 var(--space-sm) 0;">
                    ${firstIndication}
                </p>

                <div style="display:flex;align-items:center;gap:var(--space-sm);font-size:var(--text-xs);color:var(--color-ink-pale);">
                    <span>组成：${itemCount}味</span>
                    ${formula.subcategory ? `<span>· ${formula.subcategory}</span>` : ''}
                </div>
            </div>
        `;
    }

    renderEmptyState() {
        return `
            <div style="text-align:center;padding:var(--space-3xl);">
                <div style="font-size:48px;margin-bottom:var(--space-md);opacity:0.3;">📜</div>
                <p style="color:var(--color-ink-light);font-size:var(--text-lg);">未找到匹配的方剂</p>
                <p style="color:var(--color-ink-pale);font-size:var(--text-sm);margin-top:var(--space-xs);">
                    尝试更换搜索关键词或切换分类
                </p>
            </div>
        `;
    }

    // ===== 筛选逻辑 =====

    getFilteredFormulas() {
        let formulas = [];

        if (this.currentCategory && this.currentCategory !== '__all__') {
            formulas = this.getFormulasByCategory(this.currentCategory);
        } else {
            formulas = [...formulasDatabase];
        }

        if (this.searchQuery.trim()) {
            formulas = this.searchFormulas(formulas, this.searchQuery.trim());
        }

        return formulas;
    }

    getFormulasByCategory(categoryName) {
        const cat = formulaCategories[categoryName];
        if (!cat) return [];

        const ids = new Set();
        Object.values(cat).forEach(subCatIds => {
            if (Array.isArray(subCatIds)) {
                subCatIds.forEach(id => ids.add(id));
            }
        });

        return formulasDatabase.filter(f => ids.has(f.id));
    }

    searchFormulas(formulas, query) {
        const q = query.toLowerCase();
        return formulas.filter(f => {
            if (f.name.toLowerCase().includes(q)) return true;
            if (f.pinyin.toLowerCase().includes(q)) return true;
            if (f.functions && f.functions.some(fn => fn.toLowerCase().includes(q))) return true;
            if (f.indications && f.indications.some(i => i.toLowerCase().includes(q))) return true;
            if (f.source && f.source.toLowerCase().includes(q)) return true;
            if (f.keyPoints && f.keyPoints.some(k => k.toLowerCase().includes(q))) return true;
            if (f.analysis && f.analysis.toLowerCase().includes(q)) return true;
            if (f.composition && f.composition.some(c => c.herbName.toLowerCase().includes(q))) return true;
            return false;
        });
    }

    // ===== 体质推荐 =====

    getConstitutionRecommendations(constitutionResult) {
        if (!constitutionResult) return [];

        const { primaryType, biasedTypes } = constitutionResult;
        const matchTypes = new Set();

        if (primaryType) matchTypes.add(primaryType);
        if (Array.isArray(biasedTypes)) {
            biasedTypes.forEach(t => matchTypes.add(t));
        }

        return formulasDatabase.filter(f => {
            if (!f.relatedConstitutions || !Array.isArray(f.relatedConstitutions)) return false;
            return f.relatedConstitutions.some(ct => matchTypes.has(ct));
        });
    }

    // ===== 详情弹窗 =====

    showFormulaDetail(formulaId) {
        const formula = formulasDatabase.find(f => f.id === formulaId);
        if (!formula) return;

        this.closeModal();
        this.activeModal = this.renderModal(formula);
        document.body.appendChild(this.activeModal);
        this.bindModalEvents();
    }

    renderModal(formula) {
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay formula-detail-modal';
        overlay.id = 'formulaDetailModal';
        overlay.innerHTML = `
            <div class="modal-content" style="max-width:820px;">
                <button class="modal-close" id="formulaModalClose">&times;</button>

                <div class="modal-title" style="display:flex;align-items:center;gap:var(--space-md);flex-wrap:wrap;">
                    <span style="font-family:var(--font-display);font-size:var(--text-2xl);">${formula.name}</span>
                    <span style="font-size:var(--text-lg);color:var(--color-ink-light);">${formula.pinyin}</span>
                </div>

                <div style="margin-top:var(--space-md);padding-bottom:var(--space-md);border-bottom:1px solid rgba(184,134,11,0.15);">
                    <span style="font-size:var(--text-sm);color:var(--color-ink-light);">
                        出处：<strong style="color:var(--color-bronze-dark);">${formula.source}</strong>
                    </span>
                    <span style="font-size:var(--text-sm);color:var(--color-ink-light);margin-left:var(--space-lg);">
                        分类：<strong>${formula.category}${formula.subcategory ? ' > ' + formula.subcategory : ''}</strong>
                    </span>
                </div>

                ${typeof formulaVerses !== 'undefined' && formulaVerses[formula.name] ? `
                    <div class="card" style="margin-top:var(--space-lg);padding:var(--space-md);background:rgba(184,134,11,0.06);border:1px solid rgba(184,134,11,0.2);">
                        <h4 style="font-family:var(--font-heading);color:var(--color-bronze-dark);font-size:var(--text-base);margin:0 0 var(--space-sm) 0;padding-bottom:var(--space-xs);border-bottom:1px solid rgba(184,134,11,0.15);">
                            📜 方歌（背诵）
                        </h4>
                        <p style="font-size:var(--text-sm);line-height:2.2;color:var(--color-ink-dark);font-family:var(--font-display);letter-spacing:1px;">
                            ${formulaVerses[formula.name]}
                        </p>
                    </div>
                ` : ''}

                <div class="detail-grid" style="margin-top:var(--space-lg);">
                    <!-- 组成 -->
                    <div class="card detail-full" style="padding:var(--space-md);">
                        <h4 style="font-family:var(--font-heading);color:var(--color-vermillion-dark);font-size:var(--text-base);margin:0 0 var(--space-sm) 0;padding-bottom:var(--space-xs);border-bottom:1px solid rgba(184,134,11,0.15);">
                            组成药物
                        </h4>
                        <div class="composition-list">
                            ${formula.composition.map(c => `
                                <div class="composition-item">
                                    <span style="font-weight:600;color:var(--color-ink-dark);">${c.herbName}</span>
                                    <span style="color:var(--color-ink-light);">${c.dosage}</span>
                                    <span class="composition-role">${c.role}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- 功效 -->
                    <div class="card" style="padding:var(--space-md);">
                        <h4 style="font-family:var(--font-heading);color:var(--color-vermillion-dark);font-size:var(--text-base);margin:0 0 var(--space-sm) 0;padding-bottom:var(--space-xs);border-bottom:1px solid rgba(184,134,11,0.15);">功效</h4>
                        <div class="composition-list">
                            ${formula.functions.map(fn => `
                                <span class="composition-item" style="background:rgba(192,64,64,0.06);color:var(--color-vermillion-dark);font-weight:500;">
                                    ${fn}
                                </span>
                            `).join('')}
                        </div>
                    </div>

                    <!-- 主治 -->
                    <div class="card" style="padding:var(--space-md);">
                        <h4 style="font-family:var(--font-heading);color:var(--color-vermillion-dark);font-size:var(--text-base);margin:0 0 var(--space-sm) 0;padding-bottom:var(--space-xs);border-bottom:1px solid rgba(184,134,11,0.15);">主治</h4>
                        <ul style="list-style:disc;padding-left:var(--space-lg);margin:0;">
                            ${formula.indications.map(i => `
                                <li style="margin-bottom:var(--space-xs);font-size:var(--text-sm);color:var(--color-ink-light);line-height:1.6;">${i}</li>
                            `).join('')}
                        </ul>
                    </div>

                    <!-- 方解分析 -->
                    <div class="card detail-full" style="padding:var(--space-md);">
                        <h4 style="font-family:var(--font-heading);color:var(--color-vermillion-dark);font-size:var(--text-base);margin:0 0 var(--space-sm) 0;padding-bottom:var(--space-xs);border-bottom:1px solid rgba(184,134,11,0.15);">方解</h4>
                        <p style="font-size:var(--text-sm);color:var(--color-ink-light);line-height:2;margin:0;text-indent:2em;text-align:justify;">
                            ${formula.analysis}
                        </p>
                    </div>

                    ${formula.keyPoints && formula.keyPoints.length > 0 ? `
                    <!-- 辨证要点 -->
                    <div class="card detail-full" style="padding:var(--space-md);">
                        <h4 style="font-family:var(--font-heading);color:var(--color-vermillion-dark);font-size:var(--text-base);margin:0 0 var(--space-sm) 0;padding-bottom:var(--space-xs);border-bottom:1px solid rgba(184,134,11,0.15);">辨证要点</h4>
                        <div class="composition-list">
                            ${formula.keyPoints.map(kp => `
                                <span class="composition-item" style="background:rgba(59,94,139,0.06);color:var(--color-blue-porcelain);font-weight:500;">
                                    ${kp}
                                </span>
                            `).join('')}
                        </div>
                    </div>
                    ` : ''}

                    ${formula.relatedSyndromes && formula.relatedSyndromes.length > 0 ? `
                    <!-- 相关证型 -->
                    <div class="card" style="padding:var(--space-md);">
                        <h4 style="font-family:var(--font-heading);color:var(--color-vermillion-dark);font-size:var(--text-base);margin:0 0 var(--space-sm) 0;padding-bottom:var(--space-xs);border-bottom:1px solid rgba(184,134,11,0.15);">相关证型</h4>
                        <div class="composition-list">
                            ${formula.relatedSyndromes.map(s => `<span class="tag tag-plain">${s}</span>`).join('')}
                        </div>
                    </div>
                    ` : ''}

                    ${formula.relatedConstitutions && formula.relatedConstitutions.length > 0 ? `
                    <!-- 相关体质 -->
                    <div class="card" style="padding:var(--space-md);">
                        <h4 style="font-family:var(--font-heading);color:var(--color-vermillion-dark);font-size:var(--text-base);margin:0 0 var(--space-sm) 0;padding-bottom:var(--space-xs);border-bottom:1px solid rgba(184,134,11,0.15);">适用体质</h4>
                        <div class="composition-list">
                            ${formula.relatedConstitutions.map(rc => `
                                <span class="tag tag-plain" style="background:rgba(91,139,59,0.08);color:var(--color-success);">${rc}</span>
                            `).join('')}
                        </div>
                    </div>
                    ` : ''}

                    ${formula.modifications && formula.modifications.length > 0 ? `
                    <!-- 加减化裁 -->
                    <div class="card detail-full" style="padding:var(--space-md);">
                        <h4 style="font-family:var(--font-heading);color:var(--color-vermillion-dark);font-size:var(--text-base);margin:0 0 var(--space-sm) 0;padding-bottom:var(--space-xs);border-bottom:1px solid rgba(184,134,11,0.15);">加减化裁</h4>
                        <table style="width:100%;border-collapse:collapse;font-size:var(--text-sm);">
                            <tbody>
                                ${formula.modifications.map(m => `
                                    <tr style="border-bottom:1px solid rgba(184,134,11,0.08);">
                                        <td style="padding:var(--space-sm) var(--space-md);color:var(--color-bronze-dark);font-weight:500;white-space:nowrap;vertical-align:top;">${m.condition}</td>
                                        <td style="padding:var(--space-sm) var(--space-md);color:var(--color-ink-light);line-height:1.6;">${m.modification}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                    ` : ''}

                    <!-- 禁忌 -->
                    <div class="card detail-full" style="padding:var(--space-md);border-color:rgba(192,64,64,0.2);">
                        <h4 style="font-family:var(--font-heading);color:var(--color-danger);font-size:var(--text-base);margin:0 0 var(--space-sm) 0;padding-bottom:var(--space-xs);border-bottom:1px solid rgba(192,64,64,0.15);">
                            ⚠ 禁忌与注意
                        </h4>
                        <ul style="list-style:disc;padding-left:var(--space-lg);margin:0;">
                            ${formula.contraindications.map(c => `
                                <li style="margin-bottom:var(--space-xs);font-size:var(--text-sm);color:var(--color-danger);line-height:1.6;">${c}</li>
                            `).join('')}
                        </ul>
                    </div>
                </div>

                <div class="disclaimer" style="margin-top:var(--space-lg);">
                    <strong>提示：</strong>以上内容仅供参考学习，方剂的使用需在专业中医师辨证指导下进行，不可自行随意服用。
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

        const closeBtn = this.activeModal.querySelector('#formulaModalClose');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeModal());
        }

        this.activeModal.addEventListener('click', (e) => {
            if (e.target === this.activeModal) {
                this.closeModal();
            }
        });

        this._escHandler = (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        };
        document.addEventListener('keydown', this._escHandler);
    }

    // ===== 事件绑定 =====

    bindEvents(container) {
        // 分类标签切换
        DOM.$$('.category-tab', container).forEach(tab => {
            tab.addEventListener('click', () => {
                this.currentCategory = tab.dataset.category;
                this.showRecommendations = false;
                this.render(container);
            });
        });

        // 搜索输入
        const searchInput = DOM.$('#formulaSearchInput', container);
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

        // 方剂卡片点击（统一走 DetailModal，支持收藏/历史/交叉链接）
        DOM.$$('.formula-card', container).forEach(card => {
            card.addEventListener('click', () => {
                if (typeof DetailModal !== 'undefined') {
                    DetailModal.open('formula', card.dataset.formulaId);
                } else {
                    this.showFormulaDetail(card.dataset.formulaId);
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
