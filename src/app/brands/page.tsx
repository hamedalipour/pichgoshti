import { brands } from '@/data/brands';
import { buildMetadata } from '@/lib/seo';
import { PageHero } from '@/components/SectionHeading';
import { BrandCard } from '@/components/Cards';
import { CTASection } from '@/components/CTASection';

export const metadata = buildMetadata({
  title: 'تعمیر تلویزیون همه برندها | سونی، ال‌جی، سامسونگ و…',
  description:
    'تعمیر تخصصی تلویزیون سونی، ال‌جی، سامسونگ، پاناسونیک، اسنوا، ایکس‌ویژن، جی‌پلاس، هیسنس، تی‌سی‌ال و آمیکو در تهران با گارانتی کتبی.',
  path: '/brands/',
});

export default function BrandsPage() {
  return (
    <>
      <PageHero
        title="تعمیر تخصصی تلویزیون همه برندها"
        description="هر برند، قطعات و خطاهای مخصوص خودش را دارد. صفحه برند تلویزیون خود را انتخاب کنید تا ایرادهای رایج آن مدل‌ها و هزینه تعمیر را ببینید."
      />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {brands.map((b) => (
            <BrandCard key={b.slug} brand={b} />
          ))}
        </div>
      </section>
      <div className="pb-16">
        <CTASection title="برند تلویزیون شما در لیست نیست؟" description="برای همه برندهای رایج و حتی کمتر شناخته‌شده بازار ایران خدمات داریم؛ مدل را در بله بفرستید تا بررسی کنیم." />
      </div>
    </>
  );
}