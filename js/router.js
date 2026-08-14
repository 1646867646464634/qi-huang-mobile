// ===== 岐黄·辅助诊疗系统 - Hash路由 =====
// 路由→页面标题/描述映射（用于动态 document.title 与 meta description）
const ROUTE_META = {
    'home': { title: '首页', desc: '岐黄·辅助诊疗系统 - 中医体质辨识、病症辨证、中药百科、方剂推荐、舌诊面诊辅助' },
    'constitution': { title: '体质辨识', desc: '九种中医体质问卷测评，了解您的体质类型与调理方向' },
    'symptom': { title: '病症辨证', desc: '按症状搜索，获取中医辨证分析与调理建议' },
    'comprehensive': { title: '四诊合参', desc: '症状·舌象·面象·体质综合辨证，获取统一诊断报告' },
    'herb': { title: '中药百科', desc: '常用中药材的性味归经、功效主治详解' },
    'formula': { title: '方剂推荐', desc: '经典方剂分类浏览，智能匹配辨证结果推荐' },
    'tongue': { title: '舌诊辅助', desc: '舌象特征选择与 AI 图片识别，辅助舌诊辨证' },
    'face': { title: '面诊辅助', desc: '面色特征选择与 AI 图片识别，辅助面诊辨证' },
    'study': { title: '学习中心', desc: '记忆卡片、自测练习、错题本与学习路径' },
    'favorites': { title: '收藏夹', desc: '已收藏的方剂、中药与证型' },
    'records': { title: '诊断记录', desc: '历次辨证结果留存、对比与导出' },
    'plans': { title: '常用方案', desc: '保存的体质调理与辨证方案' },
    'profile': { title: '我的画像', desc: '个人健康画像与背景信息管理' },
    'chat': { title: 'AI 在线问诊', desc: '与 GLM 智能问诊助手对话，获取中医健康科普与调理参考' }
};
const APP_NAME = '岐黄·辅助诊疗系统';

class Router {
    constructor(routes, defaultRoute) {
        this.routes = routes;
        this.defaultRoute = defaultRoute;
        this.currentRoute = null;
        this.currentKey = null;
        this.params = {};
        
        window.addEventListener('hashchange', () => this.handleRoute());
        this.handleRoute();
    }
    
    handleRoute() {
        let rawHash = window.location.hash.slice(1) || this.defaultRoute;
        // 兼容 #/xxx 和 #xxx 两种格式
        if (rawHash.startsWith('/')) rawHash = rawHash.slice(1);
        const [path, ...paramParts] = rawHash.split('?');
        
        // 解析查询参数
        this.params = {};
        if (paramParts.length > 0) {
            paramParts.join('?').split('&').forEach(pair => {
                if (!pair) return;
                const eq = pair.indexOf('=');
                if (eq === -1) {
                    this.params[decodeURIComponent(pair)] = '';
                } else {
                    const k = pair.slice(0, eq);
                    const v = pair.slice(eq + 1);
                    this.params[decodeURIComponent(k)] = decodeURIComponent(v || '');
                }
            });
        }
        
        const route = this.routes[path] || this.routes[this.defaultRoute];
        this.updatePageMeta(path);
        
        // 同路径但参数不同也重新触发渲染（如 #/symptom?search=xxx）
        const key = path + JSON.stringify(this.params);
        if (route && (route !== this.currentRoute || key !== this.currentKey)) {
            this.currentRoute = route;
            this.currentKey = key;
            if (typeof route === 'function') {
                route(this.params);
            }
        }
        
        this.updateActiveNav(path);
    }

    // 动态更新 document.title 与 meta description（SEO）
    updatePageMeta(path) {
        const meta = ROUTE_META[path];
        if (!meta) return;
        try {
            document.title = meta.title === '首页' ? APP_NAME : meta.title + ' - ' + APP_NAME;
            const descEl = document.querySelector('meta[name="description"]');
            if (descEl) descEl.setAttribute('content', meta.desc);
        } catch (e) { /* 忽略非浏览器环境 */ }
    }
    
    updateActiveNav(path) {
        DOM.$$('.nav-item').forEach(item => {
            const tab = item.getAttribute('data-tab');
            if (tab === path) {
                DOM.addClass(item, 'active');
            } else {
                DOM.removeClass(item, 'active');
            }
        });
    }
    
    // 支持带查询参数的导航：navigate('symptom', { search: '头痛' }) 或 navigate('#/symptom?search=头痛')
    navigate(path, params) {
        let hash = path;
        if (params && typeof params === 'object') {
            const qs = Object.entries(params)
                .filter(([, v]) => v !== undefined && v !== null && v !== '')
                .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
                .join('&');
            if (qs) {
                hash = hash.replace(/[?#].*$/, '');
                if (!hash.startsWith('#')) hash = '#' + (hash.startsWith('/') ? '' : '/') + hash;
                hash += '?' + qs;
            }
        }
        if (!hash.startsWith('#')) {
            hash = '#' + (hash.startsWith('/') ? '' : '/') + hash;
        }
        if (window.location.hash === hash) {
            // 相同 hash 不会触发 hashchange，手动重新处理
            this.handleRoute();
        } else {
            window.location.hash = hash;
        }
    }
    
    getParams() {
        return this.params;
    }
}
