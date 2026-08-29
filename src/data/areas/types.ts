/**
 * مناطق تحت پوشش تهران — هر منطقه یک صفحه اختصاصی برای سئوی محلی
 * مسیر خروجی: /areas/[slug]/
 */

export type Area = {
  slug: string;
  name: string;
  /** منطقه شهرداری */
  district: string;
  /** زمان تقریبی اعزام تکنسین */
  arrival: string;
  /** دو پاراگراف یکتا برای هر منطقه */
  intro: string[];
  /** مناطق نزدیک برای لینک‌سازی داخلی */
  nearby: string[];
  seoTitle: string;
  seoDescription: string;
};

export type AreaGroup = {
  title: string;
  areas: Area[];
};