// یک‌بار اجرا شود: تبدیل داده‌های فعلی TypeScript به فایل‌های JSON در پوشه content/
// اجرا: node scripts/seed-content.mjs
import { execSync } from 'node:child_process';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const root = path.resolve(import.meta.dirname, '..');
const outDir = path.join(root, '.tmp-seed');
const contentDir = path.join(root, 'content');
const require = createRequire(import.meta.url);

// کامپایل داده‌های TS به CJS برای خواندن در Node
execSync(
  'npx tsc src/data/site.ts src/data/prices.ts src/data/faqs.ts src/data/testimonials.ts src/data/posts/index.ts --outDir .tmp-seed --module commonjs --target es2020 --skipLibCheck',
  { cwd: root, stdio: 'inherit' },
);

const { siteConfig } = require(path.join(outDir, 'site.js'));
const { priceCategories, priceDisclaimer } = require(path.join(outDir, 'prices.js'));
const { faqGroups } = require(path.join(outDir, 'faqs.js'));
const { testimonials } = require(path.join(outDir, 'testimonials.js'));
const { posts } = require(path.join(outDir, 'posts/index.js'));

mkdirSync(contentDir, { recursive: true });
const write = (name, data) => {
  writeFileSync(path.join(contentDir, name), JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`✓ content/${name}`);
};

write('site.json', siteConfig);
write('prices.json', { priceCategories, priceDisclaimer });
write('faqs.json', { faqGroups });
write('testimonials.json', { testimonials });
write('posts.json', posts);

rmSync(outDir, { recursive: true, force: true });
console.log('\nهمه محتوا در پوشه content/ آماده شد.');
