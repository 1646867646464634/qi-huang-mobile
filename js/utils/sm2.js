// ===== 岐黄·辅助诊疗系统 - SM-2 间隔重复算法 =====
// 用于学习中心记忆卡片：根据复习质量计算下次复习时间
// quality: 0-5（0=完全忘记，3=勉强想起，5=完全掌握）
const SM2 = {
    // 初始状态
    init() {
        return { ef: 2.5, interval: 0, reps: 0, lapses: 0, nextReview: 0, lastQuality: null };
    },

    /**
     * 更新卡片记忆状态
     * @param {Object} card - { ef, interval, reps, lapses, nextReview, lastQuality }
     * @param {number} quality - 0-5
     * @returns {Object} 新的状态
     */
    update(card, quality) {
        const c = Object.assign(this.init(), card || {});
        const q = Math.max(0, Math.min(5, Math.round(quality || 0)));

        // EF 更新（q<3 视为失败）
        if (q >= 3) {
            c.ef = c.ef + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
            if (c.ef < 1.3) c.ef = 1.3;
            c.reps += 1;
        } else {
            // 记忆失败：重置间隔，但不重置 EF
            c.reps = 0;
            c.lapses += 1;
        }

        // 间隔计算（天）
        if (q < 3) {
            c.interval = 1;
        } else if (c.reps === 1) {
            c.interval = 1;
        } else if (c.reps === 2) {
            c.interval = 6;
        } else {
            c.interval = Math.round((c.interval || 6) * c.ef);
        }

        c.lastQuality = q;
        c.nextReview = Date.now() + c.interval * 24 * 60 * 60 * 1000;
        return c;
    },

    // 三档按钮 → quality 映射：再学=1，熟悉=4，掌握=5
    qualityMap: { learn: 1, familiar: 4, mastered: 5 },

    // 计算距下次复习还有多少天（负=已到期）
    daysUntil(nextReview) {
        return Math.ceil((nextReview - Date.now()) / (24 * 60 * 60 * 1000));
    }
};

if (typeof window !== 'undefined') {
    window.SM2 = SM2;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SM2 };
}
