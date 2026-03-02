'use client';

import Link from 'next/link';
import Image from 'next/image';
import SplashCursor from '../splash-cursor';
import ArrowDown from './arrow-down';

export default function Hero() {
	const handleScrollToContact = () => {
		const target = document.getElementById('contact');
		if (target) {
			target.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	};

	return (
		<main className='relative w-screen overflow-x-hidden'>
			<SplashCursor containerClassName='w-screen' usePrimaryColors={true}>
				<div className='relative min-h-svh'>
					{/* ===== Top Navigation ===== */}
					<nav
						className='absolute top-0 left-0 right-0 z-[100] pointer-events-auto flex items-center justify-between px-6 py-6 md:px-28 md:py-8'
						data-skip-splash-cursor
					>
						<div className='text-[11px] uppercase tracking-[0.32em] font-medium opacity-75'>
							Yixuan Xiong
						</div>

						{/* ✅ 手机端自动换行，不会显示不全 */}
						<div className='flex flex-wrap items-center justify-end gap-x-6 gap-y-3 md:flex-nowrap md:gap-10'>
							<Link
								href='/'
								className='text-[11px] uppercase tracking-[0.32em] font-medium opacity-75'
							>
								Home
							</Link>

							<Link
								href='/projects'
								className='text-[11px] uppercase tracking-[0.32em] font-medium opacity-75'
							>
								Projects
							</Link>

							<Link
								href='/cv'
								className='text-[11px] uppercase tracking-[0.32em] font-medium opacity-75'
							>
								CV
							</Link>

							<button
								type='button'
								onClick={handleScrollToContact}
								className='text-[11px] uppercase tracking-[0.32em] font-medium opacity-75 hover:opacity-50 transition-opacity'
								data-skip-splash-cursor
							>
								Contact
							</button>
						</div>
					</nav>

					<ArrowDown />

					{/* ===== Hero Content ===== */}
					<div className='relative z-10 flex min-h-svh w-full flex-col justify-center gap-14 px-6 pt-28 pb-20 md:px-28 md:flex-row md:items-center md:justify-between'>
						{/* ===== Left ===== */}
						<div className='w-full max-w-[48rem]'>
							<div className='space-y-6'>
								<h1 className='leading-relaxed opacity-70 text-[clamp(0.85rem,0.75vw,1rem)]'>
									Welcome to my portfolio
								</h1>

								<h1 className='font-medium leading-[1.05] text-[clamp(2rem,3vw,3.2rem)]'>
									Hi, I&apos;m <span className='font-semibold'>Yixuan Xiong</span>
								</h1>

								<h2 className='font-medium leading-tight opacity-85 text-[clamp(1.4rem,2vw,2.4rem)]'>
									– Brand &amp; Digital Designer
								</h2>
							</div>

							<section className='relative z-10 mt-10 max-w-[40rem]'>
								<div className='space-y-5 leading-[1.8] opacity-75 text-[clamp(0.85rem,0.75vw,1rem)]'>
									<p>
										I specialise in brand identity, e-commerce and web design,
										alongside brochure design and 3D visualisation.
									</p>
									<p>
										My work merges aesthetic refinement with strategic thinking,
										creating design solutions that are both visually distinctive and
										user-driven. By integrating AI and 3D visualisation into my
										workflow, I reimagine traditional brand and digital design
										through more experimental and forward-looking approaches.
									</p>
								</div>
							</section>
						</div>

						{/* ===== Right Photo ===== */}
						<div className='w-full md:w-auto'>
							<div className='relative h-[320px] w-full overflow-hidden md:h-[420px] md:w-[28vw] md:max-w-[500px] md:min-w-[340px]'>
								<Image
									src='/profile.jpg'
									alt='Yixuan Xiong'
									fill
									priority
									sizes='(min-width: 1280px) 28vw, (min-width: 768px) 40vw, 100vw'
									className='object-cover grayscale contrast-110'
									style={{ objectPosition: '75% 50%' }}
								/>
							</div>
						</div>
					</div>
				</div>
			</SplashCursor>
		</main>
	);
}