import type { ReactNode } from 'react';

/**
 * عنوان بخش‌ها با زیرنویس — یکنواخت در کل سایت
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  as: Tag = 'h2',
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'center' | 'start';
  as?: 'h2' | 'h3';
}) {
  const alignCls = align === 'center' ? 'items-center text-center' : 'items-start text-start';
  return (
    <div className={`flex flex-col gap-3 ${alignCls}`}>
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-sm font-bold text-brand-700">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-accent-500" />
          {eyebrow}
        </span>
      )}
      <Tag className="text-2xl font-extrabold leading-snug text-brand-950 sm:text-3xl lg:text-4xl">
        {title}
      </Tag>
      {description && (
        <p className="max-w-2xl text-base leading-8 text-slate-600">{description}</p>
      )}
    </div>
  );
}

/** برگه قهرمان بخش‌های داخلی صفحات */
export function PageHero({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-slate-100 bg-gradient-to-l from-brand-50 via-white to-brand-50/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:py-14">
        <h1 className="text-2xl font-extrabold leading-snug text-brand-950 sm:text-3xl lg:text-4xl">
          {title}
        </h1>
        {description && <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">{description}</p>}
        {children}
      </div>
    </section>
  );
}