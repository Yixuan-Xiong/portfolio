'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import SplashCursor from '../splash-cursor';
import ArrowDown from './arrow-down';

export default function Hero() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const handleScrollToContact = () => {
		setMobileMenuOpen(false);
		const target = document.getElementById('contact');
		if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
	};

	const navItemClass =
		'text-[11px] uppercase tracking-[0.32em] font-medium opacity-75 hover:opacity-50 transition-opacity';

	const mobilePanelItemClass =
		'text-[12px] uppercase tracking-[0.32em] font-medium opacity-80 hover:opacity-55 transition-opacity text-left';

	const closeMobile = () => setMobileMenuOpen(false);

	return (
		<main className='relative w-full overflow-x-hidden'>
			<SplashCursor containerClassName='w-full' usePrimaryColors>
				<div className='relative min-h-svh'>
					{/* ================= NAV ================= */}
					<nav className='fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-6 md:px-28 md:py-8 bg-white/70 text-black backdrop-blur dark:bg-black/40 dark:text-white'>
						<button
							type='button'
							onClick={scrollToTop}
							className='text-[11px] uppercase tracking-[0.32em] font-medium opacity-75 hover:opacity-50 transition-opacity'
						>
							Yixuan Xiong
						</button>

						{/* Desktop nav */}
						<div className='hidden md:flex items-center gap-10'>
							<button
								type='button'
								onClick={scrollToTop}
								className={navItemClass}
							>
								Home
							</button>

							<Link href='/projects' className={navItemClass}>
								Projects
							</Link>

							<Link href='/cv' className={navItemClass} prefetch={false}>
								CV
							</Link>

							<button
								type='button'
								onClick={handleScrollToContact}
								className={navItemClass}
							>
								Contact
							</button>
						</div>
					</nav>

					{/* ================= 手机端菜单按钮（保持你现在：在右上，但给明暗按钮留空间） ================= */}
					<div className='md:hidden fixed top-6 right-16 z-50'>
						<button
							type='button'
							onClick={() => setMobileMenuOpen((v) => !v)}
							className='text-[20px] opacity-80 hover:opacity-60 transition-opacity'
							aria-label='Open menu'
						>
							☰
						</button>
					</div>

					{/* ================= MOBILE MENU PANEL ================= */}
					<div
						className={[
							'md:hidden fixed inset-0 z-50 transition-opacity',
							mobileMenuOpen
								? 'opacity-100 pointer-events-auto'
								: 'opacity-0 pointer-events-none',
						].join(' ')}
					>
						{/* ✅ 用 button 当 overlay，避免你 pre-commit 的 a11y 报错 */}
						<button
							type='button'
							aria-label='Close menu overlay'
							onClick={closeMobile}
							className='absolute inset-0 bg-black/70'
						/>

						<div className='absolute right-0 top-0 h-full w-[78vw] max-w-[320px] bg-black text-white dark:bg-white dark:text-black p-6'>
							{/* header */}
							<div className='relative flex items-center'>
								<div className='text-[11px] uppercase tracking-[0.32em] font-medium opacity-75'>
									Menu
								</div>

								{/* ✅ 关键：关闭按钮往左挪（right-16）避免和明暗按钮重叠 */}
								<button
									type='button'
									onClick={closeMobile}
									className='absolute top-0 right-16 text-[20px] opacity-70 hover:opacity-50 transition-opacity'
									aria-label='Close menu'
								>
									×
								</button>
							</div>

							<div className='mt-10 flex flex-col gap-6'>
								<button
									type='button'
									onClick={scrollToTop}
									className={mobilePanelItemClass}
								>
									Home
								</button>

								<Link
									href='/projects'
									onClick={closeMobile}
									className={mobilePanelItemClass}
								>
									Projects
								</Link>

								<Link
									href='/cv'
									onClick={closeMobile}
									className={mobilePanelItemClass}
									prefetch={false}
								>
									CV
								</Link>

								<button
									type='button'
									onClick={handleScrollToContact}
									className={mobilePanelItemClass}
								>
									Contact
								</button>
							</div>
						</div>
					</div>

					<ArrowDown />

					{/* ================= HERO CONTENT ================= */}
					<div className='relative z-10 flex min-h-svh w-full flex-col justify-center gap-10 px-6 pt-28 pb-20 md:flex-row md:items-center md:justify-between md:px-28 md:pt-32'>
						<div className='w-full max-w-[48rem]'>
							<div className='space-y-6'>
								<h1 className='leading-relaxed opacity-70 text-[clamp(0.85rem,0.75vw,1rem)]'>
									Welcome to my portfolio
								</h1>

								<h1 className='font-medium leading-[1.05] text-[clamp(2rem,3vw,3.2rem)]'>
									Hi, I&apos;m{' '}
									<span className='font-semibold'>Yixuan Xiong</span>
								</h1>

								<h2 className='font-medium leading-tight opacity-85 text-[clamp(1.4rem,2vw,2.4rem)]'>
									– Brand &amp; Digital Designer
								</h2>
							</div>

							<section className='mt-10 max-w-[40rem]'>
								<div className='space-y-5 leading-[1.8] opacity-75 text-[clamp(0.85rem,0.75vw,1rem)]'>
									<p>
										I specialise in brand identity, e-commerce and web design,
										alongside brochure design and 3D visualisation.
									</p>
									<p>
										My work merges aesthetic refinement with strategic thinking,
										creating design solutions that are both visually distinctive
										and user-driven.
									</p>
								</div>
							</section>
						</div>

						<div className='w-full md:w-auto'>
							<div className='relative h-[300px] w-full overflow-hidden md:h-[420px] md:w-[28vw] md:max-w-[500px] md:min-w-[340px]'>
								<Image
									src='/profile.jpg'
									alt='Yixuan Xiong'
									fill
									priority
									className='object-cover grayscale contrast-110'
								/>
							</div>
						</div>
					</div>
					{/* ================= /HERO CONTENT ================= */}
				</div>
			</SplashCursor>
		</main>
	);
}
