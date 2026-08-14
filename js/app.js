// ===== 岐黄·辅助诊疗系统 - 应用入口 =====
(function() {
    'use strict';
    
    // 模块实例
    const modules = {
        constitution: null,
        symptom: null,
        herb: null,
        formula: null,
        tongue: null,
        face: null,
        study: null,
        favorites: null,
        comprehensive: null,
        records: null,
        profile: null,
        plans: null,
        chat: null
    };
    
    // 初始化
    function init() {
        Toast.init();
        
        // 初始化路由
        const router = new Router({
            'constitution': () => loadModule('constitution'),
            'symptom': () => loadModule('symptom'),
            'herb': () => loadModule('herb'),
            'formula': () => loadModule('formula'),
            'tongue': () => loadModule('tongue'),
            'face': () => loadModule('face'),
            'study': () => loadModule('study'),
            'favorites': () => loadModule('favorites'),
            'comprehensive': () => loadModule('comprehensive'),
            'records': () => loadModule('records'),
            'profile': () => loadModule('profile'),
            'plans': () => loadModule('plans'),
            'chat': () => loadModule('chat'),
            'home': () => showWelcome(),
        }, 'home');
        
        // 移动端菜单
        initMobileMenu();
        
        // mobileMenu()在欢迎页时绑定导航链接
        bindWelcomeLinks();
        
        // 暴露router到全局
        window.appRouter = router;

        // 全局导航函数（供各模块跳转：navigateTo('symptom', { search: '头痛' })）
        window.navigateTo = function (path, params) {
            if (window.appRouter) {
                window.appRouter.navigate(path, params);
            } else {
                let hash = path;
                if (params && typeof params === 'object') {
                    const qs = Object.entries(params)
                        .filter(([, v]) => v !== undefined && v !== null && v !== '')
                        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
                        .join('&');
                    if (qs) hash += (hash.includes('?') ? '&' : '?') + qs;
                }
                if (!hash.startsWith('#')) hash = '#' + (hash.startsWith('/') ? '' : '/') + hash;
                window.location.hash = hash;
            }
        };

        // 全局搜索初始化
        if (typeof GlobalSearch !== 'undefined') {
            GlobalSearch.init();
        }

        // 全局快捷键：/ 或 Ctrl+K 聚焦搜索
        document.addEventListener('keydown', (e) => {
            const tag = (e.target.tagName || '').toLowerCase();
            if (tag === 'input' || tag === 'textarea') return;
            if (e.key === '/' || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) {
                e.preventDefault();
                const input = document.getElementById('globalSearchInput');
                if (input) { input.focus(); input.select(); }
            }
        });

        // 首屏身份引导（仅首次访问）
        if (typeof IdentityGuide !== 'undefined' && !IdentityGuide.isDone()) {
            setTimeout(() => IdentityGuide.start(), 600);
        }

        // 填充数据版本号
        const dvText = document.getElementById('dataVersionText');
        if (dvText && typeof CONSTANTS !== 'undefined' && CONSTANTS.DATA_VERSION) {
            dvText.textContent = CONSTANTS.DATA_VERSION;
        }

        // UI 收起/展开：仅折叠上方导航区域，保留下方内容区；状态持久化到 localStorage
        const UI_COLLAPSED_KEY = 'tcm_ui_collapsed';
        const collapseBtn = document.getElementById('collapseUiBtn');
        if (collapseBtn) {
            const applyCollapsed = (collapsed) => {
                document.body.classList.toggle('ui-collapsed', collapsed);
                collapseBtn.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
                collapseBtn.title = collapsed ? '展开界面' : '收起界面';
                const textEl = collapseBtn.querySelector('.collapse-btn-text');
                if (textEl) textEl.textContent = collapsed ? '展开界面' : '收起界面';
            };
            // 恢复上次收起状态（刷新后保持）
            applyCollapsed(Storage.get(UI_COLLAPSED_KEY, false) === true);

            collapseBtn.addEventListener('click', () => {
                const collapsed = !document.body.classList.contains('ui-collapsed');
                applyCollapsed(collapsed);
                Storage.set(UI_COLLAPSED_KEY, collapsed);
            });
        }
    }
    
    function showWelcome() {
        // 恢复欢迎页内容
        const container = DOM.$('#mainContent');
        if (container) {
            container.innerHTML = getWelcomeHTML();
            bindWelcomeLinks();
        }
        
        // 高亮none
        DOM.$$('.nav-item').forEach(item => DOM.removeClass(item, 'active'));
    }
    
    function bindWelcomeLinks() {
        DOM.$$('.welcome-card').forEach(card => {
            card.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href && href.startsWith('#')) {
                    // router会自动处理hash变化
                }
            });
        });
    }
    
    function getContactHTML() {
        const info = (typeof CONSTANTS !== 'undefined' && CONSTANTS.CONTACT_INFO) || {};
        const real = (typeof CONSTANTS !== 'undefined') ? !!CONSTANTS.CONTACT_REAL : false;
        const isPlaceholder = (v) => !v || String(v).includes('<') || String(v).includes('XXX');
        const hasReal = real && !isPlaceholder(info.phone);

        if (!hasReal) {
            if (typeof console !== 'undefined') console.warn('[岐黄] 首页联系方式仍为占位信息，请填写 CONSTANTS.CONTACT_INFO 真实值');
            return `
                <div class="contact-section">
                    <span class="contact-note">注 意</span>
                    <h3 class="contact-title">联系我们</h3>
                    <p style="font-size: var(--text-sm); color: var(--color-ink-light);">联系方式更新中，敬请期待</p>
                    <div class="contact-divider"></div>
                    <p style="font-size: var(--text-xs); color: var(--color-ink-pale);">
                        如需专业中医诊疗服务，请前往正规医疗机构线下就诊
                    </p>
                </div>
            `;
        }

        return `
            <div class="contact-section">
                <span class="contact-note">注 意</span>
                <h3 class="contact-title">联系我们</h3>
                ${!isPlaceholder(info.phone) ? `<div class="contact-item"><span class="icon">📱</span><span>电话：${info.phone}</span></div>` : ''}
                ${!isPlaceholder(info.wechat) ? `<div class="contact-item"><span class="icon">💬</span><span>微信：${info.wechat}</span></div>` : ''}
                ${!isPlaceholder(info.email) ? `<div class="contact-item"><span class="icon">📧</span><span>邮箱：${info.email}</span></div>` : ''}
                <div class="contact-divider"></div>
                <p style="font-size: var(--text-xs); color: var(--color-ink-pale);">
                    如需专业中医诊疗服务，请通过以上方式联系我们预约线下问诊
                </p>
            </div>
        `;
    }

    // 欢迎卡片数据 + 按身份/画像动态排序
    function getWelcomeCards() {
        const cards = [
            { path: 'chat', icon: '💬', title: 'AI 在线问诊', desc: '与 GLM 智能问诊助手对话，获取中医健康科普与调理参考' },
            { path: 'constitution', icon: '📋', title: '体质辨识', desc: '九种体质问卷测评，了解您的中医体质类型' },
            { path: 'symptom', icon: '🔍', title: '病症辨证', desc: '按症状搜索，获取中医辨证分析与调理建议' },
            { path: 'comprehensive', icon: '🩺', title: '四诊合参', desc: '症状·舌象·面象·体质综合辨证，获取统一报告' },
            { path: 'herb', icon: '🌿', title: '中药百科', desc: `收录${typeof herbsDatabase !== 'undefined' ? herbsDatabase.length : 0}味常用中药材，性味归经功效详解` },
            { path: 'formula', icon: '📜', title: '方剂推荐', desc: `${typeof formulasDatabase !== 'undefined' ? formulasDatabase.length : 0}首经典方剂，智能匹配辨证结果个性化推荐` },
            { path: 'tongue', icon: '👅', title: '舌诊辅助', desc: '按望诊要素逐项选择舌象特征，本地规则引擎推演辨证参考' },
            { path: 'face', icon: '😊', title: '面诊辅助', desc: '按望诊要素逐项选择面色特征，本地规则引擎推演辨证参考' }
        ];

        // 依据身份画像计算推荐优先级
        const identity = Storage.get('tcm_identity');
        const profile = (typeof Profile !== 'undefined') ? Profile.get() : null;
        const role = identity && identity.role;
        const weights = {};
        const w = (path, n) => { weights[path] = (weights[path] || 0) + n; };

        if (role === 'intern') { w('comprehensive', 4); w('symptom', 3); w('formula', 2); w('herb', 1); }
        else if (role === 'student') { w('study', 5); w('formula', 2); w('herb', 2); w('constitution', 1); }
        else { w('constitution', 3); w('symptom', 3); w('comprehensive', 2); }

        // 有诊断记录的人优先复诊辨证
        const records = Records && Records.list ? Records.list() : [];
        if (records.length > 0) { w('symptom', 2); w('records', 2); }

        cards.sort((a, b) => (weights[b.path] || 0) - (weights[a.path] || 0));
        if (cards.length > 0) cards[0].top = true;
        return cards;
    }

    // "我该从哪开始" 引导文案
    function getStartGuidance() {
        const identity = Storage.get('tcm_identity');
        const role = identity && identity.role;
        const goal = identity && identity.goal;
        if (!identity || identity.skipped) return '';

        if (role === 'intern' || goal === 'clinical') {
            return '您是临床提升型用户，建议从<b>「四诊合参」</b>开始做综合辨证练习，并在<b>学习中心 → 病例模拟 / 证候鉴别</b>中强化辨证思路；查看方剂详情时可留意配伍安全提示。';
        }
        if (role === 'student' || goal === 'theory') {
            return '您是学习型用户，建议进入<b>「学习中心」</b>，按「基础理论 → 诊断学 → 方剂 → 中药」路径学习，用记忆卡片与自测巩固，完成辨证后及时保存诊断记录。';
        }
        return '您是日常调理型用户，建议先做<b>「体质辨识」</b>了解自身，再用<b>「病症辨证」或「四诊合参」</b>查询不适症状的中医认识与调理方向；结果可保存为常用方案随时回看。';
    }

    function getWelcomeHTML() {
        const cards = getWelcomeCards();
        const guidance = getStartGuidance();
        return `
            <div class="module-page">
                <div class="welcome-section">
                    <h1 class="welcome-title">岐黄之术  济世之道</h1>
                    <p class="welcome-subtitle">传承千年智慧 · 辅助现代诊疗</p>

                    ${guidance ? `
                        <div class="card" style="max-width:760px;margin:0 auto var(--space-2xl);padding:var(--space-md) var(--space-lg);background:rgba(184,134,11,0.06);border:1px solid rgba(184,134,11,0.2);text-align:left;">
                            <h3 style="font-family:var(--font-heading);color:var(--color-bronze-dark);margin:0 0 var(--space-xs) 0;">💡 我该从哪开始</h3>
                            <p style="font-size:var(--text-sm);color:var(--color-ink);line-height:2;margin:0;">${guidance}</p>
                        </div>
                    ` : ''}

                    <div class="welcome-grid">
                        ${cards.map(card => `
                            <a href="#/${card.path}" class="welcome-card ${card.top ? 'welcome-card-top' : ''}">
                                <div class="welcome-card-icon">${card.icon}</div>
                                <h3 class="welcome-card-title">${card.title}</h3>
                                <p class="welcome-card-desc">${card.desc}</p>
                                ${card.top ? '<p style="font-size:var(--text-xs);color:var(--color-vermillion);margin-top:8px;font-weight:700;">推荐优先 →</p>' : ''}
                            </a>
                        `).join('')}
                    </div>
                </div>
                
                ${getContactHTML()}
                
                <div class="disclaimer" style="margin-top: var(--space-lg);">
                    <strong>免责声明：</strong>本系统仅供中医知识学习和健康参考，不构成医疗诊断或治疗建议。如有身体不适，请及时前往正规医疗机构就诊，遵循专业医师的指导。
                </div>
            </div>
        `;
    }
    
    function loadModule(name) {
        const container = DOM.$('#mainContent');
        if (!container) return;
        
        // 销毁当前模块
        Object.values(modules).forEach(m => {
            if (m && m.destroy) m.destroy();
        });
        
        // 懒加载模块
        if (!modules[name]) {
            switch (name) {
                case 'constitution':
                    modules[name] = new ConstitutionModule();
                    break;
                case 'symptom':
                    modules[name] = new SymptomModule();
                    break;
                case 'herb':
                    modules[name] = new HerbModule();
                    break;
                case 'formula':
                    modules[name] = new FormulaModule();
                    break;
                case 'tongue':
                    modules[name] = new TongueModule();
                    break;
                case 'face':
                    modules[name] = new FaceModule();
                    break;
                case 'study':
                    modules[name] = new StudyModule();
                    break;
                case 'favorites':
                    modules[name] = new FavoritesModule();
                    break;
                case 'comprehensive':
                    modules[name] = new ComprehensiveModule();
                    break;
                case 'records':
                    modules[name] = new RecordsModule();
                    break;
                case 'profile':
                    modules[name] = new ProfileModule();
                    break;
                case 'plans':
                    modules[name] = new PlansModule();
                    break;
                case 'chat':
                    modules[name] = new ChatModule();
                    break;
            }
        }
        
        if (modules[name] && modules[name].render) {
            modules[name].render(container);
        }
    }
    
    function initMobileMenu() {
        const toggle = DOM.$('#mobileToggle');
        const nav = DOM.$('#siteNav');
        
        if (toggle && nav) {
            toggle.addEventListener('click', () => {
                DOM.toggleClass(toggle, 'open');
                DOM.toggleClass(nav, 'open');
            });
            
            // 点击导航项关闭菜单
            DOM.$$('.nav-item', nav).forEach(item => {
                item.addEventListener('click', () => {
                    DOM.removeClass(toggle, 'open');
                    DOM.removeClass(nav, 'open');
                });
            });
        }
    }
    
    // 启动
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
