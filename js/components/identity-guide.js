// ===== 岐黄·辅助诊疗系统 - 首屏身份引导 =====
// 首次访问弹出 3 步引导：你是谁 → 你的目标 → 推荐入口。存 tcm_identity。
const IdentityGuide = {
    KEY: 'tcm_identity',
    _overlay: null,

    isDone() {
        return !!Storage.get(this.KEY);
    },

    start() {
        if (this.isDone()) return;
        this._step = 1;
        this._selection = { role: '', goal: '' };
        this._show();
    },

    _show() {
        this._overlay = document.createElement('div');
        this._overlay.className = 'detail-modal-overlay';
        this._overlay.innerHTML = `
            <div class="detail-modal" role="dialog" aria-modal="true" aria-label="首次使用引导" style="max-width:560px;">
                <div class="detail-modal-header">
                    <h3 class="detail-modal-title">欢迎使用岐黄 · 辅助诊疗系统</h3>
                    <button class="detail-modal-close" aria-label="关闭">×</button>
                </div>
                <div class="detail-modal-body" id="igBody"></div>
                <div class="detail-modal-footer" style="justify-content:space-between;">
                    <button class="btn btn-ghost" id="igSkip">跳过引导</button>
                    <button class="btn btn-primary" id="igNext">下一步 →</button>
                </div>
            </div>
        `;
        document.body.appendChild(this._overlay);

        this._overlay.querySelector('.detail-modal-close').addEventListener('click', () => this._skip());
        this._overlay.querySelector('#igSkip').addEventListener('click', () => this._skip());
        this._overlay.querySelector('#igNext').addEventListener('click', () => this._next());

        this._renderStep();
    },

    _renderStep() {
        const body = this._overlay.querySelector('#igBody');
        const nextBtn = this._overlay.querySelector('#igNext');
        const me = this;

        const roles = [
            { key: 'student', label: '🎓 大学生', desc: '中医学子，备考或系统学习' },
            { key: 'daily', label: '🧘 日常用户', desc: '想了解体质、自我调理' },
            { key: 'intern', label: '🩺 实习医师', desc: '临床实践，提升辨证能力' }
        ];
        const goals = [
            { key: 'theory', label: '📚 学习理论', desc: '打牢中医基础' },
            { key: 'selfcare', label: '🍵 自我调理', desc: '了解体质与日常调养' },
            { key: 'clinical', label: '🩺 临床提升', desc: '强化辨证与方药能力' }
        ];

        if (this._step === 1) {
            body.innerHTML = `
                <p style="font-size:var(--text-sm);color:var(--color-ink-light);margin-bottom:var(--space-md);">您属于哪类使用人群？</p>
                <div style="display:flex;flex-direction:column;gap:10px;">
                    ${roles.map(r => `
                        <label class="ig-option" data-value="${r.key}" style="display:flex;align-items:center;gap:12px;padding:12px 16px;border:1px solid var(--color-line,#e2d9cc);border-radius:10px;cursor:pointer;">
                            <input type="radio" name="igRole" value="${r.key}" style="accent-color:var(--color-vermillion,#C04040);">
                            <div>
                                <div style="font-weight:600;">${r.label}</div>
                                <div style="font-size:var(--text-xs);color:var(--color-ink-pale);">${r.desc}</div>
                            </div>
                        </label>
                    `).join('')}
                </div>
            `;
        } else if (this._step === 2) {
            body.innerHTML = `
                <p style="font-size:var(--text-sm);color:var(--color-ink-light);margin-bottom:var(--space-md);">您的主要目标是什么？</p>
                <div style="display:flex;flex-direction:column;gap:10px;">
                    ${goals.map(g => `
                        <label class="ig-option" data-value="${g.key}" style="display:flex;align-items:center;gap:12px;padding:12px 16px;border:1px solid var(--color-line,#e2d9cc);border-radius:10px;cursor:pointer;">
                            <input type="radio" name="igGoal" value="${g.key}" style="accent-color:var(--color-vermillion,#C04040);">
                            <div>
                                <div style="font-weight:600;">${g.label}</div>
                                <div style="font-size:var(--text-xs);color:var(--color-ink-pale);">${g.desc}</div>
                            </div>
                        </label>
                    `).join('')}
                </div>
            `;
        } else {
            const role = roles.find(r => r.key === this._selection.role);
            const goal = goals.find(g => g.key === this._selection.goal);
            const rec = this._recommend(this._selection);
            body.innerHTML = `
                <p style="font-size:var(--text-sm);color:var(--color-ink-light);margin-bottom:var(--space-md);">
                    身份：<b>${role ? role.label : '未选择'}</b>　目标：<b>${goal ? goal.label : '未选择'}</b>
                </p>
                <div class="card" style="background:rgba(184,134,11,.06);padding:var(--space-md);">
                    <h4 style="font-family:var(--font-heading);color:var(--color-bronze-dark);margin:0 0 var(--space-xs) 0;">💡 为您推荐</h4>
                    <p style="font-size:var(--text-sm);line-height:2;">${rec}</p>
                </div>
                <p style="font-size:var(--text-xs);color:var(--color-ink-pale);margin-top:var(--space-sm);">点击「完成」进入首页；以上偏好仅存于本机，可随时在首页查看。</p>
            `;
            nextBtn.textContent = '完成 ✓';
        }

        // 单选交互
        body.querySelectorAll('.ig-option').forEach(opt => {
            const radio = opt.querySelector('input');
            radio.addEventListener('change', () => {
                body.querySelectorAll('.ig-option').forEach(o => o.style.borderColor = 'var(--color-line,#e2d9cc)');
                opt.style.borderColor = 'var(--color-vermillion,#C04040)';
            });
        });
    },

    _recommend(sel) {
        const role = sel.role, goal = sel.goal;
        if (role === 'intern' || goal === 'clinical') {
            return '建议从「四诊合参」入手进行综合辨证练习，配合「证候鉴别」「病例模拟」提升辨证能力；方剂详情中可查看配伍安全提示。';
        }
        if (role === 'student' || goal === 'theory') {
            return '建议进入「学习中心」，按「基础理论 → 诊断学 → 方剂 → 中药」路径学习，并用记忆卡片与自测巩固。';
        }
        return '建议先做「体质辨识」了解自身，再通过「病症辨证」查询不适症状对应的中医认识与调理方向。';
    },

    _next() {
        const body = this._overlay.querySelector('#igBody');
        if (this._step === 1) {
            const checked = body.querySelector('input[name="igRole"]:checked');
            if (!checked) { Toast.show('请先选择您的身份', 'warning'); return; }
            this._selection.role = checked.value;
            this._step = 2;
            this._renderStep();
        } else if (this._step === 2) {
            const checked = body.querySelector('input[name="igGoal"]:checked');
            if (!checked) { Toast.show('请先选择您的目标', 'warning'); return; }
            this._selection.goal = checked.value;
            this._step = 3;
            this._renderStep();
        } else {
            Storage.set(this.KEY, Object.assign({}, this._selection, { time: Date.now() }));
            EventBus.emit('identity:changed', this._selection);
            this._close();
            Toast.show('引导完成，欢迎使用！', 'success');
        }
    },

    _skip() {
        Storage.set(this.KEY, { skipped: true, time: Date.now() });
        this._close();
    },

    _close() {
        if (this._overlay) { this._overlay.remove(); this._overlay = null; }
    }
};

if (typeof window !== 'undefined') {
    window.IdentityGuide = IdentityGuide;
}
