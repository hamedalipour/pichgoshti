/**
 * نظرات مشتریان — منبع داده: content/testimonials.json (قابل مدیریت از پنل ادمین)
 * این نظرات در بخش نظرات سایت و اسکیمای LocalBusiness (review) هم استفاده می‌شوند.
 */
import testimonialsJson from '../../content/testimonials.json';
import { siteConfig } from './site';

export type Testimonial = {
  name: string;
  area: string;
  service: string;
  text: string;
  rating: 1 | 2 | 3 | 4 | 5;
  date: string;
};

export const testimonials = testimonialsJson.testimonials as unknown as Testimonial[];

/** امتیاز میانگین برای اسکیما — از تنظیمات سایت (content/site.json) خوانده می‌شود */
export const averageRating = siteConfig.rating.value;

/** تعداد کل نظرات نمایش‌داده‌شده در اسکیما (شامل نظرات گوگل) */
export const totalReviews = siteConfig.rating.count;
