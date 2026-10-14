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

// ── ۷. عنوان‌های خوشه بک‌لایت باید با «هزینه» شروع شوند ─────────────
// درس Wave 10c: عنوان‌ها با «تعویض و تعمیر…» بازنویسی شدند و کلمه «هزینه»
// حذف شد، در حالی که ۱۱۶ از ۱۳۰ ایمپرشن صفحه دوو دقیقاً با «هزینه» شروع
// می‌شد (هزینه تعویض/هزینه بک لایت/هزینه تعمیر بک لایت تلویزیون دوو).
// این بررسی جلوی تکرار آن اشتباه را می‌گیرد.
const cluster = [
  'daewoo-backlight-replacement',
  'snowa-backlight-replacement',
  'backlight-cost-by-size',
];
const lostHazine = cluster.filter((slug) => {
  const t = posts.find((p) => p.slug === slug)?.seoTitle ?? '';
  return !t.startsWith('هزینه');
});
check('عنوان خوشه بک‌لایت با «هزینه» شروع می‌شود', lostHazine.length === 0, lostHazine.join(', '));

// ── ۸. صفحه سرویس بک‌لایت باید از مقالات خوشه لینک بگیرد ────────────
// /services/backlight/ در پوزیشن ۴.۷۸ است ولی فقط ۹ ایمپرشن داشت، در حالی که
// مقالات خوشه ۷۴۶ ایمپرشن می‌گیرند؛ هیچ‌کدام به سرویس لینک نمی‌داد.
const clusterLinks = [
  'daewoo-backlight-replacement',
  'snowa-backlight-replacement',
  'backlight-cost-by-size',
  'backlight-repair-vs-replace',
  'black-screen-with-sound',
];
const noService = clusterLinks.filter((slug) => {
  const post = posts.find((p) => p.slug === slug);
  if (!post) return true;
  const hrefs = post.blocks.filter((b) => b.type === 'link').map((b) => b.href);
  return !hrefs.includes('/services/backlight/');
});
check('مقالات خوشه بک‌لایت به /services/backlight/ لینک دارند', noService.length === 0, noService.join(', '));

// ── ۹. مرزهای کلیدواژه‌ای دوشاخه «تعمیر» رعایت شده ──────────────────
// مقاله repair-vs-replace صاحب «تعمیر بک‌لایت» است (۱۲۸ ایمپرشن روی
// پوزیشن ۹ تا ۴۸). نباید با «تعویض … به تفکیک سایز» رقابت کند.
const repair = posts.find((p) => p.slug === 'backlight-repair-vs-replace');
check('مقاله تعمیر-بک‌لایت وجود دارد و FAQ دارد', Boolean(repair) && (repair?.faqs?.length ?? 0) >= 5);
if (repair) {
  const bad = repair.keywords.filter((k) => k.includes('تفکیک سایز'));
  check('مقاله تعمیر با خوشه سایز رقابت نمی‌کند', bad.length === 0, bad.join(', '));
  const linksTo = repair.blocks.filter((b) => b.type === 'link').map((b) => b.href);
  const needed = ['/services/backlight/', '/blog/daewoo-backlight-replacement/', '/blog/snowa-backlight-replacement/'];
  const missingLinks = needed.filter((h) => !linksTo.includes(h));
  check('مقاله تعمیر به سرویس و دو مقاله برند لینک دارد', missingLinks.length === 0, missingLinks.join(', '));
}

// ── ۱۰. مقاله جدید در HTML ساخته‌شده و سایت‌مپ حاضر است ─────────────
check('صفحه مقاله جدید ساخته شده', fs.existsSync('out/blog/backlight-repair-vs-replace/index.html'));
const sitemapHasNew = sitemap.includes('/blog/backlight-repair-vs-replace/');
check('مقاله جدید در سایت‌مپ هست', sitemapHasNew);

console.log(failures ? `\n${failures} بررسی ناموفق` : '\nهمه بررسی‌ها موفق ✓');
process.exit(failures ? 1 : 0);
