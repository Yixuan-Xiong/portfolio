'use client';

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

	// ✅ 1.5 秒后自动消失
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
			id="contact"
			className="min-h-screen w-screen bg-white text-black dark:bg-black dark:text-white flex items-center scroll-mt-28"
		>
			<div className="w-full px-16 md:px-28 xl:px-40 flex justify-between gap-x-24">
				{/* LEFT */}
				<div className="max-w-[520px] shrink-0">
					<h1 className="text-[44px] uppercase tracking-[0.28em] font-medium">
						Contact Me
					</h1>

					<a
						href="/cv/Yixuan_Xiong_CV.pdf"
						download="Yixuan_Xiong_CV.pdf"
						className="
							inline-block mt-10
							text-sm uppercase tracking-[0.22em]
							border-b border-current
							pb-1
							hover:opacity-60
							transition-opacity
						"
					>
						Download CV →
					</a>

					<div className="mt-20 space-y-14 text-[18px] leading-[1.7]">
						<div className="space-y-4">
							<div className="text-sm uppercase tracking-[0.22em] opacity-50">
								Email
							</div>
							<div>xiongyixuan1006@gmail.com</div>
						</div>

						<div className="space-y-4">
							<div className="text-sm uppercase tracking-[0.22em] opacity-50">
								Phone
							</div>
							<div>+44 7436289616</div>
						</div>

						<div className="space-y-4">
							<div className="text-sm uppercase tracking-[0.22em] opacity-50">
								Address
							</div>
							<div>London, United Kingdom</div>
						</div>
					</div>
				</div>

				{/* RIGHT */}
				<div className="relative w-full max-w-[680px]">
					<form className="flex flex-col space-y-14" onSubmit={handleSubmit}>
						<div className="space-y-4">
							<label className="text-sm uppercase tracking-[0.22em] opacity-60">
								Name
							</label>
							<input
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
								className="w-full bg-transparent text-current border border-current/25 px-6 py-4 outline-none focus:border-current/60"
							/>
						</div>

						<div className="space-y-4">
							<label className="text-sm uppercase tracking-[0.22em] opacity-60">
								Email
							</label>
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								className="w-full bg-transparent text-current border border-current/25 px-6 py-4 outline-none focus:border-current/60"
							/>
						</div>

						<div className="space-y-4">
							<label className="text-sm uppercase tracking-[0.22em] opacity-60">
								Message
							</label>
							<textarea
								rows={10}
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								required
								className="w-full bg-transparent text-current border border-current/25 px-6 py-5 outline-none resize-none focus:border-current/60"
							/>
						</div>

						<button
							type="submit"
							disabled={status === 'sending'}
							className="pt-4 text-[16px] uppercase tracking-[0.22em] hover:opacity-60 text-left disabled:opacity-40"
						>
							{status === 'sending' ? 'Sending…' : 'Send Message →'}
						</button>
					</form>

					{/* ✅ 居中卡片：表单区域中间出现 */}
					<div
						className={`
							pointer-events-none
							absolute inset-0
							flex items-center justify-center
							transition-all duration-500
							${showCard ? 'opacity-100' : 'opacity-0'}
						`}
						aria-hidden={!showCard}
					>
						<div
							className={`
								px-10 py-6
								uppercase tracking-[0.22em] text-sm
								transition-all duration-500
								${showCard ? 'translate-y-0' : 'translate-y-3'}
								bg-black text-white
								dark:bg-white dark:text-black
							`}
						>
							Sent
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}