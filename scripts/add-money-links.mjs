/**
 * افزودن لینک درون‌مقاله‌ای به صفحات پول‌ساز با انکر محلی (تهران).
 *
 * چرا: از ۲۷ مقاله، برد مین صفر لینک بدنه داشت و دیوارک/اندروید ۱-۲ لینک.
 * لینک با انکر «خدمت + تهران» هم وزن داخلی منتقل می‌کند و هم سیگنال محلی می‌دهد.
 *
 *   node scripts/add-money-links.mjs            # اعمال
 *   node scripts/add-money-links.mjs --dry      # فقط گزارش
 */
import fs from 'node:fs';

const FILE = 'content/posts.json';
const DRY = process.argv.includes('--dry');
const posts = JSON.parse(fs.readFileSync(FILE, 'utf8'));

/** اولویت = ترتیب اهمیت تجاری؛ انکرها عمداً محلی (تهران) هستند */
const MONEY = [
  { slug: 'backlight', anchor: 'قیمت تعویض بک‌لایت تلویزیون در تهران', re: /بک\s*لایت/ },
  { slug: 'wall-mount', anchor: 'هزینه نصب دیوارک تلویزیون در تهران', re: /دیوار|نصب/ },
  { slug: 'mainboard', anchor: 'قیمت تعمیر برد تلویزیون در تهران', re: /برد اصلی|مین\s*برد|مادربرد/ },
  { slug: 'android-tv', anchor: 'قیمت فلش تلویزیون اندرویدی در تهران', re: /اندروید|فلش|فریم\s*ور/ },
];

const changed = [];
for (const post of posts) {
  const hay = [post.title, post.excerpt, ...(post.keywords ?? []), ...(post.relatedServices ?? [])].join(' ');
  const blockText = JSON.stringify(post.blocks);

  // خدمات مرتبط/موضوعی که در بدنه لینک نشده‌اند
  const candidates = MONEY.filter((m) => {
    const relevant = (post.relatedServices ?? []).includes(m.slug) || m.re.test(hay);
    const already = blockText.includes(`/services/${m.slug}/`);
    return relevant && !already;
  }).slice(0, 2);

  if (!candidates.length) continue;

  // جای درج: بعد از اولین جدول قیمت، وگرنه بعد از پاراگراف سوم
  const tableIdx = post.blocks.findIndex((b) => b.type === 'table');
  const insertAt = tableIdx >= 0 ? tableIdx + 1 : Math.min(3, post.blocks.length);

  const links = candidates.map((m) => ({ type: 'link', text: m.anchor, href: `/services/${m.slug}/` }));
  post.blocks.splice(insertAt, 0, ...links);
  changed.push({ slug: post.slug, links: candidates.map((c) => c.slug) });
}

console.log(`ویرایش ${changed.length} مقاله:`);
for (const c of changed) console.log(`  + ${c.slug} -> ${c.links.join(', ')}`);

if (!DRY) {
  fs.writeFileSync(FILE, JSON.stringify(posts, null, 2) + '\n');
  console.log('✓ نوشته شد');
} else {
  console.log('(dry-run: چیزی نوشته نشد)');
}
