/**
 * IndexNow — اعلام فوری تغییرات به Bing (و سایر موتورهای همکار)
 * بعد از هر دیپلوی اجرا می‌شود (استپ workflow) یا دستی:
 *   node scripts/indexnow.mjs          # حالت عادی: صفحات کلیدی + مقالات تازه
 *   node scripts/indexnow.mjs --all    # کل نقشه سایت (نیازمند out/sitemap.xml از بیلد)
 *
 * - Key file: public/00fdbbcb9e725195db1b2b7a189a8203.txt (باید روی دامنه در دسترس باشد)
 * - اگر دیتای ساختار سایت (src/data، sitemap.ts، site.json) تغییر کرده باشد،
 *   در صورت وجود out/sitemap.xml کل URLها ارسال می‌شود (سقف IndexNow: ۱۰,۰۰۰)
 * - خطا دیپلوی را fail نمی‌کند (continue-on-error در workflow)
 */
import fs from 'node:fs';
import { execSync } from 'node:child_process';

const site = JSON.parse(fs.readFileSync('content/site.json', 'utf8'));
const BASE = site.url.replace(/\/$/, '');
const KEY = '00fdbbcb9e725195db1b2b7a189a8203';
const HOST = BASE.replace(/^https?:\/\//, '');
const MAX_URLS = 10000;

/** کل URLهای نقشه سایت — از out/sitemap.xml (خروجی next build؛ در workflow از artifact باز می‌شود) */
function sitemapUrls() {
  if (!fs.existsSync('out/sitemap.xml')) return null;
  const xml = fs.readFileSync('out/sitemap.xml', 'utf8');
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).slice(0, MAX_URLS);
}

let diff = '';
try {
  diff = execSync('git diff --name-only HEAD~1 HEAD', { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] });
} catch {
  // خارج از ریپو / اجرای دستی — حالت عادی
}

const wantAll = process.argv.includes('--all');
const structureChanged = /src\/data\/|src\/app\/sitemap\.ts|content\/site\.json/.test(diff);

let urls = [];
let mode = 'incremental';

if ((wantAll || structureChanged) && sitemapUrls()) {
  urls = sitemapUrls();
  mode = wantAll ? 'full (--all)' : 'full (structure changed)';
} else {
  // حالت عادی — صفحات کلیدی همیشه + مقالات تازه اگر posts.json تغییر کرده باشد
  urls = ['', 'blog/', 'brands/', 'brands/daewoo/', 'brands/snowa/', 'brands/samsung/', 'services/backlight/', 'prices/', 'areas/'].map(
    (p) => `${BASE}/${p}`
  );
  if (diff.includes('content/posts.json')) {
    const posts = JSON.parse(fs.readFileSync('content/posts.json', 'utf8'));
    const weekAgo = Date.now() - 7 * 24 * 3600 * 1000;
    const lastTouched = (p) => (p.dateUpdated ? new Date(p.dateUpdated) : new Date(p.isoDate)).getTime();
    const recent = posts.filter((p) => lastTouched(p) > weekAgo).slice(0, 10);
    const chosen = recent.length ? recent : posts.slice(0, 5);
    for (const p of chosen) urls.push(`${BASE}/blog/${p.slug}/`);
  }
}

urls = [...new Set(urls)].slice(0, MAX_URLS);

const body = JSON.stringify({ host: HOST, key: KEY, urlList: urls });
try {
  const res = await fetch('https://api.indexnow.org/IndexNow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body,
  });
  console.log(`IndexNow [${mode}] -> ${res.status} ${res.statusText} | ${urls.length} URL announced`);
  if (!res.ok) console.log('response:', await res.text());
} catch (e) {
  console.log('IndexNow error (non-fatal):', e.message);
}