// ===== 岐黄·辅助诊疗系统 - 症状辨证模块 =====
class SymptomModule {
    constructor() {
        this.searchQuery = '';
        this.selectedSymptoms = [];
        this.searchResults = null;
        this.activeResultIndex = -1;
    }

    render(container) {
        const allSymptoms = Object.keys(symptomSyndromeMapping);

        // 读取 URL 参数（支持从舌诊/面诊等模块跳转带 search 自动辨证）
        const urlParams = (window.appRouter && window.appRouter.getParams) ? window.appRouter.getParams() : {};
        const initialQuery = (urlParams.search || '').toString();

        this.selectedSymptoms = [];
        this.searchResults = null;
        this.searchQuery = initialQuery;
        this.activeDimension = 'body';   // 当前维度：body / sensation
        this.qcFilter = '';             // 快速选择过滤词

        container.innerHTML = `
            <div class="module-page symptom-page">
                <div class="page-header">
                    <h2 class="page-title">
                        <span class="seal-stamp">证</span>
                        症状辨证分析
                    </h2>
                    <p class="page-subtitle">基于症状-证型映射知识库，本地规则引擎推演辨证参考</p>
                </div>

                <div class="card" style="margin-bottom: var(--space-lg);">
                    <div class="qc-head">
                        <p class="qc-title">常见症状快速选择</p>
                        <div class="qc-tools">
                            <button class="btn btn-ghost qc-tool-btn" id="qcExpandAllBtn">▼ 全部展开</button>
                            <button class="btn btn-ghost qc-tool-btn" id="qcCollapseAllBtn">▲ 全部收起</button>
                        </div>
                    </div>
                    <div class="qc-dim-tabs">
                        <button class="qc-dim-tab ${this.activeDimension === 'body' ? 'active' : ''}" data-dim="body">📍 按部位</button>
                        <button class="qc-dim-tab ${this.activeDimension === 'sensation' ? 'active' : ''}" data-dim="sensation">💠 按感受</button>
                    </div>
                    <div class="qc-search-row">
                        <input type="text" id="qcSearchInput" class="qc-search-input"
                               placeholder="🔍 在分类树中筛选症状（如：头痛、苔黄）"
                               value="${this.escapeAttr(this.qcFilter)}">
                    </div>
                    <div id="qcTree" class="qc-tree">
                        ${this.renderQuickChipsTree()}
                    </div>
                </div>

                <div class="search-section card">
                    <div class="search-input-wrapper">
                        <div class="search-input-container">
                            <input
                                type="text"
                                id="symptomSearchInput"
                                class="search-input"
                                placeholder="请输入症状关键词（如：头痛、失眠、乏力...）"
                                value="${this.escapeAttr(initialQuery)}"
                                autocomplete="off"
                            >
                            <button class="btn btn-primary" id="symptomSearchBtn">
                                搜索辨证
                            </button>
                        </div>
                        <div id="symptomAutocomplete" class="autocomplete-dropdown" style="display:none;"></div>
                    </div>

                    <div id="selectedSymptomsTags" class="selected-symptoms-tags" style="margin-top: var(--space-md); display: ${this.selectedSymptoms.length > 0 ? 'flex' : 'none'};">
                    </div>

                    <div style="margin-top: var(--space-sm); display: flex; gap: var(--space-sm); flex-wrap: wrap;">
                        ${this.selectedSymptoms.length > 1 ? `
                            <button class="btn btn-primary" id="multiDiagnosisBtn">
                                组合辨证分析（已选 ${this.selectedSymptoms.length} 个症状）
                            </button>
                            <button class="btn btn-ghost" id="clearSymptomsBtn">清空症状</button>
                        ` : (this.selectedSymptoms.length === 1 ? `
                            <button class="btn btn-ghost" id="clearSymptomsBtn">清空症状</button>
                        ` : '')}
                    </div>
                </div>

                <div id="symptomResultsContainer" class="results-container"></div>

                <div class="disclaimer" style="margin-top: var(--space-xl);">
                    <strong>免责声明：</strong>本系统提供的辨证分析结果仅供参考，不构成医疗诊断或处方建议。
                    中医辨证需结合望闻问切四诊合参，如有不适请及时线下就医，由专业中医师进行辨证论治。
                </div>
            </div>
        `;

        this.bindEvents(container);

        // 若有 URL 传入的症状，自动触发辨证
        if (initialQuery) {
            const searchInput = container.querySelector('#symptomSearchInput');
            if (searchInput) {
                // 若传入的是精确症状名则直接加入选中列表
                const exact = allSymptoms.find(s => s === initialQuery);
                if (exact) {
                    this.selectedSymptoms.push(exact);
                }
                setTimeout(() => this.performSearch(container), 0);
            }
        }
    }

    escapeAttr(value) {
        return String(value || '').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    escapeHtml(value) {
        return String(value || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    // 渲染二维树形分类（"按部位"或"按感受"）
    renderQuickChipsTree() {
        const cat = (typeof SymptomCategories !== 'undefined') ? SymptomCategories[this.activeDimension] : null;
        if (!cat) return '<p style="color:var(--color-ink-pale);">症状分类数据未加载</p>';
        const groups = (typeof SymptomCategories.groupsWithFallback === 'function')
            ? SymptomCategories.groupsWithFallback(this.activeDimension)
            : cat.groups;
        const filter = (this.qcFilter || '').trim();
        const allSymptoms = Object.keys(symptomSyndromeMapping);
        const selected = this.selectedSymptoms;

        const groupsHtml = groups.map(g => {
            // 过滤：症状必须在库内且匹配关键词
            const matched = g.symptoms.filter(s => {
                if (!allSymptoms.includes(s)) return false;
                if (filter && !s.includes(filter)) return false;
                return true;
            });
            if (matched.length === 0) return '';
            const isAllSelected = matched.every(s => selected.includes(s));
            return `
                <div class="qc-group" data-group="${g.key}">
                    <div class="qc-group-header" data-toggle="${g.key}">
                        <span class="qc-arrow">▼</span>
                        <span class="qc-icon">${g.icon || ''}</span>
                        <span class="qc-label">${g.label}</span>
                        <span class="qc-count">${matched.length}</span>
                    </div>
                    <div class="qc-group-body" data-body="${g.key}">
                        <div class="qc-group-chips">
                            ${matched.map(s => `
                                <span class="symptom-chip ${selected.includes(s) ? 'chip-selected' : ''}"
                                      data-symptom="${s}" data-dim="${this.activeDimension}">
                                    ${s}
                                </span>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
        }).filter(Boolean).join('');

        if (!groupsHtml) {
            return `<p class="qc-empty">未找到与「${this.escapeHtml(filter)}」相关的症状</p>`;
        }
        return groupsHtml;
    }

    // 全部展开/收起
    expandAllGroups() {
        const tree = document.querySelector('#qcTree');
        if (!tree) return;
        tree.classList.add('qc-all-expanded');
        tree.querySelectorAll('.qc-group').forEach(g => {
            const body = g.querySelector('.qc-group-body');
            const arrow = g.querySelector('.qc-arrow');
            if (body) body.style.display = '';
            if (arrow) arrow.style.transform = 'rotate(0deg)';
        });
    }
    collapseAllGroups() {
        const tree = document.querySelector('#qcTree');
        if (!tree) return;
        tree.classList.remove('qc-all-expanded');
        tree.querySelectorAll('.qc-group-body').forEach(b => b.style.display = 'none');
        tree.querySelectorAll('.qc-group').forEach(g => {
            const arrow = g.querySelector('.qc-arrow');
            if (arrow) arrow.style.transform = 'rotate(-90deg)';
        });
    }

    reRenderQuickChipsTree(container) {
        const tree = container.querySelector('#qcTree');
        if (tree) tree.innerHTML = this.renderQuickChipsTree();
        this.bindQuickChipsTreeEvents(container);
    }

    // 树形点击事件（折叠/展开、症状勾选）
    bindQuickChipsTreeEvents(container) {
        const me = this;
        const tree = container.querySelector('#qcTree');
        if (!tree) return;
        // 折叠/展开
        tree.querySelectorAll('.qc-group-header').forEach(h => {
            h.addEventListener('click', () => {
                const key = h.dataset.toggle;
                const body = tree.querySelector(`.qc-group-body[data-body="${key}"]`);
                const arrow = h.querySelector('.qc-arrow');
                if (body) {
                    const visible = body.style.display !== 'none';
                    body.style.display = visible ? 'none' : '';
                    if (arrow) arrow.style.transform = visible ? 'rotate(-90deg)' : 'rotate(0deg)';
                }
            });
        });
        // 症状勾选
        tree.querySelectorAll('.symptom-chip').forEach(chip => {
            chip.addEventListener('click', (e) => {
                e.stopPropagation();
                const symptom = chip.dataset.symptom;
                if (!symptom) return;
                const idx = me.selectedSymptoms.indexOf(symptom);
                if (idx === -1) {
                    if (me.selectedSymptoms.length >= 5) {
                        Toast.show('最多选择 5 个症状进行组合辨证', 'warning');
                        return;
                    }
                    me.selectedSymptoms.push(symptom);
                    chip.classList.add('chip-selected');
                } else {
                    me.selectedSymptoms.splice(idx, 1);
                    chip.classList.remove('chip-selected');
                }
                me.renderSelectedTags(container);
                // 若已选 ≥1 症状，自动展开已选数量以确认
                if (me.selectedSymptoms.length === 1) {
                    const searchInput = container.querySelector('#symptomSearchInput');
                    if (searchInput) searchInput.value = '';
                }
            });
        });
    }

    renderQuickChips(symptoms) {
        const commonSymptoms = [
            '头痛', '头晕', '失眠', '乏力', '咳嗽', '心悸',
            '食欲不振', '腹胀', '便秘', '口苦', '腰膝酸软',
            '畏寒', '发热', '胸闷', '恶心', '月经不调', '盗汗',
            '自汗', '耳鸣', '口干', '烦躁', '腹泻', '气喘'
        ];

        const displaySymptoms = commonSymptoms.filter(s => symptoms.includes(s));

        if (displaySymptoms.length === 0) {
            return '<p style="color: var(--color-ink-pale); font-size: var(--text-sm);">暂无可快速选择的症状</p>';
        }

        return displaySymptoms.map(symptom => {
            const isSelected = this.selectedSymptoms.includes(symptom);
            return `
                <span class="symptom-chip ${isSelected ? 'chip-selected' : ''}"
                      data-symptom="${symptom}">
                    ${symptom}
                </span>
            `;
        }).join('');
    }

    bindEvents(container) {
        const searchInput = container.querySelector('#symptomSearchInput');
        const searchBtn = container.querySelector('#symptomSearchBtn');
        const autocompleteDropdown = container.querySelector('#symptomAutocomplete');

        // === 快速选择树形分类：维度切换、搜索、展开/收起 ===
        const me = this;
        container.querySelectorAll('.qc-dim-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                me.activeDimension = tab.dataset.dim;
                container.querySelectorAll('.qc-dim-tab').forEach(t => t.classList.toggle('active', t === tab));
                me.reRenderQuickChipsTree(container);
                // 切换维度后默认保持当前展开/收起状态
            });
        });
        const qcSearchInput = container.querySelector('#qcSearchInput');
        if (qcSearchInput) {
            let qcTimer = null;
            qcSearchInput.addEventListener('input', () => {
                clearTimeout(qcTimer);
                qcTimer = setTimeout(() => {
                    me.qcFilter = qcSearchInput.value.trim();
                    me.reRenderQuickChipsTree(container);
                }, 150);
            });
        }
        const qcExpandAllBtn = container.querySelector('#qcExpandAllBtn');
        if (qcExpandAllBtn) qcExpandAllBtn.addEventListener('click', () => me.expandAllGroups());
        const qcCollapseAllBtn = container.querySelector('#qcCollapseAllBtn');
        if (qcCollapseAllBtn) qcCollapseAllBtn.addEventListener('click', () => me.collapseAllGroups());

        // 初始化树形事件
        me.bindQuickChipsTreeEvents(container);
        // 默认：第一个组展开，其余收起
        setTimeout(() => {
            const tree = container.querySelector('#qcTree');
            if (tree) {
                const groups = tree.querySelectorAll('.qc-group');
                if (groups.length > 1) {
                    for (let i = 1; i < groups.length; i++) {
                        const body = groups[i].querySelector('.qc-group-body');
                        const arrow = groups[i].querySelector('.qc-arrow');
                        if (body) body.style.display = 'none';
                        if (arrow) arrow.style.transform = 'rotate(-90deg)';
                    }
                }
            }
        }, 0);

        // 搜索输入事件
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value.trim();
                if (this.searchQuery.length > 0) {
                    this.showAutocomplete(autocompleteDropdown, container);
                } else {
                    if (autocompleteDropdown) {
                        DOM.hide(autocompleteDropdown);
                    }
                }
            });

            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch(container);
                    if (autocompleteDropdown) {
                        DOM.hide(autocompleteDropdown);
                    }
                } else if (e.key === 'Escape') {
                    if (autocompleteDropdown) {
                        DOM.hide(autocompleteDropdown);
                    }
                }
            });

            searchInput.addEventListener('focus', () => {
                if (this.searchQuery.length > 0 && autocompleteDropdown) {
                    this.showAutocomplete(autocompleteDropdown, container);
                }
            });
        }

        // 搜索按钮
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                this.performSearch(container);
                if (autocompleteDropdown) {
                    DOM.hide(autocompleteDropdown);
                }
            });
        }

        // 点击其他地方关闭自动完成
        document.addEventListener('click', (e) => {
            if (autocompleteDropdown && !autocompleteDropdown.contains(e.target) && e.target !== searchInput) {
                DOM.hide(autocompleteDropdown);
            }
        });

        // 快速选择标签点击
        const chips = container.querySelectorAll('.symptom-chip');
        chips.forEach(chip => {
            chip.addEventListener('click', () => {
                const symptom = chip.dataset.symptom;
                if (!symptom) return;

                if (this.selectedSymptoms.includes(symptom)) {
                    this.selectedSymptoms = this.selectedSymptoms.filter(s => s !== symptom);
                } else {
                    if (this.selectedSymptoms.length >= 5) {
                        Toast.show('最多选择 5 个症状进行组合辨证', 'warning');
                        return;
                    }
                    this.selectedSymptoms.push(symptom);
                }

                this.reRenderChips(container);
                this.renderSelectedTags(container);
            });
        });

        // 多症状诊断按钮
        const multiBtn = container.querySelector('#multiDiagnosisBtn');
        if (multiBtn) {
            multiBtn.addEventListener('click', () => {
                this.performMultiDiagnosis(container);
            });
        }

        // 清空症状按钮
        const clearBtn = container.querySelector('#clearSymptomsBtn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                this.selectedSymptoms = [];
                this.searchResults = null;
                this.reRenderChips(container);
                this.renderSelectedTags(container);
                this.clearResults(container);
            });
        }
    }

    showAutocomplete(dropdown, container) {
        if (!dropdown || !this.searchQuery) return;

        const allSymptoms = Object.keys(symptomSyndromeMapping);
        const q = this.searchQuery.toLowerCase();

        // 拼音匹配（复用 GlobalSearch 的首字母工具）
        const initialsMatch = (typeof GlobalSearch !== 'undefined' && GlobalSearch._initials) ? GlobalSearch._initials(q) : '';

        const scored = allSymptoms.map(s => {
            let score = -1;
            if (s === this.searchQuery) score = 100;               // 精确匹配
            else if (s.startsWith(this.searchQuery)) score = 80;   // 前缀匹配
            else if (s.includes(this.searchQuery)) score = 60;     // 包含匹配
            else if (initialsMatch && GlobalSearch._initials(s).includes(initialsMatch)) score = 40; // 拼音首字母
            else if (q.length >= 2 && (s.pinyin && s.pinyin.includes(q))) score = 30; // 全拼
            return { s, score };
        }).filter(x => x.score >= 0);

        // 按匹配质量 + 映射权重（关联证型数）排序
        scored.sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            return (symptomSyndromeMapping[b.s] || []).length - (symptomSyndromeMapping[a.s] || []).length;
        });

        const suggestions = scored.slice(0, 8);

        if (suggestions.length === 0) {
            DOM.hide(dropdown);
            return;
        }

        dropdown.innerHTML = suggestions.map(({ s: symptom, score }, index) => {
            const matchIndex = symptom.indexOf(this.searchQuery);
            let displayText;
            if (matchIndex >= 0) {
                const before = symptom.substring(0, matchIndex);
                const match = symptom.substring(matchIndex, matchIndex + this.searchQuery.length);
                const after = symptom.substring(matchIndex + this.searchQuery.length);
                displayText = `${before}<strong>${match}</strong>${after}`;
            } else {
                displayText = symptom;
            }
            const relatedCount = (symptomSyndromeMapping[symptom] || []).length;
            const typeLabel = score >= 80 ? '精确' : score >= 60 ? '包含' : '拼音';
            return `
                <div class="autocomplete-item" data-symptom="${symptom}" data-index="${index}">
                    <span>${displayText}</span>
                    <span class="autocomplete-meta">关联 ${relatedCount} 证型 · ${typeLabel}</span>
                </div>
            `;
        }).join('');

        DOM.show(dropdown);

        // 绑定自动完成项点击
        const items = dropdown.querySelectorAll('.autocomplete-item');
        items.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const symptom = item.dataset.symptom;
                if (!symptom) return;

                // 添加到选中症状
                if (!this.selectedSymptoms.includes(symptom)) {
                    if (this.selectedSymptoms.length >= 5) {
                        Toast.show('最多选择 5 个症状进行组合辨证', 'warning');
                        return;
                    }
                    this.selectedSymptoms.push(symptom);
                }

                container.querySelector('#symptomSearchInput').value = '';
                this.searchQuery = '';
                DOM.hide(dropdown);
                this.reRenderChips(container);
                this.renderSelectedTags(container);

                // 如果只有一个症状选中，自动搜索
                if (this.selectedSymptoms.length === 1) {
                    this.performSearch(container);
                }
            });
        });
    }

    performSearch(container) {
        if (!this.searchQuery && this.selectedSymptoms.length === 0) {
            Toast.show('请输入或选择症状关键词', 'warning');
            return;
        }

        // 如果搜索框有内容但没有选中症状，添加到选中列表
        if (this.searchQuery && !this.selectedSymptoms.includes(this.searchQuery)) {
            const exactMatch = Object.keys(symptomSyndromeMapping).find(
                s => s === this.searchQuery
            );
            if (exactMatch) {
                if (this.selectedSymptoms.length < 5) {
                    this.selectedSymptoms.push(exactMatch);
                } else {
                    Toast.show('最多选择 5 个症状进行组合辨证', 'warning');
                }
                this.reRenderChips(container);
            } else {
                // 部分匹配：尝试添加到选中
                const partialMatch = Object.keys(symptomSyndromeMapping).find(
                    s => s.includes(this.searchQuery)
                );
                if (partialMatch) {
                    if (this.selectedSymptoms.length < 5) {
                        this.selectedSymptoms.push(partialMatch);
                    }
                    this.reRenderChips(container);
                }
            }
        }

        if (this.selectedSymptoms.length === 1) {
            this.searchResults = searchSyndromes(this.selectedSymptoms[0]);
        } else if (this.selectedSymptoms.length > 1) {
            this.searchResults = multiSymptomDiagnosis(this.selectedSymptoms);
        }

        container.querySelector('#symptomSearchInput').value = '';
        this.searchQuery = '';
        this.renderSelectedTags(container);

        if (!this.searchResults || this.searchResults.length === 0) {
            this.renderEmptyResults(container);
        } else {
            this.renderResults(container);
        }
    }

    performMultiDiagnosis(container) {
        if (this.selectedSymptoms.length < 2) {
            Toast.show('请至少选择 2 个症状进行组合辨证', 'warning');
            return;
        }

        this.searchResults = multiSymptomDiagnosis(this.selectedSymptoms);

        if (!this.searchResults || this.searchResults.length === 0) {
            this.renderEmptyResults(container);
        } else {
            this.renderResults(container);
        }
    }

    reRenderChips(container) {
        const chipsContainer = container.querySelector('#symptomQuickChips');
        if (!chipsContainer) return;

        const allSymptoms = Object.keys(symptomSyndromeMapping);
        chipsContainer.innerHTML = this.renderQuickChips(allSymptoms);

        // 重新绑定芯片事件
        const chips = chipsContainer.querySelectorAll('.symptom-chip');
        chips.forEach(chip => {
            chip.addEventListener('click', () => {
                const symptom = chip.dataset.symptom;
                if (!symptom) return;

                if (this.selectedSymptoms.includes(symptom)) {
                    this.selectedSymptoms = this.selectedSymptoms.filter(s => s !== symptom);
                } else {
                    if (this.selectedSymptoms.length >= 5) {
                        Toast.show('最多选择 5 个症状进行组合辨证', 'warning');
                        return;
                    }
                    this.selectedSymptoms.push(symptom);
                }

                this.reRenderChips(container);
                this.renderSelectedTags(container);
            });
        });
    }

    renderSelectedTags(container) {
        const tagsContainer = container.querySelector('#selectedSymptomsTags');
        const searchSection = container.querySelector('.search-section');

        if (!tagsContainer || !searchSection) return;

        if (this.selectedSymptoms.length === 0) {
            DOM.hide(tagsContainer);
        } else {
            DOM.show(tagsContainer, 'flex');
            tagsContainer.innerHTML = this.selectedSymptoms.map(symptom => `
                <span class="selected-symptom-tag">
                    ${symptom}
                    <button class="tag-remove" data-remove-symptom="${symptom}">&times;</button>
                </span>
            `).join('');

            // 绑定移除事件
            const removeBtns = tagsContainer.querySelectorAll('.tag-remove');
            removeBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const symptom = btn.dataset.removeSymptom;
                    if (!symptom) return;
                    this.selectedSymptoms = this.selectedSymptoms.filter(s => s !== symptom);
                    this.reRenderChips(container);
                    this.renderSelectedTags(container);

                    if (this.selectedSymptoms.length === 0) {
                        this.searchResults = null;
                        this.clearResults(container);
                    }
                });
            });
        }

        // 更新操作按钮区域
        const actionArea = searchSection.querySelector('div[style*="margin-top: var(--space-sm)"]');
        if (actionArea) {
            actionArea.innerHTML = `
                ${this.selectedSymptoms.length > 1 ? `
                    <button class="btn btn-primary" id="multiDiagnosisBtn">
                        组合辨证分析（已选 ${this.selectedSymptoms.length} 个症状）
                    </button>
                    <button class="btn btn-ghost" id="clearSymptomsBtn">清空症状</button>
                ` : (this.selectedSymptoms.length === 1 ? `
                    <button class="btn btn-primary" id="singleDiagnosisBtn">
                        辨证分析（已选：${this.selectedSymptoms[0]}）
                    </button>
                    <button class="btn btn-ghost" id="clearSymptomsBtn">清空症状</button>
                ` : '')}
            `;

            // 重新绑定按钮事件
            const multiBtn = actionArea.querySelector('#multiDiagnosisBtn');
            if (multiBtn) {
                multiBtn.addEventListener('click', () => {
                    this.performMultiDiagnosis(container);
                });
            }

            const singleBtn = actionArea.querySelector('#singleDiagnosisBtn');
            if (singleBtn) {
                singleBtn.addEventListener('click', () => {
                    if (this.selectedSymptoms.length === 1) {
                        this.searchResults = searchSyndromes(this.selectedSymptoms[0]);
                        this.renderResults(container);
                    }
                });
            }

            const clearBtn = actionArea.querySelector('#clearSymptomsBtn');
            if (clearBtn) {
                clearBtn.addEventListener('click', () => {
                    this.selectedSymptoms = [];
                    this.searchResults = null;
                    this.reRenderChips(container);
                    this.renderSelectedTags(container);
                    this.clearResults(container);
                });
            }
        }
    }

    // 上次就诊提醒（30 天内有相似症状的辨证记录）
    renderRecentRecordHTML() {
        if (typeof Records === 'undefined' || !Records.findRecent) return '';
        const rec = Records.findRecent(this.selectedSymptoms, 30);
        if (!rec) return '';
        const topName = rec.results && rec.results[0] ? rec.results[0].name : '未匹配证型';
        return `
            <div class="card" style="margin-bottom:var(--space-md);padding:var(--space-sm) var(--space-md);background:rgba(59,94,139,0.06);border-left:3px solid var(--color-blue-porcelain,#3B5E8B);">
                <p style="font-size:var(--text-sm);color:var(--color-ink);margin:0;line-height:1.8;">
                    🕘 您 ${rec._daysAgo > 0 ? rec._daysAgo + ' 天前' : '今天'} 曾有相似症状的辨证记录（${topName}），建议查看上次建议。
                    <a href="#/records" style="color:var(--color-blue-porcelain,#3B5E8B);font-weight:600;">查看记录 →</a>
                </p>
            </div>
        `;
    }

    renderResults(container) {
        const resultsContainer = container.querySelector('#symptomResultsContainer');
        if (!resultsContainer || !this.searchResults) return;

        if (this.searchResults.length === 0) {
            this.renderEmptyResults(container);
            return;
        }

        const maxScore = this.searchResults.length > 0 ? this.searchResults[0].score : 1;
        const dangerHTML = (typeof dangerBannerHTML !== 'undefined') ? dangerBannerHTML(this.selectedSymptoms) : '';
        const recentHTML = this.renderRecentRecordHTML();

        resultsContainer.innerHTML = `
            ${dangerHTML}
            ${recentHTML}
            <div class="results-header">
                <h3 style="margin-bottom: var(--space-xs);">
                    辨证结果（共 ${this.searchResults.length} 条匹配）
                </h3>
                ${this.selectedSymptoms.length > 0 ? `
                    <p style="font-size: var(--text-sm); color: var(--color-ink-light);">
                        基于症状：${this.selectedSymptoms.join('、')}
                    </p>
                ` : ''}
            </div>
            ${this.searchResults.map((result, index) => {
                const syndrome = result.syndrome;
                if (!syndrome) return '';

                const matchPercentage = maxScore > 0
                    ? Math.round((result.score / maxScore) * 100)
                    : 0;

                const scoreColor = matchPercentage >= 80 ? 'var(--color-vermillion)'
                    : matchPercentage >= 60 ? 'var(--color-bronze)'
                    : 'var(--color-ink-light)';

                return `
                    <div class="card result-card" data-result-index="${index}">
                        <div class="result-card-header" id="resultHeader${index}">
                            <div class="result-card-title-area">
                                <div class="result-card-name">
                                    <h4 style="margin: 0; font-family: var(--font-display); color: var(--color-vermillion-dark);">
                                        ${syndrome.name}
                                    </h4>
                                    <div class="result-card-badges">
                                        <span class="badge badge-category">${syndrome.category || ''}</span>
                                        <span class="badge badge-pattern">${syndrome.pattern || ''}</span>
                                        ${syndrome.organ ? `<span class="badge badge-organ">${syndrome.organ}</span>` : ''}
                                    </div>
                                </div>
                                <div class="result-card-score" style="color: ${scoreColor};">
                                    <span class="score-value">${matchPercentage}%</span>
                                    <span class="score-label">匹配度</span>
                                    ${matchPercentage < 50 ? '<span class="tag tag-warn">依据不足</span>' : ''}
                                </div>
                            </div>
                            ${matchPercentage < 50 ? `
                                <p class="result-text" style="font-size: var(--text-xs); color: var(--color-bronze-dark); margin-top: 4px;">
                                    提示：当前匹配度较低，建议补充更多症状或咨询专业中医师。
                                </p>
                            ` : ''}
                            <button class="expand-toggle" id="expandToggle${index}" aria-label="展开/收起">
                                <span class="expand-icon">▼</span>
                            </button>
                        </div>
                        <div class="result-card-body" id="resultBody${index}" style="display: none;">
                            ${(result.danger && result.danger.length) ? `
                                <div class="danger-banner" role="alert" style="margin:0 0 12px 0;font-size:13px;">
                                    ⚠ 该证型与危重信号相关：${result.danger.join('、')}。如出现相关表现请立即就医。
                                </div>
                            ` : ''}
                            ${(result.conflicts && result.conflicts.length) ? `
                                <div class="result-section" style="margin-bottom: var(--space-sm); padding: var(--space-sm) var(--space-md); background: rgba(184,134,11,0.08); border-left: 3px solid var(--color-bronze); border-radius: 0 6px 6px 0;">
                                    <h5 class="result-section-title" style="color: var(--color-bronze-dark);">⚠ 矛盾症状提示</h5>
                                    <p class="result-text" style="font-size: var(--text-sm); line-height: 1.9;">
                                        您选择的「${result.conflicts.join('、')}」与本证型特征不相符，本结果可信度下降，请复核。
                                    </p>
                                </div>
                            ` : ''}
                            ${(result.missingKey && result.missingKey.length) ? `
                                <div class="result-section" style="margin-bottom: var(--space-sm); padding: var(--space-sm) var(--space-md); background: rgba(59,94,139,0.06); border-left: 3px solid var(--color-blue-porcelain); border-radius: 0 6px 6px 0;">
                                    <h5 class="result-section-title" style="color: var(--color-blue-porcelain);">💡 建议补充验证</h5>
                                    <p class="result-text" style="font-size: var(--text-sm); line-height: 1.9;">
                                        若确认存在「${result.missingKey.join('、')}」等表现，本证型可能性更高。
                                    </p>
                                </div>
                            ` : ''}
                            ${(result.reasoningText && result.reasoningText.length) ? `
                                <div class="result-section" style="margin-bottom: var(--space-sm);">
                                    <h5 class="result-section-title">🧠 推理依据</h5>
                                    <div class="result-tags">
                                        ${result.reasoningText.map(t => `<span class="tag tag-plain">${t}</span>`).join('')}
                                    </div>
                                </div>
                            ` : ''}
                            ${result.matchedSymptoms && result.matchedSymptoms.length > 0 ? `
                                <div class="result-section">
                                    <h5 class="result-section-title">匹配症状</h5>
                                    <div class="result-tags">
                                        ${result.matchedSymptoms.map(s => `<span class="tag tag-symptom">${s}</span>`).join('')}
                                    </div>
                                </div>
                            ` : ''}
                            <div class="result-grid-2">
                                <div class="result-section">
                                    <h5 class="result-section-title">主要症状</h5>
                                    <ul class="result-list">
                                        ${(syndrome.symptoms || []).map(s => `<li>${s}</li>`).join('')}
                                    </ul>
                                </div>
                                <div class="result-section">
                                    <h5 class="result-section-title">舌象脉象</h5>
                                    <div class="tongue-pulse-info">
                                        <div class="info-item">
                                            <span class="info-label">舌体：</span>
                                            <span class="info-value">${syndrome.tongueAppearance?.tongueBody || '—'}</span>
                                        </div>
                                        <div class="info-item">
                                            <span class="info-label">舌苔：</span>
                                            <span class="info-value">${syndrome.tongueAppearance?.tongueCoating || '—'}</span>
                                        </div>
                                        <div class="info-item">
                                            <span class="info-label">脉象：</span>
                                            <span class="info-value">${syndrome.pulseCondition || '—'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="result-section">
                                <h5 class="result-section-title">病因病机</h5>
                                <div class="info-block">
                                    <div class="info-item">
                                        <span class="info-label">病因：</span>
                                        <span class="info-value">${syndrome.etiology || '—'}</span>
                                    </div>
                                    <div class="info-item">
                                        <span class="info-label">病机：</span>
                                        <span class="info-value">${syndrome.pathogenesis || '—'}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="result-grid-2">
                                <div class="result-section">
                                    <h5 class="result-section-title">治疗原则</h5>
                                    <p class="result-text">${syndrome.treatmentPrinciple || '—'}</p>
                                    <p class="result-text" style="color: var(--color-ink-light); font-size: var(--text-sm);">
                                        治法：${syndrome.treatmentMethod || '—'}
                                    </p>
                                </div>
                                <div class="result-section">
                                    <h5 class="result-section-title">推荐方剂</h5>
                                    ${(syndrome.recommendedFormulas && syndrome.recommendedFormulas.length > 0) ? `
                                        <div class="result-tags">
                                            ${syndrome.recommendedFormulas.map(f => `
                                                <span class="tag tag-formula formula-link" data-formula-id="${f.id}" data-formula-name="${this.escapeAttr(f.name)}" title="点击查看方剂详情">${f.name}（${f.matchScore}%）</span>
                                            `).join('')}
                                        </div>
                                    ` : '<p class="result-text" style="color: var(--color-ink-pale);">暂无推荐方剂</p>'}
                                </div>
                            </div>
                            ${syndrome.relatedConstitutions && syndrome.relatedConstitutions.length > 0 ? `
                                <div class="result-section">
                                    <h5 class="result-section-title">相关体质</h5>
                                    <div class="result-tags">
                                        ${syndrome.relatedConstitutions.map(c => `<span class="tag tag-constitution">${c}</span>`).join('')}
                                    </div>
                                </div>
                            ` : ''}
                            ${typeof syndromeDifferentials !== 'undefined' && syndromeDifferentials[syndrome.name] ? `
                                <div class="result-section" style="margin-top: var(--space-sm); padding: var(--space-sm) var(--space-md); background: rgba(184,134,11,0.06); border-left: 3px solid var(--color-bronze, #B8860B); border-radius: 0 6px 6px 0;">
                                    <h5 class="result-section-title" style="color: var(--color-bronze-dark, #8B6914);">🔍 鉴别要点</h5>
                                    <p class="result-text" style="font-size: var(--text-sm); line-height: 1.9;">${syndromeDifferentials[syndrome.name]}</p>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                `;
            }).join('')}
            <div style="display:flex;gap:10px;margin-top:var(--space-lg);flex-wrap:wrap;">
                <button class="btn btn-primary" id="saveDiagRecordBtn">💾 保存诊断记录</button>
                <button class="btn btn-ghost" id="saveAsPlanBtn">📌 保存为常用方案</button>
            </div>
        `;

        // 绑定展开/收起事件
        this.bindResultEvents(resultsContainer);

        // 保存诊断记录 / 常用方案
        const recBtn = resultsContainer.querySelector('#saveDiagRecordBtn');
        if (recBtn) {
            recBtn.addEventListener('click', () => {
                if (typeof Records !== 'undefined' && Records.save) {
                    Records.save({
                        type: 'symptom',
                        input: { symptoms: this.selectedSymptoms.slice() },
                        results: this.searchResults.map(r => ({
                            syndromeId: r.syndrome ? r.syndrome.id : '',
                            name: r.syndrome ? r.syndrome.name : '未知',
                            matchScore: r.score ? Math.round(r.score / maxScore * 100) : 0
                        }))
                    });
                } else {
                    Toast.show('诊断记录功能未加载', 'warning');
                }
            });
        }
        const planBtn = resultsContainer.querySelector('#saveAsPlanBtn');
        if (planBtn) {
            planBtn.addEventListener('click', () => {
                if (typeof Plans !== 'undefined' && Plans.save) {
                    const top = this.searchResults[0];
                    Plans.save({
                        title: (top && top.syndrome ? top.syndrome.name : '辨证') + '调理方案',
                        type: 'syndrome',
                        data: {
                            typeName: top && top.syndrome ? top.syndrome.name : '',
                            symptoms: this.selectedSymptoms.slice(),
                            formulas: top && top.syndrome ? (top.syndrome.recommendedFormulas || []) : []
                        }
                    });
                } else {
                    Toast.show('常用方案功能未加载', 'warning');
                }
            });
        }
    }

    bindResultEvents(resultsContainer) {
        const cards = resultsContainer.querySelectorAll('.result-card');
        cards.forEach(card => {
            const index = parseInt(card.dataset.resultIndex);
            if (isNaN(index)) return;

            const header = card.querySelector(`#resultHeader${index}`);
            const toggle = card.querySelector(`#expandToggle${index}`);
            const body = card.querySelector(`#resultBody${index}`);

            const toggleExpand = () => {
                const isHidden = body.style.display === 'none';
                body.style.display = isHidden ? 'block' : 'none';
                if (toggle) {
                    const icon = toggle.querySelector('.expand-icon');
                    if (icon) {
                        icon.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
                    }
                }
            };

            if (header) {
                header.addEventListener('click', toggleExpand);
                header.style.cursor = 'pointer';
            }

            if (toggle) {
                toggle.addEventListener('click', (e) => {
                    e.stopPropagation();
                    toggleExpand();
                });
            }
        });

        // 推荐方剂标签 → 打开方剂详情（跨模块联动）
        resultsContainer.querySelectorAll('.formula-link').forEach(tag => {
            tag.addEventListener('click', (e) => {
                e.stopPropagation();
                const fid = tag.dataset.formulaId;
                if (fid && typeof DetailModal !== 'undefined') {
                    DetailModal.open('formula', fid);
                } else {
                    Toast.show('方剂详情暂不可用', 'warning');
                }
            });
        });
    }

    renderEmptyResults(container) {
        const resultsContainer = container.querySelector('#symptomResultsContainer');
        if (!resultsContainer) return;

        resultsContainer.innerHTML = `
            <div class="empty-state card" style="text-align: center; padding: var(--space-2xl) var(--space-lg);">
                <div style="font-size: 48px; margin-bottom: var(--space-md); opacity: 0.3;">🔍</div>
                <h4 style="color: var(--color-ink-light); margin-bottom: var(--space-sm);">未找到匹配的辨证结果</h4>
                <p style="color: var(--color-ink-pale); font-size: var(--text-sm); max-width: 400px; margin: 0 auto var(--space-lg);">
                    当前知识库中暂无与"${this.selectedSymptoms.join('、')}"完全匹配的证型。
                    建议尝试更常见的症状关键词，或减少症状组合数量。
                </p>
                <div style="font-size: var(--text-xs); color: var(--color-ink-pale);">
                    提示：可尝试搜索"头痛"、"咳嗽"、"失眠"、"乏力"等常见症状
                </div>
            </div>
        `;
    }

    clearResults(container) {
        const resultsContainer = container.querySelector('#symptomResultsContainer');
        if (resultsContainer) {
            resultsContainer.innerHTML = '';
        }
    }

    destroy() {
        this.searchQuery = '';
        this.selectedSymptoms = [];
        this.searchResults = null;
        this.activeResultIndex = -1;
    }
}
