// ===== 岐黄·辅助诊疗系统 - 体质辨识模块 =====
class ConstitutionModule {
    constructor() {
        this.currentQuestion = 0;
        this.answers = {};
        this.result = null;
        this.isCompleted = false;
        
        // 恢复之前未完成的问卷
        const saved = Storage.get(CONSTANTS.STORAGE_KEYS.QUESTIONNAIRE);
        if (saved) {
            this.answers = saved.answers || {};
            this.currentQuestion = saved.currentQuestion || 0;
        }
    }
    
    render(container) {
        if (this.isCompleted && this.result) {
            this.renderResult(container);
        } else {
            this.renderQuestionnaire(container);
        }
    }
    
    renderQuestionnaire(container) {
        const totalQuestions = constitutionQuestions.length;
        const question = constitutionQuestions[this.currentQuestion];
        const answeredCount = Object.keys(this.answers).length;
        const progress = Math.round((answeredCount / totalQuestions) * 100);
        
        container.innerHTML = `
            <div class="module-page constitution-page">
                <div class="page-header">
                    <h2 class="page-title">
                        <span class="seal-stamp">辨</span>
                        中医体质辨识
                    </h2>
                    <p class="page-subtitle">基于中华中医药学会《中医体质分类与判定》标准</p>
                </div>
                
                <div class="progress-section">
                    <div class="progress-info">
                        <span class="progress-text">第 ${this.currentQuestion + 1}/${totalQuestions} 题</span>
                        <span class="progress-text">已答 ${answeredCount} 题</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progress}%"></div>
                    </div>
                </div>
                
                <div class="question-card card">
                    <div class="question-number">
                        <span class="seal-stamp" style="width:36px;height:36px;font-size:12px;">${this.currentQuestion + 1}</span>
                    </div>
                    <p class="question-text" style="font-size: var(--text-lg); margin: var(--space-lg) 0; line-height: 1.8;">${question.text}</p>
                    <p style="font-size: var(--text-xs); color: var(--color-ink-pale); margin-bottom: var(--space-md);">
                        请根据近一年的体验和感觉回答
                    </p>
                    
                    <div class="option-selector">
                        ${question.options.map(opt => `
                            <button class="option-btn ${this.answers[question.id] === opt.value ? 'selected' : ''}"
                                    data-value="${opt.value}">
                                ${opt.label}
                            </button>
                        `).join('')}
                    </div>
                </div>
                
                <div class="navigation-buttons">
                    <div>
                        ${this.currentQuestion > 0 ? 
                            '<button class="btn btn-outline" id="prevBtn">← 上一题</button>' : ''}
                    </div>
                    <div style="display:flex;gap:var(--space-md);">
                        ${answeredCount > 0 ? 
                            '<button class="btn btn-ghost" id="saveBtn">保存进度</button>' : ''}
                        <button class="btn btn-primary" id="nextBtn" ${!this.answers[question.id] ? 'disabled' : ''}>
                            ${this.currentQuestion < totalQuestions - 1 ? '下一题 →' : '提交问卷 ✓'}
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        this.bindQuestionnaireEvents(container);
    }
    
    bindQuestionnaireEvents(container) {
        // 选项点击
        DOM.$$('.option-btn', container).forEach(btn => {
            btn.addEventListener('click', () => {
                const value = parseInt(btn.dataset.value);
                const question = constitutionQuestions[this.currentQuestion];
                this.answers[question.id] = value;
                
                // 更新选中状态
                DOM.$$('.option-btn', container).forEach(b => DOM.removeClass(b, 'selected'));
                DOM.addClass(btn, 'selected');
                
                // 启用下一题按钮
                const nextBtn = DOM.$('#nextBtn', container);
                if (nextBtn) nextBtn.disabled = false;
            });
        });
        
        // 上一题
        DOM.$('#prevBtn', container)?.addEventListener('click', () => {
            if (this.currentQuestion > 0) {
                this.currentQuestion--;
                this.saveProgress();
                this.render(container);
            }
        });
        
        // 下一题/提交
        DOM.$('#nextBtn', container)?.addEventListener('click', () => {
            const question = constitutionQuestions[this.currentQuestion];
            if (!this.answers[question.id]) {
                Toast.show('请先选择一个选项', 'warning');
                return;
            }
            
            if (this.currentQuestion < constitutionQuestions.length - 1) {
                this.currentQuestion++;
                this.saveProgress();
                this.render(container);
            } else {
                this.submitQuestionnaire(container);
            }
        });
        
        // 保存进度
        DOM.$('#saveBtn', container)?.addEventListener('click', () => {
            this.saveProgress();
            Toast.show('进度已保存 ✓', 'success');
        });
    }
    
    saveProgress() {
        Storage.set(CONSTANTS.STORAGE_KEYS.QUESTIONNAIRE, {
            answers: this.answers,
            currentQuestion: this.currentQuestion
        });
    }
    
    submitQuestionnaire(container) {
        // 计算各体质得分
        const scores = this.calculateScores();
        
        // 判定
        this.result = this.judgeConstitution(scores);
        this.isCompleted = true;
        
        // 保存结果
        Storage.set(CONSTANTS.STORAGE_KEYS.CONSTITUTION_RESULT, this.result);
        Storage.remove(CONSTANTS.STORAGE_KEYS.QUESTIONNAIRE);
        
        this.render(container);
    }
    
    calculateScores() {
        const scores = {};
        
        CONSTANTS.CONSTITUTION_TYPES.forEach(type => {
            const typeQuestions = constitutionQuestions.filter(q => q.constitution === type);
            let rawScore = 0;
            
            typeQuestions.forEach(q => {
                const answer = this.answers[q.id];
                if (answer) {
                    rawScore += q.isReversed ? (6 - answer) : answer;
                }
            });
            
            // 转化分 = (原始分 - 题目数) / (题目数 * 4) * 100
            const n = typeQuestions.length;
            const convertedScore = n > 0 ? ((rawScore - n) / (n * 4)) * 100 : 0;
            
            scores[type] = {
                rawScore,
                questionCount: n,
                convertedScore: Math.round(convertedScore * 10) / 10
            };
        });
        
        return scores;
    }
    
    judgeConstitution(scores) {
        const balancedScore = scores['平和质']?.convertedScore || 0;
        const otherScores = CONSTANTS.CONSTITUTION_TYPES
            .filter(t => t !== '平和质')
            .map(t => scores[t]?.convertedScore || 0);
        
        const isBalanced = balancedScore >= CONSTANTS.SCORING.BALANCED_THRESHOLD
            && otherScores.every(s => s < CONSTANTS.SCORING.TENDENCY_THRESHOLD);
        
        const biasedTypes = [];
        const tendencyTypes = [];
        
        CONSTANTS.CONSTITUTION_TYPES.filter(t => t !== '平和质').forEach(type => {
            const score = scores[type]?.convertedScore || 0;
            if (score >= CONSTANTS.SCORING.BIASED_THRESHOLD) {
                biasedTypes.push(type);
            } else if (score >= CONSTANTS.SCORING.TENDENCY_THRESHOLD) {
                tendencyTypes.push(type);
            }
        });
        
        return {
            scores,
            isBalanced,
            primaryType: isBalanced ? '平和质' : (biasedTypes[0] || tendencyTypes[0] || '平和质'),
            biasedTypes,
            tendencyTypes,
            allTypes: CONSTANTS.CONSTITUTION_TYPES.map(type => ({
                type,
                score: scores[type]?.convertedScore || 0,
                meta: constitutionMeta[type] || null
            })).sort((a, b) => b.score - a.score)
        };
    }
    
    renderResult(container) {
        const { scores, isBalanced, primaryType, biasedTypes, tendencyTypes, allTypes } = this.result;
        const primaryMeta = constitutionMeta[primaryType];
        const top5 = allTypes.slice(0, 5).filter(t => t.score > 0);
        
        container.innerHTML = `
            <div class="module-page constitution-result-page">
                <div class="page-header">
                    <h2 class="page-title">
                        <span class="seal-stamp">果</span>
                        体质辨识结果
                    </h2>
                    <p class="page-subtitle">基于中华中医药学会标准量表计算</p>
                </div>
                
                <div class="card" style="text-align:center; margin-bottom: var(--space-xl);">
                    <div style="font-size: 64px; margin-bottom: var(--space-sm);">
                        ${isBalanced ? '☯' : '⚖'}
                    </div>
                    <h3 style="font-family: var(--font-display); color: var(--color-vermillion-dark); font-size: var(--text-3xl); margin-bottom: var(--space-sm);">
                        ${primaryType}
                    </h3>
                    <p style="color: var(--color-ink-light); max-width: 500px; margin: 0 auto;">
                        ${primaryMeta?.description || ''}
                    </p>
                    
                    ${biasedTypes.length > 1 ? `
                        <div style="margin-top: var(--space-lg);">
                            <span style="color: var(--color-vermillion); font-weight: 600;">兼夹体质：</span>
                            <span style="color: var(--color-ink);">${biasedTypes.join('、')}</span>
                        </div>
                    ` : ''}
                    ${tendencyTypes.length > 0 ? `
                        <div style="margin-top: var(--space-sm);">
                            <span style="color: var(--color-bronze); font-weight: 600;">倾向体质：</span>
                            <span style="color: var(--color-ink-light);">${tendencyTypes.join('、')}</span>
                        </div>
                    ` : ''}
                </div>
                
                <!-- 得分详情 -->
                <h3 style="margin-bottom: var(--space-md);">各体质得分详情</h3>
                <div style="margin-bottom: var(--space-xl);">
                    ${top5.map(t => `
                        <div style="display:flex;align-items:center;gap:var(--space-md);margin-bottom:var(--space-sm);">
                            <span style="width:80px;font-size:var(--text-sm);text-align:right;">${t.type}</span>
                            <div style="flex:1;height:24px;background:rgba(44,44,44,0.06);border-radius:12px;overflow:hidden;">
                                <div style="height:100%;background:linear-gradient(90deg,var(--color-vermillion),var(--color-bronze));border-radius:12px;width:${Math.min(t.score, 100)}%;transition:width 0.8s ease;"></div>
                            </div>
                            <span style="width:50px;font-size:var(--text-sm);font-weight:600;">${t.score}分</span>
                        </div>
                    `).join('')}
                </div>
                
                <!-- 调理建议 -->
                ${primaryMeta ? `
                    <h3 style="margin-bottom: var(--space-md);">调理建议</h3>
                    <div class="grid-2">
                        <div class="card">
                            <h4 style="font-family:var(--font-heading);color:var(--color-vermillion-dark);margin-bottom:var(--space-sm);">🥗 饮食调理</h4>
                            <p style="font-size:var(--text-sm);color:var(--color-ink-light);">${primaryMeta.dietAdvice}</p>
                        </div>
                        <div class="card">
                            <h4 style="font-family:var(--font-heading);color:var(--color-vermillion-dark);margin-bottom:var(--space-sm);">🏃 生活建议</h4>
                            <p style="font-size:var(--text-sm);color:var(--color-ink-light);">${primaryMeta.lifestyleAdvice}</p>
                        </div>
                    </div>
                    
                    ${primaryMeta.recommendations?.length > 0 ? `
                        <div class="card" style="margin-top:var(--space-lg);">
                            <h4 style="font-family:var(--font-heading);color:var(--color-vermillion-dark);margin-bottom:var(--space-sm);">📋 调理要点</h4>
                            <ul style="list-style: disc; padding-left: var(--space-lg);">
                                ${primaryMeta.recommendations.map(r => `<li style="margin-bottom:var(--space-xs);font-size:var(--text-sm);">${r}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    
                    ${primaryMeta.relatedFormulas?.length > 0 ? `
                        <div class="card" style="margin-top:var(--space-lg);">
                            <h4 style="font-family:var(--font-heading);color:var(--color-vermillion-dark);margin-bottom:var(--space-sm);">📜 推荐方剂</h4>
                            <div style="display:flex;flex-wrap:wrap;gap:var(--space-sm);">
                                ${primaryMeta.relatedFormulas.map(f => `<span class="tag" style="font-size:var(--text-sm);background:var(--color-bronze-pale);color:var(--color-bronze-dark);padding:4px 12px;">${f}</span>`).join('')}
                            </div>
                        </div>
                    ` : ''}
                    ${this.renderProfileAdvice(primaryType)}
                ` : ''}
                
                <div style="text-align:center;margin-top:var(--space-2xl);display:flex;gap:var(--space-md);justify-content:center;flex-wrap:wrap;">
                    <button class="btn btn-primary" id="saveConstitutionPlanBtn">📌 保存为常用方案</button>
                    <button class="btn btn-outline" id="rerunConstitutionBtn">重新测评</button>
                </div>
                
                <div class="disclaimer">
                    <strong>提示：</strong>体质测评结果仅供参考，中医体质辨识需结合望闻问切四诊合参。如有健康问题，请咨询专业中医师。
                </div>
            </div>
        `;

        // 保存方案
        const saveBtn = container.querySelector('#saveConstitutionPlanBtn');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                if (typeof Plans !== 'undefined' && Plans.save) {
                    Plans.save({
                        title: primaryType + '体质调理方案',
                        type: 'constitution',
                        data: {
                            typeName: primaryType,
                            description: (primaryMeta && primaryMeta.description) || '',
                            dietAdvice: (primaryMeta && primaryMeta.dietAdvice) || '',
                            formulas: (primaryMeta && primaryMeta.relatedFormulas) || []
                        }
                    });
                } else {
                    Toast.show('常用方案功能未加载', 'warning');
                }
            });
        }
        // 重新测评
        const rerunBtn = container.querySelector('#rerunConstitutionBtn');
        if (rerunBtn) {
            rerunBtn.addEventListener('click', () => {
                this.isCompleted = false;
                this.currentQuestion = 0;
                this.answers = {};
                this.render(container);
            });
        }
    }

    // 画像个性化提示（妊娠哺乳/年龄）
    renderProfileAdvice(primaryType) {
        if (typeof Profile === 'undefined') return '';
        const p = Profile.get();
        if (!p) return '';
        const tips = [];
        if (['pregnant', 'nursing'].includes(p.pregnancyState)) {
            tips.push('您处于孕产/哺乳期，任何中药调理请务必先咨询妇产科及中医师，勿自行服用。');
        }
        if (p.age === '60岁以上') {
            tips.push('老年体弱，进补宜缓宜轻，方药剂量建议从小剂量开始，观察反应。');
        }
        if (p.chronicDisease) {
            tips.push(`您有慢病史（${p.chronicDisease}），体质调理与用药需结合专科医生意见。`);
        }
        if (tips.length === 0) return '';
        return `
            <div class="card" style="margin-top:var(--space-lg);border-color:rgba(59,94,139,0.25);background:rgba(59,94,139,0.04);">
                <h4 style="font-family:var(--font-heading);color:var(--color-blue-porcelain);margin-bottom:var(--space-sm);">👤 个性化提示</h4>
                <ul style="list-style:disc;padding-left:var(--space-lg);">
                    ${tips.map(t => `<li style="margin-bottom:var(--space-xs);font-size:var(--text-sm);line-height:1.8;">${t}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    destroy() {}
}
