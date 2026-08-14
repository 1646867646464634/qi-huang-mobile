/**
 * 中医体质辨识题库 - 岐黄·辅助诊疗系统
 * 依据：中华中医药学会《中医体质分类与判定》标准（ZYYXH/T157-2009）
 * 9种体质：平和质、气虚质、阳虚质、阴虚质、痰湿质、湿热质、血瘀质、气郁质、特禀质
 * 每种体质7题，共63题
 */

const constitutionQuestions = [
    // ==================== 平和质 (7题) ====================
    // isReversed: true — 高分表示健康状况好；问题描述为负面症状，原始分值(1-5)在计分时翻转(6-value)
    {
        id: 1,
        text: "您感到精力不够充沛吗？",
        constitution: "平和质",
        isReversed: true,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },
    {
        id: 2,
        text: "您感到心情不够舒畅愉快吗？",
        constitution: "平和质",
        isReversed: true,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },
    {
        id: 3,
        text: "您的面色显得不够红润有光泽吗？",
        constitution: "平和质",
        isReversed: true,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },
    {
        id: 4,
        text: "您的食欲不够正常吗？",
        constitution: "平和质",
        isReversed: true,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },
    {
        id: 5,
        text: "您睡眠不够安稳踏实吗？",
        constitution: "平和质",
        isReversed: true,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },
    {
        id: 6,
        text: "您对季节和环境的适应能力不够强吗？",
        constitution: "平和质",
        isReversed: true,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },
    {
        id: 7,
        text: "您的目光不够有神吗？",
        constitution: "平和质",
        isReversed: true,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },

    // ==================== 气虚质 (7题) ====================
    {
        id: 8,
        text: "您容易疲乏吗？",
        constitution: "气虚质",
        isReversed: false,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },
    {
        id: 9,
        text: "您容易气短（呼吸短促、接不上气）吗？",
        constitution: "气虚质",
        isReversed: false,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },
    {
        id: 10,
        text: "您容易心慌吗？",
        constitution: "气虚质",
        isReversed: false,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },
    {
        id: 11,
        text: "您容易头晕或站起时晕眩吗？",
        constitution: "气虚质",
        isReversed: false,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },
    {
        id: 12,
        text: "您稍微活动就容易出虚汗吗？",
        constitution: "气虚质",
        isReversed: false,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },
    {
        id: 13,
        text: "您喜欢安静、懒得说话吗？",
        constitution: "气虚质",
        isReversed: false,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },
    {
        id: 14,
        text: "您说话声音低弱无力吗？",
        constitution: "气虚质",
        isReversed: false,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },

    // ==================== 阳虚质 (7题) ====================
    {
        id: 15,
        text: "您手脚发凉吗？",
        constitution: "阳虚质",
        isReversed: false,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },
    {
        id: 16,
        text: "您胃脘部、背部或腰膝部怕冷吗？",
        constitution: "阳虚质",
        isReversed: false,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },
    {
        id: 17,
        text: "您感到怕冷、衣服比别人穿得多吗？",
        constitution: "阳虚质",
        isReversed: false,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },
    {
        id: 18,
        text: "您比一般人耐受不了寒冷吗？",
        constitution: "阳虚质",
        isReversed: false,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },
    {
        id: 19,
        text: "您吃（喝）凉的东西会感到不舒服或者怕吃（喝）凉的东西吗？",
        constitution: "阳虚质",
        isReversed: false,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },
    {
        id: 20,
        text: "您受凉或吃（喝）凉的东西后容易拉肚子吗？",
        constitution: "阳虚质",
        isReversed: false,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },
    {
        id: 21,
        text: "您比别人容易患感冒吗？",
        constitution: "阳虚质",
        isReversed: false,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },

    // ==================== 阴虚质 (7题) ====================
    {
        id: 22,
        text: "您感到手脚心发热吗？",
        constitution: "阴虚质",
        isReversed: false,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },
    {
        id: 23,
        text: "您感觉身体、脸上发热吗？",
        constitution: "阴虚质",
        isReversed: false,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },
    {
        id: 24,
        text: "您皮肤或口唇干吗？",
        constitution: "阴虚质",
        isReversed: false,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },
    {
        id: 25,
        text: "您口唇的颜色比一般人红吗？",
        constitution: "阴虚质",
        isReversed: false,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },
    {
        id: 26,
        text: "您容易便秘或大便干燥吗？",
        constitution: "阴虚质",
        isReversed: false,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },
    {
        id: 27,
        text: "您面部两颧潮红或偏红吗？",
        constitution: "阴虚质",
        isReversed: false,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },
    {
        id: 28,
        text: "您感到眼睛干涩吗？",
        constitution: "阴虚质",
        isReversed: false,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },

    // ==================== 痰湿质 (7题) ====================
    {
        id: 29,
        text: "您感到胸闷或腹部胀满吗？",
        constitution: "痰湿质",
        isReversed: false,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },
    {
        id: 30,
        text: "您感觉身体沉重不轻松或不爽快吗？",
        constitution: "痰湿质",
        isReversed: false,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },
    {
        id: 31,
        text: "您腹部肥大吗？",
        constitution: "痰湿质",
        isReversed: false,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },
    {
        id: 32,
        text: "您额头部位油脂分泌多吗？",
        constitution: "痰湿质",
        isReversed: false,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },
    {
        id: 33,
        text: "您上眼睑比别人肿（上眼睑有轻微隆起的现象）吗？",
        constitution: "痰湿质",
        isReversed: false,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },
    {
        id: 34,
        text: "您嘴里有黏黏的感觉吗？",
        constitution: "痰湿质",
        isReversed: false,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },
    {
        id: 35,
        text: "您平时痰多，特别是咽喉部总感到有痰堵着吗？",
        constitution: "痰湿质",
        isReversed: false,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },

    // ==================== 湿热质 (7题) ====================
    {
        id: 36,
        text: "您面部或鼻部有油腻感或者油亮发光吗？",
        constitution: "湿热质",
        isReversed: false,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },
    {
        id: 37,
        text: "您容易生痤疮或疮疖吗？",
        constitution: "湿热质",
        isReversed: false,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },
    {
        id: 38,
        text: "您感到口苦或嘴里有异味吗？",
        constitution: "湿热质",
        isReversed: false,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },
    {
        id: 39,
        text: "您大便黏滞不爽、有解不尽的感觉吗？",
        constitution: "湿热质",
        isReversed: false,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },
    {
        id: 40,
        text: "您小便时尿道有发热感、尿色浓（深）吗？",
        constitution: "湿热质",
        isReversed: false,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },
    {
        id: 41,
        text: "您有带下色黄（女性）或阴囊潮湿（男性）的情况吗？",
        constitution: "湿热质",
        isReversed: false,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },
    {
        id: 42,
        text: "您皮肤容易起湿疹吗？",
        constitution: "湿热质",
        isReversed: false,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },

    // ==================== 血瘀质 (7题) ====================
    {
        id: 43,
        text: "您的皮肤在不知不觉中会出现青紫瘀斑（皮下出血）吗？",
        constitution: "血瘀质",
        isReversed: false,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },
    {
        id: 44,
        text: "您两颧部有细微红丝（毛细血管扩张）吗？",
        constitution: "血瘀质",
        isReversed: false,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },
    {
        id: 45,
        text: "您身体上有哪里疼痛吗？",
        constitution: "血瘀质",
        isReversed: false,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },
    {
        id: 46,
        text: "您面色晦暗或容易出现褐斑吗？",
        constitution: "血瘀质",
        isReversed: false,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },
    {
        id: 47,
        text: "您容易有黑眼圈吗？",
        constitution: "血瘀质",
        isReversed: false,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },
    {
        id: 48,
        text: "您容易忘事（健忘）吗？",
        constitution: "血瘀质",
        isReversed: false,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },
    {
        id: 49,
        text: "您口唇颜色偏暗吗？",
        constitution: "血瘀质",
        isReversed: false,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },

    // ==================== 气郁质 (7题) ====================
    {
        id: 50,
        text: "您感到闷闷不乐、情绪低沉吗？",
        constitution: "气郁质",
        isReversed: false,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },
    {
        id: 51,
        text: "您容易精神紧张、焦虑不安吗？",
        constitution: "气郁质",
        isReversed: false,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },
    {
        id: 52,
        text: "您多愁善感、感情脆弱吗？",
        constitution: "气郁质",
        isReversed: false,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },
    {
        id: 53,
        text: "您容易感到害怕或受到惊吓吗？",
        constitution: "气郁质",
        isReversed: false,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },
    {
        id: 54,
        text: "您胁肋部或乳房胀痛吗？",
        constitution: "气郁质",
        isReversed: false,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },
    {
        id: 55,
        text: "您无缘无故叹气吗？",
        constitution: "气郁质",
        isReversed: false,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },
    {
        id: 56,
        text: "您咽喉部有异物感，且吐之不出、咽之不下吗？",
        constitution: "气郁质",
        isReversed: false,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },

    // ==================== 特禀质 (7题) ====================
    {
        id: 57,
        text: "您没有感冒时也会打喷嚏吗？",
        constitution: "特禀质",
        isReversed: false,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },
    {
        id: 58,
        text: "您没有感冒时也会鼻塞、流鼻涕吗？",
        constitution: "特禀质",
        isReversed: false,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },
    {
        id: 59,
        text: "您有因季节变化、温度变化或异味等原因而咳喘的现象吗？",
        constitution: "特禀质",
        isReversed: false,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },
    {
        id: 60,
        text: "您容易过敏（对药物、食物、气味、花粉或在季节交替、气候变化时）吗？",
        constitution: "特禀质",
        isReversed: false,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },
    {
        id: 61,
        text: "您的皮肤容易起荨麻疹（风团、风疙瘩、风疹块）吗？",
        constitution: "特禀质",
        isReversed: false,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },
    {
        id: 62,
        text: "您的皮肤因过敏出现过紫癜（紫红色瘀点、瘀斑）吗？",
        constitution: "特禀质",
        isReversed: false,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    },
    {
        id: 63,
        text: "您的皮肤一抓就红，并出现明显抓痕吗？",
        constitution: "特禀质",
        isReversed: false,
        options: [
            { value: 1, label: "没有" },
            { value: 2, label: "很少" },
            { value: 3, label: "有时" },
            { value: 4, label: "经常" },
            { value: 5, label: "总是" }
        ]
    }
];

/**
 * 体质元数据
 * 包含每种体质的详细描述、特征表现、调理建议、相关方剂、相关药材、饮食建议和生活建议
 */
const constitutionMeta = {
    "平和质": {
        description: "平和质是阴阳气血调和、体态适中、面色润泽、精力充沛的体质状态。先天禀赋良好，后天调养得当，是九种体质中最健康的类型。",
        features: [
            "体形匀称健壮",
            "面色、肤色润泽，头发稠密有光泽",
            "目光有神，鼻色明润，嗅觉通利",
            "唇色红润，精力充沛，不易疲劳",
            "耐受寒热，睡眠良好",
            "胃纳佳，二便正常",
            "舌色淡红，苔薄白，脉和有神"
        ],
        recommendations: [
            "饮食有节，起居有常，不妄作劳",
            "坚持规律运动，保持心态平和",
            "顺应四时，春夏养阳，秋冬养阴",
            "定期体检，防患未然"
        ],
        relatedFormulas: ["八珍汤", "归脾汤", "薯蓣丸"],
        relatedHerbs: ["黄芪", "党参", "当归", "白芍", "茯苓", "白术"],
        dietAdvice: "饮食宜清淡，荤素搭配合理。宜食五谷杂粮、蔬菜瓜果，少食油腻及辛辣之物。不宜过饱过饥，注意饮食有节。",
        lifestyleAdvice: "保持规律作息，每日保证7-8小时睡眠。适度运动，如散步、太极拳、八段锦，每周3-5次，每次30分钟左右。保持乐观开朗的心态，培养兴趣爱好。"
    },
    "气虚质": {
        description: "气虚质是由于元气不足，以气息低弱、脏腑功能状态低下为主要特征的一种体质状态。表现为机体运转动力不足，常感疲乏无力。",
        features: [
            "肌肉松软不实",
            "平素语音低弱，气短懒言",
            "精神不振，容易疲乏",
            "易出汗，动则尤甚",
            "舌淡红，舌边有齿痕，脉弱",
            "面色萎黄或晄白",
            "食欲不振，腹胀便溏"
        ],
        recommendations: [
            "培补元气，补气健脾",
            "宜食益气健脾的食物",
            "避免过度劳累和熬夜",
            "适当运动，循序渐进，不可过汗"
        ],
        relatedFormulas: ["四君子汤", "补中益气汤", "玉屏风散", "参苓白术散"],
        relatedHerbs: ["黄芪", "人参", "党参", "白术", "甘草", "红枣", "山药"],
        dietAdvice: "多食益气健脾食物，如小米、山药、土豆、香菇、鸡肉、牛肉、鸡蛋、红枣、桂圆等。少食耗气食物，如萝卜、空心菜、槟榔等。",
        lifestyleAdvice: "避免过度劳累和剧烈运动，可选择太极拳、八段锦、散步等温和运动。注意保暖，避免受风。按摩足三里、气海、关元等穴位。保持充足睡眠，避免熬夜。"
    },
    "阳虚质": {
        description: "阳虚质是由于阳气不足，以虚寒现象为主要特征的体质状态。表现为机体产热不足，失于温煦，以畏寒怕冷、手足不温等虚寒象为主要特征。",
        features: [
            "形体白胖，肌肉松软",
            "平素畏冷，手足不温",
            "喜热饮食，精神不振",
            "面色柔白，目胞晦暗",
            "口唇色淡，毛发易落",
            "大便溏薄，小便清长",
            "舌淡胖嫩，脉沉迟"
        ],
        recommendations: [
            "温阳益气，补肾温阳",
            "宜食温阳益气的食物",
            "注意保暖，避免受寒",
            "多晒太阳，适当运动"
        ],
        relatedFormulas: ["金匮肾气丸", "右归丸", "附子理中丸", "四逆汤"],
        relatedHerbs: ["肉桂", "附子", "干姜", "杜仲", "巴戟天", "肉苁蓉", "鹿茸"],
        dietAdvice: "多食温阳食物，如羊肉、牛肉、韭菜、生姜、桂圆、核桃、板栗等。少食生冷寒凉食物，如西瓜、梨、苦瓜、冷饮、冰镇食品等。",
        lifestyleAdvice: "注意保暖，尤其腰腹部和足部。多晒太阳，尤其后背（督脉）。适当运动如快走、慢跑，以微微出汗为度。艾灸关元、命门、足三里。秋冬季节可热水泡脚。"
    },
    "阴虚质": {
        description: "阴虚质是由于体内津液精血等阴液亏少，以阴虚内热为主要特征的体质状态。表现为滋润不足、干燥生热，以口燥咽干、手足心热等虚热象为主要特征。",
        features: [
            "体形偏瘦",
            "手足心热，口燥咽干",
            "鼻微干，喜冷饮",
            "大便干燥，小便短涩",
            "面色潮红，有烘热感",
            "目干涩，视物昏花",
            "舌红少津，脉细数"
        ],
        recommendations: [
            "滋补肾阴，壮水制火",
            "宜食甘凉滋润的食物",
            "避免熬夜和过度劳累",
            "节制房事，保存阴精"
        ],
        relatedFormulas: ["六味地黄丸", "左归丸", "一贯煎", "大补阴丸"],
        relatedHerbs: ["熟地黄", "山茱萸", "枸杞子", "女贞子", "墨旱莲", "麦冬", "玉竹"],
        dietAdvice: "多食甘凉滋润食物，如鸭肉、猪肉、甲鱼、银耳、百合、梨、蜂蜜、黑芝麻等。少食辛辣燥热食物，如辣椒、花椒、羊肉、韭菜等。",
        lifestyleAdvice: "避免熬夜，保证充足睡眠。控制情绪，避免急躁发怒。避免剧烈运动和高温环境，可选择游泳、瑜伽等。按摩太溪、三阴交、涌泉等穴位。保持居住环境湿润清凉。"
    },
    "痰湿质": {
        description: "痰湿质是由于水液内停而痰湿凝聚，以黏滞重浊为主要特征的体质状态。体内水液代谢失常，痰湿停聚，表现为体形肥胖、腹部肥满、胸闷痰多等。",
        features: [
            "体形肥胖，腹部肥满松软",
            "面部皮肤油脂较多",
            "多汗且黏，胸闷痰多",
            "口黏腻或甜，喜食肥甘厚味",
            "面色淡黄而暗，眼泡微浮",
            "容易困倦，身重不爽",
            "舌体胖大，舌苔白腻，脉滑"
        ],
        recommendations: [
            "健脾利湿，化痰泄浊",
            "宜食清淡、健脾利湿食物",
            "控制体重，加强运动",
            "避免潮湿环境"
        ],
        relatedFormulas: ["二陈汤", "温胆汤", "苓桂术甘汤", "平胃散"],
        relatedHerbs: ["茯苓", "陈皮", "半夏", "薏苡仁", "苍术", "泽泻", "荷叶"],
        dietAdvice: "饮食宜清淡，多食健脾利湿食物，如薏苡仁、赤小豆、冬瓜、山药、扁豆、白萝卜等。少食甜腻、油腻食物，控制食量，晚餐宜少。",
        lifestyleAdvice: "坚持规律运动，如快走、慢跑、游泳、球类运动，每次持续40分钟以上。避免久坐，定时起身活动。居住环境宜干燥通风，避免潮湿。可艾灸丰隆、阴陵泉、脾俞。"
    },
    "湿热质": {
        description: "湿热质是以湿热内蕴为主要特征的体质状态。湿热蕴结体内，熏蒸肌肤，表现为面垢油光、口苦口干、身重困倦等。",
        features: [
            "形体偏胖或苍瘦",
            "面垢油光，易生痤疮",
            "口苦口干，身重困倦",
            "大便黏滞不畅或燥结",
            "小便短黄，男性易阴囊潮湿",
            "女性易带下增多色黄",
            "舌质偏红，苔黄腻，脉滑数"
        ],
        recommendations: [
            "清热利湿，分消走泄",
            "宜食甘凉清热利湿食物",
            "忌辛辣燥烈和肥甘厚味",
            "避免暑湿环境和过度饮酒"
        ],
        relatedFormulas: ["龙胆泻肝汤", "茵陈蒿汤", "三仁汤", "甘露消毒丹"],
        relatedHerbs: ["茵陈", "栀子", "黄芩", "薏苡仁", "藿香", "佩兰", "黄连"],
        dietAdvice: "多食清热利湿食物，如绿豆、冬瓜、黄瓜、苦瓜、芹菜、莲藕、薏苡仁等。少食辛辣温热食物和油腻食物，忌饮酒和烧烤。",
        lifestyleAdvice: "避免居住在潮湿闷热环境，保持居室干燥通风。规律作息，避免熬夜和过度疲劳。适宜做强度较大的运动如跑步、球类，大量排汗有助于祛湿热。保持二便通畅。"
    },
    "血瘀质": {
        description: "血瘀质是指体内有血液运行不畅的潜在倾向或瘀血内阻的病理基础，以血瘀为主要特征的体质状态。表现为肤色晦暗、舌质紫暗、疼痛不移等。",
        features: [
            "肤色晦暗，色素沉着",
            "容易出现瘀斑或皮下出血",
            "口唇暗淡或紫暗",
            "皮肤干燥粗糙如鱼鳞",
            "身体某部疼痛固定不移",
            "女性多见痛经、闭经，经色紫黑有块",
            "舌质暗有瘀点，舌下络脉紫暗增粗，脉涩"
        ],
        recommendations: [
            "活血化瘀，行气通络",
            "宜食活血、行气的食物",
            "注意保暖，避免寒气侵袭",
            "保持心情舒畅，避免抑郁"
        ],
        relatedFormulas: ["桃红四物汤", "血府逐瘀汤", "桂枝茯苓丸", "复原活血汤"],
        relatedHerbs: ["桃仁", "红花", "丹参", "川芎", "三七", "当归", "赤芍"],
        dietAdvice: "多食活血化瘀食物，如山楂、醋、黑豆、香菇、茄子、油菜、洋葱、红糖、黄酒等。少食肥甘厚腻及寒凉食物。",
        lifestyleAdvice: "保持心情愉快，避免情绪抑郁。坚持适当的有氧运动，如快走、舞蹈、太极拳等，促进气血运行。注意保暖，避免寒邪。可按摩血海、三阴交、合谷。保持作息规律，避免受寒。"
    },
    "气郁质": {
        description: "气郁质是由于长期情志不畅、气机郁滞而形成的以性格内向不稳定、忧郁脆弱、敏感多疑为主要特征的体质状态。多与肝的疏泄功能失常有关。",
        features: [
            "形体瘦者为多",
            "神情抑郁，情感脆弱，烦闷不乐",
            "性格内向不稳定、敏感多虑",
            "胸胁胀满，或走窜疼痛",
            "善太息，或嗳气呃逆",
            "或咽间有异物感（梅核气）",
            "舌淡红，苔薄白，脉弦"
        ],
        recommendations: [
            "疏肝理气，开郁散结",
            "宜食行气解郁的食物",
            "多参加社交和集体活动",
            "培养豁达开朗的心态"
        ],
        relatedFormulas: ["逍遥散", "柴胡疏肝散", "半夏厚朴汤", "甘麦大枣汤"],
        relatedHerbs: ["柴胡", "香附", "郁金", "玫瑰花", "佛手", "合欢皮", "薄荷"],
        dietAdvice: "多食行气解郁食物，如小麦、荞麦、柑橘、玫瑰花、佛手、橙子、香菜、金橘等。睡前避免饮浓茶和咖啡。少饮酒。",
        lifestyleAdvice: "多参加集体活动和社交，培养兴趣爱好。聆听舒缓音乐，练习冥想和深呼吸。坚持运动如跑步、登山、球类，有助于疏解郁气。按摩太冲、行间、期门。保持规律作息，睡前可热水泡脚。"
    },
    "特禀质": {
        description: "特禀质是由于先天禀赋不足或遗传因素造成的一种特殊体质，包括过敏体质、先天性畸形或生理缺陷等。对外界环境适应能力差，容易发生过敏反应。",
        features: [
            "过敏体质者常见哮喘、风团、咽痒",
            "鼻塞、喷嚏、流清涕等",
            "有先天性、家族性特征",
            "常有遗传性疾病相关表现",
            "皮肤易出现紫癜、风团",
            "对药物、食物、气味、花粉等易过敏",
            "对外界环境适应能力差"
        ],
        recommendations: [
            "益气固表，养血消风",
            "避免接触过敏原",
            "增强体质，提高免疫力",
            "及时就医，对症调理"
        ],
        relatedFormulas: ["玉屏风散", "过敏煎", "消风散", "辛夷散"],
        relatedHerbs: ["黄芪", "防风", "白术", "蝉蜕", "乌梅", "五味子", "银柴胡"],
        dietAdvice: "饮食宜清淡均衡，粗细搭配，荤素配伍合理。多食益气固表食物，如黄芪炖鸡、红枣、山药等。避免食用已知致敏食物，忌食腥膻发物。",
        lifestyleAdvice: "保持居室清洁，勤换被褥，减少尘螨。春季花粉多时减少外出或戴口罩。适度锻炼增强体质，避免剧烈运动和过汗。注意气候变化，避风寒。可艾灸足三里、肺俞、大椎。保持乐观情绪。"
    }
};

/**
 * 体质评分规则
 *
 * 原始分计算（针对某一体质）：
 *   - 平和质 (isReversed: true)：effectiveValue = 6 - value
 *   - 偏颇质 (isReversed: false)：effectiveValue = value
 *   rawScore = Σ(effectiveValue) / count(questions)
 *
 * 转化分计算：
 *   convertedScore = (rawScore - 1) / 4 * 100
 *   取值范围：0～100分
 *
 * 判定标准：
 * ┌──────────┬──────────────────────────────────────────┐
 * │ 体质类型 │ 判定条件                                   │
 * ├──────────┼──────────────────────────────────────────┤
 * │ 平和质   │ convertedScore >= 60 且 其他8种均 < 30    │
 * │ 基本是   │ convertedScore >= 60 且 其他8种均 < 40    │
 * │ 否       │ 不满足以上条件                            │
 * ├──────────┼──────────────────────────────────────────┤
 * │ 偏颇体质 │ convertedScore >= 40 → 判定"是"           │
 * │ 倾向     │ 30 <= convertedScore <= 39 → 判定"倾向是" │
 * │ 否       │ convertedScore < 30 → 判定"否"            │
 * └──────────┴──────────────────────────────────────────┘
 */
const scoringRules = {
    /**
     * 计算原始分
     * @param {number[]} values - 某体质所有问题的原始选项值
     * @param {boolean} isReversed - 是否反向计分
     * @returns {number} 原始分（1-5之间）
     */
    calculateRawScore: function (values, isReversed) {
        const sum = values.reduce((acc, val) => {
            const effective = isReversed ? (6 - val) : val;
            return acc + effective;
        }, 0);
        return sum / values.length;
    },

    /**
     * 计算转化分
     * @param {number} rawScore - 原始分
     * @returns {number} 转化分（0-100）
     */
    calculateConvertedScore: function (rawScore) {
        return ((rawScore - 1) / 4) * 100;
    },

    /**
     * 平和质判定
     * @param {number} pingheConverted - 平和质转化分
     * @param {number[]} otherConverted - 其他8种偏颇质的转化分数组
     * @returns {'是'|'基本是'|'否'} 判定结果
     */
    judgePinghe: function (pingheConverted, otherConverted) {
        if (pingheConverted >= 60) {
            const allBelow40 = otherConverted.every(score => score < 40);
            const allBelow30 = otherConverted.every(score => score < 30);
            if (allBelow30) return "是";
            if (allBelow40) return "基本是";
        }
        return "否";
    },

    /**
     * 偏颇体质判定
     * @param {number} convertedScore - 转化分
     * @returns {'是'|'倾向是'|'否'} 判定结果
     */
    judgePianPo: function (convertedScore) {
        if (convertedScore >= 40) return "是";
        if (convertedScore >= 30) return "倾向是";
        return "否";
    },

    /**
     * 阈值常量
     */
    thresholds: {
        pingheMin: 60,
        pianpoYes: 40,
        pianpoTendency: 30,
        pingheOtherMaxForYes: 30,
        pingheOtherMaxForBasic: 40
    },

    /**
     * 评分计算公式说明
     */
    formulas: {
        rawScore: "原始分 = Σ调整后的选项值 / 题目数",
        effectiveValue: "调整后的选项值 = isReversed ? (6 - 选项值) : 选项值",
        convertedScore: "转化分 = (原始分 - 1) / 4 × 100",
        explanation: "转化分取值范围为0～100分，分数越高表示该体质倾向越明显"
    },

    /**
     * 各体质名称列表
     */
    constitutionNames: [
        "平和质",
        "气虚质",
        "阳虚质",
        "阴虚质",
        "痰湿质",
        "湿热质",
        "血瘀质",
        "气郁质",
        "特禀质"
    ],

    /**
     * 每题选项
     */
    answerOptions: [
        { value: 1, label: "没有", shortLabel: "从不" },
        { value: 2, label: "很少", shortLabel: "偶尔" },
        { value: 3, label: "有时", shortLabel: "有时" },
        { value: 4, label: "经常", shortLabel: "经常" },
        { value: 5, label: "总是", shortLabel: "总是" }
    ],

    /**
     * 完整评分流程
     * @param {Object} rawAnswers - { questionId: answerValue }
     * @returns {Object} 完整判定结果
     */
    evaluateAll: function (rawAnswers) {
        const constitutionScores = {};
        const constitutionJudgments = {};

        // 分组计算各体质得分
        const groupedQuestions = {};
        for (const q of constitutionQuestions) {
            if (!groupedQuestions[q.constitution]) {
                groupedQuestions[q.constitution] = [];
            }
            groupedQuestions[q.constitution].push(q);
        }

        for (const [name, questions] of Object.entries(groupedQuestions)) {
            const values = questions
                .map(q => rawAnswers[q.id])
                .filter(v => v !== undefined && v !== null);

            if (values.length === 0) {
                constitutionScores[name] = { rawScore: 0, convertedScore: 0 };
                continue;
            }

            const isReversed = questions[0].isReversed;
            const rawScore = this.calculateRawScore(values, isReversed);
            const convertedScore = this.calculateConvertedScore(rawScore);

            constitutionScores[name] = { rawScore, convertedScore };
        }

        // 判定平和质
        const pingheData = constitutionScores["平和质"];
        const otherScores = Object.entries(constitutionScores)
            .filter(([name]) => name !== "平和质")
            .map(([, data]) => data.convertedScore);

        constitutionJudgments["平和质"] = this.judgePinghe(
            pingheData.convertedScore,
            otherScores
        );

        // 判定各偏颇体质
        for (const name of this.constitutionNames) {
            if (name !== "平和质") {
                constitutionJudgments[name] = this.judgePianPo(
                    constitutionScores[name].convertedScore
                );
            }
        }

        return {
            scores: constitutionScores,
            judgments: constitutionJudgments,
            summary: this.generateSummary(constitutionJudgments)
        };
    },

    /**
     * 生成结果摘要
     * @param {Object} judgments - 判定结果
     * @returns {Object} 摘要信息
     */
    generateSummary: function (judgments) {
        const primary = [];
        const tendencies = [];
        const balanced = [];

        for (const [name, judgment] of Object.entries(judgments)) {
            if (judgment === "是") {
                primary.push(name);
            } else if (judgment === "基本是") {
                balanced.push(name);
            } else if (judgment === "倾向是") {
                tendencies.push(name);
            }
        }

        return {
            primaryType: primary.length > 0 ? primary[0] : (balanced.length > 0 ? "基本平和" : "待定"),
            allPrimary: primary,
            tendencies: tendencies,
            balanced: balanced,
            hasMixedConstitution: primary.length > 1
        };
    }
};

// 挂载到全局作用域（兼容浏览器 script 标签加载）
if (typeof window !== 'undefined') {
    window.constitutionQuestions = constitutionQuestions;
    window.constitutionMeta = constitutionMeta;
    window.scoringRules = scoringRules;
}
// Node 导出（供校验/测试脚本使用）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { constitutionQuestions, constitutionMeta, scoringRules };
}
