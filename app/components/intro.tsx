'use client';

import { useEffect, useMemo, useRef, useState, useCallback } from 'react';

function opacityForBlock(sectionProgress: number, blockNumber: number) {
	const progress = sectionProgress - blockNumber;
	return progress >= 0 && progress < 1 ? 1 : 0.2;
}

export default function Intro() {
	const [progress, setProgress] = useState(0);

	const refContainer = useRef<HTMLDivElement>(null);
	const rafRef = useRef<number | null>(null);

	const sidebarTitleClass = useMemo(
		() => 'text-[12px] uppercase tracking-[0.38em] font-medium opacity-60',
		[]
	);

	const computeLayout = useCallback(() => {
		const containerEl = refContainer.current;
		if (!containerEl) return;

		const scrollY = window.scrollY || 0;
		const { clientHeight, offsetTop } = containerEl;

		const screenH = window.innerHeight;
		const halfH = screenH / 2;

		const percentY =
			Math.min(
				clientHeight + halfH,
				Math.max(-screenH, scrollY - offsetTop) + halfH
			) / clientHeight;

		const numOfPages = 4;

		const nextProgress = Math.min(
			numOfPages - 0.5,
			Math.max(0.5, percentY * numOfPages)
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
		<div
			ref={refContainer}
			className='relative z-10 bg-black text-white dark:bg-white dark:text-black'
			id='intro'
		>
			{/* ================= Mobile (simple, readable) ================= */}
			<div className='block lg:hidden'>
				<div className='mx-auto w-full max-w-[720px] px-6 pt-16 pb-16'>
					<h2 className='text-[18px] uppercase tracking-[0.32em] font-medium opacity-75'>
						About Me
					</h2>

					<div className='mt-10 space-y-10 font-medium leading-[1.75] text-[clamp(1.02rem,4.2vw,1.25rem)]'>
						<p>
							Since 2019, I have worked independently as a freelance designer,
							collaborating with over 100 companies to develop e-commerce design
							solutions across platforms such as Amazon and TikTok.
						</p>
						<p>
							By combining structured visual systems with strategic thinking, I
							have helped brands enhance engagement, visibility and conversion
							performance.
						</p>
						<p>
							In addition to digital commerce design, I provide product modelling
							and 3D visualisation, as well as brand strategy support,
							strengthening product presentation and overall brand experience.
						</p>
						<p>
							In 2025, I was commissioned by a curator at the Kyoto Art Museum to
							design exhibition catalogues, posters and promotional materials,
							expanding my practice into editorial and cultural design.
						</p>
					</div>
				</div>
			</div>

			{/* ================= Desktop (three columns) ================= */}
			<div className='hidden lg:block'>
				<div className='mx-auto w-full max-w-[1400px] px-10 pt-28 pb-24 lg:px-16'>
					<div className='relative grid grid-cols-12 gap-x-16'>
						{/* Left */}
						<div className='col-span-3'>
							<h2 className='text-[18px] uppercase tracking-[0.32em] font-medium opacity-75'>
								About Me
							</h2>
						</div>

						{/* Middle */}
						<div className='col-span-6'>
							<div className='max-w-[42rem] space-y-16 font-medium leading-[1.75] text-[clamp(1.05rem,1.05vw,1.45rem)]'>
								<div style={{ opacity: opacityForBlock(progress, 0) }}>
									Since 2019, I have worked independently as a freelance designer,
									collaborating with over 100 companies to develop e-commerce design
									solutions across platforms such as Amazon and TikTok.
								</div>

								<div style={{ opacity: opacityForBlock(progress, 1) }}>
									By combining structured visual systems with strategic thinking, I
									have helped brands enhance engagement, visibility and conversion
									performance.
								</div>

								<div style={{ opacity: opacityForBlock(progress, 2) }}>
									In addition to digital commerce design, I provide product modelling
									and 3D visualisation, as well as brand strategy support,
									strengthening product presentation and overall brand experience.
								</div>

								<div style={{ opacity: opacityForBlock(progress, 3) }}>
									In 2025, I was commissioned by a curator at the Kyoto Art Museum
									to design exhibition catalogues, posters and promotional materials,
									expanding my practice into editorial and cultural design.
								</div>
							</div>
						</div>

						{/* Right */}
						<div className='col-span-3 relative'>
							{/* vertical line */}
							<div className='pointer-events-none absolute top-0 h-full w-px bg-white/10 dark:bg-black/10 left-0' />

							{/* bottom aligned block */}
							<div className='absolute bottom-0 left-0 right-0'>
								{/* 把内容放到 “竖线 到右边界” 的中间：pl-10 + mx-auto */}
								<div className='pl-10'>
									<div className='mx-auto w-[260px] space-y-5'>
										<div className='space-y-3'>
											<div className={sidebarTitleClass}>Skills</div>
											<div className='space-y-2 text-[10px] leading-[1.45] opacity-70'>
												<div>Brand Strategy &amp; Positioning</div>
												<div>Visual Identity System Design</div>
												<div>Graphic Design</div>
												<div>Print &amp; Publication Design</div>
												<div>Digital Design &amp; E-commerce Design</div>
												<div>3D Modelling &amp; Rendering</div>
												<div>AI Image Generation</div>
											</div>
										</div>

										<div className='space-y-3'>
											<div className={sidebarTitleClass}>Tools</div>
											<div className='flex flex-wrap gap-x-4 gap-y-2 text-[10px] leading-[1.65] opacity-65'>
												<span>Adobe Illustrator</span>
												<span>Adobe Photoshop</span>
												<span>Adobe InDesign</span>
												<span>Adobe Experience Design</span>
												<span>Adobe Premiere Pro</span>
												<span>Figma</span>
												<span>Sketch</span>
												<span>Procreate</span>
												<span>Rhino</span>
												<span>KeyShot</span>
												<span>Blender</span>
												<span>C4D</span>
												<span>Midjourney</span>
												<span>Google Gemini</span>
												<span>Python (Creative Coding)</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>{/* grid */}
				</div>
			</div>
		</div>
	);
}