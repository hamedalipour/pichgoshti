/**
 * پرسش‌های متداول — منبع داده: content/faqs.json (قابل مدیریت از پنل ادمین)
 * در صفحه /faq/ و اسکیمای FAQPage برای گوگل استفاده می‌شود.
 */
import faqsJson from '../../content/faqs.json';

export type Faq = { q: string; a: string };

export type FaqGroup = {
  id: string;
  title: string;
  faqs: Faq[];
};

export const faqGroups = faqsJson.faqGroups as unknown as FaqGroup[];

/** همه سوالات به‌صورت لیست تخت */
export const allFaqs: Faq[] = faqGroups.flatMap((g) => g.faqs);
