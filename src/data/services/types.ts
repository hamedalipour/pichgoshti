/** تعریف تایپ‌های مشترک خدمات — در src/data/services/types.ts */

export type ServiceFaq = { q: string; a: string };

export type Service = {
  slug: string;
  /** عنوان اصلی صفحه (H1) */
  title: string;
  /** برچسب کوتاه برای کارت‌ها و منو */
  navLabel: string;
  excerpt: string;
  keywords: string[];
  /** پاراگراف‌های معرفی */
  intro: string[];
  /** علائم رایج خرابی */
  symptoms: string[];
  process: { title: string; text: string }[];
  priceNote: string;
  faqs: ServiceFaq[];
  seoTitle: string;
  seoDescription: string;
  /** اسلاگ خدمات مرتبط برای لینک‌سازی داخلی */
  related: string[];
};