import { siteConfig, telHref } from '@/data/site';
import { FeatureIcon } from './ServiceIcon';

/**
 * کارت تماس چسبان سایدبار صفحات خدمت/برند/منطقه — دسکتاپ و موبایل
 * هدف: رسیدن مشتری به تماس بدون اسکرول تا انتهای صفحه (افزایش تماس از صفحات محتوایی)
 */
export function SidebarCallCard({ context }: { context?: string }) {
  return (
    <div className="rounded-3xl bg-brand-900 p-6 text-white">
      <h2 className="text-base font-extrabold">مشاوره تلفنی رایگان</h2>
      <p className="mt-2 text-sm leading-7 text-slate-300">
        {context ? `${context}: ` : ''}مشکل تلویزیون را تلفنی بگویید؛ عیب‌یابی اولیه، برآورد هزینه و زمان اعزام همان لحظه اعلام می‌شود.
      </p>
      <a
        href={telHref(siteConfig.phone)}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-accent-500 px-5 py-3.5 text-base font-extrabold text-brand-950 transition hover:bg-accent-400"
      >
        <span aria-hidden="true">☎️</span>
        تماس فوری
        <span dir="ltr">{siteConfig.phoneDisplay}</span>
      </a>
      <p className="mt-3 flex items-center gap-1.5 text-xs text-slate-300">
        <span aria-hidden="true">🕒</span>
        {siteConfig.workingHours}
      </p>
      <p className="mt-1.5 flex items-center gap-1.5 text-xs font-bold text-emerald-300">
        <span aria-hidden="true" className="grid size-4 place-items-center rounded-full bg-emerald-400/20">
          <FeatureIcon name="check" className="size-2.5" />
        </span>
        گارانتی کتبی {siteConfig.stats.warrantyMonths} ماهه روی همه تعمیرات
      </p>
      <p className="mt-1.5 flex items-center gap-1.5 text-xs font-bold text-accent-300">
        <span aria-hidden="true">⚡</span>
        تعمیر همان روز تا حداکثر ۲۴ ساعت
      </p>
    </div>
  );
}
