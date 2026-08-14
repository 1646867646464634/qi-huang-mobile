// ===== 岐黄·辅助诊疗系统 - 通用详情渲染组件 =====
// 统一渲染 中药/方剂/证型 详情弹窗，供症状模块、方剂模块、全局搜索、收藏夹、学习中心共用
// 依赖全局数据：herbsDatabase / formulasDatabase / syndromesDatabase

const DetailModal = {
    _overlay: null,

    // 打开详情：DetailModal.open('herb'|'formula'|'syndrome', id)
    open(type, id) {
        let data = null;
        let title = '';
        let body = '';

        if (type === 'herb') {
            data = (window.herbsDatabase || []).find(h => h.id === id);
            if (!data) return;
            title = data.name;
            body = this.renderHerb(data);
        } else if (type === 'formula') {
            data = (window.formulasDatabase || []).find(f => f.id === id);
            if (!data) return;
            title = data.name;
            body = this.renderFormula(data);
        } else if (type === 'syndrome') {
            data = (window.syndromesDatabase || []).find(s => s.id === id);
            if (!data) return;
            title = data.name;
            body = this.renderSyndrome(data);
        }

        this._show(title, body, type, id);
    },

    _show(title, body, type, id) {
        this.close();
        const overlay = document.createElement('div');
        overlay.className = 'detail-modal-overlay';
        overlay.innerHTML = `
            <div class="detail-modal" role="dialog" aria-modal="true">
                <div class="detail-modal-header">
                    <h3 class="detail-modal-title">${title}</h3>
                    <button class="detail-modal-close" aria-label="关闭">×</button>
                </div>
                <div class="detail-modal-body">${body}</div>
                <div class="detail-modal-footer">
                    ${this._actionBtns(type, id)}
                    <button class="btn btn-ghost detail-modal-done">关闭</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
        this._overlay = overlay;

        // 关闭交互
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay || e.target.classList.contains('detail-modal-close') || e.target.classList.contains('detail-modal-done')) {
                this.close();
            }
        });
        // Esc 关闭
        this._escHandler = (e) => { if (e.key === 'Escape') this.close(); };
        document.addEventListener('keydown', this._escHandler);

        // 收藏按钮
        const favBtn = overlay.querySelector('.detail-modal-fav');
        if (favBtn) {
            favBtn.addEventListener('click', () => this._toggleFav(favBtn, type, id, title));
        }
        // 记录浏览历史
        this._addHistory(type, id, title);
        // 内部链接
        overlay.querySelectorAll('[data-detail-link]').forEach(link => {
            link.addEventListener('click', () => {
                const lt = link.dataset.detailLink.split(':')[0];
                const li = link.dataset.detailLink.split(':')[1];
                this.close();
                this.open(lt, li);
            });
        });
    },

    _actionBtns(type, id) {
        return `<button class="btn btn-primary detail-modal-fav" data-type="${type}" data-id="${id}">${this._isFav(type, id) ? '♥ 已收藏' : '♡ 收藏'}</button>`;
    },

    _isFav(type, id) {
        const favs = Storage.get('tcm_favorites', []);
        return favs.some(f => f.type === type && f.id === id);
    },

    _toggleFav(btn, type, id, title) {
        let favs = Storage.get('tcm_favorites', []);
        const idx = favs.findIndex(f => f.type === type && f.id === id);
        if (idx !== -1) {
            favs.splice(idx, 1);
            btn.innerHTML = '♡ 收藏';
            Toast.show('已取消收藏', 'info');
        } else {
            favs.unshift({ type, id, title, time: Date.now() });
            btn.innerHTML = '♥ 已收藏';
            Toast.show('已加入收藏夹', 'success');
        }
        Storage.set('tcm_favorites', favs);
        EventBus.emit('favorites:changed', { type, id });
    },

    _addHistory(type, id, title) {
        let history = Storage.get('tcm_history', []);
        history = history.filter(h => !(h.type === type && h.id === id));
        history.unshift({ type, id, title, time: Date.now() });
        history = history.slice(0, 50);
        Storage.set('tcm_history', history);
        EventBus.emit('history:changed', { type, id });
    },

    close() {
        if (this._overlay) {
            this._overlay.remove();
            this._overlay = null;
        }
        if (this._escHandler) {
            document.removeEventListener('keydown', this._escHandler);
            this._escHandler = null;
        }
    },

    // ---------- 中药详情 ----------
    renderHerb(h) {
        const natureColor = { '寒': '#3B5E8B', '凉': '#5B7FA8', '温': '#B8860B', '热': '#C04040', '平': '#5a534b' };
        const natureStyle = natureColor[h.nature] ? `style="color:${natureColor[h.nature]};font-weight:700"` : '';
        const comparison = this._herbComparisonHTML(h);
        return `
            <div class="detail-section">
                <div class="detail-meta">
                    <span>拼音：${h.pinyin || ''}</span>
                    ${h.latinName ? `<span>拉丁名：${h.latinName}</span>` : ''}
                    <span>分类：${h.category}${h.subcategory ? ' > ' + h.subcategory : ''}</span>
                    ${h.source ? `<span>来源：${h.source}</span>` : ''}
                </div>
                <div class="detail-chips">
                    ${h.nature ? `<span class="detail-chip chip-nature" ${natureStyle}>${h.nature}</span>` : ''}
                    ${(h.tastes || []).map(t => `<span class="detail-chip">${t}</span>`).join('')}
                    ${(h.meridians || []).map(m => `<span class="detail-chip chip-meridian">${m}</span>`).join('')}
                </div>
                ${this._block('功效', `<p>${(h.functions || []).join('、')}</p>`)}
                ${this._block('主治', `<p>${(h.indications || []).join('、')}</p>`)}
                ${this._block('用法用量', `<p>${h.usage || ''}</p>`)}
                ${(h.toxicNote && h.toxicNote.limit) ? this._block('有毒限量', `<p class="detail-warn">${h.toxicNote.limit}${h.toxicNote.note ? '；' + h.toxicNote.note : ''}</p>`, true) : ''}
                ${(h.contraindications && h.contraindications.length) ? this._block('禁忌/慎用', `<p class="detail-warn">${h.contraindications.join('；')}</p>`, true) : ''}
                ${(h.pregnancyNote) ? this._block('妊娠哺乳禁忌', `<p class="detail-warn">${h.pregnancyNote}</p>`, true) : ''}
                ${comparison}
                ${(h.tags && h.tags.length) ? this._block('标签', `<p>${h.tags.join('、')}</p>`) : ''}
            </div>
        `;
    },

    // 同类对比（数据来自 herb-comparisons.js）
    _herbComparisonHTML(h) {
        const groups = (typeof herbComparisons !== 'undefined') ? herbComparisons : [];
        const related = groups.filter(g => g.items && g.items.some(item => item.name === h.name));
        if (related.length === 0) return '';
        return related.map(g => `
            <div class="detail-block">
                <div class="detail-block-title">⚖ ${g.group}</div>
                <div class="detail-block-content">
                    <ul class="detail-list">
                        ${(g.items || []).map(item => `<li><b>${item.name}</b>：${item.items || ''}</li>`).join('')}
                        ${g.summary ? `<li style="color:var(--color-blue-porcelain,#3B5E8B);">要点：${g.summary}</li>` : ''}
                    </ul>
                </div>
            </div>
        `).join('');
    },

    // ---------- 方剂详情 ----------
    renderFormula(f) {
        const verse = (typeof formulaVerses !== 'undefined') ? formulaVerses[f.name] : '';
        return `
            <div class="detail-section">
                <div class="detail-meta">
                    <span>出处：${f.source || ''}</span>
                    <span>分类：${f.category}${f.subcategory ? ' > ' + f.subcategory : ''}</span>
                </div>
                ${this._block('组成', `
                    <div class="detail-comp-list">
                        ${(f.composition || []).map(c => `
                            <span class="detail-comp-item" data-detail-link="herb:${this._herbIdByText(c.herbName)}">
                                <b>${c.herbName}</b> ${c.dosage}
                                <i>${c.role || ''}</i>
                            </span>
                        `).join('')}
                    </div>
                `)}
                ${verse ? this._block('方歌（背诵）', `<p style="font-family:var(--font-display,serif);line-height:2.2;">${verse}</p>`) : ''}
                ${this._block('功效', `<p>${(f.functions || []).join('、')}</p>`)}
                ${this._block('主治', `<p>${(f.indications || []).join('、')}</p>`)}
                ${f.analysis ? this._block('方解', `<p>${f.analysis}</p>`) : ''}
                ${(f.keyPoints && f.keyPoints.length) ? this._block('辨证要点', `<p>${f.keyPoints.join('；')}</p>`) : ''}
                ${(f.modifications && f.modifications.length) ? this._block('加减化裁', `
                    <ul class="detail-list">
                        ${f.modifications.map(m => `<li><b>${m.condition}：</b>${m.modification}</li>`).join('')}
                    </ul>
                `) : ''}
                ${(f.relatedSyndromes && f.relatedSyndromes.length) ? this._block('相关证型', `
                    <div class="detail-chips">${f.relatedSyndromes.map(sn => `<span class="detail-chip">${sn}</span>`).join('')}</div>
                `) : ''}
                ${(f.relatedConstitutions && f.relatedConstitutions.length) ? this._block('适用体质', `
                    <div class="detail-chips">${f.relatedConstitutions.map(rc => `<span class="detail-chip">${rc}</span>`).join('')}</div>
                `) : ''}
                ${this._safetyHTML(f)}
                ${(f.contraindications && f.contraindications.length) ? this._block('禁忌', `<p class="detail-warn">${f.contraindications.join('；')}</p>`, true) : ''}
            </div>
        `;
    },

    // 配伍安全面板（十八反/十九畏/毒药限量/妊娠禁忌）
    _safetyHTML(formula) {
        if (typeof SAFETY === 'undefined' || !SAFETY.checkFormulaSafety) return '';
        const report = SAFETY.checkFormulaSafety(formula);
        const parts = [];
        if (report.pairs.length) {
            parts.push(this._block('⚠ 配伍禁忌（十八反/十九畏）', `
                <ul class="detail-list">
                    ${report.pairs.map(p => `<li><b>${p.type}：</b>${p.a} 与 ${p.b} —— ${p.detail}</li>`).join('')}
                </ul>
            `, true));
        }
        if (report.toxic.length) {
            parts.push(this._block('⚠ 有毒药材限量参考', `
                <ul class="detail-list">
                    ${report.toxic.map(t => `<li><b>${t.name}</b>：${t.limit}。${t.note || ''}</li>`).join('')}
                </ul>
            `, true));
        }
        if (report.pregnancy.length) {
            parts.push(this._block('⚠ 妊娠/哺乳禁忌', `
                <p class="detail-warn">本方含 ${report.pregnancy.join('、')}，孕产期妇女忌用或慎用。</p>
            `, true));
        }
        if (parts.length) {
            parts.push(`<p style="font-size:var(--text-xs);color:var(--color-ink-pale);">以上为规则辅助提示，仅供学习参考，非处方依据。</p>`);
            return `<div class="detail-block detail-block-warn"><div class="detail-block-title">⚕ 配伍安全</div><div class="detail-block-content">${parts.join('')}</div></div>`;
        }
        return '';
    },

    _herbIdByText(name) {
        // 去掉炮制前缀后按名称匹配中药库
        if (!name) return '';
        const plain = name.replace(/^(炙|炒|煅|生|制|焦|蜜炙|盐|醋|酒|姜|水飞)/, '');
        const herb = (window.herbsDatabase || []).find(h => h.name === name || h.name === plain);
        return herb ? herb.id : '';
    },

    // ---------- 证型详情 ----------
    renderSyndrome(s) {
        const tongue = s.tongueAppearance;
        const tongueText = tongue ? (typeof tongue === 'string' ? tongue : [tongue.tongueBody, tongue.tongueCoating].filter(Boolean).join('，')) : '';
        const differential = (typeof syndromeDifferentials !== 'undefined') ? syndromeDifferentials[s.name] : '';
        const levelBadge = { '基础': '', '进阶': '', '临床': '<span class="tag tag-warn">临床</span>' }[s.level] || '';
        return `
            <div class="detail-section">
                <div class="detail-meta">
                    <span>辨证体系：${s.category || ''}</span>
                    <span>证候类型：${s.pattern || ''}</span>
                    ${s.level ? `<span>层级：${s.level}</span>` : ''}
                    ${s.source ? `<span>来源：${s.source}</span>` : ''}
                </div>
                ${(s.dangerSignals && s.dangerSignals.length) ? `<div class="danger-banner" role="alert">⚠ 本证型含危重信号：${s.dangerSignals.join('、')}。如出现相关表现，请立即就医。</div>` : ''}
                ${this._block('主要症状', `<p>${(s.symptoms || []).join('、')}</p>`)}
                ${(s.keySymptoms && s.keySymptoms.length) ? this._block('必见症状（辨证关键）', `<p>${s.keySymptoms.join('、')}</p>`) : ''}
                ${this._block('舌象脉象', `<p>舌象：${tongueText || '—'}；脉象：${s.pulseCondition || '—'}</p>`)}
                ${this._foldBlock('🧠 病因病机（进阶）', `
                    ${s.etiology ? `<p style="font-size:var(--text-sm);line-height:1.9;margin-bottom:8px;"><b>病因：</b>${s.etiology}</p>` : ''}
                    ${s.pathogenesis ? `<p style="font-size:var(--text-sm);line-height:1.9;"><b>病机：</b>${s.pathogenesis}</p>` : ''}
                `)}
                ${(s.contradictions && s.contradictions.length) ? this._block('易混淆注意', `<p class="detail-warn">若同时出现以下表现，本证型可能性降低：${s.contradictions.join('、')}</p>`, true) : ''}
                ${differential ? this._foldBlock('🔍 鉴别诊断（进阶）', `<p>${differential}</p>`) : ''}
                ${(s.keyPoints && s.keyPoints.length) ? this._foldBlock('🎯 辨证要点（进阶）', `<p>${s.keyPoints.join('；')}</p>`) : ''}
                ${(s.taboos && s.taboos.length) ? this._block('临床注意', `<p class="detail-warn">${s.taboos.join('；')}</p>`, true) : ''}
                ${this._block('治疗原则', `<p>${s.treatmentPrinciple || ''}${s.treatmentMethod ? '（' + s.treatmentMethod + '）' : ''}</p>`)}
                ${(s.recommendedFormulas && s.recommendedFormulas.length) ? this._block('推荐方剂', `
                    <div class="detail-comp-list">
                        ${s.recommendedFormulas.map(rf => `
                            <span class="detail-comp-item detail-link-item" data-detail-link="formula:${rf.id}">
                                <b>${rf.name}</b> <i>匹配 ${rf.matchScore || ''}%</i>
                            </span>
                        `).join('')}
                    </div>
                `) : ''}
            </div>
        `;
    },

    _block(title, content, isWarn) {
        return `
            <div class="detail-block ${isWarn ? 'detail-block-warn' : ''}">
                <div class="detail-block-title">${title}</div>
                <div class="detail-block-content">${content}</div>
            </div>
        `;
    },

    // 可折叠区块（内容分层：基础默认展开，进阶/临床默认收起）
    _foldBlock(title, content, open) {
        return `
            <details class="detail-fold ${open ? '' : ''}" ${open ? 'open' : ''}>
                <summary class="detail-fold-title">${title}</summary>
                <div class="detail-fold-content">${content}</div>
            </details>
        `;
    }
};

if (typeof window !== 'undefined') {
    window.DetailModal = DetailModal;
}
