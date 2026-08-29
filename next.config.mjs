/** @type {import('next').NextConfig} */
const nextConfig = {
  // خروجی کاملاً استاتیک در پوشه out/ — قابل آپلود روی هر هاستی
  output: 'export',
  // آدرس‌ها با اسلش پایانی (سازگار با هاست‌های اشتراکی و nginx)
  trailingSlash: true,
  images: {
    // بهینه‌سازی تصویر در زمان بیلد نیازمند سرور است؛ تصاویر از قبل بهینه می‌شوند
    unoptimized: true,
  },
  reactStrictMode: true,
  // ریشه پروژه را صریح اعلام می‌کنیم تا lockfile اضافه در پوشه کاربر باعث هشدار نشود
  outputFileTracingRoot: import.meta.dirname,
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
