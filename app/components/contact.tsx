'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Contact() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
	const [showCard, setShowCard] = useState(false);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		setStatus('sending');

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, email, message }),
			});

			const data = await response.json();

			if (!response.ok || !data?.ok) {
				setStatus('error');
				return;
			}

			setStatus('success');
			setShowCard(true);

			setName('');
			setEmail('');
			setMessage('');
		} catch {
			setStatus('error');
		}
	};

	useEffect(() => {
		if (showCard) {
			const timer = setTimeout(() => {
				setShowCard(false);
				setStatus('idle');
			}, 1500);

			return () => clearTimeout(timer);
		}
	}, [showCard]);

	return (
		<section
			id='contact'
			className='min-h-screen w-full bg-white text-black dark:bg-black dark:text-white flex items-center scroll-mt-28 overflow-x-hidden'
		>
			{/* ✅ 手机上下排，md 以上左右排 */}
			<div className='w-full px-6 md:px-28 xl:px-40 flex flex-col md:flex-row md:justify-between gap-16 md:gap-x-24'>

				{/* ===== LEFT ===== */}
				<div className='max-w-[520px] shrink-0'>
					<h1 className='text-[clamp(1.8rem,2.2vw,2.4rem)] uppercase tracking-[0.28em] font-medium'>
						Contact Me
					</h1>

					<Link
						href='/cv'
						className='inline-block mt-8 text-[13px] uppercase tracking-[0.22em] border-b border-current pb-1 hover:opacity-60 transition-opacity'
					>
						View CV →
					</Link>

					<div className='mt-16 space-y-10 text-[14px] leading-[1.7]'>
						<div className='space-y-2'>
							<div className='text-[12px] uppercase tracking-[0.25em] opacity-50'>
								Email
							</div>
							<div className='break-words'>
								xiongyixuan1006@gmail.com
							</div>
						</div>

						<div className='space-y-2'>
							<div className='text-[12px] uppercase tracking-[0.25em] opacity-50'>
								Phone
							</div>
							<div>+44 7436289616</div>
						</div>

						<div className='space-y-2'>
							<div className='text-[12px] uppercase tracking-[0.25em] opacity-50'>
								Address
							</div>
							<div>London, United Kingdom</div>
						</div>
					</div>
				</div>

				{/* ===== RIGHT ===== */}
				<div className='relative w-full max-w-[520px]'>
					<form className='flex flex-col space-y-9' onSubmit={handleSubmit}>
						<div className='space-y-2'>
							<label
								htmlFor='contact-name'
								className='text-[12px] uppercase tracking-[0.25em] opacity-60'
							>
								Name
							</label>
							<input
								id='contact-name'
								type='text'
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
								className='w-full bg-transparent text-[14px] border border-current/25 px-4 py-2.5 outline-none focus:border-current/60'
							/>
						</div>

						<div className='space-y-2'>
							<label
								htmlFor='contact-email'
								className='text-[12px] uppercase tracking-[0.25em] opacity-60'
							>
								Email
							</label>
							<input
								id='contact-email'
								type='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								className='w-full bg-transparent text-[14px] border border-current/25 px-4 py-2.5 outline-none focus:border-current/60'
							/>
						</div>

						<div className='space-y-2'>
							<label
								htmlFor='contact-message'
								className='text-[12px] uppercase tracking-[0.25em] opacity-60'
							>
								Message
							</label>
							<textarea
								id='contact-message'
								rows={5}
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								required
								className='w-full bg-transparent text-[14px] border border-current/25 px-4 py-3 outline-none resize-none focus:border-current/60'
							/>
						</div>

						<button
							type='submit'
							disabled={status === 'sending'}
							className='pt-2 text-[13px] uppercase tracking-[0.25em] hover:opacity-60 text-left disabled:opacity-40'
						>
							{status === 'sending' ? 'Sending…' : 'Send Message →'}
						</button>
					</form>

					{/* Success card */}
					<div
						className={[
							'pointer-events-none absolute inset-0 flex items-center justify-center transition-all duration-500',
							showCard ? 'opacity-100' : 'opacity-0',
						].join(' ')}
						aria-hidden={!showCard}
					>
						<div
							className={[
								'px-7 py-4 uppercase tracking-[0.25em] text-[12px] transition-all duration-500',
								showCard ? 'translate-y-0' : 'translate-y-3',
								'bg-black text-white dark:bg-white dark:text-black',
							].join(' ')}
						>
							Sent
						</div>
					</div>
				</div>

			</div>
		</section>
	);
}