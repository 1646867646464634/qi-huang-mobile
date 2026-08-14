// ===== 岐黄·辅助诊疗系统 - 问诊辨证引擎 v2 =====
// 保留旧接口 collectKeywords / scoreSyndromes（舌诊/面诊模块继续使用，勿破坏），
// 新增 diagnose(input) 实现四诊合参分层辨证：症状 / 舌象 / 面象 / 体质分层加权，
// 并支持 必见症状(keySymptoms)、矛盾症状(contradictions)、推理依据、危险信号。
const DiagnosisEngine = {
    // ==== 旧接口（兼容）：将规则选项转换为 keywords 集合 ====
    collectKeywords(rules, selection) {
        const allKeywords = [];
        rules.fields.forEach(field => {
            const values = selection[field.key];
            if (!values || values.length === 0) return;
            values.forEach(v => {
                const opt = field.options.find(o => o.value === v);
                if (opt && opt.keywords) {
                    opt.keywords.forEach(k => allKeywords.push({ kw: k, weight: 2 }));
                }
            });
        });
        return allKeywords;
    },

    // ==== 旧接口（兼容）：对全部证型按关键词打分 ====
    scoreSyndromes(keywords) {
        const db = window.syndromesDatabase || [];
        const results = db.map(s => {
            let score = 0;
            const hits = [];
            const tongueText = s.tongueAppearance
                ? (typeof s.tongueAppearance === 'string' ? s.tongueAppearance
                    : [s.tongueAppearance.tongueBody, s.tongueAppearance.tongueCoating].filter(Boolean).join('，'))
                : '';
            const symptomText = (s.symptoms || []).join('，');
            const pulseText = s.pulseCondition || '';

            keywords.forEach(({ kw, weight }) => {
                if (tongueText.includes(kw)) { score += weight * 2; hits.push(kw); }
                else if (symptomText.includes(kw)) { score += weight; hits.push(kw); }
                else if (pulseText.includes(kw)) { score += weight; hits.push(kw); }
            });

            return { syndrome: s, score, hits };
        });

        results.sort((a, b) => b.score - a.score);
        const matched = results.filter(r => r.score > 0);
        if (matched.length === 0) return [];
        const maxScore = matched[0].score;
        return matched.slice(0, 8).map(r => ({
            syndrome: r.syndrome,
            matchScore: Math.round(r.score / maxScore * 95),
            hits: r.hits
        }));
    },

    // ==== v2：四诊合参综合辨证 ====
    // input = {
    //   symptoms: ['头痛','恶寒重'],       // 已选症状（symptomSyndromeMapping key）
    //   tongue: { tongueColor:[], tongueShape:[], coatingColor:[], coatingQuality:[] },
    //   face:   { faceColor:[], faceLuster:[], facePart:[], faceFeature:[] },
    //   constitution: '气虚质' | ''
    // }
    diagnose(input) {
        input = input || {};
        const symptoms = Array.isArray(input.symptoms) ? input.symptoms : [];
        const tongue = input.tongue || {};
        const face = input.face || {};
        const constitution = input.constitution || '';
        const db = window.syndromesDatabase || [];
        const mapping = window.symptomSyndromeMapping || {};

        // 收集舌象/面象关键词（按规则表）
        const tongueKws = this._collectFieldKeywords(TongueRules, tongue);
        const faceKws = this._collectFieldKeywords(FaceRules, face);

        const scored = db.map(s => {
            const reasoning = [];
            let score = 0;
            const hits = [];
            const matchedSymptoms = [];
            const keyHits = [];
            const missingKey = [];
            const conflicts = [];

            // ---- 症状层（权重取自 symptomSyndromeMapping，主症 10 为主） ----
            symptoms.forEach(sym => {
                const mappings = mapping[sym];
                if (!mappings) return;
                mappings.forEach(m => {
                    if (m.syndromeId !== s.id) return;
                    score += m.weight;
                    if (!matchedSymptoms.includes(sym)) matchedSymptoms.push(sym);
                    if (!hits.includes(sym)) hits.push(sym);
                    reasoning.push({ layer: '症状', key: sym, weight: m.weight });
                });
            });

            // ---- 必见症状机制 ----
            const keys = s.keySymptoms || [];
            if (keys.length) {
                keys.forEach(k => {
                    if (symptoms.includes(k)) keyHits.push(k);
                    else missingKey.push(k);
                });
                // 必见症状一条未命中 → 不作为候选（排除）
                if (keyHits.length === 0) return null;
            }

            // ---- 矛盾互斥机制 ----
            const contras = s.contradictions || [];
            if (contras.length) {
                contras.forEach(c => {
                    if (symptoms.includes(c)) {
                        conflicts.push(c);
                        reasoning.push({ layer: '矛盾', key: c, weight: -8 });
                    }
                });
                if (conflicts.length >= 2) return null; // 多个矛盾 → 排除
                if (conflicts.length === 1) score += -8; // 单个矛盾 → 明显降权
            }

            // ---- 舌象层（权重 ×2） ----
            if (tongueKws.length) {
                const tongueText = this._tongueText(s);
                tongueKws.forEach(kw => {
                    if (tongueText.includes(kw)) {
                        score += 4;
                        hits.push(kw);
                        reasoning.push({ layer: '舌象', key: kw, weight: 4 });
                    }
                });
            }

            // ---- 面象层（权重 ×1） ----
            if (faceKws.length) {
                const symptomText = (s.symptoms || []).join('，');
                const tongueText = this._tongueText(s);
                faceKws.forEach(kw => {
                    if (symptomText.includes(kw) || tongueText.includes(kw)) {
                        score += 2;
                        hits.push(kw);
                        reasoning.push({ layer: '面象', key: kw, weight: 2 });
                    }
                });
            }

            // ---- 体质层（加成 +15） ----
            if (constitution && (s.relatedConstitutions || []).includes(constitution)) {
                score += 15;
                reasoning.push({ layer: '体质', key: constitution, weight: 15 });
            }

            if (score <= 0) return null;
            return { syndrome: s, score, hits, matchedSymptoms, keyHits, missingKey, conflicts, reasoning, keys };
        }).filter(Boolean);

        scored.sort((a, b) => b.score - a.score);
        if (scored.length === 0) return [];
        const maxScore = scored[0].score;

        return scored.slice(0, 8).map(r => {
            const matchScore = Math.round(r.score / maxScore * 95);
            const confidence = r.keys.length ? Math.round((r.keyHits.length / r.keys.length) * 100) : null;
            return {
                syndrome: r.syndrome,
                score: r.score,
                matchScore,
                hits: r.hits,
                matchedSymptoms: r.matchedSymptoms,
                keyHits: r.keyHits,
                missingKey: r.missingKey,
                conflicts: r.conflicts,
                reasoning: r.reasoning,
                danger: (r.syndrome.dangerSignals || []).slice(),
                insufficient: matchScore < 50,
                confidence,
                reasoningText: this._formatReasoning(r.reasoning)
            };
        });
    },

    // 按规则表收集选择项对应的关键词（供 diagnose 使用）
    _collectFieldKeywords(rules, selection) {
        if (!rules || !rules.fields || !selection) return [];
        const kws = [];
        rules.fields.forEach(field => {
            const values = selection[field.key];
            if (!values || values.length === 0) return;
            values.forEach(v => {
                const opt = field.options.find(o => o.value === v);
                if (opt && opt.keywords) kws.push(...opt.keywords);
            });
        });
        return kws;
    },

    _tongueText(s) {
        const t = s.tongueAppearance;
        if (!t) return '';
        return typeof t === 'string' ? t : [t.tongueBody, t.tongueCoating].filter(Boolean).join('，');
    },

    // 将分层推理依据格式化为人类可读文本列表
    _formatReasoning(reasoning) {
        if (!reasoning || !reasoning.length) return [];
        const out = [];
        reasoning.forEach(r => {
            if (r.layer === '矛盾') { out.push('⚠ 矛盾：' + r.key + '（不支持此证型）'); return; }
            out.push(r.layer + '「' + r.key + '」（+' + r.weight + '）');
        });
        return out;
    }
};

if (typeof window !== 'undefined') {
    window.DiagnosisEngine = DiagnosisEngine;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DiagnosisEngine };
}
