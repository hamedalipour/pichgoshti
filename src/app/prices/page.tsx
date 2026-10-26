import Link from 'next/link';
import { PriceTable } from '@/components/PriceTable';
import { buildMetadata } from '@/lib/seo';
import { PageHero, SectionHeading } from '@/components/SectionHeading';
import { CTASection } from '@/components/CTASection';
import { allFaqs } from '@/data/faqs';

export const metadata = buildMetadata({
  title: 'هزینه تعمیر تلویزیون ۱۴۰۵ | جدول قیمت به تومان + مشاوره رایگان',
  description:
    'هزینه تعمیر تلویزیون در تهران ۱۴۰۵ به تومان: عیب‌یابی، برد پاور از ۸۰۰ هزار، تعویض بک‌لایت از ۱.۸ میلیون، پنل و فلش اندروید. قیمت قطعی بعد از عیب‌یابی؛ مشاوره تلفنی رایگان.',
  keywords: ['هزینه تعمیر تلویزیون', 'قیمت تعمیر تلویزیون', 'تعرفه تعمیرات تلویزیون', 'هزینه تعویض بک لایت'],
  path: '/prices/',
});

export default function PricesPage() {
  return (
    <>
      <PageHero
        title="هزینه تعمیر تلویزیون در ۱۴۰۵"
        description="بازه‌های قیمت سال ۱۴۰۵ به تومان. قیمت قطعی پس از عیب‌یابی و قبل از شروع تعمیر، با تأیید شما نهایی می‌شود؛ هیچ هزینه پنهانی وجود ندارد."
      />
      <section className="mx-auto max-w-4xl px-4 py-12">
        <PriceTable />
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-extrabold text-brand-950">هزینه تعویض بک‌لایت تلویزیون در ۱۴۰۵</h2>
          <p className="mt-3 text-sm leading-8 text-slate-600">
            هزینه تعویض بک‌لایت به سایز پنل بستگی دارد: ۳۲ تا ۴۳ اینچ از ۱.۸ میلیون، ۵۰ تا ۵۵ اینچ از ۲.۵ میلیون و ۶۵ اینچ به بالا از ۳.۵ میلیون تومان. اگر مشکل از درایور باشد، تعمیر بک‌لایت از ۹۰۰ هزار تومان انجام می‌شود — تست دستگاه در محل مشخص می‌کند کدام مورد است.
          </p>
          <ul className="mt-4 flex flex-col gap-2 text-sm font-bold text-brand-700">
            <li><Link href="/blog/backlight-cost-by-size/" className="underline decoration-accent-400 underline-offset-4">جدول کامل هزینه تعویض بک‌لایت به تفکیک سایز</Link></li>
            <li><Link href="/blog/backlight-repair-vs-replace/" className="underline decoration-accent-400 underline-offset-4">تعمیر بک‌لایت یا تعویض کامل؟ مقایسه هزینه</Link></li>
            <li><Link href="/services/backlight/" className="underline decoration-accent-400 underline-offset-4">خدمت تعمیر بک‌لایت تلویزیون در محل</Link></li>
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-16">
        <SectionHeading eyebrow="سوالات هزینه" title="پرسش‌های رایج درباره هزینه‌ها" />
        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6">
          <ul className="flex flex-col gap-5">
            {allFaqs.slice(5, 9).map((f) => (
              <li key={f.q} className="border-b border-slate-100 pb-4 last:border-0">
                <h3 className="font-extrabold text-brand-950">{f.q}</h3>
                <p className="mt-2 text-sm leading-8 text-slate-600">{f.a}</p>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-6 text-center text-sm">
          <Link href="/faq/" className="font-bold text-brand-600">همه سوالات متداول ←</Link>
        </p>
      </section>

      <div className="pb-16">
        <CTASection title="قیمت دقیق تعمیر تلویزیون خود را همین حالا بگیرید" />
      </div>
    </>
  );
}