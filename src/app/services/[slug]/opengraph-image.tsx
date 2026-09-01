import { renderOgImage, ogSize, ogContentType } from '@/lib/og';
import { getService, services } from '@/data/services';

export const size = ogSize;
export const contentType = ogContentType;

/** برای سازگاری با output: 'export' */
export const dynamic = 'force-static';

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

/** تصویر OG اختصاصی هر خدمت */
export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  return renderOgImage(
    service?.navLabel ?? 'خدمات تعمیرات تلویزیون',
    service?.excerpt ?? 'تعمیر تخصصی تلویزیون در تهران با گارانتی کتبی',
  );
}
