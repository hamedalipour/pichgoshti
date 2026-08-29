// سرور استاتیک سبک برای پیش‌نمایش خروجی production (پوشه out/)
// اجرا: node scripts/serve-out.mjs  →  http://localhost:4000
// (next start با output: 'export' کار نمی‌کند؛ این اسکریپت جایگزین تست محلی است)
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const root = path.join(process.cwd(), 'out');
const port = process.env.PORT || 4000;

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.json': 'application/json',
  '.woff2': 'font/woff2',
  '.webmanifest': 'application/manifest+json',
};

http
  .createServer((req, res) => {
    let file = decodeURIComponent(req.url.split('?')[0]);
    if (file.endsWith('/')) file += 'index.html';
    let full = path.join(root, file);
    if (!fs.existsSync(full) || fs.statSync(full).isDirectory()) {
      if (fs.existsSync(full + '.html')) full += '.html';
      else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        return res.end('404');
      }
    }
    res.writeHead(200, {
      'Content-Type': types[path.extname(full).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-cache',
    });
    fs.createReadStream(full).pipe(res);
  })
  .listen(port, () => console.log(`production preview → http://localhost:${port}`));
