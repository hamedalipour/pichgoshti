import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { CTASection } from '@/components/CTASection';

export const metadata = buildMetadata({
  title: 'صفحه پیدا نشد (404)',
  description: 'صفحه مورد نظر پیدا نشد؛ از اینجا به خدمات تعمیرات، مناطق تهران و مقالات دسترسی دارید.',
  path: '/404',
  noIndex: true,
});

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center">
      <p className="text-6xl font-extrabold text-brand-200" aria-hidden="true">۴۰۴</p>
      <h1 className="mt-4 text-2xl font-extrabold text-brand-950">این صفحه پیدا نشد</h1>
      <p className="mt-3 leading-8 text-slate-600">
        شاید آدرس را اشتباه وارد کرده‌اید یا صفحه جابه‌جا شده است.
        از لینک‌های زیر استفاده کنید یا درخواست تعمیر را ثبت کنید.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="rounded-xl bg-brand-700 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-brand-800">
          صفحه اصلی
        </Link>
        <Link href="/services/" className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50">
          خدمات تعمیرات
        </Link>
        <Link href="/contact/" className="rounded-xl bg-accent-500 px-5 py-3 text-sm font-extrabold text-brand-950 transition hover:bg-accent-400">
          ثبت درخواست تعمیر
        </Link>
      </div>
    </div>
  );
}