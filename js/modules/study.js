// ===== 岐黄·辅助诊疗系统 - 学习中心模块 =====
// 功能：记忆卡片（方剂/中药/证型）、四科自测、错题本、学习仪表盘
// 数据全部自动从现有数据库派生；进度存 localStorage（tcm_cards_progress / tcm_quiz_records / tcm_wrong_questions）
class StudyModule {
    constructor() {
        this.activeTab = 'cards';
        this.cardDeck = 'formula';   // 当前卡组
        this.cardIndex = 0;
        this.cardFlipped = false;
        this.quizQuestions = [];
        this.quizIndex = 0;
        this.quizAnswers = [];
        this.quizStartTime = 0;
        this.quizTimer = null;
        this.wrongFilter = 'all';
    }

    destroy() {
        if (this.quizTimer) { clearInterval(this.quizTimer); this.quizTimer = null; }
    }

    render(container) {
        container.innerHTML = `
            <div class="module-page study-page">
                <div class="page-header">
                    <h2 class="page-title">
                        <span class="seal-stamp">学</span>
                        学习中心
                    </h2>
                    <p class="page-subtitle">记忆卡片 · 四科自测 · 错题沉淀 —— 数据自动从知识库生成</p>
                </div>

                <div class="study-tabs">
                    <button class="study-tab ${this.activeTab === 'cards' ? 'active' : ''}" data-tab="cards">📇 记忆卡片</button>
                    <button class="study-tab ${this.activeTab === 'quiz' ? 'active' : ''}" data-tab="quiz">✍️ 自测练习</button>
                    <button class="study-tab ${this.activeTab === 'wrong' ? 'active' : ''}" data-tab="wrong">📕 错题本</button>
                    <button class="study-tab ${this.activeTab === 'stats' ? 'active' : ''}" data-tab="stats">📊 学习数据</button>
                    <button class="study-tab ${this.activeTab === 'path' ? 'active' : ''}" data-tab="path">🗺 学习路径</button>
                </div>

                <div id="studyContent"></div>
            </div>
        `;

        this.bindTabs(container);
        this.renderTab(container);
    }

    bindTabs(container) {
        container.querySelectorAll('.study-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                this.activeTab = tab.dataset.tab;
                container.querySelectorAll('.study-tab').forEach(t => t.classList.toggle('active', t === tab));
                this.renderTab(container);
            });
        });
    }

    renderTab(container) {
        const content = container.querySelector('#studyContent');
        switch (this.activeTab) {
            case 'cards': this.renderCards(content, container); break;
            case 'quiz': this.renderQuiz(content, container); break;
            case 'wrong': this.renderWrong(content, container); break;
            case 'stats': this.renderStats(content, container); break;
            case 'path': this.renderPath(content, container); break;
        }
    }

    // ================= 记忆卡片 =================
    getCardData(deck) {
        if (deck === 'formula') {
            return (window.formulasDatabase || []).map(f => ({
                id: f.id, front: f.name, back: this._formulaBack(f), type: 'formula'
            }));
        }
        if (deck === 'herb') {
            return (window.herbsDatabase || []).map(h => ({
                id: h.id, front: h.name, back: this._herbBack(h), type: 'herb'
            }));
        }
        return (window.syndromesDatabase || []).map(s => ({
            id: s.id, front: s.name, back: this._syndromeBack(s), type: 'syndrome'
        }));
    }

    _formulaBack(f) {
        const comp = (f.composition || []).map(c => `${c.herbName}${c.dosage ? '(' + c.dosage + ')' : ''}`).join('、');
        return `<b>组成：</b>${comp}<br><b>功用：</b>${(f.functions || []).join('、')}<br><b>主治：</b>${(f.indications || []).slice(0, 3).join('、')}<br><b>出处：</b>${f.source || ''}`;
    }

    _herbBack(h) {
        return `<b>性味归经：</b>${h.nature || ''}${(h.tastes || []).join('')}，归${(h.meridians || []).join('、')}<br><b>功效：</b>${(h.functions || []).join('、')}<br><b>主治：</b>${(h.indications || []).slice(0, 3).join('、')}<br><b>用法：</b>${h.usage || ''}`;
    }

    _syndromeBack(s) {
        const tongue = s.tongueAppearance;
        const tongueText = tongue ? (typeof tongue === 'string' ? tongue : [tongue.tongueBody, tongue.tongueCoating].filter(Boolean).join('，')) : '—';
        const formulas = (s.recommendedFormulas || []).slice(0, 2).map(f => f.name).join('、');
        return `<b>症状：</b>${(s.symptoms || []).slice(0, 4).join('、')}<br><b>舌象：</b>${tongueText}<br><b>脉象：</b>${s.pulseCondition || '—'}<br><b>治法：</b>${s.treatmentMethod || s.treatmentPrinciple || ''}${formulas ? `<br><b>代表方：</b>${formulas}` : ''}`;
    }

    renderCards(content, container) {
        const decks = [
            { key: 'formula', label: '方剂卡', count: (window.formulasDatabase || []).length },
            { key: 'herb', label: '中药卡', count: (window.herbsDatabase || []).length },
            { key: 'syndrome', label: '证型卡', count: (window.syndromesDatabase || []).length }
        ];
        content.innerHTML = `
            <div class="study-cards-wrap">
                <div class="study-deck-tabs">
                    ${decks.map(d => `
                        <button class="study-deck-tab ${this.cardDeck === d.key ? 'active' : ''}" data-deck="${d.key}">
                            ${d.label} <span class="deck-count">${d.count}</span>
                        </button>
                    `).join('')}
                </div>

                <div class="card-study-area" id="cardStudyArea">
                    ${this._renderCardFace(container)}
                </div>

                <div class="study-progress">
                    <span id="cardProgressText">第 ${this.cardIndex + 1} / ${this._deckSize()} 张</span>
                    <div class="study-progress-bar"><div id="cardProgressBar" style="width:${this._deckSize() ? ((this.cardIndex + 1) / this._deckSize() * 100) : 0}%"></div></div>
                </div>
            </div>
        `;

        // 卡组切换
        content.querySelectorAll('.study-deck-tab').forEach(btn => {
            btn.addEventListener('click', () => {
                this.cardDeck = btn.dataset.deck;
                this.cardIndex = 0;
                this.cardFlipped = false;
                this.renderCards(content, container);
            });
        });

        this.bindCardEvents(content, container);
    }

    _deckSize() {
        return this.getCardData(this.cardDeck).length;
    }

    _renderCardFace(container) {
        let cards = this.getCardData(this.cardDeck);
        if (cards.length === 0) return '<p class="study-empty">暂无卡片数据</p>';
        // SM-2 到期优先排序（未学过的放最前）
        if (typeof SM2 !== 'undefined') {
            cards = cards.slice().sort((a, b) => {
                const pa = this.getProgress(a.type, a.id);
                const pb = this.getProgress(b.type, b.id);
                const ta = pa && pa.nextReview ? pa.nextReview : 0;
                const tb = pb && pb.nextReview ? pb.nextReview : 0;
                return ta - tb;
            });
        }
        if (this.cardIndex >= cards.length) this.cardIndex = 0;
        const card = cards[this.cardIndex];
        const progress = this.getProgress(card.type, card.id);
        const levelMap = { learn: '再学', familiar: '熟悉', mastered: '掌握' };
        const daysLeft = (progress && progress.nextReview && typeof SM2 !== 'undefined') ? SM2.daysUntil(progress.nextReview) : null;
        const reviewText = progress
            ? (daysLeft !== null ? (daysLeft <= 0 ? '<span class="tag tag-warn">已到期复习</span>' : `下次复习：${daysLeft} 天后`) : '')
            : '<span style="color:var(--color-ink-pale);">新卡片</span>';
        return `
            <div class="study-card ${this.cardFlipped ? 'flipped' : ''}" data-card-id="${card.id}">
                <div class="study-card-inner">
                    <div class="study-card-face front">
                        <div class="study-card-type">${card.type === 'formula' ? '方剂' : card.type === 'herb' ? '中药' : '证型'}</div>
                        <div class="study-card-front-text">${card.front}</div>
                        <div class="study-card-hint">点击卡片查看背面</div>
                    </div>
                    <div class="study-card-face back">
                        <div class="study-card-type">${card.type === 'formula' ? '方剂' : card.type === 'herb' ? '中药' : '证型'}</div>
                        <div class="study-card-back-text">${card.back}</div>
                        <div class="study-card-back-link" data-detail-link="${card.type}:${card.id}">查看完整详情 →</div>
                    </div>
                </div>
            </div>
            <div class="study-card-level">${progress && progress.level ? `当前掌握度：${levelMap[progress.level] || ''} · ` : ''}${reviewText}</div>
            <div class="study-card-actions" style="${this.cardFlipped ? '' : 'visibility:hidden;'}">
                <button class="btn btn-ghost study-rate-btn" data-rate="learn">🔁 再学</button>
                <button class="btn btn-ghost study-rate-btn" data-rate="familiar">👍 熟悉</button>
                <button class="btn btn-primary study-rate-btn" data-rate="mastered">✅ 掌握</button>
            </div>
            <div class="study-nav-btns">
                <button class="btn btn-ghost" id="cardPrevBtn">上一张</button>
                <button class="btn btn-ghost" id="cardNextBtn">下一张</button>
            </div>
        `;
    }

    bindCardEvents(content, container) {
        const cardEl = content.querySelector('.study-card');
        if (cardEl) {
            cardEl.addEventListener('click', () => {
                this.cardFlipped = !this.cardFlipped;
                this.renderCards(content, container);
            });
            // 详情链接（阻止翻转）
            const link = content.querySelector('.study-card-back-link');
            if (link) {
                link.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const [type, id] = link.dataset.detailLink.split(':');
                    window.DetailModal && DetailModal.open(type, id);
                });
            }
        }

        const prevBtn = content.querySelector('#cardPrevBtn');
        if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); this.cardIndex = (this.cardIndex - 1 + this._deckSize()) % this._deckSize(); this.cardFlipped = false; this.renderCards(content, container); });
        const nextBtn = content.querySelector('#cardNextBtn');
        if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); this.cardIndex = (this.cardIndex + 1) % this._deckSize(); this.cardFlipped = false; this.renderCards(content, container); });

        content.querySelectorAll('.study-rate-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const cards = this.getCardData(this.cardDeck);
                const card = cards[this.cardIndex];
                if (!card) return;
                const rate = btn.dataset.rate;
                const quality = (typeof SM2 !== 'undefined' && SM2.qualityMap[rate]) || 3;
                this.setProgress(card.type, card.id, rate, quality);
                // 下一张
                this.cardIndex = (this.cardIndex + 1) % this._deckSize();
                this.cardFlipped = false;
                this.renderCards(content, container);
            });
        });
    }

    // 进度存取（SM-2 间隔重复）
    getProgress(type, id) {
        const all = Storage.get('tcm_cards_progress', {});
        const p = all[type + ':' + id];
        if (!p) return null;
        // 兼容旧数据 {level, time}：迁移到 SM-2 状态
        if (p.level && p.ef === undefined && typeof SM2 !== 'undefined') {
            const s = SM2.init();
            s.level = p.level;
            return s;
        }
        return p;
    }

    setProgress(type, id, level, quality) {
        const all = Storage.get('tcm_cards_progress', {});
        const old = all[type + ':' + id];
        let state;
        if (typeof SM2 !== 'undefined') {
            const base = (old && old.ef !== undefined) ? old : SM2.init();
            state = SM2.update(base, quality);
            state.level = level; // 保留 level 字段供 UI 展示
        } else {
            state = { level, time: Date.now() };
        }
        all[type + ':' + id] = state;
        Storage.set('tcm_cards_progress', all);
    }

    // ================= 自测练习 =================
    renderQuiz(content, container) {
        const subjects = [
            { key: '中药学', label: '中药学' },
            { key: '方剂学', label: '方剂学' },
            { key: '中医诊断学', label: '中医诊断学' },
            { key: '中医基础理论', label: '中医基础理论' },
            { key: '证候鉴别', label: '证候鉴别' },
            { key: '病例模拟', label: '病例模拟（A2）' }
        ];
        content.innerHTML = `
            <div class="study-quiz-wrap">
                <div class="study-quiz-setup">
                    <p class="study-quiz-desc">题目由系统从知识库自动生成，每次练习内容不同。选择科目开始自测：</p>
                    <div class="study-quiz-subjects">
                        ${subjects.map(s => `<button class="btn btn-primary quiz-start-btn" data-subject="${s.key}">${s.label}</button>`).join('')}
                    </div>
                    <p style="font-size:var(--text-sm);color:var(--color-ink-pale);margin-top:var(--space-sm);">每次 10 题，交卷后即时解析，错题自动进入错题本。</p>
                </div>
                <div id="quizArea"></div>
            </div>
        `;

        content.querySelectorAll('.quiz-start-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.startQuiz(content, btn.dataset.subject);
            });
        });
    }

    startQuiz(content, subject) {
        this.quizQuestions = QuestionGenerator.generateQuiz(subject, 10);
        this.quizIndex = 0;
        this.quizAnswers = new Array(this.quizQuestions.length).fill(null);
        this.quizStartTime = Date.now();
        if (this.quizTimer) clearInterval(this.quizTimer);
        this.quizTimer = setInterval(() => {
            const el = content.querySelector('#quizTimer');
            if (el) el.textContent = '已用时 ' + Math.floor((Date.now() - this.quizStartTime) / 1000) + ' 秒';
        }, 1000);

        content.querySelector('.study-quiz-setup').style.display = 'none';
        this.renderQuizQuestion(content);
    }

    renderQuizQuestion(content) {
        const area = content.querySelector('#quizArea');
        const q = this.quizQuestions[this.quizIndex];
        if (!q) { this.finishQuiz(content); return; }

        const selected = this.quizAnswers[this.quizIndex];
        area.innerHTML = `
            <div class="study-quiz-progress">第 ${this.quizIndex + 1} / ${this.quizQuestions.length} 题 <span id="quizTimer"></span></div>
            <div class="study-quiz-card">
                <div class="study-quiz-subject">${q.subject} · ${q.type}</div>
                <p class="study-quiz-question">${q.question}</p>
                <div class="study-quiz-options">
                    ${q.options.map((opt, i) => `
                        <button class="quiz-option ${selected === opt ? 'selected' : ''}" data-opt="${i}">
                            ${String.fromCharCode(65 + i)}. ${opt}
                        </button>
                    `).join('')}
                </div>
                <div class="study-quiz-nav">
                    <button class="btn btn-ghost" id="quizBackBtn" title="退出本次练习，返回科目选择">← 返回</button>
                    <button class="btn btn-ghost" id="quizPrevBtn" ${this.quizIndex === 0 ? 'disabled' : ''}>上一题</button>
                    <button class="btn btn-primary" id="quizNextBtn">${this.quizIndex === this.quizQuestions.length - 1 ? '交卷' : '下一题'}</button>
                </div>
            </div>
        `;

        area.querySelectorAll('.quiz-option').forEach(opt => {
            opt.addEventListener('click', () => {
                this.quizAnswers[this.quizIndex] = q.options[parseInt(opt.dataset.opt, 10)];
                area.querySelectorAll('.quiz-option').forEach(o => o.classList.toggle('selected', o === opt));
            });
        });

        // 返回按钮：退出本次练习，返回科目选择
        const backBtn = area.querySelector('#quizBackBtn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                if (confirm('确定退出本次练习吗？本次作答进度将不会保存。')) {
                    if (this.quizTimer) { clearInterval(this.quizTimer); this.quizTimer = null; }
                    this.quizQuestions = [];
                    this.quizAnswers = [];
                    this.quizIndex = 0;
                    this.renderQuiz(content, container);
                }
            });
        }
        const prevBtn = area.querySelector('#quizPrevBtn');
        if (prevBtn) prevBtn.addEventListener('click', () => { this.quizIndex--; this.renderQuizQuestion(content); });
        const nextBtn = area.querySelector('#quizNextBtn');
        nextBtn.addEventListener('click', () => {
            if (this.quizAnswers[this.quizIndex] === null) {
                Toast.show('请先选择一个答案', 'warning');
                return;
            }
            this.quizIndex++;
            if (this.quizIndex < this.quizQuestions.length) this.renderQuizQuestion(content);
            else this.finishQuiz(content);
        });
    }

    finishQuiz(content) {
        if (this.quizTimer) { clearInterval(this.quizTimer); this.quizTimer = null; }
        const area = content.querySelector('#quizArea');
        const correct = this.quizQuestions.filter((q, i) => this.quizAnswers[i] === q.answer).length;
        const total = this.quizQuestions.length;
        const seconds = Math.floor((Date.now() - this.quizStartTime) / 1000);

        // 记录
        const record = {
            time: Date.now(),
            subject: this.quizQuestions[0] ? this.quizQuestions[0].subject : '',
            total, correct,
            seconds
        };
        const records = Storage.get('tcm_quiz_records', []);
        records.unshift(record);
        Storage.set('tcm_quiz_records', records.slice(0, 100));

        // 错题入错题本
        const wrongs = Storage.get('tcm_wrong_questions', []);
        this.quizQuestions.forEach((q, i) => {
            if (this.quizAnswers[i] !== q.answer) {
                const dup = wrongs.findIndex(w => w.question === q.question);
                const wrongItem = { ...q, wrongAnswer: this.quizAnswers[i], time: Date.now() };
                if (dup !== -1) { wrongs.splice(dup, 1); wrongs.unshift(wrongItem); }
                else wrongs.unshift(wrongItem);
            }
        });
        Storage.set('tcm_wrong_questions', wrongs.slice(0, 200));

        area.innerHTML = `
            <div class="study-quiz-result">
                <div class="quiz-result-score ${correct / total >= 0.8 ? 'good' : correct / total >= 0.6 ? 'mid' : 'low'}">${correct} / ${total}</div>
                <p class="quiz-result-text">正确率 ${(correct / total * 100).toFixed(0)}% · 用时 ${seconds} 秒</p>
                <p class="quiz-result-sub">${correct / total >= 0.8 ? '成绩优秀，掌握扎实！' : correct / total >= 0.6 ? '发挥不错，继续巩固薄弱点。' : '本次得分偏低，建议先浏览错题解析再练一次。'}</p>
                <div class="quiz-result-actions">
                    <button class="btn btn-primary" id="quizRetryBtn">再练一次</button>
                    <button class="btn btn-ghost" id="quizReviewBtn">查看解析</button>
                    <button class="btn btn-ghost" id="quizBackBtn">返回科目选择</button>
                </div>
            </div>
            <div id="quizReviewArea" style="display:none;margin-top:var(--space-lg);">
                ${this.quizQuestions.map((q, i) => {
                    const isRight = this.quizAnswers[i] === q.answer;
                    return `
                        <div class="quiz-review-item ${isRight ? 'right' : 'wrong'}">
                            <div class="quiz-review-q">${i + 1}. ${q.question} <span class="quiz-review-mark">${isRight ? '✓' : '✗'}</span></div>
                            ${!isRight ? `<div class="quiz-review-wrong">你的答案：${this.quizAnswers[i] || '未作答'}</div>` : ''}
                            <div class="quiz-review-answer">正确答案：${q.answer}</div>
                            <div class="quiz-review-exp">${q.explanation}</div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;

        const retryBtn = area.querySelector('#quizRetryBtn');
        if (retryBtn) retryBtn.addEventListener('click', () => { this.startQuiz(content, this.quizQuestions[0].subject); });
        const reviewBtn = area.querySelector('#quizReviewBtn');
        if (reviewBtn) reviewBtn.addEventListener('click', () => {
            const ra = area.querySelector('#quizReviewArea');
            ra.style.display = ra.style.display === 'none' ? 'block' : 'none';
        });
        const backBtn = area.querySelector('#quizBackBtn');
        if (backBtn) backBtn.addEventListener('click', () => { this.renderQuiz(content, container); });
    }

    // ================= 错题本 =================
    renderWrong(content, container) {
        const wrongs = Storage.get('tcm_wrong_questions', []);
        const subjects = ['全部', ...new Set(wrongs.map(w => w.subject))];

        content.innerHTML = `
            <div class="study-wrong-wrap">
                <div class="study-wrong-head">
                    <span>共 <b>${wrongs.length}</b> 道错题</span>
                    <div class="study-wrong-filters">
                        ${subjects.map(s => `<button class="study-filter-btn ${(this.wrongFilter === '全部' && s === '全部') || this.wrongFilter === s ? 'active' : ''}" data-filter="${s}">${s}</button>`).join('')}
                    </div>
                </div>
                ${wrongs.length === 0
                    ? '<p class="study-empty">暂无错题。完成自测后，错题会自动记录在这里。</p>'
                    : `<div class="study-wrong-list">${wrongs.filter(w => this.wrongFilter === '全部' || w.subject === this.wrongFilter).map((w, i) => `
                        <div class="quiz-review-item wrong" data-wrong-idx="${i}">
                            <div class="quiz-review-q">${w.subject} · ${w.question}</div>
                            <div class="quiz-review-wrong">你的答案：${w.wrongAnswer || '未作答'}　正确答案：${w.answer}</div>
                            <div class="quiz-review-exp">${w.explanation}</div>
                            <div class="study-wrong-actions">
                                <button class="btn btn-ghost wrong-master-btn" data-idx="${i}">✅ 已掌握</button>
                                ${w.detailId ? `<button class="btn btn-ghost wrong-detail-btn" data-type="${w.detailType}" data-id="${w.detailId}">查看详情</button>` : ''}
                            </div>
                        </div>
                    `).join('')}</div>`
                }
            </div>
        `;

        content.querySelectorAll('.study-filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.wrongFilter = btn.dataset.filter;
                this.renderWrong(content, container);
            });
        });

        content.querySelectorAll('.wrong-master-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const wrongs = Storage.get('tcm_wrong_questions', []);
                wrongs.splice(parseInt(btn.dataset.idx, 10), 1);
                Storage.set('tcm_wrong_questions', wrongs);
                Toast.show('已标记掌握，从错题本移除', 'success');
                this.renderWrong(content, container);
            });
        });

        content.querySelectorAll('.wrong-detail-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                window.DetailModal && DetailModal.open(btn.dataset.type, btn.dataset.id);
            });
        });
    }

    // ================= 学习仪表盘 =================
    renderStats(content, container) {
        const records = Storage.get('tcm_quiz_records', []);
        const progress = Storage.get('tcm_cards_progress', {});
        const wrongs = Storage.get('tcm_wrong_questions', []);

        const totalQuestions = records.reduce((s, r) => s + r.total, 0);
        const totalCorrect = records.reduce((s, r) => s + r.correct, 0);
        const accuracy = totalQuestions ? (totalCorrect / totalQuestions * 100).toFixed(1) : '0';
        const cardCount = Object.keys(progress).length;
        const masteredCount = Object.values(progress).filter(p => p.level === 'mastered').length;

        // 各科正确率
        const subjectStats = {};
        records.forEach(r => {
            if (!subjectStats[r.subject]) subjectStats[r.subject] = { total: 0, correct: 0 };
            subjectStats[r.subject].total += r.total;
            subjectStats[r.subject].correct += r.correct;
        });

        // 薄弱知识点 TOP5（按错题次数）
        const wrongCountMap = {};
        wrongs.forEach(w => { wrongCountMap[w.question] = (wrongCountMap[w.question] || 0) + 1; });
        const weakTop = Object.entries(wrongCountMap).sort((a, b) => b[1] - a[1]).slice(0, 5);

        content.innerHTML = `
            <div class="study-stats-grid">
                <div class="stat-card"><div class="stat-num">${records.length}</div><div class="stat-label">完成练习次数</div></div>
                <div class="stat-card"><div class="stat-num">${totalQuestions}</div><div class="stat-label">累计答题数</div></div>
                <div class="stat-card"><div class="stat-num">${accuracy}%</div><div class="stat-label">总正确率</div></div>
                <div class="stat-card"><div class="stat-num">${cardCount}</div><div class="stat-label">已学习卡片</div></div>
                <div class="stat-card"><div class="stat-num">${masteredCount}</div><div class="stat-label">已掌握卡片</div></div>
                <div class="stat-card ${wrongs.length ? 'stat-warn' : ''}"><div class="stat-num">${wrongs.length}</div><div class="stat-label">错题本数量</div></div>
            </div>

            <div class="study-stats-block">
                <h4>各科正确率</h4>
                ${Object.keys(subjectStats).length === 0 ? '<p class="study-empty">暂无练习数据，去完成一次自测吧。</p>' : Object.entries(subjectStats).map(([sub, s]) => {
                    const pct = s.total ? (s.correct / s.total * 100) : 0;
                    return `<div class="stat-row"><span class="stat-row-label">${sub}</span><div class="stat-row-bar"><div class="stat-row-fill" style="width:${pct}%"></div></div><span class="stat-row-val">${pct.toFixed(0)}%（${s.correct}/${s.total}）</span></div>`;
                }).join('')}
            </div>

            <div class="study-stats-block">
                <h4>薄弱知识点 TOP${weakTop.length}</h4>
                ${weakTop.length === 0 ? '<p class="study-empty">暂无薄弱点记录，表现很好！</p>' : weakTop.map(([q, n]) => `<div class="weak-item"><span>${q}</span><span class="weak-count">错 ${n} 次</span></div>`).join('')}
            </div>

            <div class="study-stats-actions">
                <button class="btn btn-ghost" id="exportWrongBtn">📤 导出错题</button>
                <button class="btn btn-ghost" id="resetStatsBtn">🗑 清空学习数据</button>
            </div>
        `;

        const exportBtn = content.querySelector('#exportWrongBtn');
        if (exportBtn) exportBtn.addEventListener('click', () => this.exportWrong());
        const resetBtn = content.querySelector('#resetStatsBtn');
        if (resetBtn) resetBtn.addEventListener('click', () => {
            if (confirm('确定清空全部学习数据（练习记录/错题本/卡片进度）吗？此操作不可恢复。')) {
                Storage.remove('tcm_quiz_records');
                Storage.remove('tcm_wrong_questions');
                Storage.remove('tcm_cards_progress');
                Toast.show('学习数据已清空', 'success');
                this.renderStats(content, container);
            }
        });
    }

    exportWrong() {
        const wrongs = Storage.get('tcm_wrong_questions', []);
        if (wrongs.length === 0) { Toast.show('没有可导出的错题', 'warning'); return; }
        const lines = wrongs.map((w, i) => `【${i + 1}】${w.subject}｜${w.question}\n    正确答案：${w.answer}\n    解析：${w.explanation}`).join('\n\n');
        const blob = new Blob(['# 岐黄学习中心 · 错题本导出\n\n' + lines], { type: 'text/markdown;charset=utf-8' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = '岐黄错题本_' + new Date().toISOString().slice(0, 10) + '.md';
        a.click();
        URL.revokeObjectURL(a.href);
        Toast.show('已导出错题本（Markdown）', 'success');
    }

    // ================= 学习路径 =================
    renderPath(content, container) {
        const records = Storage.get('tcm_quiz_records', []);
        // 各科正确率（最近记录）
        const subjectStats = {};
        records.forEach(r => {
            if (!subjectStats[r.subject]) subjectStats[r.subject] = { total: 0, correct: 0 };
            subjectStats[r.subject].total += r.total;
            subjectStats[r.subject].correct += r.correct;
        });
        const rate = (sub) => {
            const s = subjectStats[sub];
            return s && s.total ? s.correct / s.total : 0;
        };

        const PATH = [
            { stage: '基础理论', entry: '中医基础理论自测', deps: [], subject: '中医基础理论', desc: '阴阳五行、藏象、气血津液、经络、病因病机' },
            { stage: '诊断学', entry: '证候鉴别 / 病例模拟', deps: ['基础理论'], subject: '中医诊断学', desc: '四诊合参、八纲辨证、脏腑辨证、证候鉴别' },
            { stage: '方剂学', entry: '方剂卡 / 方剂自测', deps: ['诊断学'], subject: '方剂学', desc: '组方原理、君臣佐使、功效主治、方歌背诵' },
            { stage: '中药学', entry: '中药卡 / 中药自测', deps: ['方剂学'], subject: '中药学', desc: '性味归经、功效主治、配伍禁忌、有毒限量' }
        ];

        // 判定解锁：前一阶段正确率 ≥ 60%
        let unlocked = true;
        const stageHtml = PATH.map((p, i) => {
            const rateNow = rate(p.subject);
            const isUnlocked = unlocked;
            if (i > 0 && rate(PATH[i - 1].subject) < 0.6) unlocked = false;
            if (i === 0 && rateNow === 0) isUnlocked && true;
            const status = !isUnlocked ? '🔒' : (rateNow >= 0.6 ? '✅' : '⏳');
            return `
                <div class="card" style="padding:var(--space-md);margin-bottom:var(--space-md);${!isUnlocked ? 'opacity:.55;' : ''}">
                    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
                        <div>
                            <h4 style="margin:0;font-family:var(--font-heading);color:var(--color-vermillion-dark);">${status} 阶段${i + 1} · ${p.stage}</h4>
                            <p style="font-size:var(--text-sm);color:var(--color-ink-light);margin:6px 0 0 0;">${p.desc}</p>
                        </div>
                        <span class="tag ${rateNow >= 0.6 ? 'tag-plain' : 'tag-plain'}" style="color:var(--color-bronze-dark);">正确率 ${(rateNow * 100).toFixed(0)}%</span>
                    </div>
                    <div style="margin-top:var(--space-sm);font-size:var(--text-sm);color:var(--color-blue-porcelain,#3B5E8B);">入口：${p.entry}</div>
                    ${!isUnlocked ? `<p style="font-size:var(--text-xs);color:var(--color-ink-pale);margin-top:6px;">完成上一阶段（正确率≥60%）后解锁</p>` : ''}
                </div>
            `;
        }).join('');

        const totalDone = records.reduce((s, r) => s + r.total, 0);
        const totalCorrect = records.reduce((s, r) => s + r.correct, 0);
        const overall = totalDone ? ((totalCorrect / totalDone) * 100).toFixed(0) : 0;

        content.innerHTML = `
            <div class="card" style="margin-bottom:var(--space-lg);padding:var(--space-md);background:rgba(59,94,139,.05);">
                <h4 style="font-family:var(--font-heading);color:var(--color-blue-porcelain);margin:0 0 var(--space-sm) 0;">🗺 中医学习进阶路径</h4>
                <p style="font-size:var(--text-sm);color:var(--color-ink-light);margin:0;line-height:1.9;">
                    建议按「基础理论 → 诊断学 → 方剂学 → 中药学」的顺序学习，前一阶段自测正确率达到 60% 后解锁下一阶段。
                    累计作答 ${totalDone} 题，总正确率 ${overall}%。
                </p>
            </div>
            ${stageHtml}
            <div class="disclaimer" style="margin-top:var(--space-lg);">
                <strong>提示：</strong>学习路径为通用建议，可结合自身基础灵活调整；病例模拟与证候鉴别属进阶训练，建议在基础理论之后尝试。
            </div>
        `;
    }
}

// 浏览器全局导出
if (typeof window !== 'undefined') {
    window.StudyModule = StudyModule;
}
