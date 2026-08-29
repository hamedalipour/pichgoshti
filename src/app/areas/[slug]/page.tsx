import Link from 'next/link';
import { notFound } from 'next/navigation';
import { areas, getArea, getNearbyAreas } from '@/data/areas';
import { services } from '@/data/services';
import { buildMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SectionHeading } from '@/components/SectionHeading';
import { ServiceCard } from '@/components/Cards';
import { FaqAccordion } from '@/components/FaqAccordion';
import { CTASection } from '@/components/CTASection';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) return {};
  return buildMetadata({
    title: area.seoTitle,
    description: area.seoDescription,
    path: `/areas/${area.slug}/`,
    keywords: [`تعمیر تلویزیون در ${area.name}`, 'تعمیر تلویزیون تهران', area.district],
  });
}

const areaFaqs = [
  { q: 'تکنسین چقدر طول می‌کشد به محل ما برسد؟', a: 'بسته به موقعیت شما معمولاً بین ۳۰ دقیقه تا ۲ ساعت؛ زمان دقیق هنگام ثبت درخواست اعلام می‌شود.' },
  { q: 'آیا عیب‌یابی در محل هزینه دارد؟', a: 'بازدید و عیب‌یابی در محل بازه قیمت مشخصی دارد که در صورت تعمیر از مبلغ نهایی کسر می‌شود؛ یعنی عملاً رایگان است.' },
  { q: 'کدام خرابی‌ها در محل تعمیر می‌شوند؟', a: 'خرابی‌های برد پاور، مشکلات آنتن و گیرنده، نصب و جابه‌جایی در محل انجام می‌شود. پنل و بک‌لایت به کارگاه منتقل می‌شوند.' },
  { q: 'گارانتی تعمیر چقدر است؟', a: 'همه تعمیرات با گارانتی کتبی ۳ ماهه و فاکتور رسمی تحویل داده می‌شود.' },
];

export default async function AreaPage({ params }: Params) {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) notFound();

  const nearby = getNearbyAreas(area);
  const featured = services.slice(0, 3);

  return (
    <>
      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10">
          <Breadcrumbs items={[{ name: 'مناطق تهران', href: '/areas/' }, { name: area.name }]} />
          <h1 className="text-2xl font-extrabold leading-snug text-brand-950 sm:text-3xl lg:text-4xl">
            تعمیر تلویزیون در {area.name}
          </h1>
          <p className="max-w-3xl leading-8 text-slate-600 sm:text-lg">
            اعزام تکنسین به {area.name} ({area.district}) در {area.arrival} — با گارانتی کتبی ۳ ماهه و
            عیب‌یابی شفاف قبل از تعمیر.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <article className="flex flex-col gap-10">
            <div className="flex flex-col gap-5">
              {area.intro.map((p, i) => (
                <p key={i} className="text-[16px] leading-9 text-slate-700">{p}</p>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { icon: '⚡', label: 'زمان اعزام', value: area.arrival },
                { icon: '🛡️', label: 'گارانتی', value: '۳ ماه کتبی' },
                { icon: '📍', label: 'منطقه', value: area.district },
              ].map((c) => (
                <div key={c.label} className="flex flex-col gap-1 rounded-2xl border border-slate-200 bg-white p-5 text-center">
                  <span className="text-2xl" aria-hidden="true">{c.icon}</span>
                  <span className="text-xs text-slate-500">{c.label}</span>
                  <span className="font-extrabold text-brand-900">{c.value}</span>
                </div>
              ))}
            </div>

            <div>
              <SectionHeading align="start" title="خدمات اصلی در این منطقه" />
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {featured.map((s) => (
                  <ServiceCard key={s.slug} service={s} />
                ))}
              </div>
              <div className="mt-4 text-sm">
                <Link href="/services/" className="font-bold text-brand-600">همه خدمات تعمیرات ←</Link>
              </div>
            </div>

            <div>
              <SectionHeading align="start" title="سوالات رایج مشتریان این منطقه" />
              <div className="mt-6">
                <FaqAccordion faqs={areaFaqs} />
              </div>
            </div>

            {nearby.length > 0 && (
              <div>
                <h2 className="mb-4 text-lg font-extrabold text-brand-950">مناطق نزدیک</h2>
                <div className="flex flex-wrap gap-2">
                  {nearby.map((n) => (
                    <Link key={n.slug} href={`/areas/${n.slug}/`} className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-600 ring-1 ring-slate-200 transition hover:bg-brand-50 hover:text-brand-700">
                      {n.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>

          <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl bg-brand-900 p-6 text-white">
              <h2 className="text-base font-extrabold">درخواست سریع در {area.name}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                مدل تلویزیون و مشکل را در بله بفرستید؛ برآورد هزینه و زمان اعزام فوری.
              </p>
              <Link href="/contact/" className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-accent-500 px-5 py-3 text-sm font-extrabold text-brand-950 transition hover:bg-accent-400">
                ثبت درخواست تعمیر
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <div className="pb-16">
        <CTASection title={`تعمیر تلویزیون در ${area.name} — همین امروز`} />
      </div>
    </>
  );
}