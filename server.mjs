// بک‌اند سبک پنل ادمین — فقط Node خام، بدون هیچ پکیجی
// اجرا: node server.mjs  →  http://localhost:4000/admin
// ⚠️ رمز ادمین را عوض کنید (یا از متغیر محیطی ADMIN_PASSWORD استفاده کنید):
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'pichgoshti';

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawn, execSync } from 'node:child_process';

const root = path.resolve(import.meta.dirname);
const contentDir = path.join(root, 'content');
const outDir = path.join(root, 'out');
const adminFile = path.join(root, 'admin', 'index.html');
const PORT = process.env.PORT || 4000;

const CONTENT_FILES = ['site.json', 'prices.json', 'posts.json', 'faqs.json', 'testimonials.json'];

let buildState = { running: false, startedAt: null, finishedAt: null, exitCode: null, durationMs: null, log: [] };
let publishState = { running: false, startedAt: null, finishedAt: null, exitCode: null, log: [] };

const json = (res, code, data) => {
  res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(data));
};

const readBody = (req) =>
  new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', (c) => {
      size += c.length;
      if (size > 15 * 1024 * 1024) { reject(new Error('payload too large')); req.destroy(); }
      else chunks.push(c);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });

const authed = (req) => req.headers['x-admin-password'] === ADMIN_PASSWORD;

function readContent() {
  const data = {};
  for (const f of CONTENT_FILES) data[f.replace('.json', '')] = JSON.parse(fs.readFileSync(path.join(contentDir, f), 'utf8'));
  return data;
}

function saveContent(data) {
  // اعتبارسنجی سبک
  if (!data.site || typeof data.site !== 'object') throw new Error('site نامعتبر است');
  if (!Array.isArray(data.prices?.priceCategories)) throw new Error('prices نامعتبر است');
  if (!Array.isArray(data.posts)) throw new Error('posts نامعتبر است');
  const slugs = new Set();
  for (const p of data.posts) {
    if (!p.slug || !p.title || !Array.isArray(p.blocks)) throw new Error(`مقاله نامعتبر: ${p.slug || '(بدون اسلاگ)'}`);
    if (slugs.has(p.slug)) throw new Error(`اسلاگ تکراری: ${p.slug}`);
    slugs.add(p.slug);
  }
  if (!Array.isArray(data.faqs?.faqGroups)) throw new Error('faqs نامعتبر است');
  if (!Array.isArray(data.testimonials?.testimonials)) throw new Error('testimonials نامعتبر است');

  // بکاپ خودکار قبل از ذخیره
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupDir = path.join(contentDir, 'backups', stamp);
  fs.mkdirSync(backupDir, { recursive: true });
  for (const f of CONTENT_FILES) {
    const src = path.join(contentDir, f);
    if (fs.existsSync(src)) fs.copyFileSync(src, path.join(backupDir, f));
  }

  for (const f of CONTENT_FILES) {
    const key = f.replace('.json', '');
    fs.writeFileSync(path.join(contentDir, f), JSON.stringify(data[key], null, 2) + '\n', 'utf8');
  }
  // نگه‌داشتن حداکثر ۲۰ بکاپ آخر
  const backups = fs.readdirSync(path.join(contentDir, 'backups')).sort();
  while (backups.length > 20) fs.rmSync(path.join(contentDir, 'backups', backups.shift()), { recursive: true, force: true });
}

function devServerRunning() {
  try {
    const out = execSync('powershell -NoProfile -Command "(Test-NetConnection -ComputerName 127.0.0.1 -Port 3000 -WarningAction SilentlyContinue).TcpTestSucceeded"', { timeout: 15000 });
    return out.toString().trim() === 'True';
  } catch { return false; }
}

function stopDevServer() {
  try {
    execSync(`powershell -NoProfile -Command "Get-CimInstance Win32_Process -Filter \\"Name = 'node.exe'\\" | Where-Object { $_.CommandLine -match 'next' } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force }"`, { timeout: 20000, stdio: 'pipe' });
    return true;
  } catch { return false; }
}

function startBuild() {
  buildState = { running: true, startedAt: new Date().toISOString(), finishedAt: null, exitCode: null, durationMs: null, log: ['⏳ شروع بیلد پروداکشن...'] };
  const started = Date.now();
  const child = spawn('npm', ['run', 'build'], { cwd: root, shell: true });
  const push = (buf) => {
    for (const line of buf.toString().split(/\r?\n/)) if (line.trim()) buildState.log.push(line.trim());
    if (buildState.log.length > 400) buildState.log = buildState.log.slice(-400);
  };
  child.stdout.on('data', push);
  child.stderr.on('data', push);
  child.on('close', (code) => {
    buildState.running = false;
    buildState.exitCode = code;
    buildState.durationMs = Date.now() - started;
    buildState.finishedAt = new Date().toISOString();
    buildState.log.push(code === 0 ? `✅ بیلد موفق در ${Math.round(buildState.durationMs / 1000)} ثانیه — سایت در صفحه اصلی (http://localhost:${PORT}) به‌روز شد.` : `❌ بیلد با خطا مواجه شد (کد ${code}) — لاگ را بررسی کنید.`);
  });
}

const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.xml': 'application/xml', '.txt': 'text/plain', '.json': 'application/json', '.woff2': 'font/woff2', '.webmanifest': 'application/manifest+json' };

// انتشار آنلاین: git add → commit → push  (گیت‌هاب اکشنز خودش بیلد می‌کند)
function startPublish() {
  publishState = { running: true, startedAt: new Date().toISOString(), finishedAt: null, exitCode: null, log: ['⏳ آماده‌سازی انتشار...'] };
  const push = (line) => {
    publishState.log.push(line.trim());
    if (publishState.log.length > 200) publishState.log = publishState.log.slice(-200);
  };
  const steps = [
    { cmd: 'git', args: ['add', '-A'] },
    { cmd: 'git', args: ['commit', '-m', 'content update ' + new Date().toISOString()] },
    { cmd: 'git', args: ['push'] },
  ];
  let i = 0;
  const next = () => {
    if (i >= steps.length) {
      publishState.running = false;
      publishState.exitCode = 0;
      publishState.finishedAt = new Date().toISOString();
      publishState.log.push('✅ به گیت‌هاب ارسال شد — حدود ۱ تا ۲ دقیقه دیگر روی https://pich-goshti.ir اعمال می‌شود.');
      return;
    }
    const s = steps[i++];
    push('$ git ' + s.args.join(' '));
    const child = spawn(s.cmd, s.args, { cwd: root, windowsHide: true });
    let errBuf = '';
    child.stdout.on('data', push);
    child.stderr.on('data', (d) => { errBuf += d.toString(); push(d); });
    child.on('error', (e) => {
      publishState.running = false;
      publishState.exitCode = -1;
      publishState.finishedAt = new Date().toISOString();
      publishState.log.push('❌ اجرای git ممکن نشد: ' + e.message);
    });
    child.on('close', (code) => {
      // «چیزی برای کامیت نبود» خطا نیست — ادامه بده
      if (s.args[0] === 'commit' && code !== 0 && /nothing to commit|no changes added/i.test(errBuf)) {
        push('ℹ️ تغییری جدید نبود — ادامه...');
        next();
        return;
      }
      if (code !== 0) {
        publishState.running = false;
        publishState.exitCode = code;
        publishState.finishedAt = new Date().toISOString();
        publishState.log.push('❌ انتشار ناموفق شد — اتصال اینترنت/گیت‌هاب را چک کنید و دوباره تلاش کنید.');
        return;
      }
      next();
    });
  };
  next();
}

function serveStatic(res, url) {
  let file = decodeURIComponent(url);
  if (file.endsWith('/')) file += 'index.html';
  let full = path.join(outDir, file);
  if (!fs.existsSync(full) || fs.statSync(full).isDirectory()) {
    if (fs.existsSync(full + '.html')) full += '.html';
    else full = path.join(outDir, '404.html');
  }
  if (!fs.existsSync(full)) { res.writeHead(404); return res.end('404'); }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(full).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
  fs.createReadStream(full).pipe(res);
}

const server = http.createServer(async (req, res) => {
  const url = req.url.split('?')[0];
  try {
    if (url === '/admin') {
      const html = fs.readFileSync(adminFile);
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache' });
      return res.end(html);
    }

    if (url === '/api/login' && req.method === 'POST') {
      const body = JSON.parse(await readBody(req));
      const ok = body.password === ADMIN_PASSWORD;
      return json(res, ok ? 200 : 401, { ok });
    }

    if (!url.startsWith('/api/')) return serveStatic(res, url);

    if (!authed(req)) return json(res, 401, { error: 'رمز عبور اشتباه است' });

    if (url === '/api/content' && req.method === 'GET') return json(res, 200, readContent());

    if (url === '/api/content' && req.method === 'PUT') {
      const data = JSON.parse(await readBody(req));
      saveContent(data);
      return json(res, 200, { ok: true, savedAt: new Date().toISOString() });
    }

    if (url === '/api/build' && req.method === 'POST') {
      if (buildState.running) return json(res, 409, { error: 'یک بیلد در حال اجراست' });
      if (devServerRunning()) {
        buildState = { running: false, startedAt: null, finishedAt: null, exitCode: null, durationMs: null, log: ['⏳ بستن سرور توسعه (پورت ۳۰۰۰)...'] };
        stopDevServer();
        await new Promise((r) => setTimeout(r, 1500));
      } else buildState = { running: false, startedAt: null, finishedAt: null, exitCode: null, durationMs: null, log: [] };
      startBuild();
      return json(res, 200, { ok: true });
    }

    if (url === '/api/build-status' && req.method === 'GET') {
      return json(res, 200, { ...buildState, log: buildState.log.slice(-25) });
    }

    if (url === '/api/publish' && req.method === 'POST') {
      if (publishState.running) return json(res, 409, { error: 'یک انتشار در حال اجراست' });
      if (buildState.running) return json(res, 409, { error: 'اول صبر کنید بیلد محلی تمام شود' });
      startPublish();
      return json(res, 200, { ok: true });
    }

    if (url === '/api/publish-status' && req.method === 'GET') {
      return json(res, 200, { ...publishState, log: publishState.log.slice(-25) });
    }

    return json(res, 404, { error: 'not found' });
  } catch (err) {
    return json(res, 400, { error: err.message });
  }
});

server.listen(PORT, () => console.log(`✓ پنل ادمین:  http://localhost:${PORT}/admin`));
