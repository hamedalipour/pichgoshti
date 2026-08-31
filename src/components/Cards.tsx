import Link from 'next/link';
import type { Service } from '@/data/services';
import type { Brand } from '@/data/brands';
import type { Area } from '@/data/areas';
import type { Post } from '@/data/posts';
import { ServiceIcon } from './ServiceIcon';

/** رنگ اختصاصی هر خدمت — کلاس‌ها به‌صورت استاتیک برای Tailwind */
const serviceStyles: Record<string, { tile: string; icon: string; bar: string; ring: string }> = {
  lcd: { tile: 'bg-sky-100', icon: 'text-sky-600', bar: 'bg-sky-400', ring: 'hover:ring-sky-300' },
  led: { tile: 'bg-cyan-100', icon: 'text-cyan-600', bar: 'bg-cyan-400', ring: 'hover:ring-cyan-300' },
  oled: { tile: 'bg-violet-100', icon: 'text-violet-600', bar: 'bg-violet-400', ring: 'hover:ring-violet-300' },
  qled: { tile: 'bg-fuchsia-100', icon: 'text-fuchsia-600', bar: 'bg-fuchsia-400', ring: 'hover:ring-fuchsia-300' },
  'smart-tv': { tile: 'bg-indigo-100', icon: 'text-indigo-600', bar: 'bg-indigo-400', ring: 'hover:ring-indigo-300' },
  'android-tv': { tile: 'bg-emerald-100', icon: 'text-emerald-600', bar: 'bg-emerald-400', ring: 'hover:ring-emerald-300' },
  'power-board': { tile: 'bg-amber-100', icon: 'text-amber-600', bar: 'bg-amber-400', ring: 'hover:ring-amber-300' },
  mainboard: { tile: 'bg-orange-100', icon: 'text-orange-600', bar: 'bg-orange-400', ring: 'hover:ring-orange-300' },
  backlight: { tile: 'bg-yellow-100', icon: 'text-yellow-600', bar: 'bg-yellow-400', ring: 'hover:ring-yellow-300' },
  panel: { tile: 'bg-rose-100', icon: 'text-rose-600', bar: 'bg-rose-400', ring: 'hover:ring-rose-300' },
  tcon: { tile: 'bg-teal-100', icon: 'text-teal-600', bar: 'bg-teal-400', ring: 'hover:ring-teal-300' },
  'wall-mount': { tile: 'bg-blue-100', icon: 'text-blue-600', bar: 'bg-blue-400', ring: 'hover:ring-blue-300' },
};

const fallbackStyle = { tile: 'bg-brand-100', icon: 'text-brand-600', bar: 'bg-brand-500', ring: 'hover:ring-brand-300' };

/** کارت خدمت — حالت featured برای کارت بزرگ‌تر (شکستن ریتم کارت‌های هم‌اندازه) */
export function ServiceCard({ service, featured = false }: { service: Service; featured?: boolean }) {
  const st = serviceStyles[service.slug] ?? fallbackStyle;
  return (
    <Link
      href={`/services/${service.slug}/`}
      className={`group relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition duration-300 ease-out-quart hover:-translate-y-1.5 hover:border-transparent hover:shadow-xl hover:shadow-brand-950/10 hover:ring-2 ${st.ring} ${
        featured ? 'sm:flex-row sm:items-center sm:gap-8 sm:p-8' : ''
      }`}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-1 origin-right scale-x-0 ${st.bar} transition-transform duration-300 ease-out-quart group-hover:scale-x-100`}
      />
      <span
        aria-hidden="true"
        className={`inline-flex shrink-0 items-center justify-center rounded-2xl ${st.tile} ${st.icon} shadow-inner transition-transform duration-300 ease-out-quart group-hover:-rotate-3 group-hover:scale-110 ${
          featured ? 'size-16 sm:size-20' : 'size-14'
        }`}
      >
        <ServiceIcon slug={service.slug} className={featured ? 'size-9 sm:size-11' : 'size-7'} />
      </span>
      <span className="flex flex-col gap-3">
        <h3 className={`font-extrabold text-brand-950 transition group-hover:text-brand-700 ${featured ? 'text-xl' : 'text-base'}`}>
          {service.navLabel}
        </h3>
        <p className={`leading-7 text-slate-600 ${featured ? 'max-w-md text-[15px]' : 'text-sm'}`}>{service.excerpt}</p>
        <span className="mt-auto inline-flex items-center gap-2 pt-1 text-sm font-bold text-slate-400 transition group-hover:text-brand-700">
          جزئیات و هزینه
          <span
            aria-hidden="true"
            className={`grid size-6 place-items-center rounded-full ${st.tile} ${st.icon} transition-transform duration-300 ease-out-quart group-hover:-translate-x-1`}
          >
            ←
          </span>
        </span>
      </span>
    </Link>
  );
}

/** کارت برند — حالت featured برای برندهای تخصصی سایت (دوو و اسنوا) */
export function BrandCard({ brand, featured = false }: { brand: Brand; featured?: boolean }) {
  if (featured) {
    return (
      <Link
        href={`/brands/${brand.slug}/`}
        className="group flex h-full flex-col gap-4 rounded-3xl border-2 border-accent-500/50 bg-white p-7 shadow-sm transition duration-300 ease-out-quart hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-950/10"
      >
        <span className="inline-flex w-fit items-center rounded-full bg-accent-500/10 px-3 py-1 text-xs font-extrabold text-accent-700">
          تخصص اصلی ما
        </span>
        <span className="flex flex-wrap items-baseline gap-x-3">
          <span className="text-2xl font-extrabold text-brand-950 transition group-hover:text-brand-700">{brand.name}</span>
          <span dir="ltr" className="text-sm font-bold text-slate-400">{brand.nameEn}</span>
        </span>
        <span className="text-sm leading-7 text-slate-600">{brand.excerpt}</span>
        <span className="mt-auto inline-flex items-center gap-2 pt-1 text-sm font-bold text-brand-600">
          صفحه تعمیر {brand.name}
          <span
            aria-hidden="true"
            className="grid size-6 place-items-center rounded-full bg-accent-500/10 text-accent-700 transition-transform duration-300 ease-out-quart group-hover:-translate-x-1"
          >
            ←
          </span>
        </span>
      </Link>
    );
  }
  return (
    <Link
      href={`/brands/${brand.slug}/`}
      className="group flex h-full items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 transition duration-300 ease-out-quart hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md hover:shadow-brand-950/5"
    >
      <span className="flex flex-col">
        <span className="text-[15px] font-extrabold text-brand-950">{brand.name}</span>
        <span dir="ltr" className="text-xs text-slate-400">{brand.nameEn}</span>
      </span>
      <span aria-hidden="true" className="text-brand-300 transition group-hover:text-brand-600">
        ←
      </span>
    </Link>
  );
}

/** کارت منطقه */
export function AreaCard({ area }: { area: Area }) {
  return (
    <Link
      href={`/areas/${area.slug}/`}
      className="group flex h-full items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 transition duration-300 ease-out-quart hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md hover:shadow-brand-950/5"
    >
      <span className="flex flex-col">
        <span className="text-[15px] font-extrabold text-brand-950">تعمیر تلویزیون در {area.name}</span>
        <span className="text-xs text-slate-400">{area.district}؛ اعزام {area.arrival}</span>
      </span>
      <span aria-hidden="true" className="text-brand-300 transition group-hover:text-brand-600">
        ←
      </span>
    </Link>
  );
}

/** کارت مقاله */
export function BlogCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}/`}
      className="group flex h-full flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 ease-out-quart hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg hover:shadow-brand-950/5"
    >
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span className="rounded-full bg-accent-500/10 px-3 py-1 font-bold text-accent-700">مقاله</span>
        <time dateTime={post.isoDate}>{post.dateFa}</time>
      </div>
      <h3 className="text-base font-extrabold leading-7 text-brand-950 transition group-hover:text-brand-700">
        {post.title}
      </h3>
      <p className="text-sm leading-7 text-slate-600">{post.excerpt}</p>
      <span className="mt-auto text-sm font-bold text-brand-600">ادامه مطلب ←</span>
    </Link>
  );
}