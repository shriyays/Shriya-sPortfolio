'use server';

import { Resend } from 'resend';

export async function sendContactEmail(formData: FormData): Promise<{ ok: boolean; message: string }> {
  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const message = String(formData.get('message') ?? '').trim();

  if (!name || !email || !message) {
    return { ok: false, message: '✦ Please fill in all fields.' };
  }

  if (!process.env.RESEND_API_KEY) {
    console.log('Contact form submission (no Resend API key configured):', { name, email, message });
    return { ok: true, message: "✦ Message sent! I'll get back to you soon 🌸" };
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const to = process.env.CONTACT_TO ?? 'yarrapureddysarath.s@northeastern.edu';

    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to,
      replyTo: email,
      subject: `Portfolio message from ${name}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${message.replace(/\n/g, '<br/>')}</p>`,
    });

    return { ok: true, message: "✦ Message sent! I'll get back to you soon 🌸" };
  } catch (err) {
    console.error('Failed to send email:', err);
    return { ok: false, message: '✦ Something went wrong. Please email me directly.' };
  }
}
