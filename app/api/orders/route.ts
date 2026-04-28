import { NextRequest, NextResponse }                          from 'next/server';
import { sendOwnerOrderNotification, sendCustomerConfirmation } from '@/lib/emailService';
import { OrderFormData }                                        from '@/types';

function generateOrderId(): string {
  const date   = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `MRI-${date}-${random}`;
}

export async function POST(req: NextRequest) {
  try {
    const body: OrderFormData = await req.json();

    if (!body.customerName?.trim()) return NextResponse.json({ error: 'Name is required'     }, { status: 400 });
    if (!body.phone?.trim())        return NextResponse.json({ error: 'Phone is required'    }, { status: 400 });
    if (!body.category)             return NextResponse.json({ error: 'Category is required' }, { status: 400 });

    const orderId = generateOrderId();

    await Promise.allSettled([
      sendOwnerOrderNotification(body, orderId),
      sendCustomerConfirmation(body, orderId),
    ]);

    console.log(`[Order] #${orderId} from ${body.customerName} (${body.city}) - ${body.category}`);

    return NextResponse.json({ success: true, orderId, message: 'Order submitted successfully' });
  } catch (err) {
    console.error('[Orders API]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
