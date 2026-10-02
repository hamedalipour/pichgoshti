import { priceCategories, priceDisclaimer, formatToman, type PriceRow } from '@/data/prices';

/**
 * جدول تعرفه خدمات — استفاده در صفحه /prices/ و صفحات خدمت
 */
export function PriceTable({ categoryIds }: { categoryIds?: string[] }) {
  const cats = categoryIds
    ? priceCategories.filter((c) => categoryIds.includes(c.id))
    : priceCategories;

  return (
    <div className="flex flex-col gap-8">
      {cats.map((cat) => (
        <div key={cat.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 bg-slate-50 px-6 py-4">
            <h3 className="text-lg font-extrabold text-brand-950">{cat.title}</h3>
            {cat.note && <p className="mt-1 text-xs text-slate-500">{cat.note}</p>}
          </div>
          {/* موبایل: کارت‌های عمودی — بدون اسکرول افقی، کل ردیف‌ها کامل دیده می‌شوند */}
          <ul className="flex flex-col divide-y divide-slate-100 sm:hidden">
            {cat.rows.map((row, i) => (
              <li key={i} className="flex flex-col gap-2 px-5 py-4">
                <div className="flex items-start justify-between gap-3">
                  <span className="text-sm font-bold leading-6 text-slate-800">{row.service}</span>
                  {row.size && (
                    <span className="shrink-0 rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-extrabold text-brand-700">
                      {row.size}
                    </span>
                  )}
                </div>
                <div className="flex items-end justify-between gap-3">
                  <span className="text-base font-extrabold text-brand-800" dir="ltr">
                    {formatToman(row.from)} – {formatToman(row.to)}
                  </span>
                  {row.unit && <span className="text-[11px] text-slate-400">هر {row.unit}</span>}
                </div>
                {row.note && <span className="text-xs leading-6 text-slate-400">{row.note}</span>}
              </li>
            ))}
          </ul>

          {/* دسکتاپ: جدول کامل */}
          <div className="hidden overflow-x-auto sm:block">
            <table className="w-full min-w-[540px] text-sm">
              <thead>
                <tr className="text-xs text-slate-500">
                  <th scope="col" className="px-6 py-3 text-start font-bold">خدمت</th>
                  <th scope="col" className="px-3 py-3 text-start font-bold">سایز</th>
                  <th scope="col" className="px-6 py-3 text-end font-bold">بازه قیمت (تومان)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {cat.rows.map((row, i) => (
                  <tr key={i} className="align-top">
                    <td className="px-6 py-4">
                      <span className="font-bold text-slate-800">{row.service}</span>
                      {row.note && <span className="block mt-1 text-xs text-slate-400">{row.note}</span>}
                    </td>
                    <td className="px-3 py-4 text-sm text-slate-500">{row.size ?? '—'}</td>
                    <td className="px-6 py-4 text-end">
                      <span className="font-extrabold text-brand-800" dir="ltr">
                        {formatToman(row.from)} – {formatToman(row.to)}
                      </span>
                      {row.unit && <span className="block text-[11px] text-slate-400">هر {row.unit}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
      <p className="rounded-2xl bg-accent-500/10 px-5 py-4 text-sm leading-8 text-accent-700">{priceDisclaimer}</p>
    </div>
  );
}

/** نمایش بازه قیمت به صورت متن کوتاه */
export function PriceRange({ row }: { row: PriceRow }) {
  return (
    <span dir="ltr" className="font-bold text-brand-800">
      {formatToman(row.from)} – {formatToman(row.to)}
    </span>
  );
}