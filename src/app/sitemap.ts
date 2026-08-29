import type { MetadataRoute } from 'next';
import { siteConfig } from '@/data/site';
import { services } from '@/data/services';
import { brands } from '@/data/brands';
import { areas } from '@/data/areas';
import { posts } from '@/data/posts';

/** برای سازگاری با output: 'export' */
export const dynamic = 'force-static';

/**
 * نقشه سایت — در بیلد به‌صورت خودکار در /sitemap.xml ساخته می‌شود
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

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
  ];

  return [
    ...staticEntries(),
    ...services.map((s) => entry(`/services/${s.slug}/`, 0.9)),
    ...brands.map((b) => entry(`/brands/${b.slug}/`, 0.7)),
    ...areas.map((a) => entry(`/areas/${a.slug}/`, 0.8)),
    ...posts.map((p) => entry(`/blog/${p.slug}/`, 0.6, new Date(p.isoDate))),
  ];

  function entry(path: string, priority: number, lastModified: Date = now) {
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
      lastModified: now,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    }));
  }
}