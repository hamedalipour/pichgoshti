import { faqGroups, allFaqs } from '@/data/faqs';
import { faqSchema } from '@/components/FaqAccordion';
import { FaqAccordion } from '@/components/FaqAccordion';
import { buildMetadata } from '@/lib/seo';
import { PageHero } from '@/components/SectionHeading';
import { JsonLd } from '@/components/JsonLd';
import { CTASection } from '@/components/CTASection';

export const metadata = buildMetadata({
  title: 'سوالات متداول تعمیرات تلویزیون',
  description:
    'پاسخ بیش از ۱۵ پرسش رایج درباره تعمیر تلویزیون در تهران: هزینه‌ها، گارانتی، فرآیند تعمیر در محل و انتخاب تعمیرکار مطمئن.',
  path: '/faq/',
});

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqSchema(allFaqs)} />
      <PageHero
        title="سوالات متداول"
        description="هر سوال دیگری دارید، در بله یا تلفن پاسخ می‌گیرید؛ مشاوره اولیه ما رایگان است."
      />
      <section className="mx-auto flex max-w-4xl flex-col gap-10 px-4 py-12">
        {faqGroups.map((group) => (
          <section key={group.id}>
            <h2 className="mb-5 flex items-center gap-2 text-xl font-extrabold text-brand-950">
              <span aria-hidden="true" className="size-2 rounded-full bg-accent-500" />
              {group.title}
            </h2>
            <FaqAccordion faqs={group.faqs} />
          </section>
        ))}
      </section>
      <div className="pb-16">
        <CTASection title="سوال دیگری دارید؟ همین حالا بپرسید" />
      </div>
    </>
  );
}