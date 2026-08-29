import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { siteConfig, telHref } from '@/data/site';

export const metadata = buildMetadata({
  title: 'درخواست شما ثبت شد — سپاسگزاریم',
  description: 'درخواست تعمیر تلویزیون شما ثبت شد؛ کارشناسان پیچ‌گوشتی به‌زودی برای هماهنگی اعزام تکنسین با شما تماس می‌گیرند.',
  path: '/thank-you/',
  noIndex: true,
});

export default function ThankYouPage() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col px-4 py-20">
      <div className="flex w-full flex-col items-center gap-4 rounded-3xl border border-green-200 bg-white p-10 text-center shadow-sm">
        <p className="text-5xl" aria-hidden="true">✅</p>
        <h1 className="text-2xl font-extrabold text-brand-950">درخواست شما ثبت شد</h1>
        <p className="leading-8 text-slate-600">
          کارشناسان {siteConfig.name} به‌زودی برای هماهنگی اعزام تکنسین با شما تماس می‌گیرند.
          اگر عجله دارید، همین حالا تماس بگیرید یا مشکل را در بله توضیح دهید.
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <a
            href={telHref(siteConfig.phone)}
            className="rounded-xl bg-brand-700 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-brand-800"
          >
            تماس فوری — <span dir="ltr">{siteConfig.phoneDisplay}</span>
          </a>
          <Link
            href="/"
            className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            صفحه اصلی
          </Link>
        </div>
      </div>
    </section>
  );
}
