import Link from 'next/link';
import { notFound } from 'next/navigation';
import { services } from '@/data/services';
import { areas } from '@/data/areas';
import { buildMetadata } from '@/lib/seo';
import { getServiceSchema } from '@/lib/schema';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SectionHeading } from '@/components/SectionHeading';
import { FaqAccordion } from '@/components/FaqAccordion';
import { CTASection } from '@/components/CTASection';
import { JsonLd } from '@/components/JsonLd';

type Params = { params: Promise<{ slug: string }> };

/** همه صفحات خدمات در بیلد استاتیک تولید می‌شوند */
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return buildMetadata({
    title: service.seoTitle,
    description: service.seoDescription,
    path: `/services/${service.slug}/`,
    keywords: service.keywords,
  });
}

/** دسته‌های تعرفه مرتبط با هر خدمت (از /data/prices.ts) */
const priceCategoryFor: Record<string, string[]> = {
  'power-board': ['boards'],
  mainboard: ['boards'],
  tcon: ['boards'],
  backlight: ['backlight'],
  panel: ['panel'],
  lcd: ['boards', 'backlight'],
  led: ['boards', 'backlight'],
  oled: ['boards', 'panel'],
  qled: ['boards', 'backlight'],
  'smart-tv': ['software'],
  'android-tv': ['software'],
  'wall-mount': ['install'],
};

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const related = service.related
    .map((r) => services.find((s) => s.slug === r))
    .filter((s): s is (typeof services)[number] => Boolean(s));

  return (
    <>
      <JsonLd
        data={getServiceSchema({
          name: service.navLabel,
          description: service.seoDescription,
          path: `/services/${service.slug}/`,
          faqs: service.faqs,
        })}
      />

      {/* سرصفحه خدمت */}
      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10">
          <Breadcrumbs items={[{ name: 'خدمات', href: '/services/' }, { name: service.navLabel }]} />
          <h1 className="text-2xl font-extrabold leading-snug text-brand-950 sm:text-3xl lg:text-4xl">
            {service.title}
          </h1>
          <p className="max-w-3xl leading-8 text-slate-600 sm:text-lg">{service.excerpt}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <article className="flex flex-col gap-10">
            <div className="flex flex-col gap-5">
              {service.intro.map((p, i) => (
                <p key={i} className="text-[16px] leading-9 text-slate-700">{p}</p>
              ))}
            </div>

            <div>
              <SectionHeading align="start" title={`علائم ${service.navLabel}`} />
              <ul className="mt-6 flex flex-col gap-3 rounded-3xl bg-slate-50 p-6">
                {service.symptoms.map((s) => (
                  <li key={s} className="flex items-start gap-3 text-[15px] leading-8 text-slate-700">
                    <span aria-hidden="true" className="mt-2.5 size-2 shrink-0 rounded-full bg-accent-500" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <SectionHeading align="start" title="مراحل کار از ثبت درخواست تا تحویل" />
              <ol className="mt-6 grid gap-4 sm:grid-cols-2">
                {service.process.map((p, i) => (
                  <li key={p.title} className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-5">
                    <span className="flex size-8 items-center justify-center rounded-lg bg-brand-50 text-sm font-extrabold text-brand-700">
                      {(i + 1).toLocaleString('fa-IR')}
                    </span>
                    <h3 className="font-extrabold text-brand-950">{p.title}</h3>
                    <p className="text-sm leading-7 text-slate-600">{p.text}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-3xl border border-accent-500/40 bg-accent-500/10 p-6">
              <h2 className="text-lg font-extrabold text-brand-950">هزینه {service.navLabel}</h2>
              <p className="mt-3 leading-8 text-slate-700">{service.priceNote}</p>
              <Link href="/prices/" className="mt-3 inline-flex text-sm font-bold text-brand-700 underline decoration-accent-400 underline-offset-4">
                جدول کامل تعرفه‌ها ←
              </Link>
            </div>

            <div>
              <SectionHeading align="start" title="سوالات متداول این خدمت" />
              <div className="mt-6">
                <FaqAccordion faqs={service.faqs} />
              </div>
            </div>
          </article>

          <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <h2 className="text-base font-extrabold text-brand-950">پوشش همه مناطق تهران</h2>
              <p className="mt-2 text-sm leading-7 text-slate-500">
                این خدمت در {areas.length.toLocaleString('fa-IR')} منطقه تهران ارائه می‌شود؛ چند مورد:
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {areas.slice(0, 8).map((a) => (
                  <li key={a.slug}>
                    <Link href={`/areas/${a.slug}/`} className="inline-flex rounded-full bg-slate-50 px-3.5 py-1.5 text-xs font-bold text-slate-600 transition hover:bg-brand-50 hover:text-brand-700">
                      {a.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/areas/" className="mt-4 inline-flex text-sm font-bold text-brand-600">
                همه مناطق ←
              </Link>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <h2 className="text-base font-extrabold text-brand-950">خدمات مرتبط</h2>
              <ul className="mt-3 flex flex-col gap-2 text-sm">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/services/${r.slug}/`} className="flex items-center justify-between rounded-xl px-3 py-2.5 font-bold text-slate-600 transition hover:bg-slate-50 hover:text-brand-700">
                      {r.navLabel}
                      <span aria-hidden="true">←</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <div className="pb-16">
        <CTASection title={`برای ${service.navLabel} همین حالا درخواست ثبت کنید`} />
      </div>
    </>
  );
}

// دسته‌های تعرفه برای نمایش در فوتر صفحات خدمت (در صورت نیاز)