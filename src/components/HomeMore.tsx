import Link from 'next/link';
import { areaGroups, areas } from '@/data/areas';
import { posts } from '@/data/posts';
import { homeFaqs } from '@/data/home-faqs';
import { SectionHeading } from './SectionHeading';
import { AreaCard, BlogCard } from './Cards';
import { Testimonials } from './Testimonials';
import { FaqAccordion } from './FaqAccordion';
import { Reveal } from './Reveal';

/** ادامه بخش‌های صفحه اصلی: مناطق، نظرات، سوالات و وبلاگ */
export function HomeMore() {
  return (
    <>
      {/* مناطق */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <SectionHeading
          eyebrow="پوشش تهران"
          title="تعمیر تلویزیون در همه مناطق تهران"
          description={`${areas.length.toLocaleString('fa-IR')} محله و منطقه تحت پوشش با زمان اعزام مشخص. محله خود را انتخاب کنید:`}
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {areaGroups[0].areas.slice(0, 3).map((a, i) => (
            <Reveal key={a.slug} delay={i * 60} className="h-full">
              <AreaCard area={a} />
            </Reveal>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link href="/areas/" className="inline-flex rounded-2xl border border-brand-200 bg-white px-6 py-3 text-sm font-extrabold text-brand-700 transition hover:bg-brand-50">
            دیدن همه مناطق و محله‌ها ←
          </Link>
        </div>
      </section>

      <Testimonials compact />

      {/* سوالات متداول */}
      <section className="mx-auto max-w-4xl px-4 py-16">
        <SectionHeading
          eyebrow="سوالات متداول"
          title="پاسخ سریع به پرسش‌های رایج"
          description="پرسش‌های بیشتر در صفحه سوالات متداول و تعرفه‌ها آمده است."
        />
        <div className="mt-10">
          <FaqAccordion faqs={homeFaqs} withSchema />
        </div>
      </section>

      {/* وبلاگ */}
      <section className="border-y border-slate-100 bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            eyebrow="راهنما و مقالات"
            title="قبل از تعمیر، این‌ها را بخوانید"
            description="راهنماهای عملی برای شناخت علائم خرابی و تصمیم درست درباره تعمیر تلویزیون."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 3).map((p, i) => (
              <Reveal key={p.slug} delay={i * 60} className="h-full">
                <BlogCard post={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}