// بازیابی محتوای پیش‌فرض: کپی فایل‌های content-seed/ به content/
// (معکوسِ npm run sync-seed — برای بازگرداندن محتوا به نسخه اولیه)
// اجرا: node scripts/seed-content.mjs
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const contentDir = path.join(root, 'content');
const seedDir = path.join(root, 'content-seed');
const FILES = ['site.json', 'prices.json', 'posts.json', 'faqs.json', 'testimonials.json'];

if (!fs.existsSync(seedDir)) {
  console.error('✗ پوشه content-seed/ پیدا نشد.');
  process.exit(1);
}

fs.mkdirSync(contentDir, { recursive: true });
let copied = 0;
for (const f of FILES) {
  const src = path.join(seedDir, f);
  const dest = path.join(contentDir, f);
  if (!fs.existsSync(src)) {
    console.warn('⚠ در seed موجود نیست، رد شد:', f);
    continue;
  }
  if (fs.existsSync(dest)) {
    const backup = dest + '.bak';
    fs.copyFileSync(dest, backup);
    console.log('↩ بکاپ شد:', path.basename(backup));
  }
  fs.copyFileSync(src, dest);
  console.log('✓ بازنشانی شد:', f);
  copied++;
}
console.log(`\n✓ ${copied} فایل از seed بازنشانی شد. (برای همگام‌سازی معکوس: npm run sync-seed)`);
