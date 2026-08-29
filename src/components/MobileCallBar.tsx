import { siteConfig, telHref, baleUrl } from '@/data/site';

/**
 * نوار تماس چسبان مخصوص موبایل — در دسکتاپ مخفی است
 */
export function MobileCallBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 p-2.5 shadow-[0_-4px_20px_rgba(15,31,61,0.08)] backdrop-blur lg:hidden"
      role="complementary"
      aria-label="تماس سریع"
    >
      <div className="mx-auto flex max-w-6xl gap-2.5">
        <a
          href={telHref(siteConfig.phone)}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-700 px-4 py-3 text-sm font-extrabold text-white"
        >
          <span aria-hidden="true">☎️</span> تماس تلفنی
        </a>
        <a
          href={baleUrl()}
          target="_blank"
          rel="noopener"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-bale-500 px-4 py-3 text-sm font-extrabold text-white"
        >
          <span aria-hidden="true">💬</span> بله
        </a>
      </div>
    </div>
  );
}