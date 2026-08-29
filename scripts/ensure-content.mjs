// بازگرداندن فایل‌های محتوای گم‌شده از نسخه seed
// (برای استقرار روی Railway — چون Volume در اولین اتصال خالی است)
// اجرا: node scripts/ensure-content.mjs
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const contentDir = path.join(root, 'content');
const seedDir = path.join(root, 'content-seed');
const FILES = ['site.json', 'prices.json', 'posts.json', 'faqs.json', 'testimonials.json'];

fs.mkdirSync(contentDir, { recursive: true });
let restored = 0;
for (const f of FILES) {
  const dest = path.join(contentDir, f);
  const src = path.join(seedDir, f);
  if (!fs.existsSync(dest) && fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log('↩ بازسازی شد:', f);
    restored++;
  }
}
console.log(restored === 0 ? '✓ همه فایل‌های محتوا موجودند' : `✓ ${restored} فایل بازسازی شد`);
