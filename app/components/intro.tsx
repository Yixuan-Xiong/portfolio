'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

function opacityForBlock(sectionProgress: number, blockNumber: number) {
	const progress = sectionProgress - blockNumber;
	return progress >= 0 && progress < 1 ? 1 : 0.2;
}

export default function Intro() {
	const [progress, setProgress] = useState(0);
	const refContainer = useRef<HTMLDivElement>(null);
	const rafRef = useRef<number | null>(null);

	const sidebarTitleClass = useMemo(
		() => 'text-[12px] uppercase tracking-[0.35em] font-medium opacity-60',
		[],
	);

	const computeLayout = useCallback(() => {
		const containerEl = refContainer.current;
		if (!containerEl) return;

		const scrollY = window.scrollY || 0;
		const { clientHeight, offsetTop } = containerEl;

		const percentY =
			Math.min(clientHeight, Math.max(0, scrollY - offsetTop)) / clientHeight;

		const numOfPages = 4;

		const nextProgress = Math.min(
			numOfPages - 0.5,
			Math.max(0.5, percentY * numOfPages),
		);

		setProgress(nextProgress);
	}, []);

	useEffect(() => {
		const update = () => {
			if (rafRef.current) return;

			rafRef.current = window.requestAnimationFrame(() => {
				rafRef.current = null;
				computeLayout();
			});
		};

		computeLayout();

		window.addEventListener('scroll', update, { passive: true });
		window.addEventListener('resize', update);

		return () => {
			window.removeEventListener('scroll', update);
			window.removeEventListener('resize', update);
			if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
		};
	}, [computeLayout]);

	return (
		<section
			ref={refContainer}
			id='intro'
			className='relative z-10 bg-black text-white dark:bg-white dark:text-black'
		>
			<div className='mx-auto w-full max-w-[1400px] px-6 py-20 md:px-10 md:py-28 lg:px-16'>
				<div className='grid grid-cols-12 gap-x-16'>
					{/* ===== Left Title ===== */}
					<div className='col-span-12 lg:col-span-3'>
						<h2 className='text-[18px] uppercase tracking-[0.32em] font-medium opacity-75'>
							About Me
						</h2>
					</div>

					{/* ===== Middle Content ===== */}
					<div className='col-span-12 mt-10 lg:col-span-6 lg:mt-0'>
						<div className='space-y-16 font-medium leading-[1.75] text-[clamp(1rem,1.05vw,1.4rem)]'>
							<div style={{ opacity: opacityForBlock(progress, 0) }}>
								Since 2019, I have worked independently as a freelance designer,
								collaborating with over 100 companies to develop e-commerce
								design solutions across platforms such as Amazon and TikTok.
							</div>

							<div style={{ opacity: opacityForBlock(progress, 1) }}>
								By combining structured visual systems with strategic thinking,
								I have helped brands enhance engagement, visibility and
								conversion performance.
							</div>

							<div style={{ opacity: opacityForBlock(progress, 2) }}>
								In addition to digital commerce design, I provide product
								modelling and 3D visualisation, as well as brand strategy
								support, strengthening product presentation and overall brand
								experience.
							</div>

							<div style={{ opacity: opacityForBlock(progress, 3) }}>
								In 2025, I was commissioned by a curator at the Kyoto Art Museum
								to design exhibition catalogues, posters and promotional
								materials, expanding my practice into editorial and cultural
								design.
							</div>
						</div>

						{/* ================= MOBILE Skills / Tools ================= */}
						<div className='mt-16 lg:hidden space-y-10'>
							<div>
								<div className='text-[11px] uppercase tracking-[0.35em] opacity-50 mb-4'>
									Skills
								</div>

								<div className='flex flex-wrap gap-2 text-[11px]'>
									{[
										'Brand Strategy',
										'Visual Identity',
										'Graphic Design',
										'Print Design',
										'Digital Design',
										'3D Modelling',
										'AI Image',
									].map((item) => (
										<span
											key={item}
											className='px-3 py-1 border border-white/20 dark:border-black/20 rounded-full opacity-70'
										>
											{item}
										</span>
									))}
								</div>
							</div>

							<div>
								<div className='text-[11px] uppercase tracking-[0.35em] opacity-50 mb-4'>
									Tools
								</div>

								<div className='flex flex-wrap gap-2 text-[11px]'>
									{[
										'Illustrator',
										'Photoshop',
										'InDesign',
										'Figma',
										'Blender',
										'Rhino',
										'Midjourney',
										'Python',
									].map((tool) => (
										<span
											key={tool}
											className='px-3 py-1 border border-white/20 dark:border-black/20 rounded-full opacity-65'
										>
											{tool}
										</span>
									))}
								</div>
							</div>
						</div>
					</div>

					{/* ================= DESKTOP Right Sidebar ================= */}
					<div className='hidden lg:block col-span-3 relative'>
						<div className='absolute top-0 left-0 h-full w-px bg-white/10 dark:bg-black/10' />

						<div className='pl-10'>
							<div className='mx-auto w-[240px] space-y-8'>
								<div>
									<div className={sidebarTitleClass}>Skills</div>
									<div className='mt-4 space-y-2 text-[10px] opacity-70'>
										<div>Brand Strategy & Positioning</div>
										<div>Visual Identity System Design</div>
										<div>Graphic Design</div>
										<div>Print & Publication Design</div>
										<div>Digital Design & E-commerce</div>
										<div>3D Modelling & Rendering</div>
										<div>AI Image Generation</div>
									</div>
								</div>

								<div>
									<div className={sidebarTitleClass}>Tools</div>
									<div className='mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[10px] opacity-65'>
										<span>Illustrator</span>
										<span>Photoshop</span>
										<span>InDesign</span>
										<span>Figma</span>
										<span>Sketch</span>
										<span>Rhino</span>
										<span>Blender</span>
										<span>Midjourney</span>
										<span>Python</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
