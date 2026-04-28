import nodemailer       from 'nodemailer';
import { OrderFormData } from '@/types';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export async function sendOwnerOrderNotification(
  order:   OrderFormData,
  orderId: string
): Promise<void> {
  const phone   = order.phone.replace(/\D/g, '');
  const waText  = encodeURIComponent(
    `Assalam o Alaikum ${order.customerName}! This is Mirha Rainbow Interiors. We received your order request for ${order.productName || order.category}. Let us discuss the details!`
  );
  const waLink  = `https://wa.me/${phone}?text=${waText}`;
  const pkTime  = new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' });

  await transporter.sendMail({
    from:    `"Mirha Rainbow Website" <${process.env.EMAIL_USER}>`,
    to:      process.env.OWNER_EMAIL,
    subject: `New Order #${orderId} from ${order.customerName} - ${order.productName || order.category}`,
    html: `<!DOCTYPE html><html><head><meta charset="utf-8">
<style>
  body{font-family:Arial,sans-serif;background:#fdf8f4;margin:0;padding:20px}
  .w{max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.08)}
  .h{background:linear-gradient(135deg,#f59e0b,#ef4444 50%,#8b5cf6);padding:28px 24px;color:#fff}
  .h h1{margin:0;font-size:22px} .h p{margin:6px 0 0;font-size:14px;opacity:.9}
  .b{padding:28px 24px}
  .oid{background:#fef3c7;border:1px solid #f59e0b;border-radius:8px;padding:10px 14px;margin-bottom:20px;font-size:13px;color:#92400e}
  .st{font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:.05em;margin:20px 0 8px}
  .grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
  .cell{background:#f9fafb;border-radius:8px;padding:10px}
  .lbl{font-size:11px;color:#9ca3af;text-transform:uppercase;margin-bottom:3px}
  .val{font-size:14px;font-weight:600;color:#111827}
  .req{background:#fffbeb;border-left:4px solid #f59e0b;border-radius:0 8px 8px 0;padding:12px;margin-top:14px}
  .cta{text-align:center;padding:24px;background:#f9fafb}
  .btn{display:inline-block;padding:12px 24px;border-radius:50px;text-decoration:none;font-weight:700;font-size:14px;margin:5px;color:#fff}
  .ftr{padding:14px 24px;text-align:center;font-size:12px;color:#9ca3af;border-top:1px solid #f3f4f6}
</style></head><body>
<div class="w">
  <div class="h"><h1>New Order Request!</h1><p>Someone wants to buy from Mirha Rainbow Interiors</p></div>
  <div class="b">
    <div class="oid">Order ID: <strong>#${orderId}</strong> | Received: <strong>${pkTime}</strong></div>
    <div class="st">Customer Information</div>
    <div class="grid">
      <div class="cell"><div class="lbl">Name</div><div class="val">${order.customerName}</div></div>
      <div class="cell"><div class="lbl">Phone</div><div class="val">${order.phone}</div></div>
      <div class="cell"><div class="lbl">Email</div><div class="val">${order.email || 'Not provided'}</div></div>
      <div class="cell"><div class="lbl">City</div><div class="val">${order.city}</div></div>
    </div>
    <div class="st">Order Details</div>
    <div class="grid">
      <div class="cell"><div class="lbl">Product</div><div class="val">${order.productName || order.category}</div></div>
      <div class="cell"><div class="lbl">Order Type</div><div class="val">${order.orderType}</div></div>
      <div class="cell"><div class="lbl">Quantity</div><div class="val">${order.quantity || '1'}</div></div>
      <div class="cell"><div class="lbl">Urgency</div><div class="val">${order.urgency}</div></div>
      <div class="cell"><div class="lbl">Contact Via</div><div class="val">${order.preferredContact}</div></div>
      <div class="cell"><div class="lbl">Heard From</div><div class="val">${order.heardFrom || 'Not specified'}</div></div>
    </div>
    ${order.customRequirements ? `<div class="req"><div class="lbl">Requirements</div><p style="margin:8px 0 0;color:#374151;font-size:14px;line-height:1.6">${order.customRequirements.replace(/\n/g, '<br>')}</p></div>` : ''}
  </div>
  <div class="cta">
    <p style="margin:0 0 14px;font-weight:600;color:#374151">Reply to this customer:</p>
    <a href="${waLink}" class="btn" style="background:#25d366">Reply on WhatsApp</a>
    ${order.email ? `<a href="mailto:${order.email}" class="btn" style="background:#6366f1">Reply via Email</a>` : ''}
  </div>
  <div class="ftr">Submitted via mirharainbow.com</div>
</div></body></html>`,
  });
}

export async function sendCustomerConfirmation(
  order:   OrderFormData,
  orderId: string
): Promise<void> {
  if (!order.email) return;

  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '';
  const waText   = encodeURIComponent(`Hi! I placed order #${orderId}. My name is ${order.customerName}.`);

  await transporter.sendMail({
    from:    `"Mirha Rainbow Interiors" <${process.env.EMAIL_USER}>`,
    to:      order.email,
    subject: `Order Received! - Mirha Rainbow Interiors (#${orderId})`,
    html: `<!DOCTYPE html><html><head><meta charset="utf-8">
<style>
  body{font-family:Arial,sans-serif;background:#fdf8f4;margin:0;padding:20px}
  .w{max-width:500px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.08)}
  .h{background:linear-gradient(135deg,#f59e0b,#ef4444 50%,#8b5cf6);padding:32px 24px;text-align:center;color:#fff}
  .body{padding:28px 24px}
  .box{background:linear-gradient(135deg,#fef3c7,#fde68a);border-radius:12px;padding:14px;margin:14px 0;text-align:center;color:#92400e;font-weight:600}
  .step{display:flex;align-items:flex-start;gap:12px;margin-bottom:12px;font-size:14px;color:#374151;line-height:1.5}
  .wa{display:block;text-align:center;background:#25d366;color:#fff;padding:14px;border-radius:12px;text-decoration:none;font-weight:700;margin:18px 0}
  .ftr{padding:18px 24px;background:#f9fafb;text-align:center;font-size:12px;color:#9ca3af}
</style></head><body>
<div class="w">
  <div class="h">
    <div style="font-size:48px;margin-bottom:10px">&#x1F389;</div>
    <h1 style="margin:0;font-size:22px">Order Received!</h1>
    <p style="margin:8px 0 0;opacity:.9">Thank you, ${order.customerName}!</p>
  </div>
  <div class="body">
    <p style="color:#374151;line-height:1.7">We received your order and we are excited to create something beautiful for you!</p>
    <div class="box">Order Reference: <strong>#${orderId}</strong></div>
    <p style="font-weight:600;color:#374151;margin-bottom:10px">What happens next?</p>
    <div class="step"><span>&#x1F469;&#x200D;&#x1F3A8;</span><span>Our artist reviews your request and checks availability</span></div>
    <div class="step"><span>&#x1F4AC;</span><span>We contact you via <strong>${order.preferredContact}</strong> within 24 hours</span></div>
    <div class="step"><span>&#x1F3A8;</span><span>We discuss your requirements and finalize the design</span></div>
    <div class="step"><span>&#x1F4E6;</span><span>Your piece is handcrafted with love and delivered!</span></div>
    <a href="https://wa.me/${waNumber}?text=${waText}" class="wa">Chat on WhatsApp Now</a>
  </div>
  <div class="ftr"><p style="margin:0 0 4px">Mirha Rainbow Interiors</p><p style="margin:0">Handcrafted with love in Pakistan</p></div>
</div></body></html>`,
  });
}
