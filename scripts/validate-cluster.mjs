import fs from 'node:fs';

const read = (p) => fs.readFileSync(p, 'utf8');
let failures = 0;
const check = (label, ok) => {
  console.log(`${ok ? '✓' : '✗ FAIL'} ${label}`);
  if (!ok) failures++;
};

// 1) هاب خوشه بک‌لایت باید به هر دو مقاله برند لینک داشته باشد
const hub = read('out/blog/backlight-cost-by-size/index.html');
check('hub -> daewoo-backlight-replacement link', hub.includes('/blog/daewoo-backlight-replacement/'));
check('hub -> snowa-backlight-replacement link', hub.includes('/blog/snowa-backlight-replacement/'));

// 2) تگ متاکیوردز مقاله علائم نباید کلیدواژی سرویس (رقیب) را داشته باشد
const signsMeta = read('out/blog/backlight-signs/index.html');
const kwTag = (signsMeta.match(/<meta name="keywords" content="([^"]*)"/) || [])[1] || '';
console.log('  signs meta keywords:', kwTag);
check('signs meta keywords cleaned (no service kw)', !kwTag.includes('تعمیر بک لایت تلویزیون در محل'));

// 3) بخش «مطالب مرتبط» باید برای مقاله دوو، مقالات هم‌خوشه (backlight/black-screen) را نشان دهد
const daewoo = read('out/blog/daewoo-backlight-replacement/index.html');
const idx = daewoo.lastIndexOf('مطالب مرتبط');
const relatedSeg = daewoo.slice(idx, idx + 8000);
const relatedLinks = [...new Set([...relatedSeg.matchAll(/\/blog\/[a-z0-9-]+\//g)].map((m) => m[0]))];
console.log('  daewoo related links:', relatedLinks.join(' , '));
check('related section has >= 1 cluster sibling', relatedLinks.some((l) => l !== '/blog/daewoo-backlight-replacement/'));

// 4) هر مقاله خوشه باید در خروجی، هاب را لینک کرده باشد
for (const slug of ['daewoo-backlight-replacement', 'snowa-backlight-replacement', 'black-screen-with-sound']) {
  const html = read(`out/blog/${slug}/index.html`);
  check(`${slug} -> hub link`, html.includes('/blog/backlight-cost-by-size/'));
}

// 5) لینک‌شکسته داخلی در همه خروجی‌ها
const broken = [];
const walk = (dir) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = `${dir}/${e.name}`;
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.html')) {
      const html = fs.readFileSync(p, 'utf8');
      for (const m of html.matchAll(/href="(\/[^"#?]*)"/g)) {
        const target = m[1];
        if (target === '/') continue;
        const file = `out${target.endsWith('/') ? target + 'index.html' : target}`;
        if (!fs.existsSync(file) && !fs.existsSync(`out${target}`)) broken.push(`${p} -> ${target}`);
      }
    }
  }
};
walk('out');
check(`no broken internal links (found ${broken.length})`, broken.length === 0);
broken.slice(0, 10).forEach((b) => console.log('   ', b));

process.exit(failures ? 1 : 0);
