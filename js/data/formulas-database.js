/**
 * 岐黄·辅助诊疗系统 — 方剂数据库
 * 包含105首经典中医方剂，覆盖17大类方剂
 * 数据来源：《方剂学》教材及相关经典医籍
 */

// ============================================================================
// 第一部分：方剂数据
// ============================================================================

const formulasDatabase = [
    // ===================================================================
    // 一、解表剂 — 辛温解表
    // ===================================================================
    {
        id: "formula_001",
        name: "麻黄汤",
        pinyin: "Ma Huang Tang",
        source: "《伤寒论》",
        category: "解表剂",
        subcategory: "辛温解表剂",
        composition: [
            { herbName: "麻黄", dosage: "9g", role: "君药" },
            { herbName: "桂枝", dosage: "6g", role: "臣药" },
            { herbName: "杏仁", dosage: "9g", role: "佐药" },
            { herbName: "炙甘草", dosage: "3g", role: "使药" }
        ],
        functions: ["发汗解表", "宣肺平喘"],
        indications: ["外感风寒表实证", "恶寒发热", "头身疼痛", "无汗而喘", "舌苔薄白", "脉浮紧"],
        analysis: "本方为发汗解表之峻剂。方中麻黄为君，辛温发汗解表，宣肺平喘；桂枝为臣，辛温解肌发表，助麻黄发汗之力；杏仁为佐，降利肺气，止咳平喘，与麻黄相伍一宣一降，调畅肺气；炙甘草为使，调和诸药，兼以和中。四药合用，共奏发汗解表、宣肺平喘之功。",
        keyPoints: ["恶寒发热", "无汗而喘", "脉浮紧"],
        relatedSyndromes: ["风寒表实证", "太阳伤寒证"],
        relatedConstitutions: ["平和质"],
        modifications: [
            { condition: "喘急较甚", modification: "加苏子、葶苈子以泻肺平喘" },
            { condition: "项背强痛", modification: "加葛根以升津舒筋" }
        ],
        contraindications: ["表虚自汗者禁用", "风热表证者禁用", "出血倾向者慎用"]
    },
    {
        id: "formula_002",
        name: "桂枝汤",
        pinyin: "Gui Zhi Tang",
        source: "《伤寒论》",
        category: "解表剂",
        subcategory: "辛温解表剂",
        composition: [
            { herbName: "桂枝", dosage: "9g", role: "君药" },
            { herbName: "白芍", dosage: "9g", role: "臣药" },
            { herbName: "生姜", dosage: "9g", role: "佐药" },
            { herbName: "大枣", dosage: "6枚", role: "佐药" },
            { herbName: "炙甘草", dosage: "6g", role: "使药" }
        ],
        functions: ["解肌发表", "调和营卫"],
        indications: ["外感风寒表虚证", "头痛发热", "汗出恶风", "鼻鸣干呕", "苔白不渴", "脉浮缓或浮弱"],
        analysis: "本方为群方之冠，调和营卫之祖方。方中桂枝为君，辛甘而温，解肌发表以散外感之风寒；白芍为臣，酸苦微寒，敛阴和营，与桂枝相伍，一散一收，调和营卫；生姜辛温，助桂枝解表，兼和胃止呕；大枣甘平，益气补中，与白芍配伍养阴和营；炙甘草调和诸药，与桂枝辛甘化阳以实卫，与白芍酸甘化阴以和营。",
        keyPoints: ["汗出", "恶风", "脉浮缓", "发热"],
        relatedSyndromes: ["营卫不和证", "风寒表虚证"],
        relatedConstitutions: ["气虚质", "阳虚质"],
        modifications: [
            { condition: "兼喘者", modification: "加厚朴、杏仁（桂枝加厚朴杏子汤）" },
            { condition: "项背强几几", modification: "加葛根（桂枝加葛根汤）" }
        ],
        contraindications: ["表实无汗者禁用", "湿热内蕴者慎用", "饮酒后不宜服用"]
    },
    {
        id: "formula_003",
        name: "小青龙汤",
        pinyin: "Xiao Qing Long Tang",
        source: "《伤寒论》",
        category: "解表剂",
        subcategory: "辛温解表剂",
        composition: [
            { herbName: "麻黄", dosage: "9g", role: "君药" },
            { herbName: "桂枝", dosage: "9g", role: "臣药" },
            { herbName: "白芍", dosage: "9g", role: "佐药" },
            { herbName: "干姜", dosage: "9g", role: "佐药" },
            { herbName: "细辛", dosage: "6g", role: "佐药" },
            { herbName: "炙甘草", dosage: "9g", role: "使药" },
            { herbName: "半夏", dosage: "9g", role: "佐药" },
            { herbName: "五味子", dosage: "6g", role: "佐药" }
        ],
        functions: ["解表散寒", "温肺化饮"],
        indications: ["外寒内饮证", "恶寒发热", "头身疼痛", "无汗", "喘咳痰多清稀", "胸膈痞满", "舌苔白滑", "脉浮"],
        analysis: "本方为治外寒内饮之要方。方中麻黄、桂枝为君，发汗解表散寒；干姜、细辛为臣，温肺化饮，助麻黄桂枝以解表；佐以半夏燥湿化痰、和胃降逆，五味子敛肺止咳、防辛散太过，白芍和营养血，与桂枝一散一收，调和营卫；炙甘草为使，益气和中，调和诸药。全方散中寓收、开中有阖，散寒化饮而不伤正。",
        keyPoints: ["恶寒发热", "喘咳", "痰多清稀", "舌苔白滑", "脉浮紧"],
        relatedSyndromes: ["风寒束表证", "寒饮停肺证", "外寒内饮证"],
        relatedConstitutions: ["阳虚质", "痰湿质"],
        modifications: [
            { condition: "烦躁口渴", modification: "加石膏（小青龙加石膏汤）" },
            { condition: "喉中痰鸣", modification: "加射干、紫菀、冬花" }
        ],
        contraindications: ["阴虚干咳者禁用", "痰热咳嗽者禁用", "虚喘者慎用"]
    },
    {
        id: "formula_004",
        name: "九味羌活汤",
        pinyin: "Jiu Wei Qiang Huo Tang",
        source: "《此事难知》引张元素方",
        category: "解表剂",
        subcategory: "辛温解表剂",
        composition: [
            { herbName: "羌活", dosage: "9g", role: "君药" },
            { herbName: "防风", dosage: "9g", role: "臣药" },
            { herbName: "苍术", dosage: "9g", role: "臣药" },
            { herbName: "细辛", dosage: "3g", role: "佐药" },
            { herbName: "川芎", dosage: "6g", role: "佐药" },
            { herbName: "白芷", dosage: "6g", role: "佐药" },
            { herbName: "生地黄", dosage: "6g", role: "佐药" },
            { herbName: "黄芩", dosage: "6g", role: "佐药" },
            { herbName: "甘草", dosage: "6g", role: "使药" }
        ],
        functions: ["发汗祛湿", "兼清里热"],
        indications: ["外感风寒湿邪，内有蕴热证", "恶寒发热", "无汗", "头痛项强", "肢体酸楚疼痛", "口苦微渴", "舌苔白或微黄", "脉浮"],
        analysis: "本方为四时感冒风寒湿邪之通剂。方中羌活为君，辛苦而温，祛风散寒除湿，通治周身关节疼痛；防风、苍术为臣，助羌活祛风除湿；细辛散寒止痛，川芎活血行气止痛，白芷散寒通窍止痛，三药共为佐使以止头身疼痛；生地黄、黄芩清泄里热，兼制诸药之温燥；甘草调和诸药。全方发表而不伤阴，清热而不碍表。",
        keyPoints: ["恶寒发热", "无汗", "头身疼痛", "口苦微渴", "脉浮"],
        relatedSyndromes: ["风寒夹湿证", "外感风寒湿邪证"],
        relatedConstitutions: ["平和质", "湿热质"],
        modifications: [
            { condition: "湿重胸满", modification: "去生地黄，加厚朴、枳壳" },
            { condition: "头痛剧", modification: "倍用川芎" }
        ],
        contraindications: ["风热表证者禁用", "阴虚内热者慎用"]
    },

    // ===================================================================
    // 二、解表剂 — 辛凉解表
    // ===================================================================
    {
        id: "formula_005",
        name: "银翘散",
        pinyin: "Yin Qiao San",
        source: "《温病条辨》",
        category: "解表剂",
        subcategory: "辛凉解表剂",
        composition: [
            { herbName: "金银花", dosage: "15g", role: "君药" },
            { herbName: "连翘", dosage: "15g", role: "君药" },
            { herbName: "薄荷", dosage: "6g", role: "臣药" },
            { herbName: "牛蒡子", dosage: "9g", role: "臣药" },
            { herbName: "荆芥穗", dosage: "6g", role: "佐药" },
            { herbName: "淡豆豉", dosage: "9g", role: "佐药" },
            { herbName: "桔梗", dosage: "9g", role: "佐药" },
            { herbName: "竹叶", dosage: "6g", role: "佐药" },
            { herbName: "芦根", dosage: "15g", role: "佐药" },
            { herbName: "甘草", dosage: "6g", role: "使药" }
        ],
        functions: ["辛凉透表", "清热解毒"],
        indications: ["温病初起", "风热感冒", "发热", "微恶风寒", "无汗或有汗不畅", "头痛口渴", "咳嗽咽痛", "舌尖红", "苔薄白或薄黄", "脉浮数"],
        analysis: "本方为辛凉解表之平剂，温病初起之代表方。方中金银花、连翘为君，辛凉透邪清热，芳香辟秽解毒；薄荷、牛蒡子为臣，疏散风热，清利头目咽喉，且助清热解毒；荆芥穗、淡豆豉辛温解表，透邪外出，防银翘过凉之弊；桔梗宣肺利咽，竹叶清心利水，芦根清热生津，共为佐药；甘草调和诸药为使。全方辛凉与辛温并用，透表与清热同施。",
        keyPoints: ["发热重恶寒轻", "咽痛", "口渴", "脉浮数", "舌尖红"],
        relatedSyndromes: ["风热犯表证", "温病卫分证"],
        relatedConstitutions: ["平和质", "阴虚质"],
        modifications: [
            { condition: "咽喉肿痛甚", modification: "加马勃、玄参" },
            { condition: "口渴甚", modification: "加天花粉" }
        ],
        contraindications: ["风寒感冒者禁用"]
    },
    {
        id: "formula_006",
        name: "桑菊饮",
        pinyin: "Sang Ju Yin",
        source: "《温病条辨》",
        category: "解表剂",
        subcategory: "辛凉解表剂",
        composition: [
            { herbName: "桑叶", dosage: "12g", role: "君药" },
            { herbName: "菊花", dosage: "9g", role: "臣药" },
            { herbName: "薄荷", dosage: "6g", role: "臣药" },
            { herbName: "连翘", dosage: "9g", role: "佐药" },
            { herbName: "桔梗", dosage: "9g", role: "佐药" },
            { herbName: "杏仁", dosage: "9g", role: "佐药" },
            { herbName: "芦根", dosage: "12g", role: "佐药" },
            { herbName: "甘草", dosage: "6g", role: "使药" }
        ],
        functions: ["疏风清热", "宣肺止咳"],
        indications: ["风温初起证", "风热咳嗽证", "但咳", "身热不甚", "口微渴", "舌苔薄白", "脉浮数"],
        analysis: "本方为治风热咳嗽之常用方。方中桑叶为君，疏风散热，清肺止咳；菊花、薄荷为臣，疏散风热，清利头目；连翘清热解毒，桔梗宣肺祛痰利咽，杏仁降利肺气止咳，芦根清热生津止渴，共为佐药；甘草调和诸药为使，兼能化痰止咳。全方辛凉轻清，宣肺止咳为主，清热解毒之力较银翘散为轻。",
        keyPoints: ["咳嗽", "身热不甚", "口微渴", "脉浮数"],
        relatedSyndromes: ["风热犯肺证", "风温袭肺证"],
        relatedConstitutions: ["阴虚质", "平和质"],
        modifications: [
            { condition: "咳痰黄稠", modification: "加黄芩、瓜蒌" },
            { condition: "口渴甚", modification: "加天花粉、知母" }
        ],
        contraindications: ["风寒咳嗽者禁用", "肺寒咳嗽者慎用"]
    },
    {
        id: "formula_007",
        name: "麻黄杏仁甘草石膏汤",
        pinyin: "Ma Xing Shi Gan Tang",
        source: "《伤寒论》",
        category: "解表剂",
        subcategory: "辛凉解表剂",
        composition: [
            { herbName: "麻黄", dosage: "9g", role: "君药" },
            { herbName: "石膏", dosage: "24g", role: "臣药" },
            { herbName: "杏仁", dosage: "9g", role: "佐药" },
            { herbName: "炙甘草", dosage: "6g", role: "使药" }
        ],
        functions: ["辛凉宣泄", "清肺平喘"],
        indications: ["表邪入里化热壅肺证", "身热不解", "咳逆气急", "甚则鼻煽", "口渴", "有汗或无汗", "舌苔薄白或薄黄", "脉浮数或滑数"],
        analysis: "本方为清宣肺热之祖方。方中麻黄为君，辛温宣肺平喘，且兼解表透邪；石膏为臣，辛甘大寒，清泄肺热，与麻黄相伍，一辛温一辛寒，相辅相成，增强宣肺泄热之功，且石膏倍于麻黄，制其辛温之性而存宣肺之用；杏仁为佐，宣降肺气，止咳平喘，助麻黄平喘之力；甘草为使，调和诸药，益气和中。全方寒温并用，清宣相合。",
        keyPoints: ["身热喘咳", "口渴", "脉浮数滑数", "舌红苔黄"],
        relatedSyndromes: ["肺热壅盛证", "热邪壅肺证"],
        relatedConstitutions: ["平和质", "痰湿质", "阴虚质"],
        modifications: [
            { condition: "痰多黄稠", modification: "加瓜蒌、黄芩、贝母" },
            { condition: "壮热烦渴", modification: "加知母、天花粉" }
        ],
        contraindications: ["风寒喘咳者禁用"]
    },

    // ===================================================================
    // 三、泻下剂 — 寒下剂
    // ===================================================================
    {
        id: "formula_008",
        name: "大承气汤",
        pinyin: "Da Cheng Qi Tang",
        source: "《伤寒论》",
        category: "泻下剂",
        subcategory: "寒下剂",
        composition: [
            { herbName: "大黄", dosage: "12g", role: "君药" },
            { herbName: "芒硝", dosage: "9g", role: "臣药" },
            { herbName: "厚朴", dosage: "12g", role: "佐药" },
            { herbName: "枳实", dosage: "12g", role: "佐药" }
        ],
        functions: ["峻下热结"],
        indications: ["阳明腑实证", "大便不通", "频转矢气", "脘腹痞满", "腹痛拒按", "按之硬", "甚或潮热谵语", "舌苔焦黄起刺或焦黑燥裂", "脉沉实"],
        analysis: "本方为峻下热结之代表方，寒下峻剂。方中大黄为君，苦寒泻热通便，荡涤肠胃积滞；芒硝为臣，咸寒软坚润燥，助大黄泻下热结；厚朴为佐，苦温宽肠下气，除满消胀；枳实为佐，苦辛微寒破气消积，助厚朴行气散结。四药合用，大黄、芒硝泻热荡积以治燥实，厚朴、枳实行气消痞以治痞满，共成攻下热结之峻剂。",
        keyPoints: ["痞", "满", "燥", "实", "苔焦黄", "脉沉实"],
        relatedSyndromes: ["阳明腑实证", "热结旁流证", "里热实结证"],
        relatedConstitutions: ["平和质", "湿热质"],
        modifications: [
            { condition: "无燥结", modification: "去芒硝（小承气汤）" },
            { condition: "痞满为主", modification: "去芒硝，加甘草（调胃承气汤）" }
        ],
        contraindications: ["孕妇禁用", "气虚便秘者禁用", "阴虚便秘者禁用", "表证未解者禁用"]
    },
    {
        id: "formula_009",
        name: "大黄牡丹汤",
        pinyin: "Da Huang Mu Dan Tang",
        source: "《金匮要略》",
        category: "泻下剂",
        subcategory: "寒下剂",
        composition: [
            { herbName: "大黄", dosage: "12g", role: "君药" },
            { herbName: "牡丹皮", dosage: "9g", role: "臣药" },
            { herbName: "桃仁", dosage: "12g", role: "臣药" },
            { herbName: "冬瓜仁", dosage: "30g", role: "佐药" },
            { herbName: "芒硝", dosage: "9g", role: "佐药" }
        ],
        functions: ["泻热破瘀", "散结消肿"],
        indications: ["肠痈初起", "右下腹疼痛拒按", "右足屈而不伸", "时时发热", "自汗恶寒", "舌苔薄腻微黄", "脉滑数"],
        analysis: "本方为治肠痈之祖方。方中大黄为君，泻热通便、逐瘀攻积；牡丹皮为臣，清热凉血、活血散瘀，与大黄相伍，共治肠中瘀热互结；桃仁破血祛瘀，助大黄、牡丹皮活血消肿，冬瓜仁清热利湿、消痈排脓，为治肠痈要药，芒硝咸寒软坚，助大黄泻下热结，共为佐药。全方泻热逐瘀并用，消散肠中瘀热壅结。",
        keyPoints: ["右下腹疼痛拒按", "发热恶寒", "苔薄黄", "脉滑数"],
        relatedSyndromes: ["肠痈瘀热证", "大肠热毒证"],
        relatedConstitutions: ["湿热质", "血瘀质"],
        modifications: [
            { condition: "脓未成", modification: "加强泻下活血之力" },
            { condition: "高热不退", modification: "加金银花、蒲公英、败酱草" }
        ],
        contraindications: ["肠痈已溃破者禁用", "孕妇禁用", "老人体弱者慎用"]
    },

    // ===================================================================
    // 四、泻下剂 — 温下剂/润下剂
    // ===================================================================
    {
        id: "formula_010",
        name: "温脾汤",
        pinyin: "Wen Pi Tang",
        source: "《备急千金要方》",
        category: "泻下剂",
        subcategory: "温下剂",
        composition: [
            { herbName: "大黄", dosage: "12g", role: "君药" },
            { herbName: "附子", dosage: "9g", role: "臣药" },
            { herbName: "干姜", dosage: "9g", role: "臣药" },
            { herbName: "人参", dosage: "9g", role: "佐药" },
            { herbName: "甘草", dosage: "6g", role: "使药" }
        ],
        functions: ["温补脾阳", "攻下寒积"],
        indications: ["脾阳不足，寒积内停证", "腹痛便秘", "脐下绞痛", "手足不温", "口不渴", "舌淡苔白", "脉沉弦而迟"],
        analysis: "本方为温下寒积之代表方。方中大黄为君，泻下通便以荡涤积滞；附子、干姜为臣，大辛大热，温中助阳以散寒凝，使大黄去其寒性而存其泻下之力；人参为佐，益气健脾，扶正以助祛邪，防大黄、附子攻伐太过而伤正；甘草为使，调和诸药，与干姜、人参相伍，益气温中。全方温中与攻下并施，寓补于攻之中。",
        keyPoints: ["腹痛便秘", "手足不温", "脉沉弦", "舌淡苔白"],
        relatedSyndromes: ["脾阳虚寒积证", "中阳不足证"],
        relatedConstitutions: ["阳虚质", "气虚质"],
        modifications: [
            { condition: "腹痛甚", modification: "加肉桂、木香" },
            { condition: "腹胀", modification: "加厚朴、莱菔子" }
        ],
        contraindications: ["热结便秘者禁用", "阴虚便秘者禁用"]
    },
    {
        id: "formula_011",
        name: "麻子仁丸",
        pinyin: "Ma Zi Ren Wan",
        source: "《伤寒论》",
        category: "泻下剂",
        subcategory: "润下剂",
        composition: [
            { herbName: "火麻仁", dosage: "30g", role: "君药" },
            { herbName: "杏仁", dosage: "12g", role: "臣药" },
            { herbName: "白芍", dosage: "12g", role: "臣药" },
            { herbName: "大黄", dosage: "9g", role: "佐药" },
            { herbName: "厚朴", dosage: "9g", role: "佐药" },
            { herbName: "枳实", dosage: "9g", role: "佐药" },
            { herbName: "蜂蜜", dosage: "为丸", role: "使药" }
        ],
        functions: ["润肠泄热", "行气通便"],
        indications: ["脾约证", "大便干结", "小便频数", "脘腹胀满", "舌红苔微黄少津", "脉数"],
        analysis: "本方为润下缓剂，治肠胃燥热、津液不足之脾约便秘。方中火麻仁为君，甘平质润多脂，润肠通便；杏仁为臣，降气润肠，白芍酸甘养阴和血，助火麻仁润燥通便；大黄泄热通便，厚朴行气除满，枳实破气消积，共为佐药，助通便之力但不峻猛；蜂蜜为使，润燥滑肠，调和诸药。全方润而不峻，攻补兼施。",
        keyPoints: ["大便干结", "小便频数", "舌红苔少"],
        relatedSyndromes: ["胃强脾弱证", "肠燥津亏证"],
        relatedConstitutions: ["阴虚质", "气虚质"],
        modifications: [
            { condition: "津伤严重", modification: "加生地黄、玄参、麦冬" },
            { condition: "痔疮便秘", modification: "加桃仁、当归" }
        ],
        contraindications: ["孕妇慎用", "气虚下陷之便秘者禁用"]
    },

    // ===================================================================
    // 五、和解剂 — 和解少阳
    // ===================================================================
    {
        id: "formula_012",
        name: "小柴胡汤",
        pinyin: "Xiao Chai Hu Tang",
        source: "《伤寒论》",
        category: "和解剂",
        subcategory: "和解少阳剂",
        composition: [
            { herbName: "柴胡", dosage: "24g", role: "君药" },
            { herbName: "黄芩", dosage: "9g", role: "臣药" },
            { herbName: "人参", dosage: "9g", role: "佐药" },
            { herbName: "半夏", dosage: "9g", role: "佐药" },
            { herbName: "生姜", dosage: "9g", role: "佐药" },
            { herbName: "大枣", dosage: "6枚", role: "佐药" },
            { herbName: "炙甘草", dosage: "9g", role: "使药" }
        ],
        functions: ["和解少阳"],
        indications: ["伤寒少阳证", "往来寒热", "胸胁苦满", "默默不欲饮食", "心烦喜呕", "口苦咽干", "目眩", "舌苔薄白", "脉弦"],
        analysis: "本方为和解少阳之代表方，伤寒少阳病之专方。方中柴胡为君，苦平而散，透达少阳之邪，疏解少阳经气郁滞；黄芩为臣，苦寒清泄少阳之热，与柴胡相伍，一散一清，共解少阳之邪；半夏、生姜和胃降逆止呕，人参、大枣益气健脾扶正，四药共为佐药，扶正祛邪；甘草为使，调和诸药，兼能和中。全方寒温并用，升降协调，扶正祛邪。",
        keyPoints: ["往来寒热", "胸胁苦满", "口苦咽干", "脉弦"],
        relatedSyndromes: ["少阳证", "半表半里证", "肝胆不和证"],
        relatedConstitutions: ["气郁质", "平和质"],
        modifications: [
            { condition: "胸中烦不呕", modification: "去半夏、人参，加瓜蒌实" },
            { condition: "口渴", modification: "去半夏，加天花粉" }
        ],
        contraindications: ["阴虚血少者慎用"]
    },
    {
        id: "formula_013",
        name: "蒿芩清胆汤",
        pinyin: "Hao Qin Qing Dan Tang",
        source: "《重订通俗伤寒论》",
        category: "和解剂",
        subcategory: "和解少阳剂",
        composition: [
            { herbName: "青蒿", dosage: "12g", role: "君药" },
            { herbName: "黄芩", dosage: "9g", role: "臣药" },
            { herbName: "竹茹", dosage: "12g", role: "佐药" },
            { herbName: "枳壳", dosage: "9g", role: "佐药" },
            { herbName: "半夏", dosage: "6g", role: "佐药" },
            { herbName: "陈皮", dosage: "6g", role: "佐药" },
            { herbName: "赤茯苓", dosage: "12g", role: "佐药" },
            { herbName: "碧玉散", dosage: "12g", role: "佐药" }
        ],
        functions: ["清胆利湿", "和胃化痰"],
        indications: ["少阳湿热证", "寒热如疟", "寒轻热重", "口苦胸闷", "吐酸苦水", "或呕黄涎而粘", "胸胁胀痛", "舌红苔白腻或黄腻", "脉数而右滑左弦"],
        analysis: "本方为治少阳湿热痰浊之方。方中青蒿为君，苦寒芳香，清透少阳邪热，且能化湿辟秽；黄芩为臣，苦寒清泄胆腑邪热，与青蒿相合，清胆泄热之力更著；竹茹清胆胃之热、化痰止呕，枳壳宽中下气除满，半夏燥湿化痰降逆，陈皮理气和胃化痰，赤茯苓、碧玉散清热利湿引邪从小便出，共为佐药。全方清胆与和胃并用，利湿与化痰兼顾。",
        keyPoints: ["寒轻热重", "口苦吐酸", "胸胁胀痛", "舌红苔黄腻"],
        relatedSyndromes: ["胆热痰扰证", "少阳湿热证"],
        relatedConstitutions: ["湿热质", "痰湿质"],
        modifications: [
            { condition: "呕多", modification: "倍半夏，加黄连" },
            { condition: "黄疸", modification: "加茵陈、栀子" }
        ],
        contraindications: ["寒湿证者禁用", "阴虚内热者慎用"]
    },

    // ===================================================================
    // 六、和解剂 — 调和肝脾/调和肠胃
    // ===================================================================
    {
        id: "formula_014",
        name: "逍遥散",
        pinyin: "Xiao Yao San",
        source: "《太平惠民和剂局方》",
        category: "和解剂",
        subcategory: "调和肝脾剂",
        composition: [
            { herbName: "柴胡", dosage: "9g", role: "君药" },
            { herbName: "当归", dosage: "9g", role: "臣药" },
            { herbName: "白芍", dosage: "9g", role: "臣药" },
            { herbName: "白术", dosage: "9g", role: "佐药" },
            { herbName: "茯苓", dosage: "9g", role: "佐药" },
            { herbName: "薄荷", dosage: "3g", role: "佐药" },
            { herbName: "烧生姜", dosage: "3g", role: "佐药" },
            { herbName: "炙甘草", dosage: "6g", role: "使药" }
        ],
        functions: ["疏肝解郁", "健脾养血"],
        indications: ["肝郁脾虚血弱证", "两胁胀痛", "头痛目眩", "口燥咽干", "神疲食少", "月经不调", "乳房胀痛", "脉弦而虚"],
        analysis: "本方为疏肝解郁之名方，治肝郁脾虚血弱之要方。方中柴胡为君，疏肝解郁，条达肝气；当归、白芍为臣，养血柔肝，与柴胡一疏一养，使肝气条达而不伤阴血；白术、茯苓健脾益气以实土防肝乘，薄荷少许可散肝郁所生之热，烧生姜温中和胃，共为佐药；甘草为使，调和诸药，与白芍配伍缓急止痛。全方疏养并用，肝脾同调。",
        keyPoints: ["两胁胀痛", "神疲食少", "月经不调", "脉弦虚"],
        relatedSyndromes: ["肝郁脾虚证", "肝气郁结证"],
        relatedConstitutions: ["气郁质", "气虚质"],
        modifications: [
            { condition: "肝郁化热", modification: "加牡丹皮、栀子（丹栀逍遥散）" },
            { condition: "血虚甚", modification: "加熟地黄" }
        ],
        contraindications: ["阴虚阳亢者慎用"]
    },
    {
        id: "formula_015",
        name: "痛泻要方",
        pinyin: "Tong Xie Yao Fang",
        source: "《丹溪心法》",
        category: "和解剂",
        subcategory: "调和肝脾剂",
        composition: [
            { herbName: "白术", dosage: "12g", role: "君药" },
            { herbName: "白芍", dosage: "12g", role: "臣药" },
            { herbName: "陈皮", dosage: "9g", role: "佐药" },
            { herbName: "防风", dosage: "6g", role: "使药" }
        ],
        functions: ["补脾柔肝", "祛湿止泻"],
        indications: ["脾虚肝旺之痛泻证", "肠鸣腹痛", "大便泄泻", "泻必腹痛", "泻后痛减", "舌苔薄白", "脉两关不调、左弦而右缓"],
        analysis: "本方为治脾虚肝旺腹痛泄泻之专方。方中白术为君，甘苦而温，健脾燥湿止泻；白芍为臣，酸寒柔肝，缓急止痛，与白术相配，土中泻木，肝脾同调；陈皮为佐，理气和中，燥湿醒脾；防风为使，辛散肝气、舒脾升清，且能胜湿止泻。四药配伍，补脾柔肝、祛湿止泻，使脾健肝柔则痛泻自止。",
        keyPoints: ["痛泻", "泻后痛减", "脉左弦右缓"],
        relatedSyndromes: ["肝旺脾虚证", "脾虚肝郁证"],
        relatedConstitutions: ["气郁质", "气虚质"],
        modifications: [
            { condition: "久泻不止", modification: "加升麻、赤石脂" },
            { condition: "夹食滞", modification: "加山楂、神曲" }
        ],
        contraindications: ["湿热泻痢者禁用", "伤食泻者慎用"]
    },
    {
        id: "formula_016",
        name: "半夏泻心汤",
        pinyin: "Ban Xia Xie Xin Tang",
        source: "《伤寒论》",
        category: "和解剂",
        subcategory: "调和肠胃剂",
        composition: [
            { herbName: "半夏", dosage: "12g", role: "君药" },
            { herbName: "黄芩", dosage: "9g", role: "臣药" },
            { herbName: "黄连", dosage: "3g", role: "臣药" },
            { herbName: "干姜", dosage: "9g", role: "佐药" },
            { herbName: "人参", dosage: "9g", role: "佐药" },
            { herbName: "大枣", dosage: "6枚", role: "佐药" },
            { herbName: "炙甘草", dosage: "9g", role: "使药" }
        ],
        functions: ["寒热平调", "散结消痞"],
        indications: ["寒热错杂之痞证", "心下痞满", "但满不痛", "恶心呕吐", "肠鸣下利", "舌苔腻微黄", "脉弦数"],
        analysis: "本方为治中虚寒热错杂、升降失常而心下痞满之代表方。方中半夏为君，辛苦而温，散结消痞、降逆止呕；黄芩、黄连为臣，苦寒泄热除痞；干姜为佐，辛热温中散寒，与芩、连寒热并用、辛开苦降；人参、大枣益气健脾以补中虚，助脾胃升降之枢机；甘草为使，调和诸药，兼以补中。全方寒热并用，辛开苦降，补泻兼施。",
        keyPoints: ["心下痞满", "但满不痛", "呕而肠鸣", "下利"],
        relatedSyndromes: ["寒热错杂痞证", "中焦寒热互结证"],
        relatedConstitutions: ["湿热质", "气虚质"],
        modifications: [
            { condition: "水气痞", modification: "减黄芩，加生姜（生姜泻心汤）" },
            { condition: "胃虚甚", modification: "倍甘草（甘草泻心汤）" }
        ],
        contraindications: ["纯实无虚者慎用", "纯寒无热者禁用"]
    },

    // ===================================================================
    // 七、清热剂 — 清气分热
    // ===================================================================
    {
        id: "formula_017",
        name: "白虎汤",
        pinyin: "Bai Hu Tang",
        source: "《伤寒论》",
        category: "清热剂",
        subcategory: "清气分热剂",
        composition: [
            { herbName: "石膏", dosage: "50g", role: "君药" },
            { herbName: "知母", dosage: "18g", role: "臣药" },
            { herbName: "粳米", dosage: "9g", role: "佐药" },
            { herbName: "炙甘草", dosage: "6g", role: "使药" }
        ],
        functions: ["清热生津"],
        indications: ["阳明气分热盛证", "壮热面赤", "烦渴引饮", "汗出恶热", "脉洪大有力"],
        analysis: "本方为清阳明气分热盛之祖方和代表方。方中石膏为君，辛甘大寒，直清阳明气分之壮热；知母为臣，苦寒质润，清热养阴，助石膏清热生津；粳米为佐，益胃护津，防石膏、知母大寒伤中；甘草为使，调和诸药，助粳米和中。四药合用，清透气分大热与滋养阴液并行，使热清津复、烦渴自解。",
        keyPoints: ["四大", "大热", "大汗", "大渴", "脉洪大"],
        relatedSyndromes: ["阳明气分热盛证", "气分热盛证"],
        relatedConstitutions: ["平和质", "阴虚质"],
        modifications: [
            { condition: "气津两伤", modification: "加人参（白虎加人参汤）" },
            { condition: "身重", modification: "加苍术（白虎加苍术汤）" }
        ],
        contraindications: ["表证未解者禁用", "血虚发热者禁用", "真寒假热者禁用"]
    },
    {
        id: "formula_018",
        name: "竹叶石膏汤",
        pinyin: "Zhu Ye Shi Gao Tang",
        source: "《伤寒论》",
        category: "清热剂",
        subcategory: "清气分热剂",
        composition: [
            { herbName: "竹叶", dosage: "12g", role: "君药" },
            { herbName: "石膏", dosage: "30g", role: "臣药" },
            { herbName: "人参", dosage: "6g", role: "佐药" },
            { herbName: "麦冬", dosage: "12g", role: "佐药" },
            { herbName: "半夏", dosage: "6g", role: "佐药" },
            { herbName: "粳米", dosage: "12g", role: "佐药" },
            { herbName: "炙甘草", dosage: "6g", role: "使药" }
        ],
        functions: ["清热生津", "益气和胃"],
        indications: ["伤寒、温热、暑病余热未清，气阴两伤证", "身热多汗", "心胸烦闷", "气逆欲呕", "口干喜饮", "虚烦不寐", "舌红少苔", "脉虚数"],
        analysis: "本方为清补之剂，由白虎汤化裁而来，治热病后期余热未清、气阴两伤。方中竹叶为君，甘淡而寒，清热除烦；石膏为臣，辛甘大寒，直清气分余热；人参、麦冬益气养阴生津，半夏降逆止呕，粳米益胃和中，共为佐药；甘草为使，调和诸药。全方清热与益气养阴并用，使余热得清、气阴得复。",
        keyPoints: ["身热多汗", "虚烦不寐", "气逆欲呕", "舌红少苔", "脉虚数"],
        relatedSyndromes: ["气阴两伤证", "余热未清证"],
        relatedConstitutions: ["阴虚质", "气虚质"],
        modifications: [
            { condition: "口渴甚", modification: "加天花粉、石斛" },
            { condition: "胃阴不足", modification: "加沙参、玉竹" }
        ],
        contraindications: ["实热证者慎用", "阳虚者禁用"]
    },

    // ===================================================================
    // 八、清热剂 — 清营凉血/清热解毒
    // ===================================================================
    {
        id: "formula_019",
        name: "清营汤",
        pinyin: "Qing Ying Tang",
        source: "《温病条辨》",
        category: "清热剂",
        subcategory: "清营凉血剂",
        composition: [
            { herbName: "犀角（现用水牛角代）", dosage: "30g", role: "君药" },
            { herbName: "生地黄", dosage: "15g", role: "臣药" },
            { herbName: "玄参", dosage: "9g", role: "臣药" },
            { herbName: "麦冬", dosage: "9g", role: "臣药" },
            { herbName: "金银花", dosage: "9g", role: "佐药" },
            { herbName: "连翘", dosage: "6g", role: "佐药" },
            { herbName: "竹叶", dosage: "3g", role: "佐药" },
            { herbName: "丹参", dosage: "6g", role: "佐药" },
            { herbName: "黄连", dosage: "5g", role: "佐药" }
        ],
        functions: ["清营解毒", "透热养阴"],
        indications: ["热入营分证", "身热夜甚", "心烦不寐", "神昏谵语", "斑疹隐隐", "口渴或不渴", "舌绛而干", "脉细数"],
        analysis: "本方为治热入营分之代表方。方中犀角（现用水牛角代）为君，咸寒清营凉血解毒；生地黄、玄参、麦冬为臣，甘寒清热凉血、养阴生津；金银花、连翘、竹叶轻清宣透，使营分之热有外达之路，寓「透热转气」之意，黄连清心泻火，丹参凉血活血，共为佐药。全方清营解毒、透热养阴，使入营之热透出气分而解。",
        keyPoints: ["身热夜甚", "心烦不寐", "神昏谵语", "舌绛而干", "脉细数"],
        relatedSyndromes: ["热入营分证", "营分热盛证"],
        relatedConstitutions: ["阴虚质", "湿热质"],
        modifications: [
            { condition: "神昏谵语重", modification: "加紫雪丹或安宫牛黄丸" },
            { condition: "斑疹透露", modification: "加紫草、大青叶" }
        ],
        contraindications: ["舌苔白滑者禁用（湿邪内阻）"]
    },
    {
        id: "formula_020",
        name: "犀角地黄汤",
        pinyin: "Xi Jiao Di Huang Tang",
        source: "《外台秘要》引《小品方》",
        category: "清热剂",
        subcategory: "清营凉血剂",
        composition: [
            { herbName: "犀角（现用水牛角代）", dosage: "30g", role: "君药" },
            { herbName: "生地黄", dosage: "30g", role: "臣药" },
            { herbName: "赤芍", dosage: "12g", role: "佐药" },
            { herbName: "牡丹皮", dosage: "9g", role: "佐药" }
        ],
        functions: ["清热解毒", "凉血散瘀"],
        indications: ["热入血分证", "身热谵语", "斑色紫黑", "吐血衄血", "尿血便血", "舌绛起刺", "脉细数"],
        analysis: "本方为治热入血分、热盛动血之要方。方中犀角（水牛角代）为君，咸寒凉血解毒，直清血分之热毒；生地黄为臣，甘寒凉血养阴，助犀角清解血分热毒，又能滋阴复其已伤之阴血；赤芍、牡丹皮为佐，凉血活血散瘀，防热与血结。四药合用，凉血与散血并用，使热清血宁而无留瘀之弊。",
        keyPoints: ["斑色紫黑", "出血", "舌绛起刺", "脉细数"],
        relatedSyndromes: ["热入血分证", "血热妄行证", "热盛动血证"],
        relatedConstitutions: ["血瘀质", "阴虚质"],
        modifications: [
            { condition: "吐血重", modification: "加侧柏叶、白茅根" },
            { condition: "神昏重", modification: "送服安宫牛黄丸" }
        ],
        contraindications: ["阳虚失血者禁用", "脾不统血者禁用"]
    },
    {
        id: "formula_021",
        name: "黄连解毒汤",
        pinyin: "Huang Lian Jie Du Tang",
        source: "《外台秘要》引崔氏方",
        category: "清热剂",
        subcategory: "清热解毒剂",
        composition: [
            { herbName: "黄连", dosage: "9g", role: "君药" },
            { herbName: "黄芩", dosage: "6g", role: "臣药" },
            { herbName: "黄柏", dosage: "6g", role: "臣药" },
            { herbName: "栀子", dosage: "9g", role: "佐药" }
        ],
        functions: ["泻火解毒"],
        indications: ["三焦火毒热盛证", "大热烦躁", "口燥咽干", "错语不眠", "热病吐衄", "热甚发斑", "外科痈疡疔毒", "小便黄赤", "舌红苔黄", "脉数有力"],
        analysis: "本方为清热解毒之基础方，治三焦火毒壅盛证。方中黄连为君，苦寒清心泻火，兼泻中焦之火；黄芩为臣，苦寒清上焦肺火；黄柏为臣，苦寒泻下焦之火；栀子为佐，苦寒通泻三焦之火，导热下行从小便而出。四药合用，三焦同清，表里兼顾，使火邪去而热毒解。全方纯泻无补，力专效宏。",
        keyPoints: ["三焦火毒", "烦躁错语", "吐衄发斑", "舌红苔黄", "脉数有力"],
        relatedSyndromes: ["三焦火毒证", "热毒壅盛证"],
        relatedConstitutions: ["湿热质", "湿热质"],
        modifications: [
            { condition: "便秘", modification: "加大黄" },
            { condition: "发黄", modification: "加茵陈、大黄" }
        ],
        contraindications: ["非实火者禁用", "脾胃虚寒者禁用"]
    },
    {
        id: "formula_022",
        name: "普济消毒饮",
        pinyin: "Pu Ji Xiao Du Yin",
        source: "《东垣试效方》",
        category: "清热剂",
        subcategory: "清热解毒剂",
        composition: [
            { herbName: "黄芩", dosage: "15g", role: "君药" },
            { herbName: "黄连", dosage: "15g", role: "君药" },
            { herbName: "牛蒡子", dosage: "6g", role: "臣药" },
            { herbName: "连翘", dosage: "6g", role: "臣药" },
            { herbName: "薄荷", dosage: "6g", role: "臣药" },
            { herbName: "僵蚕", dosage: "6g", role: "臣药" },
            { herbName: "板蓝根", dosage: "6g", role: "佐药" },
            { herbName: "马勃", dosage: "6g", role: "佐药" },
            { herbName: "玄参", dosage: "6g", role: "佐药" },
            { herbName: "桔梗", dosage: "6g", role: "佐药" },
            { herbName: "柴胡", dosage: "6g", role: "使药" },
            { herbName: "升麻", dosage: "6g", role: "使药" },
            { herbName: "陈皮", dosage: "6g", role: "佐药" },
            { herbName: "生甘草", dosage: "6g", role: "使药" }
        ],
        functions: ["清热解毒", "疏风散邪"],
        indications: ["大头瘟（风热疫毒壅于上焦）", "头面红肿焮痛", "咽喉不利", "目不能开", "舌燥口渴", "恶寒发热", "舌红苔薄白或微黄", "脉浮数有力"],
        analysis: "本方为治风热疫毒壅于上焦之大头瘟名方。方中黄芩、黄连为君，苦寒直折上焦热毒；牛蒡子、连翘、薄荷、僵蚕辛凉疏散风热，共为臣药，四药轻清上浮，升散郁火；板蓝根、马勃清热解毒利咽，玄参清热养阴，桔梗宣肺利咽，陈皮理气散结，共为佐药；升麻、柴胡升散郁热兼引药上达，甘草调和诸药，共为使药。全方清散并用，以清为主。",
        keyPoints: ["头面红肿焮痛", "恶寒发热", "咽喉不利", "脉浮数"],
        relatedSyndromes: ["风热疫毒证", "上焦热毒证"],
        relatedConstitutions: ["平和质", "阴虚质"],
        modifications: [
            { condition: "表证已解", modification: "去薄荷、柴胡" },
            { condition: "大便秘结", modification: "加大黄" }
        ],
        contraindications: ["非风热疫毒所致头面肿痛者禁用"]
    },

    // ===================================================================
    // 九、清热剂 — 清脏腑热/清虚热
    // ===================================================================
    {
        id: "formula_023",
        name: "龙胆泻肝汤",
        pinyin: "Long Dan Xie Gan Tang",
        source: "《医方集解》",
        category: "清热剂",
        subcategory: "清脏腑热剂",
        composition: [
            { herbName: "龙胆草", dosage: "9g", role: "君药" },
            { herbName: "黄芩", dosage: "9g", role: "臣药" },
            { herbName: "栀子", dosage: "9g", role: "臣药" },
            { herbName: "泽泻", dosage: "12g", role: "佐药" },
            { herbName: "木通", dosage: "9g", role: "佐药" },
            { herbName: "车前子", dosage: "9g", role: "佐药" },
            { herbName: "当归", dosage: "6g", role: "佐药" },
            { herbName: "生地黄", dosage: "12g", role: "佐药" },
            { herbName: "柴胡", dosage: "9g", role: "使药" },
            { herbName: "生甘草", dosage: "6g", role: "使药" }
        ],
        functions: ["清泻肝胆实火", "清利肝胆湿热"],
        indications: ["肝胆实火上炎证", "肝胆湿热下注证", "头痛目赤", "胁痛口苦", "耳聋耳肿", "阴肿阴痒", "带下黄臭", "小便淋浊", "舌红苔黄腻", "脉弦数有力"],
        analysis: "本方为清泻肝胆实火湿热之代表方。方中龙胆草为君，大苦大寒，直泻肝胆实火，兼清下焦湿热；黄芩、栀子为臣，苦寒清热泻火，助龙胆草清泄肝胆之火；泽泻、木通、车前子清热利湿，使湿热从小便而出，当归、生地黄滋阴养血，防苦寒伤阴、使邪去而不伤正，柴胡疏肝引经，共为佐药；甘草为使，调和诸药。全方清泻与渗利并用，标本兼顾。",
        keyPoints: ["胁痛口苦", "目赤耳聋", "舌红苔黄腻", "脉弦数有力"],
        relatedSyndromes: ["肝胆实火证", "肝胆湿热证"],
        relatedConstitutions: ["湿热质", "气郁质"],
        modifications: [
            { condition: "目赤甚", modification: "加菊花、夏枯草" },
            { condition: "胁痛甚", modification: "加川楝子、延胡索" }
        ],
        contraindications: ["脾胃虚寒者禁用", "阴虚火旺者慎用"]
    },
    {
        id: "formula_024",
        name: "青蒿鳖甲汤",
        pinyin: "Qing Hao Bie Jia Tang",
        source: "《温病条辨》",
        category: "清热剂",
        subcategory: "清虚热剂",
        composition: [
            { herbName: "青蒿", dosage: "9g", role: "君药" },
            { herbName: "鳖甲", dosage: "15g", role: "君药" },
            { herbName: "生地黄", dosage: "12g", role: "臣药" },
            { herbName: "知母", dosage: "9g", role: "臣药" },
            { herbName: "牡丹皮", dosage: "9g", role: "臣药" }
        ],
        functions: ["养阴透热"],
        indications: ["温病后期，邪伏阴分证", "夜热早凉", "热退无汗", "舌红少苔", "脉细数"],
        analysis: "本方为治温病后期阴虚邪伏之代表方。方中青蒿、鳖甲共为君药，青蒿苦寒芳香，清热透络，引邪外出；鳖甲咸寒滋阴，直入阴分，入络搜邪。两药相伍，有「先入后出」之妙——鳖甲引青蒿入阴分以搜邪，青蒿领邪气出阳分而解。生地黄、知母养阴清热，牡丹皮凉血散瘀，共为臣佐。全方养阴与透邪并举，使阴复而邪无所藏。",
        keyPoints: ["夜热早凉", "热退无汗", "舌红少苔", "脉细数"],
        relatedSyndromes: ["阴虚邪伏证", "余热未尽证"],
        relatedConstitutions: ["阴虚质", "湿热质"],
        modifications: [
            { condition: "阴虚甚", modification: "加麦冬、玄参" },
            { condition: "咳嗽", modification: "加川贝母、沙参" }
        ],
        contraindications: ["实热证者禁用", "邪在气分者禁用"]
    },

    // ===================================================================
    // 十、温里剂 — 温中祛寒
    // ===================================================================
    {
        id: "formula_025",
        name: "理中丸",
        pinyin: "Li Zhong Wan",
        source: "《伤寒论》",
        category: "温里剂",
        subcategory: "温中祛寒剂",
        composition: [
            { herbName: "干姜", dosage: "9g", role: "君药" },
            { herbName: "人参", dosage: "9g", role: "臣药" },
            { herbName: "白术", dosage: "9g", role: "佐药" },
            { herbName: "炙甘草", dosage: "9g", role: "使药" }
        ],
        functions: ["温中祛寒", "健脾益气"],
        indications: ["中焦虚寒证", "脘腹冷痛", "喜温喜按", "呕吐便溏", "自利不渴", "畏寒肢冷", "舌淡苔白", "脉沉细"],
        analysis: "本方为温中祛寒之基础方。方中干姜为君，大辛大热，温中祛寒，扶阳抑阴；人参为臣，甘温益气健脾，助干姜振奋脾阳；白术为佐，甘苦而温，健脾燥湿，助人参培补后天之本；炙甘草为使，益气和中，调和诸药。四药合用，温补并行，以温为主，使中焦之寒得散、阳气来复，脾胃健运。",
        keyPoints: ["脘腹冷痛", "喜温喜按", "自利不渴", "畏寒肢冷", "舌淡苔白"],
        relatedSyndromes: ["脾胃虚寒证", "中阳不足证"],
        relatedConstitutions: ["阳虚质", "气虚质"],
        modifications: [
            { condition: "寒重痛剧", modification: "加附子、肉桂" },
            { condition: "兼痰饮", modification: "加茯苓、半夏（理中化痰丸）" }
        ],
        contraindications: ["实热证者禁用", "阴虚内热者禁用"]
    },
    {
        id: "formula_026",
        name: "小建中汤",
        pinyin: "Xiao Jian Zhong Tang",
        source: "《伤寒论》",
        category: "温里剂",
        subcategory: "温中祛寒剂",
        composition: [
            { herbName: "饴糖", dosage: "30g", role: "君药" },
            { herbName: "桂枝", dosage: "9g", role: "臣药" },
            { herbName: "白芍", dosage: "18g", role: "臣药" },
            { herbName: "生姜", dosage: "9g", role: "佐药" },
            { herbName: "大枣", dosage: "6枚", role: "佐药" },
            { herbName: "炙甘草", dosage: "9g", role: "使药" }
        ],
        functions: ["温中补虚", "缓急止痛"],
        indications: ["虚劳里急证", "腹中时痛", "喜温喜按", "心悸虚烦", "面色无华", "四肢酸楚", "咽干口燥", "舌淡苔白", "脉细弦"],
        analysis: "本方为桂枝汤倍白芍加饴糖而成，变解表方为温中补虚之方。方中饴糖为君，甘温质润，温中补虚、缓急止痛；桂枝为臣，辛甘而温，温助阳气，与饴糖合用辛甘化阳以建中阳；白芍用量倍于桂枝，酸甘养阴、柔肝缓急止痛，与饴糖酸甘化阴以滋营血；生姜温胃散寒，大枣补脾益气，共为佐药；甘草为使，调和诸药。全方以甘味为主，辛甘化阳、酸甘化阴。",
        keyPoints: ["腹中时痛", "喜温喜按", "面色无华", "脉细弦"],
        relatedSyndromes: ["中焦虚寒证", "脾虚肝乘证", "虚劳里急证"],
        relatedConstitutions: ["阳虚质", "气虚质", "阴虚质"],
        modifications: [
            { condition: "气虚甚", modification: "加黄芪（黄芪建中汤）" },
            { condition: "血虚甚", modification: "加当归（当归建中汤）" }
        ],
        contraindications: ["湿热内蕴者禁用", "实热腹痛者禁用"]
    },

    // ===================================================================
    // 十一、温里剂 — 回阳救逆/温经散寒
    // ===================================================================
    {
        id: "formula_027",
        name: "四逆汤",
        pinyin: "Si Ni Tang",
        source: "《伤寒论》",
        category: "温里剂",
        subcategory: "回阳救逆剂",
        composition: [
            { herbName: "附子", dosage: "15g", role: "君药" },
            { herbName: "干姜", dosage: "9g", role: "臣药" },
            { herbName: "炙甘草", dosage: "9g", role: "使药" }
        ],
        functions: ["回阳救逆"],
        indications: ["少阴病阳气衰微证", "四肢厥逆", "恶寒蜷卧", "神疲欲寐", "呕吐腹痛", "下利清谷", "舌淡苔白滑", "脉沉微细欲绝"],
        analysis: "本方为回阳救逆之主方。方中附子为君，大辛大热，纯阳之品，温肾壮阳、回阳救逆，通行十二经脉；干姜为臣，辛热温中焦之阳、散里寒，与附子配合，一主先天温肾，一主后天暖脾，相须为用；炙甘草为使，益气补中、调和诸药，且甘缓以制附子之毒，又能助干姜温中。三药合用，大温大补，力挽垂绝之阳。",
        keyPoints: ["四肢厥逆", "神疲欲寐", "下利清谷", "脉沉微细欲绝"],
        relatedSyndromes: ["阳虚厥逆证", "少阴寒化证", "亡阳证"],
        relatedConstitutions: ["阳虚质"],
        modifications: [
            { condition: "阴阳俱脱", modification: "加人参（四逆加人参汤）" },
            { condition: "戴阳", modification: "加葱白（白通汤）" }
        ],
        contraindications: ["真热假寒者禁用", "阴虚内热者禁用"]
    },
    {
        id: "formula_028",
        name: "当归四逆汤",
        pinyin: "Dang Gui Si Ni Tang",
        source: "《伤寒论》",
        category: "温里剂",
        subcategory: "温经散寒剂",
        composition: [
            { herbName: "当归", dosage: "12g", role: "君药" },
            { herbName: "桂枝", dosage: "9g", role: "臣药" },
            { herbName: "白芍", dosage: "9g", role: "臣药" },
            { herbName: "细辛", dosage: "3g", role: "佐药" },
            { herbName: "通草", dosage: "6g", role: "佐药" },
            { herbName: "大枣", dosage: "8枚", role: "佐药" },
            { herbName: "炙甘草", dosage: "6g", role: "使药" }
        ],
        functions: ["温经散寒", "养血通脉"],
        indications: ["血虚寒厥证", "手足厥寒", "肢体痹痛", "腰腿冷痛", "舌淡苔白", "脉细欲绝或沉细"],
        analysis: "本方为温经散寒、养血通脉之代表方。方中当归为君，甘辛而温，养血活血通脉；桂枝为臣，辛甘而温，温经散寒、宣通阳气，与当归配伍，温通血脉；白芍养血和营，助当归养血之力，细辛辛温散寒，通达表里上下，共为臣药；通草通利经脉，大枣益气健脾养血，共为佐药；甘草为使，调和诸药。全方温而不燥、补而不滞。",
        keyPoints: ["手足厥寒", "脉细欲绝", "舌淡苔白"],
        relatedSyndromes: ["血虚寒凝证", "血虚寒厥证"],
        relatedConstitutions: ["阳虚质", "血瘀质"],
        modifications: [
            { condition: "内有久寒", modification: "加吴茱萸、生姜（当归四逆加吴茱萸生姜汤）" },
            { condition: "腰膝冷痛", modification: "加川断、杜仲、牛膝" }
        ],
        contraindications: ["热厥者禁用", "阴虚内热者慎用"]
    },

    // ===================================================================
    // 十二、补益剂 — 补气剂
    // ===================================================================
    {
        id: "formula_029",
        name: "四君子汤",
        pinyin: "Si Jun Zi Tang",
        source: "《太平惠民和剂局方》",
        category: "补益剂",
        subcategory: "补气剂",
        composition: [
            { herbName: "人参", dosage: "9g", role: "君药" },
            { herbName: "白术", dosage: "9g", role: "臣药" },
            { herbName: "茯苓", dosage: "9g", role: "佐药" },
            { herbName: "炙甘草", dosage: "6g", role: "使药" }
        ],
        functions: ["益气健脾"],
        indications: ["脾胃气虚证", "面色萎白", "语声低微", "气短乏力", "食少便溏", "舌淡苔白", "脉虚弱"],
        analysis: "本方为补气基础方。方中人参为君，甘温益气，大补脾胃之气；白术为臣，苦温健脾燥湿，与人参相须，增强益气健脾之力；茯苓为佐，甘淡渗湿健脾，与白术合用，健脾渗湿之功益彰；炙甘草为使，甘温益气和中，调和诸药。四药合用，甘温和缓，益气健脾而不燥烈，为补气之祖方。",
        keyPoints: ["面色萎白", "食少便溏", "气短乏力", "舌淡苔白", "脉虚弱"],
        relatedSyndromes: ["脾气虚证", "脾胃气虚证"],
        relatedConstitutions: ["气虚质"],
        modifications: [
            { condition: "兼脘腹胀闷", modification: "加陈皮（异功散）" },
            { condition: "兼痰湿", modification: "加陈皮、半夏（六君子汤）" }
        ],
        contraindications: ["实热证者禁用"]
    },
    {
        id: "formula_030",
        name: "补中益气汤",
        pinyin: "Bu Zhong Yi Qi Tang",
        source: "《内外伤辨惑论》",
        category: "补益剂",
        subcategory: "补气剂",
        composition: [
            { herbName: "黄芪", dosage: "18g", role: "君药" },
            { herbName: "人参", dosage: "9g", role: "臣药" },
            { herbName: "白术", dosage: "9g", role: "臣药" },
            { herbName: "当归", dosage: "6g", role: "佐药" },
            { herbName: "陈皮", dosage: "6g", role: "佐药" },
            { herbName: "升麻", dosage: "6g", role: "佐药" },
            { herbName: "柴胡", dosage: "6g", role: "佐药" },
            { herbName: "炙甘草", dosage: "6g", role: "使药" }
        ],
        functions: ["补中益气", "升阳举陷"],
        indications: ["脾胃气虚证", "气虚下陷证", "气虚发热证", "少气懒言", "体倦肢软", "面色萎黄", "大便溏薄", "脱肛", "子宫脱垂", "久泻久痢", "舌淡苔白", "脉虚大或细弱"],
        analysis: "本方为补气升阳、甘温除热之代表方。方中黄芪为君，甘温补中益气、升阳举陷；人参、白术为臣，益气健脾，助黄芪补中之力；当归养血和血，使气有所依，陈皮理气和胃，使补而不滞，升麻、柴胡升阳举陷，共为佐药；甘草为使，调和诸药。全方补气与升提并用，使脾胃之气得充，清阳得升，诸症自除。",
        keyPoints: ["少气懒言", "体倦肢软", "气虚下陷内脏下垂", "舌淡苔白", "脉虚"],
        relatedSyndromes: ["脾虚气陷证", "脾气虚证", "气虚发热证"],
        relatedConstitutions: ["气虚质", "阳虚质"],
        modifications: [
            { condition: "头痛", modification: "加蔓荆子、川芎" },
            { condition: "腹痛", modification: "加白芍" }
        ],
        contraindications: ["实热证者禁用", "阴虚火旺者禁用"]
    },

    // ===================================================================
    // 十三、补益剂 — 补血剂
    // ===================================================================
    {
        id: "formula_031",
        name: "四物汤",
        pinyin: "Si Wu Tang",
        source: "《仙授理伤续断秘方》",
        category: "补益剂",
        subcategory: "补血剂",
        composition: [
            { herbName: "熟地黄", dosage: "15g", role: "君药" },
            { herbName: "当归", dosage: "9g", role: "臣药" },
            { herbName: "白芍", dosage: "9g", role: "佐药" },
            { herbName: "川芎", dosage: "6g", role: "使药" }
        ],
        functions: ["补血和血"],
        indications: ["营血虚滞证", "面色萎黄", "头晕目眩", "心悸失眠", "唇爪无华", "月经不调", "经行腹痛", "舌淡", "脉细弦或细涩"],
        analysis: "本方为补血调经之基础方，妇科第一方。方中熟地黄为君，甘温味厚，滋阴养血填精，为养血补虚要药；当归为臣，甘辛而温，养血活血调经，既可助熟地黄补血之力，又可行滞通脉；白芍为佐，酸甘养血柔肝，敛阴止痛；川芎为使，辛温活血行气，使补而不滞。四药合用，动静结合，补血而不滞血，活血而不伤血。",
        keyPoints: ["面色萎黄", "头晕心悸", "唇甲色淡", "月经不调", "舌淡", "脉细"],
        relatedSyndromes: ["血虚证", "冲任虚损证"],
        relatedConstitutions: ["阴虚质"],
        modifications: [
            { condition: "血热妄行", modification: "熟地黄改为生地黄，白芍改为赤芍，去川芎" },
            { condition: "兼气虚", modification: "加人参、黄芪" }
        ],
        contraindications: ["湿盛中满者禁用", "阴虚发热者慎用"]
    },
    {
        id: "formula_032",
        name: "当归补血汤",
        pinyin: "Dang Gui Bu Xue Tang",
        source: "《内外伤辨惑论》",
        category: "补益剂",
        subcategory: "补血剂",
        composition: [
            { herbName: "黄芪", dosage: "30g", role: "君药" },
            { herbName: "当归", dosage: "6g", role: "臣药" }
        ],
        functions: ["补气生血"],
        indications: ["血虚发热证", "妇女经期或产后血虚发热头痛", "面赤肌热", "烦渴引饮", "脉洪大而虚", "重按无力"],
        analysis: "本方为补气生血之代表方，体现了「有形之血不能速生，无形之气所当急固」之旨。方中黄芪为君，用量五倍于当归，大补脾肺之气以资气血生化之源，使气旺血生；当归为臣，甘辛而温，养血和营。全方虽仅两味，但以黄芪为主，取其补气以生血，少量当归引血归经，使阳生阴长，血随气生。",
        keyPoints: ["血虚发热", "面色萎黄", "脉洪大重按无力"],
        relatedSyndromes: ["血虚证", "气血两虚证"],
        relatedConstitutions: ["阴虚质", "气虚质"],
        modifications: [
            { condition: "出血不止", modification: "加阿胶、艾叶、炮姜" },
            { condition: "气虚甚", modification: "加人参、白术" }
        ],
        contraindications: ["实热证者禁用"]
    },

    // ===================================================================
    // 十四、补益剂 — 气血双补/补阴
    // ===================================================================
    {
        id: "formula_033",
        name: "八珍汤",
        pinyin: "Ba Zhen Tang",
        source: "《瑞竹堂经验方》",
        category: "补益剂",
        subcategory: "气血双补剂",
        composition: [
            { herbName: "人参", dosage: "9g", role: "君药" },
            { herbName: "熟地黄", dosage: "12g", role: "君药" },
            { herbName: "白术", dosage: "9g", role: "臣药" },
            { herbName: "当归", dosage: "9g", role: "臣药" },
            { herbName: "茯苓", dosage: "9g", role: "佐药" },
            { herbName: "白芍", dosage: "9g", role: "佐药" },
            { herbName: "川芎", dosage: "6g", role: "佐药" },
            { herbName: "炙甘草", dosage: "6g", role: "使药" }
        ],
        functions: ["益气补血"],
        indications: ["气血两虚证", "面色萎黄或苍白", "头晕目眩", "四肢倦怠", "气短懒言", "心悸怔忡", "食欲减退", "舌淡苔薄白", "脉细弱或虚大无力"],
        analysis: "本方由四君子汤合四物汤而成，为气血双补之基础方。方中人参、熟地黄为君，人参甘温益气健脾，熟地黄甘温滋阴养血，二药相合，益气养血；白术、当归为臣，助人参、熟地黄补气养血；茯苓健脾渗湿，白芍养血柔肝，川芎活血行气，共为佐药，使补而不滞；甘草益气和中，调和诸药为使。全方补气与养血并重。",
        keyPoints: ["面色萎黄或苍白", "四肢倦怠", "气短懒言", "舌淡苔白", "脉细弱"],
        relatedSyndromes: ["气血两虚证", "心脾气血两虚证"],
        relatedConstitutions: ["气虚质", "阴虚质"],
        modifications: [
            { condition: "兼阳虚", modification: "加肉桂、黄芪（十全大补汤）" },
            { condition: "血虚失眠", modification: "加酸枣仁、远志" }
        ],
        contraindications: ["实热证者禁用", "湿热内蕴者慎用"]
    },
    {
        id: "formula_034",
        name: "六味地黄丸",
        pinyin: "Liu Wei Di Huang Wan",
        source: "《小儿药证直诀》",
        category: "补益剂",
        subcategory: "补阴剂",
        composition: [
            { herbName: "熟地黄", dosage: "24g", role: "君药" },
            { herbName: "山茱萸", dosage: "12g", role: "臣药" },
            { herbName: "山药", dosage: "12g", role: "臣药" },
            { herbName: "泽泻", dosage: "9g", role: "佐药" },
            { herbName: "牡丹皮", dosage: "9g", role: "佐药" },
            { herbName: "茯苓", dosage: "9g", role: "佐药" }
        ],
        functions: ["滋阴补肾"],
        indications: ["肾阴虚证", "腰膝酸软", "头晕目眩", "耳鸣耳聋", "盗汗梦遗", "消渴", "骨蒸潮热", "手足心热", "咽燥口干", "牙齿动摇", "舌红少苔", "脉细数"],
        analysis: "本方为补肾阴之祖方，治肾阴虚诸证。方中熟地黄为君，甘温味厚，滋阴补肾填精益髓，壮水之主；山茱萸补肝肾、固精气，山药补脾固精，二药为臣，助熟地黄补肾固精；泽泻利湿泄肾浊、防熟地黄滋腻，牡丹皮清泄虚火、制山茱萸之温涩，茯苓淡渗脾湿、助山药之健运，三补三泻，以补为主，补中有泻，寓泻于补。",
        keyPoints: ["腰膝酸软", "头晕目眩", "盗汗遗精", "舌红少苔", "脉细数"],
        relatedSyndromes: ["肾阴虚证", "肾精亏损证"],
        relatedConstitutions: ["阴虚质"],
        modifications: [
            { condition: "阴虚火旺", modification: "加知母、黄柏（知柏地黄丸）" },
            { condition: "视物昏花", modification: "加枸杞子、菊花（杞菊地黄丸）" }
        ],
        contraindications: ["脾虚便溏者慎用", "湿热内蕴者禁用"]
    },

    // ===================================================================
    // 十五、补益剂 — 补阳/阴阳双补
    // ===================================================================
    {
        id: "formula_035",
        name: "肾气丸",
        pinyin: "Shen Qi Wan",
        source: "《金匮要略》",
        category: "补益剂",
        subcategory: "补阳剂",
        composition: [
            { herbName: "干地黄", dosage: "24g", role: "君药" },
            { herbName: "山茱萸", dosage: "12g", role: "臣药" },
            { herbName: "山药", dosage: "12g", role: "臣药" },
            { herbName: "附子", dosage: "3g", role: "臣药" },
            { herbName: "桂枝", dosage: "3g", role: "臣药" },
            { herbName: "泽泻", dosage: "9g", role: "佐药" },
            { herbName: "牡丹皮", dosage: "9g", role: "佐药" },
            { herbName: "茯苓", dosage: "9g", role: "佐药" }
        ],
        functions: ["补肾助阳"],
        indications: ["肾阳不足证", "腰痛脚软", "下半身常有冷感", "少腹拘急", "小便不利或反多", "阳痿早泄", "舌淡而胖", "脉沉细"],
        analysis: "本方为补肾阳之祖方，体现「阴中求阳」之妙。方中重用干地黄（或熟地黄）为君，滋阴补肾填精；山茱萸、山药补肝肾、固精，为臣；附子、桂枝用量极轻，于大队滋阴药中少佐补阳之品，意在微微生火以生肾气，取「少火生气」之意，亦为臣药；泽泻、牡丹皮、茯苓三泻以制滋补之腻，共为佐药。全方阴中求阳，温而不燥。",
        keyPoints: ["腰痛", "下半身冷感", "小便不利或反多", "舌淡胖", "脉沉细"],
        relatedSyndromes: ["肾阳虚证", "肾气不固证"],
        relatedConstitutions: ["阳虚质"],
        modifications: [
            { condition: "腰重脚肿", modification: "加牛膝、车前子（济生肾气丸）" },
            { condition: "阳痿", modification: "加淫羊藿、巴戟天" }
        ],
        contraindications: ["肾阴虚火旺者禁用", "湿热内盛者慎用"]
    },
    {
        id: "formula_036",
        name: "地黄饮子",
        pinyin: "Di Huang Yin Zi",
        source: "《圣济总录》",
        category: "补益剂",
        subcategory: "阴阳双补剂",
        composition: [
            { herbName: "熟地黄", dosage: "15g", role: "君药" },
            { herbName: "山茱萸", dosage: "9g", role: "臣药" },
            { herbName: "肉苁蓉", dosage: "9g", role: "臣药" },
            { herbName: "巴戟天", dosage: "9g", role: "臣药" },
            { herbName: "附子", dosage: "6g", role: "臣药" },
            { herbName: "肉桂", dosage: "6g", role: "臣药" },
            { herbName: "石斛", dosage: "9g", role: "佐药" },
            { herbName: "麦冬", dosage: "9g", role: "佐药" },
            { herbName: "五味子", dosage: "6g", role: "佐药" },
            { herbName: "石菖蒲", dosage: "6g", role: "佐药" },
            { herbName: "远志", dosage: "6g", role: "佐药" },
            { herbName: "茯苓", dosage: "9g", role: "佐药" },
            { herbName: "生姜", dosage: "3g", role: "使药" },
            { herbName: "大枣", dosage: "3枚", role: "使药" },
            { herbName: "薄荷", dosage: "3g", role: "使药" }
        ],
        functions: ["滋肾阴", "补肾阳", "开窍化痰"],
        indications: ["暗痱（肾阴阳两虚，痰浊上泛）", "舌强不能言", "足废不能用", "口干不欲饮", "足冷面赤", "脉沉细弱"],
        analysis: "本方为治肾阴阳两虚、痰浊上泛之暗痱的专方。方中熟地黄为君，滋阴补肾填精；山茱萸、肉苁蓉、巴戟天补肾助阳，附子、肉桂温肾阳以助气化，共为臣药；石斛、麦冬滋阴养液，五味子敛阴固肾，石菖蒲、远志化痰开窍，茯苓利水化痰，共为佐药；生姜、大枣、薄荷为使，调和营卫。全方阴阳并补，标本兼顾。",
        keyPoints: ["舌强不能言", "足废不能用", "脉沉细弱"],
        relatedSyndromes: ["肾阴阳两虚证", "暗痱证"],
        relatedConstitutions: ["阳虚质", "阴虚质"],
        modifications: [
            { condition: "阴虚甚", modification: "去附子、肉桂，加知母、黄柏" },
            { condition: "痰浊重", modification: "加半夏、天南星" }
        ],
        contraindications: ["纯实热痰火者禁用"]
    },

    // ===================================================================
    // 十六、固涩剂
    // ===================================================================
    {
        id: "formula_037",
        name: "玉屏风散",
        pinyin: "Yu Ping Feng San",
        source: "《究原方》",
        category: "固涩剂",
        subcategory: "固表止汗剂",
        composition: [
            { herbName: "黄芪", dosage: "30g", role: "君药" },
            { herbName: "白术", dosage: "30g", role: "臣药" },
            { herbName: "防风", dosage: "15g", role: "佐药" }
        ],
        functions: ["益气固表", "止汗"],
        indications: ["表虚自汗证", "汗出恶风", "面色萎白", "平素易感风邪", "舌淡苔薄白", "脉浮虚"],
        analysis: "本方为益气固表止汗之经典方。方中黄芪为君，甘温益气，内可大补脾肺之气，外可固表止汗；白术为臣，健脾益气，助黄芪固表之力，使气旺表实，汗不外泄，邪不易侵；防风为佐，走表祛风并御风邪，与黄芪相伍，黄芪得防风，固表而不留邪，防风得黄芪，祛邪而不伤正。三药合用，散中寓补，补中兼疏。",
        keyPoints: ["自汗恶风", "易感风邪", "面色萎白", "脉虚"],
        relatedSyndromes: ["肺卫不固证", "气虚外感证"],
        relatedConstitutions: ["气虚质"],
        modifications: [
            { condition: "汗多不止", modification: "加浮小麦、牡蛎、麻黄根" },
            { condition: "兼阴虚", modification: "加生熟地黄、白芍" }
        ],
        contraindications: ["阴虚盗汗者慎用", "实热汗出者禁用"]
    },
    {
        id: "formula_038",
        name: "四神丸",
        pinyin: "Si Shen Wan",
        source: "《内科摘要》",
        category: "固涩剂",
        subcategory: "涩肠止泻剂",
        composition: [
            { herbName: "补骨脂", dosage: "12g", role: "君药" },
            { herbName: "肉豆蔻", dosage: "9g", role: "臣药" },
            { herbName: "吴茱萸", dosage: "6g", role: "佐药" },
            { herbName: "五味子", dosage: "9g", role: "佐药" },
            { herbName: "生姜", dosage: "12g", role: "佐药" },
            { herbName: "大枣", dosage: "5枚", role: "使药" }
        ],
        functions: ["温补脾肾", "涩肠止泻"],
        indications: ["脾肾虚寒之五更泄泻", "五更泄泻（黎明前脐下作痛，肠鸣即泻）", "完谷不化", "饮食不思", "腰酸肢冷", "舌淡苔白", "脉沉迟无力"],
        analysis: "本方为治脾肾虚寒、五更泄泻之专方。方中补骨脂为君，辛苦大温，补命门之火以温暖脾土；肉豆蔻为臣，辛温暖脾涩肠止泻，与补骨脂相配，一温肾一温脾；吴茱萸辛热暖脾温肾散寒，五味子酸温收敛固涩、涩肠止泻，共为佐药；生姜暖胃散寒，大枣补脾益气，以助温涩之力。全方温补与涩敛并用。",
        keyPoints: ["五更泄泻", "完谷不化", "腰酸肢冷", "脉沉迟无力"],
        relatedSyndromes: ["脾肾阳虚证", "命门火衰证"],
        relatedConstitutions: ["阳虚质", "气虚质"],
        modifications: [
            { condition: "久泻脱肛", modification: "加黄芪、升麻" },
            { condition: "腹痛甚", modification: "加木香、白芍" }
        ],
        contraindications: ["湿热泄泻者禁用", "伤食泄泻者禁用"]
    },
    {
        id: "formula_039",
        name: "金锁固精丸",
        pinyin: "Jin Suo Gu Jing Wan",
        source: "《医方集解》",
        category: "固涩剂",
        subcategory: "固精止遗剂",
        composition: [
            { herbName: "沙苑蒺藜", dosage: "12g", role: "君药" },
            { herbName: "芡实", dosage: "12g", role: "臣药" },
            { herbName: "莲须", dosage: "12g", role: "臣药" },
            { herbName: "龙骨", dosage: "15g", role: "佐药" },
            { herbName: "牡蛎", dosage: "15g", role: "佐药" },
            { herbName: "莲子肉", dosage: "15g", role: "使药" }
        ],
        functions: ["补肾涩精"],
        indications: ["肾虚精关不固证", "遗精滑泄", "夜梦遗精", "腰酸耳鸣", "四肢酸软", "神疲乏力", "舌淡苔白", "脉细弱"],
        analysis: "本方为固肾涩精之专方。方中沙苑蒺藜为君，甘温补益肝肾、固精缩尿；芡实、莲须为臣，固肾涩精，助沙苑蒺藜增强固涩之力；龙骨、牡蛎重镇安神、收敛固涩，共为佐药，潜镇浮阳、安神定志，使心神宁静以制相火妄动；莲子肉为使，清心益肾，补脾固涩。全方以固涩为主，配合补肾，标本兼顾。",
        keyPoints: ["遗精滑泄", "腰酸耳鸣", "脉细弱"],
        relatedSyndromes: ["肾气不固证", "精关不固证"],
        relatedConstitutions: ["阳虚质", "阴虚质"],
        modifications: [
            { condition: "相火妄动", modification: "加知母、黄柏" },
            { condition: "肾阳虚甚", modification: "加锁阳、巴戟天" }
        ],
        contraindications: ["湿热下注所致遗精者禁用", "君相火动之遗精者慎用"]
    },

    // ===================================================================
    // 十七、安神剂 — 重镇安神/滋养安神
    // ===================================================================
    {
        id: "formula_040",
        name: "朱砂安神丸",
        pinyin: "Zhu Sha An Shen Wan",
        source: "《内外伤辨惑论》",
        category: "安神剂",
        subcategory: "重镇安神剂",
        composition: [
            { herbName: "朱砂", dosage: "15g（为极细末）", role: "君药" },
            { herbName: "黄连", dosage: "18g", role: "臣药" },
            { herbName: "当归", dosage: "8g", role: "佐药" },
            { herbName: "生地黄", dosage: "8g", role: "佐药" },
            { herbName: "炙甘草", dosage: "16g", role: "使药" }
        ],
        functions: ["重镇安神", "清心泻火"],
        indications: ["心火上扰阴血不足之神志不安证", "心神烦乱", "惊悸不安", "失眠多梦", "胸中烦热", "舌红", "脉细数"],
        analysis: "本方为治疗心火上扰、阴血不足之心烦失眠证的常用方。方中朱砂为君，性寒质重，直入心经，镇心安神，清泄心火；黄连为臣，苦寒清心泻火除烦，助朱砂清火安神之力；当归、生地黄为佐，养血滋阴以补其被火灼伤之阴血；甘草为使，调和诸药，且能缓朱砂、黄连之峻。全方镇清并用，辅以滋养，使心火清、阴血复、心神安。",
        keyPoints: ["惊悸不安", "心烦失眠", "舌红", "脉细数"],
        relatedSyndromes: ["心火亢盛证", "心神不宁证"],
        relatedConstitutions: ["阴虚质", "湿热质"],
        modifications: [
            { condition: "惊悸甚", modification: "加龙骨、牡蛎" },
            { condition: "失眠多梦", modification: "加酸枣仁、柏子仁" }
        ],
        contraindications: ["朱砂有毒，不宜久服多服", "脾胃虚弱者慎用", "肝肾功能不全者禁用"]
    },
    {
        id: "formula_041",
        name: "酸枣仁汤",
        pinyin: "Suan Zao Ren Tang",
        source: "《金匮要略》",
        category: "安神剂",
        subcategory: "滋养安神剂",
        composition: [
            { herbName: "酸枣仁", dosage: "30g", role: "君药" },
            { herbName: "知母", dosage: "9g", role: "臣药" },
            { herbName: "茯苓", dosage: "9g", role: "佐药" },
            { herbName: "川芎", dosage: "6g", role: "佐药" },
            { herbName: "甘草", dosage: "3g", role: "使药" }
        ],
        functions: ["养血安神", "清热除烦"],
        indications: ["肝血不足，虚热扰神证", "虚烦不得眠", "失眠心悸", "头晕目眩", "咽干口燥", "舌红少苔", "脉细弦"],
        analysis: "本方为治肝血不足、血不养心之虚烦失眠的要方。方中酸枣仁为君，重用甘平入心肝之经，养血补肝、宁心安神；知母为臣，苦寒滋阴清热除烦，与酸枣仁相配，一补一清，使肝血充、虚热除；茯苓宁心安神，川芎辛散，调肝血、疏肝气，与酸枣仁一收一散，相反相成，共为佐药；甘草为使，调和诸药，兼可和中。全方以养血安神为主。",
        keyPoints: ["虚烦不眠", "心悸", "舌红少苔", "脉细弦"],
        relatedSyndromes: ["肝血不足证", "心虚神扰证"],
        relatedConstitutions: ["阴虚质", "阴虚质"],
        modifications: [
            { condition: "多梦易惊", modification: "加龙骨、牡蛎" },
            { condition: "阴虚燥热甚", modification: "加生地黄、麦冬" }
        ],
        contraindications: ["实热烦躁者禁用"]
    },
    {
        id: "formula_042",
        name: "天王补心丹",
        pinyin: "Tian Wang Bu Xin Dan",
        source: "《校注妇人良方》",
        category: "安神剂",
        subcategory: "滋养安神剂",
        composition: [
            { herbName: "生地黄", dosage: "30g", role: "君药" },
            { herbName: "玄参", dosage: "15g", role: "臣药" },
            { herbName: "天冬", dosage: "15g", role: "臣药" },
            { herbName: "麦冬", dosage: "15g", role: "臣药" },
            { herbName: "丹参", dosage: "15g", role: "臣药" },
            { herbName: "当归", dosage: "15g", role: "臣药" },
            { herbName: "酸枣仁", dosage: "30g", role: "佐药" },
            { herbName: "柏子仁", dosage: "15g", role: "佐药" },
            { herbName: "远志", dosage: "15g", role: "佐药" },
            { herbName: "茯苓", dosage: "15g", role: "佐药" },
            { herbName: "人参", dosage: "15g", role: "佐药" },
            { herbName: "五味子", dosage: "15g", role: "佐药" },
            { herbName: "桔梗", dosage: "15g", role: "使药" },
            { herbName: "朱砂", dosage: "极少量", role: "使药" }
        ],
        functions: ["滋阴养血", "补心安神"],
        indications: ["阴虚血少，神志不安证", "心悸失眠", "虚烦神疲", "梦遗健忘", "手足心热", "口舌生疮", "舌红少苔", "脉细数"],
        analysis: "本方为治心肾阴虚血少之心悸失眠的常用方。方中生地黄为君，甘寒滋阴清热，滋补心肾之阴；玄参、天冬、麦冬助生地黄滋阴清热，共为臣药；酸枣仁、柏子仁养心安神，远志交通心肾，茯苓宁心安神，人参益气生血，五味子酸收敛阴，当归、丹参养血活血，共为佐药；桔梗载药上行，朱砂镇心安神，共为使药。全方滋中寓清，心肾同调。",
        keyPoints: ["心悸失眠", "手足心热", "舌红少苔", "脉细数"],
        relatedSyndromes: ["心阴虚证", "心肾不交证"],
        relatedConstitutions: ["阴虚质"],
        modifications: [
            { condition: "阴虚火旺甚", modification: "加知母、黄柏" },
            { condition: "失眠重", modification: "加夜交藤、合欢皮" }
        ],
        contraindications: ["朱砂有毒，不宜久服", "脾胃虚弱便溏者慎用"]
    },

    // ===================================================================
    // 十八、开窍剂
    // ===================================================================
    {
        id: "formula_043",
        name: "安宫牛黄丸",
        pinyin: "An Gong Niu Huang Wan",
        source: "《温病条辨》",
        category: "开窍剂",
        subcategory: "凉开剂",
        composition: [
            { herbName: "牛黄", dosage: "30g", role: "君药" },
            { herbName: "犀角（水牛角代）", dosage: "30g", role: "君药" },
            { herbName: "麝香", dosage: "7.5g", role: "君药" },
            { herbName: "黄连", dosage: "30g", role: "臣药" },
            { herbName: "黄芩", dosage: "30g", role: "臣药" },
            { herbName: "栀子", dosage: "30g", role: "臣药" },
            { herbName: "冰片", dosage: "7.5g", role: "佐药" },
            { herbName: "郁金", dosage: "30g", role: "佐药" },
            { herbName: "雄黄", dosage: "30g", role: "佐药" },
            { herbName: "朱砂", dosage: "30g", role: "佐药" },
            { herbName: "珍珠", dosage: "15g", role: "佐药" },
            { herbName: "金箔衣", dosage: "适量", role: "使药" }
        ],
        functions: ["清热解毒", "豁痰开窍"],
        indications: ["热陷心包证", "高热烦躁", "神昏谵语", "痉厥抽搐", "舌红绛", "脉细数"],
        analysis: "本方为凉开之代表方，治热陷心包之高热神昏谵语证。方中牛黄清心解毒、豁痰开窍，犀角（水牛角代）清心凉血解毒，麝香芳香辟秽、开窍通闭，三药共为君药，力专效宏；黄连、黄芩、栀子为臣，苦寒清热泻火解毒，助牛黄、犀角清解心包热毒；冰片、郁金芳香辟秽、通窍开闭，雄黄豁痰解毒，朱砂、珍珠镇心安神，共为佐药。",
        keyPoints: ["高热烦躁", "神昏谵语", "舌红绛", "脉细数"],
        relatedSyndromes: ["热陷心包证", "热毒闭窍证"],
        relatedConstitutions: ["阴虚质", "湿热质"],
        modifications: [
            { condition: "昏迷重", modification: "合用至宝丹" },
            { condition: "热盛惊厥", modification: "合用紫雪" }
        ],
        contraindications: ["寒闭证禁用", "孕妇禁用", "脱证禁用"]
    },
    {
        id: "formula_044",
        name: "紫雪",
        pinyin: "Zi Xue",
        source: "《外台秘要》引《苏恭方》",
        category: "开窍剂",
        subcategory: "凉开剂",
        composition: [
            { herbName: "石膏", dosage: "144g", role: "君药" },
            { herbName: "寒水石", dosage: "144g", role: "君药" },
            { herbName: "滑石", dosage: "144g", role: "君药" },
            { herbName: "犀角（水牛角代）", dosage: "15g", role: "臣药" },
            { herbName: "羚羊角", dosage: "15g", role: "臣药" },
            { herbName: "麝香", dosage: "3.6g", role: "臣药" },
            { herbName: "升麻", dosage: "15g", role: "佐药" },
            { herbName: "玄参", dosage: "48g", role: "佐药" },
            { herbName: "甘草", dosage: "24g", role: "使药" },
            { herbName: "朱砂", dosage: "9g", role: "佐药" },
            { herbName: "芒硝", dosage: "480g", role: "佐药" }
        ],
        functions: ["清热开窍", "息风止痉"],
        indications: ["热陷心包热盛动风证", "高热烦躁", "神昏谵语", "痉厥抽搐", "口渴唇焦", "尿赤便秘", "舌红绛", "脉弦数"],
        analysis: "本方为凉开三宝之一，擅长清热镇痉。方中石膏、寒水石、滑石为君，甘寒大寒，清气分实热，泻火除烦；犀角（水牛角代）清心凉血，羚羊角凉肝息风止痉，麝香芳香开窍，共为臣药；升麻清热解毒透邪，玄参养阴清热，芒硝泄热通便，朱砂镇心安神，共为佐药；甘草为使，调和诸药且解毒。全方清热与开窍并重，尤擅息风止痉。",
        keyPoints: ["高热神昏", "痉厥抽搐", "舌红绛", "脉弦数"],
        relatedSyndromes: ["热盛动风证", "热陷心包兼肝风内动证"],
        relatedConstitutions: ["阴虚质", "湿热质"],
        modifications: [
            { condition: "抽搐重", modification: "加钩藤、地龙" },
            { condition: "痰涎壅盛", modification: "加竹沥、天竺黄" }
        ],
        contraindications: ["寒闭证禁用", "虚风内动者禁用", "孕妇禁用"]
    },
    {
        id: "formula_045",
        name: "苏合香丸",
        pinyin: "Su He Xiang Wan",
        source: "《太平惠民和剂局方》",
        category: "开窍剂",
        subcategory: "温开剂",
        composition: [
            { herbName: "苏合香", dosage: "30g", role: "君药" },
            { herbName: "麝香", dosage: "60g", role: "君药" },
            { herbName: "冰片", dosage: "30g", role: "君药" },
            { herbName: "安息香", dosage: "60g", role: "君药" },
            { herbName: "青木香", dosage: "60g", role: "臣药" },
            { herbName: "白檀香", dosage: "60g", role: "臣药" },
            { herbName: "沉香", dosage: "60g", role: "臣药" },
            { herbName: "乳香", dosage: "30g", role: "臣药" },
            { herbName: "丁香", dosage: "60g", role: "臣药" },
            { herbName: "荜茇", dosage: "60g", role: "佐药" },
            { herbName: "白术", dosage: "60g", role: "佐药" },
            { herbName: "诃子", dosage: "60g", role: "佐药" },
            { herbName: "朱砂", dosage: "60g", role: "佐药" },
            { herbName: "犀角（水牛角代）", dosage: "60g", role: "佐药" }
        ],
        functions: ["芳香开窍", "行气温中"],
        indications: ["寒闭证", "突然昏倒", "牙关紧闭", "不省人事", "苔白滑", "脉迟"],
        analysis: "本方为温开之代表方，治寒邪、痰浊蒙闭心窍所致的寒闭证。方中苏合香、麝香、冰片、安息香为君，芳香辟秽、开窍醒神，四香协同，通闭之力强大；青木香、白檀香、沉香、乳香、丁香为臣，行气解郁、散寒化浊；荜茇辛热散寒，白术健脾化浊，诃子温涩敛气防辛散太过，朱砂、犀角（水牛角）镇心安神，共为佐药。全方以芳香温通为主。",
        keyPoints: ["突然昏倒", "不省人事", "牙关紧闭", "苔白滑", "脉迟"],
        relatedSyndromes: ["寒闭证", "痰浊蒙窍证"],
        relatedConstitutions: ["痰湿质", "阳虚质"],
        modifications: [
            { condition: "寒盛", modification: "加附子、吴茱萸" },
            { condition: "痰盛", modification: "加胆南星、石菖蒲" }
        ],
        contraindications: ["热闭证禁用", "脱证禁用", "孕妇禁用"]
    },

    // ===================================================================
    // 十九、理气剂 — 行气剂
    // ===================================================================
    {
        id: "formula_046",
        name: "越鞠丸",
        pinyin: "Yue Ju Wan",
        source: "《丹溪心法》",
        category: "理气剂",
        subcategory: "行气剂",
        composition: [
            { herbName: "香附", dosage: "12g", role: "君药" },
            { herbName: "川芎", dosage: "9g", role: "臣药" },
            { herbName: "苍术", dosage: "9g", role: "臣药" },
            { herbName: "栀子", dosage: "9g", role: "佐药" },
            { herbName: "神曲", dosage: "9g", role: "佐药" }
        ],
        functions: ["行气解郁"],
        indications: ["六郁证（气、血、痰、火、湿、食郁）", "胸膈痞闷", "脘腹胀痛", "吞酸呕吐", "饮食不消", "舌苔薄腻", "脉弦"],
        analysis: "本方为治六郁证之基础方，尤以气郁为主。方中香附为君，辛香行气解郁，专治气郁；川芎为臣，辛温活血行气，治血郁，助香附行气之功；苍术为臣，燥湿健脾，治湿郁痰郁；栀子苦寒清热泻火，治火郁；神曲消食和胃，治食郁。五药合用，分别治疗气、血、湿、火、食之五郁。痰郁由气郁、湿郁而生，治气、治湿则痰郁自解。诸药合用，调理诸郁。",
        keyPoints: ["胸膈痞闷", "脘腹胀痛", "六郁征象", "脉弦"],
        relatedSyndromes: ["气郁证", "肝气郁结证", "六郁证"],
        relatedConstitutions: ["气郁质", "湿热质"],
        modifications: [
            { condition: "气郁偏重", modification: "加木香、枳壳" },
            { condition: "火郁偏重", modification: "倍栀子，加黄连" }
        ],
        contraindications: ["阴虚火旺者慎用", "脾胃虚寒者禁用"]
    },
    {
        id: "formula_047",
        name: "半夏厚朴汤",
        pinyin: "Ban Xia Hou Po Tang",
        source: "《金匮要略》",
        category: "理气剂",
        subcategory: "行气剂",
        composition: [
            { herbName: "半夏", dosage: "12g", role: "君药" },
            { herbName: "厚朴", dosage: "9g", role: "臣药" },
            { herbName: "茯苓", dosage: "12g", role: "佐药" },
            { herbName: "生姜", dosage: "9g", role: "佐药" },
            { herbName: "苏叶", dosage: "6g", role: "佐药" }
        ],
        functions: ["行气散结", "降逆化痰"],
        indications: ["梅核气（痰气互结咽中）", "咽中如有物阻", "咯吐不出", "吞咽不下", "胸膈满闷", "或咳或呕", "舌苔白润或白滑", "脉弦缓或弦滑"],
        analysis: "本方为治痰气互结咽喉之梅核气的代表方。方中半夏为君，辛温燥湿化痰、降逆和胃；厚朴为臣，辛苦温下气除满、散结消痰，助半夏降逆化痰、行气散结；茯苓甘淡渗湿健脾，助半夏祛痰，生姜辛温散结和胃止呕，且制半夏之毒，苏叶芳香行气、宽中散郁，共为佐药。全方辛开苦降，化痰与行气并施。",
        keyPoints: ["咽中如有物阻", "咯之不出咽之不下", "苔白滑", "脉弦滑"],
        relatedSyndromes: ["痰气互结证", "梅核气证"],
        relatedConstitutions: ["气郁质", "痰湿质"],
        modifications: [
            { condition: "痰郁较重", modification: "加陈皮、贝母" },
            { condition: "心烦口苦", modification: "加竹茹、黄连" }
        ],
        contraindications: ["阴虚咽干者禁用"]
    },

    // ===================================================================
    // 二十、理气剂 — 降气剂
    // ===================================================================
    {
        id: "formula_048",
        name: "苏子降气汤",
        pinyin: "Su Zi Jiang Qi Tang",
        source: "《太平惠民和剂局方》",
        category: "理气剂",
        subcategory: "降气剂",
        composition: [
            { herbName: "苏子", dosage: "9g", role: "君药" },
            { herbName: "半夏", dosage: "9g", role: "臣药" },
            { herbName: "厚朴", dosage: "6g", role: "臣药" },
            { herbName: "前胡", dosage: "9g", role: "臣药" },
            { herbName: "肉桂", dosage: "3g", role: "佐药" },
            { herbName: "当归", dosage: "9g", role: "佐药" },
            { herbName: "生姜", dosage: "6g", role: "佐药" },
            { herbName: "大枣", dosage: "3枚", role: "佐药" },
            { herbName: "炙甘草", dosage: "6g", role: "使药" }
        ],
        functions: ["降气平喘", "祛痰止咳"],
        indications: ["上实下虚之喘咳证", "痰涎壅盛", "喘咳短气", "胸膈满闷", "或腰膝酸软", "或肢体浮肿", "舌苔白滑或白腻", "脉弦滑"],
        analysis: "本方为治上实下虚喘咳之要方。所谓「上实」指痰涎壅肺、肺气上逆，「下虚」指肾阳不足、肾不纳气。方中苏子为君，降气化痰平喘，止咳兼润肠通便；半夏、厚朴、前胡为臣，降气化痰，助苏子平喘；肉桂温肾纳气，当归养血润燥且治咳逆上气，生姜、大枣和胃调中，共为佐药；甘草为使，调和诸药。全方治上顾下，以降为主。",
        keyPoints: ["喘咳短气", "痰多稀白", "腰酸", "苔白滑", "脉弦滑"],
        relatedSyndromes: ["上实下虚喘咳证", "肺实肾虚证"],
        relatedConstitutions: ["痰湿质", "阳虚质"],
        modifications: [
            { condition: "痰涎壅盛", modification: "加葶苈子、莱菔子" },
            { condition: "肾虚重", modification: "加沉香、蛤蚧" }
        ],
        contraindications: ["阴虚燥热之喘咳者禁用"]
    },
    {
        id: "formula_049",
        name: "定喘汤",
        pinyin: "Ding Chuan Tang",
        source: "《摄生众妙方》",
        category: "理气剂",
        subcategory: "降气剂",
        composition: [
            { herbName: "麻黄", dosage: "9g", role: "君药" },
            { herbName: "白果", dosage: "12g", role: "臣药" },
            { herbName: "桑白皮", dosage: "9g", role: "君药" },
            { herbName: "黄芩", dosage: "9g", role: "臣药" },
            { herbName: "苏子", dosage: "9g", role: "佐药" },
            { herbName: "杏仁", dosage: "9g", role: "佐药" },
            { herbName: "款冬花", dosage: "9g", role: "佐药" },
            { herbName: "半夏", dosage: "9g", role: "佐药" },
            { herbName: "甘草", dosage: "3g", role: "使药" }
        ],
        functions: ["宣降肺气", "清热化痰"],
        indications: ["痰热内蕴哮喘证", "哮喘咳嗽", "痰多气急", "痰黄稠或白粘", "胸闷气促", "舌苔黄腻", "脉滑数"],
        analysis: "本方为治痰热内蕴所致咳嗽哮喘之常用方。方中麻黄、桑白皮共为君药，麻黄宣肺散邪平喘，白皮泻肺清热平喘，一宣一降；白果敛肺定喘止咳，黄芩清泄肺热，共为臣药；苏子、杏仁降气化痰平喘，款冬花润肺化痰止咳，半夏燥湿化痰降逆，共为佐药；甘草为使，调和诸药且化痰止咳。全方宣降肺气、清热化痰同施。",
        keyPoints: ["哮喘咳嗽", "痰黄粘稠", "舌苔黄腻", "脉滑数"],
        relatedSyndromes: ["痰热壅肺证", "痰热哮喘证"],
        relatedConstitutions: ["痰湿质", "湿热质"],
        modifications: [
            { condition: "痰多壅盛", modification: "加葶苈子、鱼腥草" },
            { condition: "热重", modification: "加石膏、知母" }
        ],
        contraindications: ["风寒哮喘者禁用"]
    },

    // ===================================================================
    // 二十一、理血剂 — 活血化瘀剂
    // ===================================================================
    {
        id: "formula_050",
        name: "血府逐瘀汤",
        pinyin: "Xue Fu Zhu Yu Tang",
        source: "《医林改错》",
        category: "理血剂",
        subcategory: "活血化瘀剂",
        composition: [
            { herbName: "桃仁", dosage: "12g", role: "君药" },
            { herbName: "红花", dosage: "9g", role: "君药" },
            { herbName: "当归", dosage: "9g", role: "臣药" },
            { herbName: "生地黄", dosage: "9g", role: "臣药" },
            { herbName: "川芎", dosage: "9g", role: "臣药" },
            { herbName: "赤芍", dosage: "6g", role: "臣药" },
            { herbName: "牛膝", dosage: "9g", role: "佐药" },
            { herbName: "桔梗", dosage: "6g", role: "佐药" },
            { herbName: "柴胡", dosage: "6g", role: "佐药" },
            { herbName: "枳壳", dosage: "9g", role: "佐药" },
            { herbName: "甘草", dosage: "6g", role: "使药" }
        ],
        functions: ["活血化瘀", "行气止痛"],
        indications: ["胸中血瘀证", "胸痛头痛日久不愈", "痛如针刺而有定处", "心悸怔忡", "失眠多梦", "唇黯舌紫或有瘀斑瘀点", "脉涩弦"],
        analysis: "本方为王清任所创五大逐瘀汤之首，专治胸中血瘀证。方中桃仁、红花为君，活血化瘀、通经止痛；当归、生地黄、川芎、赤芍为臣，即桃红四物汤去熟地黄换生地黄，养血活血，助桃红化瘀之力，且生地黄凉血，防瘀久化热；牛膝活血引血下行，桔梗载药上行、宣利肺气，柴胡疏肝理气，枳壳行气宽胸，共为佐药，使气行血行；甘草为使，调和诸药。全方气血并治。",
        keyPoints: ["胸痛刺痛", "固定不移", "舌紫瘀斑", "脉涩"],
        relatedSyndromes: ["气滞血瘀证", "心血瘀阻证"],
        relatedConstitutions: ["血瘀质", "气郁质"],
        modifications: [
            { condition: "胸胁刺痛重", modification: "加延胡索、郁金" },
            { condition: "瘀热甚", modification: "加大黄、牡丹皮" }
        ],
        contraindications: ["孕妇禁用", "出血性疾病者禁用"]
    },
    {
        id: "formula_051",
        name: "补阳还五汤",
        pinyin: "Bu Yang Huan Wu Tang",
        source: "《医林改错》",
        category: "理血剂",
        subcategory: "活血化瘀剂",
        composition: [
            { herbName: "黄芪", dosage: "60-120g", role: "君药" },
            { herbName: "当归", dosage: "9g", role: "臣药" },
            { herbName: "赤芍", dosage: "9g", role: "佐药" },
            { herbName: "川芎", dosage: "6g", role: "佐药" },
            { herbName: "桃仁", dosage: "6g", role: "佐药" },
            { herbName: "红花", dosage: "6g", role: "佐药" },
            { herbName: "地龙", dosage: "9g", role: "佐药" }
        ],
        functions: ["补气活血通络"],
        indications: ["气虚血瘀中风后半身不遂证", "半身不遂", "口眼㖞斜", "口角流涎", "言语謇涩", "小便频数", "舌淡紫有瘀斑", "脉缓无力或细涩"],
        analysis: "本方为治气虚血瘀之中风偏瘫的名方。方中黄芪重用至四两为君，大补元气，使气旺以推动血行，为「气行则血行」之典范；当归为臣，养血活血，化瘀而不伤正；赤芍、川芎、桃仁、红花活血化瘀，共为佐药，助当归化瘀通络；地龙通经活络，力专善走，引诸药直达经络，亦为佐药。全方以大剂量补气药为主，少少配伍活血之品。",
        keyPoints: ["半身不遂", "口眼㖞斜", "舌淡紫", "脉缓无力"],
        relatedSyndromes: ["气虚血瘀证", "中风后遗症证"],
        relatedConstitutions: ["气虚质", "血瘀质"],
        modifications: [
            { condition: "语言不利", modification: "加石菖蒲、远志" },
            { condition: "偏寒", modification: "加桂枝、附子" }
        ],
        contraindications: ["实热中风者禁用", "肝阳化风者慎用"]
    },
    {
        id: "formula_052",
        name: "生化汤",
        pinyin: "Sheng Hua Tang",
        source: "《傅青主女科》",
        category: "理血剂",
        subcategory: "活血化瘀剂",
        composition: [
            { herbName: "当归", dosage: "24g", role: "君药" },
            { herbName: "川芎", dosage: "9g", role: "臣药" },
            { herbName: "桃仁", dosage: "6g", role: "佐药" },
            { herbName: "炮姜", dosage: "2g", role: "佐药" },
            { herbName: "炙甘草", dosage: "6g", role: "使药" }
        ],
        functions: ["活血化瘀", "温经止痛"],
        indications: ["产后恶露不行或行而不畅证", "小腹冷痛", "恶露不行", "或行而不畅", "夹有血块", "舌淡或黯有瘀点", "脉沉涩"],
        analysis: "本方为产后活血化瘀生新之祖方。方中当归为君，重用至八钱，养血活血、化瘀生新，为产后要药；川芎为臣，辛散活血行气，助当归化瘀止痛；桃仁为佐，破血祛瘀，助当归、川芎化瘀之力；炮姜为佐，性微温，温经散寒止痛，与当归相配，养血温经；甘草为使，调和诸药，兼以和中。全方活血与温经并用，寓生新于化瘀之中。",
        keyPoints: ["产后恶露不行", "小腹冷痛", "舌淡黯", "脉沉涩"],
        relatedSyndromes: ["产后血瘀证", "寒凝血瘀证"],
        relatedConstitutions: ["血瘀质", "阳虚质"],
        modifications: [
            { condition: "血块多痛剧", modification: "加蒲黄、五灵脂" },
            { condition: "兼气虚", modification: "加人参、黄芪" }
        ],
        contraindications: ["产后血热瘀滞者禁用", "非产后血瘀者慎用"]
    },

    // ===================================================================
    // 二十二、理血剂 — 止血剂
    // ===================================================================
    {
        id: "formula_053",
        name: "十灰散",
        pinyin: "Shi Hui San",
        source: "《十药神书》",
        category: "理血剂",
        subcategory: "止血剂",
        composition: [
            { herbName: "大蓟", dosage: "15g", role: "君药" },
            { herbName: "小蓟", dosage: "15g", role: "君药" },
            { herbName: "侧柏叶", dosage: "15g", role: "臣药" },
            { herbName: "荷叶", dosage: "15g", role: "臣药" },
            { herbName: "白茅根", dosage: "15g", role: "臣药" },
            { herbName: "茜草根", dosage: "15g", role: "臣药" },
            { herbName: "大黄", dosage: "15g", role: "佐药" },
            { herbName: "栀子", dosage: "15g", role: "佐药" },
            { herbName: "棕榈皮", dosage: "15g", role: "佐药" },
            { herbName: "牡丹皮", dosage: "15g", role: "佐药" }
        ],
        functions: ["凉血止血"],
        indications: ["血热妄行之各种出血证", "吐血", "咯血", "衄血", "崩漏", "血色鲜红", "来势急暴", "舌红苔黄", "脉弦数"],
        analysis: "本方为凉血止血的急用方，治疗血热妄行的各种上部出血证。方中大蓟、小蓟为君，甘凉清热凉血止血，兼可散瘀；侧柏叶、荷叶、白茅根凉血止血，茜草活血兼止血，共为臣药，助君药止血而不留瘀；大黄、栀子清热泻火、导热下行，棕榈皮收涩止血，牡丹皮凉血散瘀，共为佐药。全方止血与清热并用，寓散瘀于止血之中。各药均炒炭存性，以增止血之功。",
        keyPoints: ["急性出血", "血色鲜红", "舌红苔黄", "脉弦数"],
        relatedSyndromes: ["血热妄行证", "血热动血证"],
        relatedConstitutions: ["湿热质", "阴虚质"],
        modifications: [
            { condition: "肺热咯血", modification: "倍用侧柏叶、荷叶" },
            { condition: "胃热吐血", modification: "倍用大黄" }
        ],
        contraindications: ["虚寒性出血者禁用"]
    },
    {
        id: "formula_054",
        name: "小蓟饮子",
        pinyin: "Xiao Ji Yin Zi",
        source: "《济生方》",
        category: "理血剂",
        subcategory: "止血剂",
        composition: [
            { herbName: "小蓟", dosage: "15g", role: "君药" },
            { herbName: "生地黄", dosage: "30g", role: "臣药" },
            { herbName: "藕节", dosage: "15g", role: "臣药" },
            { herbName: "蒲黄", dosage: "9g", role: "臣药" },
            { herbName: "滑石", dosage: "15g", role: "佐药" },
            { herbName: "木通", dosage: "9g", role: "佐药" },
            { herbName: "淡竹叶", dosage: "9g", role: "佐药" },
            { herbName: "栀子", dosage: "9g", role: "佐药" },
            { herbName: "当归", dosage: "6g", role: "佐药" },
            { herbName: "炙甘草", dosage: "6g", role: "使药" }
        ],
        functions: ["凉血止血", "利尿通淋"],
        indications: ["下焦血淋证", "尿中带血", "小便频数", "赤涩热痛", "舌红苔黄", "脉数"],
        analysis: "本方为治下焦瘀热所致血淋、尿血的代表方。方中小蓟为君，甘凉清热凉血止血，兼可利尿；生地黄为臣，凉血养阴，藕节凉血止血散瘀，蒲黄止血化瘀利尿，共助君药止血利尿；滑石、木通、淡竹叶清热利尿通淋，栀子清泄三焦之火、引热从小便出，当归养血活血，共为佐药；甘草为使，调和诸药，兼能和中缓急止痛。全方止血与化瘀兼顾。",
        keyPoints: ["尿血", "小便赤涩热痛", "舌红苔黄", "脉数"],
        relatedSyndromes: ["下焦血热证", "血淋证"],
        relatedConstitutions: ["湿热质", "湿热质"],
        modifications: [
            { condition: "尿血多", modification: "加白茅根、琥珀" },
            { condition: "尿道剧痛", modification: "加海金沙、金钱草" }
        ],
        contraindications: ["虚寒之尿血者禁用"]
    },

    // ===================================================================
    // 二十三、治风剂 — 疏散外风
    // ===================================================================
    {
        id: "formula_055",
        name: "川芎茶调散",
        pinyin: "Chuan Xiong Cha Tiao San",
        source: "《太平惠民和剂局方》",
        category: "治风剂",
        subcategory: "疏散外风剂",
        composition: [
            { herbName: "川芎", dosage: "9g", role: "君药" },
            { herbName: "荆芥", dosage: "9g", role: "臣药" },
            { herbName: "薄荷", dosage: "9g", role: "臣药" },
            { herbName: "羌活", dosage: "6g", role: "佐药" },
            { herbName: "白芷", dosage: "6g", role: "佐药" },
            { herbName: "细辛", dosage: "3g", role: "佐药" },
            { herbName: "防风", dosage: "6g", role: "佐药" },
            { herbName: "甘草", dosage: "6g", role: "使药" }
        ],
        functions: ["疏风止痛"],
        indications: ["外感风邪头痛证", "偏正头痛", "巅顶作痛", "恶寒发热", "鼻塞", "舌苔薄白", "脉浮"],
        analysis: "本方为治外感风邪头痛之专方，堪称「治头痛第一方」。方中川芎为君，辛温升散，上行头目，祛风活血止痛，为治头痛要药；荆芥、薄荷为臣，辛散风邪，清利头目；羌活善治太阳经头痛，白芷善治阳明经头痛，细辛善治少阴经头痛，防风疏散风邪，共为佐药，助芎、荆、薄疏散诸经之头风；甘草为使，调和诸药。清茶调服取其苦寒上清头目、引热下行。",
        keyPoints: ["头痛", "恶寒发热", "鼻塞", "苔薄白", "脉浮"],
        relatedSyndromes: ["外感风邪头痛证", "风寒头痛证"],
        relatedConstitutions: ["平和质", "气郁质"],
        modifications: [
            { condition: "风寒甚", modification: "倍用荆芥、防风" },
            { condition: "风热甚", modification: "加菊花、桑叶" }
        ],
        contraindications: ["气血亏虚头痛者禁用", "阴虚阳亢头痛者禁用"]
    },
    {
        id: "formula_056",
        name: "消风散",
        pinyin: "Xiao Feng San",
        source: "《外科正宗》",
        category: "治风剂",
        subcategory: "疏散外风剂",
        composition: [
            { herbName: "荆芥", dosage: "9g", role: "君药" },
            { herbName: "防风", dosage: "9g", role: "君药" },
            { herbName: "牛蒡子", dosage: "9g", role: "君药" },
            { herbName: "蝉蜕", dosage: "9g", role: "君药" },
            { herbName: "苍术", dosage: "9g", role: "臣药" },
            { herbName: "苦参", dosage: "9g", role: "臣药" },
            { herbName: "知母", dosage: "9g", role: "臣药" },
            { herbName: "石膏", dosage: "15g", role: "臣药" },
            { herbName: "当归", dosage: "9g", role: "佐药" },
            { herbName: "生地黄", dosage: "9g", role: "佐药" },
            { herbName: "胡麻", dosage: "9g", role: "佐药" },
            { herbName: "木通", dosage: "6g", role: "佐药" },
            { herbName: "甘草", dosage: "6g", role: "使药" }
        ],
        functions: ["疏风清热", "除湿止痒"],
        indications: ["风疹、湿疹", "皮肤瘙痒难忍", "疹出色红", "抓破后渗出津水", "舌苔黄", "脉浮数有力"],
        analysis: "本方为治风热湿邪浸淫血脉所致的风疹、湿疹常用方。方中荆芥、防风、牛蒡子、蝉蜕为君，疏风止痒、透达肌表之邪；苍术燥湿祛风，苦参清热燥湿，知母、石膏清热泻火，共为臣药，助君药清热除湿止痒；当归、生地黄、胡麻养血活血滋阴，取「治风先治血，血行风自灭」之意，木通清热利湿，共为佐药；甘草为使，调和诸药兼解毒。",
        keyPoints: ["皮肤瘙痒", "疹出色红", "舌苔黄", "脉浮数"],
        relatedSyndromes: ["风热湿邪侵肤证", "风疹湿疹证"],
        relatedConstitutions: ["湿热质", "特禀质"],
        modifications: [
            { condition: "湿热甚", modification: "加地肤子、白鲜皮" },
            { condition: "瘙痒难忍", modification: "加乌梢蛇、地骨皮" }
        ],
        contraindications: ["气血亏虚之瘙痒者慎用", "风寒型荨麻疹者禁用"]
    },

    // ===================================================================
    // 二十四、治风剂 — 平息内风
    // ===================================================================
    {
        id: "formula_057",
        name: "羚角钩藤汤",
        pinyin: "Ling Jiao Gou Teng Tang",
        source: "《通俗伤寒论》",
        category: "治风剂",
        subcategory: "平息内风剂",
        composition: [
            { herbName: "羚羊角", dosage: "4.5g（先煎）", role: "君药" },
            { herbName: "钩藤", dosage: "9g（后下）", role: "君药" },
            { herbName: "桑叶", dosage: "6g", role: "臣药" },
            { herbName: "菊花", dosage: "9g", role: "臣药" },
            { herbName: "生地黄", dosage: "15g", role: "佐药" },
            { herbName: "白芍", dosage: "9g", role: "佐药" },
            { herbName: "川贝母", dosage: "12g", role: "佐药" },
            { herbName: "竹茹", dosage: "15g", role: "佐药" },
            { herbName: "茯神", dosage: "9g", role: "佐药" },
            { herbName: "生甘草", dosage: "3g", role: "使药" }
        ],
        functions: ["凉肝息风", "增液舒筋"],
        indications: ["肝经热盛、热极生风证", "高热不退", "烦躁不安", "手足抽搐", "甚则神昏痉厥", "舌绛而干", "脉弦数"],
        analysis: "本方为治热盛动风之代表方。方中羚羊角、钩藤为君，羚羊角咸寒直入肝经，清肝凉血息风，钩藤甘凉清热平肝、息风止痉，二药相须为用，凉肝息风之力更强；桑叶、菊花为臣，清肝散热以助息风；生地黄、白芍滋阴养血柔肝，川贝母清热化痰，竹茹清热化痰通络，茯神宁心安神，共为佐药；甘草为使，调和诸药，与白芍酸甘化阴柔筋。",
        keyPoints: ["高热抽搐", "舌绛而干", "脉弦数"],
        relatedSyndromes: ["肝热动风证", "热极生风证"],
        relatedConstitutions: ["阴虚质", "湿热质"],
        modifications: [
            { condition: "神昏重", modification: "加安宫牛黄丸" },
            { condition: "抽搐重", modification: "加全蝎、蜈蚣" }
        ],
        contraindications: ["虚风内动者禁用", "寒证者禁用"]
    },
    {
        id: "formula_058",
        name: "镇肝熄风汤",
        pinyin: "Zhen Gan Xi Feng Tang",
        source: "《医学衷中参西录》",
        category: "治风剂",
        subcategory: "平息内风剂",
        composition: [
            { herbName: "怀牛膝", dosage: "30g", role: "君药" },
            { herbName: "代赭石", dosage: "30g", role: "君药" },
            { herbName: "龙骨", dosage: "15g", role: "臣药" },
            { herbName: "牡蛎", dosage: "15g", role: "臣药" },
            { herbName: "龟甲", dosage: "15g", role: "臣药" },
            { herbName: "白芍", dosage: "15g", role: "臣药" },
            { herbName: "玄参", dosage: "15g", role: "臣药" },
            { herbName: "天冬", dosage: "15g", role: "臣药" },
            { herbName: "川楝子", dosage: "6g", role: "佐药" },
            { herbName: "麦芽", dosage: "6g", role: "佐药" },
            { herbName: "茵陈", dosage: "6g", role: "佐药" },
            { herbName: "甘草", dosage: "4.5g", role: "使药" }
        ],
        functions: ["镇肝息风", "滋阴潜阳"],
        indications: ["肝肾阴虚、肝阳上亢之类中风证", "头目眩晕", "脑中热痛", "面色如醉", "心中烦热", "或肢体渐觉不利", "口眼渐形㖞斜", "脉弦长有力"],
        analysis: "本方为治肝阳上亢、气血上逆之类中风的代表方。方中怀牛膝为君，重用至一两，引血下行，折其亢阳，兼补益肝肾；代赭石亦为君，重镇降逆、平肝潜阳；龙骨、牡蛎、龟甲、白芍潜阳镇逆、柔肝息风，玄参、天冬滋阴清热，共为臣药，助牛膝、代赭石滋阴潜阳之力；川楝子疏肝理气，茵陈清肝利湿，麦芽和胃疏肝，共为佐药；甘草为使，调和诸药，与麦芽和胃和中。全方镇潜与滋阴并用。",
        keyPoints: ["头目眩晕", "脑中热痛", "面色如醉", "脉弦长有力"],
        relatedSyndromes: ["肝阳上亢证", "阴虚阳亢证", "类中风证"],
        relatedConstitutions: ["阴虚质", "气郁质", "血瘀质"],
        modifications: [
            { condition: "心中热甚", modification: "加石膏" },
            { condition: "尺脉虚", modification: "加山茱萸、熟地黄" }
        ],
        contraindications: ["血虚生风者禁用", "气虚中风者慎用"]
    },

    // ===================================================================
    // 二十五、治燥剂 — 外燥/内燥
    // ===================================================================
    {
        id: "formula_059",
        name: "杏苏散",
        pinyin: "Xing Su San",
        source: "《温病条辨》",
        category: "治燥剂",
        subcategory: "轻宣外燥剂",
        composition: [
            { herbName: "杏仁", dosage: "9g", role: "君药" },
            { herbName: "苏叶", dosage: "9g", role: "君药" },
            { herbName: "前胡", dosage: "9g", role: "臣药" },
            { herbName: "桔梗", dosage: "6g", role: "臣药" },
            { herbName: "枳壳", dosage: "6g", role: "臣药" },
            { herbName: "半夏", dosage: "9g", role: "佐药" },
            { herbName: "陈皮", dosage: "6g", role: "佐药" },
            { herbName: "茯苓", dosage: "9g", role: "佐药" },
            { herbName: "生姜", dosage: "3片", role: "使药" },
            { herbName: "大枣", dosage: "3枚", role: "使药" },
            { herbName: "甘草", dosage: "3g", role: "使药" }
        ],
        functions: ["轻宣凉燥", "理肺化痰"],
        indications: ["外感凉燥证", "头微痛", "恶寒无汗", "咳嗽痰稀", "鼻塞咽干", "苔白", "脉弦"],
        analysis: "本方为治感受凉燥之专方。方中杏仁为君，苦辛而温，宣肺止咳、润燥化痰；苏叶亦为君，辛温发散解表，与杏仁相伍一直一降；前胡、桔梗、枳壳为臣，宣降肺气，助杏仁止咳化痰；半夏燥湿化痰，陈皮理气化痰，茯苓健脾渗湿，共为佐药，四药合用乃二陈汤之意，燥湿化痰以杜生痰之源；生姜、大枣、甘草为使，调和营卫，兼能和中。",
        keyPoints: ["恶寒无汗", "咳嗽痰稀", "鼻塞咽干", "苔白脉弦"],
        relatedSyndromes: ["凉燥外感证", "燥邪犯肺证"],
        relatedConstitutions: ["平和质", "阴虚质"],
        modifications: [
            { condition: "表证轻", modification: "去苏叶" },
            { condition: "痰多壅肺", modification: "加瓜蒌、紫菀" }
        ],
        contraindications: ["风热袭肺者禁用"]
    },
    {
        id: "formula_060",
        name: "清燥救肺汤",
        pinyin: "Qing Zao Jiu Fei Tang",
        source: "《医门法律》",
        category: "治燥剂",
        subcategory: "轻宣外燥剂",
        composition: [
            { herbName: "桑叶", dosage: "9g", role: "君药" },
            { herbName: "石膏", dosage: "15g", role: "臣药" },
            { herbName: "麦冬", dosage: "6g", role: "臣药" },
            { herbName: "人参", dosage: "3g", role: "佐药" },
            { herbName: "阿胶", dosage: "6g", role: "佐药" },
            { herbName: "胡麻仁", dosage: "6g", role: "佐药" },
            { herbName: "杏仁", dosage: "6g", role: "佐药" },
            { herbName: "枇杷叶", dosage: "3g", role: "佐药" },
            { herbName: "甘草", dosage: "3g", role: "使药" }
        ],
        functions: ["清燥润肺"],
        indications: ["温燥伤肺证", "身热头痛", "干咳少痰", "气逆而喘", "咽干鼻燥", "心烦口渴", "舌干无苔", "脉虚大而数"],
        analysis: "本方为治温燥伤肺之营卫燥热内盛的主方。方中桑叶为君，苦寒清宣肺燥，透邪外出；石膏为臣，辛寒大清肺热；麦冬为臣，甘寒养阴润肺，二臣一清一润；人参益气生津，阿胶、胡麻仁滋阴养血润燥，杏仁、枇杷叶降利肺气止咳平喘，共为佐药；甘草为使，调和诸药。全方清宣润降并用，使燥热得清、肺津得复。",
        keyPoints: ["干咳少痰", "咽干鼻燥", "舌干无苔", "脉虚大而数"],
        relatedSyndromes: ["温燥伤肺证", "肺燥津伤证"],
        relatedConstitutions: ["阴虚质"],
        modifications: [
            { condition: "阴虚甚", modification: "加生地黄、知母" },
            { condition: "咳血", modification: "加白茅根、侧柏叶" }
        ],
        contraindications: ["凉燥咳嗽者禁用", "风寒咳嗽者禁用"]
    },
    {
        id: "formula_061",
        name: "增液汤",
        pinyin: "Zeng Ye Tang",
        source: "《温病条辨》",
        category: "治燥剂",
        subcategory: "滋润内燥剂",
        composition: [
            { herbName: "玄参", dosage: "30g", role: "君药" },
            { herbName: "麦冬", dosage: "24g", role: "臣药" },
            { herbName: "生地黄", dosage: "24g", role: "臣药" }
        ],
        functions: ["增液润燥"],
        indications: ["阳明温病津液不足证", "津亏肠燥便秘", "大便秘结", "口渴", "舌干红", "脉细数或沉而无力"],
        analysis: "本方为增水行舟之代表方，治阳明温病津亏之大便不通。方中玄参为君，重用一两，苦咸而寒，滋阴清热、生津润燥，启肾水以滋肠燥；麦冬为臣，甘寒养阴，润肺胃之燥；生地黄为臣，甘寒凉血滋阴，三药共奏养阴增液之功。全方重用养阴增液之品，使肠中津液得复，犹如「增水行舟」，燥屎得下，非以通便药强行通便。",
        keyPoints: ["大便秘结", "口渴", "舌干红", "脉细数"],
        relatedSyndromes: ["津亏肠燥证", "阴虚便秘证"],
        relatedConstitutions: ["阴虚质"],
        modifications: [
            { condition: "燥结甚", modification: "加芒硝、大黄以助通便" },
            { condition: "口干渴甚", modification: "加天花粉、石斛" }
        ],
        contraindications: ["阳明腑实之实热便秘者禁用", "气虚便秘者禁用"]
    },

    // ===================================================================
    // 二十六、祛湿剂 — 和胃化湿/清热祛湿
    // ===================================================================
    {
        id: "formula_062",
        name: "藿香正气散",
        pinyin: "Huo Xiang Zheng Qi San",
        source: "《太平惠民和剂局方》",
        category: "祛湿剂",
        subcategory: "和胃化湿剂",
        composition: [
            { herbName: "藿香", dosage: "15g", role: "君药" },
            { herbName: "紫苏", dosage: "6g", role: "臣药" },
            { herbName: "白芷", dosage: "6g", role: "臣药" },
            { herbName: "陈皮", dosage: "9g", role: "臣药" },
            { herbName: "厚朴", dosage: "9g", role: "臣药" },
            { herbName: "半夏", dosage: "9g", role: "臣药" },
            { herbName: "白术", dosage: "9g", role: "佐药" },
            { herbName: "茯苓", dosage: "9g", role: "佐药" },
            { herbName: "大腹皮", dosage: "6g", role: "佐药" },
            { herbName: "桔梗", dosage: "6g", role: "佐药" },
            { herbName: "生姜", dosage: "3片", role: "使药" },
            { herbName: "大枣", dosage: "3枚", role: "使药" },
            { herbName: "甘草", dosage: "6g", role: "使药" }
        ],
        functions: ["解表化湿", "理气和中"],
        indications: ["外感风寒，内伤湿滞证", "恶寒发热", "头痛", "胸膈满闷", "脘腹疼痛", "恶心呕吐", "肠鸣泄泻", "舌苔白腻", "脉浮缓"],
        analysis: "本方为治外感风寒、内伤湿滞的代表方，也是夏季暑湿感冒的常用方。方中藿香为君，辛散风寒，芳香化湿浊，辟秽和中，为治霍乱吐泻之要药；紫苏、白芷为臣，辛温助藿香解表散寒；陈皮、厚朴、半夏行气燥湿、降逆和胃；白术、茯苓健脾祛湿；大腹皮行气利水消肿；桔梗宣肺利气，共为佐药；生姜、大枣、甘草为使，调和诸药，兼以和中。",
        keyPoints: ["恶寒发热", "脘腹胀痛", "呕吐泄泻", "苔白腻"],
        relatedSyndromes: ["外感风寒夹湿证", "暑湿感冒证", "湿滞中焦证"],
        relatedConstitutions: ["痰湿质", "湿热质"],
        modifications: [
            { condition: "寒重痛剧", modification: "加干姜、吴茱萸" },
            { condition: "食滞", modification: "加神曲、山楂" }
        ],
        contraindications: ["阴虚内热者禁用", "湿热霍乱者禁用"]
    },
    {
        id: "formula_063",
        name: "茵陈蒿汤",
        pinyin: "Yin Chen Hao Tang",
        source: "《伤寒论》",
        category: "祛湿剂",
        subcategory: "清热祛湿剂",
        composition: [
            { herbName: "茵陈蒿", dosage: "30g", role: "君药" },
            { herbName: "栀子", dosage: "15g", role: "臣药" },
            { herbName: "大黄", dosage: "9g", role: "佐药" }
        ],
        functions: ["清热利湿", "退黄"],
        indications: ["湿热黄疸之阳黄证", "一身面目俱黄", "黄色鲜明", "发热", "腹微满", "口渴", "恶心欲吐", "小便短赤", "大便秘结", "舌红苔黄腻", "脉弦数或滑数"],
        analysis: "本方为治湿热黄疸之第一要方。方中茵陈蒿为君，重用至一两，苦寒清热利湿退黄，为治黄疸之专药；栀子为臣，苦寒清泄三焦之热，兼利小便，导湿热从小便而去，助茵陈分消其湿热；大黄为佐，苦寒泻热通便，利胆退黄，使湿热从大便而下。三药合用，前后分消，使湿去热清则黄疸自退。",
        keyPoints: ["黄疸（黄色鲜明）", "小便短赤", "舌红苔黄腻", "脉弦滑数"],
        relatedSyndromes: ["湿热黄疸证（阳黄）", "肝胆湿热证"],
        relatedConstitutions: ["湿热质"],
        modifications: [
            { condition: "胁痛", modification: "加柴胡、郁金" },
            { condition: "呕吐", modification: "加竹茹、生姜" }
        ],
        contraindications: ["阴黄（寒湿黄疸）者禁用", "孕妇禁用"]
    },

    // ===================================================================
    // 二十七、祛湿剂 — 利水渗湿/温化寒湿/祛风胜湿
    // ===================================================================
    {
        id: "formula_064",
        name: "五苓散",
        pinyin: "Wu Ling San",
        source: "《伤寒论》",
        category: "祛湿剂",
        subcategory: "利水渗湿剂",
        composition: [
            { herbName: "猪苓", dosage: "9g", role: "君药" },
            { herbName: "茯苓", dosage: "9g", role: "臣药" },
            { herbName: "白术", dosage: "9g", role: "臣药" },
            { herbName: "泽泻", dosage: "15g", role: "君药" },
            { herbName: "桂枝", dosage: "6g", role: "佐药" }
        ],
        functions: ["利水渗湿", "温阳化气"],
        indications: ["膀胱气化不利之蓄水证", "小便不利", "头痛微热", "烦渴欲饮", "水入即吐（水逆证）", "舌苔白腻", "脉浮"],
        analysis: "本方为利水渗湿之基础方。方中泽泻为君，重用甘淡而寒，直入膀胱，利水渗湿；猪苓、茯苓为臣，淡渗利水，猪苓力强，茯苓兼能健脾，二药助泽泻利水之力；白术为佐，苦温健脾燥湿，使水湿得以运化，与茯苓相兼，实脾土以制水；桂枝为佐，辛甘而温，温阳化气，外解太阳之表邪，内助膀胱气化以利水行。",
        keyPoints: ["小便不利", "水入即吐", "苔白腻脉浮"],
        relatedSyndromes: ["水湿内停证", "膀胱蓄水证", "水逆证"],
        relatedConstitutions: ["痰湿质"],
        modifications: [
            { condition: "水肿甚", modification: "加桑白皮、大腹皮" },
            { condition: "兼表寒", modification: "加麻黄" }
        ],
        contraindications: ["津伤燥渴者禁用", "小便通利者慎用"]
    },
    {
        id: "formula_065",
        name: "苓桂术甘汤",
        pinyin: "Ling Gui Zhu Gan Tang",
        source: "《金匮要略》",
        category: "祛湿剂",
        subcategory: "温化寒湿剂",
        composition: [
            { herbName: "茯苓", dosage: "12g", role: "君药" },
            { herbName: "桂枝", dosage: "9g", role: "臣药" },
            { herbName: "白术", dosage: "9g", role: "佐药" },
            { herbName: "炙甘草", dosage: "6g", role: "使药" }
        ],
        functions: ["温阳化饮", "健脾利水"],
        indications: ["中阳不足之痰饮证", "胸胁支满", "目眩心悸", "咳而气短", "舌苔白滑", "脉弦滑"],
        analysis: "本方为治痰饮之和剂，「病痰饮者，当以温药和之」的代表方。方中茯苓为君，甘淡而平，健脾渗湿利水，使水饮从小便而出；桂枝为臣，辛甘而温，温阳化气，与茯苓相配，一利一化，通阳化水；白术为佐，苦温健脾燥湿，助茯苓运化水湿；炙甘草为使，益气和中，调和诸药，与桂枝辛甘化阳，助温阳之力。四药共奏温阳化饮之功。",
        keyPoints: ["胸胁支满", "目眩心悸", "苔白滑", "脉弦滑"],
        relatedSyndromes: ["脾阳不足证", "痰饮内停证"],
        relatedConstitutions: ["痰湿质", "阳虚质"],
        modifications: [
            { condition: "呕吐痰涎", modification: "加半夏、生姜" },
            { condition: "水肿", modification: "加猪苓、泽泻" }
        ],
        contraindications: ["热痰咳嗽者禁用"]
    },

    // ===================================================================
    // 二十八、祛痰剂
    // ===================================================================
    {
        id: "formula_066",
        name: "二陈汤",
        pinyin: "Er Chen Tang",
        source: "《太平惠民和剂局方》",
        category: "祛痰剂",
        subcategory: "燥湿化痰剂",
        composition: [
            { herbName: "半夏", dosage: "15g", role: "君药" },
            { herbName: "陈皮", dosage: "15g", role: "臣药" },
            { herbName: "茯苓", dosage: "9g", role: "佐药" },
            { herbName: "生姜", dosage: "3g", role: "佐药" },
            { herbName: "乌梅", dosage: "1枚", role: "佐药" },
            { herbName: "炙甘草", dosage: "4.5g", role: "使药" }
        ],
        functions: ["燥湿化痰", "理气和中"],
        indications: ["湿痰证", "咳嗽痰多", "色白易咯", "胸膈痞闷", "恶心呕吐", "肢体困倦", "头眩心悸", "舌苔白润或白滑", "脉滑"],
        analysis: "本方为治湿痰证之基础方，世称「治痰之总剂」。方中半夏为君，辛温而燥，燥湿化痰、降逆和胃，为治湿痰要药；陈皮为臣，辛苦而温，理气燥湿化痰，使气顺则痰消，与半夏相伍，增强化痰之功；茯苓为佐，甘淡渗湿健脾，使湿无所聚则痰无由生；生姜降逆化痰、制半夏之毒，乌梅酸敛肺气，与半夏相伍一散一收，相反相成；甘草为使，调和诸药，兼能润肺和中。全方结构严谨，以半夏、陈皮二药陈久者良，故名「二陈」。",
        keyPoints: ["咳嗽痰多", "色白易咯", "胸膈痞闷", "苔白滑", "脉滑"],
        relatedSyndromes: ["痰湿证", "湿痰阻肺证"],
        relatedConstitutions: ["痰湿质"],
        modifications: [
            { condition: "寒痰", modification: "加干姜、细辛以温化寒痰" },
            { condition: "热痰", modification: "加瓜蒌、黄芩以清热化痰" }
        ],
        contraindications: ["阴虚燥咳者禁用", "痰中带血者禁用"]
    },
    {
        id: "formula_067",
        name: "保和丸",
        pinyin: "Bao He Wan",
        source: "《丹溪心法》",
        category: "消食剂",
        subcategory: "消食导滞剂",
        composition: [
            { herbName: "山楂", dosage: "18g", role: "君药" },
            { herbName: "神曲", dosage: "6g", role: "臣药" },
            { herbName: "莱菔子", dosage: "3g", role: "臣药" },
            { herbName: "半夏", dosage: "9g", role: "佐药" },
            { herbName: "陈皮", dosage: "6g", role: "佐药" },
            { herbName: "茯苓", dosage: "9g", role: "佐药" },
            { herbName: "连翘", dosage: "3g", role: "佐药" }
        ],
        functions: ["消食导滞", "和胃清热"],
        indications: ["食积停滞证", "脘腹痞满胀痛", "嗳腐吞酸", "恶食呕恶", "或大便泄泻", "舌苔厚腻微黄", "脉滑"],
        analysis: "本方为治一切食积之通用方。方中山楂为君，重用消一切食积，尤善消肉食油腻之积；神曲消食健脾、化酒食陈腐之积，莱菔子消食下气、消麦面痰气之积，共为臣药；半夏、陈皮行气化滞、和胃止呕，茯苓健脾渗湿，连翘清解食积所生之郁热，共为佐药。全方消食化滞力强，兼能行气和胃清热，使食积得消、胃气得和。",
        keyPoints: ["脘腹痞满胀痛", "嗳腐吞酸", "舌苔厚腻", "脉滑"],
        relatedSyndromes: ["食积停滞证", "食滞中焦证"],
        relatedConstitutions: ["痰湿质", "湿热质"],
        modifications: [
            { condition: "食积较重", modification: "加枳实、槟榔" },
            { condition: "食积化热明显", modification: "加黄芩、黄连" }
        ],
        contraindications: ["脾胃虚寒无食积者禁用"]
    },
    {
        id: "formula_068",
        name: "乌梅丸",
        pinyin: "Wu Mei Wan",
        source: "《伤寒论》",
        category: "驱虫剂",
        subcategory: "安蛔止痛剂",
        composition: [
            { herbName: "乌梅", dosage: "30g", role: "君药" },
            { herbName: "黄连", dosage: "12g", role: "臣药" },
            { herbName: "黄柏", dosage: "6g", role: "臣药" },
            { herbName: "附子", dosage: "6g", role: "佐药" },
            { herbName: "桂枝", dosage: "6g", role: "佐药" },
            { herbName: "干姜", dosage: "9g", role: "佐药" },
            { herbName: "蜀椒", dosage: "6g", role: "佐药" },
            { herbName: "细辛", dosage: "3g", role: "佐药" },
            { herbName: "当归", dosage: "6g", role: "佐药" },
            { herbName: "人参", dosage: "6g", role: "佐药" }
        ],
        functions: ["温脏安蛔"],
        indications: ["蛔厥证", "腹痛时作", "手足逆冷", "烦闷呕吐", "时发时止", "得食则呕", "甚则吐蛔", "舌苔薄白", "脉弦"],
        analysis: "本方为治蛔厥之代表方，集酸、苦、辛三味于一炉。方中乌梅为君，重用而极酸，酸能安蛔，使蛔静而痛止；黄连、黄柏为臣，苦寒清热，苦能下蛔，与乌梅酸味相伍，合「蛔得酸则静、得苦则下」之旨；附子、桂枝、干姜、蜀椒、细辛大辛大热，温脏散寒以使蛔安，合「蛔得辛则伏」之意；当归、人参益气养血扶正，共为佐药。全方寒热并用，酸苦辛兼备，为治蛔厥之专方。",
        keyPoints: ["蛔厥腹痛", "时发时止", "手足逆冷", "脉弦"],
        relatedSyndromes: ["蛔厥证", "虫积腹痛证"],
        relatedConstitutions: ["平和质", "气虚质"],
        modifications: [
            { condition: "虫积腹痛剧烈", modification: "加使君子、苦楝皮" },
            { condition: "热重", modification: "去附子、干姜，黄柏、黄连" }
        ],
        contraindications: ["非虫积腹痛者禁用", "孕妇慎用"]
    },

    // ============================================================================
    // 扩充批（2026-08）— 新增32首（formula_069 ~ formula_100），按教材高频与临床常用选录
    // ============================================================================

    // 二、和解剂扩充
    {
        id: "formula_069",
        name: "大柴胡汤",
        pinyin: "Da Chai Hu Tang",
        source: "《伤寒论》",
        category: "和解剂",
        subcategory: "和解少阳剂",
        composition: [
            { herbName: "柴胡", dosage: "15g", role: "君药" },
            { herbName: "黄芩", dosage: "9g", role: "臣药" },
            { herbName: "芍药", dosage: "9g", role: "佐药" },
            { herbName: "半夏", dosage: "9g", role: "佐药" },
            { herbName: "枳实", dosage: "9g", role: "佐药" },
            { herbName: "大黄", dosage: "6g", role: "佐药" },
            { herbName: "生姜", dosage: "15g", role: "佐药" },
            { herbName: "大枣", dosage: "4枚", role: "使药" }
        ],
        functions: ["和解少阳", "内泻热结"],
        indications: ["少阳阳明合病", "往来寒热", "胸胁苦满", "呕不止", "郁郁微烦", "心下痞硬", "心下满痛", "大便不解", "协热下利", "舌苔黄", "脉弦有力"],
        analysis: "本方为和解少阳兼泻热结之代表方。方中柴胡为君，疏透少阳之邪；黄芩为臣，清泄少阳之热，柴芩合用外解内清，和解少阳。大黄、枳实内泻阳明热结、行气消痞，与柴芩相配则少阳阳明双解；芍药缓急止痛，配大黄治腹中实痛，伍枳实行气和血；半夏、生姜降逆止呕；大枣益气和中。诸药相合，外解少阳、内泻热结，枢机得运，腑气得通。",
        keyPoints: ["往来寒热", "胸胁苦满", "便秘或下利", "脉弦有力"],
        relatedSyndromes: ["少阳阳明合病证"],
        relatedConstitutions: ["平和质"],
        modifications: [
            { condition: "热盛", modification: "加黄连以清热" },
            { condition: "黄疸", modification: "加茵陈、栀子以利湿退黄" },
            { condition: "胆结石绞痛", modification: "加金钱草、海金沙以利胆排石" }
        ],
        contraindications: ["单纯少阳证无阳明热结者不宜", "气血两虚者慎用"]
    },
    {
        id: "formula_070",
        name: "四逆散",
        pinyin: "Si Ni San",
        source: "《伤寒论》",
        category: "和解剂",
        subcategory: "调和肝脾剂",
        composition: [
            { herbName: "柴胡", dosage: "6g", role: "君药" },
            { herbName: "枳实", dosage: "6g", role: "臣药" },
            { herbName: "白芍", dosage: "6g", role: "佐药" },
            { herbName: "炙甘草", dosage: "6g", role: "使药" }
        ],
        functions: ["透邪解郁", "疏肝理脾"],
        indications: ["阳郁厥逆证", "手足不温", "或咳", "或悸", "或小便不利", "或腹中痛", "肝脾气郁证", "胁肋胀闷", "脘腹疼痛", "脉弦"],
        analysis: "本方为调和肝脾之祖方。方中柴胡为君，升发阳气、疏肝解郁，使阳气得伸、郁邪外透；白芍为臣，养血敛阴、柔肝缓急，与柴胡相配一散一收、一升一敛，疏肝而不伤阴；枳实为佐，理气解郁、泄热破结，与柴胡相配一升一降，升清降浊，调畅气机；炙甘草为使，调和诸药，益气和中。四药合用，透邪解郁，疏肝理脾，气机条达则四肢自温。",
        keyPoints: ["手足不温", "胁肋胀闷", "脘腹疼痛", "脉弦"],
        relatedSyndromes: ["肝郁气滞证", "阳郁厥逆证"],
        relatedConstitutions: ["平和质"],
        modifications: [
            { condition: "兼食积", modification: "加神曲、山楂以消食" },
            { condition: "气滞较重", modification: "加香附、郁金以行气解郁" }
        ],
        contraindications: ["阳虚寒厥者不宜使用"]
    },
    {
        id: "formula_071",
        name: "导赤散",
        pinyin: "Dao Chi San",
        source: "《小儿药证直诀》",
        category: "清热剂",
        subcategory: "清脏腑热剂",
        composition: [
            { herbName: "生地黄", dosage: "6g", role: "君药" },
            { herbName: "木通", dosage: "6g", role: "君药" },
            { herbName: "竹叶", dosage: "3g", role: "臣药" },
            { herbName: "甘草梢", dosage: "3g", role: "佐药" }
        ],
        functions: ["清心利水养阴"],
        indications: ["心经火热证", "心胸烦热", "口渴面赤", "意欲冷饮", "口舌生疮", "心热移于小肠", "小便赤涩刺痛"],
        analysis: "本方为清心火、利小便之常用方。方中生地黄甘寒，凉血滋阴以制心火，水旺则火自降；木通苦寒，上清心经之火，下利小肠之热，导心火下行从小便而出，两药共为君药。竹叶甘淡寒，清心除烦、利水通淋为臣，助君药清心导热。甘草梢直达茎中而止痛，且调和诸药为佐。四药合用，清心养阴、利水通淋，使心火得清、心阴得养、热从小便去。",
        keyPoints: ["口舌生疮", "心胸烦热", "小便赤涩刺痛"],
        relatedSyndromes: ["心火亢盛证", "心热移热小肠证"],
        relatedConstitutions: ["平和质"],
        modifications: [
            { condition: "心火较盛", modification: "加黄连以清心泻火" },
            { condition: "小便赤涩明显", modification: "加车前子、滑石以利水通淋" }
        ],
        contraindications: ["脾胃虚寒者慎用"]
    },
    {
        id: "formula_072",
        name: "清胃散",
        pinyin: "Qing Wei San",
        source: "《脾胃论》",
        category: "清热剂",
        subcategory: "清脏腑热剂",
        composition: [
            { herbName: "黄连", dosage: "6g", role: "君药" },
            { herbName: "升麻", dosage: "6g", role: "臣药" },
            { herbName: "生地黄", dosage: "12g", role: "佐药" },
            { herbName: "牡丹皮", dosage: "9g", role: "佐药" },
            { herbName: "当归", dosage: "6g", role: "佐药" }
        ],
        functions: ["清胃凉血"],
        indications: ["胃火牙痛", "牙痛牵引头脑", "面颊发热", "其齿喜冷恶热", "牙宣出血", "牙龈红肿溃烂", "唇舌颊腮肿痛", "口气热臭", "口干舌燥", "舌红苔黄", "脉滑数"],
        analysis: "本方为治胃火牙痛之专方。方中黄连苦寒，直清胃腑之火为君。升麻辛凉，清热解毒、升而能散，引药直达阳明经为臣，与黄连相伍，使胃火得清、毒热得散，且升麻与黄连升降相因，升清降浊。生地黄、牡丹皮凉血滋阴、清热散瘀为佐，治热伤血络之出血。当归养血活血为佐，合丹皮以消肿止痛。五药合用，清胃凉血，火降血宁则牙痛自止。",
        keyPoints: ["牙痛牵引头痛", "喜冷恶热", "口气热臭", "牙龈红肿"],
        relatedSyndromes: ["胃火上攻证"],
        relatedConstitutions: ["平和质"],
        modifications: [
            { condition: "便秘", modification: "加大黄以泻热通腑" },
            { condition: "口渴明显", modification: "加天花粉以生津止渴" }
        ],
        contraindications: ["牙痛属虚火或风寒者不宜使用"]
    },
    {
        id: "formula_073",
        name: "玉女煎",
        pinyin: "Yu Nv Jian",
        source: "《景岳全书》",
        category: "清热剂",
        subcategory: "清脏腑热剂",
        composition: [
            { herbName: "石膏", dosage: "15-30g", role: "君药" },
            { herbName: "熟地黄", dosage: "9-15g", role: "君药" },
            { herbName: "麦冬", dosage: "6g", role: "臣药" },
            { herbName: "知母", dosage: "4.5g", role: "臣药" },
            { herbName: "牛膝", dosage: "4.5g", role: "佐药" }
        ],
        functions: ["清胃热", "滋肾阴"],
        indications: ["胃热阴虚证", "头痛", "牙痛", "齿松牙龈", "烦热干渴", "舌红苔黄而干", "消渴", "消谷善饥"],
        analysis: "本方为清胃滋肾之剂。方中石膏辛甘大寒，清阳明胃火之有余为君；熟地黄甘温，滋少阴肾水之不足为君，二药相配，清火滋水并举。知母苦寒质润，助石膏清胃泻火，兼能滋阴润燥；麦冬养阴清热、益胃生津，共为臣药。牛膝导热下行、补益肝肾，引血热下行，为佐药。五药合用，清胃火、滋肾阴，虚实兼顾，火降阴复则牙痛、消渴自愈。",
        keyPoints: ["牙痛齿松", "烦热干渴", "舌红苔黄而干"],
        relatedSyndromes: ["胃热阴虚证"],
        relatedConstitutions: ["阴虚质"],
        modifications: [
            { condition: "火盛明显", modification: "加栀子以清热泻火" },
            { condition: "肾虚明显", modification: "加山茱萸、枸杞子以补肾" }
        ],
        contraindications: ["脾虚便溏者不宜使用"]
    },
    {
        id: "formula_074",
        name: "白头翁汤",
        pinyin: "Bai Tou Weng Tang",
        source: "《伤寒论》",
        category: "清热剂",
        subcategory: "清热解毒剂",
        composition: [
            { herbName: "白头翁", dosage: "15g", role: "君药" },
            { herbName: "黄连", dosage: "6g", role: "臣药" },
            { herbName: "黄柏", dosage: "12g", role: "臣药" },
            { herbName: "秦皮", dosage: "12g", role: "佐药" }
        ],
        functions: ["清热解毒", "凉血止痢"],
        indications: ["热毒痢疾", "腹痛", "里急后重", "肛门灼热", "下痢脓血", "赤多白少", "渴欲饮水", "舌红苔黄", "脉弦数"],
        analysis: "本方为治热毒血痢之代表方。方中白头翁为君，味苦性寒，清热解毒、凉血止痢，为治热毒血痢之要药。黄连苦寒，泻火解毒、燥湿厚肠；黄柏清下焦湿热，二药共为臣，协助君药清热燥湿止痢。秦皮苦寒而涩，清热燥湿、收涩止痢，兼能凉肝明目为佐。四药合用，共奏清热解毒、凉血止痢之功，使热毒解、湿热清、血痢止。",
        keyPoints: ["下痢脓血赤多白少", "里急后重", "肛门灼热", "舌红苔黄"],
        relatedSyndromes: ["热毒痢疾证"],
        relatedConstitutions: ["平和质"],
        modifications: [
            { condition: "赤痢较重", modification: "加赤芍、地榆以凉血止血" },
            { condition: "腹痛里急明显", modification: "加木香、槟榔以行气导滞" }
        ],
        contraindications: ["虚寒痢疾者禁用"]
    },
    {
        id: "formula_075",
        name: "芍药汤",
        pinyin: "Shao Yao Tang",
        source: "《素问病机气宜保命集》",
        category: "清热剂",
        subcategory: "清热解毒剂",
        composition: [
            { herbName: "芍药", dosage: "30g", role: "君药" },
            { herbName: "当归", dosage: "9g", role: "臣药" },
            { herbName: "黄连", dosage: "9g", role: "臣药" },
            { herbName: "黄芩", dosage: "9g", role: "臣药" },
            { herbName: "大黄", dosage: "6g", role: "佐药" },
            { herbName: "木香", dosage: "6g", role: "佐药" },
            { herbName: "槟榔", dosage: "6g", role: "佐药" },
            { herbName: "肉桂", dosage: "2.5g", role: "佐药" },
            { herbName: "甘草", dosage: "6g", role: "使药" }
        ],
        functions: ["清热燥湿", "调气和血"],
        indications: ["湿热痢疾", "腹痛", "便脓血", "赤白相兼", "里急后重", "肛门灼热", "小便短赤", "舌苔黄腻", "脉弦数"],
        analysis: "本方为治湿热痢疾之要方。方中重用芍药为君，泻肝火、和营血、缓急止痛。黄芩、黄连清热燥湿、厚肠止痢为臣。大黄泻热通腑，使湿热积滞从大便而去，体现「通因通用」之法。木香、槟榔行气导滞，寓「调气则后重自除」之意；当归养血和血，寓「行血则便脓自愈」之意，共为佐药。肉桂少量反佐，防苦寒太过伤中阳。甘草调和诸药为使。全方气血并调、通因通用，湿热清、气血和则痢疾自愈。",
        keyPoints: ["下痢赤白相兼", "里急后重", "舌苔黄腻"],
        relatedSyndromes: ["湿热痢疾证"],
        relatedConstitutions: ["平和质"],
        modifications: [
            { condition: "痢疾初起兼表证", modification: "加葛根以解表升清" },
            { condition: "血痢明显", modification: "加白头翁、地榆以凉血止痢" }
        ],
        contraindications: ["虚寒痢疾者禁用"]
    },
    {
        id: "formula_076",
        name: "吴茱萸汤",
        pinyin: "Wu Zhu Yu Tang",
        source: "《伤寒论》",
        category: "温里剂",
        subcategory: "温中祛寒剂",
        composition: [
            { herbName: "吴茱萸", dosage: "9g", role: "君药" },
            { herbName: "人参", dosage: "9g", role: "臣药" },
            { herbName: "生姜", dosage: "18g", role: "佐药" },
            { herbName: "大枣", dosage: "4枚", role: "使药" }
        ],
        functions: ["温中补虚", "降逆止呕"],
        indications: ["胃寒呕吐证", "食谷欲呕", "胃脘冷痛", "肝寒上逆证", "干呕吐涎沫", "巅顶头痛", "肾寒上逆证", "吐利", "手足逆冷", "烦躁欲死"],
        analysis: "本方为温中降逆之代表方。方中吴茱萸为君，味辛苦性热，温中散寒、降逆止呕、下气止痛，一药而肝、胃、脾、肾四经兼顾，为治三经虚寒之要药。生姜温胃散寒、降逆止呕为臣，与吴茱萸相配，温降之力更强。人参补气健脾、扶正祛邪为佐。大枣益气和中为使，与生姜相配调和脾胃。四药合用，温中补虚、降逆止呕，使寒散、虚复、呕止。",
        keyPoints: ["食谷欲呕或吐涎沫", "巅顶头痛", "手足逆冷"],
        relatedSyndromes: ["肝胃虚寒证", "浊阴上逆证"],
        relatedConstitutions: ["阳虚质"],
        modifications: [
            { condition: "呕吐较重", modification: "加半夏以增强降逆止呕之力" },
            { condition: "腹痛明显", modification: "加肉桂以温中止痛" }
        ],
        contraindications: ["郁热犯胃之呕逆者禁用"]
    },
    {
        id: "formula_077",
        name: "参苓白术散",
        pinyin: "Shen Ling Bai Zhu San",
        source: "《太平惠民和剂局方》",
        category: "补益剂",
        subcategory: "补气剂",
        composition: [
            { herbName: "人参", dosage: "15g", role: "君药" },
            { herbName: "白术", dosage: "15g", role: "臣药" },
            { herbName: "茯苓", dosage: "15g", role: "臣药" },
            { herbName: "山药", dosage: "15g", role: "臣药" },
            { herbName: "莲子肉", dosage: "9g", role: "佐药" },
            { herbName: "薏苡仁", dosage: "9g", role: "佐药" },
            { herbName: "白扁豆", dosage: "12g", role: "佐药" },
            { herbName: "砂仁", dosage: "6g", role: "佐药" },
            { herbName: "桔梗", dosage: "6g", role: "佐药" },
            { herbName: "甘草", dosage: "10g", role: "使药" }
        ],
        functions: ["益气健脾", "渗湿止泻"],
        indications: ["脾虚湿盛证", "饮食不化", "胸脘痞闷", "肠鸣泄泻", "四肢乏力", "形体消瘦", "面色萎黄", "舌淡苔白腻", "脉虚缓"],
        analysis: "本方为治脾虚夹湿之代表方。方中人参补脾胃之气为君。白术健脾燥湿、茯苓健脾渗湿为臣，二者相配健脾祛湿之力尤著。山药、莲子肉助人参健脾益气，兼能涩肠止泻；薏苡仁、白扁豆助白术、茯苓健脾渗湿；砂仁醒脾和胃、行气化滞，使补而不滞；桔梗宣肺利气、载药上行，兼有培土生金之意，共为佐药。甘草健脾和中、调和诸药为使。诸药合用，益气健脾、渗湿止泻，脾运健则湿自除。",
        keyPoints: ["肠鸣泄泻", "四肢乏力", "面色萎黄", "舌淡苔白腻"],
        relatedSyndromes: ["脾虚湿盛证", "脾虚泄泻证"],
        relatedConstitutions: ["气虚质", "痰湿质"],
        modifications: [
            { condition: "久泻不止", modification: "加乌梅、石榴皮以涩肠止泻" },
            { condition: "兼食积", modification: "加神曲、山楂以消食和胃" }
        ],
        contraindications: ["阴虚火旺者慎用"]
    },
    {
        id: "formula_078",
        name: "归脾汤",
        pinyin: "Gui Pi Tang",
        source: "《济生方》",
        category: "补益剂",
        subcategory: "补血剂",
        composition: [
            { herbName: "白术", dosage: "9g", role: "君药" },
            { herbName: "人参", dosage: "9g", role: "君药" },
            { herbName: "黄芪", dosage: "12g", role: "君药" },
            { herbName: "当归", dosage: "9g", role: "臣药" },
            { herbName: "龙眼肉", dosage: "9g", role: "臣药" },
            { herbName: "茯神", dosage: "9g", role: "佐药" },
            { herbName: "酸枣仁", dosage: "9g", role: "佐药" },
            { herbName: "远志", dosage: "6g", role: "佐药" },
            { herbName: "木香", dosage: "6g", role: "佐药" },
            { herbName: "炙甘草", dosage: "3g", role: "使药" },
            { herbName: "生姜", dosage: "3片", role: "使药" },
            { herbName: "大枣", dosage: "3枚", role: "使药" }
        ],
        functions: ["益气补血", "健脾养心"],
        indications: ["心脾气血两虚证", "心悸怔忡", "健忘失眠", "盗汗虚热", "体倦食少", "面色萎黄", "舌淡苔薄白", "脉细弱", "脾不统血证", "便血", "皮下紫癜", "妇女崩漏", "月经超前", "量多色淡"],
        analysis: "本方为益气补血、健脾养心之要方。方中黄芪、人参、白术甘温补气健脾为君，气旺则血生、脾健则统血。当归、龙眼肉养血补心为臣，与补气药相配气血双补。茯神、酸枣仁、远志宁心安神为佐；木香理气醒脾，使补而不滞；生姜、大枣调和脾胃。炙甘草补气健脾、调和诸药为使。全方心脾同治、气血双补，脾健则统血有权，心血足则神安志定。",
        keyPoints: ["心悸失眠", "体倦食少", "面色萎黄", "舌淡脉细弱"],
        relatedSyndromes: ["心脾两虚证", "脾不统血证"],
        relatedConstitutions: ["气虚质", "阴虚质"],
        modifications: [
            { condition: "崩漏下血", modification: "加山茱萸、茜草以固冲止血" },
            { condition: "失眠较重", modification: "加五味子、柏子仁以养心安神" }
        ],
        contraindications: ["阴虚火旺者慎用"]
    },
    {
        id: "formula_079",
        name: "生脉散",
        pinyin: "Sheng Mai San",
        source: "《医学启源》",
        category: "补益剂",
        subcategory: "补气剂",
        composition: [
            { herbName: "人参", dosage: "9g", role: "君药" },
            { herbName: "麦冬", dosage: "9g", role: "臣药" },
            { herbName: "五味子", dosage: "6g", role: "佐药" }
        ],
        functions: ["益气生津", "敛阴止汗"],
        indications: ["温热暑热耗气伤阴证", "汗多神疲", "体倦乏力", "气短懒言", "咽干口渴", "舌干红少苔", "脉虚数", "久咳伤肺气阴两虚证", "干咳少痰", "短气自汗", "口干舌燥", "脉虚细"],
        analysis: "本方为益气养阴之基础方。方中人参为君，大补元气、益肺生津，使气旺则津生。麦冬为臣，养阴清热、润肺生津，与人参相配则气阴双补。五味子为佐，酸收敛肺、止汗固脱，与麦冬相配酸甘化阴，与人参相配则补敛兼施。三药一补、一润、一敛，合而益气生津、敛阴止汗，使气复津生、汗止阴存。",
        keyPoints: ["体倦气短", "咽干口渴", "汗多", "脉虚"],
        relatedSyndromes: ["气阴两虚证"],
        relatedConstitutions: ["气虚质", "阴虚质"],
        modifications: [
            { condition: "阴虚明显", modification: "加玉竹、沙参以养阴生津" },
            { condition: "汗出过多", modification: "加牡蛎、浮小麦以固表止汗" }
        ],
        contraindications: ["外感表证未解者慎用"]
    },
    {
        id: "formula_080",
        name: "炙甘草汤",
        pinyin: "Zhi Gan Cao Tang",
        source: "《伤寒论》",
        category: "补益剂",
        subcategory: "补血剂",
        composition: [
            { herbName: "炙甘草", dosage: "12g", role: "君药" },
            { herbName: "人参", dosage: "6g", role: "臣药" },
            { herbName: "生地黄", dosage: "30g", role: "臣药" },
            { herbName: "阿胶", dosage: "6g", role: "臣药" },
            { herbName: "麦冬", dosage: "10g", role: "佐药" },
            { herbName: "麻子仁", dosage: "10g", role: "佐药" },
            { herbName: "桂枝", dosage: "9g", role: "佐药" },
            { herbName: "生姜", dosage: "9g", role: "佐药" },
            { herbName: "大枣", dosage: "10枚", role: "使药" }
        ],
        functions: ["益气滋阴", "通阳复脉"],
        indications: ["阴血阳气虚弱心脉失养证", "脉结代", "心动悸", "虚羸少气", "舌光少苔", "质干而萎", "虚劳肺痿", "干咳无痰", "或咯吐涎沫", "气短"],
        analysis: "本方为气血阴阳并补、复脉定悸之名方。方中重用炙甘草为君，补气复脉。生地黄、阿胶、麦冬、麻子仁滋阴补血以充血脉为臣。人参益气，桂枝、生姜通阳复脉，使滋阴药得温通则补而不滞，气血阴阳同调。大枣益气滋脾为使。全方滋阴养血、益气通阳，气血充足、阴阳协调则脉气接续，脉结代、心动悸自平。",
        keyPoints: ["脉结代", "心动悸", "虚羸少气"],
        relatedSyndromes: ["气血阴阳俱虚证", "心脉失养证"],
        relatedConstitutions: ["气虚质", "阴虚质"],
        modifications: [
            { condition: "心悸较甚", modification: "加酸枣仁、柏子仁以养心安神" },
            { condition: "阴虚明显", modification: "加五味子以敛阴" }
        ],
        contraindications: ["湿浊中阻者慎用"]
    },
    {
        id: "formula_081",
        name: "瓜蒌薤白白酒汤",
        pinyin: "Gua Lou Xie Bai Bai Jiu Tang",
        source: "《金匮要略》",
        category: "理气剂",
        subcategory: "行气剂",
        composition: [
            { herbName: "瓜蒌", dosage: "12g", role: "君药" },
            { herbName: "薤白", dosage: "9g", role: "臣药" },
            { herbName: "白酒", dosage: "适量", role: "佐药" }
        ],
        functions: ["通阳散结", "行气祛痰"],
        indications: ["胸痹证", "胸背疼痛", "心痛彻背", "喘息咳唾", "短气", "舌苔白腻", "脉沉弦或紧"],
        analysis: "本方为治胸痹之代表方。方中瓜蒌为君，涤痰散结、宽胸利气，能化胸中痰浊。薤白为臣，辛温通阳、行气止痛，善散阴寒凝结，与瓜蒌相配则化浊通阳、痰去阳通。白酒辛温通阳、轻扬善行，助药力上达胸膈而通阳散结为佐。三药合用，通阳散结、行气祛痰，胸阳宣通则痹痛自解。",
        keyPoints: ["胸背痛", "喘息短气", "舌苔白腻"],
        relatedSyndromes: ["胸阳不振痰浊痹阻证"],
        relatedConstitutions: ["痰湿质"],
        modifications: [
            { condition: "痰浊较重", modification: "加半夏以燥湿化痰" },
            { condition: "气滞明显", modification: "加枳实、厚朴以行气消痞" }
        ],
        contraindications: ["阴虚肺燥者不宜使用"]
    },
    {
        id: "formula_082",
        name: "桂枝茯苓丸",
        pinyin: "Gui Zhi Fu Ling Wan",
        source: "《金匮要略》",
        category: "理血剂",
        subcategory: "活血化瘀剂",
        composition: [
            { herbName: "桂枝", dosage: "9g", role: "君药" },
            { herbName: "茯苓", dosage: "9g", role: "臣药" },
            { herbName: "牡丹皮", dosage: "9g", role: "臣药" },
            { herbName: "桃仁", dosage: "9g", role: "佐药" },
            { herbName: "芍药", dosage: "9g", role: "佐药" }
        ],
        functions: ["活血化瘀", "缓消癥块"],
        indications: ["瘀阻胞宫证", "妇人素有癥块", "妊娠漏下不止", "胎动不安", "血瘀经闭", "行经腹痛", "产后恶露不尽", "血色紫暗"],
        analysis: "本方为缓消癥块之代表方。方中桂枝为君，温通经脉、行散瘀滞，以畅血行。茯苓为臣，渗湿利水、益心脾之气，与桂枝相配则温通渗利。牡丹皮、桃仁为臣佐，活血化瘀、消癥散结。芍药养血和营、缓急止痛为佐，使化瘀而不伤正。五药合用，活血化瘀、缓消癥块，使瘀去新生、癥块渐消，妇人诸疾得愈。",
        keyPoints: ["癥块", "腹痛拒按", "血色紫暗"],
        relatedSyndromes: ["瘀阻胞宫证", "癥瘕积聚证"],
        relatedConstitutions: ["血瘀质"],
        modifications: [
            { condition: "疼痛较甚", modification: "加延胡索、五灵脂以活血止痛" },
            { condition: "瘀血较重", modification: "加三棱、莪术以破血消癥" }
        ],
        contraindications: ["孕妇忌用", "月经过多者慎用"]
    },
    {
        id: "formula_083",
        name: "温经汤",
        pinyin: "Wen Jing Tang",
        source: "《金匮要略》",
        category: "理血剂",
        subcategory: "活血化瘀剂",
        composition: [
            { herbName: "吴茱萸", dosage: "9g", role: "君药" },
            { herbName: "桂枝", dosage: "6g", role: "臣药" },
            { herbName: "当归", dosage: "6g", role: "臣药" },
            { herbName: "川芎", dosage: "6g", role: "臣药" },
            { herbName: "芍药", dosage: "6g", role: "佐药" },
            { herbName: "牡丹皮", dosage: "6g", role: "佐药" },
            { herbName: "阿胶", dosage: "6g", role: "佐药" },
            { herbName: "麦冬", dosage: "9g", role: "佐药" },
            { herbName: "人参", dosage: "6g", role: "佐药" },
            { herbName: "甘草", dosage: "6g", role: "佐药" },
            { herbName: "半夏", dosage: "6g", role: "佐药" },
            { herbName: "生姜", dosage: "6g", role: "使药" }
        ],
        functions: ["温经散寒", "养血祛瘀"],
        indications: ["冲任虚寒瘀血阻滞证", "月经不调", "或前或后", "或逾期不止", "或一月再行", "傍晚发热", "手心烦热", "唇口干燥", "小腹冷痛", "久不受孕"],
        analysis: "本方为妇科调经之祖方。方中吴茱萸、桂枝为君，温经散寒、通利血脉。当归、川芎、芍药为臣，养血活血调经。牡丹皮活血祛瘀，兼退虚热；阿胶、麦冬养血滋阴润燥，防温燥伤阴；人参、甘草益气健脾，资生化之源；半夏、生姜和胃降逆。全方温经散寒与养血祛瘀并用，兼益气温阳滋阴，寒去瘀消、血行经调，则诸症自愈。",
        keyPoints: ["月经不调", "小腹冷痛", "唇口干燥", "手心烦热"],
        relatedSyndromes: ["冲任虚寒瘀血阻滞证"],
        relatedConstitutions: ["阴虚质", "阳虚质"],
        modifications: [
            { condition: "小腹冷痛明显", modification: "加小茴香、乌药以温经止痛" },
            { condition: "血虚明显", modification: "加熟地黄以养血填精" }
        ],
        contraindications: ["实热证者忌用"]
    },
    {
        id: "formula_084",
        name: "黄土汤",
        pinyin: "Huang Tu Tang",
        source: "《金匮要略》",
        category: "理血剂",
        subcategory: "止血剂",
        composition: [
            { herbName: "灶心黄土", dosage: "30g", role: "君药" },
            { herbName: "白术", dosage: "9g", role: "臣药" },
            { herbName: "附子", dosage: "9g", role: "臣药" },
            { herbName: "生地黄", dosage: "9g", role: "佐药" },
            { herbName: "阿胶", dosage: "9g", role: "佐药" },
            { herbName: "黄芩", dosage: "9g", role: "佐药" },
            { herbName: "甘草", dosage: "9g", role: "使药" }
        ],
        functions: ["温阳健脾", "养血止血"],
        indications: ["脾阳不足脾不统血证", "大便下血", "先便后血", "吐血衄血", "血色暗淡", "四肢不温", "面色萎黄", "舌淡苔白", "脉沉细无力"],
        analysis: "本方为温阳止血之代表方。方中灶心黄土为君，温中涩肠、收敛止血。白术、附子为臣，温阳健脾，以复脾统血之权。生地黄、阿胶滋阴养血、止血，为佐；黄芩苦寒坚阴，制约白术、附子之温燥，使温阳而不动血，为佐药。甘草调和诸药为使。全方温阳与滋阴并用，标本兼顾，脾阳复则统血有权，血归其经则下血自止。",
        keyPoints: ["便血暗淡", "四肢不温", "面色萎黄", "舌淡苔白"],
        relatedSyndromes: ["脾阳不足脾不统血证"],
        relatedConstitutions: ["阳虚质", "气虚质"],
        modifications: [
            { condition: "气虚明显", modification: "加黄芪以益气摄血" },
            { condition: "出血较多", modification: "加大蓟、小蓟以凉血止血" }
        ],
        contraindications: ["实热出血者禁用"]
    },

    // 十三、治风剂扩充
    {
        id: "formula_085",
        name: "天麻钩藤饮",
        pinyin: "Tian Ma Gou Teng Yin",
        source: "《中医内科杂病证治新义》",
        category: "治风剂",
        subcategory: "平息内风剂",
        composition: [
            { herbName: "天麻", dosage: "9g", role: "君药" },
            { herbName: "钩藤", dosage: "12g", role: "君药" },
            { herbName: "石决明", dosage: "18g", role: "臣药" },
            { herbName: "栀子", dosage: "9g", role: "佐药" },
            { herbName: "黄芩", dosage: "9g", role: "佐药" },
            { herbName: "川牛膝", dosage: "12g", role: "佐药" },
            { herbName: "杜仲", dosage: "9g", role: "佐药" },
            { herbName: "益母草", dosage: "9g", role: "佐药" },
            { herbName: "桑寄生", dosage: "9g", role: "佐药" },
            { herbName: "夜交藤", dosage: "9g", role: "佐药" },
            { herbName: "茯神", dosage: "9g", role: "佐药" }
        ],
        functions: ["平肝息风", "清热活血", "补益肝肾"],
        indications: ["肝阳偏亢肝风上扰证", "头痛", "眩晕", "失眠多梦", "口苦面红", "舌红苔黄", "脉弦或数"],
        analysis: "本方为治肝阳上亢、肝风上扰之常用方。方中天麻、钩藤为君，平肝息风，为治眩晕之要药。石决明为臣，平肝潜阳、清热明目，助君药平息肝风。栀子、黄芩清热泻火，使肝经之热得清；川牛膝引血下行，兼能活血通络；杜仲、桑寄生补益肝肾，治病求本；益母草活血利水；夜交藤、茯神宁心安神，共为佐药。全方平肝息风与清热活血、补益肝肾并举，标本兼顾。",
        keyPoints: ["头痛眩晕", "失眠多梦", "舌红苔黄", "脉弦数"],
        relatedSyndromes: ["肝阳上亢证", "肝风上扰证"],
        relatedConstitutions: ["阴虚质"],
        modifications: [
            { condition: "眩晕较重", modification: "加菊花、白蒺藜以平肝明目" },
            { condition: "阴虚明显", modification: "加白芍、生地黄以滋阴柔肝" }
        ],
        contraindications: ["脾胃虚寒者慎用"]
    },
    {
        id: "formula_086",
        name: "桑杏汤",
        pinyin: "Sang Xing Tang",
        source: "《温病条辨》",
        category: "治燥剂",
        subcategory: "轻宣外燥剂",
        composition: [
            { herbName: "桑叶", dosage: "3g", role: "君药" },
            { herbName: "杏仁", dosage: "4.5g", role: "君药" },
            { herbName: "沙参", dosage: "6g", role: "臣药" },
            { herbName: "象贝母", dosage: "3g", role: "佐药" },
            { herbName: "香豉", dosage: "3g", role: "佐药" },
            { herbName: "栀子皮", dosage: "3g", role: "佐药" },
            { herbName: "梨皮", dosage: "3g", role: "佐药" }
        ],
        functions: ["清宣温燥", "润肺止咳"],
        indications: ["外感温燥证", "身热不甚", "口渴", "咽干鼻燥", "干咳无痰", "或痰少而黏", "舌红苔薄白而干", "脉浮数而右脉大"],
        analysis: "本方为治温燥伤肺轻证之代表方。方中桑叶清宣上焦燥热、杏仁宣利肺气止咳，共为君药。沙参润肺生津为臣。象贝母清化痰热；香豉、栀子皮清泄郁热；梨皮润肺生津，共为佐药。全方轻宣凉润，使燥热得清、肺津得复，则咳嗽自止。",
        keyPoints: ["干咳无痰", "咽干鼻燥", "苔薄白而干"],
        relatedSyndromes: ["温燥伤肺证"],
        relatedConstitutions: ["阴虚质"],
        modifications: [
            { condition: "咽痛明显", modification: "加牛蒡子、薄荷以利咽" },
            { condition: "咳血", modification: "加白茅根、仙鹤草以凉血止血" }
        ],
        contraindications: ["风寒咳嗽者忌用"]
    },
    {
        id: "formula_087",
        name: "麦门冬汤",
        pinyin: "Mai Men Dong Tang",
        source: "《金匮要略》",
        category: "治燥剂",
        subcategory: "滋润内燥剂",
        composition: [
            { herbName: "麦门冬", dosage: "70g", role: "君药" },
            { herbName: "半夏", dosage: "10g", role: "臣药" },
            { herbName: "人参", dosage: "6g", role: "臣药" },
            { herbName: "甘草", dosage: "6g", role: "佐药" },
            { herbName: "粳米", dosage: "5g", role: "佐药" },
            { herbName: "大枣", dosage: "4枚", role: "佐药" }
        ],
        functions: ["滋养肺胃", "降逆下气"],
        indications: ["肺阴不足证", "咳逆上气", "咯痰不爽", "或咳吐涎沫", "口干咽燥", "手足心热", "舌红少苔", "脉虚数", "胃阴不足证", "呕吐", "或噎膈", "舌干红少苔"],
        analysis: "本方为滋养肺胃阴津之代表方。方中重用麦门冬为君，其性甘寒，滋养肺胃之阴、清虚火。半夏为臣，降逆下气、化痰止呕，与麦冬相配（七比一）则润而不腻、降而不燥，为「去性取用」之典范。人参补脾益气为臣。甘草、粳米、大枣补脾益胃、培土生金，使中气健运则肺津自生。诸药合用，滋阴润燥、降逆下气，肺胃得养则咳逆、呕吐自止。",
        keyPoints: ["咳逆上气", "口干咽燥", "舌红少苔"],
        relatedSyndromes: ["肺胃阴虚证"],
        relatedConstitutions: ["阴虚质"],
        modifications: [
            { condition: "肺痿咳甚", modification: "加桑叶、天花粉以润肺" },
            { condition: "呕吐明显", modification: "加竹茹、旋覆花以降逆止呕" }
        ],
        contraindications: ["痰湿壅盛者不宜使用"]
    },
    {
        id: "formula_088",
        name: "养阴清肺汤",
        pinyin: "Yang Yin Qing Fei Tang",
        source: "《重楼玉钥》",
        category: "治燥剂",
        subcategory: "滋润内燥剂",
        composition: [
            { herbName: "生地黄", dosage: "6g", role: "君药" },
            { herbName: "麦冬", dosage: "3.6g", role: "臣药" },
            { herbName: "玄参", dosage: "4.5g", role: "臣药" },
            { herbName: "贝母", dosage: "2.4g", role: "佐药" },
            { herbName: "牡丹皮", dosage: "2.4g", role: "佐药" },
            { herbName: "白芍", dosage: "2.4g", role: "佐药" },
            { herbName: "薄荷", dosage: "1.5g", role: "佐药" },
            { herbName: "甘草", dosage: "1.5g", role: "使药" }
        ],
        functions: ["养阴清肺", "解毒利咽"],
        indications: ["白喉", "喉间起白如腐", "不易拭去", "咽喉肿痛", "初起发热", "或不发热", "鼻干唇燥", "或咳或不咳", "呼吸有声", "似喘非喘", "脉数无力或细数"],
        analysis: "本方为治白喉之专方。方中生地黄养阴清热、凉血解毒为君。玄参、麦冬养阴生津、润肺利咽为臣，与生地相配滋阴之力更著。牡丹皮清热凉血散瘀；贝母润肺化痰；白芍敛阴和营；薄荷宣肺利咽；甘草清热解毒、调和诸药。全方养阴清肺、解毒利咽，阴复毒解则咽喉自利。",
        keyPoints: ["咽喉肿痛", "喉间白腐", "鼻干唇燥"],
        relatedSyndromes: ["阴虚燥热证"],
        relatedConstitutions: ["阴虚质"],
        modifications: [
            { condition: "热毒较重", modification: "加金银花、连翘以清热解毒" },
            { condition: "咽痛甚", modification: "加射干、山豆根以利咽止痛" }
        ],
        contraindications: ["脾虚便溏者慎用"]
    },
    {
        id: "formula_089",
        name: "百合固金汤",
        pinyin: "Bai He Gu Jin Tang",
        source: "《慎斋遗书》",
        category: "治燥剂",
        subcategory: "滋润内燥剂",
        composition: [
            { herbName: "熟地黄", dosage: "9g", role: "君药" },
            { herbName: "生地黄", dosage: "6g", role: "君药" },
            { herbName: "百合", dosage: "3g", role: "君药" },
            { herbName: "麦冬", dosage: "4.5g", role: "臣药" },
            { herbName: "贝母", dosage: "3g", role: "佐药" },
            { herbName: "玄参", dosage: "2.4g", role: "佐药" },
            { herbName: "当归", dosage: "3g", role: "佐药" },
            { herbName: "白芍", dosage: "3g", role: "佐药" },
            { herbName: "桔梗", dosage: "2.4g", role: "佐药" },
            { herbName: "甘草", dosage: "1.5g", role: "使药" }
        ],
        functions: ["滋养肺肾", "止咳化痰"],
        indications: ["肺肾阴虚证", "咳嗽气喘", "痰中带血", "咽喉燥痛", "头晕目眩", "午后潮热", "舌红少苔", "脉细数"],
        analysis: "本方为治肺肾阴虚咳血之代表方。方中百合润肺止咳、清心安神为君；熟地黄、生地黄滋阴补肾、凉血止血为君。麦冬、玄参养阴清热、润肺生津为臣。贝母润肺化痰止咳；当归、白芍养血和血；桔梗宣肺利咽、载药上行，使药力达于肺；甘草调和诸药为使。全方滋养肺肾之阴，阴复火降则咳嗽、咯血自止。",
        keyPoints: ["咳痰带血", "咽喉燥痛", "午后潮热", "舌红少苔"],
        relatedSyndromes: ["肺肾阴虚证"],
        relatedConstitutions: ["阴虚质"],
        modifications: [
            { condition: "咳血明显", modification: "加白茅根、仙鹤草以凉血止血" },
            { condition: "盗汗明显", modification: "加牡蛎、五味子以敛汗" }
        ],
        contraindications: ["脾虚便溏者慎用"]
    },

    // 十四、祛湿剂扩充
    {
        id: "formula_090",
        name: "平胃散",
        pinyin: "Ping Wei San",
        source: "《太平惠民和剂局方》",
        category: "祛湿剂",
        subcategory: "和胃化湿剂",
        composition: [
            { herbName: "苍术", dosage: "12g", role: "君药" },
            { herbName: "厚朴", dosage: "9g", role: "臣药" },
            { herbName: "陈皮", dosage: "9g", role: "佐药" },
            { herbName: "甘草", dosage: "3g", role: "使药" },
            { herbName: "生姜", dosage: "2片", role: "使药" },
            { herbName: "大枣", dosage: "2枚", role: "使药" }
        ],
        functions: ["燥湿运脾", "行气和胃"],
        indications: ["湿滞脾胃证", "脘腹胀满", "不思饮食", "口淡无味", "呕吐恶心", "嗳气吞酸", "肢体沉重", "怠惰嗜卧", "常多自利", "舌苔白腻而厚", "脉缓"],
        analysis: "本方为燥湿运脾、行气和胃之基础方。方中苍术为君，苦温性燥，燥湿运脾。厚朴为臣，行气除满、芳香化湿，与苍术相配则燥湿以助运化。陈皮为佐，理气化滞、和胃止呕。甘草为使，调和诸药。生姜、大枣调和脾胃。四药合用，燥湿运脾、行气和胃，湿去脾健则胀满呕恶自除。",
        keyPoints: ["脘腹胀满", "口淡无味", "舌苔白腻而厚"],
        relatedSyndromes: ["湿滞脾胃证"],
        relatedConstitutions: ["痰湿质"],
        modifications: [
            { condition: "兼食积", modification: "加山楂、神曲以消食化积" },
            { condition: "兼寒", modification: "加干姜、肉桂以温中散寒" }
        ],
        contraindications: ["阴虚内热者慎用"]
    },
    {
        id: "formula_091",
        name: "三仁汤",
        pinyin: "San Ren Tang",
        source: "《温病条辨》",
        category: "祛湿剂",
        subcategory: "清热祛湿剂",
        composition: [
            { herbName: "杏仁", dosage: "15g", role: "君药" },
            { herbName: "白蔻仁", dosage: "6g", role: "臣药" },
            { herbName: "薏苡仁", dosage: "18g", role: "君药" },
            { herbName: "飞滑石", dosage: "18g", role: "臣药" },
            { herbName: "通草", dosage: "6g", role: "佐药" },
            { herbName: "竹叶", dosage: "6g", role: "佐药" },
            { herbName: "厚朴", dosage: "6g", role: "佐药" },
            { herbName: "半夏", dosage: "10g", role: "佐药" }
        ],
        functions: ["宣畅气机", "清利湿热"],
        indications: ["湿温初起暑温夹湿湿重于热证", "头痛恶寒", "身重疼痛", "肢体倦怠", "面色淡黄", "胸闷不饥", "午后身热", "苔白不渴", "脉弦细而濡"],
        analysis: "本方为治湿温初起之代表方。方中杏仁宣利上焦肺气以开肺气（开上）；白蔻仁芳香化湿、行气宽中以畅中焦（畅中）；薏苡仁甘淡渗利湿热、健脾以渗下焦（渗下），三仁分利三焦，共为君药。飞滑石、通草、竹叶清利湿热为臣佐。厚朴、半夏行气化湿、散满除痞，使气行则湿化。诸药合用，宣上畅中渗下，使湿热之邪从三焦分消。",
        keyPoints: ["身重倦怠", "胸闷不饥", "午后身热", "苔白腻"],
        relatedSyndromes: ["湿温初起证", "湿重于热证"],
        relatedConstitutions: ["痰湿质"],
        modifications: [
            { condition: "兼表证", modification: "加藿香、香薷以解表化湿" },
            { condition: "热象明显", modification: "加黄芩、栀子以清热" }
        ],
        contraindications: ["阴虚津亏者忌用"]
    },
    {
        id: "formula_092",
        name: "八正散",
        pinyin: "Ba Zheng San",
        source: "《太平惠民和剂局方》",
        category: "祛湿剂",
        subcategory: "清热祛湿剂",
        composition: [
            { herbName: "车前子", dosage: "9g", role: "君药" },
            { herbName: "瞿麦", dosage: "9g", role: "臣药" },
            { herbName: "萹蓄", dosage: "9g", role: "臣药" },
            { herbName: "滑石", dosage: "9g", role: "臣药" },
            { herbName: "山栀子仁", dosage: "9g", role: "臣药" },
            { herbName: "木通", dosage: "9g", role: "臣药" },
            { herbName: "炙甘草梢", dosage: "9g", role: "佐药" },
            { herbName: "大黄", dosage: "9g", role: "佐药" }
        ],
        functions: ["清热泻火", "利水通淋"],
        indications: ["湿热淋证", "尿频尿急", "溺时涩痛", "淋沥不畅", "尿色浑赤", "甚则癃闭不通", "小腹急满", "口燥咽干", "舌苔黄腻", "脉滑数"],
        analysis: "本方为治热淋之代表方。方中车前子、木通为君，清热利水通淋。瞿麦、萹蓄、滑石为臣，助君药清热利湿通淋。栀子清泄三焦湿热；大黄泻热降火、通腑导热，使湿热从二便分消；炙甘草梢缓急止痛、调和诸药。八药合用，清热泻火、利水通淋，使湿热清、水道通则淋证自愈。",
        keyPoints: ["尿频涩痛", "淋沥不畅", "舌苔黄腻"],
        relatedSyndromes: ["湿热淋证"],
        relatedConstitutions: ["平和质"],
        modifications: [
            { condition: "血淋", modification: "加小蓟、白茅根以凉血止血" },
            { condition: "石淋", modification: "加金钱草、海金沙以化石通淋" }
        ],
        contraindications: ["体虚久淋者慎用", "孕妇慎用"]
    },
    {
        id: "formula_093",
        name: "二妙散",
        pinyin: "Er Miao San",
        source: "《丹溪心法》",
        category: "祛湿剂",
        subcategory: "清热祛湿剂",
        composition: [
            { herbName: "黄柏", dosage: "15g", role: "君药" },
            { herbName: "苍术", dosage: "15g", role: "臣药" }
        ],
        functions: ["清热燥湿"],
        indications: ["湿热下注证", "筋骨疼痛", "或两足痿软", "或足膝红肿热痛", "或下部湿疮", "或湿热带下", "或湿热痿证", "小便短赤", "舌苔黄腻"],
        analysis: "本方为治湿热下注之基础方。方中黄柏为君，苦寒清热燥湿，善清下焦湿热。苍术为臣，苦温燥湿健脾，使湿去则热孤。二药相伍，一寒一温、一清一燥，清热燥湿之力专一，为治下焦湿热诸证之基础方。",
        keyPoints: ["足膝肿痛", "下部湿疮", "苔黄腻"],
        relatedSyndromes: ["湿热下注证"],
        relatedConstitutions: ["痰湿质"],
        modifications: [
            { condition: "湿热痿证兼足膝肿痛", modification: "加牛膝、薏苡仁（即三妙丸、四妙丸）" },
            { condition: "湿热带下", modification: "加芡实、椿皮以燥湿止带" }
        ],
        contraindications: ["阴虚者慎用"]
    },
    {
        id: "formula_094",
        name: "甘露消毒丹",
        pinyin: "Gan Lu Xiao Du Dan",
        source: "《温热经纬》",
        category: "祛湿剂",
        subcategory: "清热祛湿剂",
        composition: [
            { herbName: "飞滑石", dosage: "15g", role: "君药" },
            { herbName: "绵茵陈", dosage: "11g", role: "君药" },
            { herbName: "淡黄芩", dosage: "10g", role: "臣药" },
            { herbName: "石菖蒲", dosage: "6g", role: "佐药" },
            { herbName: "川贝母", dosage: "5g", role: "佐药" },
            { herbName: "木通", dosage: "5g", role: "佐药" },
            { herbName: "藿香", dosage: "4g", role: "佐药" },
            { herbName: "连翘", dosage: "4g", role: "佐药" },
            { herbName: "白蔻仁", dosage: "4g", role: "佐药" },
            { herbName: "薄荷", dosage: "4g", role: "佐药" },
            { herbName: "射干", dosage: "4g", role: "佐药" }
        ],
        functions: ["利湿化浊", "清热解毒"],
        indications: ["湿温时疫邪在气分湿热并重证", "发热倦怠", "胸闷腹胀", "肢酸咽痛", "身目发黄", "颐肿口渴", "小便短赤", "泄泻淋浊", "舌苔淡白或厚腻或干黄"],
        analysis: "本方为治湿温时疫、湿热并重之代表方。方中滑石、茵陈、黄芩为君，清利湿热、清热解毒，为「三宝」之一。石菖蒲、藿香、白蔻仁芳香化浊、醒脾和中；连翘、薄荷、射干、贝母清热解毒、利咽散结；木通助滑石清利湿热。全方芳香与清热并施，上中下三焦同治，使湿热毒邪从内外分消。",
        keyPoints: ["发热倦怠", "胸闷腹胀", "咽痛身黄", "苔腻"],
        relatedSyndromes: ["湿温时疫证", "湿热并重证"],
        relatedConstitutions: ["痰湿质"],
        modifications: [
            { condition: "黄疸明显", modification: "加栀子、大黄以利湿退黄" },
            { condition: "咽痛较重", modification: "加板蓝根、山豆根以解毒利咽" }
        ],
        contraindications: ["阴证湿温者忌用"]
    },
    {
        id: "formula_095",
        name: "真武汤",
        pinyin: "Zhen Wu Tang",
        source: "《伤寒论》",
        category: "祛湿剂",
        subcategory: "温化寒湿剂",
        composition: [
            { herbName: "附子", dosage: "9g", role: "君药" },
            { herbName: "白术", dosage: "6g", role: "臣药" },
            { herbName: "茯苓", dosage: "9g", role: "臣药" },
            { herbName: "芍药", dosage: "9g", role: "佐药" },
            { herbName: "生姜", dosage: "9g", role: "佐药" }
        ],
        functions: ["温阳利水"],
        indications: ["阳虚水泛证", "小便不利", "四肢沉重疼痛", "腹痛下利", "或咳或呕", "舌质淡胖", "苔白滑", "脉沉细", "太阳病发汗太过阳虚水泛", "振振欲擗地"],
        analysis: "本方为温阳利水之名方。方中附子为君，大辛大热，温肾助阳、化气行水，为治阳虚水泛之主药。白术健脾燥湿、茯苓淡渗利水为臣，使水湿从小便而去。生姜为佐，温散水气，助附子温阳。芍药为佐，利小便、缓急止痛，并制约附子之刚燥。五药合用，温肾健脾、化气行水，阳复水行则水肿、下利自愈。",
        keyPoints: ["小便不利", "肢体浮肿沉重", "舌淡胖苔白滑"],
        relatedSyndromes: ["脾肾阳虚水气内停证"],
        relatedConstitutions: ["阳虚质", "痰湿质"],
        modifications: [
            { condition: "咳嗽明显", modification: "加五味子、细辛以温肺化饮" },
            { condition: "水肿较重", modification: "加猪苓、泽泻以利水消肿" }
        ],
        contraindications: ["阴虚内热者禁用"]
    },
    {
        id: "formula_096",
        name: "独活寄生汤",
        pinyin: "Du Huo Ji Sheng Tang",
        source: "《备急千金要方》",
        category: "祛湿剂",
        subcategory: "祛风胜湿剂",
        composition: [
            { herbName: "独活", dosage: "9g", role: "君药" },
            { herbName: "桑寄生", dosage: "6g", role: "臣药" },
            { herbName: "杜仲", dosage: "6g", role: "臣药" },
            { herbName: "牛膝", dosage: "6g", role: "臣药" },
            { herbName: "细辛", dosage: "6g", role: "佐药" },
            { herbName: "秦艽", dosage: "6g", role: "佐药" },
            { herbName: "茯苓", dosage: "6g", role: "佐药" },
            { herbName: "肉桂心", dosage: "6g", role: "佐药" },
            { herbName: "防风", dosage: "6g", role: "佐药" },
            { herbName: "川芎", dosage: "6g", role: "佐药" },
            { herbName: "人参", dosage: "6g", role: "佐药" },
            { herbName: "甘草", dosage: "6g", role: "佐药" },
            { herbName: "当归", dosage: "6g", role: "佐药" },
            { herbName: "芍药", dosage: "6g", role: "佐药" },
            { herbName: "干地黄", dosage: "6g", role: "佐药" }
        ],
        functions: ["祛风湿", "止痹痛", "益肝肾", "补气血"],
        indications: ["痹证日久肝肾两虚气血不足证", "腰膝疼痛", "肢节屈伸不利", "或麻木不仁", "畏寒喜温", "心悸气短", "舌淡苔白", "脉细弱"],
        analysis: "本方为治痹证日久、正虚邪恋之代表方。方中独活为君，祛下焦与筋骨间之风寒湿邪。桑寄生、杜仲、牛膝为臣，补肝肾、强筋骨。细辛、秦艽、防风祛风散寒除湿；肉桂温经散寒通脉；茯苓利水渗湿；当归、川芎、地黄、芍药养血活血，寓「治风先治血，血行风自灭」之意；人参、甘草益气健脾。全方祛邪与扶正并用，邪去正复则痹痛自除。",
        keyPoints: ["腰膝冷痛", "屈伸不利", "畏寒喜温", "脉细弱"],
        relatedSyndromes: ["痹证日久肝肾亏虚证"],
        relatedConstitutions: ["阳虚质"],
        modifications: [
            { condition: "寒邪较重", modification: "加附子、干姜以温经散寒" },
            { condition: "湿邪较重", modification: "加薏苡仁、防己以祛湿" }
        ],
        contraindications: ["湿热痹证者慎用"]
    },

    // 十五、祛痰剂扩充
    {
        id: "formula_097",
        name: "温胆汤",
        pinyin: "Wen Dan Tang",
        source: "《三因极一病证方论》",
        category: "祛痰剂",
        subcategory: "清热化痰剂",
        composition: [
            { herbName: "半夏", dosage: "6g", role: "君药" },
            { herbName: "竹茹", dosage: "6g", role: "臣药" },
            { herbName: "枳实", dosage: "6g", role: "臣药" },
            { herbName: "陈皮", dosage: "9g", role: "佐药" },
            { herbName: "茯苓", dosage: "4.5g", role: "佐药" },
            { herbName: "甘草", dosage: "3g", role: "使药" },
            { herbName: "生姜", dosage: "5片", role: "使药" },
            { herbName: "大枣", dosage: "1枚", role: "使药" }
        ],
        functions: ["理气化痰", "和胃利胆"],
        indications: ["胆郁痰扰证", "胆怯易惊", "头眩心悸", "心烦不眠", "夜多异梦", "或呕恶呃逆", "眩晕癫痫", "苔白腻", "脉弦滑"],
        analysis: "本方为治胆郁痰扰之代表方。方中半夏为君，燥湿化痰、降逆和胃。竹茹为臣，清胆和胃、止呕除烦，与半夏相配温凉相济。枳实、陈皮理气化痰，使气顺则痰消。茯苓健脾渗湿，以杜生痰之源。甘草和中。生姜、大枣调和脾胃。全方清温并用、化痰与理气并行，胆胃和则痰扰诸症自解。",
        keyPoints: ["胆怯易惊", "心烦不眠", "苔白腻", "脉弦滑"],
        relatedSyndromes: ["胆郁痰扰证"],
        relatedConstitutions: ["痰湿质"],
        modifications: [
            { condition: "失眠较重", modification: "加酸枣仁、夜交藤以安神" },
            { condition: "惊悸明显", modification: "加龙齿、磁石以镇惊" }
        ],
        contraindications: ["阴虚痰热者慎用"]
    },
    {
        id: "formula_098",
        name: "清气化痰丸",
        pinyin: "Qing Qi Hua Tan Wan",
        source: "《医方考》",
        category: "祛痰剂",
        subcategory: "清热化痰剂",
        composition: [
            { herbName: "瓜蒌仁", dosage: "9g", role: "君药" },
            { herbName: "黄芩", dosage: "9g", role: "臣药" },
            { herbName: "陈皮", dosage: "9g", role: "臣药" },
            { herbName: "茯苓", dosage: "9g", role: "臣药" },
            { herbName: "枳实", dosage: "9g", role: "佐药" },
            { herbName: "胆南星", dosage: "9g", role: "佐药" },
            { herbName: "半夏", dosage: "9g", role: "佐药" },
            { herbName: "杏仁", dosage: "9g", role: "佐药" },
            { herbName: "姜汁", dosage: "适量", role: "佐药" }
        ],
        functions: ["清热化痰", "理气止咳"],
        indications: ["痰热咳嗽", "咳嗽气喘", "咯痰黄稠", "胸膈痞闷", "甚则气急呕恶", "烦躁不宁", "舌质红", "苔黄腻", "脉滑数"],
        analysis: "本方为治痰热咳嗽之代表方。方中胆南星为君，清热化痰。黄芩、瓜蒌仁为臣，清热化痰、润肺止咳。枳实、陈皮理气化痰，使气顺痰消；茯苓健脾渗湿；杏仁宣肺降气止咳；半夏燥湿化痰，姜汁制其毒并助化痰。全方清热化痰、理气止咳，热清痰化则咳嗽自止。",
        keyPoints: ["咳痰黄稠", "胸膈痞闷", "苔黄腻", "脉滑数"],
        relatedSyndromes: ["痰热壅肺证"],
        relatedConstitutions: ["痰湿质"],
        modifications: [
            { condition: "痰多难咯", modification: "加浙贝母、竹沥以清化痰热" },
            { condition: "便秘", modification: "加大黄以泻热通便" }
        ],
        contraindications: ["寒痰咳嗽者忌用"]
    },
    {
        id: "formula_099",
        name: "半夏白术天麻汤",
        pinyin: "Ban Xia Bai Zhu Tian Ma Tang",
        source: "《医学心悟》",
        category: "祛痰剂",
        subcategory: "息风化痰剂",
        composition: [
            { herbName: "半夏", dosage: "9g", role: "君药" },
            { herbName: "天麻", dosage: "6g", role: "臣药" },
            { herbName: "茯苓", dosage: "6g", role: "佐药" },
            { herbName: "橘红", dosage: "6g", role: "佐药" },
            { herbName: "白术", dosage: "9g", role: "佐药" },
            { herbName: "甘草", dosage: "3g", role: "使药" },
            { herbName: "生姜", dosage: "3片", role: "使药" },
            { herbName: "大枣", dosage: "2枚", role: "使药" }
        ],
        functions: ["化痰息风", "健脾祛湿"],
        indications: ["风痰上扰证", "眩晕头痛", "胸膈痞闷", "恶心呕吐", "舌苔白腻", "脉弦滑"],
        analysis: "本方为治风痰眩晕之代表方。方中半夏为君，燥湿化痰、降逆止呕。天麻为臣，平肝息风而止眩晕，为治风痰眩晕之要药。白术、茯苓健脾祛湿，以杜生痰之源；橘红理气化痰；甘草和中；生姜、大枣调和脾胃。诸药合用，化痰息风、健脾祛湿，痰消风息则眩晕自止。",
        keyPoints: ["眩晕头痛", "恶心呕吐", "苔白腻", "脉弦滑"],
        relatedSyndromes: ["风痰上扰证"],
        relatedConstitutions: ["痰湿质"],
        modifications: [
            { condition: "头痛明显", modification: "加蔓荆子、菊花以清利头目" },
            { condition: "呕吐较重", modification: "加旋覆花、代赭石以降逆止呕" }
        ],
        contraindications: ["阴虚阳亢眩晕者慎用"]
    },

    // 十七、消食剂扩充
    {
        id: "formula_100",
        name: "枳实导滞丸",
        pinyin: "Zhi Shi Dao Zhi Wan",
        source: "《内外伤辨惑论》",
        category: "消食剂",
        subcategory: "消食导滞剂",
        composition: [
            { herbName: "大黄", dosage: "9g", role: "君药" },
            { herbName: "枳实", dosage: "9g", role: "臣药" },
            { herbName: "神曲", dosage: "9g", role: "臣药" },
            { herbName: "茯苓", dosage: "9g", role: "佐药" },
            { herbName: "黄芩", dosage: "6g", role: "佐药" },
            { herbName: "黄连", dosage: "6g", role: "佐药" },
            { herbName: "白术", dosage: "9g", role: "佐药" },
            { herbName: "泽泻", dosage: "6g", role: "佐药" }
        ],
        functions: ["消食导滞", "清热祛湿"],
        indications: ["湿热食积证", "脘腹胀痛", "下痢泄泻", "或大便秘结", "小便短赤", "舌苔黄腻", "脉沉有力"],
        analysis: "本方为治湿热食积之代表方。方中大黄为君，攻积泻热，使积滞从大便而去。枳实为臣，行气消痞，与大黄相配攻下之力更强；神曲消食和胃。黄芩、黄连清热燥湿；茯苓、泽泻利水渗湿，使湿热从小便而去；白术健脾和中，使攻积而不伤正。全方消导与清利并用，积去热清则胀痛、泻痢自愈。",
        keyPoints: ["脘腹胀痛", "下痢或便秘", "舌苔黄腻"],
        relatedSyndromes: ["湿热食积证"],
        relatedConstitutions: ["痰湿质"],
        modifications: [
            { condition: "食积较重", modification: "加山楂、莱菔子以消食化积" },
            { condition: "腹痛明显", modification: "加木香、槟榔以行气止痛" }
        ],
        contraindications: ["脾虚无积滞者禁用"]
    },

    // ============================================================================
    // 扩充批（2026-08 第二轮）— 新增5首（formula_101 ~ formula_105），补齐证候库引用所需
    // ============================================================================

    // 一、解表剂补（止嗽散）
    {
        id: "formula_101",
        name: "止嗽散",
        pinyin: "Zhi Sou San",
        source: "《医学心悟》",
        category: "解表剂",
        subcategory: "辛温解表剂",
        composition: [
            { herbName: "桔梗", dosage: "9g", role: "君药" },
            { herbName: "荆芥", dosage: "9g", role: "臣药" },
            { herbName: "紫菀", dosage: "9g", role: "臣药" },
            { herbName: "百部", dosage: "9g", role: "臣药" },
            { herbName: "白前", dosage: "9g", role: "佐药" },
            { herbName: "甘草", dosage: "3g", role: "佐药" },
            { herbName: "陈皮", dosage: "6g", role: "佐药" }
        ],
        functions: ["宣利肺气", "疏风止咳"],
        indications: ["风邪犯肺证", "咳嗽咽痒", "咯痰不爽", "或微恶风发热", "舌苔薄白", "脉浮缓"],
        analysis: "本方为治风邪犯肺咳嗽之常用方。方中桔梗为君，宣肺祛痰利咽。荆芥疏风解表、宣透肺邪；紫菀、百部润肺止咳，温润而不燥，为臣药。白前降气祛痰，与桔梗一宣一降，复肺气之宣降；陈皮理气化痰；甘草调和诸药，共为佐药。全方温润平和、不寒不热，宣利肺气、疏风止咳，为治新久咳嗽之平剂。",
        keyPoints: ["咳嗽咽痒", "咯痰不爽", "苔薄白"],
        relatedSyndromes: ["风邪犯肺证"],
        relatedConstitutions: ["平和质"],
        modifications: [
            { condition: "风寒初起头痛鼻塞", modification: "加防风、紫苏叶以疏风散寒" },
            { condition: "痰多", modification: "加半夏、茯苓以化痰" }
        ],
        contraindications: ["阴虚劳嗽者慎用"]
    },

    // 三、和解剂补（柴胡疏肝散）
    {
        id: "formula_102",
        name: "柴胡疏肝散",
        pinyin: "Chai Hu Shu Gan San",
        source: "《景岳全书》",
        category: "和解剂",
        subcategory: "调和肝脾剂",
        composition: [
            { herbName: "柴胡", dosage: "6g", role: "君药" },
            { herbName: "陈皮", dosage: "6g", role: "臣药" },
            { herbName: "川芎", dosage: "4.5g", role: "臣药" },
            { herbName: "香附", dosage: "4.5g", role: "臣药" },
            { herbName: "枳壳", dosage: "4.5g", role: "佐药" },
            { herbName: "芍药", dosage: "4.5g", role: "佐药" },
            { herbName: "炙甘草", dosage: "1.5g", role: "使药" }
        ],
        functions: ["疏肝理气", "活血止痛"],
        indications: ["肝气郁滞证", "胁肋疼痛", "胸闷喜太息", "情志抑郁易怒", "嗳气", "脘腹胀满", "脉弦"],
        analysis: "本方为疏肝解郁之代表方。方中柴胡为君，疏肝解郁、条达气机。香附理气疏肝、川芎行气活血止痛，共为臣药，助柴胡疏肝而兼活血。陈皮理气和胃、枳壳行气宽中，与柴胡相配升降相因；芍药养血柔肝、缓急止痛，与柴胡相配一散一收，疏肝而不伤阴；炙甘草调和诸药为使。全方疏肝理气、活血止痛，气行血畅则胁痛自除。",
        keyPoints: ["胁肋疼痛", "情志抑郁", "胸闷太息", "脉弦"],
        relatedSyndromes: ["肝气郁滞证"],
        relatedConstitutions: ["平和质"],
        modifications: [
            { condition: "胁痛较甚", modification: "加郁金、延胡索以活血止痛" },
            { condition: "嗳气吞酸", modification: "加左金丸以和胃降逆" }
        ],
        contraindications: ["阴虚血燥者慎用"]
    },

    // 四、清热剂补（左金丸）
    {
        id: "formula_103",
        name: "左金丸",
        pinyin: "Zuo Jin Wan",
        source: "《丹溪心法》",
        category: "清热剂",
        subcategory: "清脏腑热剂",
        composition: [
            { herbName: "黄连", dosage: "6g", role: "君药" },
            { herbName: "吴茱萸", dosage: "1g", role: "佐药" }
        ],
        functions: ["清泻肝火", "降逆止呕"],
        indications: ["肝火犯胃证", "胁肋疼痛", "嘈杂吞酸", "呕吐口苦", "舌红苔黄", "脉弦数"],
        analysis: "本方为治肝火犯胃之代表方。方中重用黄连为君，苦寒清泻肝火，肝火得清则自不横逆犯胃；黄连亦善清胃热、燥湿。少佐吴茱萸为佐，辛热开郁降逆、下气止呕，与黄连相配一寒一热、辛开苦降，共奏清泻肝火、降逆止呕之功。二药合用，肝胃同治，火降呕止，为「反佐」配伍之典范。",
        keyPoints: ["胁痛", "嘈杂吞酸", "呕吐口苦", "舌红苔黄"],
        relatedSyndromes: ["肝火犯胃证"],
        relatedConstitutions: ["平和质"],
        modifications: [
            { condition: "吞酸较重", modification: "加煅瓦楞子、乌贼骨以制酸" },
            { condition: "胃热明显", modification: "加栀子、蒲公英以清热" }
        ],
        contraindications: ["脾胃虚寒者忌用"]
    },

    // 七、补益剂补（左归丸/右归丸）
    {
        id: "formula_104",
        name: "左归丸",
        pinyin: "Zuo Gui Wan",
        source: "《景岳全书》",
        category: "补益剂",
        subcategory: "补阴剂",
        composition: [
            { herbName: "熟地黄", dosage: "24g", role: "君药" },
            { herbName: "山药", dosage: "12g", role: "臣药" },
            { herbName: "枸杞子", dosage: "12g", role: "臣药" },
            { herbName: "山茱萸", dosage: "12g", role: "臣药" },
            { herbName: "川牛膝", dosage: "9g", role: "佐药" },
            { herbName: "菟丝子", dosage: "12g", role: "臣药" },
            { herbName: "鹿角胶", dosage: "12g", role: "佐药" },
            { herbName: "龟板胶", dosage: "12g", role: "佐药" }
        ],
        functions: ["滋阴补肾", "填精益髓"],
        indications: ["真阴不足证", "头晕目眩", "腰酸腿软", "遗精滑泄", "自汗盗汗", "口燥舌干", "舌红少苔", "脉细"],
        analysis: "本方为纯甘壮水之剂。方中重用熟地黄为君，滋肾填精、大补真阴。山药补脾固精、枸杞子滋补肝肾、山茱萸涩精敛汗，共为臣药，助君药滋阴填精。菟丝子补阳益阴、固精缩尿，鹿角胶温肾填精，龟板胶滋阴潜阳，三药合用以阳中求阴、补髓填精；川牛膝补肝肾、强腰膝，引药下行，共为佐药。全方峻补真阴、填精益髓，为治真阴不足之要方。",
        keyPoints: ["头晕目眩", "腰酸腿软", "遗精", "舌红少苔"],
        relatedSyndromes: ["真阴不足证"],
        relatedConstitutions: ["阴虚质"],
        modifications: [
            { condition: "虚热明显", modification: "加地骨皮、知母以退虚热" },
            { condition: "遗精较甚", modification: "加金樱子、芡实以涩精止遗" }
        ],
        contraindications: ["脾虚便溏者慎用"]
    },
    {
        id: "formula_105",
        name: "右归丸",
        pinyin: "You Gui Wan",
        source: "《景岳全书》",
        category: "补益剂",
        subcategory: "补阳剂",
        composition: [
            { herbName: "熟地黄", dosage: "24g", role: "君药" },
            { herbName: "附子", dosage: "6g", role: "臣药" },
            { herbName: "肉桂", dosage: "6g", role: "臣药" },
            { herbName: "山药", dosage: "12g", role: "臣药" },
            { herbName: "山茱萸", dosage: "9g", role: "臣药" },
            { herbName: "枸杞子", dosage: "9g", role: "臣药" },
            { herbName: "菟丝子", dosage: "12g", role: "臣药" },
            { herbName: "鹿角胶", dosage: "12g", role: "臣药" },
            { herbName: "杜仲", dosage: "12g", role: "佐药" },
            { herbName: "当归", dosage: "9g", role: "佐药" }
        ],
        functions: ["温补肾阳", "填精益髓"],
        indications: ["肾阳不足命门火衰证", "畏寒肢冷", "腰膝软弱", "阳痿遗精", "大便不实", "小便自遗", "舌淡苔白", "脉沉而迟"],
        analysis: "本方为温补肾阳、填精益髓之剂。方中重用熟地黄为君，滋阴填精，为「阴中求阳」奠定物质基础。附子、肉桂温补肾阳、峻补命门之火为臣。山药、山茱萸、枸杞子、菟丝子、鹿角胶补肾固精、助阳填髓，杜仲补肝肾强腰膝，共为臣佐；当归养血和血，使补而不滞为佐。全方温阳与填精并用，命门火旺、肾精充足，则诸虚寒之症自愈。",
        keyPoints: ["畏寒肢冷", "腰膝软弱", "阳痿遗精", "舌淡苔白"],
        relatedSyndromes: ["肾阳不足命门火衰证"],
        relatedConstitutions: ["阳虚质"],
        modifications: [
            { condition: "气虚明显", modification: "加人参、黄芪以益气" },
            { condition: "大便不实", modification: "加肉豆蔻、五味子以涩肠止泻" }
        ],
        contraindications: ["阴虚火旺者忌用"]
    }
];

// ============================================================================
// 第二部分：方剂分类索引
// ============================================================================

const formulaCategories = {
    "解表剂": {
        "辛温解表剂": [
            "formula_001",  // 麻黄汤
            "formula_002",  // 桂枝汤
            "formula_003",  // 小青龙汤
            "formula_004",  // 九味羌活汤
            "formula_101"   // 止嗽散
        ],
        "辛凉解表剂": [
            "formula_005",  // 银翘散
            "formula_006",  // 桑菊饮
            "formula_007"   // 麻黄杏仁甘草石膏汤
        ]
    },
    "泻下剂": {
        "寒下剂": [
            "formula_008",  // 大承气汤
            "formula_009"   // 大黄牡丹汤
        ],
        "温下剂": [
            "formula_010"   // 温脾汤
        ],
        "润下剂": [
            "formula_011"   // 麻子仁丸
        ]
    },
    "和解剂": {
        "和解少阳剂": [
            "formula_012",  // 小柴胡汤
            "formula_013",  // 蒿芩清胆汤
            "formula_069"   // 大柴胡汤
        ],
        "调和肝脾剂": [
            "formula_014",  // 逍遥散
            "formula_015",  // 痛泻要方
            "formula_070",  // 四逆散
            "formula_102"   // 柴胡疏肝散
        ],
        "调和肠胃剂": [
            "formula_016"   // 半夏泻心汤
        ]
    },
    "清热剂": {
        "清气分热剂": [
            "formula_017",  // 白虎汤
            "formula_018"   // 竹叶石膏汤
        ],
        "清营凉血剂": [
            "formula_019",  // 清营汤
            "formula_020"   // 犀角地黄汤
        ],
        "清热解毒剂": [
            "formula_021",  // 黄连解毒汤
            "formula_022",  // 普济消毒饮
            "formula_074",  // 白头翁汤
            "formula_075"   // 芍药汤
        ],
        "清脏腑热剂": [
            "formula_023",  // 龙胆泻肝汤
            "formula_071",  // 导赤散
            "formula_072",  // 清胃散
            "formula_073",  // 玉女煎
            "formula_103"   // 左金丸
        ],
        "清虚热剂": [
            "formula_024"   // 青蒿鳖甲汤
        ]
    },
    "温里剂": {
        "温中祛寒剂": [
            "formula_025",  // 理中丸
            "formula_026",  // 小建中汤
            "formula_076"   // 吴茱萸汤
        ],
        "回阳救逆剂": [
            "formula_027"   // 四逆汤
        ],
        "温经散寒剂": [
            "formula_028"   // 当归四逆汤
        ]
    },
    "补益剂": {
        "补气剂": [
            "formula_029",  // 四君子汤
            "formula_030",  // 补中益气汤
            "formula_077",  // 参苓白术散
            "formula_079"   // 生脉散
        ],
        "补血剂": [
            "formula_031",  // 四物汤
            "formula_032",  // 当归补血汤
            "formula_078",  // 归脾汤
            "formula_080"   // 炙甘草汤
        ],
        "气血双补剂": [
            "formula_033"   // 八珍汤
        ],
        "补阴剂": [
            "formula_034",  // 六味地黄丸
            "formula_087",  // 麦门冬汤（兼滋养肺胃之阴）
            "formula_104"   // 左归丸
        ],
        "补阳剂": [
            "formula_035",  // 肾气丸
            "formula_105"   // 右归丸
        ],
        "阴阳双补剂": [
            "formula_036"   // 地黄饮子
        ]
    },
    "固涩剂": {
        "固表止汗剂": [
            "formula_037"   // 玉屏风散
        ],
        "涩肠止泻剂": [
            "formula_038"   // 四神丸
        ],
        "固精止遗剂": [
            "formula_039"   // 金锁固精丸
        ]
    },
    "安神剂": {
        "重镇安神剂": [
            "formula_040"   // 朱砂安神丸
        ],
        "滋养安神剂": [
            "formula_041",  // 酸枣仁汤
            "formula_042"   // 天王补心丹
        ]
    },
    "开窍剂": {
        "凉开剂": [
            "formula_043",  // 安宫牛黄丸
            "formula_044"   // 紫雪
        ],
        "温开剂": [
            "formula_045"   // 苏合香丸
        ]
    },
    "理气剂": {
        "行气剂": [
            "formula_046",  // 越鞠丸
            "formula_047",  // 半夏厚朴汤
            "formula_081"   // 瓜蒌薤白白酒汤
        ],
        "降气剂": [
            "formula_048",  // 苏子降气汤
            "formula_049"   // 定喘汤
        ]
    },
    "理血剂": {
        "活血化瘀剂": [
            "formula_050",  // 血府逐瘀汤
            "formula_051",  // 补阳还五汤
            "formula_052",  // 生化汤
            "formula_082",  // 桂枝茯苓丸
            "formula_083"   // 温经汤
        ],
        "止血剂": [
            "formula_053",  // 十灰散
            "formula_054",  // 小蓟饮子
            "formula_084"   // 黄土汤
        ]
    },
    "治风剂": {
        "疏散外风剂": [
            "formula_055",  // 川芎茶调散
            "formula_056"   // 消风散
        ],
        "平息内风剂": [
            "formula_057",  // 羚角钩藤汤
            "formula_058",  // 镇肝熄风汤
            "formula_085",  // 天麻钩藤饮
            "formula_099"   // 半夏白术天麻汤（兼息风化痰）
        ]
    },
    "治燥剂": {
        "轻宣外燥剂": [
            "formula_059",  // 杏苏散
            "formula_060",  // 清燥救肺汤
            "formula_086"   // 桑杏汤
        ],
        "滋润内燥剂": [
            "formula_061",  // 增液汤
            "formula_087",  // 麦门冬汤
            "formula_088",  // 养阴清肺汤
            "formula_089"   // 百合固金汤
        ]
    },
    "祛湿剂": {
        "和胃化湿剂": [
            "formula_062",  // 藿香正气散
            "formula_090"   // 平胃散
        ],
        "清热祛湿剂": [
            "formula_063",  // 茵陈蒿汤
            "formula_091",  // 三仁汤
            "formula_092",  // 八正散
            "formula_093",  // 二妙散
            "formula_094"   // 甘露消毒丹
        ],
        "利水渗湿剂": [
            "formula_064"   // 五苓散
        ],
        "温化寒湿剂": [
            "formula_065",  // 苓桂术甘汤
            "formula_095"   // 真武汤
        ],
        "祛风胜湿剂": [
            "formula_096"   // 独活寄生汤
        ]
    },
    "祛痰剂": {
        "燥湿化痰剂": [
            "formula_066"   // 二陈汤
        ],
        "清热化痰剂": [
            "formula_049",  // 定喘汤（兼清热化痰）
            "formula_023",  // 龙胆泻肝汤（清肝泻火兼化痰，贝母等化裁）
            "formula_097",  // 温胆汤
            "formula_098"   // 清气化痰丸
        ],
        "润燥化痰剂": [
            "formula_060"   // 清燥救肺汤（兼润燥化痰）
        ],
        "温化寒痰剂": [
            "formula_003"   // 小青龙汤（兼温化寒痰）
        ],
        "息风化痰剂": [
            "formula_057",  // 羚角钩藤汤（兼息风化痰）
            "formula_099"   // 半夏白术天麻汤
        ]
    },
    "消食剂": {
        "消食导滞剂": [
            "formula_067",  // 保和丸
            "formula_046",  // 越鞠丸（兼消食）
            "formula_100"   // 枳实导滞丸
        ],
        "健脾消食剂": [
            "formula_015",  // 痛泻要方（加味用）
            "formula_029"   // 四君子汤（健脾基础，加神曲山楂以消食）
        ]
    },
    "驱虫剂": {
        "安蛔止痛剂": [
            "formula_068"   // 乌梅丸
        ]
    }
};

// 浏览器全局导出（兼容 script 标签加载）
if (typeof window !== 'undefined') {
    window.formulasDatabase = formulasDatabase;
    window.formulaCategories = formulaCategories;
}

// Node 导出（供数据校验脚本使用）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { formulasDatabase, formulaCategories };
}

