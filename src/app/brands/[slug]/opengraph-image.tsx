import { renderOgImage, ogSize, ogContentType } from '@/lib/og';
import { brands, getBrand } from '@/data/brands';

export const size = ogSize;
export const contentType = ogContentType;

/** برای سازگاری با output: 'export' */
export const dynamic = 'force-static';

export function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

/** تصویر OG اختصاصی هر برند — «تعمیر تلویزیون {نام برند}» */
export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const brand = getBrand(slug);
  return renderOgImage(
    `تعمیر تلویزیون ${brand?.name ?? ''} در تهران`,
    brand?.excerpt ?? 'تعمیر تخصصی تلویزیون در تهران با گارانتی کتبی',
  );
}
