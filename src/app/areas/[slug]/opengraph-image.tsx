import { renderOgImage, ogSize, ogContentType } from '@/lib/og';
import { areas, getArea } from '@/data/areas';

export const size = ogSize;
export const contentType = ogContentType;

/** برای سازگاری با output: 'export' */
export const dynamic = 'force-static';

export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}

/** تصویر OG اختصاصی هر منطقه — «تعمیر تلویزیون در {منطقه}» */
export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = getArea(slug);
  return renderOgImage(
    `تعمیر تلویزیون در ${area?.name ?? 'تهران'}`,
    area
      ? `اعزام تکنسین به ${area.name} (${area.district}) در ${area.arrival} — گارانتی کتبی ۳ ماهه.`
      : 'اعزام تکنسین در سراسر تهران با گارانتی کتبی',
  );
}
