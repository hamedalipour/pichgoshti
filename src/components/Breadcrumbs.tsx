import Link from 'next/link';
import { JsonLd } from './JsonLd';
import { absoluteUrl } from '@/data/site';

export type Crumb = { name: string; href?: string };

/**
 * نان‌ریز (Breadcrumb) قابل مشاهده + اسکیمای BreadcrumbList
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const crumbs: Crumb[] = [{ name: 'خانه', href: '/' }, ...items];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      ...(c.href ? { item: absoluteUrl(c.href) } : {}),
    })),
  };

  return (
    <nav aria-label="مسیر صفحه" className="text-sm text-slate-500">
      <JsonLd data={jsonLd} />
      <ol className="flex flex-wrap items-center gap-1.5">
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={`${c.name}-${i}`} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden="true" className="text-slate-300">‹</span>}
              {c.href && !last ? (
                <Link href={c.href} className="transition hover:text-brand-600">
                  {c.name}
                </Link>
              ) : (
                <span aria-current={last ? 'page' : undefined} className={last ? 'font-semibold text-slate-700' : ''}>
                  {c.name}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}