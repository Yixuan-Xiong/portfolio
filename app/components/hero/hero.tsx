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
						className='absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-12 py-8 text-lg md:px-28'
						data-skip-splash-cursor
					>
						<div className='text-[20px] uppercase tracking-[0.25em] font-medium opacity-80'>
							Yixuan Xiong
						</div>

						<div className='flex items-center gap-14 text-lg'>
							<Link
								href='/'
								className='text-[20px] uppercase tracking-[0.25em] font-medium opacity-80'
							>
								Home
							</Link>

							<Link
								href='/projects'
								className='text-[20px] uppercase tracking-[0.25em] font-medium opacity-80'
							>
								Projects
							</Link>

							<Link
								href='/cv'
								className='text-[20px] uppercase tracking-[0.25em] font-medium opacity-80'
							>
								CV
							</Link>

							{/* ✅ Contact：同页滚动到 Contact 区块 */}
							<button
								type='button'
								onClick={handleScrollToContact}
								className='text-[20px] uppercase tracking-[0.25em] font-medium opacity-80 hover:opacity-60 transition-opacity'
								data-skip-splash-cursor
							>
								Contact
							</button>
						</div>
					</nav>

					<ArrowDown />

					{/* ===== Hero Content (Left text + Right photo) ===== */}
					<div className='relative z-10 flex min-h-svh w-full flex-col justify-center gap-14 px-16 pt-28 pb-20 md:flex-row md:items-center md:justify-between md:px-28'>
						{/* ===== Left ===== */}
						<div className='w-full max-w-4xl'>
							<div className='space-y-8'>
								<h1 className='leading-relaxed opacity-80 text-[clamp(1.05rem,1.4vw,1.6rem)]'>
									Welcome to my portfolio
								</h1>

								<h1 className='font-medium leading-[1.05] text-[clamp(2.6rem,5.2vw,5.2rem)]'>
									Hi, I&apos;m <span className='font-bold'>Yixuan Xiong</span>
								</h1>

								<h2 className='font-medium leading-tight text-[clamp(1.8rem,3.8vw,4.2rem)]'>
									– Brand &amp; Digital Designer
								</h2>
							</div>

							<section className='relative z-10 mt-14 max-w-3xl'>
								<div className='space-y-6 leading-relaxed opacity-80 text-[clamp(0.95rem,1.1vw,1.25rem)]'>
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

						{/* ===== Right Photo (≈ 1/3 width) ===== */}
						<div className='w-full md:w-auto'>
							<div className='relative h-[420px] w-full overflow-hidden md:h-[520px] md:w-[32vw] md:max-w-[520px] md:min-w-[360px]'>
								<Image
									src='/profile.jpg'
									alt='Yixuan Xiong'
									fill
									priority
									sizes='(min-width: 1280px) 32vw, (min-width: 768px) 40vw, 100vw'
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