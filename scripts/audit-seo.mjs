import fs from 'node:fs';

const posts = JSON.parse(fs.readFileSync('content/posts.json', 'utf8'));
const money = ['backlight', 'wall-mount', 'android-tv', 'mainboard'];
const counts = Object.fromEntries(money.map((m) => [m, 0]));
for (const p of posts) {
  const s = JSON.stringify(p.blocks) + JSON.stringify(p.relatedServices ?? []);
  for (const m of money) {
    const re = new RegExp(`/services/${m}/`, 'g');
    counts[m] += (s.match(re) || []).length;
  }
}
console.log('links from posts -> money services:', counts);
console.log(
  'posts linking any service:',
  posts.filter((p) => JSON.stringify(p.blocks).includes('/services/')).length,
  '/',
  posts.length
);

// schema types per key page
for (const f of ['services/backlight', 'services/wall-mount', 'brands/daewoo', 'blog/backlight-cost-by-size']) {
  const h = fs.readFileSync(`out/${f}/index.html`, 'utf8');
  const types = [...h.matchAll(/"@type":"([^"]+)"/g)].map((m) => m[1]);
  console.log(f, '-> schema:', [...new Set(types)].join(', '));
}

// sitemap sanity
const sm = fs.readFileSync('out/sitemap.xml', 'utf8');
console.log('sitemap urls:', (sm.match(/<url>/g) || []).length);
console.log('sitemap has money pages:', ['backlight', 'wall-mount', 'android-tv', 'mainboard'].every((s) => sm.includes(`/services/${s}/`)));
console.log('sitemap lastmod count:', (sm.match(/<lastmod>/g) || []).length);
