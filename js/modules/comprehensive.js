// ===== 岐黄·辅助诊疗系统 - 四诊合参综合辨证模块 =====
// 症状 + 舌象 + 面象 + 体质 → 调用 DiagnosisEngine.diagnose v2 输出统一辨证报告
// 依赖：TongueRules / FaceRules / DiagnosisEngine / symptomSyndromeMapping
class ComprehensiveModule {
    constructor() {
        this.step = 1;                       // 1症状 2舌象 3面象 4体质
        this.selection = {
            symptoms: [],
            tongue: {},
            face: {},
            constitution: ''
        };
    }

    destroy() {}

    render(container) {
        container.innerHTML = `
            <div class="module-page comprehensive-page">
                <div class="page-header">
                    <h2 class="page-title">
                        <span class="seal-stamp">合</span>
                        四诊合参综合辨证
                    </h2>
                    <p class="page-subtitle">症状 · 舌象 · 面象 · 体质 四步合参，本地规则引擎推演辨证参考</p>
                </div>

                <div class="card" style="margin-bottom: var(--space-lg);">
                    <div class="progress-info" style="display:flex;justify-content:space-between;margin-bottom:8px;">
                        <span class="progress-text">步骤 ${this.step}/4</span>
                        <span class="progress-text">${['选择症状','选择舌象','选择面象','确认体质'][this.step - 1]}</span>
                    </div>
                    <div class="progress-bar"><div class="progress-fill" style="width:${this.step * 25}%"></div></div>
                </div>

                <div id="comprehensiveContent"></div>
            </div>
        `;
        this.renderStep(container);
    }

    renderStep(container) {
        const content = container.querySelector('#comprehensiveContent');
        switch (this.step) {
            case 1: this.renderSymptoms(content, container); break;
            case 2: this.renderTongue(content, container); break;
            case 3: this.renderFace(content, container); break;
            case 4: this.renderConstitution(content, container); break;
        }
    }

    // ---------- Step 1 症状 ----------
    renderSymptoms(content, container) {
        const allSymptoms = Object.keys(symptomSyndromeMapping || {});
        const selected = this.selection.symptoms;
        content.innerHTML = `
            <div class="card" style="margin-bottom: var(--space-lg);">
                <h4 style="font-family:var(--font-heading);color:var(--color-vermillion-dark);margin-bottom: var(--space-sm);">
                    选择主要不适症状（最多 5 个）
                </h4>
                <div class="qc-search-row" style="margin-bottom: var(--space-md);">
                    <input type="text" id="compSymInput" class="qc-search-input" placeholder="🔍 输入并选择症状（如：头痛、失眠、乏力…）" autocomplete="off">
                    <div id="compSymAutocomplete" class="autocomplete-dropdown" style="display:none;"></div>
                </div>
                <div id="compSymTags" class="selected-symptoms-tags" style="display:${selected.length ? 'flex' : 'none'};"></div>
                <div class="form-option-grid" style="margin-top: var(--space-md);">
                    ${allSymptoms.slice(0, 60).map(s => `
                        <label class="form-option-chip" style="display:inline-flex;align-items:center;gap:6px;padding:8px 14px;border:1px solid var(--color-line,#e2d9cc);border-radius:20px;cursor:pointer;font-size:var(--text-sm);">
                            <input type="checkbox" name="compSym" value="${this._esc(s)}" ${selected.includes(s) ? 'checked' : ''} style="accent-color:var(--color-vermillion,#C04040);">
                            <span>${s}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
            <div style="display:flex;gap:10px;justify-content:flex-end;">
                <button class="btn btn-primary" id="compStepNext">下一步：舌象 →</button>
            </div>
        `;

        const me = this;
        // 复选框选中态 + 同步 selection
        content.querySelectorAll('.form-option-chip input[name="compSym"]').forEach(inp => {
            inp.addEventListener('change', () => {
                const chip = inp.closest('.form-option-chip');
                const sym = inp.value;
                if (inp.checked) {
                    if (this.selection.symptoms.length >= 5) { inp.checked = false; Toast.show('最多选择 5 个症状', 'warning'); return; }
                    if (!this.selection.symptoms.includes(sym)) this.selection.symptoms.push(sym);
                    chip.classList.add('chip-selected');
                } else {
                    this.selection.symptoms = this.selection.symptoms.filter(x => x !== sym);
                    chip.classList.remove('chip-selected');
                }
                this._renderSelectedSymTags(content, container);
            });
            if (inp.checked) inp.closest('.form-option-chip').classList.add('chip-selected');
        });
        this._renderSelectedSymTags(content, container);

        // 自动补全
        const input = content.querySelector('#compSymInput');
        const dropdown = content.querySelector('#compSymAutocomplete');
        if (input) {
            input.addEventListener('input', () => {
                const q = input.value.trim();
                if (!q) { dropdown.style.display = 'none'; return; }
                const matched = allSymptoms.filter(s => s.includes(q)).slice(0, 8);
                if (!matched.length) { dropdown.style.display = 'none'; return; }
                dropdown.innerHTML = matched.map(s => `<div class="autocomplete-item" data-symptom="${this._esc(s)}">${s}</div>`).join('');
                dropdown.style.display = 'block';
                dropdown.querySelectorAll('.autocomplete-item').forEach(item => {
                    item.addEventListener('click', () => {
                        this._addSymptom(item.dataset.symptom, content, container);
                        input.value = '';
                        dropdown.style.display = 'none';
                    });
                });
            });
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    const q = input.value.trim();
                    if (q && allSymptoms.includes(q)) {
                        this._addSymptom(q, content, container);
                        input.value = '';
                        dropdown.style.display = 'none';
                    }
                }
            });
            document.addEventListener('click', (e) => {
                if (dropdown && !dropdown.contains(e.target) && e.target !== input) dropdown.style.display = 'none';
            });
        }

        // 已选标签点击取消
        content.querySelector('#compSymTags').addEventListener('click', (e) => {
            const rm = e.target.closest('.tag-remove');
            if (rm) {
                const s = rm.dataset.removeSymptom;
                this.selection.symptoms = this.selection.symptoms.filter(x => x !== s);
                this.renderSymptoms(content, container);
            }
        });

        // 下一步
        const nextBtn = content.querySelector('#compStepNext');
        if (nextBtn) nextBtn.addEventListener('click', () => {
            if (this.selection.symptoms.length === 0) { Toast.show('请至少选择 1 个症状', 'warning'); return; }
            this.step = 2;
            this.render(container);
        });
    }

    _addSymptom(s, content, container) {
        if (!s) return;
        if (this.selection.symptoms.includes(s)) return;
        if (this.selection.symptoms.length >= 5) { Toast.show('最多选择 5 个症状', 'warning'); return; }
        this.selection.symptoms.push(s);
        this.renderSymptoms(content, container);
    }

    _renderSelectedSymTags(content, container) {
        const tags = content.querySelector('#compSymTags');
        if (!tags) return;
        if (!this.selection.symptoms.length) { tags.style.display = 'none'; return; }
        tags.style.display = 'flex';
        tags.innerHTML = this.selection.symptoms.map(s => `
            <span class="selected-symptom-tag">${s}<button class="tag-remove" data-remove-symptom="${this._esc(s)}">&times;</button></span>
        `).join('');
    }

    // ---------- 通用规则表单（舌象/面象） ----------
    renderRuleForm(content, container, rules, selKey, stepLabel, nextStep) {
        content.innerHTML = `
            <div class="card" style="margin-bottom: var(--space-lg);">
                <h4 style="font-family:var(--font-heading);color:var(--color-vermillion-dark);margin-bottom: var(--space-md);">
                    请选择${stepLabel}特征
                </h4>
                ${rules.fields.map(field => `
                    <div class="form-field-group" style="margin-bottom: var(--space-lg);">
                        <label class="form-field-label" style="font-weight:600;display:block;margin-bottom:8px;">
                            ${field.label}
                            <span style="font-weight:400;color:var(--color-ink-pale);font-size:var(--text-xs);margin-left:8px;">${field.hint || ''}</span>
                        </label>
                        <div class="form-option-grid" style="display:flex;flex-wrap:wrap;gap:8px;">
                            ${field.options.map(opt => `
                                <label class="form-option-chip" style="display:inline-flex;align-items:center;gap:6px;padding:8px 14px;border:1px solid var(--color-line,#e2d9cc);border-radius:20px;cursor:pointer;font-size:var(--text-sm);">
                                    <input type="${field.multi ? 'checkbox' : 'radio'}" name="${selKey}_${field.key}" value="${this._esc(opt.value)}" style="accent-color:var(--color-vermillion,#C04040);">
                                    <span>${opt.label}</span>
                                    <span style="font-size:11px;color:var(--color-ink-pale);">${opt.desc || ''}</span>
                                </label>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
            <div style="display:flex;gap:10px;justify-content:space-between;">
                <button class="btn btn-outline" id="compStepPrev">← 上一步</button>
                <button class="btn btn-primary" id="compStepNext">${nextStep}</button>
            </div>
        `;

        const me = this;
        content.querySelectorAll('.form-option-chip').forEach(chip => {
            const inp = chip.querySelector('input');
            if (!inp) return;
            inp.addEventListener('change', () => {
                const group = chip.closest('.form-field-group');
                if (inp.type === 'radio') group.querySelectorAll('.form-option-chip').forEach(c => c.classList.remove('chip-selected'));
                if (inp.checked) chip.classList.add('chip-selected');
                else chip.classList.remove('chip-selected');
            });
        });

        const prevBtn = content.querySelector('#compStepPrev');
        if (prevBtn) prevBtn.addEventListener('click', () => { this.step--; this.render(container); });
        const nextBtn = content.querySelector('#compStepNext');
        if (nextBtn) nextBtn.addEventListener('click', () => {
            // 收集选择
            const sel = {};
            rules.fields.forEach(field => {
                const vals = Array.from(content.querySelectorAll(`input[name="${selKey}_${field.key}"]:checked`)).map(i => i.value);
                if (vals.length) sel[field.key] = vals;
            });
            const total = Object.values(sel).reduce((s, v) => s + v.length, 0);
            if (total < 1) { Toast.show('请至少选择一项', 'warning'); return; }
            this.selection[selKey] = sel;
            this.step = nextStep;
            this.render(container);
        });
    }

    renderTongue(content, container) {
        if (typeof TongueRules === 'undefined') { Toast.show('舌诊规则数据未加载', 'warning'); return; }
        this.renderRuleForm(content, container, TongueRules, 'tongue', '舌象', 3);
    }

    renderFace(content, container) {
        if (typeof FaceRules === 'undefined') { Toast.show('面诊规则数据未加载', 'warning'); return; }
        this.renderRuleForm(content, container, FaceRules, 'face', '面象', 4);
    }

    // ---------- Step 4 体质 ----------
    renderConstitution(content, container) {
        const saved = Storage.get(CONSTANTS.STORAGE_KEYS.CONSTITUTION_RESULT);
        const savedType = saved && saved.primaryType ? saved.primaryType : '';
        if (savedType && !this.selection.constitution) this.selection.constitution = savedType;

        content.innerHTML = `
            <div class="card" style="margin-bottom: var(--space-lg);">
                <h4 style="font-family:var(--font-heading);color:var(--color-vermillion-dark);margin-bottom: var(--space-sm);">
                    选择或确认您的体质
                </h4>
                <p style="font-size:var(--text-sm);color:var(--color-ink-light);margin-bottom: var(--space-md);">
                    ${savedType ? `您已做过体质测评，当前为「${savedType}」，可直接使用，也可修改。` : '如未做过体质测评，可在「体质辨识」中测评；此处可选填。'}
                </p>
                <div class="form-option-grid" style="display:flex;flex-wrap:wrap;gap:8px;">
                    ${CONSTANTS.CONSTITUTION_TYPES.map(ct => `
                        <label class="form-option-chip" style="display:inline-flex;align-items:center;gap:6px;padding:8px 14px;border:1px solid var(--color-line,#e2d9cc);border-radius:20px;cursor:pointer;font-size:var(--text-sm);">
                            <input type="radio" name="compConstitution" value="${ct}" ${this.selection.constitution === ct ? 'checked' : ''} style="accent-color:var(--color-vermillion,#C04040);">
                            <span>${ct}</span>
                        </label>
                    `).join('')}
                    <label class="form-option-chip" style="display:inline-flex;align-items:center;gap:6px;padding:8px 14px;border:1px solid var(--color-line,#e2d9cc);border-radius:20px;cursor:pointer;font-size:var(--text-sm);">
                        <input type="radio" name="compConstitution" value="" ${!this.selection.constitution ? 'checked' : ''} style="accent-color:var(--color-vermillion,#C04040);">
                        <span>不确定/不填写</span>
                    </label>
                </div>
            </div>
            <div style="display:flex;gap:10px;justify-content:space-between;">
                <button class="btn btn-outline" id="compStepPrev">← 上一步</button>
                <button class="btn btn-primary" id="compDiagnose">开始综合辨证 →</button>
            </div>
        `;

        const me = this;
        content.querySelectorAll('.form-option-chip').forEach(chip => {
            const inp = chip.querySelector('input');
            if (!inp) return;
            inp.addEventListener('change', () => {
                const group = chip.closest('.form-option-grid');
                group.querySelectorAll('.form-option-chip').forEach(c => c.classList.remove('chip-selected'));
                if (inp.checked) chip.classList.add('chip-selected');
            });
            if (inp.checked) chip.classList.add('chip-selected');
        });
        content.querySelector('#compStepPrev').addEventListener('click', () => { this.step = 3; this.render(container); });
        content.querySelector('#compDiagnose').addEventListener('click', () => {
            const checked = content.querySelector('input[name="compConstitution"]:checked');
            this.selection.constitution = checked ? checked.value : '';
            this.diagnose(container);
        });
    }

    // ---------- 汇总辨证 ----------
    diagnose(container) {
        const results = DiagnosisEngine.diagnose(this.selection);
        const sel = this.selection;
        const dangerHTML = (typeof dangerBannerHTML !== 'undefined') ? dangerBannerHTML(sel.symptoms) : '';

        const content = container.querySelector('#comprehensiveContent');
        if (!results || results.length === 0) {
            content.innerHTML = `
                <div class="empty-state card" style="text-align:center;padding: var(--space-2xl) var(--space-lg);">
                    <div style="font-size:48px;margin-bottom:var(--space-md);opacity:.3;">🩺</div>
                    <h4 style="color:var(--color-ink-light);margin-bottom:var(--space-sm);">未能匹配到明确的证型</h4>
                    <p style="color:var(--color-ink-pale);font-size:var(--text-sm);">请返回补充更多症状或舌面象信息，或咨询专业中医师。</p>
                    <button class="btn btn-outline" id="compRetry" style="margin-top:var(--space-md);">返回修改</button>
                </div>
            `;
            content.querySelector('#compRetry').addEventListener('click', () => { this.step = 1; this.render(container); });
            return;
        }

        const primaryMeta = sel.constitution && typeof window.constitutionMeta !== 'undefined' ? window.constitutionMeta[sel.constitution] : null;

        content.innerHTML = `
            ${dangerHTML}
            <div class="card" style="margin-bottom: var(--space-lg);">
                <div class="page-header" style="margin-bottom: var(--space-sm);">
                    <h4 style="font-family:var(--font-heading);color:var(--color-vermillion-dark);">综合辨证报告</h4>
                </div>
                <p style="font-size:var(--text-sm);color:var(--color-ink-light);margin-bottom:var(--space-sm);">
                    输入：症状「${sel.symptoms.join('、') || '—'}」${sel.tongue && Object.keys(sel.tongue).length ? '；舌象已选' : ''}${sel.face && Object.keys(sel.face).length ? '；面象已选' : ''}${sel.constitution ? `；体质「${sel.constitution}」` : ''}
                </p>
                ${results.slice(0, 3).map((r, i) => `
                    <div class="result-card" style="border:1px solid var(--color-line,#e2d9cc);border-radius:10px;margin-bottom: var(--space-md);overflow:hidden;">
                        <div class="result-header" style="padding:14px 18px;background:rgba(192,64,64,.05);display:flex;justify-content:space-between;align-items:center;">
                            <div>
                                <span class="tag tag-syndrome-link" data-syndrome-search="${this._esc(r.syndrome.name)}" style="font-size:16px;font-weight:600;color:var(--color-vermillion-dark);cursor:pointer;">${r.syndrome.name}</span>
                                <span style="font-size:var(--text-xs);color:var(--color-ink-pale);margin-left:10px;">${r.syndrome.category || ''}</span>
                            </div>
                            <span class="tag tag-formula" style="background:rgba(184,134,11,.12);color:var(--color-bronze-dark);padding:3px 10px;border-radius:12px;font-size:var(--text-xs);">匹配 ${r.matchScore}%${r.insufficient ? ' <span class="tag-warn">依据不足</span>' : ''}</span>
                        </div>
                        <div class="result-body" style="padding:14px 18px;">
                            ${(r.conflicts && r.conflicts.length) ? `<p style="font-size:var(--text-sm);color:var(--color-bronze-dark);margin-bottom:6px;"><b>⚠ 矛盾提示：</b>${r.conflicts.join('、')}</p>` : ''}
                            ${(r.missingKey && r.missingKey.length) ? `<p style="font-size:var(--text-sm);color:var(--color-blue-porcelain,#3B5E8B);margin-bottom:6px;"><b>💡 建议补充：</b>${r.missingKey.join('、')}</p>` : ''}
                            <p style="font-size:var(--text-sm);line-height:1.9;margin-bottom:8px;"><b>治法：</b>${r.syndrome.treatmentMethod || r.syndrome.treatmentPrinciple || '—'}</p>
                            ${(r.reasoningText && r.reasoningText.length) ? `
                                <p style="font-size:var(--text-xs);color:var(--color-ink-pale);margin-bottom:8px;"><b>推理依据：</b>${r.reasoningText.join('；')}</p>
                            ` : ''}
                            <div style="margin-top:8px;">
                                <b style="font-size:var(--text-sm);">推荐方剂：</b>
                                ${(r.syndrome.recommendedFormulas || []).slice(0, 3).map(f => `
                                    <span class="tag tag-formula formula-link" data-formula-id="${f.id}" style="cursor:pointer;margin:4px 4px 0 0;display:inline-block;">${f.name}（${f.matchScore}%）</span>
                                `).join('') || '<span style="font-size:var(--text-sm);color:var(--color-ink-pale);">暂无</span>'}
                            </div>
                        </div>
                    </div>
                `).join('')}
                ${primaryMeta ? `
                    <div class="card" style="margin-top:var(--space-md);padding:var(--space-md);background:rgba(91,139,59,.06);">
                        <h5 style="font-family:var(--font-heading);color:var(--color-success);margin-bottom:var(--space-xs);">${sel.constitution}调理建议</h5>
                        <p style="font-size:var(--text-sm);color:var(--color-ink-light);">${primaryMeta.description || ''}</p>
                        <p style="font-size:var(--text-sm);color:var(--color-ink-light);margin-top:6px;">饮食：${primaryMeta.dietAdvice || ''}</p>
                    </div>
                ` : ''}
            </div>
            <div style="display:flex;gap:10px;flex-wrap:wrap;">
                <button class="btn btn-primary" id="compSaveRecord">💾 保存诊断记录</button>
                <button class="btn btn-outline" id="compRestart">重新四诊</button>
            </div>
        `;

        // 事件绑定
        content.querySelector('#compRestart').addEventListener('click', () => {
            this.step = 1;
            this.selection = { symptoms: [], tongue: {}, face: {}, constitution: '' };
            this.render(container);
        });
        content.querySelector('#compSaveRecord').addEventListener('click', () => {
            if (typeof Records !== 'undefined' && Records.save) {
                Records.save({
                    type: 'comprehensive',
                    input: this.selection,
                    results: results.map(r => ({ syndromeId: r.syndrome.id, name: r.syndrome.name, matchScore: r.matchScore }))
                });
            } else {
                Toast.show('诊断记录功能未加载', 'warning');
            }
        });
        content.querySelectorAll('.tag-syndrome-link').forEach(tag => {
            tag.addEventListener('click', () => {
                if (typeof navigateTo === 'function') navigateTo('symptom', { search: tag.dataset.syndromeSearch });
            });
        });
        content.querySelectorAll('.formula-link').forEach(tag => {
            tag.addEventListener('click', () => {
                if (typeof DetailModal !== 'undefined' && tag.dataset.formulaId) DetailModal.open('formula', tag.dataset.formulaId);
            });
        });
    }

    _esc(value) {
        return String(value || '').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
}

// 浏览器全局导出
if (typeof window !== 'undefined') {
    window.ComprehensiveModule = ComprehensiveModule;
}
