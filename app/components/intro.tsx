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

	// ✅ 滚到屏幕中线就变黑（你原来的手感）
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
				Math.max(-screenH, scrollY - offsetTop) + halfH,
			) / clientHeight;

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
			<div className='mx-auto w-full max-w-[1400px] px-5 py-14 sm:px-6 sm:py-16 md:px-10 md:py-24 lg:px-16'>
				{/* ✅ 关键：手机单列；lg 才 12 列，避免移动端被“裁掉” */}
				<div className='grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:items-stretch lg:gap-x-16 lg:gap-y-0'>
					{/* ===== Left Title ===== */}
					<div className='lg:col-span-3'>
						<h2 className='text-[18px] uppercase tracking-[0.32em] font-medium opacity-75'>
							About Me
						</h2>
					</div>

					{/* ===== Middle Content ===== */}
					<div className='lg:col-span-6 min-w-0'>
						{/* ✅ 关键：min-w-0 + max-w-full + overflow-wrap:anywhere，绝不右侧溢出 */}
						<div
							className={[
								'w-full max-w-full',
								'space-y-11 md:space-y-16',
								'font-medium leading-[1.75]',
								'text-[15px] sm:text-[16px] md:text-[clamp(0.98rem,1.05vw,1.4rem)]',
								'break-words [overflow-wrap:anywhere] hyphens-auto',
							].join(' ')}
						>
							<div style={{ opacity: opacityForBlock(progress, 0) }}>
								Since 2019, I have worked independently as a freelance designer,
								collaborating with over 100 companies to develop e-commerce
								design solutions across platforms such as Amazon and TikTok.
							</div>

							<div style={{ opacity: opacityForBlock(progress, 1) }}>
								By combining structured visual systems with strategic thinking,
								I have helped brands enhance engagement, visibility and
								conversion performance..
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
						<div className='mt-12 lg:hidden min-w-0'>
							<div className='space-y-8'>
								<div>
									<div className='text-[11px] uppercase tracking-[0.35em] opacity-50 mb-3'>
										Skills
									</div>

									{/* ✅ 每个 tag 也允许断行，避免右侧被裁 */}
									<div className='w-full max-w-full flex flex-wrap gap-2 text-[11px] leading-[1.15] opacity-80 min-w-0'>
										{[
											'Brand Strategy & Positioning',
											'Visual Identity System Design',
											'Graphic Design',
											'Print & Publication Design',
											'Digital Design & E-commerce Design',
											'3D Modelling & Rendering',
											'AI Image Generation',
										].map((item) => (
											<span
												key={item}
												className='max-w-full whitespace-normal break-words [overflow-wrap:anywhere] px-3 py-1 rounded-full border border-white/20 dark:border-black/20'
											>
												{item}
											</span>
										))}
									</div>
								</div>

								<div>
									<div className='text-[11px] uppercase tracking-[0.35em] opacity-50 mb-3'>
										Tools
									</div>

									<div className='w-full max-w-full flex flex-wrap gap-2 text-[11px] leading-[1.15] opacity-75 min-w-0'>
										{[
											'Adobe Illustrator',
											'Adobe Photoshop',
											'Adobe InDesign',
											'Adobe Experience Design',
											'Adobe Premiere Pro',
											'Figma',
											'Sketch',
											'Procreate',
											'Rhino',
											'KeyShot',
											'Blender',
											'C4D',
											'Midjourney',
											'Google Gemini',
											'Python (Creative Coding)',
										].map((tool) => (
											<span
												key={tool}
												className='max-w-full whitespace-normal break-words [overflow-wrap:anywhere] px-3 py-1 rounded-full border border-white/20 dark:border-black/20'
											>
												{tool}
											</span>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* ================= DESKTOP Right Sidebar ================= */}
					<div className='hidden lg:block lg:col-span-3 relative'>
						<div className='absolute top-0 left-0 h-full w-px bg-white/10 dark:bg-black/10' />

						{/* ✅ 底部对齐：与中间正文底部对齐 */}
						<div className='h-full pl-10 flex flex-col justify-end'>
							<div className='mx-auto w-[240px] space-y-7'>
								<div>
									<div className={sidebarTitleClass}>Skills</div>
									<div className='mt-4 space-y-2 text-[10px] opacity-70 leading-[1.5]'>
										<div>Brand Strategy &amp; Positioning</div>
										<div>Visual Identity System Design</div>
										<div>Graphic Design</div>
										<div>Print &amp; Publication Design</div>
										<div>Digital Design &amp; E-commerce Design</div>
										<div>3D Modelling &amp; Rendering</div>
										<div>AI Image Generation</div>
									</div>
								</div>

								<div>
									<div className={sidebarTitleClass}>Tools</div>
									<div className='mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[10px] opacity-65 leading-[1.6]'>
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
					{/* ================= /DESKTOP Right Sidebar ================= */}
				</div>
			</div>
		</section>
	);
}
