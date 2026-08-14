/**
 * 岐黄·辅助诊疗系统 — 中药数据库
 * 包含 160 味常用中药的完整信息
 * 按中医传统分类组织
 *
 * 导出:
 * - herbsDatabase: 中药数据数组
 * - herbCategories: 分类索引（用于浏览导航）
 */

const herbsDatabase = [

    // ================================================================================
    // 一、解表药 — 以发散表邪、解除表证为主要功效
    // ================================================================================

    // 1.1 辛温解表药 (7味)
    {
        id: "herb_001",
        name: "麻黄",
        pinyin: "Ma Huang",
        latinName: "Ephedra sinica Stapf",
        category: "解表药",
        subcategory: "辛温解表药",
        nature: "温",
        tastes: ["辛", "微苦"],
        meridians: ["肺经", "膀胱经"],
        functions: ["发汗散寒", "宣肺平喘", "利水消肿"],
        indications: ["风寒表实证", "恶寒发热", "无汗而喘", "风水浮肿", "胸闷喘咳"],
        usage: "煎服，2-10g。麻黄生用发汗力强，宜先煎去上沫；炙麻黄发汗力减而偏于止咳平喘。",
        contraindications: ["表虚自汗者忌服", "阴虚盗汗者忌服", "高血压患者慎用", "失眠患者慎用"],
        tags: ["常用", "发汗", "平喘"],
        keywords: ["风寒", "无汗", "喘咳", "浮肿", "发汗", "宣肺", "解表"]
    },
    {
        id: "herb_002",
        name: "桂枝",
        pinyin: "Gui Zhi",
        latinName: "Cinnamomum cassia Presl",
        category: "解表药",
        subcategory: "辛温解表药",
        nature: "温",
        tastes: ["辛", "甘"],
        meridians: ["心经", "肺经", "膀胱经"],
        functions: ["发汗解肌", "温通经脉", "助阳化气", "平冲降逆"],
        indications: ["风寒感冒", "脘腹冷痛", "血寒经闭", "关节痹痛", "痰饮水肿", "心悸奔豚"],
        usage: "煎服，3-10g。外用适量。本品辛温助热，易伤阴动血。",
        contraindications: ["外感热病者忌服", "阴虚火旺者忌服", "血热妄行者忌服", "孕妇慎用"],
        tags: ["常用", "温通", "解肌"],
        keywords: ["风寒", "解肌", "温经", "痹痛", "经闭", "化气", "桂枝汤"]
    },
    {
        id: "herb_003",
        name: "紫苏叶",
        pinyin: "Zi Su Ye",
        latinName: "Perilla frutescens (L.) Britt.",
        category: "解表药",
        subcategory: "辛温解表药",
        nature: "温",
        tastes: ["辛"],
        meridians: ["肺经", "脾经"],
        functions: ["解表散寒", "行气和胃", "解鱼蟹毒"],
        indications: ["风寒感冒", "咳嗽呕恶", "妊娠呕吐", "鱼蟹中毒", "胸闷不舒"],
        usage: "煎服，5-10g。不宜久煎。解鱼蟹毒可用至30-60g。",
        contraindications: ["温病初起者慎用", "气虚多汗者慎用"],
        tags: ["常用", "行气", "安胎"],
        keywords: ["风寒", "感冒", "行气", "止呕", "安胎", "解鱼蟹毒"]
    },
    {
        id: "herb_004",
        name: "生姜",
        pinyin: "Sheng Jiang",
        latinName: "Zingiber officinale Rosc.",
        category: "解表药",
        subcategory: "辛温解表药",
        nature: "微温",
        tastes: ["辛"],
        meridians: ["肺经", "脾经", "胃经"],
        functions: ["解表散寒", "温中止呕", "化痰止咳", "解鱼蟹毒"],
        indications: ["风寒感冒轻证", "胃寒呕吐", "寒痰咳嗽", "鱼蟹中毒"],
        usage: "煎服，3-10g。或捣汁服。生姜皮偏于利水消肿。干姜与生姜功效有别，不可混用。",
        contraindications: ["阴虚内热者忌服", "热盛者忌服"],
        tags: ["常用", "止呕", "调味"],
        keywords: ["风寒", "呕吐", "咳嗽", "温中", "解鱼蟹毒", "调味"]
    },
    {
        id: "herb_005",
        name: "防风",
        pinyin: "Fang Feng",
        latinName: "Saposhnikovia divaricata (Turcz.) Schischk.",
        category: "解表药",
        subcategory: "辛温解表药",
        nature: "微温",
        tastes: ["辛", "甘"],
        meridians: ["膀胱经", "肝经", "脾经"],
        functions: ["祛风解表", "胜湿止痛", "止痉"],
        indications: ["外感表证", "风疹瘙痒", "风湿痹痛", "破伤风"],
        usage: "煎服，5-10g。治破伤风可用至15-30g。",
        contraindications: ["阴虚火旺者慎用", "血虚发痉者慎用"],
        tags: ["常用", "祛风", "止痛"],
        keywords: ["祛风", "解表", "止痛", "痹痛", "风疹", "破伤风"]
    },
    {
        id: "herb_006",
        name: "白芷",
        pinyin: "Bai Zhi",
        latinName: "Angelica dahurica (Fisch. ex Hoffm.) Benth. et Hook.f.",
        category: "解表药",
        subcategory: "辛温解表药",
        nature: "温",
        tastes: ["辛"],
        meridians: ["肺经", "胃经", "大肠经"],
        functions: ["解表散寒", "祛风止痛", "宣通鼻窍", "燥湿止带", "消肿排脓"],
        indications: ["风寒感冒", "头额痛", "鼻渊鼻塞", "带下过多", "疮疡肿痛"],
        usage: "煎服，3-10g。外用适量，研末敷或调敷。",
        contraindications: ["阴虚血热者忌服", "痈疽已溃者慎用"],
        tags: ["常用", "止痛", "鼻窍"],
        keywords: ["风寒", "头痛", "鼻渊", "鼻塞", "带下", "疮疡"]
    },
    {
        id: "herb_007",
        name: "荆芥",
        pinyin: "Jing Jie",
        latinName: "Schizonepeta tenuifolia Briq.",
        category: "解表药",
        subcategory: "辛温解表药",
        nature: "微温",
        tastes: ["辛"],
        meridians: ["肺经", "肝经"],
        functions: ["解表散风", "透疹", "消疮", "止血"],
        indications: ["风寒风热表证", "麻疹不透", "风疹瘙痒", "疮疡初起", "吐衄下血"],
        usage: "煎服，5-10g。解表透疹宜生用，止血宜炒炭用。不宜久煎。",
        contraindications: ["表虚自汗者慎用"],
        tags: ["常用", "透疹", "止血"],
        keywords: ["解表", "透疹", "止血", "风疹", "疮疡", "荆芥穗"]
    },

    // 1.2 辛凉解表药 (4味)
    {
        id: "herb_008",
        name: "薄荷",
        pinyin: "Bo He",
        latinName: "Mentha haplocalyx Briq.",
        category: "解表药",
        subcategory: "辛凉解表药",
        nature: "凉",
        tastes: ["辛"],
        meridians: ["肺经", "肝经"],
        functions: ["疏散风热", "清利头目", "利咽透疹", "疏肝行气"],
        indications: ["风热感冒", "头痛目赤", "咽喉肿痛", "麻疹不透", "肝郁气滞"],
        usage: "煎服，3-6g。宜后下，不宜久煎。外用适量。",
        contraindications: ["表虚自汗者不宜", "阴虚血燥者慎用", "哺乳期妇女慎用"],
        tags: ["常用", "清热", "利咽"],
        keywords: ["风热", "头痛", "目赤", "咽喉", "透疹", "疏肝"]
    },
    {
        id: "herb_009",
        name: "牛蒡子",
        pinyin: "Niu Bang Zi",
        latinName: "Arctium lappa L.",
        category: "解表药",
        subcategory: "辛凉解表药",
        nature: "寒",
        tastes: ["辛", "苦"],
        meridians: ["肺经", "胃经"],
        functions: ["疏散风热", "宣肺祛痰", "利咽透疹", "解毒消肿"],
        indications: ["风热感冒", "咳嗽痰多", "咽喉肿痛", "麻疹不透", "痈肿疮毒"],
        usage: "煎服，6-12g。或入丸散。炒用可减缓寒性。",
        contraindications: ["气虚便溏者慎用"],
        tags: ["常用", "清热", "祛痰"],
        keywords: ["风热", "咳嗽", "咽喉", "透疹", "解毒", "痰多"]
    },
    {
        id: "herb_010",
        name: "菊花",
        pinyin: "Ju Hua",
        latinName: "Chrysanthemum morifolium Ramat.",
        category: "解表药",
        subcategory: "辛凉解表药",
        nature: "微寒",
        tastes: ["辛", "甘", "苦"],
        meridians: ["肺经", "肝经"],
        functions: ["疏散风热", "平抑肝阳", "清肝明目", "清热解毒"],
        indications: ["风热感冒", "头痛眩晕", "目赤肿痛", "眼目昏花", "疮痈肿毒"],
        usage: "煎服，5-10g。黄菊花偏于疏散风热，白菊花偏于平肝明目，野菊花偏于清热解毒。",
        contraindications: ["气虚胃寒者慎用", "食少泄泻者慎用"],
        tags: ["常用", "明目", "清热"],
        keywords: ["风热", "目赤", "头痛", "解毒", "明目", "菊花茶"]
    },
    {
        id: "herb_011",
        name: "柴胡",
        pinyin: "Chai Hu",
        latinName: "Bupleurum chinense DC.",
        category: "解表药",
        subcategory: "辛凉解表药",
        nature: "微寒",
        tastes: ["辛", "苦"],
        meridians: ["肝经", "胆经", "肺经"],
        functions: ["疏散退热", "疏肝解郁", "升举阳气"],
        indications: ["少阳证寒热往来", "感冒发热", "肝郁气滞", "胁肋胀痛", "中气下陷", "脱肛"],
        usage: "煎服，3-10g。疏肝解郁宜醋炙，升阳宜生用或酒炙。",
        contraindications: ["肝阳上亢者慎用", "阴虚火旺者慎用", "真阴亏损者忌服"],
        tags: ["常用", "退热", "疏肝", "升阳"],
        keywords: ["少阳", "寒热往来", "疏肝", "退热", "胁痛", "小柴胡汤"]
    },

    // ================================================================================
    // 二、清热药 — 以清泄里热为主要功效
    // ================================================================================

    // 2.1 清热泻火药 (4味)
    {
        id: "herb_012",
        name: "石膏",
        pinyin: "Shi Gao",
        latinName: "Gypsum Fibrosum",
        category: "清热药",
        subcategory: "清热泻火药",
        nature: "大寒",
        tastes: ["辛", "甘"],
        meridians: ["肺经", "胃经"],
        functions: ["清热泻火", "除烦止渴", "收湿敛疮"],
        indications: ["气分实热证", "壮热烦渴", "肺热喘咳", "胃火牙痛", "头痛", "疮疡不收"],
        usage: "煎服，15-60g。生石膏宜打碎先煎。煅石膏外用适量，研末撒敷患处。",
        contraindications: ["脾胃虚寒者忌服", "阴虚内热者忌服", "非实热者不宜使用"],
        tags: ["常用", "清热", "止渴"],
        keywords: ["实热", "气分", "壮热", "烦渴", "胃火", "白虎汤"]
    },
    {
        id: "herb_013",
        name: "知母",
        pinyin: "Zhi Mu",
        latinName: "Anemarrhena asphodeloides Bge.",
        category: "清热药",
        subcategory: "清热泻火药",
        nature: "寒",
        tastes: ["苦", "甘"],
        meridians: ["肺经", "胃经", "肾经"],
        functions: ["清热泻火", "滋阴润燥"],
        indications: ["气分实热", "肺热燥咳", "骨蒸潮热", "内热消渴", "肠燥便秘"],
        usage: "煎服，6-12g。清热泻火宜生用，滋阴降火宜盐水炙用。",
        contraindications: ["脾虚便溏者慎用"],
        tags: ["常用", "清热", "滋阴"],
        keywords: ["实热", "肺热", "骨蒸", "消渴", "滋阴", "白虎汤"]
    },
    {
        id: "herb_014",
        name: "栀子",
        pinyin: "Zhi Zi",
        latinName: "Gardenia jasminoides Ellis",
        category: "清热药",
        subcategory: "清热泻火药",
        nature: "寒",
        tastes: ["苦"],
        meridians: ["心经", "肺经", "三焦经"],
        functions: ["泻火除烦", "清热利湿", "凉血解毒", "消肿止痛"],
        indications: ["热病心烦", "湿热黄疸", "血淋涩痛", "血热吐衄", "目赤肿痛", "疮疡肿毒"],
        usage: "煎服，6-10g。生用清热泻火，炒用凉血止血。外用适量，研末调敷。",
        contraindications: ["脾虚便溏者忌服"],
        tags: ["常用", "泻火", "除烦"],
        keywords: ["心烦", "黄疸", "血热", "湿热", "栀子豉汤"]
    },
    {
        id: "herb_015",
        name: "夏枯草",
        pinyin: "Xia Ku Cao",
        latinName: "Prunella vulgaris L.",
        category: "清热药",
        subcategory: "清热泻火药",
        nature: "寒",
        tastes: ["辛", "苦"],
        meridians: ["肝经", "胆经"],
        functions: ["清肝泻火", "明目消肿", "散结消肿"],
        indications: ["目赤肿痛", "头痛眩晕", "瘰疬瘿瘤", "乳痈肿痛", "高血压属肝火者"],
        usage: "煎服，9-15g。或熬膏服。",
        contraindications: ["脾胃虚弱者慎用"],
        tags: ["常用", "清肝", "散结"],
        keywords: ["目赤", "肝火", "瘰疬", "瘿瘤", "头痛", "高血压"]
    },

    // 2.2 清热燥湿药 (3味)
    {
        id: "herb_016",
        name: "黄芩",
        pinyin: "Huang Qin",
        latinName: "Scutellaria baicalensis Georgi",
        category: "清热药",
        subcategory: "清热燥湿药",
        nature: "寒",
        tastes: ["苦"],
        meridians: ["肺经", "胆经", "脾经", "大肠经", "小肠经"],
        functions: ["清热燥湿", "泻火解毒", "止血安胎"],
        indications: ["湿热痞满", "泻痢黄疸", "肺热咳嗽", "高热烦渴", "血热吐衄", "胎动不安"],
        usage: "煎服，3-10g。清热泻火、解毒宜生用；安胎宜炒用；止血宜炒炭用。",
        contraindications: ["脾胃虚寒者忌服", "无湿热实火者不宜"],
        tags: ["常用", "燥湿", "安胎"],
        keywords: ["湿热", "肺热", "泻痢", "黄疸", "安胎", "止血"]
    },
    {
        id: "herb_017",
        name: "黄连",
        pinyin: "Huang Lian",
        latinName: "Coptis chinensis Franch.",
        category: "清热药",
        subcategory: "清热燥湿药",
        nature: "寒",
        tastes: ["苦"],
        meridians: ["心经", "脾经", "胃经", "肝经", "胆经", "大肠经"],
        functions: ["清热燥湿", "泻火解毒"],
        indications: ["湿热痞满", "呕吐泻痢", "高热神昏", "心火亢盛", "心烦不寐", "血热吐衄", "痈肿疔疮"],
        usage: "煎服，2-5g。清心火宜生用，治上焦火宜酒炙，止呕宜姜炙。外用适量。",
        contraindications: ["脾胃虚寒者忌服", "阴虚津伤者慎用"],
        tags: ["常用", "苦寒", "解毒", "名贵"],
        keywords: ["湿热", "泻火", "痢疾", "心火", "失眠", "疮痈"]
    },
    {
        id: "herb_018",
        name: "黄柏",
        pinyin: "Huang Bai",
        latinName: "Phellodendron chinense Schneid.",
        category: "清热药",
        subcategory: "清热燥湿药",
        nature: "寒",
        tastes: ["苦"],
        meridians: ["肾经", "膀胱经"],
        functions: ["清热燥湿", "泻火除蒸", "解毒疗疮"],
        indications: ["湿热泻痢", "黄疸尿赤", "带下阴痒", "骨蒸劳热", "盗汗遗精", "疮疡肿毒"],
        usage: "煎服，3-12g。清热燥湿解毒宜生用，滋阴降火宜盐水炙用。外用适量。",
        contraindications: ["脾虚泄泻者忌服", "胃弱食少者忌服"],
        tags: ["常用", "燥湿", "滋阴"],
        keywords: ["湿热", "下焦", "带下", "骨蒸", "遗精", "疮疡"]
    },

    // 2.3 清热解毒药 (5味)
    {
        id: "herb_019",
        name: "金银花",
        pinyin: "Jin Yin Hua",
        latinName: "Lonicera japonica Thunb.",
        category: "清热药",
        subcategory: "清热解毒药",
        nature: "寒",
        tastes: ["甘"],
        meridians: ["肺经", "心经", "胃经"],
        functions: ["清热解毒", "疏散风热", "凉血止痢"],
        indications: ["痈肿疔疮", "喉痹丹毒", "风热感冒", "温病发热", "热毒血痢"],
        usage: "煎服，6-15g。疏散风热宜生用，凉血止痢宜炒炭用。外用适量。",
        contraindications: ["脾胃虚寒者慎用", "气虚疮疡脓清者忌服"],
        tags: ["常用", "解毒", "清热"],
        keywords: ["疮痈", "风热", "温病", "热毒", "血痢", "银翘散"]
    },
    {
        id: "herb_020",
        name: "连翘",
        pinyin: "Lian Qiao",
        latinName: "Forsythia suspensa (Thunb.) Vahl",
        category: "清热药",
        subcategory: "清热解毒药",
        nature: "微寒",
        tastes: ["苦"],
        meridians: ["心经", "肺经", "小肠经"],
        functions: ["清热解毒", "消肿散结", "疏散风热"],
        indications: ["痈肿疮毒", "瘰疬痰核", "风热感冒", "温病初起", "温热入营"],
        usage: "煎服，6-15g。青翘清热解毒力强，老翘消痈散结力佳。",
        contraindications: ["脾胃虚寒者慎用", "气虚脓清者不宜"],
        tags: ["常用", "解毒", "散结"],
        keywords: ["疮痈", "风热", "温病", "瘰疬", "银翘散"]
    },
    {
        id: "herb_021",
        name: "板蓝根",
        pinyin: "Ban Lan Gen",
        latinName: "Isatis indigotica Fort.",
        category: "清热药",
        subcategory: "清热解毒药",
        nature: "寒",
        tastes: ["苦"],
        meridians: ["心经", "胃经"],
        functions: ["清热解毒", "凉血利咽"],
        indications: ["温毒发斑", "痄腮喉痹", "大头瘟疫", "丹毒痈肿", "外感发热"],
        usage: "煎服，9-15g。外用适量，煎水洗或研末调敷。",
        contraindications: ["脾胃虚寒者忌服", "无实热者不宜"],
        tags: ["常用", "解毒", "利咽"],
        keywords: ["温毒", "喉痹", "痄腮", "丹毒", "咽痛", "抗病毒"]
    },
    {
        id: "herb_022",
        name: "蒲公英",
        pinyin: "Pu Gong Ying",
        latinName: "Taraxacum mongolicum Hand.-Mazz.",
        category: "清热药",
        subcategory: "清热解毒药",
        nature: "寒",
        tastes: ["苦", "甘"],
        meridians: ["肝经", "胃经"],
        functions: ["清热解毒", "消肿散结", "利尿通淋"],
        indications: ["乳痈肿痛", "痈肿疔毒", "目赤咽痛", "湿热黄疸", "热淋涩痛"],
        usage: "煎服，10-15g。鲜品加倍。外用鲜品适量捣敷或煎汤熏洗。",
        contraindications: ["脾胃虚寒者慎用", "用量过大可致缓泻"],
        tags: ["常用", "解毒", "通淋"],
        keywords: ["乳痈", "疮疔", "目赤", "黄疸", "淋证", "蒲公英茶"]
    },
    {
        id: "herb_023",
        name: "鱼腥草",
        pinyin: "Yu Xing Cao",
        latinName: "Houttuynia cordata Thunb.",
        category: "清热药",
        subcategory: "清热解毒药",
        nature: "微寒",
        tastes: ["辛"],
        meridians: ["肺经"],
        functions: ["清热解毒", "消痈排脓", "利尿通淋"],
        indications: ["肺痈吐脓", "肺热咳嗽", "热毒疮痈", "湿热淋证", "湿热泻痢"],
        usage: "煎服，15-25g。不宜久煎，鲜品加倍。外用鲜品适量捣敷或煎汤熏洗。",
        contraindications: ["虚寒证忌服"],
        tags: ["常用", "解毒", "排脓"],
        keywords: ["肺痈", "肺热", "咳嗽", "排脓", "淋证", "带下"]
    },

    // 2.4 清热凉血药 (3味)
    {
        id: "herb_024",
        name: "生地黄",
        pinyin: "Sheng Di Huang",
        latinName: "Rehmannia glutinosa Libosch.",
        category: "清热药",
        subcategory: "清热凉血药",
        nature: "寒",
        tastes: ["甘", "苦"],
        meridians: ["心经", "肝经", "肾经"],
        functions: ["清热凉血", "养阴生津"],
        indications: ["热入营血", "温毒发斑", "血热吐衄", "阴虚内热", "骨蒸劳热", "内热消渴"],
        usage: "煎服，10-15g。鲜地黄用量加倍，清热凉血力更强。",
        contraindications: ["脾虚湿滞者忌服", "腹满便溏者慎用"],
        tags: ["常用", "凉血", "养阴"],
        keywords: ["营血", "血热", "阴虚", "消渴", "骨蒸", "犀角地黄汤"]
    },
    {
        id: "herb_025",
        name: "玄参",
        pinyin: "Xuan Shen",
        latinName: "Scrophularia ningpoensis Hemsl.",
        category: "清热药",
        subcategory: "清热凉血药",
        nature: "微寒",
        tastes: ["甘", "苦", "咸"],
        meridians: ["肺经", "胃经", "肾经"],
        functions: ["清热凉血", "滋阴降火", "解毒散结"],
        indications: ["热入营血", "温毒发斑", "咽喉肿痛", "骨蒸劳热", "目赤肿痛", "瘰疬痰核"],
        usage: "煎服，9-15g。不宜与藜芦同用。",
        contraindications: ["脾胃有湿者忌服", "脾虚便溏者慎用", "不宜与藜芦同用"],
        tags: ["常用", "凉血", "散结"],
        keywords: ["凉血", "滋阴", "咽痛", "瘰疬", "骨蒸", "发斑"]
    },
    {
        id: "herb_026",
        name: "牡丹皮",
        pinyin: "Mu Dan Pi",
        latinName: "Paeonia suffruticosa Andr.",
        category: "清热药",
        subcategory: "清热凉血药",
        nature: "微寒",
        tastes: ["苦", "辛"],
        meridians: ["心经", "肝经", "肾经"],
        functions: ["清热凉血", "活血化瘀"],
        indications: ["热入营血", "温毒发斑", "血热吐衄", "经闭痛经", "痈肿疮毒", "跌扑伤痛"],
        usage: "煎服，6-12g。清热凉血宜生用，活血化瘀宜酒炙用。",
        contraindications: ["血虚有寒者慎用", "月经过多者慎用", "孕妇忌用"],
        tags: ["常用", "凉血", "化瘀"],
        keywords: ["血热", "发斑", "经闭", "痛经", "化瘀", "丹皮"]
    },

    // ================================================================================
    // 三、泻下药 — 以通利大便、排除积滞为主要功效
    // ================================================================================

    // 3.1 攻下药 (2味)
    {
        id: "herb_027",
        name: "大黄",
        pinyin: "Da Huang",
        latinName: "Rheum palmatum L.",
        category: "泻下药",
        subcategory: "攻下药",
        nature: "寒",
        tastes: ["苦"],
        meridians: ["脾经", "胃经", "大肠经", "肝经", "心包经"],
        functions: ["泻下攻积", "清热泻火", "凉血解毒", "逐瘀通经", "利湿退黄"],
        indications: ["实热便秘", "湿热泻痢", "血热吐衄", "目赤咽肿", "痈肿疔疮", "瘀血经闭", "跌打损伤", "湿热黄疸"],
        usage: "煎服，3-15g。攻下宜生用后下，活血宜酒炙，止血宜炒炭。外用适量。",
        contraindications: ["脾胃虚寒者忌服", "孕妇及月经期慎用", "哺乳期妇女慎用"],
        tags: ["常用", "攻下", "活血"],
        keywords: ["便秘", "实热", "泻下", "化瘀", "黄疸", "将军"]
    },
    {
        id: "herb_028",
        name: "芒硝",
        pinyin: "Mang Xiao",
        latinName: "Natrii Sulfas",
        category: "泻下药",
        subcategory: "攻下药",
        nature: "寒",
        tastes: ["咸", "苦"],
        meridians: ["胃经", "大肠经"],
        functions: ["泻下通便", "润燥软坚", "清热消肿"],
        indications: ["实热便秘", "大便燥结", "积滞腹痛", "肠痈初起", "咽痛口疮", "目赤肿痛"],
        usage: "冲入药汁内或开水溶化后服，6-12g。外用适量。不宜与硫黄、三棱同用。",
        contraindications: ["孕妇忌服", "脾胃虚寒者忌服", "不宜与硫黄、三棱同用"],
        tags: ["常用", "软坚", "通便"],
        keywords: ["便秘", "燥结", "软坚", "泻下", "肠痈", "朴硝"]
    },

    // 3.2 润下药 (2味)
    {
        id: "herb_029",
        name: "火麻仁",
        pinyin: "Huo Ma Ren",
        latinName: "Cannabis sativa L. fructus",
        category: "泻下药",
        subcategory: "润下药",
        nature: "平",
        tastes: ["甘"],
        meridians: ["脾经", "胃经", "大肠经"],
        functions: ["润肠通便", "滋养补虚"],
        indications: ["肠燥便秘", "老人虚人便秘", "产后津血不足便秘"],
        usage: "煎服，10-15g。或入丸散。用时去壳捣碎。",
        contraindications: ["脾虚便溏者不宜", "肠滑泄泻者忌服"],
        tags: ["常用", "润下", "通便"],
        keywords: ["便秘", "肠燥", "润下", "老年", "产后", "脾约"]
    },
    {
        id: "herb_030",
        name: "郁李仁",
        pinyin: "Yu Li Ren",
        latinName: "Prunus japonica Thunb.",
        category: "泻下药",
        subcategory: "润下药",
        nature: "平",
        tastes: ["辛", "苦", "甘"],
        meridians: ["脾经", "大肠经", "小肠经"],
        functions: ["润肠通便", "利水消肿"],
        indications: ["肠燥便秘", "水肿胀满", "脚气浮肿", "小便不利"],
        usage: "煎服，6-10g。宜捣碎入煎。",
        contraindications: ["孕妇慎用", "脾虚泄泻者忌服"],
        tags: ["通便", "消肿"],
        keywords: ["便秘", "润下", "水肿", "小便不利", "肠燥"]
    },

    // 3.3 逐水药 (1味)
    {
        id: "herb_031",
        name: "甘遂",
        pinyin: "Gan Sui",
        latinName: "Euphorbia kansui T.N.Liou ex T.P.Wang",
        category: "泻下药",
        subcategory: "逐水药",
        nature: "寒",
        tastes: ["苦"],
        meridians: ["肺经", "肾经", "大肠经"],
        functions: ["泻水逐饮", "消肿散结"],
        indications: ["水肿胀满", "胸腹积水", "痰饮积聚", "气逆咳喘", "二便不利"],
        usage: "炮制后多入丸散，0.5-1.5g。醋制可减低毒性。外用适量，研末调敷。不宜与甘草同用。",
        toxicNote: { limit: "0.5~1.5g，醋制，入丸散", note: "反甘草，孕妇忌用" },
        contraindications: ["孕妇忌服", "体虚者忌服", "不宜与甘草同用"],
        tags: ["有毒", "峻下", "逐水"],
        keywords: ["水肿", "胸水", "腹水", "痰饮", "二便不利", "十枣汤"]
    },

    // ================================================================================
    // 四、祛风湿药 — 以祛除风湿、解除痹痛为主要功效 (5味)
    // ================================================================================

    {
        id: "herb_032",
        name: "独活",
        pinyin: "Du Huo",
        latinName: "Angelica pubescens Maxim.f. biserrata Shan et Yuan",
        category: "祛风湿药",
        subcategory: "祛风湿散寒药",
        nature: "微温",
        tastes: ["辛", "苦"],
        meridians: ["肾经", "膀胱经"],
        functions: ["祛风湿", "止痹痛", "解表"],
        indications: ["风寒湿痹", "腰膝疼痛", "少阴头痛", "风火牙痛"],
        usage: "煎服，3-10g。外用适量。",
        contraindications: ["阴虚血燥者慎用"],
        tags: ["常用", "止痛", "风湿"],
        keywords: ["风湿", "痹痛", "腰痛", "少阴头痛", "祛风"]
    },
    {
        id: "herb_033",
        name: "威灵仙",
        pinyin: "Wei Ling Xian",
        latinName: "Clematis chinensis Osbeck",
        category: "祛风湿药",
        subcategory: "祛风湿散寒药",
        nature: "温",
        tastes: ["辛", "咸"],
        meridians: ["膀胱经"],
        functions: ["祛风湿", "通经络", "消骨鲠"],
        indications: ["风湿痹痛", "肢体麻木", "筋脉拘挛", "屈伸不利", "诸骨鲠喉"],
        usage: "煎服，6-10g。治骨鲠可用30g。",
        contraindications: ["气血亏虚者慎用", "胃及十二指肠溃疡者慎用"],
        tags: ["常用", "通络", "止痛"],
        keywords: ["风湿", "痹痛", "麻木", "拘挛", "通经络", "骨鲠"]
    },
    {
        id: "herb_034",
        name: "秦艽",
        pinyin: "Qin Jiao",
        latinName: "Gentiana macrophylla Pall.",
        category: "祛风湿药",
        subcategory: "祛风湿清热药",
        nature: "微寒",
        tastes: ["辛", "苦"],
        meridians: ["胃经", "肝经", "胆经"],
        functions: ["祛风湿", "止痹痛", "清湿热", "退虚热"],
        indications: ["风湿痹痛", "筋脉拘挛", "骨节酸痛", "湿热黄疸", "虚热骨蒸"],
        usage: "煎服，3-10g。生用或炒用。",
        contraindications: ["久病虚羸者慎用", "溲多便滑者忌服"],
        tags: ["常用", "风湿", "退热"],
        keywords: ["风湿", "痹痛", "拘挛", "黄疸", "骨蒸", "虚热"]
    },
    {
        id: "herb_035",
        name: "防己",
        pinyin: "Fang Ji",
        latinName: "Stephania tetrandra S.Moore",
        category: "祛风湿药",
        subcategory: "祛风湿清热药",
        nature: "寒",
        tastes: ["苦", "辛"],
        meridians: ["膀胱经", "肺经"],
        functions: ["祛风止痛", "利水消肿"],
        indications: ["风湿痹痛", "水肿脚气", "小便不利", "湿疹疮毒", "高血压属湿热者"],
        usage: "煎服，5-10g。汉防己偏于利水消肿，木防己偏于祛风止痛。",
        contraindications: ["脾胃虚寒者慎用", "食欲不振者慎用", "阴虚者不宜"],
        tags: ["常用", "消肿", "止痛"],
        keywords: ["风湿", "水肿", "痹痛", "脚气", "利水", "降压"]
    },
    {
        id: "herb_036",
        name: "桑寄生",
        pinyin: "Sang Ji Sheng",
        latinName: "Taxillus chinensis (DC.) Danser",
        category: "祛风湿药",
        subcategory: "祛风湿补益药",
        nature: "平",
        tastes: ["苦", "甘"],
        meridians: ["肝经", "肾经"],
        functions: ["祛风湿", "补肝肾", "强筋骨", "安胎元"],
        indications: ["风湿痹痛", "腰膝酸软", "筋骨无力", "崩漏经多", "妊娠漏血", "胎动不安"],
        usage: "煎服，9-15g。或入丸散。",
        contraindications: ["湿热痹痛实证者不宜"],
        tags: ["常用", "补肾", "安胎"],
        keywords: ["风湿", "腰痛", "补肾", "安胎", "强筋骨", "肝肾不足"]
    },

    // ================================================================================
    // 五、化湿药 — 以化湿醒脾为主要功效 (4味)
    // ================================================================================

    {
        id: "herb_037",
        name: "藿香",
        pinyin: "Huo Xiang",
        latinName: "Pogostemon cablin (Blanco) Benth.",
        category: "化湿药",
        subcategory: "化湿药",
        nature: "微温",
        tastes: ["辛"],
        meridians: ["脾经", "胃经", "肺经"],
        functions: ["化湿醒脾", "和中止呕", "发表解暑"],
        indications: ["湿浊中阻", "脘痞呕吐", "暑湿表证", "暑湿呕吐", "湿热初起"],
        usage: "煎服，3-10g，鲜品加倍。不宜久煎。后下为宜。",
        contraindications: ["阴虚火旺者忌服", "胃热呕吐者不宜"],
        tags: ["常用", "化湿", "止呕"],
        keywords: ["湿浊", "呕吐", "暑湿", "化湿", "和中", "藿香正气"]
    },
    {
        id: "herb_038",
        name: "苍术",
        pinyin: "Cang Zhu",
        latinName: "Atractylodes lancea (Thunb.) DC.",
        category: "化湿药",
        subcategory: "化湿药",
        nature: "温",
        tastes: ["辛", "苦"],
        meridians: ["脾经", "胃经", "肝经"],
        functions: ["燥湿健脾", "祛风散寒", "明目"],
        indications: ["湿困脾胃", "脘痞腹胀", "食欲不振", "呕恶泄泻", "风寒湿痹", "夜盲"],
        usage: "煎服，3-9g。生用燥湿力强，炒用健脾力优。",
        contraindications: ["阴虚内热者忌服", "气虚多汗者慎用"],
        tags: ["常用", "燥湿", "健脾"],
        keywords: ["湿困", "腹胀", "健脾", "燥湿", "风寒湿痹", "夜盲"]
    },
    {
        id: "herb_039",
        name: "厚朴",
        pinyin: "Hou Po",
        latinName: "Magnolia officinalis Rehd. et Wils.",
        category: "化湿药",
        subcategory: "化湿药",
        nature: "温",
        tastes: ["苦", "辛"],
        meridians: ["脾经", "胃经", "肺经", "大肠经"],
        functions: ["燥湿行气", "消积除满", "降逆平喘"],
        indications: ["湿滞伤中", "脘痞腹胀痛", "食积气滞", "便秘腹胀", "痰饮喘咳"],
        usage: "煎服，3-10g。或入丸散。",
        contraindications: ["气虚津亏者慎用", "孕妇慎用"],
        tags: ["常用", "行气", "消胀"],
        keywords: ["腹胀", "食积", "便秘", "行气", "燥湿", "平喘", "大承气汤"]
    },
    {
        id: "herb_040",
        name: "砂仁",
        pinyin: "Sha Ren",
        latinName: "Amomum villosum Lour.",
        category: "化湿药",
        subcategory: "化湿药",
        nature: "温",
        tastes: ["辛"],
        meridians: ["脾经", "胃经", "肾经"],
        functions: ["化湿开胃", "温脾止泻", "理气安胎"],
        indications: ["湿浊中阻", "脘痞不饥", "脾胃虚寒", "妊娠呕吐", "胎动不安"],
        usage: "煎服，3-6g。宜后下，不宜久煎。或入丸散。",
        contraindications: ["阴虚血燥者慎用"],
        tags: ["常用", "化湿", "安胎"],
        keywords: ["湿浊", "开胃", "止泻", "安胎", "妊娠", "理气", "砂仁"]
    },

    // ================================================================================
    // 六、利水渗湿药 — 以通利水道、渗泄水湿为主要功效 (7味)
    // ================================================================================

    // 6.1 利水消肿药 (3味)
    {
        id: "herb_041",
        name: "茯苓",
        pinyin: "Fu Ling",
        latinName: "Poria cocos (Schw.) Wolf",
        category: "利水渗湿药",
        subcategory: "利水消肿药",
        nature: "平",
        tastes: ["甘", "淡"],
        meridians: ["心经", "肺经", "脾经", "肾经"],
        functions: ["利水渗湿", "健脾宁心"],
        indications: ["水肿尿少", "痰饮眩悸", "脾虚食少", "便溏泄泻", "心神不安", "惊悸失眠"],
        usage: "煎服，10-15g。或入丸散。利水渗湿宜用茯苓皮，健脾宜用白茯苓，安神宜用茯神。",
        contraindications: ["虚寒滑精者慎用", "气虚下陷者慎用"],
        tags: ["常用", "利水", "健脾"],
        keywords: ["水肿", "健脾", "安神", "痰饮", "渗湿", "四君子汤"]
    },
    {
        id: "herb_042",
        name: "猪苓",
        pinyin: "Zhu Ling",
        latinName: "Polyporus umbellatus (Pers.) Fries",
        category: "利水渗湿药",
        subcategory: "利水消肿药",
        nature: "平",
        tastes: ["甘", "淡"],
        meridians: ["肾经", "膀胱经"],
        functions: ["利水渗湿"],
        indications: ["小便不利", "水肿胀满", "泄泻", "淋浊", "带下"],
        usage: "煎服，6-12g。或入丸散。",
        contraindications: ["无水湿者忌用", "肾虚者慎用"],
        tags: ["利水", "渗湿"],
        keywords: ["水肿", "小便不利", "泄泻", "淋浊", "利水"]
    },
    {
        id: "herb_043",
        name: "泽泻",
        pinyin: "Ze Xie",
        latinName: "Alisma orientalis (Sam.) Juzep.",
        category: "利水渗湿药",
        subcategory: "利水消肿药",
        nature: "寒",
        tastes: ["甘", "淡"],
        meridians: ["肾经", "膀胱经"],
        functions: ["利水渗湿", "泄热化浊", "降血脂"],
        indications: ["小便不利", "水肿胀满", "痰饮眩晕", "热淋涩痛", "高脂血症"],
        usage: "煎服，6-10g。麸炒或盐炙可减寒性。",
        contraindications: ["肾虚滑精者忌服"],
        tags: ["常用", "利水", "降脂"],
        keywords: ["水肿", "小便不利", "痰饮", "眩晕", "降脂", "五苓散"]
    },

    // 6.2 利尿通淋药 (2味)
    {
        id: "herb_044",
        name: "车前子",
        pinyin: "Che Qian Zi",
        latinName: "Plantago asiatica L.",
        category: "利水渗湿药",
        subcategory: "利尿通淋药",
        nature: "微寒",
        tastes: ["甘"],
        meridians: ["肾经", "肝经", "肺经", "小肠经"],
        functions: ["清热利尿", "渗湿通淋", "明目祛痰"],
        indications: ["热淋涩痛", "水肿胀满", "暑湿泄泻", "目赤肿痛", "痰热咳嗽"],
        usage: "煎服，9-15g。宜包煎。或入丸散。",
        contraindications: ["无湿热者不宜", "肾虚滑精者慎用"],
        tags: ["常用", "通淋", "清热"],
        keywords: ["淋证", "水肿", "泄泻", "目赤", "利尿", "车前"]
    },
    {
        id: "herb_045",
        name: "滑石",
        pinyin: "Hua Shi",
        latinName: "Talcum",
        category: "利水渗湿药",
        subcategory: "利尿通淋药",
        nature: "寒",
        tastes: ["甘", "淡"],
        meridians: ["膀胱经", "肺经", "胃经"],
        functions: ["利尿通淋", "清热解暑", "收湿敛疮"],
        indications: ["热淋涩痛", "石淋", "暑湿烦渴", "湿热水泻", "外治湿疹湿疮"],
        usage: "煎服，10-20g，宜包煎。外用适量，研末敷。",
        contraindications: ["阴虚津伤者忌服", "脾胃虚弱者慎用"],
        tags: ["常用", "通淋", "解暑"],
        keywords: ["淋证", "石淋", "暑湿", "湿疹", "六-散"]
    },

    // 6.3 利湿退黄药 (2味)
    {
        id: "herb_046",
        name: "茵陈",
        pinyin: "Yin Chen",
        latinName: "Artemisia scoparia Waldst. et Kit.",
        category: "利水渗湿药",
        subcategory: "利湿退黄药",
        nature: "微寒",
        tastes: ["苦", "辛"],
        meridians: ["脾经", "胃经", "肝经", "胆经"],
        functions: ["清利湿热", "利胆退黄"],
        indications: ["湿热黄疸", "小便不利", "湿温暑湿", "湿疮瘙痒"],
        usage: "煎服，6-15g。外用适量，煎汤熏洗。",
        contraindications: ["蓄血发黄者忌服", "非湿热黄疸者不宜"],
        tags: ["常用", "退黄", "利胆"],
        keywords: ["黄疸", "湿热", "利胆", "保肝", "茵陈蒿汤", "肝炎"]
    },
    {
        id: "herb_047",
        name: "金钱草",
        pinyin: "Jin Qian Cao",
        latinName: "Lysimachia christinae Hance",
        category: "利水渗湿药",
        subcategory: "利湿退黄药",
        nature: "微寒",
        tastes: ["甘", "咸"],
        meridians: ["肝经", "胆经", "肾经", "膀胱经"],
        functions: ["利湿退黄", "利尿通淋", "解毒消肿"],
        indications: ["湿热黄疸", "石淋热淋", "尿涩作痛", "痈肿疔疮", "毒蛇咬伤"],
        usage: "煎服，15-60g。鲜品加倍。外用鲜品适量捣敷。",
        contraindications: ["脾胃虚寒者慎用"],
        tags: ["常用", "退黄", "排石"],
        keywords: ["黄疸", "结石", "石淋", "胆结石", "肾结石", "利尿"]
    },

    // ================================================================================
    // 七、温里药 — 以温里散寒为主要功效 (3味)
    // ================================================================================

    {
        id: "herb_048",
        name: "附子",
        pinyin: "Fu Zi",
        latinName: "Aconitum carmichaelii Debx.",
        category: "温里药",
        subcategory: "温里药",
        nature: "大热",
        tastes: ["辛", "甘"],
        meridians: ["心经", "肾经", "脾经"],
        functions: ["回阳救逆", "补火助阳", "散寒止痛"],
        indications: ["亡阳虚脱", "肢冷脉微", "阳痿宫冷", "心腹冷痛", "虚寒吐泻", "寒湿痹痛"],
        usage: "煎服，3-15g。宜先煎、久煎1小时以上至口尝无麻舌感为度。孕妇使用需权衡利弊。不宜与半夏、瓜蒌、贝母、白蔹、白及同用。",
        toxicNote: { limit: "3~15g，宜先煎0.5~1小时以减毒", note: "含乌头碱，中毒可致心律失常；孕妇忌服" },
        contraindications: ["孕妇慎用", "阴虚阳亢者忌服", "不宜与半夏、瓜蒌、贝母、白蔹、白及同用"],
        tags: ["有毒", "回阳", "温里"],
        keywords: ["回阳", "亡阳", "阳虚", "寒痛", "四逆汤", "温里"]
    },
    {
        id: "herb_049",
        name: "干姜",
        pinyin: "Gan Jiang",
        latinName: "Zingiber officinale Rosc.",
        category: "温里药",
        subcategory: "温里药",
        nature: "热",
        tastes: ["辛"],
        meridians: ["脾经", "胃经", "肾经", "心经", "肺经"],
        functions: ["温中散寒", "回阳通脉", "温肺化饮"],
        indications: ["脘腹冷痛", "寒饮喘咳", "亡阳证", "肢冷脉微", "呕吐泄泻"],
        usage: "煎服，3-10g。温中散寒宜用干姜，回阳救逆宜用炮姜。",
        contraindications: ["阴虚内热者忌服", "血热妄行者忌服"],
        tags: ["常用", "温中", "化饮"],
        keywords: ["寒痛", "温中", "亡阳", "寒饮", "四逆汤", "温肺"]
    },
    {
        id: "herb_050",
        name: "肉桂",
        pinyin: "Rou Gui",
        latinName: "Cinnamomum cassia Presl",
        category: "温里药",
        subcategory: "温里药",
        nature: "大热",
        tastes: ["辛", "甘"],
        meridians: ["肾经", "脾经", "心经", "肝经"],
        functions: ["补火助阳", "引火归元", "散寒止痛", "温通经脉"],
        indications: ["肾阳不足", "命门火衰", "阳痿宫冷", "腰膝冷痛", "寒疝腹痛", "寒湿痹痛"],
        usage: "煎服，1-5g。宜后下或焗服。研末冲服每次1-2g。",
        contraindications: ["阴虚火旺者忌服", "有出血倾向者慎用", "孕妇忌服"],
        tags: ["常用", "温里", "补阳"],
        keywords: ["肾阳", "温里", "寒痛", "补火", "命门", "引火归元"]
    },

    // ================================================================================
    // 八、理气药 — 以疏理气机为主要功效 (5味)
    // ================================================================================

    {
        id: "herb_051",
        name: "陈皮",
        pinyin: "Chen Pi",
        latinName: "Citrus reticulata Blanco",
        category: "理气药",
        subcategory: "理气药",
        nature: "温",
        tastes: ["辛", "苦"],
        meridians: ["脾经", "肺经"],
        functions: ["理气健脾", "燥湿化痰"],
        indications: ["脘腹胀满", "食少吐泻", "咳嗽痰多", "胸痹", "湿阻中焦"],
        usage: "煎服，3-10g。陈皮以久陈者为佳。",
        contraindications: ["阴虚燥咳者慎用", "内有实热者慎用"],
        tags: ["常用", "理气", "化痰"],
        keywords: ["腹胀", "健脾", "化痰", "咳嗽", "理气", "二陈汤"]
    },
    {
        id: "herb_052",
        name: "枳实",
        pinyin: "Zhi Shi",
        latinName: "Citrus aurantium L.",
        category: "理气药",
        subcategory: "理气药",
        nature: "微寒",
        tastes: ["苦", "辛", "酸"],
        meridians: ["脾经", "胃经"],
        functions: ["破气消积", "化痰散痞"],
        indications: ["食积气滞", "脘腹胀满", "便秘腹痛", "胸痹结胸", "痰滞气阻"],
        usage: "煎服，3-10g。炒用可缓其峻烈之性。孕妇慎用。",
        contraindications: ["脾胃虚弱者慎用", "孕妇慎用"],
        tags: ["常用", "破气", "消积"],
        keywords: ["腹胀", "食积", "便秘", "胸痹", "破气", "大承气汤"]
    },
    {
        id: "herb_053",
        name: "木香",
        pinyin: "Mu Xiang",
        latinName: "Aucklandia lappa Decne.",
        category: "理气药",
        subcategory: "理气药",
        nature: "温",
        tastes: ["辛", "苦"],
        meridians: ["脾经", "胃经", "大肠经", "胆经"],
        functions: ["行气止痛", "健脾消食"],
        indications: ["脘腹胀痛", "泻痢后重", "食积不消", "不思饮食", "胁肋胀痛"],
        usage: "煎服，3-6g。生用行气力强，煨用实肠止泻。不宜久煎，宜后下。",
        contraindications: ["阴虚津亏者慎用", "脏腑燥热者不宜"],
        tags: ["常用", "行气", "止痛"],
        keywords: ["腹胀", "腹痛", "泻痢", "消化不良", "行气", "木香顺气丸"]
    },
    {
        id: "herb_054",
        name: "香附",
        pinyin: "Xiang Fu",
        latinName: "Cyperus rotundus L.",
        category: "理气药",
        subcategory: "理气药",
        nature: "平",
        tastes: ["辛", "微苦", "微甘"],
        meridians: ["肝经", "脾经", "三焦经"],
        functions: ["疏肝解郁", "理气宽中", "调经止痛"],
        indications: ["肝郁气滞", "胁肋胀痛", "乳房胀痛", "月经不调", "经闭痛经", "胃痛腹痛"],
        usage: "煎服，6-10g。醋炙增强止痛之力。",
        contraindications: ["气虚无滞者慎用", "阴虚血热者慎用"],
        tags: ["常用", "疏肝", "调经"],
        keywords: ["肝郁", "胁痛", "月经不调", "痛经", "调经", "气病之总司"]
    },
    {
        id: "herb_055",
        name: "薤白",
        pinyin: "Xie Bai",
        latinName: "Allium macrostemon Bge.",
        category: "理气药",
        subcategory: "理气药",
        nature: "温",
        tastes: ["辛", "苦"],
        meridians: ["心经", "肺经", "胃经", "大肠经"],
        functions: ["通阳散结", "行气导滞"],
        indications: ["胸痹心痛", "胸闷刺痛", "脘腹痞满胀痛", "泻痢里急后重"],
        usage: "煎服，5-10g。或入丸散。鲜品可用至30-60g。",
        contraindications: ["气虚者不宜久服", "胃弱纳少者慎用"],
        tags: ["常用", "通阳", "散结"],
        keywords: ["胸痹", "心痛", "胸闷", "散结", "通阳", "瓜蒌薤白半夏汤"]
    },

    // ================================================================================
    // 九、消食药 — 以消食化积为主要功效 (3味)
    // ================================================================================

    {
        id: "herb_056",
        name: "山楂",
        pinyin: "Shan Zha",
        latinName: "Crataegus pinnatifida Bge.",
        category: "消食药",
        subcategory: "消食药",
        nature: "微温",
        tastes: ["酸", "甘"],
        meridians: ["脾经", "胃经", "肝经"],
        functions: ["消食健胃", "行气散瘀", "化浊降脂"],
        indications: ["肉食积滞", "胃脘胀满", "瘀血经闭", "产后瘀阻", "高脂血症", "泻痢腹痛"],
        usage: "煎服，9-12g，大剂量30g。生山楂活血化瘀，炒山楂消食化积。",
        contraindications: ["脾胃虚弱无积滞者慎用", "胃酸分泌过多者慎用"],
        tags: ["常用", "消食", "活血"],
        keywords: ["食积", "消化", "高血脂", "肉积", "瘀血", "山楂"]
    },
    {
        id: "herb_057",
        name: "神曲",
        pinyin: "Shen Qu",
        latinName: "Massa Medicata Fermentata",
        category: "消食药",
        subcategory: "消食药",
        nature: "温",
        tastes: ["甘", "辛"],
        meridians: ["脾经", "胃经"],
        functions: ["消食和胃", "解表"],
        indications: ["饮食停滞", "脘腹胀满", "食少纳呆", "外感兼食滞"],
        usage: "煎服，6-15g。炒用消食力强。",
        contraindications: ["无食积者不宜"],
        tags: ["常用", "消食", "和胃"],
        keywords: ["食积", "消化不良", "腹胀", "和胃", "健胃"]
    },
    {
        id: "herb_058",
        name: "麦芽",
        pinyin: "Mai Ya",
        latinName: "Hordeum vulgare L.",
        category: "消食药",
        subcategory: "消食药",
        nature: "平",
        tastes: ["甘"],
        meridians: ["脾经", "胃经"],
        functions: ["行气消食", "健脾开胃", "回乳消胀"],
        indications: ["食积不化", "脘腹胀满", "脾虚食少", "乳汁郁积", "妇女断乳", "肝郁胁痛"],
        usage: "煎服，10-15g，回乳可用至60-120g。生麦芽消食健胃；炒麦芽回乳消胀。",
        contraindications: ["哺乳期妇女不宜大量使用"],
        tags: ["常用", "消食", "回乳"],
        keywords: ["食积", "健脾", "回乳", "消食", "麦芽糖", "淀粉"]
    },

    // ================================================================================
    // 十、驱虫药 — 以驱除或杀灭肠道寄生虫为主要功效 (1味)
    // ================================================================================

    {
        id: "herb_059",
        name: "使君子",
        pinyin: "Shi Jun Zi",
        latinName: "Quisqualis indica L.",
        category: "驱虫药",
        subcategory: "驱虫药",
        nature: "温",
        tastes: ["甘"],
        meridians: ["脾经", "胃经"],
        functions: ["杀虫消积", "健脾"],
        indications: ["蛔虫病", "蛲虫病", "小儿疳积", "虫积腹痛"],
        usage: "去皮取仁嚼服，6-9g。小儿每岁1-1.5粒，每日总量不超过20粒。空腹服用。",
        contraindications: ["服药时忌饮浓茶", "忌食生冷油腻", "大量服用可致呃逆"],
        tags: ["驱虫", "健脾"],
        keywords: ["蛔虫", "蛲虫", "疳积", "杀虫", "虫积"]
    },

    // ================================================================================
    // 十一、止血药 — 以制止体内外出血为主要功效 (8味)
    // ================================================================================

    // 11.1 凉血止血药 (3味)
    {
        id: "herb_060",
        name: "小蓟",
        pinyin: "Xiao Ji",
        latinName: "Cirsium setosum (Willd.) MB.",
        category: "止血药",
        subcategory: "凉血止血药",
        nature: "凉",
        tastes: ["甘", "苦"],
        meridians: ["心经", "肝经"],
        functions: ["凉血止血", "散瘀解毒消痈"],
        indications: ["血热吐衄", "尿血血淋", "崩漏下血", "外伤出血", "痈肿疮毒"],
        usage: "煎服，5-12g，鲜品可用30-60g。止血多炒炭用，解毒消痈多生用。外用适量。",
        contraindications: ["脾胃虚寒者忌服", "无瘀滞者慎用"],
        tags: ["常用", "凉血", "止血"],
        keywords: ["血热", "尿血", "崩漏", "止血", "血淋", "小蓟饮子"]
    },
    {
        id: "herb_061",
        name: "地榆",
        pinyin: "Di Yu",
        latinName: "Sanguisorba officinalis L.",
        category: "止血药",
        subcategory: "凉血止血药",
        nature: "微寒",
        tastes: ["苦", "酸", "涩"],
        meridians: ["肝经", "大肠经"],
        functions: ["凉血止血", "解毒敛疮"],
        indications: ["便血痔血", "血痢崩漏", "水火烫伤", "痈肿疮毒", "湿疹"],
        usage: "煎服，9-15g。止血多炒炭用。外用适量，研末调敷。",
        contraindications: ["虚寒性出血者忌服", "大面积烧伤者不宜外涂"],
        tags: ["常用", "凉血", "敛疮"],
        keywords: ["便血", "痔血", "崩漏", "烫伤", "止血", "痔疮"]
    },
    {
        id: "herb_062",
        name: "白茅根",
        pinyin: "Bai Mao Gen",
        latinName: "Imperata cylindrica Beauv. var. major (Nees) C.E.Hubb.",
        category: "止血药",
        subcategory: "凉血止血药",
        nature: "寒",
        tastes: ["甘"],
        meridians: ["肺经", "胃经", "膀胱经"],
        functions: ["凉血止血", "清热利尿"],
        indications: ["血热吐衄", "咳血尿血", "热淋涩痛", "水肿黄疸", "热病烦渴"],
        usage: "煎服，9-30g，鲜品加倍。以鲜者为佳。",
        contraindications: ["脾胃虚寒者忌服", "溲多不渴者不宜"],
        tags: ["常用", "凉血", "利尿"],
        keywords: ["血热", "尿血", "咳血", "利尿", "止血", "茅根"]
    },

    // 11.2 化瘀止血药 (2味)
    {
        id: "herb_063",
        name: "三七",
        pinyin: "San Qi",
        latinName: "Panax notoginseng (Burk.) F.H.Chen",
        category: "止血药",
        subcategory: "化瘀止血药",
        nature: "温",
        tastes: ["甘", "微苦"],
        meridians: ["肝经", "胃经"],
        functions: ["散瘀止血", "消肿定痛"],
        indications: ["咯血吐血", "衄血便血", "崩漏外伤出血", "胸腹刺痛", "跌扑肿痛"],
        usage: "研粉吞服，1-3g/次。煎服3-9g。外用适量，研末调敷。",
        contraindications: ["孕妇慎用", "阴虚血热出血者不宜"],
        tags: ["常用", "名贵", "止血"],
        keywords: ["止血", "化瘀", "跌打", "散瘀", "外伤", "三七粉", "金不换"]
    },
    {
        id: "herb_064",
        name: "蒲黄",
        pinyin: "Pu Huang",
        latinName: "Typha angustifolia L.",
        category: "止血药",
        subcategory: "化瘀止血药",
        nature: "平",
        tastes: ["甘"],
        meridians: ["肝经", "心包经"],
        functions: ["止血化瘀", "通淋"],
        indications: ["吐血衄血", "咯血崩漏", "外伤出血", "血淋涩痛", "经闭痛经"],
        usage: "煎服，5-10g，宜包煎。止血多炒用，化瘀多生用。外用适量。",
        contraindications: ["孕妇慎用"],
        tags: ["常用", "止血", "化瘀"],
        keywords: ["止血", "化瘀", "血淋", "崩漏", "包煎", "蒲黄"]
    },

    // 11.3 收敛止血药 (2味)
    {
        id: "herb_065",
        name: "白及",
        pinyin: "Bai Ji",
        latinName: "Bletilla striata (Thunb.) Reichb.f.",
        category: "止血药",
        subcategory: "收敛止血药",
        nature: "微寒",
        tastes: ["苦", "甘", "涩"],
        meridians: ["肺经", "肝经", "胃经"],
        functions: ["收敛止血", "消肿生肌"],
        indications: ["咳血吐血", "外伤出血", "疮疡肿毒", "皮肤皲裂", "肺痈咯血"],
        usage: "煎服，6-15g；研末吞服3-6g。外用适量。不宜与川乌、制川乌、草乌、制草乌、附子同用。",
        contraindications: ["外感咳血者慎用", "脾胃有实热者不宜", "不宜与乌头类同用"],
        tags: ["常用", "止血", "生肌"],
        keywords: ["咳血", "吐血", "止血", "生肌", "敛疮", "胃出血"]
    },
    {
        id: "herb_066",
        name: "仙鹤草",
        pinyin: "Xian He Cao",
        latinName: "Agrimonia pilosa Ledeb.",
        category: "止血药",
        subcategory: "收敛止血药",
        nature: "平",
        tastes: ["苦", "涩"],
        meridians: ["心经", "肝经"],
        functions: ["收敛止血", "截疟止痢", "解毒杀虫", "补虚"],
        indications: ["各种出血证", "疟疾寒热", "痢疾", "痈肿疮毒", "脱力劳伤", "阴痒带下"],
        usage: "煎服，6-12g。外用适量。治脱力劳伤可用至30-60g。",
        contraindications: ["表证发热者慎用"],
        tags: ["常用", "止血", "补虚"],
        keywords: ["止血", "疟疾", "痢疾", "脱力", "劳伤", "收敛"]
    },

    // 11.4 温经止血药 (1味)
    {
        id: "herb_067",
        name: "艾叶",
        pinyin: "Ai Ye",
        latinName: "Artemisia argyi Levl. et Vant.",
        category: "止血药",
        subcategory: "温经止血药",
        nature: "温",
        tastes: ["辛", "苦"],
        meridians: ["肝经", "脾经", "肾经"],
        functions: ["温经止血", "散寒止痛", "调经安胎", "祛湿止痒"],
        indications: ["虚寒性出血", "崩漏经多", "少腹冷痛", "经寒不调", "宫冷不孕", "皮肤瘙痒"],
        usage: "煎服，3-9g。止血宜炒炭用，温经散寒宜生用。外用适量，供灸治或熏洗。",
        contraindications: ["阴虚血热者慎用", "孕妇火热证者不宜"],
        tags: ["常用", "温经", "灸法"],
        keywords: ["虚寒", "崩漏", "经寒", "温经", "艾灸", "痛经", "胎漏"]
    },

    // ================================================================================
    // 十二、活血化瘀药 — 以通利血脉、消散瘀滞为主要功效 (9味)
    // ================================================================================

    // 12.1 活血止痛药 (3味)
    {
        id: "herb_068",
        name: "川芎",
        pinyin: "Chuan Xiong",
        latinName: "Ligusticum chuanxiong Hort.",
        category: "活血化瘀药",
        subcategory: "活血止痛药",
        nature: "温",
        tastes: ["辛"],
        meridians: ["肝经", "胆经", "心包经"],
        functions: ["活血行气", "祛风止痛"],
        indications: ["胸痹心痛", "胸胁刺痛", "月经不调", "经闭痛经", "头痛眩晕", "风湿痹痛"],
        usage: "煎服，3-10g。酒炙可增强活血之力。",
        contraindications: ["阴虚火旺者慎用", "月经过多者慎用", "孕妇慎用"],
        tags: ["常用", "活血", "止痛"],
        keywords: ["活血", "行气", "头痛", "月经不调", "痹痛", "血中气药"]
    },
    {
        id: "herb_069",
        name: "延胡索",
        pinyin: "Yan Hu Suo",
        latinName: "Corydalis yanhusuo W.T.Wang",
        category: "活血化瘀药",
        subcategory: "活血止痛药",
        nature: "温",
        tastes: ["辛", "苦"],
        meridians: ["肝经", "脾经"],
        functions: ["活血行气止痛"],
        indications: ["胸胁脘腹疼痛", "经闭痛经", "产后瘀阻", "跌扑肿痛", "各种内外痛证"],
        usage: "煎服，3-10g。研末吞服1.5-3g/次。醋制可增强止痛之力。",
        contraindications: ["血热气虚者慎用", "孕妇忌用"],
        tags: ["常用", "止痛", "活血"],
        keywords: ["止痛", "活血", "行气", "痛经", "胃痛", "元胡"]
    },
    {
        id: "herb_070",
        name: "郁金",
        pinyin: "Yu Jin",
        latinName: "Curcuma wenyujin Y.H.Chen et C.Ling",
        category: "活血化瘀药",
        subcategory: "活血止痛药",
        nature: "寒",
        tastes: ["辛", "苦"],
        meridians: ["肝经", "心经", "肺经", "胆经"],
        functions: ["活血止痛", "行气解郁", "清心凉血", "利胆退黄"],
        indications: ["胸胁刺痛", "经闭痛经", "热病神昏", "癫痫发狂", "黄疸尿赤", "吐血衄血"],
        usage: "煎服，3-10g。不宜与丁香同用。",
        contraindications: ["孕妇慎用", "不宜与丁香同用", "阴虚失血者不宜"],
        tags: ["常用", "活血", "解郁"],
        keywords: ["活血", "解郁", "凉血", "退黄", "行气", "郁金"]
    },

    // 12.2 活血调经药 (4味)
    {
        id: "herb_071",
        name: "丹参",
        pinyin: "Dan Shen",
        latinName: "Salvia miltiorrhiza Bge.",
        category: "活血化瘀药",
        subcategory: "活血调经药",
        nature: "微寒",
        tastes: ["苦"],
        meridians: ["心经", "肝经"],
        functions: ["活血祛瘀", "通经止痛", "清心除烦", "凉血消痈"],
        indications: ["胸痹心痛", "脘腹胁痛", "月经不调", "痛经经闭", "疮疡肿痛", "心烦不眠"],
        usage: "煎服，10-15g。酒炙可增强活血化瘀之力。不宜与藜芦同用。",
        contraindications: ["不宜与藜芦同用", "孕妇慎用", "无瘀滞者不宜"],
        tags: ["常用", "活血", "调经"],
        keywords: ["活血", "调经", "胸痹", "失眠", "心血管", "一味丹参功同四物"]
    },
    {
        id: "herb_072",
        name: "红花",
        pinyin: "Hong Hua",
        latinName: "Carthamus tinctorius L.",
        category: "活血化瘀药",
        subcategory: "活血调经药",
        nature: "温",
        tastes: ["辛"],
        meridians: ["心经", "肝经"],
        functions: ["活血通经", "散瘀止痛"],
        indications: ["经闭痛经", "恶露不行", "胸痹心痛", "瘀滞腹痛", "跌打损伤", "疮疡肿痛"],
        usage: "煎服，3-10g。孕妇慎用。有出血倾向者不宜多用。",
        pregnancyNote: "孕妇慎用（活血）",
        contraindications: ["孕妇忌服", "月经过多者忌服", "有出血倾向者慎用"],
        tags: ["常用", "活血", "调经"],
        keywords: ["活血", "通经", "痛经", "跌打", "化瘀", "红花"]
    },
    {
        id: "herb_073",
        name: "桃仁",
        pinyin: "Tao Ren",
        latinName: "Prunus persica (L.) Batsch",
        category: "活血化瘀药",
        subcategory: "活血调经药",
        nature: "平",
        tastes: ["苦", "甘"],
        meridians: ["心经", "肝经", "大肠经"],
        functions: ["活血祛瘀", "润肠通便", "止咳平喘"],
        indications: ["经闭痛经", "产后瘀滞", "跌打损伤", "肠燥便秘", "咳嗽气喘", "肺痈肠痈"],
        usage: "煎服，5-10g。宜捣碎入煎。孕妇禁用。",
        pregnancyNote: "孕妇慎用（活血）",
        contraindications: ["孕妇忌用", "血虚者慎用", "便溏者慎用"],
        tags: ["常用", "活血", "通便"],
        keywords: ["活血", "调经", "便秘", "止咳", "化瘀", "桃仁"]
    },
    {
        id: "herb_074",
        name: "益母草",
        pinyin: "Yi Mu Cao",
        latinName: "Leonurus japonicus Houtt.",
        category: "活血化瘀药",
        subcategory: "活血调经药",
        nature: "微寒",
        tastes: ["苦", "辛"],
        meridians: ["肝经", "心包经", "膀胱经"],
        functions: ["活血调经", "利尿消肿", "清热解毒"],
        indications: ["月经不调", "痛经经闭", "产后恶露不尽", "水肿尿少", "跌打损伤", "疮痈肿毒"],
        usage: "煎服，9-30g，鲜品加倍。或熬膏服。外用适量。",
        contraindications: ["孕妇忌用", "阴虚血少者慎用"],
        tags: ["常用", "调经", "产后"],
        keywords: ["调经", "产后", "活血", "水肿", "痛经", "益母"]
    },

    // 12.3 活血疗伤药 (1味)
    {
        id: "herb_075",
        name: "骨碎补",
        pinyin: "Gu Sui Bu",
        latinName: "Drynaria fortunei (Kunze) J.Sm.",
        category: "活血化瘀药",
        subcategory: "活血疗伤药",
        nature: "温",
        tastes: ["苦"],
        meridians: ["肝经", "肾经"],
        functions: ["疗伤止痛", "补肾强骨"],
        indications: ["跌扑闪挫", "筋骨折伤", "肾虚腰痛", "耳鸣耳聋", "牙齿松动", "久泻"],
        usage: "煎服，3-9g。外用适量，研末调敷或浸酒。",
        contraindications: ["阴虚火旺者忌服", "无瘀滞者慎用"],
        tags: ["常用", "疗伤", "补肾"],
        keywords: ["跌打", "骨折", "补肾", "腰痛", "外伤", "骨碎"]
    },

    // 12.4 破血消癥药 (1味)
    {
        id: "herb_076",
        name: "莪术",
        pinyin: "E Zhu",
        latinName: "Curcuma zedoaria (Christm.) Rosc.",
        category: "活血化瘀药",
        subcategory: "破血消癥药",
        nature: "温",
        tastes: ["辛", "苦"],
        meridians: ["肝经", "脾经"],
        functions: ["破血行气", "消积止痛"],
        indications: ["癥瘕积聚", "瘀血经闭", "食积气滞", "脘腹胀痛", "早期肝硬化腹水"],
        usage: "煎服，6-9g。醋制可增强破血止痛之力。孕妇禁用。",
        pregnancyNote: "孕妇忌用（破血行气）",
        contraindications: ["孕妇忌用", "月经过多者忌服", "体虚者慎用"],
        tags: ["活血", "破血"],
        keywords: ["癥瘕", "经闭", "消积", "破血", "积滞", "三棱"]
    },

    // ================================================================================
    // 十三、化痰止咳平喘药 — 以祛痰或消痰、制止咳嗽喘息为主要功效 (9味)
    // ================================================================================

    // 13.1 温化寒痰药 (3味)
    {
        id: "herb_077",
        name: "半夏",
        pinyin: "Ban Xia",
        latinName: "Pinellia ternata (Thunb.) Breit.",
        category: "化痰止咳平喘药",
        subcategory: "温化寒痰药",
        nature: "温",
        tastes: ["辛"],
        meridians: ["脾经", "胃经", "肺经"],
        functions: ["燥湿化痰", "降逆止呕", "消痞散结"],
        indications: ["湿痰寒痰", "咳嗽痰多", "痰饮眩晕", "呕吐反胃", "胸脘痞满", "梅核气"],
        usage: "煎服，3-9g。法半夏偏于燥湿，姜半夏偏于止呕，清半夏偏于化痰。不宜与川乌、草乌、附子同用。",
        contraindications: ["阴虚燥咳者忌服", "血证患者慎用", "不宜与乌头类同用"],
        tags: ["常用", "化痰", "止呕"],
        keywords: ["痰多", "呕吐", "燥湿", "散结", "二陈汤", "温化"]
    },
    {
        id: "herb_078",
        name: "天南星",
        pinyin: "Tian Nan Xing",
        latinName: "Arisaema erubescens (Wall.) Schott",
        category: "化痰止咳平喘药",
        subcategory: "温化寒痰药",
        nature: "温",
        tastes: ["苦", "辛"],
        meridians: ["肺经", "肝经", "脾经"],
        functions: ["燥湿化痰", "祛风止痉", "散结消肿"],
        indications: ["顽痰咳嗽", "风痰眩晕", "中风痰壅", "癫痫惊风", "破伤风", "痈肿瘰疬"],
        usage: "煎服，3-9g，一般炮制后使用。外用适量，生品研末以醋或酒调敷。",
        contraindications: ["孕妇慎用", "阴虚燥咳者忌服"],
        tags: ["有毒", "化痰", "止痉"],
        keywords: ["顽痰", "风痰", "眩晕", "癫痫", "祛风", "胆南星"]
    },
    {
        id: "herb_079",
        name: "白芥子",
        pinyin: "Bai Jie Zi",
        latinName: "Sinapis alba L.",
        category: "化痰止咳平喘药",
        subcategory: "温化寒痰药",
        nature: "温",
        tastes: ["辛"],
        meridians: ["肺经"],
        functions: ["温肺豁痰利气", "散结通络止痛"],
        indications: ["寒痰咳嗽", "胸胁胀痛", "痰滞经络", "关节麻木疼痛", "痰湿流注", "阴疽肿毒"],
        usage: "煎服，3-9g。外用适量，研末调敷。",
        contraindications: ["肺虚久咳者忌服", "皮肤过敏者外用慎用"],
        tags: ["化痰", "散结"],
        keywords: ["寒痰", "咳嗽", "通络", "痹痛", "流注", "芥子"]
    },

    // 13.2 清化热痰药 (3味)
    {
        id: "herb_080",
        name: "川贝母",
        pinyin: "Chuan Bei Mu",
        latinName: "Fritillaria cirrhosa D.Don",
        category: "化痰止咳平喘药",
        subcategory: "清化热痰药",
        nature: "微寒",
        tastes: ["苦", "甘"],
        meridians: ["肺经", "心经"],
        functions: ["清热润肺", "化痰止咳", "散结消痈"],
        indications: ["肺热燥咳", "阴虚劳嗽", "痰少咽燥", "瘰疬乳痈", "肺痈"],
        usage: "煎服，3-9g；研末冲服1-2g/次。不宜与川乌、草乌、附子同用。",
        contraindications: ["寒痰湿痰者不宜", "脾胃虚寒者慎用", "不宜与乌头类同用"],
        tags: ["常用", "名贵", "止咳"],
        keywords: ["燥咳", "阴虚", "止咳", "化痰", "肺热", "贝母"]
    },
    {
        id: "herb_081",
        name: "瓜蒌",
        pinyin: "Gua Lou",
        latinName: "Trichosanthes kirilowii Maxim.",
        category: "化痰止咳平喘药",
        subcategory: "清化热痰药",
        nature: "寒",
        tastes: ["甘", "微苦"],
        meridians: ["肺经", "胃经", "大肠经"],
        functions: ["清热化痰", "宽胸散结", "润肠通便"],
        indications: ["肺热咳嗽", "痰稠难咯", "胸痹心痛", "结胸痞满", "肠燥便秘", "乳痈"],
        usage: "煎服，9-15g。瓜蒌皮偏于化痰，瓜蒌仁偏于润肠。不宜与川乌、草乌、附子同用。",
        contraindications: ["脾胃虚寒便溏者忌服", "寒痰湿痰者不宜", "不宜与乌头类同用"],
        tags: ["常用", "化痰", "散结"],
        keywords: ["痰热", "胸痹", "便秘", "散结", "咳嗽", "瓜蒌薤白"]
    },
    {
        id: "herb_082",
        name: "竹茹",
        pinyin: "Zhu Ru",
        latinName: "Bambusa tuldoides Munro",
        category: "化痰止咳平喘药",
        subcategory: "清化热痰药",
        nature: "微寒",
        tastes: ["甘"],
        meridians: ["肺经", "胃经", "心经", "胆经"],
        functions: ["清热化痰", "除烦止呕"],
        indications: ["痰热咳嗽", "胆火挟痰", "烦热呕吐", "惊悸失眠", "中风痰迷"],
        usage: "煎服，5-10g。姜炙可增强止呕之力。",
        contraindications: ["寒痰咳嗽者不宜", "胃寒呕吐者慎用"],
        tags: ["常用", "化痰", "止呕"],
        keywords: ["痰热", "咳嗽", "呕吐", "止呕", "化痰", "温胆汤"]
    },

    // 13.3 止咳平喘药 (3味)
    {
        id: "herb_083",
        name: "苦杏仁",
        pinyin: "Ku Xing Ren",
        latinName: "Prunus armeniaca L. var. ansu Maxim.",
        category: "化痰止咳平喘药",
        subcategory: "止咳平喘药",
        nature: "微温",
        tastes: ["苦"],
        meridians: ["肺经", "大肠经"],
        functions: ["降气止咳平喘", "润肠通便"],
        indications: ["咳嗽气喘", "胸满痰多", "肠燥便秘"],
        usage: "煎服，5-10g。宜打碎入煎。生品入煎剂宜后下。有小毒，不宜过量。",
        contraindications: ["阴虚咳嗽者慎用", "大便溏泻者不宜", "婴儿慎用"],
        tags: ["常用", "止咳", "平喘"],
        keywords: ["咳嗽", "气喘", "便秘", "平喘", "止咳", "杏仁"]
    },
    {
        id: "herb_084",
        name: "百部",
        pinyin: "Bai Bu",
        latinName: "Stemona sessilifolia (Miq.) Miq.",
        category: "化痰止咳平喘药",
        subcategory: "止咳平喘药",
        nature: "微温",
        tastes: ["甘", "苦"],
        meridians: ["肺经"],
        functions: ["润肺下气止咳", "杀虫灭虱"],
        indications: ["新久咳嗽", "肺痨咳嗽", "百日咳", "阴虚劳咳", "头虱体虱", "蛲虫病"],
        usage: "煎服，3-9g。蜜炙可增强润肺止咳之力。外用适量。",
        contraindications: ["脾虚食少便溏者慎用"],
        tags: ["常用", "止咳", "杀虫"],
        keywords: ["咳嗽", "肺痨", "百日咳", "杀虫", "止咳", "润肺"]
    },
    {
        id: "herb_085",
        name: "桑白皮",
        pinyin: "Sang Bai Pi",
        latinName: "Morus alba L.",
        category: "化痰止咳平喘药",
        subcategory: "止咳平喘药",
        nature: "寒",
        tastes: ["甘"],
        meridians: ["肺经"],
        functions: ["泻肺平喘", "利水消肿"],
        indications: ["肺热喘咳", "水肿胀满尿少", "面目肌肤浮肿"],
        usage: "煎服，6-12g。蜜炙可增强润肺平喘之力。",
        contraindications: ["肺虚无热者不宜", "风寒咳嗽者不宜"],
        tags: ["常用", "平喘", "消肿"],
        keywords: ["肺热", "喘咳", "水肿", "泻肺", "利水", "桑白皮汤"]
    },

    // ================================================================================
    // 十四、安神药 — 以安定神志为主要功效 (5味)
    // ================================================================================

    // 14.1 重镇安神药 (2味)
    {
        id: "herb_086",
        name: "朱砂",
        pinyin: "Zhu Sha",
        latinName: "Cinnabaris",
        category: "安神药",
        subcategory: "重镇安神药",
        nature: "微寒",
        tastes: ["甘"],
        meridians: ["心经"],
        functions: ["清心镇惊", "安神明目", "解毒"],
        indications: ["心悸易惊", "失眠多梦", "癫痫发狂", "小儿惊风", "视物昏花", "疮疡肿毒"],
        usage: "多入丸散，0.1-0.5g。不宜入煎剂。外用适量。本品有毒，不可过量或持续服用。",
        toxicNote: { limit: "0.1~0.5g，入丸散，不宜久服", note: "含硫化汞，肝肾功能不全者忌用" },
        contraindications: ["肝肾功能不全者禁用", "孕妇禁用", "忌火煅"],
        tags: ["有毒", "安神", "镇惊"],
        keywords: ["心悸", "失眠", "惊风", "癫痫", "安神", "镇心"]
    },
    {
        id: "herb_087",
        name: "龙骨",
        pinyin: "Long Gu",
        latinName: "Os Draconis",
        category: "安神药",
        subcategory: "重镇安神药",
        nature: "平",
        tastes: ["甘", "涩"],
        meridians: ["心经", "肝经", "肾经"],
        functions: ["镇惊安神", "平肝潜阳", "收敛固涩"],
        indications: ["心悸失眠", "健忘多梦", "肝阳上亢眩晕", "遗精滑泄", "自汗盗汗", "崩漏带下"],
        usage: "煎服，15-30g。宜先煎。外用适量，研末撒或调敷。",
        contraindications: ["湿热积滞者慎用"],
        tags: ["常用", "安神", "固涩"],
        keywords: ["心悸", "失眠", "平肝", "遗精", "固涩", "潜阳"]
    },

    // 14.2 养心安神药 (3味)
    {
        id: "herb_088",
        name: "酸枣仁",
        pinyin: "Suan Zao Ren",
        latinName: "Ziziphus jujuba Mill. var. spinosa (Bunge) Hu ex H.F.Chou",
        category: "安神药",
        subcategory: "养心安神药",
        nature: "平",
        tastes: ["甘", "酸"],
        meridians: ["心经", "肝经", "胆经"],
        functions: ["养心补肝", "宁心安神", "敛汗生津"],
        indications: ["虚烦不眠", "惊悸多梦", "体虚多汗", "津伤口渴"],
        usage: "煎服，10-15g。研末吞服1.5-2g/次。炒枣仁偏于安神，生枣仁偏于清肝胆热。",
        contraindications: ["实邪郁火者慎用", "滑泄者不宜"],
        tags: ["常用", "安神", "助眠"],
        keywords: ["失眠", "多梦", "虚烦", "安神", "酸枣仁汤", "助眠"]
    },
    {
        id: "herb_089",
        name: "远志",
        pinyin: "Yuan Zhi",
        latinName: "Polygala tenuifolia Willd.",
        category: "安神药",
        subcategory: "养心安神药",
        nature: "温",
        tastes: ["苦", "辛"],
        meridians: ["心经", "肾经", "肺经"],
        functions: ["安神益智", "交通心肾", "祛痰消肿"],
        indications: ["心肾不交", "失眠多梦", "健忘惊悸", "神志恍惚", "咳痰不爽", "疮疡肿毒"],
        usage: "煎服，3-10g。外用适量。",
        contraindications: ["有胃溃疡或胃炎者慎用"],
        tags: ["常用", "安神", "益智"],
        keywords: ["失眠", "健忘", "心肾不交", "安神", "益智", "定志"]
    },
    {
        id: "herb_090",
        name: "合欢皮",
        pinyin: "He Huan Pi",
        latinName: "Albizia julibrissin Durazz.",
        category: "安神药",
        subcategory: "养心安神药",
        nature: "平",
        tastes: ["甘"],
        meridians: ["心经", "肝经", "肺经"],
        functions: ["解郁安神", "活血消肿"],
        indications: ["心神不安", "忧郁失眠", "肺痈疮肿", "跌扑伤痛"],
        usage: "煎服，6-12g。外用适量。",
        contraindications: ["孕妇慎用"],
        tags: ["安神", "解郁"],
        keywords: ["失眠", "忧鬱", "安神", "解郁", "悦心", "合欢"]
    },

    // ================================================================================
    // 十五、平肝息风药 — 以平肝潜阳或息风止痉为主要功效 (6味)
    // ================================================================================

    // 15.1 平抑肝阳药 (3味)
    {
        id: "herb_091",
        name: "石决明",
        pinyin: "Shi Jue Ming",
        latinName: "Haliotis diversicolor Reeve",
        category: "平肝息风药",
        subcategory: "平抑肝阳药",
        nature: "寒",
        tastes: ["咸"],
        meridians: ["肝经"],
        functions: ["平肝潜阳", "清肝明目"],
        indications: ["肝阳上亢", "头痛眩晕", "目赤肿痛", "翳膜遮睛", "视物昏花"],
        usage: "煎服，6-20g。宜打碎先煎。生用潜阳力强，煅用收敛制酸。",
        contraindications: ["脾胃虚寒者慎用", "消化不良者不宜"],
        tags: ["常用", "平肝", "明目"],
        keywords: ["肝阳", "眩晕", "目赤", "明目", "潜阳", "高血压"]
    },
    {
        id: "herb_092",
        name: "牡蛎",
        pinyin: "Mu Li",
        latinName: "Ostrea gigas Thunberg",
        category: "平肝息风药",
        subcategory: "平抑肝阳药",
        nature: "微寒",
        tastes: ["咸", "涩"],
        meridians: ["肝经", "肾经"],
        functions: ["潜阳补阴", "软坚散结", "收敛固涩", "制酸止痛"],
        indications: ["肝阳上亢眩晕", "惊悸失眠", "瘰疬痰核", "癥瘕积聚", "自汗盗汗", "遗精崩带"],
        usage: "煎服，9-30g。宜打碎先煎。生牡蛎潜阳散结，煅牡蛎收敛固涩。",
        contraindications: ["不宜与麻黄、吴茱萸同用", "虚而有寒者慎用"],
        tags: ["常用", "潜阳", "固涩"],
        keywords: ["肝阳", "眩晕", "瘰疬", "固涩", "自汗", "盗汗"]
    },
    {
        id: "herb_093",
        name: "代赭石",
        pinyin: "Dai Zhe Shi",
        latinName: "Haematitum",
        category: "平肝息风药",
        subcategory: "平抑肝阳药",
        nature: "寒",
        tastes: ["苦"],
        meridians: ["肝经", "心经", "肺经", "胃经"],
        functions: ["平肝潜阳", "重镇降逆", "凉血止血"],
        indications: ["肝阳上亢眩晕", "呃逆呕吐", "噫气呕逆", "血热吐衄", "崩漏"],
        usage: "煎服，9-30g。宜打碎先煎。降逆宜生用，止血宜煅用。",
        contraindications: ["孕妇慎用", "不宜长期服用"],
        tags: ["常用", "平肝", "降逆"],
        keywords: ["肝阳", "眩晕", "呃逆", "呕吐", "降逆", "代赭石"]
    },

    // 15.2 息风止痉药 (3味)
    {
        id: "herb_094",
        name: "天麻",
        pinyin: "Tian Ma",
        latinName: "Gastrodia elata Bl.",
        category: "平肝息风药",
        subcategory: "息风止痉药",
        nature: "平",
        tastes: ["甘"],
        meridians: ["肝经"],
        functions: ["息风止痉", "平抑肝阳", "祛风通络"],
        indications: ["肝风内动", "惊痫抽搐", "眩晕头痛", "风湿痹痛", "肢体麻木", "半身不遂"],
        usage: "煎服，3-10g。研末冲服1-1.5g/次。",
        contraindications: ["气血虚甚者慎用"],
        tags: ["常用", "名贵", "息风"],
        keywords: ["眩晕", "头痛", "抽搐", "麻木", "息风", "天麻钩藤饮"]
    },
    {
        id: "herb_095",
        name: "钩藤",
        pinyin: "Gou Teng",
        latinName: "Uncaria rhynchophylla (Miq.) Miq. ex Havil.",
        category: "平肝息风药",
        subcategory: "息风止痉药",
        nature: "凉",
        tastes: ["甘"],
        meridians: ["肝经", "心包经"],
        functions: ["息风止痉", "清热平肝"],
        indications: ["肝风内动", "惊痫抽搐", "高热惊厥", "眩晕头痛", "小儿惊风", "妊娠子痫"],
        usage: "煎服，3-12g。宜后下，不宜久煎。",
        contraindications: ["脾胃虚寒者慎用"],
        tags: ["常用", "息风", "清热"],
        keywords: ["抽搐", "眩晕", "头痛", "惊风", "息风", "钩藤"]
    },
    {
        id: "herb_096",
        name: "全蝎",
        pinyin: "Quan Xie",
        latinName: "Buthus martensii Karsch",
        category: "平肝息风药",
        subcategory: "息风止痉药",
        nature: "平",
        tastes: ["辛"],
        meridians: ["肝经"],
        functions: ["息风镇痉", "通络止痛", "攻毒散结"],
        indications: ["肝风内动", "痉挛抽搐", "口眼歪斜", "半身不遂", "破伤风", "风湿顽痹", "偏正头痛"],
        usage: "煎服，3-6g。研末吞服0.6-1g/次。外用适量。本品有毒，用量不宜过大。",
        contraindications: ["孕妇忌用", "血虚生风者慎用"],
        tags: ["有毒", "息风", "通络"],
        keywords: ["抽搐", "口眼歪斜", "头痛", "通络", "中风", "全蝎"]
    },

    // ================================================================================
    // 十六、开窍药 — 以开窍醒神为主要功效 (2味)
    // ================================================================================

    {
        id: "herb_097",
        name: "麝香",
        pinyin: "She Xiang",
        latinName: "Moschus berezovskii Flerov",
        category: "开窍药",
        subcategory: "开窍药",
        nature: "温",
        tastes: ["辛"],
        meridians: ["心经", "脾经"],
        functions: ["开窍醒神", "活血通经", "消肿止痛"],
        indications: ["热闭神昏", "中风痰厥", "气郁暴厥", "经闭癥瘕", "难产死胎", "跌打损伤", "痈肿瘰疬"],
        usage: "入丸散用，0.03-0.1g。不宜入煎剂。外用适量。孕妇禁用。",
        pregnancyNote: "孕妇禁用",
        contraindications: ["孕妇忌用", "脱证忌用"],
        tags: ["名贵", "开窍", "急救"],
        keywords: ["神昏", "中风", "开窍", "活血", "急救", "麝香"]
    },
    {
        id: "herb_098",
        name: "冰片",
        pinyin: "Bing Pian",
        latinName: "Borneolum Syntheticum",
        category: "开窍药",
        subcategory: "开窍药",
        nature: "微寒",
        tastes: ["辛", "苦"],
        meridians: ["心经", "脾经", "肺经"],
        functions: ["开窍醒神", "清热止痛"],
        indications: ["热病神昏", "惊厥", "目赤肿痛", "喉痹口疮", "疮疡肿痛"],
        usage: "入丸散用，0.15-0.3g。不宜入煎剂。外用适量，研末调敷。",
        contraindications: ["孕妇慎用", "气血虚者慎用"],
        tags: ["常用", "开窍", "清热"],
        keywords: ["神昏", "开窍", "目赤", "喉痹", "口疮", "醒神"]
    },

    // ================================================================================
    // 十七、补虚药 — 以补益气血阴阳为主要功效 (14味)
    // ================================================================================

    // 17.1 补气药 (4味)
    {
        id: "herb_099",
        name: "人参",
        pinyin: "Ren Shen",
        latinName: "Panax ginseng C.A.Mey.",
        category: "补虚药",
        subcategory: "补气药",
        nature: "温",
        tastes: ["甘", "微苦"],
        meridians: ["脾经", "肺经", "心经", "肾经"],
        functions: ["大补元气", "复脉固脱", "补脾益肺", "生津养血", "安神益智"],
        indications: ["体虚欲脱", "肢冷脉微", "脾虚食少", "肺虚喘咳", "气短乏力", "津伤口渴", "内热消渴", "久病虚羸", "惊悸失眠", "阳痿宫冷"],
        usage: "煎服，3-9g。挽救虚脱可用15-30g。宜文火另煎兑服。不宜与藜芦同用。",
        contraindications: ["实证、热证而正气不虚者忌服", "不宜与藜芦、五灵脂同用", "阴虚火旺者慎用"],
        tags: ["常用", "名贵", "补气"],
        keywords: ["气虚", "元气", "补气", "脱证", "虚劳", "独参汤"]
    },
    {
        id: "herb_100",
        name: "黄芪",
        pinyin: "Huang Qi",
        latinName: "Astragalus membranaceus (Fisch.) Bge.",
        category: "补虚药",
        subcategory: "补气药",
        nature: "微温",
        tastes: ["甘"],
        meridians: ["脾经", "肺经"],
        functions: ["补气升阳", "固表止汗", "利水消肿", "托毒排脓", "生津养血", "行滞通痹"],
        indications: ["脾肺气虚", "气短乏力", "食少便溏", "中气下陷", "久泻脱肛", "自汗盗汗", "水肿", "疮疡久溃不敛", "血虚萎黄", "半身不遂痹痛"],
        usage: "煎服，9-30g。炙黄芪偏于益气补中，生黄芪偏于固表利水托疮。",
        contraindications: ["表实邪盛者忌服", "气滞湿阻者慎用", "阴虚阳亢者慎用"],
        tags: ["常用", "补气", "扶正"],
        keywords: ["气虚", "补气", "固表", "水肿", "疮疡", "玉屏风散"]
    },
    {
        id: "herb_101",
        name: "白术",
        pinyin: "Bai Zhu",
        latinName: "Atractylodes macrocephala Koidz.",
        category: "补虚药",
        subcategory: "补气药",
        nature: "温",
        tastes: ["苦", "甘"],
        meridians: ["脾经", "胃经"],
        functions: ["健脾益气", "燥湿利水", "止汗安胎"],
        indications: ["脾虚食少", "腹胀泄泻", "痰饮眩悸", "水肿", "自汗", "胎动不安"],
        usage: "煎服，6-12g。燥湿利水宜生用，健脾益气宜炒用。",
        contraindications: ["阴虚燥渴者忌服", "气滞胀闷者不宜"],
        tags: ["常用", "健脾", "燥湿"],
        keywords: ["脾虚", "泄泻", "水肿", "健脾", "安胎", "白术"]
    },
    {
        id: "herb_102",
        name: "甘草",
        pinyin: "Gan Cao",
        latinName: "Glycyrrhiza uralensis Fisch.",
        category: "补虚药",
        subcategory: "补气药",
        nature: "平",
        tastes: ["甘"],
        meridians: ["心经", "肺经", "脾经", "胃经"],
        functions: ["补脾益气", "清热解毒", "祛痰止咳", "缓急止痛", "调和诸药"],
        indications: ["脾胃虚弱", "倦怠乏力", "心悸气短", "咳嗽痰多", "脘腹挛急疼痛", "痈肿疮毒", "缓解药物毒性"],
        usage: "煎服，2-10g。清热解毒宜生用，补中缓急宜炙用。不宜与甘遂、大戟、芫花、海藻同用。",
        contraindications: ["湿盛胀满者忌服", "水肿者慎用", "不宜与甘遂、大戟、芫花、海藻同用"],
        tags: ["常用", "补气", "调药"],
        keywords: ["补气", "调和", "止咳", "解毒", "缓急", "国老"]
    },

    // 17.2 补血药 (3味)
    {
        id: "herb_103",
        name: "当归",
        pinyin: "Dang Gui",
        latinName: "Angelica sinensis (Oliv.) Diels",
        category: "补虚药",
        subcategory: "补血药",
        nature: "温",
        tastes: ["甘", "辛"],
        meridians: ["肝经", "心经", "脾经"],
        functions: ["补血活血", "调经止痛", "润肠通便"],
        indications: ["血虚萎黄", "眩晕心悸", "月经不调", "经闭痛经", "虚寒腹痛", "肠燥便秘", "风湿痹痛", "跌扑损伤"],
        usage: "煎服，6-12g。补血宜用当归身，活血宜用当归尾，和血宜用全当归。",
        contraindications: ["湿盛中满者慎用", "大便泄泻者慎用"],
        tags: ["常用", "补血", "调经"],
        keywords: ["血虚", "调经", "补血", "活血", "痛经", "四物汤"]
    },
    {
        id: "herb_104",
        name: "熟地黄",
        pinyin: "Shu Di Huang",
        latinName: "Rehmannia glutinosa Libosch.",
        category: "补虚药",
        subcategory: "补血药",
        nature: "微温",
        tastes: ["甘"],
        meridians: ["肝经", "肾经"],
        functions: ["补血滋阴", "益精填髓"],
        indications: ["血虚萎黄", "心悸怔忡", "月经不调", "崩漏下血", "肝肾阴虚", "腰膝酸软", "骨蒸潮热", "盗汗遗精", "眩晕耳鸣"],
        usage: "煎服，9-15g。生地黄与熟地黄功效不同，不可混用。",
        contraindications: ["脾胃虚弱者慎用", "气滞痰多者慎用", "腹满便溏者慎用"],
        tags: ["常用", "补血", "滋阴"],
        keywords: ["血虚", "滋阴", "补血", "肝肾", "腰膝", "四物汤"]
    },
    {
        id: "herb_105",
        name: "白芍",
        pinyin: "Bai Shao",
        latinName: "Paeonia lactiflora Pall.",
        category: "补虚药",
        subcategory: "补血药",
        nature: "微寒",
        tastes: ["苦", "酸"],
        meridians: ["肝经", "脾经"],
        functions: ["养血调经", "敛阴止汗", "柔肝止痛", "平抑肝阳"],
        indications: ["血虚萎黄", "月经不调", "自汗盗汗", "胁肋脘腹疼痛", "四肢挛急", "肝阳上亢眩晕"],
        usage: "煎服，6-15g。平肝止痛宜生用，养血调经宜炒用。不宜与藜芦同用。",
        contraindications: ["阳虚寒盛者慎用", "不宜与藜芦同用"],
        tags: ["常用", "补血", "柔肝"],
        keywords: ["养血", "调经", "止痛", "柔肝", "敛阴", "芍药甘草汤"]
    },

    // 17.3 补阴药 (4味)
    {
        id: "herb_106",
        name: "北沙参",
        pinyin: "Bei Sha Shen",
        latinName: "Glehnia littoralis Fr.Schmidt ex Miq.",
        category: "补虚药",
        subcategory: "补阴药",
        nature: "微寒",
        tastes: ["甘", "微苦"],
        meridians: ["肺经", "胃经"],
        functions: ["养阴清肺", "益胃生津"],
        indications: ["肺热燥咳", "阴虚劳嗽", "干咳少痰", "胃阴不足", "咽干口渴", "饥不欲食"],
        usage: "煎服，5-12g。不宜与藜芦同用。",
        contraindications: ["风寒咳嗽者忌服", "脾胃虚寒者慎用", "不宜与藜芦同用"],
        tags: ["常用", "养阴", "生津"],
        keywords: ["阴虚", "燥咳", "胃阴", "生津", "沙参", "润肺"]
    },
    {
        id: "herb_107",
        name: "麦冬",
        pinyin: "Mai Dong",
        latinName: "Ophiopogon japonicus (L.f) Ker-Gawl.",
        category: "补虚药",
        subcategory: "补阴药",
        nature: "微寒",
        tastes: ["甘", "微苦"],
        meridians: ["心经", "肺经", "胃经"],
        functions: ["养阴润肺", "清心生津"],
        indications: ["肺燥干咳", "阴虚劳嗽", "虚烦失眠", "心悸健忘", "内热消渴", "肠燥便秘"],
        usage: "煎服，6-12g。清心宜连心用，滋阴宜去心用。",
        contraindications: ["脾胃虚寒泄泻者忌服", "风寒咳嗽者忌服"],
        tags: ["常用", "养阴", "润肺"],
        keywords: ["阴虚", "心烦", "失眠", "消渴", "生脉散", "麦冬"]
    },
    {
        id: "herb_108",
        name: "枸杞子",
        pinyin: "Gou Qi Zi",
        latinName: "Lycium barbarum L.",
        category: "补虚药",
        subcategory: "补阴药",
        nature: "平",
        tastes: ["甘"],
        meridians: ["肝经", "肾经"],
        functions: ["滋补肝肾", "益精明目"],
        indications: ["虚劳精亏", "腰膝酸痛", "眩晕耳鸣", "视力减退", "内热消渴", "血虚萎黄"],
        usage: "煎服，6-12g。或入丸散。也可泡酒、煮粥或嚼服。",
        contraindications: ["外邪实热者忌服", "脾虚有湿及泄泻者忌服"],
        tags: ["常用", "补肾", "明目"],
        keywords: ["肝肾", "明目", "补肾", "益精", "枸杞", "菊花枸杞"]
    },
    {
        id: "herb_109",
        name: "龟甲",
        pinyin: "Gui Jia",
        latinName: "Chinemys reevesii (Gray)",
        category: "补虚药",
        subcategory: "补阴药",
        nature: "寒",
        tastes: ["咸", "甘"],
        meridians: ["肝经", "肾经", "心经"],
        functions: ["滋阴潜阳", "益肾强骨", "养血补心", "固经止崩"],
        indications: ["阴虚潮热", "骨蒸盗汗", "头晕目眩", "虚风内动", "筋骨痿弱", "腰膝酸软", "崩漏经多"],
        usage: "煎服，9-24g。宜打碎先煎。",
        contraindications: ["脾胃虚寒者忌服", "孕妇慎用"],
        tags: ["补阴", "潜阳"],
        keywords: ["阴虚", "骨蒸", "盗汗", "补肾", "滋阴", "龟板"]
    },

    // 17.4 补阳药 (3味)
    {
        id: "herb_110",
        name: "鹿茸",
        pinyin: "Lu Rong",
        latinName: "Cervus nippon Temminck",
        category: "补虚药",
        subcategory: "补阳药",
        nature: "温",
        tastes: ["甘", "咸"],
        meridians: ["肾经", "肝经"],
        functions: ["壮肾阳", "益精血", "强筋骨", "调冲任", "托疮毒"],
        indications: ["肾阳不足", "阳痿滑精", "宫冷不孕", "羸瘦神疲", "腰脊冷痛", "崩漏带下", "疮疡久溃不敛"],
        usage: "研末冲服，1-2g。或入丸散。不宜入煎剂。宜从小量开始，缓缓加量。",
        contraindications: ["阴虚阳亢者忌服", "血分有热者忌服", "外感热病者忌服"],
        tags: ["名贵", "补阳", "壮阳"],
        keywords: ["肾阳", "精血", "阳痿", "不孕", "腰脊", "鹿茸"]
    },
    {
        id: "herb_111",
        name: "杜仲",
        pinyin: "Du Zhong",
        latinName: "Eucommia ulmoides Oliv.",
        category: "补虚药",
        subcategory: "补阳药",
        nature: "温",
        tastes: ["甘"],
        meridians: ["肝经", "肾经"],
        functions: ["补肝肾", "强筋骨", "安胎"],
        indications: ["肝肾不足", "腰膝酸痛", "筋骨无力", "眩晕耳鸣", "妊娠漏血", "胎动不安", "高血压属肾虚者"],
        usage: "煎服，6-10g。盐炙可增强补肝肾之力。",
        contraindications: ["阴虚火旺者慎用", "实热证者不宜"],
        tags: ["常用", "补肾", "强骨"],
        keywords: ["腰痛", "补肾", "安胎", "强筋骨", "高血压", "杜仲"]
    },
    {
        id: "herb_112",
        name: "补骨脂",
        pinyin: "Bu Gu Zhi",
        latinName: "Psoralea corylifolia L.",
        category: "补虚药",
        subcategory: "补阳药",
        nature: "温",
        tastes: ["辛", "苦"],
        meridians: ["肾经", "脾经"],
        functions: ["温肾助阳", "纳气平喘", "温脾止泻"],
        indications: ["肾阳不足", "阳痿遗精", "腰膝冷痛", "肾虚作喘", "五更泄泻", "遗尿尿频"],
        usage: "煎服，6-10g。盐炙可增强助阳之力。外用适量，制成酊剂涂搽，可治白癜风。",
        contraindications: ["阴虚火旺者忌服", "大便秘结者忌服"],
        tags: ["补阳", "止泻"],
        keywords: ["肾阳", "遗精", "五更泻", "温肾", "纳气", "补骨脂"]
    },

    // ================================================================================
    // 十八、收涩药 — 以收敛固涩为主要功效 (5味)
    // ================================================================================

    // 18.1 固表止汗药 (1味)
    {
        id: "herb_113",
        name: "麻黄根",
        pinyin: "Ma Huang Gen",
        latinName: "Ephedra sinica Stapf",
        category: "收涩药",
        subcategory: "固表止汗药",
        nature: "平",
        tastes: ["甘", "涩"],
        meridians: ["心经", "肺经"],
        functions: ["固表止汗"],
        indications: ["自汗", "盗汗", "产后虚汗不止"],
        usage: "煎服，3-9g。外用适量，研末作扑粉用。",
        contraindications: ["有表邪者忌服", "湿热盛者不宜"],
        tags: ["止汗", "固表"],
        keywords: ["自汗", "盗汗", "止汗", "固表", "收涩"]
    },

    // 18.2 涩肠止泻药 (2味)
    {
        id: "herb_114",
        name: "五味子",
        pinyin: "Wu Wei Zi",
        latinName: "Schisandra chinensis (Turcz.) Baill.",
        category: "收涩药",
        subcategory: "涩肠止泻药",
        nature: "温",
        tastes: ["酸", "甘"],
        meridians: ["肺经", "心经", "肾经"],
        functions: ["收敛固涩", "益气生津", "补肾宁心"],
        indications: ["久咳虚喘", "梦遗滑精", "遗尿尿频", "久泻不止", "自汗盗汗", "津伤口渴", "内热消渴", "心悸失眠"],
        usage: "煎服，2-6g。敛肺止咳宜用五味子，补肾宁心宜用南五味子。研末服1-3g/次。",
        contraindications: ["表邪未解者忌服", "内有实热者慎用", "咳嗽初起者不宜"],
        tags: ["常用", "收涩", "补肾"],
        keywords: ["久咳", "遗精", "盗汗", "失眠", "补肾", "生脉散"]
    },
    {
        id: "herb_115",
        name: "乌梅",
        pinyin: "Wu Mei",
        latinName: "Prunus mume (Sieb.) Sieb. et Zucc.",
        category: "收涩药",
        subcategory: "涩肠止泻药",
        nature: "平",
        tastes: ["酸", "涩"],
        meridians: ["肝经", "脾经", "肺经", "大肠经"],
        functions: ["敛肺涩肠", "生津安蛔"],
        indications: ["肺虚久咳", "久泻久痢", "虚热消渴", "蛔厥腹痛呕吐"],
        usage: "煎服，6-12g。止泻止血宜炒炭用，生津安蛔宜生用。外用适量。",
        contraindications: ["表邪未解者忌服", "内有实热积滞者不宜"],
        tags: ["常用", "收涩", "安蛔"],
        keywords: ["久咳", "久泻", "消渴", "安蛔", "生津", "乌梅汤"]
    },

    // 18.3 固精缩尿止带药 (2味)
    {
        id: "herb_116",
        name: "山茱萸",
        pinyin: "Shan Zhu Yu",
        latinName: "Cornus officinalis Sieb. et Zucc.",
        category: "收涩药",
        subcategory: "固精缩尿止带药",
        nature: "微温",
        tastes: ["酸", "涩"],
        meridians: ["肝经", "肾经"],
        functions: ["补益肝肾", "收涩固脱"],
        indications: ["肝肾亏虚", "眩晕耳鸣", "腰膝酸痛", "阳痿遗精", "遗尿尿频", "崩漏带下", "大汗虚脱"],
        usage: "煎服，6-12g。救急固脱可用至20-30g。",
        contraindications: ["内有湿热者慎用", "小便淋涩者不宜"],
        tags: ["常用", "补肾", "固涩"],
        keywords: ["遗精", "腰痛", "补肾", "固脱", "六味地黄丸", "山茱萸"]
    },
    {
        id: "herb_117",
        name: "金樱子",
        pinyin: "Jin Ying Zi",
        latinName: "Rosa laevigata Michx.",
        category: "收涩药",
        subcategory: "固精缩尿止带药",
        nature: "平",
        tastes: ["酸", "甘", "涩"],
        meridians: ["肾经", "膀胱经", "大肠经"],
        functions: ["固精缩尿", "固崩止带", "涩肠止泻"],
        indications: ["遗精滑精", "遗尿尿频", "崩漏带下", "久泻久痢"],
        usage: "煎服，6-12g。或入丸散。",
        contraindications: ["实火邪热者忌服", "有湿热者慎用"],
        tags: ["收涩", "固精"],
        keywords: ["遗精", "遗尿", "崩漏", "止泻", "固涩", "金樱子"]
    },

    // ================================================================================
    // 十九、涌吐药 — 以促使呕吐为主要功效 (1味)
    // ================================================================================

    {
        id: "herb_118",
        name: "常山",
        pinyin: "Chang Shan",
        latinName: "Dichroa febrifuga Lour.",
        category: "涌吐药",
        subcategory: "涌吐药",
        nature: "寒",
        tastes: ["苦", "辛"],
        meridians: ["肺经", "心经", "肝经"],
        functions: ["涌吐痰涎", "截疟"],
        indications: ["痰饮积聚", "疟疾", "胸膈满闷"],
        usage: "煎服，5-9g。涌吐宜生用，截疟宜酒炙。有催吐副作用，用量不宜过大。",
        contraindications: ["体虚者慎用", "孕妇忌用"],
        tags: ["有毒", "涌吐"],
        keywords: ["涌吐", "痰饮", "疟疾", "催吐"]
    },

    // ================================================================================
    // 二十、攻毒杀虫止痒药 — 以攻毒疗疮、杀虫止痒为主要功效 (2味)
    // ================================================================================

    {
        id: "herb_119",
        name: "雄黄",
        pinyin: "Xiong Huang",
        latinName: "Realgar",
        category: "攻毒杀虫止痒药",
        subcategory: "攻毒杀虫止痒药",
        nature: "温",
        tastes: ["辛"],
        meridians: ["肝经", "大肠经"],
        functions: ["解毒杀虫", "燥湿祛痰", "截疟"],
        indications: ["痈肿疔疮", "蛇虫咬伤", "虫积腹痛", "疥癣", "惊痫疟疾"],
        usage: "入丸散用，0.05-0.1g。外用适量，研末调敷。不宜入煎剂。不可火煅。",
        toxicNote: { limit: "0.05~0.1g，入丸散", note: "含砷化物，孕妇及肝肾功能不全者忌用" },
        contraindications: ["孕妇忌服", "血虚者忌服", "不宜大面积外用", "忌火煅"],
        tags: ["有毒", "杀虫"],
        keywords: ["疮痈", "蛇伤", "疥癣", "虫积", "解毒"]
    },
    {
        id: "herb_120",
        name: "蛇床子",
        pinyin: "She Chuang Zi",
        latinName: "Cnidium monnieri (L.) Cuss.",
        category: "攻毒杀虫止痒药",
        subcategory: "攻毒杀虫止痒药",
        nature: "温",
        tastes: ["辛", "苦"],
        meridians: ["肾经"],
        functions: ["燥湿祛风", "杀虫止痒", "温肾壮阳"],
        indications: ["阴痒带下", "湿疹瘙痒", "疥癣", "肾虚阳痿", "宫冷不孕"],
        usage: "煎服，3-10g。外用适量，多煎汤熏洗。",
        contraindications: ["阴虚火旺者忌服", "下焦有湿热者不宜"],
        tags: ["杀虫", "止痒"],
        keywords: ["阴痒", "湿疹", "疥癣", "止痒", "阳痿", "蛇床子散"]
    },

    // ================================================================================
    // 扩充批（2026-08）— 新增40味（herb_121 ~ herb_160），按教材高频与临床常用选录
    // ================================================================================

    // 4.3 解表药扩充（葛根/升麻/桑叶/细辛）
    {
        id: "herb_121",
        name: "葛根",
        pinyin: "Ge Gen",
        latinName: "Pueraria lobata (Willd.) Ohwi",
        category: "解表药",
        subcategory: "辛凉解表药",
        nature: "凉",
        tastes: ["甘", "辛"],
        meridians: ["脾经", "胃经"],
        functions: ["解肌退热", "生津止渴", "升阳止泻", "透疹"],
        indications: ["外感发热", "项背强痛", "热病口渴", "阴虚消渴", "脾虚泄泻", "麻疹不透"],
        usage: "煎服，9-15g。解肌退热、生津宜生用；升阳止泻宜煨用。",
        contraindications: ["胃寒者慎用", "表虚汗多者慎用"],
        tags: ["常用", "解肌"],
        keywords: ["外感", "项背强痛", "生津", "止泻", "透疹", "消渴", "葛根汤"]
    },
    {
        id: "herb_122",
        name: "升麻",
        pinyin: "Sheng Ma",
        latinName: "Cimicifuga foetida L.",
        category: "解表药",
        subcategory: "辛凉解表药",
        nature: "微寒",
        tastes: ["辛", "微甘"],
        meridians: ["肺经", "脾经", "胃经", "大肠经"],
        functions: ["发表透疹", "清热解毒", "升举阳气"],
        indications: ["外感风热", "麻疹不透", "热毒疮疡", "牙龈肿痛", "中气下陷", "久泻脱肛", "子宫脱垂"],
        usage: "煎服，3-10g。升阳举陷宜蜜炙，发表透疹宜生用。",
        contraindications: ["阴虚火旺者忌服", "麻疹已透者忌用", "阴虚阳浮者慎用"],
        tags: ["升阳"],
        keywords: ["透疹", "升举阳气", "脱肛", "胃火牙痛", "清胃散"]
    },
    {
        id: "herb_123",
        name: "桑叶",
        pinyin: "Sang Ye",
        latinName: "Morus alba L.",
        category: "解表药",
        subcategory: "辛凉解表药",
        nature: "寒",
        tastes: ["甘", "苦"],
        meridians: ["肺经", "肝经"],
        functions: ["疏散风热", "清肺润燥", "平抑肝阳", "清肝明目"],
        indications: ["风热感冒", "温病初起", "肺热燥咳", "肝阳上亢眩晕", "目赤昏花"],
        usage: "煎服，5-10g。疏散风热宜生用；清肝明目可蜜炙。",
        contraindications: ["脾胃虚寒者慎用"],
        tags: ["常用", "疏散"],
        keywords: ["风热", "燥咳", "清肝", "明目", "桑菊饮", "桑杏汤"]
    },
    {
        id: "herb_124",
        name: "细辛",
        pinyin: "Xi Xin",
        latinName: "Asarum heterotropoides Fr. Schmidt var. mandshuricum (Maxim.) Kitag.",
        category: "解表药",
        subcategory: "辛温解表药",
        nature: "温",
        tastes: ["辛"],
        meridians: ["肺经", "肾经", "心经"],
        functions: ["解表散寒", "祛风止痛", "通窍", "温肺化饮"],
        indications: ["风寒感冒", "头痛", "牙痛", "鼻渊鼻塞", "风寒湿痹", "寒痰停饮"],
        usage: "煎服，1-3g；散剂每次0.5-1g。不宜与藜芦同用。",
        toxicNote: { limit: "1~3g，不入散剂", note: "超量或长期使用有肾毒性风险" },
        contraindications: ["气虚多汗者忌服", "阴虚阳亢头痛者忌服", "不宜过量久服", "反藜芦"],
        tags: ["止痛", "通窍"],
        keywords: ["风寒", "头痛", "牙痛", "鼻渊", "化饮", "小青龙汤"]
    },

    // 4.4 清热药扩充（芦根/天花粉/赤芍/青蒿/地骨皮/白头翁/秦皮）
    {
        id: "herb_125",
        name: "芦根",
        pinyin: "Lu Gen",
        latinName: "Phragmites communis Trin.",
        category: "清热药",
        subcategory: "清热泻火药",
        nature: "寒",
        tastes: ["甘"],
        meridians: ["肺经", "胃经"],
        functions: ["清热泻火", "生津止渴", "除烦", "止呕", "利尿"],
        indications: ["热病烦渴", "胃热呕哕", "肺热咳嗽", "肺痈吐脓", "热淋涩痛"],
        usage: "煎服，15-30g；鲜品加倍，可捣汁用。",
        contraindications: ["脾胃虚寒者慎用"],
        tags: ["常用"],
        keywords: ["烦渴", "呕哕", "肺痈", "生津", "银翘散", "桑菊饮"]
    },
    {
        id: "herb_126",
        name: "天花粉",
        pinyin: "Tian Hua Fen",
        latinName: "Trichosanthes kirilowii Maxim.",
        category: "清热药",
        subcategory: "清热泻火药",
        nature: "微寒",
        tastes: ["甘", "微苦"],
        meridians: ["肺经", "胃经"],
        functions: ["清热泻火", "生津止渴", "消肿排脓"],
        indications: ["热病烦渴", "内热消渴", "疮疡肿毒", "肺热燥咳"],
        usage: "煎服，10-15g。孕妇慎用；不宜与乌头类药材同用。",
        contraindications: ["孕妇忌用", "脾胃虚寒者慎用", "反乌头"],
        tags: ["生津"],
        keywords: ["消渴", "排脓", "疮疡", "生津", "栝楼根"]
    },
    {
        id: "herb_127",
        name: "赤芍",
        pinyin: "Chi Shao",
        latinName: "Paeonia lactiflora Pall.",
        category: "清热药",
        subcategory: "清热凉血药",
        nature: "微寒",
        tastes: ["苦", "微寒"],
        meridians: ["肝经"],
        functions: ["清热凉血", "散瘀止痛"],
        indications: ["温毒发斑", "血热吐衄", "目赤肿痛", "痈肿疮疡", "肝郁胁痛", "经闭痛经", "癥瘕腹痛"],
        usage: "煎服，6-12g。不宜与藜芦同用。",
        contraindications: ["血寒经闭者忌用", "反藜芦", "孕妇慎用"],
        tags: ["常用", "凉血"],
        keywords: ["凉血", "散瘀", "发斑", "痛经", "癥瘕"]
    },
    {
        id: "herb_128",
        name: "青蒿",
        pinyin: "Qing Hao",
        latinName: "Artemisia annua L.",
        category: "清热药",
        subcategory: "清虚热药",
        nature: "寒",
        tastes: ["苦", "辛"],
        meridians: ["肝经", "胆经"],
        functions: ["清透虚热", "凉血除蒸", "解暑", "截疟"],
        indications: ["温邪伤阴", "夜热早凉", "阴虚发热", "骨蒸劳热", "暑热外感", "疟疾寒热"],
        usage: "煎服，6-12g；不宜久煎。截疟可鲜品捣汁服。",
        contraindications: ["脾胃虚寒者慎用", "大便泄泻者慎用"],
        tags: ["退虚热"],
        keywords: ["虚热", "骨蒸", "截疟", "夜热早凉", "青蒿鳖甲汤"]
    },
    {
        id: "herb_129",
        name: "地骨皮",
        pinyin: "Di Gu Pi",
        latinName: "Lycium chinense Mill.",
        category: "清热药",
        subcategory: "清虚热药",
        nature: "寒",
        tastes: ["甘"],
        meridians: ["肺经", "肝经", "肾经"],
        functions: ["凉血除蒸", "清肺降火"],
        indications: ["阴虚发热", "骨蒸盗汗", "肺热咳嗽", "血热吐衄", "内热消渴"],
        usage: "煎服，9-15g。",
        contraindications: ["外感风寒发热者忌用", "脾虚便溏者慎用"],
        tags: ["退虚热"],
        keywords: ["骨蒸", "盗汗", "肺热", "泻白散"]
    },
    {
        id: "herb_130",
        name: "白头翁",
        pinyin: "Bai Tou Weng",
        latinName: "Pulsatilla chinensis (Bge.) Regel",
        category: "清热药",
        subcategory: "清热解毒药",
        nature: "寒",
        tastes: ["苦"],
        meridians: ["胃经", "大肠经"],
        functions: ["清热解毒", "凉血止痢"],
        indications: ["热毒血痢", "发热腹痛", "里急后重", "下痢脓血", "阴痒带下"],
        usage: "煎服，9-15g。",
        contraindications: ["虚寒泻痢者忌服"],
        tags: ["止痢"],
        keywords: ["血痢", "热毒", "里急后重", "白头翁汤"]
    },
    {
        id: "herb_131",
        name: "秦皮",
        pinyin: "Qin Pi",
        latinName: "Fraxinus rhynchophylla Hance",
        category: "清热药",
        subcategory: "清热燥湿药",
        nature: "寒",
        tastes: ["苦", "涩"],
        meridians: ["肝经", "胆经", "大肠经"],
        functions: ["清热燥湿", "收涩止痢", "明目"],
        indications: ["热毒泻痢", "赤白带下", "目赤肿痛", "目生翳障"],
        usage: "煎服，6-12g。",
        contraindications: ["脾胃虚寒者忌服"],
        tags: ["止痢"],
        keywords: ["泻痢", "明目", "白头翁汤"]
    },

    // 4.5 祛风湿药扩充（木瓜）
    {
        id: "herb_132",
        name: "木瓜",
        pinyin: "Mu Gua",
        latinName: "Chaenomeles speciosa (Sweet) Nakai",
        category: "祛风湿药",
        subcategory: "祛风湿散寒药",
        nature: "温",
        tastes: ["酸"],
        meridians: ["肝经", "脾经"],
        functions: ["舒筋活络", "化湿和胃"],
        indications: ["风湿痹痛", "筋脉拘挛", "脚气肿痛", "吐泻转筋"],
        usage: "煎服，6-9g。",
        contraindications: ["胃酸过多者慎用", "阴虚腰膝酸痛者慎用"],
        tags: ["舒筋"],
        keywords: ["痹痛", "转筋", "舒筋活络", "脚气"]
    },

    // 4.6 化湿药扩充（佩兰）
    {
        id: "herb_133",
        name: "佩兰",
        pinyin: "Pei Lan",
        latinName: "Eupatorium fortunei Turcz.",
        category: "化湿药",
        subcategory: "化湿药",
        nature: "平",
        tastes: ["辛"],
        meridians: ["脾经", "胃经", "肺经"],
        functions: ["化湿醒脾", "解暑"],
        indications: ["湿阻中焦", "脘痞呕恶", "口中甜腻", "暑湿表证", "湿温初起"],
        usage: "煎服，3-10g。鲜品加倍。",
        contraindications: ["阴虚血燥者慎用", "气虚者慎用"],
        tags: ["化湿"],
        keywords: ["湿阻", "醒脾", "解暑", "甘露消毒丹"]
    },

    // 4.7 利水渗湿药扩充（薏苡仁/瞿麦）
    {
        id: "herb_134",
        name: "薏苡仁",
        pinyin: "Yi Yi Ren",
        latinName: "Coix lacryma-jobi L. var. ma-yuen (Roman.) Stapf",
        category: "利水渗湿药",
        subcategory: "利水消肿药",
        nature: "凉",
        tastes: ["甘", "淡"],
        meridians: ["脾经", "胃经", "肺经"],
        functions: ["利水渗湿", "健脾止泻", "除痹", "排脓", "解毒散结"],
        indications: ["水肿", "小便不利", "脾虚泄泻", "湿痹拘挛", "肺痈", "肠痈", "扁平疣"],
        usage: "煎服，9-30g。健脾止泻宜炒用，清热排脓宜生用。",
        contraindications: ["津液不足者慎用", "孕妇慎用"],
        tags: ["常用", "健脾"],
        keywords: ["水肿", "健脾", "排脓", "除痹", "三仁汤", "参苓白术散"]
    },
    {
        id: "herb_135",
        name: "瞿麦",
        pinyin: "Qu Mai",
        latinName: "Dianthus superbus L.",
        category: "利水渗湿药",
        subcategory: "利尿通淋药",
        nature: "寒",
        tastes: ["苦"],
        meridians: ["心经", "小肠经", "膀胱经"],
        functions: ["利尿通淋", "破血通经"],
        indications: ["热淋", "血淋", "石淋", "小便不通", "经闭瘀阻"],
        usage: "煎服，9-15g。",
        contraindications: ["孕妇忌服", "脾肾气虚者慎用"],
        tags: ["通淋"],
        keywords: ["热淋", "血淋", "通经", "八正散"]
    },

    // 4.8 温里药扩充（吴茱萸）
    {
        id: "herb_136",
        name: "吴茱萸",
        pinyin: "Wu Zhu Yu",
        latinName: "Euodia rutaecarpa (Juss.) Benth.",
        category: "温里药",
        subcategory: "温里药",
        nature: "热",
        tastes: ["辛", "苦"],
        meridians: ["肝经", "脾经", "胃经", "肾经"],
        functions: ["散寒止痛", "降逆止呕", "助阳止泻"],
        indications: ["厥阴头痛", "寒疝腹痛", "经行腹痛", "胃寒呕吐", "虚寒泄泻", "脚气"],
        usage: "煎服，2-5g。外用适量。有小毒，不宜过量久服。",
        contraindications: ["阴虚有热者忌服", "孕妇慎用"],
        tags: ["温中", "小毒"],
        keywords: ["寒疝", "头痛", "止呕", "止泻", "吴茱萸汤"]
    },

    // 4.9 理气药扩充（川楝子）
    {
        id: "herb_137",
        name: "川楝子",
        pinyin: "Chuan Lian Zi",
        latinName: "Melia toosendan Sieb. et Zucc.",
        category: "理气药",
        subcategory: "理气药",
        nature: "寒",
        tastes: ["苦"],
        meridians: ["肝经", "小肠经", "膀胱经"],
        functions: ["行气止痛", "杀虫", "疗癣"],
        indications: ["肝郁化火", "胸胁胀痛", "疝气疼痛", "虫积腹痛", "头癣"],
        usage: "煎服，5-10g。有小毒，不宜过量。",
        contraindications: ["脾胃虚寒者慎用", "不宜过量久服"],
        tags: ["止痛", "小毒"],
        keywords: ["胁痛", "疝气", "杀虫", "金铃子散"]
    },

    // 4.10 消食药扩充（莱菔子）
    {
        id: "herb_138",
        name: "莱菔子",
        pinyin: "Lai Fu Zi",
        latinName: "Raphanus sativus L.",
        category: "消食药",
        subcategory: "消食药",
        nature: "平",
        tastes: ["辛", "甘"],
        meridians: ["肺经", "脾经", "胃经"],
        functions: ["消食除胀", "降气化痰"],
        indications: ["食积气滞", "脘腹胀满", "嗳气吞酸", "泻痢后重", "痰壅喘咳"],
        usage: "煎服，6-12g。生用吐风痰，炒用消食下气化痰。",
        contraindications: ["气虚者慎用", "无食积痰滞者慎用", "不宜与人参同用"],
        tags: ["消食"],
        keywords: ["食积", "腹胀", "化痰", "三子养亲汤"]
    },

    // 4.11 止血药扩充（大蓟）
    {
        id: "herb_139",
        name: "大蓟",
        pinyin: "Da Ji",
        latinName: "Cirsium japonicum Fisch. ex DC.",
        category: "止血药",
        subcategory: "凉血止血药",
        nature: "凉",
        tastes: ["甘", "苦"],
        meridians: ["心经", "肝经"],
        functions: ["凉血止血", "散瘀解毒消痈"],
        indications: ["血热吐衄", "咯血", "便血", "尿血", "崩漏", "痈肿疮毒"],
        usage: "煎服，10-15g；鲜品30-60g，可捣汁服。",
        contraindications: ["脾胃虚寒者忌用"],
        tags: ["止血"],
        keywords: ["血热", "吐衄", "崩漏", "消痈"]
    },

    // 4.12 活血化瘀药扩充（牛膝/鸡血藤）
    {
        id: "herb_140",
        name: "牛膝",
        pinyin: "Niu Xi",
        latinName: "Achyranthes bidentata Bl.",
        category: "活血化瘀药",
        subcategory: "活血调经药",
        nature: "平",
        tastes: ["苦", "甘", "酸"],
        meridians: ["肝经", "肾经"],
        functions: ["逐瘀通经", "补肝肾", "强筋骨", "利尿通淋", "引血下行"],
        indications: ["经闭痛经", "产后瘀阻", "跌打损伤", "腰膝酸软", "淋证", "水肿", "头痛眩晕", "牙龈肿痛"],
        usage: "煎服，6-15g。补肝肾、强筋骨宜酒炙；引血下行、利尿通淋宜生用。",
        contraindications: ["孕妇忌服", "月经过多者慎用", "中气下陷者慎用"],
        tags: ["常用", "引血下行"],
        keywords: ["通经", "强筋骨", "引血下行", "天麻钩藤饮", "独活寄生汤", "玉女煎"]
    },
    {
        id: "herb_141",
        name: "鸡血藤",
        pinyin: "Ji Xue Teng",
        latinName: "Spatholobus suberectus Dunn",
        category: "活血化瘀药",
        subcategory: "活血调经药",
        nature: "温",
        tastes: ["苦", "甘"],
        meridians: ["肝经", "肾经"],
        functions: ["活血补血", "调经止痛", "舒筋活络"],
        indications: ["月经不调", "痛经", "经闭", "风湿痹痛", "肢体麻木", "血虚萎黄"],
        usage: "煎服，9-15g。",
        contraindications: ["月经过多者慎用"],
        tags: ["常用", "调经"],
        keywords: ["补血", "调经", "舒筋活络", "麻木"]
    },

    // 4.13 化痰止咳平喘药扩充（桔梗/旋覆花/紫菀/款冬花/浙贝母）
    {
        id: "herb_142",
        name: "桔梗",
        pinyin: "Jie Geng",
        latinName: "Platycodon grandiflorum (Jacq.) A. DC.",
        category: "化痰止咳平喘药",
        subcategory: "清化热痰药",
        nature: "平",
        tastes: ["苦", "辛"],
        meridians: ["肺经"],
        functions: ["宣肺", "祛痰", "利咽", "排脓"],
        indications: ["咳嗽痰多", "胸闷不畅", "咽痛音哑", "肺痈吐脓", "癃闭便秘"],
        usage: "煎服，3-10g。",
        contraindications: ["阴虚久咳者慎用", "咳血者慎用", "胃溃疡患者慎用"],
        tags: ["常用", "宣肺"],
        keywords: ["宣肺", "祛痰", "利咽", "排脓", "银翘散", "参苓白术散"]
    },
    {
        id: "herb_143",
        name: "旋覆花",
        pinyin: "Xuan Fu Hua",
        latinName: "Inula japonica Thunb.",
        category: "化痰止咳平喘药",
        subcategory: "温化寒痰药",
        nature: "温",
        tastes: ["苦", "辛", "咸"],
        meridians: ["肺经", "脾经", "胃经", "大肠经"],
        functions: ["降气", "消痰", "行水", "止呕"],
        indications: ["痰饮蓄结", "胸膈痞闷", "咳喘痰多", "噫气呕吐", "心下痞硬"],
        usage: "煎服，3-10g；宜包煎。",
        contraindications: ["阴虚劳嗽者慎用", "津伤燥咳者慎用"],
        tags: ["降气"],
        keywords: ["降气", "消痰", "止呕", "噫气", "旋覆代赭汤"]
    },
    {
        id: "herb_144",
        name: "紫菀",
        pinyin: "Zi Wan",
        latinName: "Aster tataricus L. f.",
        category: "化痰止咳平喘药",
        subcategory: "止咳平喘药",
        nature: "温",
        tastes: ["苦", "辛", "甘"],
        meridians: ["肺经"],
        functions: ["润肺下气", "化痰止咳"],
        indications: ["咳嗽", "气喘", "肺虚久咳", "痰多不利", "肺痈"],
        usage: "煎服，5-10g。外感暴咳宜生用，肺虚久咳宜蜜炙。",
        contraindications: ["阴虚火旺之燥咳者慎用"],
        tags: ["止咳"],
        keywords: ["止咳", "化痰", "下气", "久咳"]
    },
    {
        id: "herb_145",
        name: "款冬花",
        pinyin: "Kuan Dong Hua",
        latinName: "Tussilago farfara L.",
        category: "化痰止咳平喘药",
        subcategory: "止咳平喘药",
        nature: "温",
        tastes: ["辛", "微苦"],
        meridians: ["肺经"],
        functions: ["润肺下气", "止咳化痰"],
        indications: ["新久咳嗽", "喘咳痰多", "劳嗽咳血"],
        usage: "煎服，5-10g。外感暴咳宜生用，内伤久咳宜蜜炙。",
        contraindications: ["阴虚燥咳者慎用"],
        tags: ["止咳"],
        keywords: ["止咳", "润肺", "下气", "久咳", "射干麻黄汤"]
    },
    {
        id: "herb_146",
        name: "浙贝母",
        pinyin: "Zhe Bei Mu",
        latinName: "Fritillaria thunbergii Miq.",
        category: "化痰止咳平喘药",
        subcategory: "清化热痰药",
        nature: "寒",
        tastes: ["苦"],
        meridians: ["肺经", "心经"],
        functions: ["清热化痰", "散结消肿"],
        indications: ["风热咳嗽", "痰热咳嗽", "瘰疬", "瘿瘤", "疮痈肿毒", "乳痈"],
        usage: "煎服，5-10g。不宜与乌头类药材同用。",
        contraindications: ["寒痰者慎用", "反乌头"],
        tags: ["化痰"],
        keywords: ["清热", "化痰", "散结", "瘰疬", "消瘰丸"]
    },

    // 4.14 安神药扩充（柏子仁）
    {
        id: "herb_147",
        name: "柏子仁",
        pinyin: "Bai Zi Ren",
        latinName: "Platycladus orientalis (L.) Franco",
        category: "安神药",
        subcategory: "养心安神药",
        nature: "平",
        tastes: ["甘"],
        meridians: ["心经", "肾经", "大肠经"],
        functions: ["养心安神", "润肠通便"],
        indications: ["虚烦不眠", "心悸怔忡", "肠燥便秘"],
        usage: "煎服，3-10g。便溏及痰多者慎用。",
        contraindications: ["便溏者慎用", "痰多者慎用"],
        tags: ["安神"],
        keywords: ["养心安神", "不寐", "便秘", "天王补心丹"]
    },

    // 4.15 平肝息风药扩充（僵蚕/地龙）
    {
        id: "herb_148",
        name: "僵蚕",
        pinyin: "Jiang Can",
        latinName: "Bombyx mori Linnaeus (4-5龄幼虫感染白僵菌而致死的干燥体)",
        category: "平肝息风药",
        subcategory: "息风止痉药",
        nature: "平",
        tastes: ["咸", "辛"],
        meridians: ["肝经", "肺经", "胃经"],
        functions: ["息风止痉", "祛风止痛", "化痰散结"],
        indications: ["肝风夹痰", "惊痫抽搐", "风热头痛", "目赤咽痛", "瘰疬痰核", "风疹瘙痒"],
        usage: "煎服，5-9g。散风热宜生用，息风止痉宜炒用。",
        contraindications: ["血虚生风者慎用"],
        tags: ["息风"],
        keywords: ["息风止痉", "散结", "瘰疬", "牵正散"]
    },
    {
        id: "herb_149",
        name: "地龙",
        pinyin: "Di Long",
        latinName: "Pheretima aspergillum (E. Perrier)",
        category: "平肝息风药",
        subcategory: "息风止痉药",
        nature: "寒",
        tastes: ["咸"],
        meridians: ["肝经", "脾经", "膀胱经"],
        functions: ["清热息风", "通络", "平喘", "利尿"],
        indications: ["高热惊痫", "癫狂", "热极生风", "半身不遂", "痹痛", "肺热哮喘", "热淋涩痛"],
        usage: "煎服，5-10g；研末吞服每次1-2g。",
        contraindications: ["脾胃虚寒者慎用", "无实热者慎用"],
        tags: ["通络"],
        keywords: ["清热息风", "通络", "平喘", "补阳还五汤"]
    },

    // 4.16 开窍药扩充（石菖蒲）
    {
        id: "herb_150",
        name: "石菖蒲",
        pinyin: "Shi Chang Pu",
        latinName: "Acorus tatarinowii Schott",
        category: "开窍药",
        subcategory: "开窍药",
        nature: "温",
        tastes: ["辛", "苦"],
        meridians: ["心经", "胃经"],
        functions: ["开窍豁痰", "醒神益智", "化湿和胃"],
        indications: ["痰蒙清窍", "神昏癫痫", "健忘失眠", "耳鸣耳聋", "脘痞不饥", "噤口下痢"],
        usage: "煎服，3-10g。鲜品加倍。",
        contraindications: ["阴血亏虚者慎用", "多汗者慎用"],
        tags: ["开窍"],
        keywords: ["开窍", "豁痰", "益智", "安神定志丸", "甘露消毒丹"]
    },

    // 4.17 补虚药扩充（山药/白扁豆/龙眼肉/阿胶/何首乌/女贞子/墨旱莲/百合/鳖甲/菟丝子）
    {
        id: "herb_151",
        name: "山药",
        pinyin: "Shan Yao",
        latinName: "Dioscorea opposita Thunb.",
        category: "补虚药",
        subcategory: "补气药",
        nature: "平",
        tastes: ["甘"],
        meridians: ["脾经", "肺经", "肾经"],
        functions: ["补脾养胃", "生津益肺", "补肾涩精"],
        indications: ["脾虚食少", "久泻不止", "肺虚喘咳", "肾虚遗精", "带下", "尿频", "虚热消渴"],
        usage: "煎服，15-30g。补脾止泻宜麸炒用。",
        contraindications: ["湿盛中满者慎用", "有实邪者忌用"],
        tags: ["常用", "平补"],
        keywords: ["补脾", "养胃", "益肺", "补肾", "参苓白术散"]
    },
    {
        id: "herb_152",
        name: "白扁豆",
        pinyin: "Bai Bian Dou",
        latinName: "Dolichos lablab L.",
        category: "补虚药",
        subcategory: "补气药",
        nature: "微温",
        tastes: ["甘"],
        meridians: ["脾经", "胃经"],
        functions: ["健脾化湿", "和中消暑"],
        indications: ["脾虚湿滞", "食少便溏", "暑湿吐泻", "白带过多"],
        usage: "煎服，9-15g。健脾止泻宜炒用，消暑解毒宜生用。",
        contraindications: ["寒热往来者慎用"],
        tags: ["健脾"],
        keywords: ["健脾", "化湿", "消暑", "参苓白术散"]
    },
    {
        id: "herb_153",
        name: "龙眼肉",
        pinyin: "Long Yan Rou",
        latinName: "Dimocarpus longan Lour.",
        category: "补虚药",
        subcategory: "补血药",
        nature: "温",
        tastes: ["甘"],
        meridians: ["心经", "脾经"],
        functions: ["补益心脾", "养血安神"],
        indications: ["思虑过度", "劳伤心脾", "惊悸怔忡", "失眠健忘", "血虚萎黄"],
        usage: "煎服，9-15g。",
        contraindications: ["内有痰火者慎用", "湿滞中满者慎用"],
        tags: ["补血", "安神"],
        keywords: ["补益心脾", "养血安神", "失眠", "归脾汤"]
    },
    {
        id: "herb_154",
        name: "阿胶",
        pinyin: "E Jiao",
        latinName: "Equus asinus L. (驴皮经煎煮浓缩制成的固体胶)",
        category: "补虚药",
        subcategory: "补血药",
        nature: "平",
        tastes: ["甘"],
        meridians: ["肺经", "肝经", "肾经"],
        functions: ["补血滋阴", "润燥", "止血"],
        indications: ["血虚萎黄", "眩晕心悸", "肌痿无力", "心烦不眠", "虚风内动", "肺燥咳嗽", "吐血衄血", "便血崩漏"],
        usage: "烊化兑服，3-9g。",
        contraindications: ["脾胃虚弱者慎用", "内有瘀滞者慎用"],
        tags: ["补血", "名贵"],
        keywords: ["补血", "滋阴", "止血", "烊化", "炙甘草汤", "温经汤", "黄土汤"]
    },
    {
        id: "herb_155",
        name: "何首乌",
        pinyin: "He Shou Wu",
        latinName: "Polygonum multiflorum Thunb.",
        category: "补虚药",
        subcategory: "补血药",
        nature: "微温",
        tastes: ["苦", "甘", "涩"],
        meridians: ["肝经", "心经", "肾经"],
        functions: ["补肝肾", "益精血", "乌须发", "解毒截疟", "润肠通便"],
        indications: ["精血亏虚", "头晕眼花", "须发早白", "腰膝酸软", "久疟", "痈疽", "肠燥便秘"],
        usage: "煎服，制首乌6-12g；生首乌3-6g。制用补益，生用解毒通便。",
        contraindications: ["大便溏泄者慎用", "湿痰较重者忌用"],
        tags: ["乌发"],
        keywords: ["补肝肾", "益精血", "乌须发", "制首乌"]
    },
    {
        id: "herb_156",
        name: "女贞子",
        pinyin: "Nv Zhen Zi",
        latinName: "Ligustrum lucidum Ait.",
        category: "补虚药",
        subcategory: "补阴药",
        nature: "凉",
        tastes: ["甘", "苦"],
        meridians: ["肝经", "肾经"],
        functions: ["滋补肝肾", "明目乌发"],
        indications: ["肝肾阴虚", "目暗不明", "须发早白", "腰酸耳鸣", "阴虚发热"],
        usage: "煎服，6-12g。",
        contraindications: ["脾胃虚寒泄泻者忌服"],
        tags: ["补阴"],
        keywords: ["滋补肝肾", "明目", "乌发", "二至丸"]
    },
    {
        id: "herb_157",
        name: "墨旱莲",
        pinyin: "Mo Han Lian",
        latinName: "Eclipta prostrata L.",
        category: "补虚药",
        subcategory: "补阴药",
        nature: "寒",
        tastes: ["甘", "酸"],
        meridians: ["肝经", "肾经"],
        functions: ["滋补肝肾", "凉血止血"],
        indications: ["肝肾阴虚", "须发早白", "眩晕耳鸣", "吐血衄血", "尿血", "便血", "崩漏"],
        usage: "煎服，6-12g；鲜品加倍。",
        contraindications: ["脾胃虚寒者慎用"],
        tags: ["补阴"],
        keywords: ["滋补肝肾", "凉血止血", "须发早白", "二至丸"]
    },
    {
        id: "herb_158",
        name: "百合",
        pinyin: "Bai He",
        latinName: "Lilium lancifolium Thunb.",
        category: "补虚药",
        subcategory: "补阴药",
        nature: "微寒",
        tastes: ["甘"],
        meridians: ["肺经", "心经"],
        functions: ["养阴润肺", "清心安神"],
        indications: ["阴虚燥咳", "劳嗽咳血", "虚烦惊悸", "失眠多梦", "精神恍惚"],
        usage: "煎服，6-12g。蜜炙可增强润肺之力。",
        contraindications: ["风寒咳嗽者忌用", "中寒便溏者忌用"],
        tags: ["润肺"],
        keywords: ["养阴", "润肺", "清心安神", "百合固金汤", "百合地黄汤"]
    },
    {
        id: "herb_159",
        name: "鳖甲",
        pinyin: "Bie Jia",
        latinName: "Trionyx sinensis Wiegmann (鳖科动物鳖的背甲)",
        category: "补虚药",
        subcategory: "补阴药",
        nature: "微寒",
        tastes: ["咸"],
        meridians: ["肝经", "肾经"],
        functions: ["滋阴潜阳", "退热除蒸", "软坚散结"],
        indications: ["阴虚发热", "骨蒸劳热", "阴虚阳亢", "头晕目眩", "虚风内动", "癥瘕积聚", "经闭"],
        usage: "煎服，9-24g；宜先煎。滋阴潜阳宜生用，软坚散结宜醋炙。",
        contraindications: ["脾胃虚寒者慎用", "孕妇慎用", "食欲不振者慎用"],
        tags: ["滋阴", "软坚"],
        keywords: ["滋阴潜阳", "除蒸", "软坚散结", "青蒿鳖甲汤"]
    },
    {
        id: "herb_160",
        name: "菟丝子",
        pinyin: "Tu Si Zi",
        latinName: "Cuscuta chinensis Lam.",
        category: "补虚药",
        subcategory: "补阳药",
        nature: "温",
        tastes: ["甘"],
        meridians: ["肝经", "肾经", "脾经"],
        functions: ["补肾固精", "养肝明目", "止泻", "安胎"],
        indications: ["肾虚腰痛", "阳痿遗精", "遗尿尿频", "目暗不明", "脾虚便溏", "胎动不安"],
        usage: "煎服，6-12g。",
        contraindications: ["阴虚火旺者慎用", "大便燥结者慎用"],
        tags: ["补肾"],
        keywords: ["补肾固精", "明目", "安胎", "止泻"]
    }
];

// ================================================================================
// 分类索引 — 用于浏览导航
// ================================================================================

const herbCategories = {
    "解表药": {
        "辛温解表药": [
            { id: "herb_001", name: "麻黄" },
            { id: "herb_002", name: "桂枝" },
            { id: "herb_003", name: "紫苏叶" },
            { id: "herb_004", name: "生姜" },
            { id: "herb_005", name: "防风" },
            { id: "herb_006", name: "白芷" },
            { id: "herb_007", name: "荆芥" },
            { id: "herb_124", name: "细辛" }
        ],
        "辛凉解表药": [
            { id: "herb_008", name: "薄荷" },
            { id: "herb_009", name: "牛蒡子" },
            { id: "herb_010", name: "菊花" },
            { id: "herb_011", name: "柴胡" },
            { id: "herb_121", name: "葛根" },
            { id: "herb_122", name: "升麻" },
            { id: "herb_123", name: "桑叶" }
        ]
    },
    "清热药": {
        "清热泻火药": [
            { id: "herb_012", name: "石膏" },
            { id: "herb_013", name: "知母" },
            { id: "herb_014", name: "栀子" },
            { id: "herb_015", name: "夏枯草" },
            { id: "herb_125", name: "芦根" },
            { id: "herb_126", name: "天花粉" }
        ],
        "清热燥湿药": [
            { id: "herb_016", name: "黄芩" },
            { id: "herb_017", name: "黄连" },
            { id: "herb_018", name: "黄柏" },
            { id: "herb_131", name: "秦皮" }
        ],
        "清热解毒药": [
            { id: "herb_019", name: "金银花" },
            { id: "herb_020", name: "连翘" },
            { id: "herb_021", name: "板蓝根" },
            { id: "herb_022", name: "蒲公英" },
            { id: "herb_023", name: "鱼腥草" },
            { id: "herb_130", name: "白头翁" }
        ],
        "清热凉血药": [
            { id: "herb_024", name: "生地黄" },
            { id: "herb_025", name: "玄参" },
            { id: "herb_026", name: "牡丹皮" },
            { id: "herb_127", name: "赤芍" }
        ],
        "清虚热药": [
            { id: "herb_128", name: "青蒿" },
            { id: "herb_129", name: "地骨皮" }
        ]
    },
    "泻下药": {
        "攻下药": [
            { id: "herb_027", name: "大黄" },
            { id: "herb_028", name: "芒硝" }
        ],
        "润下药": [
            { id: "herb_029", name: "火麻仁" },
            { id: "herb_030", name: "郁李仁" }
        ],
        "逐水药": [
            { id: "herb_031", name: "甘遂" }
        ]
    },
    "祛风湿药": {
        "祛风湿散寒药": [
            { id: "herb_032", name: "独活" },
            { id: "herb_033", name: "威灵仙" },
            { id: "herb_132", name: "木瓜" }
        ],
        "祛风湿清热药": [
            { id: "herb_034", name: "秦艽" },
            { id: "herb_035", name: "防己" }
        ],
        "祛风湿补益药": [
            { id: "herb_036", name: "桑寄生" }
        ]
    },
    "化湿药": {
        "化湿药": [
            { id: "herb_037", name: "藿香" },
            { id: "herb_038", name: "苍术" },
            { id: "herb_039", name: "厚朴" },
            { id: "herb_040", name: "砂仁" },
            { id: "herb_133", name: "佩兰" }
        ]
    },
    "利水渗湿药": {
        "利水消肿药": [
            { id: "herb_041", name: "茯苓" },
            { id: "herb_042", name: "猪苓" },
            { id: "herb_043", name: "泽泻" },
            { id: "herb_134", name: "薏苡仁" }
        ],
        "利尿通淋药": [
            { id: "herb_044", name: "车前子" },
            { id: "herb_045", name: "滑石" },
            { id: "herb_135", name: "瞿麦" }
        ],
        "利湿退黄药": [
            { id: "herb_046", name: "茵陈" },
            { id: "herb_047", name: "金钱草" }
        ]
    },
    "温里药": {
        "温里药": [
            { id: "herb_048", name: "附子" },
            { id: "herb_049", name: "干姜" },
            { id: "herb_050", name: "肉桂" },
            { id: "herb_136", name: "吴茱萸" }
        ]
    },
    "理气药": {
        "理气药": [
            { id: "herb_051", name: "陈皮" },
            { id: "herb_052", name: "枳实" },
            { id: "herb_053", name: "木香" },
            { id: "herb_054", name: "香附" },
            { id: "herb_055", name: "薤白" },
            { id: "herb_137", name: "川楝子" }
        ]
    },
    "消食药": {
        "消食药": [
            { id: "herb_056", name: "山楂" },
            { id: "herb_057", name: "神曲" },
            { id: "herb_058", name: "麦芽" },
            { id: "herb_138", name: "莱菔子" }
        ]
    },
    "驱虫药": {
        "驱虫药": [
            { id: "herb_059", name: "使君子" }
        ]
    },
    "止血药": {
        "凉血止血药": [
            { id: "herb_060", name: "小蓟" },
            { id: "herb_061", name: "地榆" },
            { id: "herb_062", name: "白茅根" },
            { id: "herb_139", name: "大蓟" }
        ],
        "化瘀止血药": [
            { id: "herb_063", name: "三七" },
            { id: "herb_064", name: "蒲黄" }
        ],
        "收敛止血药": [
            { id: "herb_065", name: "白及" },
            { id: "herb_066", name: "仙鹤草" }
        ],
        "温经止血药": [
            { id: "herb_067", name: "艾叶" }
        ]
    },
    "活血化瘀药": {
        "活血止痛药": [
            { id: "herb_068", name: "川芎" },
            { id: "herb_069", name: "延胡索" },
            { id: "herb_070", name: "郁金" }
        ],
        "活血调经药": [
            { id: "herb_071", name: "丹参" },
            { id: "herb_072", name: "红花" },
            { id: "herb_073", name: "桃仁" },
            { id: "herb_074", name: "益母草" },
            { id: "herb_140", name: "牛膝" },
            { id: "herb_141", name: "鸡血藤" }
        ],
        "活血疗伤药": [
            { id: "herb_075", name: "骨碎补" }
        ],
        "破血消癥药": [
            { id: "herb_076", name: "莪术" }
        ]
    },
    "化痰止咳平喘药": {
        "温化寒痰药": [
            { id: "herb_077", name: "半夏" },
            { id: "herb_078", name: "天南星" },
            { id: "herb_079", name: "白芥子" },
            { id: "herb_143", name: "旋覆花" }
        ],
        "清化热痰药": [
            { id: "herb_080", name: "川贝母" },
            { id: "herb_081", name: "瓜蒌" },
            { id: "herb_082", name: "竹茹" },
            { id: "herb_142", name: "桔梗" },
            { id: "herb_146", name: "浙贝母" }
        ],
        "止咳平喘药": [
            { id: "herb_083", name: "苦杏仁" },
            { id: "herb_084", name: "百部" },
            { id: "herb_085", name: "桑白皮" },
            { id: "herb_144", name: "紫菀" },
            { id: "herb_145", name: "款冬花" }
        ]
    },
    "安神药": {
        "重镇安神药": [
            { id: "herb_086", name: "朱砂" },
            { id: "herb_087", name: "龙骨" }
        ],
        "养心安神药": [
            { id: "herb_088", name: "酸枣仁" },
            { id: "herb_089", name: "远志" },
            { id: "herb_090", name: "合欢皮" },
            { id: "herb_147", name: "柏子仁" }
        ]
    },
    "平肝息风药": {
        "平抑肝阳药": [
            { id: "herb_091", name: "石决明" },
            { id: "herb_092", name: "牡蛎" },
            { id: "herb_093", name: "代赭石" }
        ],
        "息风止痉药": [
            { id: "herb_094", name: "天麻" },
            { id: "herb_095", name: "钩藤" },
            { id: "herb_096", name: "全蝎" },
            { id: "herb_148", name: "僵蚕" },
            { id: "herb_149", name: "地龙" }
        ]
    },
    "开窍药": {
        "开窍药": [
            { id: "herb_097", name: "麝香" },
            { id: "herb_098", name: "冰片" },
            { id: "herb_150", name: "石菖蒲" }
        ]
    },
    "补虚药": {
        "补气药": [
            { id: "herb_099", name: "人参" },
            { id: "herb_100", name: "黄芪" },
            { id: "herb_101", name: "白术" },
            { id: "herb_102", name: "甘草" },
            { id: "herb_151", name: "山药" },
            { id: "herb_152", name: "白扁豆" }
        ],
        "补血药": [
            { id: "herb_103", name: "当归" },
            { id: "herb_104", name: "熟地黄" },
            { id: "herb_105", name: "白芍" },
            { id: "herb_153", name: "龙眼肉" },
            { id: "herb_154", name: "阿胶" },
            { id: "herb_155", name: "何首乌" }
        ],
        "补阴药": [
            { id: "herb_106", name: "北沙参" },
            { id: "herb_107", name: "麦冬" },
            { id: "herb_108", name: "枸杞子" },
            { id: "herb_109", name: "龟甲" },
            { id: "herb_156", name: "女贞子" },
            { id: "herb_157", name: "墨旱莲" },
            { id: "herb_158", name: "百合" },
            { id: "herb_159", name: "鳖甲" }
        ],
        "补阳药": [
            { id: "herb_110", name: "鹿茸" },
            { id: "herb_111", name: "杜仲" },
            { id: "herb_112", name: "补骨脂" },
            { id: "herb_160", name: "菟丝子" }
        ]
    },
    "收涩药": {
        "固表止汗药": [
            { id: "herb_113", name: "麻黄根" }
        ],
        "涩肠止泻药": [
            { id: "herb_114", name: "五味子" },
            { id: "herb_115", name: "乌梅" }
        ],
        "固精缩尿止带药": [
            { id: "herb_116", name: "山茱萸" },
            { id: "herb_117", name: "金樱子" }
        ]
    },
    "涌吐药": {
        "涌吐药": [
            { id: "herb_118", name: "常山" }
        ]
    },
    "攻毒杀虫止痒药": {
        "攻毒杀虫止痒药": [
            { id: "herb_119", name: "雄黄" },
            { id: "herb_120", name: "蛇床子" }
        ]
    }
};

// ================================================================================
// 导出
// ================================================================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { herbsDatabase, herbCategories };
}
// script标签加载时自动挂载到window
if (typeof window !== 'undefined') {
    window.herbsDatabase = herbsDatabase;
    window.herbCategories = herbCategories;
}
