import { JsonLd } from './JsonLd';
import type { Faq } from '@/data/faqs';

/**
 * آکاردئون سوالات متداول با <details> (بدون جاوااسکریپت)
 * اختیاری: افزودن اسکیمای FAQPage
 */
export function FaqAccordion({
  faqs,
  withSchema = false,
  title = 'سوالات متداول',
}: {
  faqs: Faq[];
  withSchema?: boolean;
  title?: string;
}) {
  return (
    <div>
      {withSchema && <JsonLd data={faqSchema(faqs)} />}
      <h2 className="sr-only">{title}</h2>
      <div className="flex flex-col gap-3">
        {faqs.map((f) => (
          <details key={f.q} className="faq group rounded-2xl border border-slate-200 bg-white open:border-brand-200 open:bg-brand-50/40">
            <summary className="flex items-center justify-between gap-4 px-5 py-4 text-[15px] font-bold text-brand-950 transition hover:text-brand-700">
              <span>{f.q}</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                className="faq-chevron size-5 shrink-0 text-brand-500"
                aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </summary>
            <div className="border-t border-slate-100 px-5 py-4 text-[15px] leading-8 text-slate-600">
              {f.a}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

export function faqSchema(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}