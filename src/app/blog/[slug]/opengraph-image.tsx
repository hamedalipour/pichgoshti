import { renderOgImage, ogSize, ogContentType } from '@/lib/og';
import { getPost, posts } from '@/data/posts';

export const size = ogSize;
export const contentType = ogContentType;

/** برای سازگاری با output: 'export' */
export const dynamic = 'force-static';

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

/** تصویر OG اختصاصی هر مقاله — با عنوان مقاله */
export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  return renderOgImage(post?.title ?? 'راهنما و مقالات تعمیر تلویزیون', post?.excerpt);
}
