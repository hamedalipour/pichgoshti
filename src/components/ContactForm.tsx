'use client';

import { useState } from 'react';
import { siteConfig, baleUrl } from '@/data/site';
import { serviceOptions } from '@/data/services';
import { brands } from '@/data/brands';

type FormState = 'idle' | 'sent';

/**
 * فرم درخواست تعمیر — خروجی را به پیام آماده بله تبدیل می‌کند
 * (سایت استاتیک است؛ بدون سرور. برای ارسال ایمیل می‌توانید بعداً Formspree اضافه کنید)
 */
export function ContactForm() {
  const [state, setState] = useState<FormState>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get('name') || '').trim();
    const phone = String(fd.get('phone') || '');
    const brand = String(fd.get('brand') || '');
    const service = String(fd.get('service') || '');
    const note = String(fd.get('note') || '');

    const lines = [
      'سلام، درخواست تعمیر تلویزیون از سایت پیچ‌گوشتی:',
      `• نام: ${name}`,
      `• شماره تماس: ${phone}`,
      brand && `• برند تلویزیون: ${brand}`,
      service && `• نوع مشکل/خدمت: ${service}`,
      note && `• توضیحات: ${note}`,
    ].filter(Boolean);

    const message = lines.join('\n');
    // بله برخلاف واتساپ امکان پیش‌فرض‌کردن متن در لینک را ندارد؛ متن درخواست را کپی می‌کنیم
    try {
      await navigator.clipboard.writeText(message);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = message;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    window.open(baleUrl(), '_blank', 'noopener');
    setState('sent');
    form.reset();
  }

  if (state === 'sent') {
    return (
      <div className="rounded-3xl border border-green-200 bg-green-50 p-6 text-center" role="status">
        <p className="text-4xl" aria-hidden="true">✅</p>
        <h2 className="mt-3 text-xl font-extrabold text-brand-950">درخواست شما آماده ارسال شد</h2>
        <p className="mt-2 leading-8 text-slate-600">
          گفتگوی بله باز شده و متن درخواست شما کپی شده است؛ کافی است آن را در چت پیست کنید و بفرستید.
          اگر بله باز نشد، با شماره <span dir="ltr" className="font-bold">{siteConfig.mobileDisplay}</span> تماس بگیرید.
        </p>
        <button
          type="button"
          onClick={() => setState('idle')}
          className="mt-4 rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
        >
          ثبت درخواست جدید
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="نام شما">
          <input
            type="text"
            name="name"
            required
            autoComplete="name"
            placeholder="مثلاً علی رضایی"
            className={inputCls}
          />
        </Field>
        <Field label="شماره تماس">
          <input
            type="tel"
            name="phone"
            required
            inputMode="tel"
            autoComplete="tel"
            pattern="0[0-9]{10}"
            title="شماره موبایل ۱۱ رقمی با ۰ شروع می‌شود"
            placeholder="09xxxxxxxxx"
            dir="ltr"
            className={`${inputCls} text-left`}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="برند تلویزیون">
          <select name="brand" className={selectCls} defaultValue="">
            <option value="" disabled>
              انتخاب برند…
            </option>
            {brands.map((b) => (
              <option key={b.slug} value={b.name}>
                {b.name}
              </option>
            ))}
            <option value="سایر">برند دیگر</option>
          </select>
        </Field>
        <Field label="نوع مشکل یا خدمت">
          <select name="service" className={selectCls}>
            <option value="نمی‌دانم، عیب‌یابی می‌خواهم">نمی‌دانم، عیب‌یابی می‌خواهم</option>
            {serviceOptions.map((s) => (
              <option key={s.slug} value={s.label}>
                {s.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="توضیحات (اختیاری)">
        <textarea
          name="note"
          rows={4}
          placeholder="علت خرابی چه زمانی شروع شد؟ چه علامتی می‌بینید؟ مدل تلویزیون چیست؟"
          className={`${selectCls} resize-y`}
        />
      </Field>

      <button
        type="submit"
        className="mt-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-700 px-6 py-4 text-base font-extrabold text-white shadow-sm transition hover:bg-brand-800"
      >
        <span aria-hidden="true">💬</span>
        ارسال درخواست در بله
      </button>

      <p className="text-center text-xs leading-6 text-slate-500">
        با ثبت درخواست، متن پیام شما کپی و گفتگوی بله باز می‌شود تا همان‌جا ارسالش کنید.
        ترجیح می‌دهید تلفنی تماس بگیرید؟{' '}
        <a href={`tel:+98${siteConfig.phone.replace(/^0/, '')}`} className="font-bold text-brand-700">
          اینجا کلیک کنید
        </a>
      </p>
    </form>
  );
}

const inputCls =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100';

const selectCls = `${inputCls} appearance-none`;

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-bold text-slate-700">
      {label}
      {children}
    </label>
  );
}