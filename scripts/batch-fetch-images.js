// 同步批量抓取：用 execSync + curl 调 Commons API，自动搜索并填充
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const base = 'C:/Users/牢秦/Desktop/qihuang-deploy/js/data';
const { herbsDatabase } = require(path.join(base, 'herbs-database.js'));

const proxy = process.env.HTTPS_PROXY || process.env.https_proxy || 'http://127.0.0.1:7897';
const API = 'https://commons.wikimedia.org/w/api.php';

function curl(url) {
    try {
        return JSON.parse(execSync(`curl -s --max-time 15 --proxy ${proxy} "${url}"`, { timeout: 20000, encoding: 'utf8' }));
    } catch (e) { return null; }
}

// 读取当前已填充
const curSrc = fs.readFileSync(path.join(base, 'herb-images.js'), 'utf8');
const current = {};
const re = /"(herb_\d{3})": \{[\s\S]*?originalUrl: "([^"]*)"/g;
let m;
while ((m = re.exec(curSrc)) !== null) { if (m[2]) current[m[1]] = m[2]; }
console.log('当前已填充:', Object.keys(current).length, '味');

// 待填充的药材
const pending = herbsDatabase.filter(h => !current[h.id]);
console.log('待填充:', pending.length, '味\n');

let added = 0;
for (const h of pending) {
    const latin = (h.latinName || '').split(' ').slice(0, 2).join(' ');
    if (!/^[A-Z]/.test(latin)) continue; // 跳过非拉丁名

    // 搜索 Commons
    const searchUrl = `${API}?action=query&list=search&srnamespace=6&srsearch=${encodeURIComponent(latin)}&format=json&srlimit=3`;
    const json = curl(searchUrl);
    if (!json || !json.query || !json.query.search) continue;

    // 找第一个图片文件
    const hit = json.query.search.find(s => /\.(jpe?g|png|gif)$/i.test(s.title) && !/Wellcome|djvu|pdf|svg/i.test(s.title));
    if (!hit) continue;

    const filename = hit.title.replace(/^File:/, '');
    // 获取直链
    const infoUrl = `${API}?action=query&format=json&prop=imageinfo&iiprop=url&titles=${encodeURIComponent(hit.title)}`;
    const infoJson = curl(infoUrl);
    if (!infoJson || !infoJson.query || !infoJson.query.pages) continue;

    const page = Object.values(infoJson.query.pages).find(p => p.imageinfo && p.imageinfo[0]);
    if (!page) continue;

    const directUrl = page.imageinfo[0].url.replace(/\?.*$/, '');
    current[h.id] = directUrl;
    added++;
    console.log(`✅ ${h.id} ${h.name} → ${filename.slice(0, 40)}`);

    // 限速：用 Atomics.wait 做同步等待（兼容 Windows）
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 1200);
}

console.log(`\n本轮新增: ${added} 味 | 总计: ${Object.keys(current).filter(k => current[k]).length} 味`);

// 重建 herb-images.js
const yinpianRe = /"(herb_\d{3})": \{[\s\S]*?yinpianUrl: "([^"]*)"/g;
const yinpianMap = {};
let ym;
while ((ym = yinpianRe.exec(curSrc)) !== null) { if (ym[2]) yinpianMap[ym[1]] = ym[2]; }

const header = curSrc.slice(0, curSrc.indexOf('const herbImages = {'));
const parts = [header + 'const herbImages = {'];
herbsDatabase.forEach(h => {
    const o = current[h.id] || '';
    const y = yinpianMap[h.id] || '';
    parts.push(`    "${h.id}": { // ${h.name}`);
    parts.push(`        originalUrl: "${o}",`);
    parts.push(`        yinpianUrl: "${y}",`);
    parts.push(`        note: "${o ? '原貌图已填充' : '待补充：学名 ' + (h.latinName || '未知')}"`);
    parts.push('    },');
});
parts.push('};');
parts.push('herbImages.get=function(id){return herbImages[id]||null;};');
parts.push('if(typeof window!=="undefined"){window.herbImages=herbImages;};if(typeof module!=="undefined"&&module.exports){module.exports={herbImages};};');
fs.writeFileSync(path.join(base, 'herb-images.js'), parts.join('\n'), 'utf8');
console.log('✅ 已写入 herb-images.js');
