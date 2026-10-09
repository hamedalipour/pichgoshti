/**
 * اعتبارسنجی خروجی بیلد برای موج رفع افت کلیک.
 *
 * بررسی می‌کند:
 *   ۱. lastmod سایت‌مپ دیگر روی تاریخ کهنه هاردکد نیست (باگ قبلی)
 *   ۲. مقالات پربازدید لینک انکرکلیدواژه‌ای به صفحه برند دوو/اسنوا دارند
 *      (صفحات برند روی پوزیشن ۵۵ تا ۹۰ گم شده بودند)
 *   ۳. عنوان‌های CTR صفر دیگر عدد قیمت ندارند؟ (باید داشته باشند)
 *   ۴. FAQ تکراری در مقالات نمانده
 *   ۵. لینک‌شکسته داخلی وجود ندارد
 *
 *   node scripts/validate-wave10.mjs
 */
import fs from 'node:fs';

let failures = 0;
const check = (label, ok, extra = '') => {
  console.log(`${ok ? '✓' : '✗ FAIL'} ${label}${extra ? ' — ' + extra : ''}`);
  if (!ok) failures++;
};
const read = (p) => fs.readFileSync(p, 'utf8');

// ── ۱. lastmod سایت‌مپ ────────────────────────────────────────────────
const sitemap = read('out/sitemap.xml');
const lastmods = [...sitemap.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((m) => m[1]);
const stale = lastmods.filter((d) => d.startsWith('2026-09-26'));
check(
  'lastmod سایت‌مپ به‌روز است (نه تاریخ کهنه هاردکد)',
  stale.length === 0,
  stale.length ? `${stale.length} URL روی ۲۰۲۶-۰۹-۲۶ مانده` : `تازه‌ترین: ${lastmods.sort().at(-1)}`,
);

// ── ۲. لینک مقاله → صفحه برند ────────────────────────────────────────
const posts = JSON.parse(read('content/posts.json'));
// صفحاتی که در GSC ایمپرشن دارند و باید به برند لینک بدهند
const mustLink = [
  'black-screen-with-sound',
  'daewoo-backlight-replacement',
  'snowa-backlight-replacement',
  'tv-repair-cost',
  'power-board-signs',
  'backlight-cost-by-size',
  'android-flash-cost',
  'mainboard-repair-cost',
  'panel-vs-new-tv',
  'snowa-android-slow',
  'snowa-tv-repair',
];
const missingBrand = [];
for (const slug of mustLink) {
  const post = posts.find((p) => p.slug === slug);
  if (!post) continue;
  const hrefs = post.blocks.filter((b) => b.type === 'link').map((b) => b.href);
  if (!hrefs.includes('/brands/daewoo/') && !hrefs.includes('/brands/snowa/')) {
    missingBrand.push(slug);
  }
}
check('مقالات پربازدید به صفحه برند لینک دارند', missingBrand.length === 0, missingBrand.join(', '));

// ── ۳. عنوان‌های CTR صفر باید عدد قیمت داشته باشند ───────────────────
const ctrFix = ['black-screen-with-sound', 'daewoo-backlight-replacement', 'snowa-backlight-replacement', 'snowa-android-slow', 'standby-light-blinking'];
const noPrice = ctrFix
  .filter((slug) => !/[۰-۹]|میلیون|هزار/.test(posts.find((p) => p.slug === slug)?.seoTitle ?? ''))
  .map((p) => p);
check('عنوان صفحات CTR صفر عدد قیمت دارند', noPrice.length === 0, noPrice.join(', '));

// ── ۴. FAQ تکراری ────────────────────────────────────────────────────
const dupes = [];
for (const p of posts) {
  const qs = (p.faqs ?? []).map((f) => f.q.trim());
  if (new Set(qs).size !== qs.length) dupes.push(p.slug);
}
check('FAQ تکراری در مقالات نیست', dupes.length === 0, dupes.join(', '));

// ── ۵. لینک‌شکسته داخلی ──────────────────────────────────────────────
const broken = [];
const walk = (dir) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = `${dir}/${e.name}`;
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.html')) {
      for (const m of read(p).matchAll(/href="(\/[^"#?]*)"/g)) {
        const t = m[1];
        if (t === '/') continue;
        if (!fs.existsSync(`out${t.endsWith('/') ? t + 'index.html' : t}`) && !fs.existsSync(`out${t}`)) {
          broken.push(`${p} -> ${t}`);
        }
      }
    }
  }
};
walk('out');
check(`لینک‌شکسته داخلی نیست (${broken.length} مورد)`, broken.length === 0);
broken.slice(0, 10).forEach((b) => console.log('   ', b));

// ── ۶. صفحات برند دارای محتوای عمیق ──────────────────────────────────
const thin = ['sony', 'panasonic', 'tcl', 'amico', 'xvision'].filter((slug) => {
  const html = read(`out/brands/${slug}/index.html`);
  return !/هزینه تعمیر تلویزیون/.test(html);
});
check('صفحات برند نازک بخش هزینه دارند', thin.length === 0, thin.join(', '));

console.log(failures ? `\n${failures} بررسی ناموفق` : '\nهمه بررسی‌ها موفق ✓');
process.exit(failures ? 1 : 0);
