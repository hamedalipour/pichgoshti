/**
 * افزودن/به‌روزرسانی نشانگر تازگی (dateUpdated) روی مقالات مشخص.
 * سیگنال freshness برای صفحاتی که در GSC ایمپرشن دارند اما کلیک نمی‌گیرند
 * (موقعیت ۶ تا ۱۱ با CTR نزدیک صفر) حیاتی است؛ و lastmod سایت‌مپ از همین می‌خواند.
 *
 *   node scripts/touch-posts.mjs            # اعمال
 *   node scripts/touch-posts.mjs --dry      # فقط گزارش
 */
import fs from 'node:fs';

const FILE = 'content/posts.json';
const DRY = process.argv.includes('--dry');
const TODAY = '2026-10-14';
const TODAY_FA = '۲۲ مهر ۱۴۰۵';

// مقالاتی که در این موج محتوایی/متا به‌روز شدند
const TARGETS = [
  'black-screen-with-sound',
  'daewoo-backlight-replacement',
  'snowa-backlight-replacement',
  'backlight-cost-by-size',
  'backlight-repair-vs-replace',
  'standby-light-blinking',
  'snowa-android-slow',
  'power-board-signs',
  'android-flash-cost',
  'tv-repair-cost',
  'backlight-signs',
  'snowa-tv-repair',
  'panel-vs-new-tv',
  'mainboard-repair-cost',
  // صفحات پربازدید GSC — سیگنال تازگی برای حفظ/بازیابی پوزیشن
  'daewoo-repair-cost',
  'snowa-repair-cost',
  'daewoo-tv-wont-turn-on',
  'tv-wont-turn-on',
];

const posts = JSON.parse(fs.readFileSync(FILE, 'utf8'));
const touched = [];

for (const p of posts) {
  if (!TARGETS.includes(p.slug)) continue;
  const changed = p.dateUpdated !== TODAY || p.dateUpdatedFa !== TODAY_FA;
  p.dateUpdated = TODAY;
  p.dateUpdatedFa = TODAY_FA;
  touched.push(`${changed ? '~' : '='} ${p.slug}${changed ? '' : ' (already current)'}`);
}

console.log(`تازگی روی ${touched.length} مقاله:`);
touched.forEach((t) => console.log('  ' + t));

const missing = posts.filter((p) => !p.dateUpdated).map((p) => p.slug);
if (missing.length) console.log('\nمقالات بدون dateUpdated:', missing.join(', '));

if (!DRY) {
  fs.writeFileSync(FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');
  console.log('\n✓ نوشته شد در', FILE);
} else {
  console.log('\n(dry run — چیزی نوشته نشد)');
}
