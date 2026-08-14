// ===== 岐黄·辅助诊疗系统 - 自动出题器 =====
// 从现有数据库自动生成四科自测题目（零人工题库成本）
// 依赖全局数据：herbsDatabase / formulasDatabase / syndromesDatabase / symptomSyndromeMapping

// 中医基础理论题库（精选经典概念题，覆盖阴阳五行/藏象/气血津液/经络/病因病机/防治原则）
const THEORY_QUESTIONS = [
    // ---- 阴阳五行 ----
    { subject: '中医基础理论', type: '阴阳学说', question: '中医学认为"阴胜则阳病，阳胜则阴病"，体现了阴阳的哪种关系？', options: ['对立制约', '互根互用', '消长平衡', '相互转化'], answer: '对立制约', explanation: '阴阳对立制约：阴阳双方相互抑制、相互约束，阴胜则伤阳、阳胜则伤阴，故"阴胜则阳病，阳胜则阴病"。' },
    { subject: '中医基础理论', type: '阴阳学说', question: '"孤阴不生，独阳不长"说明阴阳之间存在何种关系？', options: ['对立制约', '互根互用', '消长平衡', '阴阳转化'], answer: '互根互用', explanation: '互根互用即阴阳互为根本、相互资生，任何一方都不能脱离另一方而单独存在，故"孤阴不生，独阳不长"。' },
    { subject: '中医基础理论', type: '阴阳学说', question: '"重阴必阳，重阳必阴"描述的是阴阳的哪种变化？', options: ['对立制约', '互根互用', '消长平衡', '相互转化'], answer: '相互转化', explanation: '阴阳转化指阴阳在一定条件下相互转化，"重阴必阳、重阳必阴"即寒极生热、热极生寒的转化关系。' },
    { subject: '中医基础理论', type: '阴阳学说', question: '下列各项中，属阳的是？', options: ['向下', '静止', '明亮', '寒冷'], answer: '明亮', explanation: '凡运动的、外向的、上升的、温热的、明亮的属阳；静止的、内守的、下降的、寒冷的、晦暗的属阴。' },
    { subject: '中医基础理论', type: '五行学说', question: '五行中具有"曲直"特性的是？', options: ['木', '火', '金', '水'], answer: '木', explanation: '木曰曲直，引申为生长、升发、条达、舒畅；火曰炎上，土爰稼穑，金曰从革，水曰润下。' },
    { subject: '中医基础理论', type: '五行学说', question: '五行中"木"所主的脏是？', options: ['心', '肝', '脾', '肾'], answer: '肝', explanation: '五行配属五脏：木-肝，火-心，土-脾，金-肺，水-肾。' },
    { subject: '中医基础理论', type: '五行学说', question: '五行相生关系中，"生我"者为？', options: ['母', '子', '所胜', '所不胜'], answer: '母', explanation: '相生关系中"生我"者为母，"我生"者为子；相克关系中"克我"者为所不胜，"我克"者为所胜。' },
    { subject: '中医基础理论', type: '五行学说', question: '"见肝之病，知肝传脾"体现了五行间的哪种关系？', options: ['相生', '相克', '相乘', '相侮'], answer: '相乘', explanation: '肝属木、脾属土，木克土。肝病传脾是木旺乘土（相乘），即相克太过而为病。' },
    { subject: '中医基础理论', type: '五行学说', question: '按五行相克规律制定的治则是"抑强扶弱"，其中"培土制水"适用于？', options: ['心肾不交', '脾肾两虚', '肝木乘脾', '水湿泛滥'], answer: '水湿泛滥', explanation: '培土制水即健脾利水，以土制水，适用于脾虚不能运化水湿所致的水肿、水湿泛滥之证。' },
    // ---- 藏象学说 ----
    { subject: '中医基础理论', type: '藏象学说', question: '"君主之官"指的是哪个脏？', options: ['肝', '心', '脾', '肾'], answer: '心', explanation: '《素问》称心为"君主之官"，主血脉、藏神，为五脏六腑之大主。' },
    { subject: '中医基础理论', type: '藏象学说', question: '肺的生理功能不包括？', options: ['主气司呼吸', '主宣发肃降', '主通调水道', '主统血'], answer: '主统血', explanation: '肺主气司呼吸、主宣发肃降、通调水道、朝百脉主治节；"主统血"是脾的功能。' },
    { subject: '中医基础理论', type: '藏象学说', question: '"先天之本"指的是？', options: ['心', '肝', '脾', '肾'], answer: '肾', explanation: '肾藏精，主生长发育与生殖，为"先天之本"；脾运化水谷精微，为"后天之本"。' },
    { subject: '中医基础理论', type: '藏象学说', question: '"后天之本"指的是？', options: ['心', '肝', '脾', '肺'], answer: '脾', explanation: '脾主运化，为气血生化之源，人出生后依赖脾运化的水谷精微维持生命活动，故称"后天之本"。' },
    { subject: '中医基础理论', type: '藏象学说', question: '肝的主要生理功能是？', options: ['主血脉', '主疏泄', '主运化', '主纳气'], answer: '主疏泄', explanation: '肝主疏泄：调畅气机、促进脾胃运化、调畅情志、调节生殖机能；"主血脉"为心，"主纳气"为肾。' },
    { subject: '中医基础理论', type: '藏象学说', question: '"罢极之本"指的是？', options: ['心', '肝', '脾', '肾'], answer: '肝', explanation: '肝在体合筋，筋司运动，肝血充足则筋得濡养而运动灵活，故肝为"罢极之本"。' },
    { subject: '中医基础理论', type: '藏象学说', question: '心在液为？', options: ['汗', '泪', '涎', '唾'], answer: '汗', explanation: '五脏在液：心-汗，肝-泪，脾-涎，肺-涕，肾-唾。' },
    { subject: '中医基础理论', type: '藏象学说', question: '胆的生理功能是？', options: ['受盛化物', '贮藏排泄胆汁', '传化水谷', '泌别清浊'], answer: '贮藏排泄胆汁', explanation: '胆贮藏、排泄胆汁以助消化；"受盛化物"为小肠、"传化水谷"为大肠、"泌别清浊"亦为小肠功能。' },
    { subject: '中医基础理论', type: '藏象学说', question: '女子以哪一脏为先天？', options: ['心', '脾', '肝', '肺'], answer: '肝', explanation: '肝主藏血、主疏泄，与月经、胎产密切相关，故有"女子以肝为先天"之说。' },
    // ---- 气血津液 ----
    { subject: '中医基础理论', type: '气血津液', question: '人体最基本、最重要的气是？', options: ['元气', '宗气', '营气', '卫气'], answer: '元气', explanation: '元气由肾精化生，是人生命活动的原动力，为人体最基本、最重要的气。' },
    { subject: '中医基础理论', type: '气血津液', question: '积于胸中、走息道以行呼吸的气是？', options: ['元气', '宗气', '营气', '卫气'], answer: '宗气', explanation: '宗气由肺吸入的清气和脾胃化生的水谷精气结合而成，积于胸中，走息道司呼吸、贯心脉行气血。' },
    { subject: '中医基础理论', type: '气血津液', question: '行于脉中、具有营养作用的气是？', options: ['元气', '宗气', '营气', '卫气'], answer: '营气', explanation: '营气行于脉中，化生血液、营养全身；卫气行于脉外，护卫肌表、温养脏腑。' },
    { subject: '中医基础理论', type: '气血津液', question: '具有"慓疾滑利"特性、护卫肌表的气是？', options: ['元气', '宗气', '营气', '卫气'], answer: '卫气', explanation: '卫气行于脉外，性慓疾滑利，功能为护卫肌表、温养脏腑、调节腠理开合。' },
    { subject: '中医基础理论', type: '气血津液', question: '气随血脱、气随血亡，说明气与血的关系是？', options: ['气为血之帅', '血为气之母', '气能行血', '气能摄血'], answer: '血为气之母', explanation: '"血为气之母"指血能载气、血能养气，大出血时气随血脱，故气随血亡。' },
    { subject: '中医基础理论', type: '气血津液', question: '"气能摄血"的生理意义主要体现在？', options: ['推动血行', '固摄血液于脉中', '化生血液', '调节血量'], answer: '固摄血液于脉中', explanation: '气能摄血指气的固摄作用使血循行于脉内而不逸出，气虚则统摄无权而见各种出血。' },
    { subject: '中医基础理论', type: '气血津液', question: '津液与血同源于水谷精微，故有"津血同源"之说，其理论依据是？', options: ['津能载气', '血能载气', '津血互化', '气能生血'], answer: '津血互化', explanation: '津液与血液相互渗透、相互转化，故"津血同源"；伤津耗血、血亏津伤，故又有"夺血者无汗"之戒。' },
    { subject: '中医基础理论', type: '气血津液', question: '血的生成主要依赖于哪两脏？', options: ['心与肺', '脾与肾', '脾与胃', '肝与肾'], answer: '脾与胃', explanation: '脾胃为气血生化之源，水谷精微经脾胃运化上奉于心，化赤为血，故血的生成主要依赖脾胃。' },
    // ---- 经络 ----
    { subject: '中医基础理论', type: '经络', question: '手三阴经的走向规律是？', options: ['从手走头', '从胸走手', '从足走腹', '从头走足'], answer: '从胸走手', explanation: '十二经脉走向：手三阴从胸走手，手三阳从手走头，足三阳从头走足，足三阴从足走腹胸。' },
    { subject: '中医基础理论', type: '经络', question: '手足三阳经在头面部的交接规律是？', options: ['同名阳经在头面交接', '阴阳经在头面交接', '表里经在头面交接', '不相交接'], answer: '同名阳经在头面交接', explanation: '手三阳与足三阳在头面部交接，故称"头为诸阳之会"。' },
    { subject: '中医基础理论', type: '经络', question: '"阴脉之海"指的是？', options: ['督脉', '任脉', '冲脉', '带脉'], answer: '任脉', explanation: '任脉行于腹面正中，总任一身之阴经，故为"阴脉之海"；督脉总督一身之阳经，为"阳脉之海"。' },
    { subject: '中医基础理论', type: '经络', question: '十二经脉中，与心相表里的经脉是？', options: ['手太阴肺经', '手阳明大肠经', '手少阴心经', '手太阳小肠经'], answer: '手太阳小肠经', explanation: '手少阴心经与手太阳小肠经相表里；肺与大肠相表里、脾与胃相表里等。' },
    // ---- 病因病机 ----
    { subject: '中医基础理论', type: '病因病机', question: '六淫中具有"善行而数变"特性的外邪是？', options: ['风', '寒', '湿', '火'], answer: '风', explanation: '风性善行而数变：善行指病位游移、行无定处，数变指发病急、变化快，故"风为百病之长"。' },
    { subject: '中医基础理论', type: '病因病机', question: '"湿性趋下，易袭阴位"，下列哪项符合湿邪致病特点？', options: ['头痛身重', '下肢水肿', '咽干口燥', '四肢厥冷'], answer: '下肢水肿', explanation: '湿性重浊、趋下，易袭阴位，故湿邪为病多见下肢水肿、淋浊、带下等下焦症状。' },
    { subject: '中医基础理论', type: '病因病机', question: '七情中，与"怒"相对应的脏是？', options: ['心', '肝', '脾', '肾'], answer: '肝', explanation: '七情与五脏：怒伤肝、喜伤心、思伤脾、忧伤肺、恐伤肾。' },
    { subject: '中医基础理论', type: '病因病机', question: '痰饮、瘀血等病理产物进一步致病，其性质属于？', options: ['外感病因', '内伤病因', '病理产物性病因', '继发性病因'], answer: '继发性病因', explanation: '痰饮、瘀血既是脏腑功能失调的病理产物，又作为病因导致新的病证，属继发性病因（病理产物性病因）。' },
    { subject: '中医基础理论', type: '病因病机', question: '"邪之所凑，其气必虚"说明发病的关键在于？', options: ['正气不足', '邪气亢盛', '正邪交争', '体质强弱'], answer: '正气不足', explanation: '正气不足是发病的内在根据，邪气是发病的重要条件，故"正气存内，邪不可干；邪之所凑，其气必虚"。' },
    { subject: '中医基础理论', type: '病因病机', question: '下列属于"正治"法的是？', options: ['热因热用', '寒因寒用', '寒者热之', '通因通用'], answer: '寒者热之', explanation: '正治（逆治）是逆其病证性质而治，如寒者热之、热者寒之、虚则补之、实则泻之；反治（从治）如热因热用、寒因寒用、通因通用。' },
    // ---- 防治原则 ----
    { subject: '中医基础理论', type: '防治原则', question: '"治未病"思想的核心内容是？', options: ['未病先防和既病防变', '早期诊断', '早期治疗', '扶正祛邪'], answer: '未病先防和既病防变', explanation: '"治未病"包括未病先防和既病防变两个方面，体现了预防为主的思想。' },
    { subject: '中医基础理论', type: '防治原则', question: '"因时制宜"的治疗原则举例恰当的是？', options: ['冬季慎用寒凉药', '阴虚慎用温燥药', '南方慎用辛温药', '小儿慎用峻猛药'], answer: '冬季慎用寒凉药', explanation: '因时制宜即根据不同季节气候特点用药，如冬季严寒慎用寒凉之品；"阴虚慎用温燥"属因人制宜，"南方慎用辛温"属因地制宜。' },
    { subject: '中医基础理论', type: '防治原则', question: '下列治法中属于"反治"的是？', options: ['实则泻之', '热者寒之', '塞因塞用', '虚则补之'], answer: '塞因塞用', explanation: '反治是顺从病证假象而治，如塞因塞用（用补益药治疗因虚致闭的真虚假实证）、通因通用、热因热用、寒因寒用。' },
    { subject: '中医基础理论', type: '防治原则', question: '扶正与祛邪兼用，适用于？', options: ['邪气亢盛而正气未衰', '正气已衰而邪气不盛', '正虚邪实之证', '单纯虚证'], answer: '正虚邪实之证', explanation: '正虚邪实者当扶正与祛邪兼用，但须分清主次：正虚为主则扶正兼祛邪，邪实为主则祛邪兼扶正。' }
];

const QuestionGenerator = {
    // 从数组中随机取 n 个不重复元素
    pickRandom(arr, n) {
        const pool = arr.slice();
        const out = [];
        while (out.length < n && pool.length > 0) {
            out.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
        }
        return out;
    },

    // 打乱数组
    shuffle(arr) {
        const a = arr.slice();
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    },

    // ---------- 1. 中药功效题：给药名选功效 ----------
    generateHerbQuestion() {
        const herb = this.pickRandom(window.herbsDatabase || [], 1)[0];
        if (!herb || !herb.functions || herb.functions.length === 0) return null;
        const correct = herb.functions[0];

        // 干扰项：优先取同 subcategory → 同 category → 全局兜底（避免选项重复/过难）
        const distractors = new Set();
        const addFrom = (list) => {
            list.forEach(h => {
                if (h.id !== herb.id && h.functions && h.functions.length > 0) {
                    h.functions.forEach(f => { if (f !== correct) distractors.add(f); });
                }
            });
        };
        addFrom((window.herbsDatabase || []).filter(h => h.subcategory === herb.subcategory));
        addFrom((window.herbsDatabase || []).filter(h => h.category === herb.category && h.subcategory !== herb.subcategory));
        if (distractors.size < 3) addFrom(window.herbsDatabase || []);

        if (distractors.size < 3) return null;
        const options = this.shuffle([correct, ...this.pickRandom([...distractors], 3)]);
        // 防御性去重
        const finalOptions = [...new Set(options)];
        if (finalOptions.length < 4) return null;

        return {
            subject: '中药学',
            type: '功效',
            question: `「${herb.name}」的主要功效是？`,
            options: finalOptions,
            answer: correct,
            explanation: `${herb.name}：${herb.functions.join('、')}。归${herb.meridians.join('、')}，药性${herb.nature}。主治：${(herb.indications || []).slice(0, 3).join('、')}。`,
            detailType: 'herb',
            detailId: herb.id
        };
    },

    // ---------- 2. 方剂题：给方名选功用 ----------
    generateFormulaFunctionQuestion() {
        const formula = this.pickRandom(window.formulasDatabase || [], 1)[0];
        if (!formula || !formula.functions || formula.functions.length === 0) return null;
        const correct = formula.functions[0];

        // 干扰项：优先取同 subcategory → 同 category → 全局兜底
        const distractors = new Set();
        const addFrom = (list) => {
            list.forEach(f => {
                if (f.id !== formula.id && f.functions && f.functions.length > 0) {
                    f.functions.forEach(fn => { if (fn !== correct) distractors.add(fn); });
                }
            });
        };
        addFrom((window.formulasDatabase || []).filter(f => f.subcategory === formula.subcategory));
        addFrom((window.formulasDatabase || []).filter(f => f.category === formula.category && f.subcategory !== formula.subcategory));
        if (distractors.size < 3) addFrom(window.formulasDatabase || []);

        if (distractors.size < 3) return null;
        const options = this.shuffle([correct, ...this.pickRandom([...distractors], 3)]);
        const finalOptions = [...new Set(options)];
        if (finalOptions.length < 4) return null;

        return {
            subject: '方剂学',
            type: '功用',
            question: `「${formula.name}」的主要功用是？`,
            options: finalOptions,
            answer: correct,
            explanation: `${formula.name}（出自${formula.source}）：${formula.functions.join('、')}。主治：${(formula.indications || []).slice(0, 3).join('、')}。`,
            detailType: 'formula',
            detailId: formula.id
        };
    },

    // ---------- 3. 方剂题：给组成，缺一味选药 ----------
    generateFormulaCompositionQuestion() {
        const candidates = (window.formulasDatabase || []).filter(f => f.composition && f.composition.length >= 4);
        if (candidates.length === 0) return null;
        const formula = this.pickRandom(candidates, 1)[0];
        const missing = this.pickRandom(formula.composition, 1)[0];
        if (!missing) return null;
        const correct = missing.herbName;

        const shown = formula.composition.filter(c => c.herbName !== correct.herbName);
        if (shown.length < 3) return null;

        const distractors = new Set();
        (window.formulasDatabase || []).forEach(f => {
            (f.composition || []).forEach(c => {
                if (c.herbName !== correct && c.herbName !== '白酒' && c.herbName !== '姜汁') distractors.add(c.herbName);
            });
        });
        if (distractors.size < 3) return null;
        const options = this.shuffle([correct, ...this.pickRandom([...distractors], 3)]);

        return {
            subject: '方剂学',
            type: '组成',
            question: `「${formula.name}」由 ${shown.map(c => c.herbName).join('、')} 等组成，请问还缺哪一味药？`,
            options,
            answer: correct,
            explanation: `${formula.name}（${formula.source}）完整组成：${formula.composition.map(c => `${c.herbName}(${c.dosage},${c.role})`).join('、')}。`,
            detailType: 'formula',
            detailId: formula.id
        };
    },

    // ---------- 4. 证型题：给证型选舌象/脉象 ----------
    generateSyndromeQuestion() {
        const db = window.syndromesDatabase;
        const syndrome = this.pickRandom(db || [], 1)[0];
        if (!syndrome) return null;

        const tongue = syndrome.tongueAppearance;
        const pulse = syndrome.pulseCondition;
        const candidates = [];
        if (tongue) {
            const tongueText = typeof tongue === 'string' ? tongue
                : [tongue.tongueBody, tongue.tongueCoating].filter(Boolean).join('，');
            if (tongueText) candidates.push({ text: tongueText, key: '舌象' });
        }
        if (pulse) {
            const pulseText = typeof pulse === 'string' ? pulse : pulse.join('、');
            candidates.push({ text: pulseText, key: '脉象' });
        }
        if (candidates.length === 0) return null;
        const pick = this.pickRandom(candidates, 1)[0];

        // 干扰项：按题干类型分池（舌象题只从舌象池取、脉象题只从脉象池取），并去重剔除与答案相同的文本
        const distractors = new Set();
        (db || []).forEach(s => {
            if (s.id === syndrome.id) return;
            if (pick.key === '舌象' && s.tongueAppearance) {
                const t = typeof s.tongueAppearance === 'string' ? s.tongueAppearance
                    : [s.tongueAppearance.tongueBody, s.tongueAppearance.tongueCoating].filter(Boolean).join('，');
                if (t && t !== pick.text) distractors.add(t);
            }
            if (pick.key === '脉象' && s.pulseCondition) {
                const p = typeof s.pulseCondition === 'string' ? s.pulseCondition : s.pulseCondition.join('、');
                if (p && p !== pick.text) distractors.add(p);
            }
        });
        // 最终去重：确保 4 个选项互不相同且无多答案
        const finalOptions = [...new Set([pick.text, ...this.pickRandom([...distractors], 3)])];
        if (finalOptions.length < 4) return null;

        return {
            subject: '中医诊断学',
            type: pick.key,
            question: `证型「${syndrome.name}」的典型${pick.key}是？`,
            options: finalOptions,
            answer: pick.text,
            explanation: `${syndrome.name}：${pick.key}为 ${pick.text}。主要症状：${(syndrome.symptoms || []).slice(0, 3).join('、')}。治法：${syndrome.treatmentMethod || syndrome.treatmentPrinciple || ''}。`,
            detailType: 'syndrome',
            detailId: syndrome.id
        };
    },

    // ---------- 5. 中医基础理论题：从经典概念题库随机抽取（覆盖阴阳五行/藏象/气血津液/经络/病因病机/防治原则） ----------
    generateTheoryQuestion(usedQuestions) {
        let pool = THEORY_QUESTIONS;
        if (usedQuestions && usedQuestions.length) {
            const usedSet = new Set(usedQuestions.map(q => q.question));
            pool = THEORY_QUESTIONS.filter(q => !usedSet.has(q.question));
        }
        if (pool.length === 0) return null;
        const q = this.pickRandom(pool, 1)[0];
        return { ...q, detailType: null, detailId: null };
    },

    // ---------- 6. 证候鉴别题：从 syndromeDifferentials 出题 ----------
    generateDifferentialQuestion() {
        const diffs = (typeof syndromeDifferentials !== 'undefined') ? window.syndromeDifferentials : null;
        if (!diffs) return null;
        const names = Object.keys(diffs);
        if (names.length === 0) return null;
        const target = this.pickRandom(names, 1)[0];
        const correct = diffs[target];

        // 干扰项：其他证型的鉴别文本片段
        const distractors = new Set();
        names.forEach(n => { if (n !== target && diffs[n]) distractors.add(diffs[n]); });
        if (distractors.size < 3) return null;
        const options = this.shuffle([correct, ...this.pickRandom([...distractors], 3)]);
        const finalOptions = [...new Set(options)];
        if (finalOptions.length < 4) return null;

        return {
            subject: '中医诊断学',
            type: '证候鉴别',
            question: `下列关于「${target}」的鉴别要点的描述，正确的是？`,
            options: finalOptions,
            answer: correct,
            explanation: correct,
            detailType: null,
            detailId: null
        };
    },

    // ---------- 7. 病例模拟题（A2型）：从 case-studies.js 出题 ----------
    generateCaseQuestion() {
        const cases = (typeof CASE_STUDIES !== 'undefined') ? window.CASE_STUDIES : null;
        if (!cases || cases.length === 0) return null;
        const cs = this.pickRandom(cases, 1)[0];
        if (!cs || !cs.options || cs.options.length < 4) return null;
        const options = this.shuffle(cs.options.slice());
        return {
            subject: '中医诊断学',
            type: '病例模拟',
            question: cs.scenario,
            options,
            answer: cs.answer,
            explanation: cs.explanation,
            detailType: 'syndrome',
            detailId: cs.detailId || ''
        };
    },

    // 按科目生成一组题
    generateQuiz(subject, count = 10) {
        const generators = {
            '中药学': () => this.generateHerbQuestion(),
            '方剂学': () => Math.random() < 0.5 ? this.generateFormulaFunctionQuestion() : this.generateFormulaCompositionQuestion(),
            '中医诊断学': () => this.generateSyndromeQuestion(),
            '中医基础理论': () => this.generateTheoryQuestion(this.questions),
            '证候鉴别': () => this.generateDifferentialQuestion(),
            '病例模拟': () => this.generateCaseQuestion()
        };
        this.questions = [];
        const gen = generators[subject] || Object.values(generators)[Math.floor(Math.random() * generators.length)];
        const questions = [];
        let guard = 0;
        while (questions.length < count && guard < count * 20) {
            guard++;
            const q = gen();
            if (q && !questions.some(x => x.question === q.question)) questions.push(q);
        }
        this.questions = [];
        return questions;
    }
};

// 浏览器全局导出
if (typeof window !== 'undefined') {
    window.QuestionGenerator = QuestionGenerator;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { QuestionGenerator };
}
