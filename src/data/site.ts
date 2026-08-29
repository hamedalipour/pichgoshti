/**
 * ⭐ فایل مرکزی اطلاعات کسب‌وکار — منبع داده: content/site.json
 * از پنل ادمین (node server.mjs → /admin) یا با ویرایش مستقیم همان فایل مدیریت می‌شود.
 */
import siteJson from '../../content/site.json';

export interface SiteConfig {
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  url: string;
  phone: string;
  phoneDisplay: string;
  mobile: string;
  mobileDisplay: string;
  bale: string;
  email: string;
  address: { street: string; city: string; province: string; postalCode: string };
  geo: { lat: number; lng: number };
  workingHours: string;
  social: { instagram: string; telegram: string; aparat: string };
  foundedYear: string;
  stats: {
    years: string;
    repaired: string;
    technicians: string;
    warrantyMonths: number;
    satisfaction: string;
    arrivalTime: string;
  };
  rating: { value: string; count: number };
  priceRange: string;
  gaId: string;
  googleSiteVerification: string;
}

export const siteConfig: SiteConfig = siteJson;

/** ساخت لینک tel از شماره داخلی */
export function telHref(number: string): string {
  const intl = '+98' + number.replace(/^0/, '');
  return `tel:${intl.replace(/[^+0-9]/g, '')}`;
}

/** ساخت لینک گفتگو در پیام‌رسان بله — شماره موبایل، آیدی یا لینک کامل ble.ir را می‌پذیرد */
export function baleUrl(): string {
  const v = siteConfig.bale.trim();
  if (!v) return '#';
  if (/^https?:\/\//i.test(v)) return v;
  // شماره موبایل → فرمت بین‌المللی بدون + (مثل 989377893307)
  const digits = v.replace(/\D/g, '');
  if (/^09\d{9}$/.test(digits)) return `https://ble.ir/98${digits.slice(1)}`;
  if (/^989\d{9}$/.test(digits)) return `https://ble.ir/${digits}`;
  if (/^9\d{9}$/.test(digits)) return `https://ble.ir/98${digits}`;
  return `https://ble.ir/${v.replace(/^@/, '')}`;
}

/** تبدیل مسیر داخلی به URL مطلق */
export function absoluteUrl(path: string): string {
  return `${siteConfig.url}${path}`;
}

/** رشته‌های مشترک برای دکمه‌ها */
export const CTAS = {
  call: 'تماس فوری',
  bale: 'درخواست در بله',
  order: 'ثبت درخواست تعمیر',
} as const;
