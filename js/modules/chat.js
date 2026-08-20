// ===== 岐黄·辅助诊疗系统 - AI 在线问诊模块（对话式） =====
// 与智谱 GLM-4.7-Flash 流式对话（经 Vercel 代理），支持会话保存/切换/导出、输入脱敏、危险信号扫描。
// 依赖：GLMChat（glm-chat.js）、Storage、EventBus、Toast、ExportUtils、DetailModal、checkDangerSymptoms。

const ChatSessions = {
    KEY: 'tcm_chat_sessions',
    MAX: 50,
    list() { return Storage.get(this.KEY, []); },
    // 会话结构：{ id:'chat_'+Date.now(), time, title, messages:[{role:'user'|'assistant', content, time}] }
    save(session) {
        const list = this.list();
        const item = {
            id: session.id || 'chat_' + Date.now(),
            time: session.time || Date.now(),
            title: session.title || '新会话',
            messages: session.messages || []
        };
        const i = list.findIndex(s => s.id === item.id);
        if (i !== -1) list[i] = item; else list.unshift(item);
        Storage.set(this.KEY, list.slice(0, this.MAX));
        EventBus.emit('chat:changed', { id: item.id });
        return item;
    },
    get(id) { return this.list().find(s => s.id === id) || null; },
    remove(id) { Storage.set(this.KEY, this.list().filter(s => s.id !== id)); EventBus.emit('chat:changed', { id }); }
};

class ChatModule {
    constructor() {
        this.activeSessionId = null;   // 当前会话 id（null=新会话）
        this.activeSession = null;     // 当前会话对象（未落盘，流式中）
        this.abortController = null;   // 停止按钮
        this.streaming = false;
    }

    destroy() {
        if (this.abortController) { this.abortController.abort(); this.abortController = null; }
    }

    render(container) {
        container.innerHTML = `
            <div class="module-page chat-page">
                <style>
                    .chat-page { display:flex; flex-direction:column; height:calc(100vh - 190px); min-height:480px; }
                    .chat-sessions { display:flex; gap:8px; overflow-x:auto; padding:8px 2px; flex:0 0 auto; }
                    .chat-chip { flex:0 0 auto; padding:6px 12px; border-radius:20px; border:1px solid var(--color-line); font-size:var(--text-sm); cursor:pointer; color:var(--color-ink); background:var(--color-card); max-width:160px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
                    .chat-chip.active { background:var(--color-vermillion); color:#fff; border-color:var(--color-vermillion); }
                    .chat-chip-new { background:var(--color-vermillion-pale); border-color:var(--color-vermillion); color:var(--color-vermillion-dark); font-weight:600; }
                    .chat-chip .chat-chip-del { margin-left:4px; opacity:.6; cursor:pointer; padding:0 2px; }
                    #chatMessages { flex:1; overflow-y:auto; padding:12px 2px; display:flex; flex-direction:column; gap:10px; }
                    .msg-bubble { max-width:82%; padding:10px 14px; border-radius:12px; line-height:1.8; white-space:pre-wrap; word-break:break-word; font-size:var(--text-sm); }
                    .msg-user { align-self:flex-end; background:rgba(192,64,64,0.1); border:1px solid rgba(192,64,64,0.25); }
                    .msg-ai { align-self:flex-start; background:rgba(255,252,248,0.92); border:1px solid rgba(184,134,11,0.2); }
                    .msg-cursor::after { content:'▍'; animation:chatBlink 1s steps(1) infinite; color:var(--color-vermillion); }
                    @keyframes chatBlink { 50% { opacity:0; } }
                    .reasoning-fold { font-size:var(--text-xs); color:var(--color-ink-pale); cursor:pointer; margin-top:6px; user-select:none; }
                    .reasoning-content { display:none; font-size:var(--text-xs); color:var(--color-ink-soft); background:rgba(59,94,139,0.05); border-radius:6px; padding:6px 8px; margin-top:4px; white-space:pre-wrap; }
                    .reasoning-content.open { display:block; }
                    .msg-link { display:inline-block; margin-top:6px; font-size:var(--text-xs); color:var(--color-blue-porcelain); cursor:pointer; text-decoration:underline; }
                    .chat-empty { text-align:center; color:var(--color-ink-pale); padding:30px 10px; font-size:var(--text-sm); line-height:2; }
                    .chat-quick-chips { display:flex; flex-wrap:wrap; gap:8px; justify-content:center; margin-top:14px; }
                    .quick-chip { padding:6px 12px; border-radius:20px; background:var(--color-bronze-pale); font-size:var(--text-sm); cursor:pointer; color:var(--color-bronze-dark); border:1px solid rgba(184,134,11,0.25); }
                    .chat-input-row { display:flex; gap:8px; align-items:flex-end; flex:0 0 auto; padding-top:10px; }
                    #chatInput { flex:1; resize:none; min-height:48px; max-height:120px; padding:10px 12px; border:1px solid var(--color-line); border-radius:10px; font-family:var(--font-body); font-size:var(--text-base); background:var(--color-card); }
                    .chat-danger-banner { background:rgba(192,64,64,0.12); border:1px solid rgba(192,64,64,0.4); color:var(--color-vermillion-dark); font-weight:700; padding:10px 14px; border-radius:10px; margin:8px 0; font-size:var(--text-sm); line-height:1.8; }
                    .chat-actions { display:flex; gap:8px; margin-top:8px; }
                </style>

                <div class="page-header" style="margin-bottom:var(--space-sm);">
                    <h2 class="page-title">
                        <span class="seal-stamp">问</span>
                        AI 在线问诊
                    </h2>
                    <p class="page-subtitle">与 GLM 智能问诊助手对话，获取中医健康科普与调理参考</p>
                </div>

                <div class="chat-sessions" id="chatSessions"></div>
                <div id="chatMessages"></div>
                <div class="chat-actions">
                    <button class="btn btn-outline btn-sm" id="chatClearBtn">🗑 清空会话</button>
                    <button class="btn btn-outline btn-sm" id="chatExportBtn">📄 导出对话</button>
                </div>
                <div class="chat-input-row">
                    <textarea id="chatInput" rows="2" placeholder="描述您的身体不适或想咨询的问题…（Enter 发送，Shift+Enter 换行）" aria-label="问诊输入框"></textarea>
                    <button class="btn btn-primary" id="chatSendBtn">发送</button>
                    <button class="btn btn-ghost" id="chatStopBtn" style="display:none;">⏹ 停止</button>
                </div>

                <div style="margin-top:var(--space-md); font-size:var(--text-xs); color:var(--color-ink-pale); line-height:1.9;">
                    <p><strong>免责声明：</strong>本系统仅供中医知识学习和健康参考，不构成医疗诊断或治疗建议。如有身体不适，请及时前往正规医疗机构就诊，遵循专业医师的指导。</p>
                    <p>⚠ 提示：对话内容将发送至第三方 AI 服务（智谱 GLM-4.7）处理，请勿输入手机号、身份证等隐私信息；对话记录仅保存在本机浏览器。</p>
                </div>
            </div>
        `;
        this._activeMessages = null;
        this.bindEvents(container);
        this._renderSessions(container);
        this._renderMessages(container);
    }

    bindEvents(container) {
        const sendBtn = container.querySelector('#chatSendBtn');
        const stopBtn = container.querySelector('#chatStopBtn');
        const input = container.querySelector('#chatInput');
        const clearBtn = container.querySelector('#chatClearBtn');
        const exportBtn = container.querySelector('#chatExportBtn');

        const doSend = () => this._send(container);
        if (sendBtn) sendBtn.addEventListener('click', doSend);
        if (stopBtn) stopBtn.addEventListener('click', () => this._stop(container));
        if (input) {
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); doSend(); }
            });
        }
        if (clearBtn) clearBtn.addEventListener('click', () => this._clearSession(container));
        if (exportBtn) exportBtn.addEventListener('click', () => this._exportSession(container));

        container.querySelectorAll('.quick-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                if (!input) return;
                input.value = chip.dataset.q || '';
                doSend();
            });
        });
    }

    // ---------- 会话列表 ----------
    _renderSessions(container) {
        const box = container.querySelector('#chatSessions');
        if (!box) return;
        const sessions = ChatSessions.list();
        const activeId = this.activeSessionId;
        const chips = ['<span class="chat-chip chat-chip-new" data-sid="new">＋ 新会话</span>'];
        sessions.slice(0, 20).forEach(s => {
            chips.push(`<span class="chat-chip ${s.id === activeId ? 'active' : ''}" data-sid="${s.id}" title="${this._esc(s.title)}">
                ${this._esc((s.title || '新会话').slice(0, 10))}<span class="chat-chip-del" data-del="${s.id}">✕</span>
            </span>`);
        });
        box.innerHTML = chips.join('');
        box.querySelectorAll('.chat-chip[data-sid]').forEach(chip => {
            chip.addEventListener('click', (e) => {
                if (e.target.classList.contains('chat-chip-del')) {
                    e.stopPropagation();
                    ChatSessions.remove(chip.dataset.sid);
                    if (this.activeSessionId === chip.dataset.sid) {
                        this.activeSessionId = null;
                        this.activeSession = null;
                    }
                    this._renderSessions(container);
                    this._renderMessages(container);
                    return;
                }
                const sid = chip.dataset.sid;
                if (sid === 'new') {
                    this.activeSessionId = null;
                    this.activeSession = null;
                } else {
                    this.activeSessionId = sid;
                    this.activeSession = ChatSessions.get(sid);
                }
                this._renderSessions(container);
                this._renderMessages(container);
            });
        });
    }

    // ---------- 消息区 ----------
    _renderMessages(container) {
        const box = container.querySelector('#chatMessages');
        if (!box) return;
        const session = this.activeSession;
        if (!session || !session.messages || session.messages.length === 0) {
            box.innerHTML = `
                <div class="chat-empty">
                    您好，我是岐黄 AI 助手 🙏<br>
                    可以描述您的身体不适、生活习惯或中医养生疑问，我会结合中医理论给出科普与调理参考。<br>
                    <div class="chat-quick-chips">
                        <span class="quick-chip" data-q="最近总是失眠多梦，是怎么回事，如何调理？">🌙 失眠多梦</span>
                        <span class="quick-chip" data-q="口干口苦、舌苔发黄是什么原因？">☕ 口干口苦</span>
                        <span class="quick-chip" data-q="总感觉很累、没精神，气虚体质怎么调理？">⚡ 易疲劳</span>
                        <span class="quick-chip" data-q="怕冷手脚冰凉，阳虚体质平时要注意什么？">🧊 怕冷</span>
                    </div>
                </div>
            `;
            box.querySelectorAll('.quick-chip').forEach(chip => {
                chip.addEventListener('click', () => {
                    const input = container.querySelector('#chatInput');
                    if (!input) return;
                    input.value = chip.dataset.q || '';
                    this._send(container);
                });
            });
            return;
        }
        box.innerHTML = '';
        session.messages.forEach(m => {
            box.appendChild(this._renderBubble(m, container));
        });
        box.scrollTop = box.scrollHeight;
    }

    _renderBubble(msg, container) {
        // 渲染防御：历史消息 content 可能是对象（旧版脏数据），强制转字符串，避免显示 [object Object]
        const content = typeof msg.content === 'string' ? msg.content
            : (msg.content && typeof msg.content.message === 'string') ? msg.content.message
            : '';
        const wrap = document.createElement('div');
        if (msg.role === 'user') {
            wrap.className = 'msg-bubble msg-user';
            wrap.textContent = content;
        } else {
            wrap.className = 'msg-bubble msg-ai';
            const text = document.createElement('div');
            text.textContent = content;
            wrap.appendChild(text);
            if (msg.reasoning) {
                const fold = document.createElement('div');
                fold.className = 'reasoning-fold';
                fold.textContent = '🧠 思考过程 ▾';
                const body = document.createElement('div');
                body.className = 'reasoning-content';
                body.textContent = msg.reasoning;
                fold.addEventListener('click', () => body.classList.toggle('open'));
                wrap.appendChild(fold);
                wrap.appendChild(body);
            }
            this._maybeAddSyndromeLink(wrap, content, container);
        }
        return wrap;
    }

    // 回复中命中证型名时，在气泡下加「查看详情→」链接
    _maybeAddSyndromeLink(wrap, content, container) {
        if (typeof syndromesDatabase === 'undefined' || !content) return;
        const hit = syndromesDatabase.find(s => s.name && content.indexOf(s.name) !== -1);
        if (!hit) return;
        const link = document.createElement('span');
        link.className = 'msg-link';
        link.textContent = '「' + hit.name + '」详情 →';
        link.addEventListener('click', () => {
            if (typeof DetailModal !== 'undefined') DetailModal.open('syndrome', hit.id);
        });
        wrap.appendChild(link);
    }

    // ---------- 发送主流程 ----------
    _ensureSession() {
        if (this.activeSession) return this.activeSession;
        this.activeSession = { id: 'chat_' + Date.now(), time: Date.now(), title: '新会话', messages: [] };
        this.activeSessionId = this.activeSession.id;
        return this.activeSession;
    }

    async _send(container) {
        if (this.streaming) return;
        const input = container.querySelector('#chatInput');
        const raw = (input && input.value || '').trim();
        if (!raw) return;
        if (typeof GLMChat === 'undefined') { Toast.show('AI 对话组件未加载', 'warning'); return; }
        if (!GLMChat.checkFrontRateLimit()) {
            Toast.show('发送太频繁，请 60 秒后再试', 'warning');
            return;
        }
        const text = GLMChat.sanitize(raw);   // 1. 输入脱敏
        if (input) input.value = '';

        // 2. 追加用户消息并渲染
        const session = this._ensureSession();
        session.messages.push({ role: 'user', content: text, time: Date.now() });
        this._renderMessages(container);

        // 3. 组装请求消息（system + 历史 + 新 user）
        let profile = null, recent = [];
        if (typeof Profile !== 'undefined' && Profile.get) profile = Profile.get();
        if (typeof Records !== 'undefined' && Records.list) recent = Records.list().slice(0, 3);
        const system = GLMChat.buildSystemPrompt(profile, recent);
        // 关键修复：历史消息 content 强制转字符串，防止脏数据（对象/数组）原样发给 GLM
        // 导致模型把 "[object Object]" 当文本回复
        const apiMessages = [{ role: 'system', content: system }]
            .concat(session.messages.map(m => ({
                role: m.role,
                content: typeof m.content === 'string' ? m.content : (m.content && m.content.message) || String(m.content || '')
            })));

        // 4. 渲染（前端模拟打字效果，实际由代理非流式一次性返回完整文本）
        this.abortController = new AbortController();
        this.streaming = true;
        this._setLoadingState(container, true);

        const box = container.querySelector('#chatMessages');
        const aiBubble = document.createElement('div');
        aiBubble.className = 'msg-bubble msg-ai msg-cursor';
        const textEl = document.createElement('div');
        aiBubble.appendChild(textEl);
        box.appendChild(aiBubble);
        box.scrollTop = box.scrollHeight;

        let reply = '';
        try {
            reply = await GLMChat.streamChat(apiMessages, {
                signal: this.abortController.signal
                // 注：当前为非流式，streamChat 内部忽略 onDelta/onReasoning，直接返回完整文本
            });
            // 前端模拟打字：逐字写入气泡（避免一次性 setTextContent 显得突兀）
            // 双重防御：reply 类型检查，避免非字符串（如异常对象）变成 "[object Object]"
            const replyStr = typeof reply === 'string' ? reply : (reply && typeof reply.message === 'string' ? reply.message : '');
            if (replyStr) {
                const chars = Array.from(replyStr);
                let i = 0;
                const step = chars.length > 200 ? 3 : 1; // 长文 3 字/次、短文 1 字/次
                const timer = setInterval(() => {
                    if (this.abortController && this.abortController.signal.aborted) { clearInterval(timer); return; }
                    textEl.textContent += chars.slice(i, i + step).join('');
                    i += step;
                    box.scrollTop = box.scrollHeight;
                    if (i >= chars.length) clearInterval(timer);
                }, 12);
            }
        } catch (err) {
            textEl.textContent += (err && err.message) || '对话失败，请稍后重试';
        } finally {
            this.streaming = false;
            this.abortController = null;
            aiBubble.classList.remove('msg-cursor');
            this._setLoadingState(container, false);
        }
        if (!reply) return; // 失败不落盘

        // 5. 落盘 + 标题
        session.messages.push({ role: 'assistant', content: reply, time: Date.now() });
        if (!session.title || session.title === '新会话') {
            const first = session.messages.find(m => m.role === 'user');
            const firstText = first && typeof first.content === 'string' ? first.content : '';
            session.title = (firstText || '新会话').slice(0, 15);
        }
        ChatSessions.save(session);
        this.activeSessionId = session.id;
        this._renderSessions(container);
        this._maybeAddSyndromeLink(aiBubble, reply, container);

        // 6. 危险信号扫描
        this._checkDanger(reply, container);
    }

    _stop(container) {
        if (this.abortController) this.abortController.abort();
    }

    _setLoadingState(container, loading) {
        const sendBtn = container.querySelector('#chatSendBtn');
        const stopBtn = container.querySelector('#chatStopBtn');
        const input = container.querySelector('#chatInput');
        if (sendBtn) { sendBtn.disabled = loading; sendBtn.textContent = loading ? '回复中…' : '发送'; }
        if (stopBtn) stopBtn.style.display = loading ? 'inline-flex' : 'none';
        if (input) input.disabled = loading;
    }

    // ---------- 危险信号扫描（复用 danger-signals 关键词表） ----------
    _checkDanger(reply, container) {
        if (!reply || typeof DANGER_SIGNALS === 'undefined') return;
        const hit = Object.keys(DANGER_SIGNALS).find(kw => reply.indexOf(kw) !== -1);
        if (!hit) return;
        const box = container.querySelector('#chatMessages');
        if (!box) return;
        const banner = document.createElement('div');
        banner.className = 'chat-danger-banner';
        banner.textContent = '⚠ 提示：您提到的内容包含高风险症状信号（如"'+hit+'"），请立即前往正规医疗机构或急诊就医，切勿延误。';
        box.appendChild(banner);
        box.scrollTop = box.scrollHeight;
    }

    // ---------- 清空 / 导出 ----------
    _clearSession(container) {
        if (!this.activeSession) return;
        if (!confirm('确定删除当前会话吗？删除后不可恢复。')) return;
        ChatSessions.remove(this.activeSession.id);
        this.activeSession = null;
        this.activeSessionId = null;
        this._renderSessions(container);
        this._renderMessages(container);
        Toast.show('会话已删除', 'success');
    }

    _exportSession(container) {
        const session = this.activeSession;
        if (!session || !session.messages || !session.messages.length) {
            Toast.show('当前会话为空，无可导出内容', 'warning');
            return;
        }
        const lines = ['# 岐黄 AI 问诊记录', '', '时间：' + new Date(session.time).toLocaleString('zh-CN'), '标题：' + session.title, ''];
        session.messages.forEach(m => {
            const c = typeof m.content === 'string' ? m.content : (m.content && typeof m.content.message === 'string' ? m.content.message : '');
            lines.push('## ' + (m.role === 'user' ? '用户' : 'AI 助手') + '（' + new Date(m.time).toLocaleString('zh-CN') + '）');
            lines.push('');
            lines.push(c);
            lines.push('');
        });
        lines.push('---');
        lines.push('本记录由岐黄·辅助诊疗系统生成，仅供健康参考，不构成医疗诊断。');
        const fname = '岐黄AI问诊_' + new Date(session.time).toISOString().slice(0, 10) + '.md';
        if (typeof ExportUtils !== 'undefined' && ExportUtils.downloadText) {
            ExportUtils.downloadText(fname, lines.join('\n'), 'text/markdown;charset=utf-8');
            Toast.show('已导出问诊记录', 'success');
        } else {
            Toast.show('导出工具未加载', 'warning');
        }
    }

    _esc(v) {
        return String(v || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }
}

// 浏览器全局导出
if (typeof window !== 'undefined') {
    window.ChatSessions = ChatSessions;
    window.ChatModule = ChatModule;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ChatSessions, ChatModule };
}
