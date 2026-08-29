import { areaGroups, areas } from '@/data/areas';
import { buildMetadata } from '@/lib/seo';
import { PageHero } from '@/components/SectionHeading';
import { AreaCard } from '@/components/Cards';
import { CTASection } from '@/components/CTASection';

export const metadata = buildMetadata({
  title: 'مناطق تحت پوشش تعمیر تلویزیون در تهران',
  description: `${areas.length.toLocaleString('fa-IR')} محله و منطقه تهران تحت پوشش اعزام تکنسین تعمیرات تلویزیون؛ با زمان اعزام مشخص و گارانتی کتبی.`,
  path: '/areas/',
});

export default function AreasPage() {
  return (
    <>
      <PageHero
        title="مناطق تحت پوشش تعمیر تلویزیون در تهران"
        description="تکنسین‌های ما در همه مناطق تهران اعزام دارند؛ زمان اعزام هر منطقه را در صفحه اختصاصی آن ببینید و درخواست را در چند ثانیه ثبت کنید."
      />
      <section className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-12">
        {areaGroups.map((group) => (
          <div key={group.title}>
            <h2 className="mb-6 flex items-center gap-3 text-xl font-extrabold text-brand-950">
              <span aria-hidden="true" className="h-6 w-1.5 rounded-full bg-accent-500" />
              {group.title}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.areas.map((a) => (
                <AreaCard key={a.slug} area={a} />
              ))}
            </div>
          </div>
        ))}
      </section>
      <div className="pb-16">
        <CTASection title="منطقه شما در لیست نیست؟" description="برای نقاط خاص تهران هم با هماهنگی قبلی اعزام داریم؛ آدرس خود را در بله بفرستید." />
      </div>
    </>
  );
}