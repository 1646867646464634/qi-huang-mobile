// ===== 岐黄·辅助诊疗系统 - DOM操作工具 =====
const DOM = {
    $(selector, parent = document) {
        return parent.querySelector(selector);
    },
    
    $$(selector, parent = document) {
        return Array.from(parent.querySelectorAll(selector));
    },
    
    create(tag, attrs = {}, children = []) {
        const el = document.createElement(tag);
        Object.entries(attrs).forEach(([key, value]) => {
            if (key === 'className') {
                el.className = value;
            } else if (key === 'innerHTML') {
                el.innerHTML = value;
            } else if (key.startsWith('on')) {
                el.addEventListener(key.slice(2).toLowerCase(), value);
            } else {
                el.setAttribute(key, value);
            }
        });
        children.forEach(child => {
            if (typeof child === 'string') {
                el.appendChild(document.createTextNode(child));
            } else if (child) {
                el.appendChild(child);
            }
        });
        return el;
    },
    
    on(el, event, handler) {
        el.addEventListener(event, handler);
    },
    
    off(el, event, handler) {
        el.removeEventListener(event, handler);
    },
    
    show(el, display = 'block') {
        el.style.display = display;
    },
    
    hide(el) {
        el.style.display = 'none';
    },
    
    addClass(el, className) {
        el.classList.add(className);
    },
    
    removeClass(el, className) {
        el.classList.remove(className);
    },
    
    toggleClass(el, className) {
        el.classList.toggle(className);
    }
};

// Toast通知
const Toast = {
    container: null,
    
    init() {
        this.container = DOM.create('div', { className: 'toast-container' });
        document.body.appendChild(this.container);
    },
    
    show(message, type = 'info', duration = 3000) {
        if (!this.container) this.init();
        
        const toast = DOM.create('div', {
            className: `toast toast-${type}`,
            innerHTML: message
        });
        
        this.container.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }
};
