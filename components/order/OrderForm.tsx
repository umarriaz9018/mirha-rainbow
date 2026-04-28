'use client';
import { useState, FormEvent }  from 'react';
import { useSearchParams }       from 'next/navigation';
import toast                     from 'react-hot-toast';
import { CATEGORIES, PAKISTAN_CITIES } from '@/types';
import type { OrderFormData, ContactMethod } from '@/types';

const INIT: OrderFormData = {
  customerName: '', phone: '', email: '', city: '', address: '',
  productId: '', productName: '', category: '', orderType: '',
  quantity: '1', customRequirements: '', preferredContact: 'whatsapp',
  urgency: 'flexible', heardFrom: '',
};

function inputCls(err: boolean) {
  return `input-base ${err ? 'border-red-400 bg-red-50' : ''}`;
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

export default function OrderForm() {
  const sp = useSearchParams();
  const [form,   setForm]   = useState<OrderFormData>({
    ...INIT,
    productId:   sp.get('product')   ?? '',
    productName: sp.get('name')      ?? '',
    category:    (sp.get('category') as any) ?? '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof OrderFormData, string>>>({});

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name as keyof OrderFormData]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  const validate = (): boolean => {
    const e: Partial<Record<keyof OrderFormData, string>> = {};
    if (!form.customerName.trim()) e.customerName = 'Name is required';
    if (!form.phone.trim())        e.phone        = 'Phone number is required';
    if (form.phone && !/^(\+92|0)?[0-9]{10,11}$/.test(form.phone.replace(/\s/g, '')))
      e.phone = 'Enter a valid Pakistani phone number';
    if (!form.city)      e.city      = 'Please select your city';
    if (!form.category)  e.category  = 'Please select a category';
    if (!form.orderType) e.orderType = 'Please select order type';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) { toast.error('Please fill all required fields'); return; }
    setStatus('loading');
    try {
      const res = await fetch('/api/orders', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('success');
      toast.success('Order submitted! We will contact you soon.');
    } catch {
      setStatus('idle');
      toast.error('Something went wrong. Please try WhatsApp!');
    }
  };

  if (status === 'success') {
    const waText = encodeURIComponent(`Hi! I just submitted an order. My name is ${form.customerName}.`);
    return (
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 text-center">
        <div className="text-7xl mb-6">&#x1F389;</div>
        <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-3">Order Received!</h2>
        <p className="text-gray-500 mb-6 max-w-sm mx-auto">
          Thank you, <strong>{form.customerName}</strong>! We will contact you via{' '}
          <strong>{form.preferredContact}</strong> within 24 hours.
        </p>
        <a
          href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${waText}`}
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold transition-colors"
        >
          Chat on WhatsApp Now
        </a>
        <button
          onClick={() => { setStatus('idle'); setForm(INIT); }}
          className="block mx-auto mt-4 text-sm text-gray-400 hover:text-gray-600 underline"
        >
          Submit another order
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-6">

      <div>
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
          Your Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Full Name *" error={errors.customerName}>
            <input type="text" name="customerName" value={form.customerName} onChange={onChange}
              placeholder="e.g. Fatima Khan" className={inputCls(!!errors.customerName)} />
          </Field>
          <Field label="Phone / WhatsApp *" error={errors.phone}>
            <input type="tel" name="phone" value={form.phone} onChange={onChange}
              placeholder="0300 0000000" className={inputCls(!!errors.phone)} />
          </Field>
          <Field label="Email Address">
            <input type="email" name="email" value={form.email} onChange={onChange}
              placeholder="your@email.com (optional)" className={inputCls(false)} />
          </Field>
          <Field label="City *" error={errors.city}>
            <select name="city" value={form.city} onChange={onChange} className={inputCls(!!errors.city)}>
              <option value="">Select your city</option>
              {PAKISTAN_CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
        </div>
      </div>

      <hr className="border-gray-100" />

      <div>
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
          Order Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Product Category *" error={errors.category}>
            <select name="category" value={form.category} onChange={onChange} className={inputCls(!!errors.category)}>
              <option value="">Select a category</option>
              {CATEGORIES.map((c) => (
                <option key={c.name} value={c.name}>{c.emoji} {c.name}</option>
              ))}
            </select>
          </Field>
          <Field label="Order Type *" error={errors.orderType}>
            <select name="orderType" value={form.orderType} onChange={onChange} className={inputCls(!!errors.orderType)}>
              <option value="">Select order type</option>
              <option value="ready-made">Ready-Made (in stock)</option>
              <option value="made-to-order">Made-to-Order (custom)</option>
              <option value="both">Not sure - please advise</option>
            </select>
          </Field>
          <Field label="Specific Product Name (if known)">
            <input type="text" name="productName" value={form.productName} onChange={onChange}
              placeholder="e.g. Blue Ceramic Vase" className={inputCls(false)} />
          </Field>
          <Field label="Quantity">
            <select name="quantity" value={form.quantity} onChange={onChange} className={inputCls(false)}>
              {['1','2','3','4','5','6-10','10+'].map((q) => <option key={q} value={q}>{q}</option>)}
            </select>
          </Field>
        </div>
        <div className="mt-4">
          <Field label="Custom Requirements / Description">
            <textarea
              name="customRequirements" value={form.customRequirements} onChange={onChange}
              rows={5} className={`${inputCls(false)} resize-none`}
              placeholder="Describe colors, size, theme, occasion... The more detail the better!"
            />
          </Field>
        </div>
      </div>

      <hr className="border-gray-100" />

      <div>
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
          Preferences
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Preferred Contact Method *
            </label>
            <div className="grid grid-cols-3 gap-3">
              {([
                ['whatsapp', 'WhatsApp'],
                ['call',     'Phone Call'],
                ['email',    'Email'],
              ] as [ContactMethod, string][]).map(([val, label]) => (
                <label
                  key={val}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    form.preferredContact === val
                      ? 'border-amber-500 bg-amber-50'
                      : 'border-gray-200 hover:border-amber-300'
                  }`}
                >
                  <input
                    type="radio" name="preferredContact" value={val}
                    checked={form.preferredContact === val} onChange={onChange}
                    className="sr-only"
                  />
                  <span className="text-sm font-medium text-gray-700">{label}</span>
                </label>
              ))}
            </div>
          </div>

          <Field label="How Urgently Do You Need It?">
            <select name="urgency" value={form.urgency} onChange={onChange} className={inputCls(false)}>
              <option value="flexible">I am flexible</option>
              <option value="within-1-week">Within 1 week</option>
              <option value="within-2-weeks">Within 2 weeks</option>
              <option value="within-1-month">Within 1 month</option>
            </select>
          </Field>

          <Field label="How Did You Hear About Us?">
            <select name="heardFrom" value={form.heardFrom} onChange={onChange} className={inputCls(false)}>
              <option value="">Select...</option>
              <option value="instagram">Instagram</option>
              <option value="friend">Friend / Family</option>
              <option value="google">Google Search</option>
              <option value="whatsapp-forward">WhatsApp Forward</option>
              <option value="other">Other</option>
            </select>
          </Field>
        </div>
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500
                   hover:from-amber-600 hover:to-orange-600 disabled:opacity-60
                   text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl
                   transition-all duration-200 flex items-center justify-center gap-3"
      >
        {status === 'loading' ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
            </svg>
            Sending your order...
          </>
        ) : (
          'Submit Order Request'
        )}
      </button>

      <p className="text-center text-xs text-gray-400">
        Prefer to chat?{' '}
        <a
          href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
          target="_blank" rel="noopener noreferrer"
          className="text-green-600 font-semibold hover:underline"
        >
          Message us on WhatsApp
        </a>
      </p>
    </form>
  );
}
