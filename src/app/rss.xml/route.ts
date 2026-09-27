import { siteConfig } from '@/data/site';
import { posts } from '@/data/posts';

/** فید RSS برای کشف/خزش مجدد توسط بینگ (خروجی استاتیک با output: 'export') */
export const dynamic = 'force-static';

export function GET() {
  const items = posts
    .map((p) => {
      const link = `${siteConfig.url}/blog/${p.slug}/`;
      const pubDate = new Date(p.dateUpdated ?? p.isoDate).toUTCString();
      return `    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description><![CDATA[${p.seoDescription || p.excerpt}]]></description>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${siteConfig.name} | تعمیر تلویزیون دوو و اسنوا]]></title>
    <link>${siteConfig.url}/</link>
    <description><![CDATA[${siteConfig.description}]]></description>
    <language>fa</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteConfig.url}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;
  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}