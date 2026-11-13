import { Fragment } from 'react';
import Link from 'next/link';
import type { PostBlock } from '@/data/posts';
import { siteConfig, telHref } from '@/data/site';
import { buildImageSrcSet, getImageMeta, IMAGE_SIZES } from '@/lib/images';

/**
 * کارت تماس درون مقاله — بعد از جدول قیمت (یا میانه مقاله) رندر می‌شود.
 * بیشترین جست‌وجوهای ورودی «قیمت/هزینه» است؛ خواننده بعد از دیدن قیمت‌ها
 * داغ‌ترین لحظه تماس را دارد و نباید تا انتهای مقاله بدون CTA بماند.
 */
function MidArticleCall() {
  return (
    <aside className="my-1 flex flex-col items-start gap-3 rounded-2xl border-2 border-accent-500/50 bg-accent-500/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-[15px] font-extrabold leading-8 text-brand-950">
        قیمت دقیق برای مدل تلویزیون خودتان متفاوت است؛
        <span className="text-accent-700"> مشاوره تلفنی رایگان</span> و پاسخ در چند دقیقه.
      </p>
      <a
        href={telHref(siteConfig.phone)}
        className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-accent-500 px-5 py-3 text-sm font-extrabold text-brand-950 shadow-sm transition hover:bg-accent-400"
      >
        <span aria-hidden="true">☎️</span>
        تماس فوری
        <span dir="ltr">{siteConfig.phoneDisplay}</span>
      </a>
    </aside>
  );
}

/**
 * رندر بلوک‌های محتوای مقاله با استایل یکنواخت
 */
export function PostBlocks({ blocks }: { blocks: PostBlock[] }) {
  const firstImageIndex = blocks.findIndex((b) => b.type === 'image');
  // محل کارت تماس میانی: بعد از اولین جدول (قیمت‌ها) وگرنه میانه مقاله — فقط در مقالات بلند
  const tableIndex = blocks.findIndex((b) => b.type === 'table');
  const midIndex = blocks.length >= 6 ? (tableIndex >= 0 ? tableIndex : Math.floor(blocks.length / 2)) : -1;
  const renderBlock = (b: PostBlock, i: number) => {
    switch (b.type) {
          case 'h2':
            return (
              <h2 key={i} className="mt-4 text-xl font-extrabold leading-9 text-brand-950 sm:text-2xl">
                {b.text}
              </h2>
            );
          case 'h3':
            return (
              <h3 key={i} className="mt-2 text-lg font-extrabold leading-8 text-brand-900">
                {b.text}
              </h3>
            );
          case 'p':
            return (
              <p key={i} className="text-[16px] leading-9 text-slate-700">
                {b.text}
              </p>
            );
          case 'list':
            return (
              <ul key={i} className="flex flex-col gap-3 rounded-2xl bg-slate-50 p-6">
                {b.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-[15px] leading-8 text-slate-700">
                    <span aria-hidden="true" className="mt-2.5 size-2 shrink-0 rounded-full bg-accent-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          case 'callout':
            return (
              <aside key={i} className="rounded-2xl border border-accent-500/40 bg-accent-500/10 px-5 py-4">
                <p className="text-[15px] font-bold leading-8 text-accent-700">{b.text}</p>
              </aside>
            );
          case 'table':
            return (
              <div key={i} className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full min-w-[480px] text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      {b.headers.map((h) => (
                        <th key={h} scope="col" className="px-4 py-3 text-start font-extrabold text-brand-950">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {b.rows.map((row, ri) => (
                      <tr key={ri}>
                        {row.map((cell, ci) => (
                          <td key={ci} className={`px-4 py-3 leading-7 ${ci === 0 ? 'font-bold text-slate-800' : 'text-slate-600'}`}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case 'link':
            return (
              <Link
                key={i}
                href={b.href}
                className="article-link inline-flex items-center gap-2 self-start rounded-xl bg-brand-50 px-5 py-3 text-[15px] font-bold text-brand-700 transition hover:bg-brand-100"
              >
                <span aria-hidden="true">🔗</span>
                {b.text}
              </Link>
            );
          case 'image': {
            const meta = getImageMeta(b.src);
            const srcSet = buildImageSrcSet(b.src, meta);
            const isLcp = i === firstImageIndex;
            return (
              <figure key={i} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={b.src}
                  {...(srcSet ? { srcSet, sizes: IMAGE_SIZES } : {})}
                  alt={b.alt}
                  loading={isLcp ? 'eager' : 'lazy'}
                  fetchPriority={isLcp ? 'high' : undefined}
                  decoding="async"
                  width={meta.width}
                  height={meta.height}
                  className="h-auto w-full"
                />
                {b.caption ? (
                  <figcaption className="border-t border-slate-100 bg-slate-50 px-4 py-3 text-center text-sm leading-7 text-slate-500">
                    {b.caption}
                  </figcaption>
                ) : null}
              </figure>
            );
          }
          default:
            return null;
        }
  };

  return (
    <div className="article flex flex-col gap-6">
      {blocks.map((b, i) => (
        <Fragment key={i}>
          {renderBlock(b, i)}
          {i === midIndex && <MidArticleCall />}
        </Fragment>
      ))}
    </div>
  );
}