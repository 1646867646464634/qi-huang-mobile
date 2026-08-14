// ===== 岐黄·辅助诊疗系统 - 面诊模块（问诊式表单化） =====
// 原"上传照片→AI模拟分析"改为结构化问诊表单，由 DiagnosisEngine 基于 syndromesDatabase 加权打分给出辨证参考。纯前端、可离线。
class FaceModule {
    constructor() {
        this.selection = {};
        this.aiSelection = null; // AI 图片识别回填结果（供 Records 追溯）
    }

    destroy() {}

    render(container) {
        container.innerHTML = `
            <div class="module-page face-page">
                <div class="page-header">
                    <h2 class="page-title">
                        <span class="seal-stamp">面</span>
                        面诊问诊分析
                    </h2>
                    <p class="page-subtitle">按望诊要素逐项选择面色与面部特征，系统给出辨证参考（教学用途，可离线使用）</p>
                </div>

                <div class="card" style="margin-bottom: var(--space-lg);">
                    <h4 style="font-family: var(--font-heading); color: var(--color-vermillion-dark); margin-bottom: var(--space-sm);">
                        观察要点
                    </h4>
                    <ul class="guide-list" style="font-size: var(--text-sm); color: var(--color-ink-light); padding-left: var(--space-lg); line-height: 2;">
                        <li>面色：红润主常或热，淡白主气血亏虚，萎黄主脾虚湿盛，晦暗主瘀血，赤红主热盛</li>
                        <li>光泽：面色荣润为有神，少华示气血不足，无华示精气衰败</li>
                        <li>分部：眼睑属脾、口唇属脾、鼻头属脾肺，分部观察可定位脏腑</li>
                        <li>此表单为教学辅助，实际望诊需结合四诊合参</li>
                    </ul>
                </div>

                <div class="card" style="margin-bottom: var(--space-lg);">
                    <h4 style="font-family: var(--font-heading); color: var(--color-vermillion-dark); margin-bottom: var(--space-sm);">
                        AI 图片识别（可选）
                    </h4>
                    <div class="upload-zone" id="faceUploadZone" role="button" tabindex="0" aria-label="上传面部图片">
                        <input type="file" id="faceUploadInput" accept="image/jpeg,image/jpg,image/png" hidden>
                        <div class="upload-icon">📷</div>
                        <div class="upload-text">点击或拖拽面部照片上传，AI 自动识别并回填下方表单</div>
                        <div class="upload-hint">支持 JPG/PNG，单张 ≤5MB；识别结果可编辑</div>
                        <img class="upload-preview" style="display:none; max-height:320px; border-radius:10px; margin:8px auto 0;" alt="已选图片预览">
                    </div>
                    <div class="analyzing-spinner" id="faceAnalyzingSpinner" style="display:none;">
                        <div class="spinner"></div>
                        <div>AI 分析中，请稍候…</div>
                    </div>
                    <p style="font-size:var(--text-xs); color:var(--color-ink-pale); margin-top:8px;">
                        ⚠ 提示：图片将上传至第三方 AI 服务（智谱 GLM-4V）进行识别，请勿上传含隐私信息的图片；本系统不会保存您的图片。
                    </p>
                </div>

                <div class="card" style="margin-bottom: var(--space-lg);">
                    ${this.renderForm()}
                </div>

                <div id="faceResultContainer" class="result-container" style="display:none;"></div>

                <div class="disclaimer" style="margin-top: var(--space-xl);">
                    <strong>免责声明：</strong>面诊问诊分析仅作为学习与辅助参考，不能替代专业中医师的诊断。
                    面诊是中医四诊"望诊"的重要组成部分，需结合问诊、闻诊、切诊进行综合判断。
                </div>
            </div>
        `;

        this.bindEvents(container);
    }

    renderForm() {
        const rules = (typeof FaceRules !== 'undefined') ? FaceRules : null;
        if (!rules) return '<p>面诊规则数据未加载</p>';

        return `
            <h4 style="font-family: var(--font-heading); color: var(--color-vermillion-dark); margin-bottom: var(--space-md);">
                请选择面部特征
            </h4>
            ${rules.fields.map(field => `
                <div class="form-field-group" style="margin-bottom: var(--space-lg);">
                    <label class="form-field-label" style="font-weight:600; display:block; margin-bottom:8px;">
                        ${field.label}
                        <span style="font-weight:400; color:var(--color-ink-pale); font-size:var(--text-xs); margin-left:8px;">${field.hint || ''}</span>
                    </label>
                    <div class="form-option-grid" style="display:flex; flex-wrap:wrap; gap:8px;">
                        ${field.options.map(opt => `
                            <label class="form-option-chip" style="display:inline-flex; align-items:center; gap:6px; padding:8px 14px; border:1px solid var(--color-line,#e2d9cc); border-radius:20px; cursor:pointer; font-size:var(--text-sm); background:var(--color-card,#FBF8F4); transition:all .15s;">
                                <input type="${field.multi ? 'checkbox' : 'radio'}" name="face_${field.key}" value="${opt.value}" style="accent-color:var(--color-vermillion,#C04040);">
                                <span>${opt.label}</span>
                                <span style="font-size:11px; color:var(--color-ink-pale);">${opt.desc || ''}</span>
                            </label>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
            <div style="display:flex; gap:10px; margin-top: var(--space-md);">
                <button class="btn btn-primary" id="faceDiagnoseBtn">开始辨证</button>
                <button class="btn btn-outline" id="faceResetBtn">重置选择</button>
            </div>
        `;
    }

    bindEvents(container) {
        const diagnoseBtn = container.querySelector('#faceDiagnoseBtn');
        const resetBtn = container.querySelector('#faceResetBtn');

        container.querySelectorAll('.form-option-chip').forEach(chip => {
            const input = chip.querySelector('input');
            if (input) {
                input.addEventListener('change', () => {
                    const group = chip.closest('.form-field-group');
                    if (input.type === 'radio') {
                        group.querySelectorAll('.form-option-chip').forEach(c => c.classList.remove('chip-selected'));
                    }
                    if (input.checked) chip.classList.add('chip-selected');
                    else chip.classList.remove('chip-selected');
                });
            }
        });

        if (diagnoseBtn) {
            diagnoseBtn.addEventListener('click', () => this.performDiagnosis(container));
        }
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.selection = {};
                container.querySelectorAll('.form-option-chip input').forEach(i => {
                    i.checked = false;
                    i.closest('.form-option-chip').classList.remove('chip-selected');
                });
                const rc = container.querySelector('#faceResultContainer');
                if (rc) { rc.style.display = 'none'; rc.innerHTML = ''; }
                this.clearUpload(container, 'face');
            });
        }

        this.bindUploadEvents(container, 'face', (typeof FaceRules !== 'undefined') ? FaceRules : null);
    }

    // ===== AI 图片识别（智谱 GLM-4V，经 Vercel 代理） =====

    bindUploadEvents(container, analysisType, rules) {
        const zone = container.querySelector('#' + analysisType + 'UploadZone');
        const fileInput = container.querySelector('#' + analysisType + 'UploadInput');
        if (!zone || !fileInput || typeof GLMVision === 'undefined') return; // 未加载时静默降级为纯手动表单

        const openPicker = () => fileInput.click();
        zone.addEventListener('click', openPicker);
        zone.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openPicker(); }
        });

        ['dragenter', 'dragover'].forEach(ev => zone.addEventListener(ev, (e) => {
            e.preventDefault();
            zone.classList.add('drag-over');
        }));
        ['dragleave', 'drop'].forEach(ev => zone.addEventListener(ev, (e) => {
            e.preventDefault();
            zone.classList.remove('drag-over');
        }));
        zone.addEventListener('drop', (e) => {
            const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
            if (f) this.handleImage(container, f, analysisType, rules);
        });
        fileInput.addEventListener('change', () => {
            const f = fileInput.files && fileInput.files[0];
            if (f) this.handleImage(container, f, analysisType, rules);
        });

        this._analyzing = false; // 防重复提交
    }

    async handleImage(container, file, analysisType, rules) {
        if (this._analyzing) return;
        const zone = container.querySelector('#' + analysisType + 'UploadZone');
        const spinner = container.querySelector('#' + analysisType + 'AnalyzingSpinner');
        const preview = container.querySelector('#' + analysisType + 'UploadZone .upload-preview');
        const diagnoseBtn = container.querySelector('#' + analysisType + 'DiagnoseBtn');

        this._analyzing = true;
        if (diagnoseBtn) diagnoseBtn.disabled = true;
        if (spinner) spinner.style.display = 'flex';
        if (preview) { preview.src = URL.createObjectURL(file); preview.style.display = 'block'; }
        if (zone) zone.classList.add('has-image');

        try {
            const base64 = await GLMVision.readImage(file);
            const prompt = GLMVision.buildPrompt(analysisType, rules);
            const text = await GLMVision.analyzeImage(analysisType, base64, prompt);
            const parsed = GLMVision.parseVisionJSON(text);
            if (!parsed) throw { code: 'PARSE', message: 'AI 返回内容无法解析为结构化数据' };
            const selection = GLMVision.mapToSelection(rules, parsed);
            if (!Object.keys(selection).length) {
                Toast.show('AI 未能识别出有效特征，可手动选择', 'warning');
            } else {
                this.fillForm(container, analysisType, selection);
                this.aiSelection = selection;
                Toast.show('AI 识别完成，已回填表单（可修改）', 'success');
            }
        } catch (err) {
            const msg = (err && err.message) || 'AI 识别失败';
            Toast.show(msg + '，可手动选择下方特征', 'error');
        } finally {
            this._analyzing = false;
            if (spinner) spinner.style.display = 'none';
            if (diagnoseBtn) diagnoseBtn.disabled = false;
            if (preview && preview.src && preview.src.indexOf('blob:') === 0) URL.revokeObjectURL(preview.src);
        }
    }

    /** 回填表单：设置 radio/checkbox checked 并刷新 chip 选中态 */
    fillForm(container, analysisType, selection) {
        const rules = analysisType === 'tongue' ? (window.TongueRules || null) : (window.FaceRules || null);
        if (!rules) return;
        rules.fields.forEach(field => {
            const values = selection[field.key];
            if (!values || !values.length) return;
            const groupInput = container.querySelector('.form-field-group input[name="' + analysisType + '_' + field.key + '"]');
            const group = groupInput ? groupInput.closest('.form-field-group') : null;
            // 单选先清组，多选叠加
            if (!field.multi && group) {
                group.querySelectorAll('input[name="' + analysisType + '_' + field.key + '"]').forEach(i => {
                    i.checked = false;
                    const chip = i.closest('.form-option-chip');
                    if (chip) chip.classList.remove('chip-selected');
                });
            }
            values.forEach(v => {
                const input = container.querySelector('input[name="' + analysisType + '_' + field.key + '"][value="' + this._escAttr(v) + '"]');
                if (!input) return;
                input.checked = true;
                const chip = input.closest('.form-option-chip');
                if (chip) chip.classList.add('chip-selected');
            });
        });
    }

    /** 清空上传区（reset 使用） */
    clearUpload(container, analysisType) {
        const zone = container.querySelector('#' + analysisType + 'UploadZone');
        const spinner = container.querySelector('#' + analysisType + 'AnalyzingSpinner');
        const preview = zone && zone.querySelector('.upload-preview');
        if (zone) zone.classList.remove('has-image', 'drag-over');
        if (preview) { preview.style.display = 'none'; preview.removeAttribute('src'); }
        if (spinner) spinner.style.display = 'none';
        const fileInput = container.querySelector('#' + analysisType + 'UploadInput');
        if (fileInput) fileInput.value = '';
        this.aiSelection = null;
    }

    _escAttr(v) {
        return String(v || '').replace(/"/g, '&quot;');
    }

    performDiagnosis(container) {
        const rules = (typeof FaceRules !== 'undefined') ? FaceRules : null;
        if (!rules) { Toast.show('面诊规则数据未加载', 'warning'); return; }
        const selection = {};
        rules.fields.forEach(field => {
            const inputs = container.querySelectorAll(`input[name="face_${field.key}"]:checked`);
            const values = Array.from(inputs).map(i => i.value);
            if (values.length) selection[field.key] = values;
        });

        const totalSelected = Object.values(selection).reduce((s, v) => s + v.length, 0);
        if (totalSelected < 2) {
            Toast.show('请至少选择两项面部特征（如面色 + 光泽）', 'warning');
            return;
        }
        this.selection = selection;

        const keywords = DiagnosisEngine.collectKeywords(rules, selection);
        const results = DiagnosisEngine.scoreSyndromes(keywords);
        this.renderResults(container, results, selection, rules);
    }

    renderResults(container, results, selection, rules) {
        const resultContainer = container.querySelector('#faceResultContainer');
        if (!resultContainer) return;

        const selectionText = rules.fields
            .filter(f => selection[f.key] && selection[f.key].length)
            .map(f => {
                const labels = selection[f.key].map(v => {
                    const opt = f.options.find(o => o.value === v);
                    return opt ? opt.label : v;
                });
                return `${f.label}：${labels.join('、')}`;
            })
            .join('；');

        if (!results || results.length === 0) {
            resultContainer.innerHTML = `
                <div class="empty-state card" style="text-align:center; padding: var(--space-2xl) var(--space-lg);">
                    <div style="font-size:48px; margin-bottom: var(--space-md); opacity:.3;">😊</div>
                    <h4 style="color: var(--color-ink-light); margin-bottom: var(--space-sm);">未匹配到明显证型</h4>
                    <p style="color: var(--color-ink-pale); font-size: var(--text-sm);">
                        您选择的面部特征组合较难对应到知识库中的明确证型，建议核对观察要点后重试，或咨询专业医师。
                    </p>
                </div>
            `;
            resultContainer.style.display = 'block';
            return;
        }

        resultContainer.innerHTML = `
            <div class="card">
                <div class="page-header" style="margin-bottom: var(--space-md);">
                    <h4 style="font-family: var(--font-heading); color: var(--color-vermillion-dark);">辨证参考结果</h4>
                    <p style="font-size: var(--text-sm); color: var(--color-ink-light); margin-top:6px;">
                        您的选择：${selectionText}
                    </p>
                </div>
                ${results.map(r => `
                    <div class="result-card" style="border:1px solid var(--color-line,#e2d9cc); border-radius:10px; margin-bottom: var(--space-md); overflow:hidden;">
                        <div class="result-header" style="padding:14px 18px; background:rgba(192,64,64,.05); display:flex; justify-content:space-between; align-items:center;">
                            <div>
                                <span class="tag tag-syndrome-link" data-syndrome-search="${this.escapeAttr(r.syndrome.name)}" style="font-size:16px; font-weight:600; color:var(--color-vermillion-dark); cursor:pointer;">${r.syndrome.name}</span>
                                <span style="font-size:var(--text-xs); color:var(--color-ink-pale); margin-left:10px;">${r.syndrome.category || ''}</span>
                            </div>
                            <span class="tag tag-formula" style="background:rgba(184,134,11,.12); color:var(--color-bronze-dark); padding:3px 10px; border-radius:12px; font-size:var(--text-xs);">匹配 ${r.matchScore}%</span>
                            ${r.matchScore < 50 ? '<span class="tag tag-warn" style="margin-left:6px;">依据不足</span>' : ''}
                        </div>
                        <div class="result-body" style="padding:14px 18px;">
                            <p style="font-size:var(--text-sm); line-height:1.9; margin-bottom:8px;"><b>症状：</b>${(r.syndrome.symptoms || []).slice(0, 8).join('、')}</p>
                            <p style="font-size:var(--text-sm); line-height:1.9; margin-bottom:8px;"><b>舌象：</b>${this._tongueText(r.syndrome)}　<b>脉象：</b>${r.syndrome.pulseCondition || '—'}</p>
                            <p style="font-size:var(--text-sm); line-height:1.9; margin-bottom:8px;"><b>治法：</b>${r.syndrome.treatmentMethod || r.syndrome.treatmentPrinciple || '—'}</p>
                            <div style="margin-top:8px;">
                                <b style="font-size:var(--text-sm);">推荐方剂：</b>
                                ${(r.syndrome.recommendedFormulas || []).slice(0, 3).map(f => `
                                    <span class="tag tag-formula formula-link" data-formula-id="${f.id}" style="cursor:pointer; margin:4px 4px 0 0; display:inline-block;">${f.name}（${f.matchScore}%）</span>
                                `).join('') || '<span style="font-size:var(--text-sm); color:var(--color-ink-pale);">暂无</span>'}
                            </div>
                            <p style="font-size:var(--text-xs); color:var(--color-ink-pale); margin-top:10px;">辨证依据：${r.hits.slice(0, 6).join('、') || '特征组合'}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div style="display:flex;gap:10px;margin-top:var(--space-md);">
                <button class="btn btn-primary" id="faceSaveRecordBtn">💾 保存诊断记录</button>
            </div>
        `;
        resultContainer.style.display = 'block';

        // 保存诊断记录
        const saveBtn = resultContainer.querySelector('#faceSaveRecordBtn');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                if (typeof Records !== 'undefined' && Records.save) {
                    Records.save({
                        type: 'face',
                        input: { face: this.selection, ai: this.aiSelection || undefined },
                        results: results.map(r => ({ syndromeId: r.syndrome.id, name: r.syndrome.name, matchScore: r.matchScore }))
                    });
                } else {
                    Toast.show('诊断记录功能未加载', 'warning');
                }
            });
        }

        resultContainer.querySelectorAll('.tag-syndrome-link').forEach(tag => {
            tag.addEventListener('click', () => {
                const syndromeName = tag.dataset.syndromeSearch;
                if (syndromeName && typeof navigateTo === 'function') {
                    navigateTo('symptom', { search: syndromeName });
                }
            });
        });
        resultContainer.querySelectorAll('.formula-link').forEach(tag => {
            tag.addEventListener('click', () => {
                if (typeof DetailModal !== 'undefined' && tag.dataset.formulaId) {
                    DetailModal.open('formula', tag.dataset.formulaId);
                }
            });
        });
    }

    _tongueText(s) {
        const t = s.tongueAppearance;
        return t ? (typeof t === 'string' ? t : [t.tongueBody, t.tongueCoating].filter(Boolean).join('，')) : '—';
    }

    escapeAttr(value) {
        return String(value || '').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
}

// 浏览器全局导出
if (typeof window !== 'undefined') {
    window.FaceModule = FaceModule;
}
