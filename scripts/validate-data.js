/**
 * 岐黄·辅助诊疗系统 — 数据完整性校验脚本
 * 运行：node scripts/validate-data.js
 * 校验项：
 *   1. 中药库 / 方剂库 ID 连续且唯一
 *   2. 名称无重复
 *   3. herbCategories / formulaCategories 分类索引引用完整
 *   4. 主数组 category/subcategory 均为分类索引键
 *   5. 证候库推荐方剂引用全部指向方剂库真实存在的方剂
 *   6. 方剂组成药名与中药库匹配率（仅提示，不阻断）
 *   7. 证型 relatedConstitutions 值 ∈ 九种体质集合
 *   8. 方剂 relatedConstitutions / relatedSyndromes 合法
 *   9. 证型 keySymptoms ⊆ symptoms；dangerSignals ⊆ symptoms；contradictions 不与 keySymptoms 重叠
 *  10. 症状映射 syndromeId 存在；映射覆盖率（证型症状 ↔ 映射 key 双向，缺省告警）
 *  11. 证型 level 取值合法
 *  12. 中药 toxicNote 格式检查（若存在则须含 limit）
 */
const path = require('path');
const fs = require('fs');

const base = path.join(__dirname, '..', 'js', 'data');
const { herbsDatabase, herbCategories } = require(path.join(base, 'herbs-database.js'));
const { formulasDatabase, formulaCategories } = require(path.join(base, 'formulas-database.js'));
const { syndromesDatabase } = require(path.join(base, 'syndromes-database.js'));
const { symptomSyndromeMapping } = require(path.join(base, 'symptom-mapping.js'));
// 合并自动生成的症状映射扩展（浏览器端由 symptom-mapping.js 内 Object.assign 完成，此处手动合并保持一致）
const { symptomMappingExtension } = require(path.join(base, 'symptom-mapping-extension.js'));
Object.assign(symptomSyndromeMapping, symptomMappingExtension);

let errors = [];
let warnings = [];

// 九种体质
const CONSTITUTION_TYPES = ['平和质', '气虚质', '阳虚质', '阴虚质', '痰湿质', '湿热质', '血瘀质', '气郁质', '特禀质'];

// ---------- 1. 中药库 ID 连续且唯一 ----------
const herbIds = herbsDatabase.map(h => h.id);
if (new Set(herbIds).size !== herbIds.length) {
    const dup = herbIds.filter((id, i) => herbIds.indexOf(id) !== i);
    errors.push(`中药库存在重复 ID: ${[...new Set(dup)].join(', ')}`);
}
for (let i = 1; i <= herbsDatabase.length; i++) {
    const expect = 'herb_' + String(i).padStart(3, '0');
    if (herbIds[i - 1] !== expect) { errors.push(`中药库 ID 不连续：第${i}个应为 ${expect}，实际 ${herbIds[i-1]}`); break; }
}
const herbNames = herbsDatabase.map(h => h.name);
const herbNameDup = herbNames.filter((n, i) => herbNames.indexOf(n) !== i);
if (herbNameDup.length) errors.push(`中药库存在重名: ${[...new Set(herbNameDup)].join(', ')}`);

// ---------- 2. 方剂库 ID 连续且唯一 ----------
const formulaIds = formulasDatabase.map(f => f.id);
if (new Set(formulaIds).size !== formulaIds.length) {
    const dup = formulaIds.filter((id, i) => formulaIds.indexOf(id) !== i);
    errors.push(`方剂库存在重复 ID: ${[...new Set(dup)].join(', ')}`);
}
for (let i = 1; i <= formulasDatabase.length; i++) {
    const expect = 'formula_' + String(i).padStart(3, '0');
    if (formulaIds[i - 1] !== expect) { errors.push(`方剂库 ID 不连续：第${i}个应为 ${expect}，实际 ${formulaIds[i-1]}`); break; }
}
const formulaNames = formulasDatabase.map(f => f.name);
const formulaNameDup = formulaNames.filter((n, i) => formulaNames.indexOf(n) !== i);
if (formulaNameDup.length) errors.push(`方剂库存在重名: ${[...new Set(formulaNameDup)].join(', ')}`);

// ---------- 3. 分类索引引用完整性 ----------
function checkIndex(index, mainIds, label) {
    Object.entries(index).forEach(([cat, subs]) => {
        Object.entries(subs).forEach(([sub, items]) => {
            items.forEach(item => {
                const id = typeof item === 'string' ? item : item.id;
                if (!mainIds.has(id)) errors.push(`${label} 索引[${cat}][${sub}] 引用不存在的 ${id}`);
            });
        });
    });
}
checkIndex(herbCategories, new Set(herbIds), 'herbCategories');
checkIndex(formulaCategories, new Set(formulaIds), 'formulaCategories');

// ---------- 4. 主数组 category 均为索引键 ----------
herbsDatabase.forEach(h => {
    if (!herbCategories[h.category]) errors.push(`中药 ${h.id}(${h.name}) 的 category「${h.category}」不在分类索引中`);
    else if (!herbCategories[h.category][h.subcategory]) errors.push(`中药 ${h.id}(${h.name}) 的 subcategory「${h.subcategory}」不在索引[${h.category}]中`);
});
formulasDatabase.forEach(f => {
    if (!formulaCategories[f.category]) errors.push(`方剂 ${f.id}(${f.name}) 的 category「${f.category}」不在分类索引中`);
    else if (!formulaCategories[f.category][f.subcategory]) errors.push(`方剂 ${f.id}(${f.name}) 的 subcategory「${f.subcategory}」不在索引[${f.category}]中`);
});

// ---------- 5. 证候库推荐方剂引用完整性 ----------
const formulaNameToId = {};
formulasDatabase.forEach(f => { formulaNameToId[f.name] = f.id; });
formulaNameToId['金匮肾气丸'] = 'formula_035'; // 教材异名等价方
formulaNameToId['肾气丸（即金匮肾气丸）'] = 'formula_035'; // 证型库引用的带括注异名
let syndromeRefTotal = 0, syndromeRefBad = 0;
syndromesDatabase.forEach(s => {
    (s.recommendedFormulas || []).forEach(f => {
        syndromeRefTotal++;
        const correctId = formulaNameToId[f.name];
        if (correctId !== f.id) syndromeRefBad++, errors.push(`证候库「${s.name}」引用错位：${f.id} 标注「${f.name}」应为 ${correctId || '未收录'}`);
    });
});
if (syndromeRefBad === 0) console.log(`✅ 证候库 ${syndromeRefTotal} 处方剂引用全部有效`);

// ---------- 6. 组成药名匹配率（仅提示） ----------
const herbNameSet = new Set(herbNames);
let totalComp = 0, matchedComp = 0;
const notFoundHerbs = new Set();
formulasDatabase.forEach(f => {
    (f.composition || []).forEach(c => {
        totalComp++;
        const plain = c.herbName.replace(/^(炙|炒|煅|生|制|焦|蜜炙|盐|醋|酒|姜|水飞)/, '');
        if (herbNameSet.has(c.herbName) || herbNameSet.has(plain)) matchedComp++;
        else notFoundHerbs.add(c.herbName);
    });
});
const rate = ((matchedComp / totalComp) * 100).toFixed(1);

// ---------- 7. 证型 relatedConstitutions 合法性 ----------
const ctSet = new Set(CONSTITUTION_TYPES);
syndromesDatabase.forEach(s => {
    (s.relatedConstitutions || []).forEach(ct => {
        if (!ctSet.has(ct)) errors.push(`证型「${s.name}」(id=${s.id}) relatedConstitutions 含非法体质「${ct}」`);
    });
});

// ---------- 8. 方剂 relatedConstitutions / relatedSyndromes 合法性 ----------
const syndromeNameSet = new Set(syndromesDatabase.map(s => s.name));
formulasDatabase.forEach(f => {
    (f.relatedConstitutions || []).forEach(ct => {
        if (!ctSet.has(ct)) errors.push(`方剂「${f.name}」relatedConstitutions 含非法体质「${ct}」`);
    });
    (f.relatedSyndromes || []).forEach(sn => {
        if (!syndromeNameSet.has(sn)) warnings.push(`方剂「${f.name}」relatedSyndromes 引用了不存在的证型名「${sn}」`);
    });
});

// ---------- 9. 证型 keySymptoms / dangerSignals / contradictions 约束 ----------
syndromesDatabase.forEach(s => {
    const symSet = new Set(s.symptoms || []);
    (s.keySymptoms || []).forEach(k => {
        if (!symSet.has(k)) errors.push(`证型「${s.name}」keySymptoms 含「${k}」不在 symptoms 中`);
    });
    (s.dangerSignals || []).forEach(d => {
        if (!symSet.has(d)) errors.push(`证型「${s.name}」dangerSignals 含「${d}」不在 symptoms 中`);
    });
    const keySet = new Set(s.keySymptoms || []);
    (s.contradictions || []).forEach(c => {
        if (keySet.has(c)) errors.push(`证型「${s.name}」contradictions 与 keySymptoms 重叠：「${c}」`);
    });
});

// ---------- 10. 症状映射引用与覆盖率 ----------
let mapBadRef = 0, mapMissKey = 0;
const syndromeIdSet = new Set(syndromesDatabase.map(s => s.id));
Object.entries(symptomSyndromeMapping).forEach(([sym, mappings]) => {
    (mappings || []).forEach(m => {
        if (!syndromeIdSet.has(m.syndromeId)) { mapBadRef++; errors.push(`症状映射「${sym}」引用了不存在的证型 ${m.syndromeId}`); }
    });
});
// 覆盖率：证型 symptoms 应尽量有映射 key（告警不阻断）
const mappedSymptomSet = new Set(Object.keys(symptomSyndromeMapping));
syndromesDatabase.forEach(s => {
    (s.symptoms || []).forEach(sym => {
        if (!mappedSymptomSet.has(sym)) mapMissKey++, warnings.push(`证型「${s.name}」症状「${sym}」无映射 key（覆盖率未达 100%）`);
    });
});
// 映射 key 必须被某证型 symptoms 包含（多余 key 告警）
Object.keys(symptomSyndromeMapping).forEach(sym => {
    const covered = syndromesDatabase.some(s => (s.symptoms || []).includes(sym));
    if (!covered) warnings.push(`映射 key「${sym}」未在任何证型 symptoms 中出现（可能为孤立映射）`);
});

// ---------- 11. 证型 level 取值 ----------
const LEVEL_SET = new Set(['基础', '进阶', '临床']);
syndromesDatabase.forEach(s => {
    if (s.level !== undefined && !LEVEL_SET.has(s.level)) errors.push(`证型「${s.name}」level「${s.level}」非法（应为 基础/进阶/临床）`);
});

// ---------- 12. 中药 toxicNote 格式 ----------
herbsDatabase.forEach(h => {
    if (h.toxicNote && typeof h.toxicNote === 'object' && !h.toxicNote.limit) {
        warnings.push(`中药「${h.name}」toxicNote 缺少 limit 字段`);
    }
});

// ---------- 输出 ----------
console.log('========== 岐黄数据完整性校验 ==========');
console.log(`中药库：${herbIds.length} 味 | 方剂库：${formulaIds.length} 首 | 证候库：${syndromesDatabase.length} 证 | 症状映射：${mappedSymptomSet.size} key`);
console.log('----------------------------------------');
if (errors.length) {
    console.log(`❌ 发现 ${errors.length} 项错误：`);
    errors.forEach(e => console.log('  - ' + e));
} else {
    console.log('✅ ID 连续唯一、无重名、分类索引引用完整、证候库引用全部有效、体质/症状交叉一致性通过');
}
if (warnings.length) {
    console.log(`⚠️ ${warnings.length} 项提示（不阻断）：`);
    warnings.slice(0, 30).forEach(w => console.log('  - ' + w));
    if (warnings.length > 30) console.log(`  … 等 ${warnings.length - 30} 项`);
}
console.log(`ℹ️ 方剂组成药名与中药库匹配率：${rate}%（炮制品/未收录药属正常现象）`);
console.log('========================================');
process.exit(errors.length ? 1 : 0);
