import { siteConfig } from '@/data/site';

/**
 * نوار اعتماد — رفع تردیدهای اصلی مشتری قبل از سفارش.
 * فقط ادعاهایی که در کل سایت (FAQها، CTAها، صفحات برند) از قبل اعلام شده‌اند
 * و در siteConfig.stats آمارشان ثبت است؛ ادعای جدید ساختگی اضافه نمی‌شود.
 */
export function TrustStrip() {
  const items = [
    {
      icon: '📜',
      title: 'گارانتی کتبی ۳ ماهه',
      text: 'روی کار و قطعه، همراه فاکتور رسمی',
    },
    {
      icon: '💬',
      title: 'مشاوره تلفنی رایگان',
      text: 'قیمت قطعی قبل از شروع کار اعلام و با تأیید شما نهایی می‌شود — بدون هزینه پنهان',
    },
    {
      icon: '🛠️',
      title: `${siteConfig.stats.repaired} تعمیر موفق`,
      text: `${siteConfig.stats.years} سال تخصص، تیم ${siteConfig.stats.technicians} تکنسین ثابت`,
    },
    {
      icon: '⚡',
      title: 'اعزام کمتر از ۲ ساعت',
      text: 'سراسر تهران، شنبه تا پنجشنبه — جمعه با هماهنگی',
    },
  ];

  return (
    <section
      aria-label="تضمین‌های پیچ‌گوشتی"
      className="border-y border-brand-100 bg-brand-50/60"
    >
      <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-3 px-4 py-5 lg:grid-cols-4">
        {items.map((it) => (
          <li
            key={it.title}
            className="flex flex-col gap-1 rounded-2xl bg-white p-4 ring-1 ring-brand-100"
          >
            <span className="text-xl" aria-hidden="true">
              {it.icon}
            </span>
            <span className="text-sm font-extrabold text-brand-950">{it.title}</span>
            <span className="text-xs leading-6 text-slate-500">{it.text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
