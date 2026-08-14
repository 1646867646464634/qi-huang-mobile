// ===== 岐黄·辅助诊疗系统 - 用户画像模块 =====
// 本地存储个人背景信息（年龄/性别/地域/过敏史/慢病史/孕产状态），
// 供体质调理、方剂推荐做个性化过滤与提示。
const PROFILE_KEY = 'tcm_profile';

const Profile = {
    get() {
        return Storage.get(PROFILE_KEY, null);
    },
    save(profile) {
        Storage.set(PROFILE_KEY, Object.assign({}, profile, { time: Date.now() }));
        EventBus.emit('profile:changed', profile);
        return profile;
    },
    clear() {
        Storage.remove(PROFILE_KEY);
        EventBus.emit('profile:changed', null);
    },
    // 是否有妊娠/哺乳状态
    isPregnantOrNursing() {
        const p = this.get();
        return !!p && ['pregnant', 'nursing'].includes(p.pregnancyState);
    }
};

class ProfileModule {
    constructor() {
        this.profile = Profile.get() || {};
    }

    destroy() {}

    render(container) {
        const p = this.profile;
        const ageOptions = ['18岁以下', '18-30岁', '31-45岁', '46-60岁', '60岁以上'];
        const regionOptions = ['华北', '东北', '华东', '华中', '华南', '西南', '西北', '港澳台', '海外'];
        const pregOptions = [
            { value: 'not', label: '未孕/不适用' },
            { value: 'pregnant', label: '妊娠期' },
            { value: 'nursing', label: '哺乳期' },
            { value: 'unsure', label: '不确定' }
        ];

        container.innerHTML = `
            <div class="module-page profile-page">
                <div class="page-header">
                    <h2 class="page-title">
                        <span class="seal-stamp">像</span>
                        我的画像
                    </h2>
                    <p class="page-subtitle">完善个人背景，获得更贴合自身体质的调理与用药参考（数据仅存本机）</p>
                </div>

                <div class="card" style="margin-bottom: var(--space-lg);">
                    <h4 style="font-family:var(--font-heading);color:var(--color-vermillion-dark);margin-bottom: var(--space-md);">基本信息</h4>

                    <div class="form-field-group" style="margin-bottom: var(--space-lg);">
                        <label class="form-field-label">年龄段</label>
                        <div class="form-option-grid" style="display:flex;flex-wrap:wrap;gap:8px;">
                            ${ageOptions.map(a => `
                                <label class="form-option-chip" style="display:inline-flex;align-items:center;gap:6px;padding:8px 14px;border:1px solid var(--color-line,#e2d9cc);border-radius:20px;cursor:pointer;font-size:var(--text-sm);">
                                    <input type="radio" name="pfAge" value="${a}" ${p.age === a ? 'checked' : ''} style="accent-color:var(--color-vermillion,#C04040);">
                                    <span>${a}</span>
                                </label>
                            `).join('')}
                        </div>
                    </div>

                    <div class="form-field-group" style="margin-bottom: var(--space-lg);">
                        <label class="form-field-label">性别</label>
                        <div class="form-option-grid" style="display:flex;flex-wrap:wrap;gap:8px;">
                            ${['男', '女', '其他'].map(g => `
                                <label class="form-option-chip" style="display:inline-flex;align-items:center;gap:6px;padding:8px 14px;border:1px solid var(--color-line,#e2d9cc);border-radius:20px;cursor:pointer;font-size:var(--text-sm);">
                                    <input type="radio" name="pfGender" value="${g}" ${p.gender === g ? 'checked' : ''} style="accent-color:var(--color-vermillion,#C04040);">
                                    <span>${g}</span>
                                </label>
                            `).join('')}
                        </div>
                    </div>

                    <div class="form-field-group" style="margin-bottom: var(--space-lg);">
                        <label class="form-field-label">所在地区</label>
                        <select class="search-input" name="pfRegion" style="max-width:300px;">
                            <option value="">— 请选择 —</option>
                            ${regionOptions.map(r => `<option value="${r}" ${p.region === r ? 'selected' : ''}>${r}</option>`).join('')}
                        </select>
                    </div>

                    <div class="form-field-group" style="margin-bottom: var(--space-lg);">
                        <label class="form-field-label">孕产状态</label>
                        <div class="form-option-grid" style="display:flex;flex-wrap:wrap;gap:8px;">
                            ${pregOptions.map(o => `
                                <label class="form-option-chip" style="display:inline-flex;align-items:center;gap:6px;padding:8px 14px;border:1px solid var(--color-line,#e2d9cc);border-radius:20px;cursor:pointer;font-size:var(--text-sm);">
                                    <input type="radio" name="pfPreg" value="${o.value}" ${p.pregnancyState === o.value ? 'checked' : ''} style="accent-color:var(--color-vermillion,#C04040);">
                                    <span>${o.label}</span>
                                </label>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <div class="card" style="margin-bottom: var(--space-lg);">
                    <h4 style="font-family:var(--font-heading);color:var(--color-vermillion-dark);margin-bottom: var(--space-sm);">健康信息</h4>
                    <div style="margin-bottom: var(--space-md);">
                        <label class="form-field-label" style="display:block;margin-bottom:6px;">过敏史（中药/食物等，可多填，逗号分隔）</label>
                        <input type="text" class="search-input" id="pfAllergy" value="${this._esc(p.allergyHistory || '')}" placeholder="如：青霉素、海鲜…" style="width:100%;">
                    </div>
                    <div style="margin-bottom: var(--space-md);">
                        <label class="form-field-label" style="display:block;margin-bottom:6px;">慢性病史（如高血压、糖尿病等）</label>
                        <input type="text" class="search-input" id="pfChronic" value="${this._esc(p.chronicDisease || '')}" placeholder="如：高血压、胃炎…" style="width:100%;">
                    </div>
                </div>

                <div style="display:flex;gap:10px;flex-wrap:wrap;">
                    <button class="btn btn-primary" id="pfSaveBtn">💾 保存画像</button>
                    <button class="btn btn-ghost" id="pfClearBtn">清空画像</button>
                </div>

                <div class="disclaimer" style="margin-top: var(--space-xl);">
                    <strong>隐私说明：</strong>您的画像数据仅保存在本机浏览器 localStorage 中，不上传任何服务器，可随时清空。
                </div>
            </div>
        `;

        this.bindEvents(container);
    }

    bindEvents(container) {
        // 单选选中态
        container.querySelectorAll('.form-option-chip input').forEach(inp => {
            inp.addEventListener('change', () => {
                const group = inp.closest('.form-option-grid');
                group.querySelectorAll('.form-option-chip').forEach(c => c.classList.remove('chip-selected'));
                if (inp.checked) inp.closest('.form-option-chip').classList.add('chip-selected');
            });
            if (inp.checked) inp.closest('.form-option-chip').classList.add('chip-selected');
        });

        container.querySelector('#pfSaveBtn').addEventListener('click', () => {
            const getRadio = (name) => {
                const el = container.querySelector(`input[name="${name}"]:checked`);
                return el ? el.value : '';
            };
            const profile = {
                age: getRadio('pfAge'),
                gender: getRadio('pfGender'),
                region: container.querySelector('select[name="pfRegion"]').value,
                pregnancyState: getRadio('pfPreg'),
                allergyHistory: container.querySelector('#pfAllergy').value.trim(),
                chronicDisease: container.querySelector('#pfChronic').value.trim()
            };
            Profile.save(profile);
            Toast.show('画像已保存 ✓', 'success');
        });

        container.querySelector('#pfClearBtn').addEventListener('click', () => {
            if (confirm('确定清空画像数据吗？')) {
                Profile.clear();
                this.profile = {};
                this.render(container);
                Toast.show('画像已清空', 'info');
            }
        });
    }

    _esc(v) {
        return String(v || '').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
}

if (typeof window !== 'undefined') {
    window.Profile = Profile;
    window.ProfileModule = ProfileModule;
}
