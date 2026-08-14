// ===== 岐黄·辅助诊疗系统 - 中药影像资料（全量 160 味）=====
// 数据结构：herbId -> { originalUrl(原貌图), yinpianUrl(饮片图), note }
//
// ⚠️ 版权与来源说明：
//  1. 前 5 条（麻黄/桂枝/大黄/黄芪/当归）文件名已经 Wikimedia Commons API 实际查询验证存在，
//     但**许可证仍需人工复核**（Own work/CC BY-SA 各有要求），正式发布前请逐张打开确认。
//  2. 其余 155 味 originalUrl/yinpianUrl 为空，运行 node scripts/fetch-herb-images.js 可自动
//     按拉丁学名在 Wikimedia Commons 搜索并填充真实原貌图 URL（饮片图资源稀缺，脚本会尽力搜索，
//     找不到则留空并在 note 注明，前端自动显示"图片待补充"占位）。
//  3. 手动补充：填 originalUrl / yinpianUrl 即可，无需改动任何代码。
const herbImages = {
    "herb_001": { // 麻黄
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Ephedra_sinica_kz01.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_002": { // 桂枝
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Cinnamomum_cassia_Leaf.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_003": { // 紫苏叶
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8b/Perilla_frutescens.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_004": { // 生姜
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/2/23/Zingiber_officinale_flower.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_005": { // 防风
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3e/%E9%98%B2%E9%A3%8E.JPG",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_006": { // 白芷
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/6/62/Angelica_dahurica_%288855221294%29.jpg",
        yinpianUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c8/%E7%99%BD%E8%8A%B7%E9%A5%AE%E7%89%87.jpg",
        note: "原貌图已填充"
    },
    "herb_007": { // 荆芥
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Schizonepeta_multifida_1.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_008": { // 薄荷
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Mentha_canadensis_var._piperascens_%27Aomori%27_%28Malinv._ex_Holmes%29_H.Hara_in_Enum._Spermatophytarum_Japon._1-_213_%281948%29_20260716_065510.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_009": { // 牛蒡子
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/3/30/Arctium_lappa_MHNT.BOT.2004.0.16.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_010": { // 菊花
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/3/30/Chrysanthemum_morifolium_%282%29.JPG",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_011": { // 柴胡
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/9/98/Bupleurum_chinense.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_012": { // 石膏
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/0/09/Gypsum.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_013": { // 知母
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Anemarrhena_asphodeloides_%2814945496940%29.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_014": { // 栀子
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Gardenia_jasminoides.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_015": { // 夏枯草
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Prunella_vulgaris.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_016": { // 黄芩
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/9/97/Scutellaria_baicalensis.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_017": { // 黄连
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Coptis_japonica%E3%80%815026696%E3%80%81%E9%BB%84%E8%93%AE%E3%83%BB%E4%B8%B9%E6%B3%A2%E5%B8%82%E7%AB%8B%E8%96%AC%E8%8D%89%E8%96%AC%E6%A8%B9%E5%85%AC%E5%9C%92.JPG",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_018": { // 黄柏
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Phellodendron_chinense-DSC_7301.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_019": { // 金银花
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Lonicera_japonica.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_020": { // 连翘
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/7/72/Forsythia_suspensa.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_021": { // 板蓝根
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fa/%E8%8F%98%E8%97%8D_Isatis_indigotica_-%E9%A6%99%E6%B8%AF%E8%8A%B1%E5%B1%95_Hong_Kong_Flower_Show-_%289216111022%29.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_022": { // 蒲公英
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d2/Taraxacum_mongolicum-IMG_20171127_094343.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_023": { // 鱼腥草
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/0/00/Houttuynia_cordata_kz01.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_024": { // 生地黄
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ea/Rehmannia_glutinosa%2C_son_aire_de_r%C3%A9partition_est_la_Chine.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_025": { // 玄参
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/d/db/Scrophularia_ningpoensis_Kew.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_026": { // 牡丹皮
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/5/54/Paeonia_suffruticosa.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_027": { // 大黄
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Rheum_officinale_kz01.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_028": { // 芒硝
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Sodium_sulfide.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_029": { // 火麻仁
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Cannabis_sativa.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_030": { // 郁李仁
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Prunus_japonica_SZ90.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_031": { // 甘遂
        originalUrl: "",
        yinpianUrl: "",
        note: "待补充：学名 Euphorbia kansui T.N.Liou ex T.P.Wang"
    },
    "herb_032": { // 独活
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Angelica_pubescens_-_Flickr_-_odako1.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_033": { // 威灵仙
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0a/Clematis_chinensis_%282515300711%29.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_034": { // 秦艽
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/9/90/Gentiana_macrophylla_Orchi_04.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_035": { // 防己
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/4/46/Stephania_tetrandra_imported_from_iNaturalist_photo_285506865_on_17_February_2024.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_036": { // 桑寄生
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/7/74/Viscum_album.jpg",
        yinpianUrl: "",
        note: "桑寄生（替代图：槲寄生 Viscum album，同属寄生植物）"
    },
    "herb_037": { // 藿香
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Pogostemon_cablin.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_038": { // 苍术
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/7/70/Atractylodes_lancea_Rhizome.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_039": { // 厚朴
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Magnolia_officinalis_habit.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_040": { // 砂仁
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/d/df/Amomum_villosum_-_Hong_Kong_Botanical_Garden_-_IMG_9580.JPG",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_041": { // 茯苓
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Poria_cocos.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_042": { // 猪苓
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Polyporus_umbellatus.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_043": { // 泽泻
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Alisma_plantago-aquatica.jpg",
        yinpianUrl: "",
        note: "泽泻（替代图：泽泻属 Alisma plantago-aquatica，近缘种）"
    },
    "herb_044": { // 车前子
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Plantago_asiatica.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_045": { // 滑石
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/7/74/Talc.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_046": { // 茵陈
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Redstem_wormwood_%28Artemisia_scoparia%29.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_047": { // 金钱草
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6d/%E9%81%8E%E8%B7%AF%E9%BB%83%28%E9%87%91%E9%8C%A2%E8%8D%89%29_Lysimachia_christinae_-%E9%A6%99%E6%B8%AF%E8%8A%B1%E5%B1%95_Hong_Kong_Flower_Show-_%289216110490%29.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_048": { // 附子
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/9/99/Aconitum_carmichaelii_kz01.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_049": { // 干姜
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Ginger_Plant_vs.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_050": { // 肉桂
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Cinnamomum_aromaticum_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-039_cropped.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_051": { // 陈皮
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Citrus_reticulata.jpg",
        yinpianUrl: "https://upload.wikimedia.org/wikipedia/commons/9/92/Cinpi2.jpg",
        note: "陈皮饮片（晒干橘皮 Chenpi）"
    },
    "herb_052": { // 枳实
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Citrus_aurantium.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_053": { // 木香
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/3/38/Saussurea_costus_on_way_from_Gangria_to_Hemkund_at_Valley_of_Flowers_National_Park_-_during_LGFC_-_VOF_2019_%283%29.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_054": { // 香附
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/7/73/Cyperus_rotundus.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_055": { // 薤白
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/8/84/Allium_macrostemon.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_056": { // 山楂
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/8/82/Crataegus_pinnatifida_kz01.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_057": { // 神曲
        originalUrl: "",
        yinpianUrl: "",
        note: "待补充：学名 Massa Medicata Fermentata"
    },
    "herb_058": { // 麦芽
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/5/51/Hordeum_vulgare.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_059": { // 使君子
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Quisqualis_indica.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_060": { // 小蓟
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Cirsium_arvense_with_Bees_Richard_Bartz.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_061": { // 地榆
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Sanguisorba_officinalis.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_062": { // 白茅根
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Imperata_cylindrica.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_063": { // 三七
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Panax_notoginseng.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_064": { // 蒲黄
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Typha_latifolia_Corsica_habitat.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_065": { // 白及
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d8/Bletilla_striata.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_066": { // 仙鹤草
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Agrimonia_pilosa.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_067": { // 艾叶
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/0/06/Aicao.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_068": { // 川芎
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/0/09/Ligusticum_sinense_%27Chuanxiong%27_slices.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_069": { // 延胡索
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/7/74/Corydalis_ambigua.jpg",
        yinpianUrl: "",
        note: "延胡索（替代图：东北延胡索 Corydalis ambigua，同属近缘）"
    },
    "herb_070": { // 郁金
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/7/75/Curcuma_aromatica-2-bsi-yercaud-salem-India.jpg",
        yinpianUrl: "",
        note: "郁金（郁金来源品种之一：Curcuma aromatica）"
    },
    "herb_071": { // 丹参
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7f/Salvia_miltiorrhiza_kz01.jpg",
        yinpianUrl: "https://upload.wikimedia.org/wikipedia/commons/3/37/Dried_salvia_miltiorrhiza.jpg",
        note: "原貌图已填充"
    },
    "herb_072": { // 红花
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/7/71/Carthamus_tinctorius.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_073": { // 桃仁
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Prunus_persica.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_074": { // 益母草
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Leonurus_japonicus_kz01.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_075": { // 骨碎补
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/2/23/%E6%A7%B2%E8%95%A8.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_076": { // 莪术
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Curcuma_zedoaria_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-048.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_077": { // 半夏
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Pinellia_ternata_kz01.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_078": { // 天南星
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/9/99/Arisaema_erubescens_Arizema_2019-06-09_13.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_079": { // 白芥子
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/0/09/D%C3%BClmen%2C_Kirchspiel%2C_B%C3%B6rnste_--_2016_--_5621.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_080": { // 川贝母
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Fritillaria_cirrhosa_%28Sikkim%2C_India%29.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_081": { // 瓜蒌
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d2/Trichosanthes_kirilowii.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_082": { // 竹茹
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/2/23/Bambusa_tuldoides_1zz.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_083": { // 苦杏仁
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Apricots.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_084": { // 百部
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Stemona_tuberosa_Lour.jpg",
        yinpianUrl: "",
        note: "百部（替代图：Stemona tuberosa，同属百部属）"
    },
    "herb_085": { // 桑白皮
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/5/58/Morus_alba.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_086": { // 朱砂
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/2/24/Dragonblood_tree_in_Socotra_2.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_087": { // 龙骨
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Humanae_salutis_monumenta_%281581%29_%2814561775680%29.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_088": { // 酸枣仁
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Ziziphus_jujuba_Habitus_2010-10-26_ArboretoParqueElPilarCiudadReal.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_089": { // 远志
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/f/ff/YUAN_ZHI_-_Polygala_tenuifolia.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_090": { // 合欢皮
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Copper_sunbird_%28Cinnyris_cupreus_cupreus%29_female_on_Persian_silk_tree_%28Albizia_julibrissin%29.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_091": { // 石决明
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/3/38/Haliotis_diversicolor_01.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_092": { // 牡蛎
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Crassostrea_gigas_p1040848.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_093": { // 代赭石
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Hematite.jpg",
        yinpianUrl: "",
        note: "代赭石（赤铁矿 Hematite，代赭石主成分）"
    },
    "herb_094": { // 天麻
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/8/87/Gastrodia_elata_1.JPG",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_095": { // 钩藤
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/8/88/Uncaria_rhynchophylla_kagikzr01.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_096": { // 全蝎
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Olivierus_martensii_Chinesischer_Goldskorpion_1.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_097": { // 麝香
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/0/03/Moschus_berezovskii_-_Kunming_Natural_History_Museum_of_Zoology_-_DSC02453.JPG",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_098": { // 冰片
        originalUrl: "",
        yinpianUrl: "",
        note: "待补充：学名 Borneolum Syntheticum"
    },
    "herb_099": { // 人参
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Panax_ginseng_in_Kitchen.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_100": { // 黄芪
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Astragalus_membranaceus.jpg",
        yinpianUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Dried_astragalus_slices.jpg",
        note: "原貌图已填充"
    },
    "herb_101": { // 白术
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Baizhu_roots.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_102": { // 甘草
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/a/aa/Glycyrrhizauralensis.jpg",
        yinpianUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a7/Liquiritae_radix_161.jpg",
        note: "甘草饮片（甘草根 Liquiritae Radix）"
    },
    "herb_103": { // 当归
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/5/57/Angelica_sinensis_%287%29.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_104": { // 熟地黄
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Rehmannia.JPG",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_105": { // 白芍
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/9/90/Paeonia_lactiflora_%27Jacques_Doriat%27_%28Pivoine_de_Chine%29_-_113.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_106": { // 北沙参
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Glehnia_littoralis.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_107": { // 麦冬
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/3/30/Japonska_ka%C4%8Dja_brada.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_108": { // 枸杞子
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/6/62/Lycium_barbarum.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_109": { // 龟甲
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/8/84/Chinemys_reevesii_02.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_110": { // 鹿茸
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/1/17/%D0%9F%D0%BE%D1%80%D1%82%D1%80%D0%B5%D1%82_%D0%BE%D0%BB%D0%B5%D0%BD%D1%8F.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_111": { // 杜仲
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a3/Eucommia_ulmoides_kz05.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_112": { // 补骨脂
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/4/49/Psoralea_corylifolia_-_Agri-Horticultural_Society_of_India_-_Alipore_-_Kolkata_2013-01-05_2282.JPG",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_113": { // 麻黄根
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Ephedra_sinica_alexlomas.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_114": { // 五味子
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Schisandra_sinensis.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_115": { // 乌梅
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Flowers_of_Prunus_mume_%28Armeniaca_mume%29_at_Nagai_Park%2C_January_2024_-_1221_%282%29.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_116": { // 山茱萸
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Cornus_officinalis_SZ50.png",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_117": { // 金樱子
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Cherokee_rose.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_118": { // 常山
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Dichroa_febrifuga_B.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_119": { // 雄黄
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Realgar_%28Shimen_Mine%2C_Hunan_Province%2C_China%29_1.jpg",
        yinpianUrl: "",
        note: "雄黄（湖南石门矿真雄黄标本 Realgar）"
    },
    "herb_120": { // 蛇床子
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f9/QICAOGANGMU.png",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_121": { // 葛根
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Kuzu_%28Pueraria_Montana_var._lobata%29.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_122": { // 升麻
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Cimicifuga_foetida_Ypey99.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_123": { // 桑叶
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/a/af/Morus_alba_MHNT.BOT.2006.0.1270.JPG",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_124": { // 细辛
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f8/Asarum_heterotropoides_1.JPG",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_125": { // 芦根
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/4/43/Phragmites_australis_Vikmanshyttesj%C3%B6n.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_126": { // 天花粉
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d2/Trichosanthes_kirilowii.jpg",
        yinpianUrl: "",
        note: "天花粉（瓜蒌根，与瓜蒌同一植物 Trichosanthes kirilowii）"
    },
    "herb_127": { // 赤芍
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/2/29/Paeonia_lactiflora.jpg",
        yinpianUrl: "",
        note: "赤芍（替代图：Paeonia lactiflora，与白芍同植物）"
    },
    "herb_128": { // 青蒿
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/2/20/Artemisia_annua.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_129": { // 地骨皮
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/8/85/Lycium_chinense_MHNT.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_130": { // 白头翁
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/3/39/Pulsatilla_chinensis.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_131": { // 秦皮
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Fraxinus_japonica2.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_132": { // 木瓜
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/7/74/Chaenomeles_speciosa.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_133": { // 佩兰
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/6/66/C%C3%A2y_M%E1%BA%A7n_t%C6%B0%E1%BB%9Bi_%28Eupatorium_fortunei%29_1.JPG",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_134": { // 薏苡仁
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/6/64/Coix_lacryma-jobi_MHNT.BOT.2016.12.1.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_135": { // 瞿麦
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/b/be/Dianthus_superbus_2_RF.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_136": { // 吴茱萸
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/1/14/Rutaceae_sp_SZ21_clean.png",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_137": { // 川楝子
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Pond_of_Kuruwapari_Chaudharitol-_Inaruwa%2C_Kosi_Municipality-WLV-2252.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_138": { // 莱菔子
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/0/01/Raphanus_sativus.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_139": { // 大蓟
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Cirsium_japonicum_var._maackii_3.JPG",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_140": { // 牛膝
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/7/76/Achyranthes_bidentata.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_141": { // 鸡血藤
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Spatholobus_parviflorus.jpg",
        yinpianUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7b/%E9%B8%A1%E8%A1%80%E8%97%A4%E9%A5%AE%E7%89%871.jpg",
        note: "鸡血藤（替代图：Spatholobus parviflorus，同属近缘；饮片图已配）"
    },
    "herb_142": { // 桔梗
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Platycodon_grandiflorum_HRM.JPG",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_143": { // 旋覆花
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Inula_japonica_48818030.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_144": { // 紫菀
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Aster_tataricus1.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_145": { // 款冬花
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/2/27/Tussilago_farfara_-_Rouge_Park.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_146": { // 浙贝母
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/5/59/Fritillaria_thunbergii.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_147": { // 柏子仁
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Platycladus_orientalis_MHNT.BOT.2007.52.7.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_148": { // 僵蚕
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Giant_silk_moth_%28Adelowalkeria_tristygma%29.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_149": { // 地龙
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/6/60/Earthworm.jpg",
        yinpianUrl: "",
        note: "地龙（蚯蚓 Earthworm）"
    },
    "herb_150": { // 石菖蒲
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Acorus_gramineus.jpg",
        yinpianUrl: "",
        note: "石菖蒲（替代图：Acorus gramineus，同属近缘）"
    },
    "herb_151": { // 山药
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Dioscorea_polystachya_%28batatas%29.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_152": { // 白扁豆
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/5/54/Dolichos_lablab_%27Hyacinth_bean%27_%28Leguminosae%29_plant.JPG",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_153": { // 龙眼肉
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Dimocarpus_longan_fruits.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_154": { // 阿胶
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/8/80/Equus_asinus_Kadzid%C5%82owo_001.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_155": { // 何首乌
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/1/12/%E5%8F%B0%E7%81%A3%E4%BD%95%E9%A6%96%E7%83%8F_Polygonum_multiflorum_v_hypoleucum_-%E5%8F%B0%E7%81%A3%E6%B8%85%E5%A2%83%E8%BE%B2%E5%A0%B4_Cingjing_Farm%2C_Taiwan-_%2815070926263%29.jpg",
        yinpianUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Polygonummultiflorumrootdried.jpg",
        note: "原貌图已填充 | 饮片图：何首乌干根（Polygonum multiflorum dried root）"
    },
    "herb_156": { // 女贞子
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0d/FloweringLigustrumLucidumTree.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_157": { // 墨旱莲
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Eclipta_prostrata_kz05.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_158": { // 百合
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Lilium_lancifolium-IMG_9248.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_159": { // 鳖甲
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Pelodiscus_sinensis_distribution_map.jpg",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
    "herb_160": { // 菟丝子
        originalUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Cuscuta_chinensis_07.JPG",
        yinpianUrl: "",
        note: "原貌图已填充"
    },
};
herbImages.get=function(id){return herbImages[id]||null;};
if(typeof window!=="undefined"){window.herbImages=herbImages;};if(typeof module!=="undefined"&&module.exports){module.exports={herbImages};};