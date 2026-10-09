import { readFileSync } from 'node:fs';

const checks = [
  ['out/blog/daewoo-backlight-replacement/index.html', [
    ['H2 دوشاخه تعمیر', 'تعمیر بک‌لایت تلویزیون دوو در محل'],
    ['عدد ۹۰۰ هزار', '۹۰۰ هزار تومان'],
    ['FAQ تعمیر', 'تعمیر بک لایت تلویزیون دوو چقدر'],
    ['عنوان جدید', 'تعویض و تعمیر بک‌لایت تلویزیون دوو'],
  ]],
  ['out/blog/snowa-backlight-replacement/index.html', [
    ['H2 دوشاخه تعمیر', 'تعمیر بک‌لایت تلویزیون اسنوا'],
    ['عدد ۹۰۰ هزار', '۹۰۰ هزار تومان'],
    ['FAQ تعمیر', 'تعمیر بک لایت تلویزیون اسنوا چقدر'],
    ['عنوان جدید', 'تعویض و تعمیر بک‌لایت تلویزیون اسنوا'],
  ]],
  ['out/blog/black-screen-with-sound/index.html', [
    ['جدول برند دوو/اسنوا', 'سیاه شدن صفحه تلویزیون دوو و اسنوا'],
    ['لینک هزینه تعمیر دوو', '/blog/daewoo-repair-cost/'],
    ['لینک هزینه تعمیر اسنوا', '/blog/snowa-repair-cost/'],
    ['لینک صفحه برند', '/brands/daewoo/'],
    ['عنوان ۹۰۰ هزار', 'هزینه از ۹۰۰ هزار تومان'],
  ]],
];

let bad = 0;
for (const [file, items] of checks) {
  const html = readFileSync(file, 'utf8');
  for (const [label, needle] of items) {
    const ok = html.includes(needle);
    if (!ok) bad++;
    console.log(`${ok ? '✓' : '✗'} ${file.split('/')[2]}: ${label}`);
  }
}
console.log(bad === 0 ? '\nهمه چیز در HTML ساخته‌شده حاضر است ✓' : `\n${bad} مورد غایب ✗`);
process.exit(bad === 0 ? 0 : 1);
