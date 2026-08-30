import { testimonials, averageRating, totalReviews } from '@/data/testimonials';
import { SectionHeading } from './SectionHeading';

/**
 * بخش نظرات مشتریان
 */
export function Testimonials({ compact = false }: { compact?: boolean }) {
  const list = compact ? testimonials.slice(0, 3) : testimonials;

  return (
    <section className="mx-auto max-w-6xl px-4">
      <SectionHeading
        eyebrow="نظرات مشتریان"
        title="مشتریان ما چه می‌گویند؟"
        description={`امتیاز ${averageRating} از ۵ بر اساس ${totalReviews.toLocaleString('fa-IR')} نظر ثبت‌شده مشتریان در گوگل و بله.`}
      />
      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((t) => (
          <li
            key={t.name}
            className="flex h-full flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 ease-out-quart hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-950/5"
          >
            <div className="flex items-center gap-1" aria-label={`امتیاز ${t.rating} از ۵`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} aria-hidden="true" className={i < t.rating ? 'text-accent-500' : 'text-slate-200'}>
                  ★
                </span>
              ))}
            </div>
            <blockquote className="text-sm leading-8 text-slate-600">«{t.text}»</blockquote>
            <footer className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500">
              <span className="font-extrabold text-brand-950">{t.name}</span>
              <span>
                {t.area}؛ {t.service}
              </span>
            </footer>
          </li>
        ))}
      </ul>
    </section>
  );
}