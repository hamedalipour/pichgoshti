import type { ReactNode } from 'react';

/**
 * آیکون‌های SVG اختصاصی خدمات — به‌جای ایموجی تکراری 🔧
 * سبک خطی یکدست (stroke) که با رنگ قالب هماهنگ می‌شود.
 */

const L = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

const screenNeck = (
  <>
    <path d="M12 17v3.5" />
    <path d="M8.5 20.5h7" />
  </>
);

const serviceIcons: Record<string, ReactNode> = {
  /* تعمیر LCD — مانیتور */
  lcd: (
    <>
      <rect x="3" y="4.5" width="18" height="12.5" rx="2" />
      {screenNeck}
    </>
  ),
  /* تعمیر LED — نوار ال‌ای‌دی */
  led: (
    <>
      <rect x="3" y="4.5" width="18" height="12.5" rx="2" />
      <circle cx="7.5" cy="10.75" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="10.75" r="1" fill="currentColor" stroke="none" />
      <circle cx="16.5" cy="10.75" r="1" fill="currentColor" stroke="none" />
      {screenNeck}
    </>
  ),
  /* تعمیر OLED — پیکسل درخشان */
  oled: (
    <>
      <rect x="3" y="4.5" width="18" height="12.5" rx="2" />
      <path d="M12 7.5l2.8 3.25L12 14l-2.8-3.25z" />
      {screenNeck}
    </>
  ),
  /* تعمیر QLED — درخشش کوانتومی */
  qled: (
    <>
      <rect x="3" y="5.5" width="16.5" height="11.5" rx="2" />
      <path d="M20.6 2.6l.65 1.75L23.1 5l-1.85.65-.65 1.85-.65-1.85L18.1 5l1.85-.65z" fill="currentColor" stroke="none" />
      <path d="M11.25 17v3.5" />
      <path d="M7.5 20.5h7.5" />
    </>
  ),
  /* تعمیر اسمارت — وای‌فای روی صفحه */
  'smart-tv': (
    <>
      <rect x="2.5" y="5" width="19" height="12" rx="2" />
      <path d="M7.2 11.4a7 7 0 0 1 9.6 0" />
      <path d="M9.4 13.7a4 4 0 0 1 5.2 0" />
      <circle cx="12" cy="15.2" r="0.9" fill="currentColor" stroke="none" />
      {screenNeck}
    </>
  ),
  /* اندروید تلویزیون — پخش */
  'android-tv': (
    <>
      <rect x="2.5" y="4.5" width="19" height="12.5" rx="2" />
      <path d="M10.4 8.3l4.6 2.7-4.6 2.7z" fill="currentColor" stroke="none" />
      <path d="M12 17v3.5" />
      <path d="M8 20.5h8" />
    </>
  ),
  /* برد پاور — آذرخش */
  'power-board': (
    <path d="M13 2.5 5.5 13h5.8l-1.1 8.5L18.5 10h-5.8l1.6-7.5z" />
  ),
  /* برد اصلی — چیپ پردازنده */
  mainboard: (
    <>
      <rect x="5.5" y="5.5" width="13" height="13" rx="2" />
      <rect x="9.75" y="9.75" width="4.5" height="4.5" rx="0.5" />
      <path d="M9 2.5v3M15 2.5v3M9 18.5v3M15 18.5v3M2.5 9h3M2.5 15h3M18.5 9h3M18.5 15h3" />
    </>
  ),
  /* بک‌لایت — طلوع نور */
  backlight: (
    <>
      <path d="M5.5 15.5a6.5 6.5 0 0 1 13 0" />
      <path d="M3 15.5h18" />
      <path d="M12 4.5V7" />
      <path d="M5.2 7.2 7 9" />
      <path d="M18.8 7.2 17 9" />
    </>
  ),
  /* تعویض پنل — ترک روی شیشه */
  panel: (
    <>
      <rect x="3" y="4.5" width="18" height="12.5" rx="2" />
      <path d="M9.5 4.5l2.6 4.2-3.4 3.4L11 17" />
      {screenNeck}
    </>
  ),
  /* برد T-Con — تنظیمات تصویر */
  tcon: (
    <>
      <path d="M6 4.5v15M12 4.5v15M18 4.5v15" />
      <circle cx="6" cy="11" r="1.7" fill="currentColor" stroke="none" />
      <circle cx="12" cy="15" r="1.7" fill="currentColor" stroke="none" />
      <circle cx="18" cy="8" r="1.7" fill="currentColor" stroke="none" />
    </>
  ),
  /* نصب دیواری — براکت روی دیوار */
  'wall-mount': (
    <>
      <path d="M4.5 3v18" />
      <path d="M4.5 12h4" />
      <rect x="8.5" y="6.5" width="11" height="11" rx="1.5" />
      <circle cx="12" cy="9.8" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="16" cy="9.8" r="0.8" fill="currentColor" stroke="none" />
      <path d="M12 14.2h3.5" />
    </>
  ),
};

/** آیکون‌های بخش «چرا ما» — به‌جای ایموجی */
const featureIcons: Record<string, ReactNode> = {
  /* اعزام سریع */
  zap: <path d="M13 2.5 5.5 13h5.8l-1.1 8.5L18.5 10h-5.8l1.6-7.5z" />,
  /* گارانتی کتبی */
  shield: (
    <>
      <path d="M12 3l7 2.8v5.4c0 4.6-3 7.9-7 9.8-4-1.9-7-5.2-7-9.8V5.8z" />
      <path d="M9 11.8l2.1 2.1 4-4.2" />
    </>
  ),
  /* عیب‌یابی شفاف */
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M15.8 15.8 20.5 20.5" />
      <path d="M8.8 11.2l1.7 1.7 3.2-3.4" />
    </>
  ),
  /* قطعات اورجینال */
  box: (
    <>
      <path d="M21 8l-9-5-9 5v8l9 5 9-5z" />
      <path d="M3 8l9 5 9-5" />
      <path d="M12 13v8" />
    </>
  ),
  /* تماس تلفنی */
  phone: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.62 3h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  ),
  /* پیام‌رسان بله */
  chat: (
    <>
      <path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.55L3 21l1.95-5.6A8.5 8.5 0 1 1 21 11.5z" />
      <circle cx="8.5" cy="11.5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="12.5" cy="11.5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="16.5" cy="11.5" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  /* تأیید */
  check: <path d="M4.5 12.5l4.7 4.7L19.5 6.9" />,
};

export function FeatureIcon({ name, className }: { name: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...L}>
      {featureIcons[name] ?? featureIcons.zap}
    </svg>
  );
}

export function ServiceIcon({ slug, className }: { slug: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...L}>
      {serviceIcons[slug] ?? serviceIcons.lcd}
    </svg>
  );
}
