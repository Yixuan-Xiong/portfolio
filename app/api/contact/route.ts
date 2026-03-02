import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function isValidEmail(value: string) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(input: string) {
	return input
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#039;');
}

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const name = String(body?.name ?? '').trim();
		const email = String(body?.email ?? '').trim();
		const message = String(body?.message ?? '').trim();

		if (!name || !email || !message) {
			return NextResponse.json({ ok: false, error: 'Missing fields.' }, { status: 400 });
		}

		if (!isValidEmail(email)) {
			return NextResponse.json({ ok: false, error: 'Invalid email.' }, { status: 400 });
		}

		const toEmail = process.env.CONTACT_TO_EMAIL;
		const fromEmail = process.env.CONTACT_FROM_EMAIL;

		if (!toEmail || !fromEmail || !process.env.RESEND_API_KEY) {
			return NextResponse.json({ ok: false, error: 'Server not configured.' }, { status: 500 });
		}

		const subject = `New message from portfolio — ${name}`;

		const html = `
			<div style="font-family: Arial, sans-serif; line-height: 1.6;">
				<h2 style="margin:0 0 12px;">New contact form message</h2>
				<p><strong>Name:</strong> ${escapeHtml(name)}</p>
				<p><strong>Email:</strong> ${escapeHtml(email)}</p>
				<p><strong>Message:</strong></p>
				<p style="white-space: pre-wrap; border-left: 3px solid #ddd; padding-left: 12px;">
					${escapeHtml(message)}
				</p>
			</div>
		`;

		const { error } = await resend.emails.send({
			from: `Portfolio Contact <${fromEmail}>`,
			to: [toEmail],
			replyTo: email,
			subject,
			html,
		});

		if (error) {
			return NextResponse.json({ ok: false, error: 'Failed to send email.' }, { status: 500 });
		}

		return NextResponse.json({ ok: true });
	} catch {
		return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
	}
}