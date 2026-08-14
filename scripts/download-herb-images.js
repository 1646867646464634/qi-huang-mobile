/**
 * 岐黄·辅助诊疗系统 — 图片下载到本地脚本
 * 读取 herb-images.js，用 curl 下载所有有 URL 的图片到 assets/images/herbs/ 本地目录，
 * 后续改 herb.js 渲染优先使用本地路径（@local/original.jpg），无需网络即可查看。
 *
 * 用法：node scripts/download-herb-images.js
 * 前提：系统有 curl，且网络可访问 upload.wikimedia.org（需代理则设置 HTTPS_PROXY）。
 */
const path = require('path');
const fs = require('fs');
const { execFileSync } = require('child_process');

const base = path.join(__dirname, '..');
const herbImagesFile = path.join(base, 'js', 'data', 'herb-images.js');
const imgDir = path.join(base, 'assets', 'images', 'herbs');
fs.mkdirSync(imgDir, { recursive: true });

// 解析 URL
const src = fs.readFileSync(herbImagesFile, 'utf8');
const re = /"(herb_\d{3})": \{[^}]*?originalUrl:\s*"(https?:\/\/[^"]+)"/gs;
let m, downloaded = 0;
while ((m = re.exec(src)) !== null) {
    const herbId = m[1];
    const url = m[2];
    if (!url) continue;
    const dir = path.join(imgDir, herbId);
    fs.mkdirSync(dir, { recursive: true });
    const dest = path.join(dir, 'original.jpg');
    try {
        console.log(`下载 ${herbId}...`);
        execFileSync('curl', ['-sL', '--max-time', '30', '-o', dest, url], { timeout: 35000 });
        if (fs.statSync(dest).size > 1000) {
            downloaded++;
            console.log(`  ✅ ${herbId} → ${dest} (${(fs.statSync(dest).size / 1024).toFixed(0)} KB)`);
        } else {
            fs.unlinkSync(dest);
            console.log(`  ⚠️ ${herbId} 文件过小，已删除`);
        }
    } catch (e) {
        console.log(`  ❌ ${herbId} 下载失败: ${e.message}`);
    }
}
console.log(`\n完成：${downloaded} 张图片已下载到 ${imgDir}`);
console.log('后续需修改 herb.js 让前端优先读本地路径。');
