/**
 * IndexNow — اعلام فوری تغییرات به Bing (و سایر موتورهای همکار)
 * بعد از هر دیپلوی اجرا می‌شود (استپ workflow) یا دستی: node scripts/indexnow.mjs
 *
 * - Key file: public/00fdbbcb9e725195db1b2b7a189a8203.txt (باید روی دامنه در دسترس باشد)
 * - URLهای همیشگی مهم + مقالات جدیدتر از ۷ روز (اگر posts.json در آخرین کامیت تغییر کرده باشد)
 * - خطای IndexNow دیپلوی را fail نمی‌کند (continue-on-error در workflow)
 */
import fs from 'node:fs';
import { execSync } from 'node:child_process';

const site = JSON.parse(fs.readFileSync('content/site.json', 'utf8'));
const BASE = site.url.replace(/\/$/, '');
const KEY = '00fdbbcb9e725195db1b2b7a189a8203';
const HOST = BASE.replace(/^https?:\/\//, '');

// صفحات کلیدی — همیشه اعلام می‌شوند
const urls = ['', 'blog/', 'brands/', 'brands/daewoo/', 'brands/snowa/', 'services/backlight/', 'prices/', 'areas/'].map(
  (p) => `${BASE}/${p}`
);

// مقالات تازه — فقط اگر محتوای مقالات در آخرین کامیت تغییر کرده باشد
try {
  const diff = execSync('git diff --name-only HEAD~1 HEAD', { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] });
  if (diff.includes('content/posts.json')) {
    const posts = JSON.parse(fs.readFileSync('content/posts.json', 'utf8'));
    const weekAgo = Date.now() - 7 * 24 * 3600 * 1000;
    const recent = posts.filter((p) => new Date(p.isoDate).getTime() > weekAgo).slice(0, 10);
    const chosen = recent.length ? recent : posts.slice(0, 5);
    for (const p of chosen) urls.push(`${BASE}/blog/${p.slug}/`);
  }
} catch {
  // خارج از ریپو git (مثلاً اجرای دستی) — صفحات کلیدی کافی است
}

const body = JSON.stringify({ host: HOST, key: KEY, urlList: [...new Set(urls)] });
try {
  const res = await fetch('https://api.indexnow.org/IndexNow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body,
  });
  console.log(`IndexNow → ${res.status} ${res.statusText} | ${urls.length} URL اعلام شد`);
  if (!res.ok) console.log('پاسخ:', await res.text());
} catch (e) {
  console.log('IndexNow خطا (غیرمرگبار):', e.message);
}
