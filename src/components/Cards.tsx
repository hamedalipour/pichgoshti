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

/** کارت خدمت */
export function ServiceCard({ service }: { service: Service }) {
  const st = serviceStyles[service.slug] ?? fallbackStyle;
  return (
    <Link
      href={`/services/${service.slug}/`}
      className={`group relative flex flex-col gap-4 overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-xl hover:shadow-brand-950/10 hover:ring-2 ${st.ring}`}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-1 origin-right scale-x-0 ${st.bar} transition-transform duration-300 group-hover:scale-x-100`}
      />
      <span
        aria-hidden="true"
        className={`inline-flex size-14 items-center justify-center rounded-2xl ${st.tile} ${st.icon} shadow-inner transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3`}
      >
        <ServiceIcon slug={service.slug} className="size-7" />
      </span>
      <h3 className="text-base font-extrabold text-brand-950 transition group-hover:text-brand-700">
        {service.navLabel}
      </h3>
      <p className="text-sm leading-7 text-slate-600">{service.excerpt}</p>
      <span className="mt-auto inline-flex items-center gap-2 pt-1 text-sm font-bold text-slate-400 transition group-hover:text-brand-700">
        جزئیات و هزینه
        <span
          aria-hidden="true"
          className={`grid size-6 place-items-center rounded-full ${st.tile} ${st.icon} transition-transform duration-300 group-hover:-translate-x-1`}
        >
          ←
        </span>
      </span>
    </Link>
  );
}

/** کارت برند */
export function BrandCard({ brand }: { brand: Brand }) {
  return (
    <Link
      href={`/brands/${brand.slug}/`}
      className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 transition hover:border-brand-300 hover:shadow-sm"
    >
      <span className="flex flex-col">
        <span className="text-[15px] font-extrabold text-brand-950">{brand.name}</span>
        <span dir="ltr" className="text-xs text-slate-400">{brand.nameEn}</span>
      </span>
      <span aria-hidden="true" className="text-brand-300 transition group-hover:translate-x-[-2px] group-hover:text-brand-600">
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
      className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 transition hover:border-brand-300 hover:shadow-sm"
    >
      <span className="flex flex-col">
        <span className="text-[15px] font-extrabold text-brand-950">تعمیر تلویزیون در {area.name}</span>
        <span className="text-xs text-slate-400">{area.district} — اعزام {area.arrival}</span>
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
      className="group flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-brand-300 hover:shadow-md"
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