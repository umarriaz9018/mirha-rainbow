import OrderForm      from '@/components/order/OrderForm';
import { Suspense }   from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:       'Place an Order - Ready-Made & Custom Orders',
  description: 'Order handmade ceramics, paintings, calligraphy, pottery and more. Ready-made or fully custom. Nationwide delivery in Pakistan.',
};

export default function OrderPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-purple-50">
      <div className="max-w-3xl mx-auto px-4 py-16">

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white border border-amber-200 rounded-full px-4 py-2 mb-4 shadow-sm">
            <span className="text-amber-600 font-medium text-sm">Ready-Made &amp; Custom Orders Welcome</span>
          </div>
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Place Your Order
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Fill in the form and we will get back to you within{' '}
            <strong className="text-amber-700">24 hours</strong>.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: 'No Payment Upfront' },
            { label: 'Progress Photos'    },
            { label: 'Nationwide Delivery' },
          ].map((b) => (
            <div key={b.label} className="bg-white rounded-xl p-3 text-center shadow-sm border border-gray-100">
              <p className="text-xs font-medium text-gray-600 mt-1">{b.label}</p>
            </div>
          ))}
        </div>

        <Suspense fallback={<div className="text-center py-8">Loading form...</div>}>
          <OrderForm />
        </Suspense>
      </div>
    </div>
  );
}
