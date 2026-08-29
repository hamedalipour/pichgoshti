import Link from 'next/link';
import { PriceTable } from '@/components/PriceTable';
import { buildMetadata } from '@/lib/seo';
import { PageHero, SectionHeading } from '@/components/SectionHeading';
import { CTASection } from '@/components/CTASection';
import { allFaqs } from '@/data/faqs';

export const metadata = buildMetadata({
  title: 'تعرفه خدمات تعمیرات تلویزیون (۱۴۰۵)',
  description:
    'جدول تعرفه خدمات تعمیر تلویزیون در تهران ۱۴۰۵: عیب‌یابی، تعمیر بردها، تعویض بک‌لایت و پنل، فلش اندروید و نصب دیواری.',
  path: '/prices/',
});

export default function PricesPage() {
  return (
    <>
      <PageHero
        title="تعرفه خدمات تعمیرات تلویزیون"
        description="بازه‌های قیمت سال ۱۴۰۵ به تومان. قیمت قطعی پس از عیب‌یابی و قبل از شروع تعمیر، با تأیید شما نهایی می‌شود؛ هیچ هزینه پنهانی وجود ندارد."
      />
      <section className="mx-auto max-w-4xl px-4 py-12">
        <PriceTable />
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