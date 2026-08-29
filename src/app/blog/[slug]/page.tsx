import Link from 'next/link';
import { notFound } from 'next/navigation';
import { posts, getPost, readingTime } from '@/data/posts';
import { getService } from '@/data/services';
import { buildMetadata } from '@/lib/seo';
import { getBlogPostSchema } from '@/lib/schema';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { PostBlocks } from '@/components/PostBlocks';
import { CTASection } from '@/components/CTASection';
import { JsonLd } from '@/components/JsonLd';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.seoTitle,
    description: post.seoDescription,
    path: `/blog/${post.slug}/`,
    keywords: post.keywords,
    ogType: 'article',
    publishedTime: post.isoDate,
  });
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const relatedServices = post.relatedServices
    .map((s) => getService(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const others = posts.filter((p) => p.slug !== post.slug);

  return (
    <>
      <JsonLd
        data={getBlogPostSchema({
          title: post.title,
          description: post.seoDescription,
          path: `/blog/${post.slug}/`,
          isoDate: post.isoDate,
          keywords: post.keywords,
        })}
      />
      <article className="mx-auto max-w-6xl px-4 py-10">
        <div className="mx-auto flex max-w-3xl flex-col gap-5">
          <Breadcrumbs items={[{ name: 'وبلاگ', href: '/blog/' }, { name: post.title }]} />
          <h1 className="text-2xl font-extrabold leading-[1.5] text-brand-950 sm:text-3xl">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <time dateTime={post.isoDate} className="rounded-full bg-slate-100 px-3.5 py-1.5 font-bold">
              📅 {post.dateFa}
            </time>
            <span className="rounded-full bg-slate-100 px-3.5 py-1.5 font-bold">
              ⏱ زمان مطالعه: {readingTime(post.blocks)}
            </span>
          </div>
          <p className="rounded-2xl bg-brand-50 px-5 py-4 text-[15px] font-bold leading-8 text-brand-800">
            {post.excerpt}
          </p>

          <div className="mt-2">
            <PostBlocks blocks={post.blocks} />
          </div>

          {/* خدمات مرتبط برای لینک‌سازی داخلی */}
          {relatedServices.length > 0 && (
            <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-extrabold text-brand-950">خدمات مرتبط با این مقاله</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {relatedServices.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}/`} className="inline-flex rounded-full bg-brand-50 px-4 py-2 text-sm font-bold text-brand-700 transition hover:bg-brand-100">
                      {s.navLabel}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* مقالات بعدی */}
          <section className="mt-4">
            <h2 className="text-lg font-extrabold text-brand-950">مطالب مرتبط</h2>
            <ul className="mt-4 flex flex-col gap-2">
              {others.slice(0, 3).map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}/`} className="flex items-center justify-between rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-700 ring-1 ring-slate-200 transition hover:border-brand-300 hover:text-brand-700">
                    {p.title}
                    <span aria-hidden="true">←</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </article>

      <div className="pb-16">
        <CTASection title="این راهنما مشکل شما را حل نکرد؟ تکنسین را بخواهید" />
      </div>
    </>
  );
}