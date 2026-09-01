import Link from 'next/link';
import { notFound } from 'next/navigation';
import { brands, getBrandFaqs } from '@/data/brands';
import { services } from '@/data/services';
import { areas } from '@/data/areas';
import { buildMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SectionHeading } from '@/components/SectionHeading';
import { ServiceCard } from '@/components/Cards';
import { FaqAccordion } from '@/components/FaqAccordion';
import { CTASection } from '@/components/CTASection';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const brand = brands.find((b) => b.slug === slug);
  if (!brand) return {};
  return buildMetadata({
    title: brand.seoTitle,
    description: brand.seoDescription,
    path: `/brands/${brand.slug}/`,
    keywords: [`تعمیر تلویزیون ${brand.name}`, `تعمیر تلویزیون ${brand.nameEn}`, 'تهران'],
  });
}

/** خدمات پیشنهادی برای هر برند */
const brandServices: Record<string, string[]> = {
  daewoo: ['power-board', 'android-tv', 'backlight', 'mainboard'],
  snowa: ['android-tv', 'power-board', 'backlight', 'panel'],
  default: ['power-board', 'mainboard', 'backlight', 'panel'],
};

export default async function BrandPage({ params }: Params) {
  const { slug } = await params;
  const brand = brands.find((b) => b.slug === slug);
  if (!brand) notFound();

  const relatedSlugs = brandServices[brand.slug] ?? brandServices.default;
  const related = relatedSlugs
    .map((s) => services.find((x) => x.slug === s))
    .filter((s): s is (typeof services)[number] => Boolean(s));

  return (
    <>
      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10">
          <Breadcrumbs items={[{ name: 'برندها', href: '/brands/' }, { name: `تعمیر ${brand.name}` }]} />
          <h1 className="text-2xl font-extrabold leading-snug text-brand-950 sm:text-3xl lg:text-4xl">
            {brand.seoTitle.split('|')[0].trim()}
          </h1>
          <p className="max-w-3xl leading-8 text-slate-600 sm:text-lg">{brand.excerpt}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <article className="flex flex-col gap-10">
            <div className="flex flex-col gap-5">
              {brand.intro.map((p, i) => (
                <p key={i} className="text-[16px] leading-9 text-slate-700">{p}</p>
              ))}
            </div>

            <div>
              <SectionHeading align="start" title={`ایرادهای رایج تلویزیون ${brand.name}`} />
              <ul className="mt-6 flex flex-col gap-3 rounded-3xl bg-slate-50 p-6">
                {brand.commonIssues.map((s) => (
                  <li key={s} className="flex items-start gap-3 text-[15px] leading-8 text-slate-700">
                    <span aria-hidden="true" className="mt-2.5 size-2 shrink-0 rounded-full bg-accent-500" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-accent-500/40 bg-accent-500/10 p-6">
              <h2 className="text-lg font-extrabold text-brand-950">هزینه تعمیر تلویزیون {brand.name}</h2>
              <p className="mt-3 leading-8 text-slate-700">
                هزینه بسته به نوع خرابی متفاوت است؛ از تعمیر برد پاور (از ۸۰۰ هزار تومان) تا تعویض بک‌لایت
                و پنل. قیمت قطعی پس از عیب‌یابی و قبل از شروع کار، با تأیید شما نهایی می‌شود و عیب‌یابی در
                صورت تعمیر رایگان محاسبه می‌شود.
              </p>
              <Link href="/prices/" className="mt-3 inline-flex text-sm font-bold text-brand-700 underline decoration-accent-400 underline-offset-4">
                جدول کامل تعرفه‌ها ←
              </Link>
            </div>

            <div>
              <SectionHeading align="start" title={`سوالات متداول تعمیر تلویزیون ${brand.name}`} />
              <div className="mt-6">
                <FaqAccordion faqs={getBrandFaqs(brand)} withSchema title={`سوالات متداول تعمیر تلویزیون ${brand.name}`} />
              </div>
            </div>
          </article>

          <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <h2 className="text-base font-extrabold text-brand-950">خدمات برای {brand.name}</h2>
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
            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <h2 className="text-base font-extrabold text-brand-950">اعزام به {areas.length.toLocaleString('fa-IR')} منطقه</h2>
              <p className="mt-2 text-sm leading-7 text-slate-500">از سعادت‌آباد تا تهرانپارس؛ لیست کامل مناطق:</p>
              <Link href="/areas/" className="mt-3 inline-flex text-sm font-bold text-brand-600">
                همه مناطق ←
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-4">
        <SectionHeading eyebrow="برندهای دیگر" title="برند دیگری دارید؟" />
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {brands
            .filter((b) => b.slug !== brand.slug)
            .map((b) => (
              <Link key={b.slug} href={`/brands/${b.slug}/`} className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-600 ring-1 ring-slate-200 transition hover:bg-brand-50 hover:text-brand-700">
                تعمیر {b.name}
              </Link>
            ))}
        </div>
      </section>

      <div className="py-12">
        <CTASection title={`تعمیر تلویزیون ${brand.name} — امروز انجام می‌شود`} />
      </div>
    </>
  );
}