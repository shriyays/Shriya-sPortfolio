'use server';

import nodemailer from 'nodemailer';

export async function sendContactEmail(formData: FormData): Promise<{ ok: boolean; message: string }> {
  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const message = String(formData.get('message') ?? '').trim();

  if (!name || !email || !message) {
    return { ok: false, message: '✦ Please fill in all fields.' };
  }

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('Contact form submission (no SMTP configured):', { name, email, message });
    return { ok: true, message: "✦ Message sent! I'll get back to you soon 🌸" };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: { rejectUnauthorized: false },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO ?? 'yarrapureddysarathshriya@gmail.com',
      replyTo: email,
      subject: `Portfolio message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${message.replace(/\n/g, '<br/>')}</p>`,
    });

    return { ok: true, message: "✦ Message sent! I'll get back to you soon 🌸" };
  } catch (err) {
    console.error('Failed to send email:', err);
    return { ok: false, message: '✦ Something went wrong. Please email me directly.' };
  }
}
