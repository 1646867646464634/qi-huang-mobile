// ===== 岐黄·辅助诊疗系统 - 全局搜索 =====
// 跨 中药/方剂/证型 检索：名称/拼音/首字母/功效/主治/症状
const GlobalSearch = {
    _index: null,
    _input: null,
    _dropdown: null,

    // 简单拼音首字母提取（覆盖常见汉字 → 拼音首字母，用于 "mht"→麻黄汤 这类检索）
    _pinyinMap: {
        '麻': 'm', '黄': 'h', '桂': 'g', '枝': 'z', '小': 'x', '青': 'q', '龙': 'l', '汤': 't',
        '银': 'y', '翘': 'q', '散': 's', '桑': 's', '菊': 'j', '饮': 'y', '九': 'j', '味': 'w',
        '羌': 'q', '活': 'h', '大': 'd', '柴': 'c', '胡': 'h', '白': 'b', '虎': 'h', '知': 'z',
        '母': 'm', '四': 's', '君': 'j', '子': 'z', '参': 'c', '苓': 'l', '术': 'z', '甘': 'g',
        '草': 'c', '当': 'd', '归': 'g', '地': 'd', '黄': 'h', '芪': 'q', '附': 'f', '六': 'l',
        '味': 'w', '丸': 'w', '肾': 's', '气': 'q', '理': 'l', '中': 'z', '温': 'w', '胆': 'd',
        '真': 'z', '武': 'w', '独': 'd', '寄': 'j', '生': 's', '天': 't', '麻': 'm', '钩': 'g',
        '藤': 't', '半': 'b', '夏': 'x', '陈': 'c', '皮': 'p', '茯': 'f', '虚': 'x', '热': 'r',
        '寒': 'h', '风': 'f', '湿': 's', '燥': 'z', '痰': 't', '瘀': 'y', '血': 'x', '气': 'q',
        '阴': 'y', '阳': 'y', '虚': 'x', '痛': 't', '咳': 'k', '嗽': 's', '喘': 'c', '泻': 'x',
        '痢': 'l', '淋': 'l', '秘': 'm', '呕': 'o', '眩': 'x', '晕': 'y', '悸': 'j', '不': 'b',
        '眠': 'm', '胃': 'w', '脾': 'p', '肺': 'f', '肝': 'g', '心': 'x', '肾': 's', '肠': 'c',
        '头': 't', '面': 'm', '目': 'm', '口': 'k', '咽': 'y', '鼻': 'b', '耳': 'e', '腰': 'y',
        '膝': 'x', '关': 'g', '节': 'j', '经': 'j', '月': 'y', '带': 'd', '胎': 't', '虫': 'c',
        '积': 'j', '食': 's', '滞': 'z', '消': 'x', '化': 'h', '清': 'q', '解': 'j', '表': 'b',
        '里': 'l', '补': 'b', '益': 'y', '活': 'h', '祛': 'q', '止': 'z', '安': 'a', '神': 's',
        '开': 'k', '窍': 'q', '固': 'g', '涩': 's', '驱': 'q', '利': 'l', '渗': 's', '温': 'w',
        '凉': 'l', '攻': 'g', '下': 'x', '润': 'r', '逐': 'z', '水': 's', '涌': 'y', '吐': 't',
        '杀': 's', '痒': 'y', '攻': 'g', '毒': 'd', '莽': 'm', '前': 'q', '杏': 'x', '仁': 'r',
        '葛': 'g', '根': 'g', '升': 's', '细': 'x', '辛': 'x', '芦': 'l', '花': 'h', '粉': 'f',
        '赤': 'c', '芍': 's', '蒿': 'h', '骨': 'g', '翁': 'w', '秦': 'q', '皮': 'p', '木': 'm',
        '瓜': 'g', '佩': 'p', '兰': 'l', '薏': 'y', '苡': 'y', '仁': 'r', '瞿': 'q', '麦': 'm',
        '茱': 'z', '萸': 'y', '川': 'c', '楝': 'l', '子': 'z', '莱': 'l', '菔': 'f', '蓟': 'j',
        '牛': 'n', '膝': 'x', '鸡': 'j', '血': 'x', '藤': 't', '桔': 'j', '梗': 'g', '旋': 'x',
        '覆': 'f', '紫': 'z', '菀': 'w', '款': 'k', '冬': 'd', '贝': 'b', '柏': 'b', '僵': 'j',
        '蚕': 'c', '龙': 'l', '菖': 'c', '蒲': 'p', '山': 's', '药': 'y', '扁': 'b', '豆': 'd',
        '眼': 'y', '肉': 'r', '胶': 'j', '首': 's', '乌': 'w', '女': 'n', '贞': 'z', '旱': 'h',
        '莲': 'l', '合': 'h', '鳖': 'b', '甲': 'j', '菟': 't', '丝': 's', '山楂': 'sz', '神曲': 'sq',
        '麦芽': 'my', '陈皮': 'cp', '厚朴': 'hp', '苍术': 'cz', '白术': 'bz', '茯苓': 'fl',
        '半夏': 'bx', '当归': 'dg', '川芎': 'cx', '黄连': 'hl', '黄芩': 'hq', '黄柏': 'hb',
        '附子': 'fz', '肉桂': 'rg', '干姜': 'gj', '人参': 'rs', '熟地黄': 'sdh', '生地黄': 'sdh',
        '白芍': 'bs', '牡丹皮': 'mdp', '泽泻': 'zx', '山药': 'sy', '山茱萸': 'szy', '枸杞子': 'gqz',
        '菊花': 'jh', '薄荷': 'bh', '牛蒡子': 'nbz', '金银花': 'jyh', '连翘': 'lq', '板蓝根': 'blg',
        '蒲公英': 'pgy', '鱼腥草': 'yxc', '玄参': 'xs', '丹参': 'ds', '红花': 'hh', '桃仁': 'tr',
        '益母草': 'ymc', '延胡索': 'yhs', '郁金': 'yj', '瓜蒌': 'gl', '竹茹': 'zr', '苦杏仁': 'kxr',
        '百部': 'bb', '桑白皮': 'sbp', '酸枣仁': 'szr', '远志': 'yz', '天麻': 'tm', '钩藤': 'gt',
        '石决明': 'sjm', '牡蛎': 'ml', '代赭石': 'dzs', '全蝎': 'qx', '麝香': 'sx', '冰片': 'bp',
        '黄芪': 'hq', '甘草': 'gc', '熟地': 'sd', '生地': 'sd', '麦冬': 'md', '五味子': 'wwz',
        '乌梅': 'wm', '山萸肉': 'syr', '金樱子': 'jyz', '麻黄根': 'mhg', '陈皮': 'cp'
    },

    _initials(text) {
        let out = '';
        for (const ch of String(text)) {
            if (/[a-zA-Z0-9]/.test(ch)) { out += ch.toLowerCase(); continue; }
            if (this._pinyinMap[ch]) out += this._pinyinMap[ch];
        }
        return out;
    },

    // 构建倒排索引
    buildIndex() {
        const index = { herbs: [], formulas: [], syndromes: [] };
        (window.herbsDatabase || []).forEach(h => {
            index.herbs.push({
                id: h.id, name: h.name, sub: `${h.category} · ${h.functions ? h.functions.slice(0, 2).join('、') : ''}`,
                pinyin: (h.pinyin || '').toLowerCase(),
                initials: this._initials(h.name),
                keywords: [h.name, h.pinyin || '', ...(h.functions || []), ...(h.indications || []), ...(h.tastes || []), ...(h.meridians || [])].join(' ').toLowerCase()
            });
        });
        (window.formulasDatabase || []).forEach(f => {
            index.formulas.push({
                id: f.id, name: f.name, sub: `${f.category} · ${(f.functions || []).slice(0, 2).join('、')}`,
                pinyin: (f.pinyin || '').toLowerCase(),
                initials: this._initials(f.name),
                keywords: [f.name, f.pinyin || '', ...(f.functions || []), ...(f.indications || []), ...(f.composition || []).map(c => c.herbName)].join(' ').toLowerCase()
            });
        });
        (window.syndromesDatabase || []).forEach(s => {
            index.syndromes.push({
                id: s.id, name: s.name, sub: `${s.category || ''} · ${(s.symptoms || []).slice(0, 3).join('、')}`,
                pinyin: '',
                initials: this._initials(s.name),
                keywords: [s.name, ...(s.symptoms || [])].join(' ').toLowerCase()
            });
        });
        return index;
    },

    _match(item, q) {
        if (!q) return false;
        if (item.name && item.name.toLowerCase().includes(q)) return true;
        if (item.keywords && item.keywords.includes(q)) return true;
        if (item.initials && item.initials.includes(q)) return true;
        if (item.pinyin && item.pinyin.includes(q)) return true;
        return false;
    },

    search(query) {
        const q = String(query || '').trim().toLowerCase();
        if (!q) return { herbs: [], formulas: [], syndromes: [] };
        if (!this._index) this._index = this.buildIndex();
        return {
            herbs: this._index.herbs.filter(h => this._match(h, q)).slice(0, 6),
            formulas: this._index.formulas.filter(f => this._match(f, q)).slice(0, 6),
            syndromes: this._index.syndromes.filter(s => this._match(s, q)).slice(0, 6)
        };
    },

    init() {
        this._index = this.buildIndex();
        this._input = document.getElementById('globalSearchInput');
        this._dropdown = document.getElementById('globalSearchDropdown');
        if (!this._input || !this._dropdown) return;

        let timer = null;
        this._input.addEventListener('input', () => {
            clearTimeout(timer);
            timer = setTimeout(() => this._render(), 200);
        });
        this._input.addEventListener('focus', () => { this._render(); });
        document.addEventListener('click', (e) => {
            if (this._dropdown && !this._dropdown.contains(e.target) && e.target !== this._input) {
                this._dropdown.style.display = 'none';
            }
        });
    },

    _render() {
        const q = this._input.value.trim();
        if (!q) { this._dropdown.style.display = 'none'; return; }
        const result = this.search(q);
        const total = result.herbs.length + result.formulas.length + result.syndromes.length;

        if (total === 0) {
            this._dropdown.innerHTML = '<div class="global-search-empty">未找到与「' + this._escape(q) + '」相关的内容</div>';
        } else {
            let html = '';
            if (result.herbs.length) {
                html += '<div class="global-search-group-title">🌿 中药</div>';
                html += result.herbs.map(h => `<div class="global-search-item" data-type="herb" data-id="${h.id}"><span class="gs-type">中药</span><span class="gs-name">${this._escape(h.name)}</span><span class="gs-sub">${this._escape(h.sub)}</span></div>`).join('');
            }
            if (result.formulas.length) {
                html += '<div class="global-search-group-title">📜 方剂</div>';
                html += result.formulas.map(f => `<div class="global-search-item" data-type="formula" data-id="${f.id}"><span class="gs-type">方剂</span><span class="gs-name">${this._escape(f.name)}</span><span class="gs-sub">${this._escape(f.sub)}</span></div>`).join('');
            }
            if (result.syndromes.length) {
                html += '<div class="global-search-group-title">📖 证型</div>';
                html += result.syndromes.map(s => `<div class="global-search-item" data-type="syndrome" data-id="${s.id}"><span class="gs-type">证型</span><span class="gs-name">${this._escape(s.name)}</span><span class="gs-sub">${this._escape(s.sub)}</span></div>`).join('');
            }
            this._dropdown.innerHTML = html;
        }
        this._dropdown.style.display = 'block';

        this._dropdown.querySelectorAll('.global-search-item').forEach(item => {
            item.addEventListener('click', () => {
                if (typeof DetailModal !== 'undefined') {
                    DetailModal.open(item.dataset.type, item.dataset.id);
                }
                this._dropdown.style.display = 'none';
            });
        });
    },

    _escape(str) {
        return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }
};

if (typeof window !== 'undefined') {
    window.GlobalSearch = GlobalSearch;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GlobalSearch };
}
