/**
 * One-time/occasional image optimization for blog images:
 *  - re-encodes originals at q70 (keeps filename — posts.json untouched)
 *  - generates responsive variants 768w / 1080w for mobile LCP
 *  - writes src/data/imageSizes.json (build reads this — no sharp at build time)
 * Usage: node scripts/img-meta.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const DIR = 'public/images/blog';
const OUT_JSON = 'src/data/imageSizes.json';
const WIDTHS = [768, 1080];

const map = JSON.parse(fs.existsSync(OUT_JSON) ? fs.readFileSync(OUT_JSON, 'utf8') : '{}');

for (const file of fs.readdirSync(DIR)) {
  if (!file.endsWith('.webp') || /-\d+w\.webp$/.test(file)) continue;
  const full = path.join(DIR, file);
  const src = '/images/blog/' + file;
  const base = file.replace(/\.webp$/, '');

  const meta = await sharp(full).metadata();

  // re-encode the canonical (largest) file in place — only when it saves >=10%,
  // and tolerate Windows file locks (VS Code / AV may hold the file open)
  const before = fs.statSync(full).size;
  const tmp = full + '.tmp';
  try {
    await sharp(full).webp({ quality: 70, effort: 6 }).toFile(tmp);
    if (fs.statSync(tmp).size < before * 0.9) fs.copyFileSync(tmp, full);
  } catch (e) {
    console.warn(`  ! in-place swap skipped (${file}): ${e.code || e.message}`);
  } finally {
    try {
      fs.rmSync(tmp, { force: true });
    } catch {}
  }

  const variants = [];
  for (const w of WIDTHS) {
    if (w >= meta.width) continue;
    const out = path.join(DIR, `${base}-${w}.webp`);
    await sharp(full).resize({ width: w }).webp({ quality: 72, effort: 6 }).toFile(out);
    variants.push(w);
  }

  map[src] = { width: meta.width, height: meta.height, variants };
  console.log(
    `${src}: ${Math.round(before / 1024)}kb -> ${Math.round(fs.statSync(full).size / 1024)}kb | variants: ` +
      variants.map((w) => `${w}w=${Math.round(fs.statSync(path.join(DIR, `${base}-${w}.webp`)).size / 1024)}kb`).join(', '),
  );
}

fs.mkdirSync(path.dirname(OUT_JSON), { recursive: true });
fs.writeFileSync(OUT_JSON, JSON.stringify(map, null, 2) + '\n');
console.log('wrote', OUT_JSON);
