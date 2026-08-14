// ===== 岐黄·辅助诊疗系统 - 轻量事件总线 =====
// 模块间解耦通信：EventBus.on(event, handler) / EventBus.emit(event, payload) / EventBus.off(event, handler)
const EventBus = {
    _handlers: {},

    on(event, handler) {
        if (!this._handlers[event]) this._handlers[event] = [];
        this._handlers[event].push(handler);
        return () => this.off(event, handler); // 返回解绑函数
    },

    off(event, handler) {
        if (!this._handlers[event]) return;
        const idx = this._handlers[event].indexOf(handler);
        if (idx !== -1) this._handlers[event].splice(idx, 1);
    },

    emit(event, payload) {
        (this._handlers[event] || []).slice().forEach(h => {
            try { h(payload); } catch (e) { console.warn('EventBus handler error:', e); }
        });
    }
};

if (typeof window !== 'undefined') {
    window.EventBus = EventBus;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EventBus };
}
