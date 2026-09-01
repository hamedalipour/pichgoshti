// اصلاح پسوند تصاویر متادیتا برای هاست‌های استاتیک (GitHub Pages و مشابه)
// Next.js فایل‌های opengraph-image و apple-icon را بدون پسوند خروجی می‌دهد؛
// چون content-type از پسوند فایل تشخیص داده می‌شود، این اسکریپت:
//   ۱) فایل‌های بدون پسوند را به .png تغییر نام می‌دهد
//   ۲) ارجاع‌های «?hash» داخل HTML/RSC را به «.png» بازنویسی می‌کند
// اجرا: node scripts/fix-og-ext.mjs  (بعد از next build — در workflow فراخوانی می‌شود)
import fs from 'node:fs';
import path from 'node:path';

const outDir = path.resolve(import.meta.dirname, '..', 'out');
const TARGETS = ['opengraph-image', 'apple-icon'];

if (!fs.existsSync(outDir)) {
  console.error('✗ پوشه out/ یافت نشد — اول build بگیرید');
  process.exit(1);
}

// ۱) تغییر نام فایل‌های بدون پسوند
let renamed = 0;
function renamePass(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) renamePass(full);
    else if (TARGETS.includes(entry.name)) {
      fs.renameSync(full, `${full}.png`);
      renamed++;
    }
  }
}
renamePass(outDir);

// ۲) بازنویسی ارجاع‌ها در HTML و فایل‌های RSC (حذف ?hash و افزودن .png)
let rewritten = 0;
const refRegex = new RegExp(`(${TARGETS.join('|')})\\?[a-z0-9]+`, 'g');
function rewritePass(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) rewritePass(full);
    else if (/\.(html|txt|xml)$/.test(entry.name)) {
      const src = fs.readFileSync(full, 'utf8');
      const next = src.replace(refRegex, '$1.png');
      if (next !== src) {
        fs.writeFileSync(full, next);
        rewritten++;
      }
    }
  }
}
rewritePass(outDir);

console.log(`✓ ${renamed} تصویر پسونددار شد، ${rewritten} فایل ارجاع‌ها بازنویسی شد`);
