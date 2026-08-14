/**
 * 岐黄·辅助诊疗系统 — 中药图片自动抓取脚本（Wikimedia Commons）
 * 运行：node scripts/fetch-herb-images.js [起始序号] [数量]
 * 功能：对 herb-images.js 中 originalUrl 为空的药材，按拉丁学名调用 Wikimedia Commons
 *       API 搜索真实存在的图片文件，填充 originalUrl（原貌图）；再尝试按"中药名+饮片/切片"
 *       补充 yinpianUrl（饮片图，资源稀缺，找不到则留空）。
 *
 * ⚠️ 使用须知：
 *  - Wikimedia Commons 在中国大陆网络环境通常需要代理才能访问。
 *    请先设置代理环境变量再运行，例如：
 *      set HTTPS_PROXY=http://127.0.0.1:7890        （Windows CMD）
 *      export HTTPS_PROXY=http://127.0.0.1:7890      （macOS / Linux / Git Bash）
 *    脚本会自动读取 HTTPS_PROXY / HTTP_PROXY。
 *  - 自动搜索到的文件名均来自 Commons API 返回结果，真实存在；但**许可证仍需人工复核**
 *    （Own work / CC BY-SA / PD 各有要求），正式发布前请务必逐张确认。
 *  - 默认只更新脚本所运行的这一批；可重复运行直至全部填充。
 */
const path = require('path');
const fs = require('fs');
const https = require('https');
const http = require('http');
const { URL } = require('url');

const base = path.join(__dirname, '..', 'js', 'data');
const imagesFile = path.join(base, 'herb-images.js');
const { herbsDatabase } = require(path.join(base, 'herbs-database.js'));

const API = 'https://commons.wikimedia.org/w/api.php';
const FPH = 'https://commons.wikimedia.org/wiki/Special:FilePath/';

// 根据精确文件名获取 upload.wikimedia.org 直链（优先），失败则返回 Special:FilePath
async function getDirectUrl(filename) {
    try {
        const url = `${API}?action=query&format=json&prop=imageinfo&iiprop=url&titles=File:${encodeURIComponent(filename)}`;
        const json = await getJson(url);
        const pages = json.query && json.query.pages;
        if (!pages) return null;
        const page = Object.values(pages).find(p => p.imageinfo && p.imageinfo[0]);
        if (page) {
            const direct = page.imageinfo[0].url;
            // 去掉 ?utm_source=... 查询参数
            return direct ? direct.replace(/\?.*$/, '') : null;
        }
    } catch (e) { /* fall through */ }
    return null;
}

// 代理支持：读取 HTTPS_PROXY / HTTP_PROXY 环境变量
function createAgent(proxyUrl) {
    if (!proxyUrl) return null;
    try {
        const p = new URL(proxyUrl);
        const factory = p.protocol === 'http:' ? http : https;
        return new factory.Agent({ host: p.hostname, port: p.port || (p.protocol === 'http:' ? 80 : 443) });
    } catch (e) { return null; }
}
const proxy = process.env.HTTPS_PROXY || process.env.https_proxy || process.env.HTTP_PROXY || process.env.http_proxy || '';
const agent = createAgent(proxy);
if (agent) console.log('已启用代理：' + proxy);

// 从 herb-images.js 读取当前配置（简易解析，避免 eval 网络内容）
function readImages() {
    const src = fs.readFileSync(imagesFile, 'utf8');
    const images = {};
    const re = /"herb_\d{3}":\s*\{\s*\/\/\s*([^\n]*)\n\s*originalUrl:\s*"([^"]*)",\n\s*yinpianUrl:\s*"([^"]*)",\n\s*note:\s*"([^"]*)"/g;
    let m;
    while ((m = re.exec(src)) !== null) {
        const id = m[0].match(/"herb_\d{3}"/)[0].replace(/"/g, '');
        images[id] = { name: m[1].trim(), originalUrl: m[2], yinpianUrl: m[3], note: m[4] };
    }
    return images;
}

function writeImages(images) {
    const src = fs.readFileSync(imagesFile, 'utf8');
    // 只替换 originalUrl/yinpianUrl/note 行，保留注释与结构
    const lines = src.split('\n');
    const out = lines.map(line => {
        const om = line.match(/^(\s*originalUrl:\s*")[^"]*(",)/);
        const ym = line.match(/^(\s*yinpianUrl:\s*")[^"]*(",)/);
        const nm = line.match(/^(\s*note:\s*")[^"]*(",)/);
        if (om || ym || nm) {
            // 找所属 herbId：向前找最近一行 "herb_xxx"
            return line; // 由下方按 id 重建整段
        }
        return line;
    });
    fs.writeFileSync(imagesFile, out.join('\n'), 'utf8');
}

// 重建整个数据段（更可靠）：用模板重写，保留顶部注释
function rebuildImagesFile(images) {
    const src = fs.readFileSync(imagesFile, 'utf8');
    const header = src.slice(0, src.indexOf('const herbImages = {'));
    const parts = [];
    parts.push(header + 'const herbImages = {');
    herbsDatabase.forEach(h => {
        const img = images[h.id] || { originalUrl: '', yinpianUrl: '', note: '' };
        parts.push(`    "${h.id}": { // ${h.name}（${h.latinName || ''}）`);
        parts.push(`        originalUrl: "${img.originalUrl || ''}",`);
        parts.push(`        yinpianUrl: "${img.yinpianUrl || ''}",`);
        parts.push(`        note: "${(img.note || '').replace(/"/g, '')}"`);
        parts.push('    },');
    });
    parts.push('};');
    parts.push('');
    parts.push('// 按 herbId 取影像（无则返回 null）');
    parts.push('herbImages.get = function (herbId) {');
    parts.push('    return herbImages[herbId] || null;');
    parts.push('};');
    parts.push('');
    parts.push("if (typeof window !== 'undefined') {");
    parts.push('    window.herbImages = herbImages;');
    parts.push('}');
    parts.push("if (typeof module !== 'undefined' && module.exports) {");
    parts.push('    module.exports = { herbImages };');
    parts.push('}');
    parts.push('');
    fs.writeFileSync(imagesFile, parts.join('\n'), 'utf8');
}

function getJson(url) {
    return new Promise((resolve, reject) => {
        // 优先用 curl（原生支持 --proxy，Windows/macOS/Linux 通用；Node 原生 https 不支持代理）
        const { execFile } = require('child_process');
        const args = ['-s', '--max-time', '20', '-A', 'Qihuang-TCM-Study/1.0'];
        if (proxy) args.push('--proxy', proxy);
        args.push(url);
        execFile('curl', args, { timeout: 25000 }, (err, stdout) => {
            if (err) {
                // 回退：直连（无代理）
                const fallback = require('https').get(url, { headers: { 'User-Agent': 'Qihuang-TCM-Study/1.0' } }, res => {
                    let data = '';
                    res.on('data', c => data += c);
                    res.on('end', () => {
                        try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
                    });
                });
                fallback.on('error', reject);
                return;
            }
            try { resolve(JSON.parse(stdout)); } catch (e) { reject(e); }
        });
    });
}

// 生成多级搜索词：优先拉丁学名，逐级简化，最后中文名
function buildQueries(herb) {
    const qs = [];
    const latin = (herb.latinName || '').trim();
    if (latin) {
        qs.push(latin);
        // 去掉括号部分（作者名/异名）
        const simple = latin.replace(/\([^)]*\)/g, '').replace(/\s+/g, ' ').trim();
        if (simple && simple !== latin) qs.push(simple);
        // 只取前两个词（属+种）
        const genusSpecies = simple.split(' ').slice(0, 2).join(' ');
        if (genusSpecies && genusSpecies !== simple) qs.push(genusSpecies);
    }
    if (herb.name) qs.push(herb.name);
    return qs;
}

// 按多级搜索词找第一个真实存在的图片文件
async function searchFirstFile(queries, limit = 3) {
    for (const q of queries) {
        const url = `${API}?action=query&list=search&srnamespace=6&srsearch=${encodeURIComponent(q)}&format=json&srlimit=${limit}`;
        try {
            const json = await getJson(url);
            // 限流检测
            if (typeof json === 'object' && json.error && /too many requests/i.test(JSON.stringify(json.error))) {
                throw new Error('API_LIMIT');
            }
            const hits = (json.query && json.query.search) || [];
            const img = hits.find(h => /\.(jpe?g|png|gif|webp|tiff?)$/i.test(h.title));
            if (img) return { file: img.title.replace(/^File:/, ''), query: q };
        } catch (e) {
            if (e.message === 'API_LIMIT') throw e; // 向上抛出，停止本轮
            /* 继续下一个搜索词 */
        }
    }
    return null;
}

async function main() {
    const startIdx = parseInt(process.argv[2] || '1', 10);
    const batch = parseInt(process.argv[3] || '20', 10);

    const images = readImages();
    // 找出待填充的药材（保持数据库顺序）
    const pending = herbsDatabase
        .map(h => ({ herb: h, img: images[h.id] }))
        .filter(x => x.img && !x.img.originalUrl);

    console.log(`待填充 ${pending.length} 味；本次处理第 ${startIdx}~${Math.min(startIdx + batch - 1, pending.length)} 位（共 ${batch} 味）`);
    console.log('（饮片图 Wikimedia Commons 资源稀缺，找不到自动留空）\n');

    let filled = 0, failed = 0;
    for (let i = startIdx - 1; i < Math.min(startIdx + batch - 1, pending.length); i++) {
        const { herb, img } = pending[i];
        const pos = i + 1;
        try {
            const queries = buildQueries(herb);
            const found = await searchFirstFile(queries);
            if (found) {
                const direct = await getDirectUrl(found.file);
                img.originalUrl = direct || (FPH + encodeURIComponent(found.file));
                img.note = `原貌图：${found.file}${direct ? '' : '（未获取到直链，使用重定向URL）'}`;
                filled++;
                console.log(`[${pos}/${pending.length}] ✅ ${herb.name}（${herb.latinName}）→ ${found.file}`);
            } else {
                img.note = `待补充：Commons 未搜到「${herb.latinName || herb.name}」图片`;
                console.log(`[${pos}/${pending.length}] ⚠️ ${herb.name} 未搜到图片`);
                failed++;
            }
            // 饮片图：尝试按名称搜索（命中率低）
            const yfound = await searchFirstFile([`"${herb.name}" 饮片`, `"${herb.name}" 切片`, `${herb.name} dried`]);
            if (yfound) {
                const ydirect = await getDirectUrl(yfound.file);
                img.yinpianUrl = ydirect || (FPH + encodeURIComponent(yfound.file));
                img.note += `；饮片图：${yfound.file}`;
            }
        } catch (e) {
            if (e.message === 'API_LIMIT') {
                console.log(`[${pos}/${pending.length}] ⛔ 触发 Wikimedia API 限流，请等待几分钟后从第 ${pos} 位继续运行（node scripts/fetch-herb-images.js ${pos} 50）。`);
                rebuildImagesFile(images);
                console.log(`已保存前 ${pos - 1} 味结果到 ${imagesFile}`);
                return;
            }
            failed++;
            console.log(`[${pos}/${pending.length}] ❌ ${herb.name} 请求失败：${e.message}`);
        }
        // 限速：尊重 Commons API 频率限制（限流约每分钟 30-60 请求，间隔取 1300ms 较稳妥）
        await new Promise(r => setTimeout(r, 1300));
    }

    rebuildImagesFile(images);
    console.log(`\n完成：成功 ${filled} 味，未找到/失败 ${failed} 味。已写入 ${imagesFile}`);
    console.log('请打开 herb-images.js 复核，并务必人工核验许可证后再发布。');
}

main().catch(e => { console.error('脚本异常：', e); process.exit(1); });
