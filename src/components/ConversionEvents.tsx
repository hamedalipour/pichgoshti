import Script from 'next/script';
import { siteConfig } from '@/data/site';

/**
 * رویدادهای تبدیل GA4 — ردیابی تعامل‌هایی که برای کسب‌وکار اهمیت دارند:
 *  • contact_call  → کلیک روی هر لینک tel: (دکمه‌های تماس فوری، نوار موبایل، فوتر…)
 *  • contact_bale  → کلیک روی لینک‌های بله (ble.ir)
 *  • contact_form  → ثبت فرم درخواست تعمیر در صفحه تماس
 * هر رویداد page_path همان صفحه را هم می‌فرستد تا مشخص شود لید از کدام صفحه آمده است.
 * فقط وقتی gaId در content/site.json تنظیم شده باشد رندر می‌شود؛ در غیر این صورت هیچ اسکریپتی تزریق نمی‌شود.
 */
export function ConversionEvents() {
  if (!siteConfig.gaId) return null;

  return (
    <Script id="ga4-conversion-events" strategy="afterInteractive">
      {`(function () {
  function send(name) {
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', name, { page_path: window.location.pathname });
  }
  document.addEventListener('click', function (e) {
    var target = e.target;
    var a = target && target.closest ? target.closest('a') : null;
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (href.indexOf('tel:') === 0) send('contact_call');
    else if (href.indexOf('ble.ir') !== -1) send('contact_bale');
  }, true);
  document.addEventListener('submit', function () {
    send('contact_form');
  }, true);
})();`}
    </Script>
  );
}
