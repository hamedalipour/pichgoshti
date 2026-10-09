import type { MetadataRoute } from 'next';
import { siteConfig } from '@/data/site';
import { services } from '@/data/services';
import { brands, featuredBrandSlugs } from '@/data/brands';
import { areas } from '@/data/areas';
import { posts } from '@/data/posts';

/** برای سازگاری با output: 'export' */
export const dynamic = 'force-static';

/**
 * lastmod صفحات ایستا (خدمات، برندها، مناطق، صفحات ثابت).
 *
 * قبلاً این تاریخ هاردکد بود و با تغییر محتوا به‌روز نمی‌شد؛ یعنی lastmod دروغ می‌گفت
 * و Google آن را نادیده می‌گیرد. حالو از جدیدترین تاریخ به‌روزرسانی مقالات
 * (content/posts.json) خوانده می‌شود تا هر بار که محتوا دست بخورد، سیگنال واقعی بدهد.
 */
const STATIC_BASELINE = new Date('2026-09-26T12:00:00.000Z');

/** جدیدترین تاریخ به‌روزرسانی بین همه مقالات — مبنای lastmod صفحات ایستا */
const latestPostUpdate = posts
  .map((p) => p.dateUpdated ?? p.isoDate)
  .sort()
  .at(-1);

const CONTENT_LAST_MODIFIED = new Date(
  Math.max(
    STATIC_BASELINE.getTime(),
    new Date(latestPostUpdate ?? STATIC_BASELINE).getTime(),
  ),
);

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  }[] = [
    { path: '', priority: 1, changeFrequency: 'weekly' },
    { path: 'services/', priority: 0.9, changeFrequency: 'monthly' },
    { path: 'brands/', priority: 0.8, changeFrequency: 'monthly' },
    { path: 'areas/', priority: 0.8, changeFrequency: 'monthly' },
    { path: 'prices/', priority: 0.9, changeFrequency: 'monthly' },
    { path: 'blog/', priority: 0.8, changeFrequency: 'weekly' },
    { path: 'faq/', priority: 0.6, changeFrequency: 'monthly' },
    { path: 'about/', priority: 0.5, changeFrequency: 'yearly' },
    { path: 'contact/', priority: 0.7, changeFrequency: 'yearly' },
    { path: 'terms/', priority: 0.3, changeFrequency: 'yearly' },
  ];

  return [
    ...staticEntries(),
    ...services.map((s) => entry(`/services/${s.slug}/`, 0.9, CONTENT_LAST_MODIFIED)),
    // برندهای تخصصی سایت (دوو و اسنوا) اولویت بالاتری در نقشه سایت دارند
    ...brands.map((b) =>
      entry(
        `/brands/${b.slug}/`,
        featuredBrandSlugs.includes(b.slug) ? 0.9 : 0.7,
        CONTENT_LAST_MODIFIED,
      ),
    ),
    ...areas.map((a) => entry(`/areas/${a.slug}/`, 0.8, CONTENT_LAST_MODIFIED)),
    ...posts.map((p) => entry(`/blog/${p.slug}/`, 0.6, new Date(p.dateUpdated ?? p.isoDate))),
  ];

  function entry(path: string, priority: number, lastModified: Date = CONTENT_LAST_MODIFIED) {
    return {
      url: `${siteConfig.url}${path}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority,
    };
  }

  function staticEntries() {
    return staticPages.map((p) => ({
      url: `${siteConfig.url}/${p.path}`,
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    }));
  }
}
