# پیچ‌گوشتی — وب‌سایت مرکز تخصصی تعمیرات تلویزیون در تهران

سایت سئو-محور برای مرکز تخصصی تعمیرات تلویزیون پیچ‌گوشتی + **پنل مدیریت محتوا**. خروجی بیلد در پوشه `out/` است و روی هر هاستی قابل اجراست.

## استک

- **Next.js 15** (App Router) با `output: 'export'` و `trailingSlash`
- **Tailwind CSS v4** (پیکربندی پالت برند در `src/app/globals.css` با `@theme`)
- **TypeScript** با حالت strict
- فونت **وزیرمتن** self-host با `next/font/local` (بدون درخواست خارجی، بدون CLS)
- **پنل ادمین** با بک‌اند Node خام (`server.mjs` — بدون هیچ پکیج اضافه) که فایل‌های `content/*.json` را ویرایش می‌کند
- فرم تماس به گفتگوی آماده **بله** تبدیل می‌شود (`baleUrl`)

## ساختار پروژه

```
src/                  # کد سایت (صفحات، کامپوننت‌ها، اسکیماها)
content/              # ⭐ محتوای سایت — منبع داده پنل ادمین
├─ site.json          # اطلاعات کسب‌وکار (تلفن، آدرس، بله، آمار…)
├─ prices.json        # تعرفه‌ها
├─ posts.json         # مقالات وبلاگ
├─ faqs.json          # سوالات متداول
├─ testimonials.json  # نظرات مشتریان
└─ backups/           # بکاپ خودکار قبل از هر ذخیره (۲۰ نسخه آخر)
content-seed/         # نسخه اولیه محتوا — برای اولین اجرای Railway
admin/index.html      # رابط کاربری پنل ادمین
server.mjs            # بک‌اند پنل + سرو سایت از out/
scripts/              # ابزارها (بازسازی آیکون‌ها، seed، ensure-content)
```

> `src/data/*.ts` فقط یک لایه خواندن از `content/*.json` هستند؛ محتوا را از پنل یا مستقیم از JSON تغییر دهید.

## اجرا (توسعه محلی)

```bash
npm install
npm run dev        # سایت توسعه: http://localhost:3000
npm run admin      # پنل ادمین + نسخه منتشرشده: http://localhost:4000/admin
```

گردش کار انتشار: در پنل تغییر بدهید → «💾 ذخیره تغییرات» → «🚀 بیلد و انتشار» (خودش بیلد می‌گیرد و سایت روی پورت ۴۰۰۰ به‌روز می‌شود).

رمز ادمین: پیش‌فرض `pichgoshti` — با متغیر محیطی `ADMIN_PASSWORD` عوض کنید. در `server.mjs` هم قابل تغییر است.

## استقرار

### گزینه ۱ — هاست استاتیک / اشتراکی (ساده‌ترین)

```bash
npm run build
```
محتوای پوشه `out/` را آپلود کنید. آدرس‌ها trailingSlash دارند و با nginx/هاست اشتراکی/Cloudflare Pages سازگارند.

### گزینه ۲ — Vercel (فقط سایت)

پروژه را به گیت‌هوگ پوش کنید و در Vercel ایمپورت کنید — بدون هیچ تنظیمی، چون خروجی استاتیک است.
⚠️ **پنل ادمین روی Vercel کار نمی‌کند** (محیط serverless با فایل‌سیستم فقط‌خواندنی). تغییر محتوا = commit جدید یا استقرار ترکیبی (Vercel برای سایت + Railway برای پنل).

### گزینه ۳ — Railway (سایت + پنل ادمین — کامل‌ترین حالت) ✅

فایل `railway.json` آماده است. مراحل:

1. ریپو را به گیت‌هوگ پوش کنید → در Railway «New Project → Deploy from GitHub»
2. یک **Volume** بسازید و به مسیر `/app/content` (یا همان `content/`) متصل کنید — تا تغییرات پنل با redeploy از بین نرود
3. در تب Variables این‌ها را ست کنید:
   - `ADMIN_PASSWORD` — رمز قوی دلخواه (الزامی برای انتشار عمومی)
   - `NODE_VERSION` = `22`
4. Deploy — بوت اول ~۱ دقیقه طول می‌کشد (بیلد داخل کانتینر)
5. سایت روی دامنه Railway و پنل روی `<دامنه>/admin`

نکته‌ها:
- دستور استارت (`npm run start:prod`): اول فایل‌های محتوای گم‌شده از `content-seed/` بازسازده می‌شوند، بعد بیلد و بعد سرور
- اگر محتوا را لوکال عوض کردید و خواستید seed هم به‌روز باشد: `npm run sync-seed`
- دکمه «بیلد و انتشار» پنل روی Railway هم کار می‌کند (بیلد داخل همان کانتینر اجرا می‌شود)
- سرور روی `process.env.PORT` و همه اینترفیس‌ها گوش می‌دهد — سازگار با Railway/Fly/هر VPS

## سئو و فایل‌های خودکار

- متادیتای اختصاصی هر صفحه با `src/lib/seo.ts` (canonical، Open Graph، Twitter Card)
- اسکیماهای JSON-LD در `src/lib/schema.ts`: LocalBusiness، Organization، WebSite، Service، FAQPage، BlogPosting و BreadcrumbList
- `sitemap.xml`، `robots.txt`، `manifest.webmanifest`، `/opengraph-image.png`، `/apple-icon`، `/icon.svg` و `/favicon.ico` همه خودکار در بیلد ساخته می‌شوند
- `gaId` و `googleSiteVerification` را از پنل ادمین (تب اطلاعات سایت) یا `content/site.json` وارد کنید
