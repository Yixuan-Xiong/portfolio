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

	// ✅ 让“滚到中间就变黑”：用视口中线参与计算（和你之前手感一致）
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
			{/* ✅ 手机端别给太大上下 padding，避免“显示不全” */}
			<div className='mx-auto w-full max-w-[1400px] px-6 py-16 md:px-10 md:py-24 lg:px-16'>
				<div className='grid grid-cols-12 items-stretch gap-x-16'>
					{/* ===== Left Title ===== */}
					<div className='col-span-12 lg:col-span-3'>
						<h2 className='text-[18px] uppercase tracking-[0.32em] font-medium opacity-75'>
							About Me
						</h2>
					</div>

					{/* ===== Middle Content ===== */}
					<div className='col-span-12 mt-10 lg:col-span-6 lg:mt-0'>
						{/* ✅ 手机端字号略收、段落间距收一点，避免挤出屏幕 */}
						<div className='space-y-12 md:space-y-16 font-medium leading-[1.75] text-[clamp(0.98rem,1.05vw,1.4rem)]'>
							<div style={{ opacity: opacityForBlock(progress, 0) }}>
								Since 2019, I have worked as a freelance designer.
								<br className='hidden md:block' />I collaborate with brands
								across Amazon and TikTok.
							</div>

							<div style={{ opacity: opacityForBlock(progress, 1) }}>
								I combine structured visual systems with strategic thinking.
								<br className='hidden md:block' />
								This helps improve engagement and conversion.
							</div>

							<div style={{ opacity: opacityForBlock(progress, 2) }}>
								I also create 3D modelling and product visualisation.
								<br className='hidden md:block' />I support brand direction and
								overall experience.
							</div>

							<div style={{ opacity: opacityForBlock(progress, 3) }}>
								In 2025, I designed materials for Kyoto Art Museum.
								<br className='hidden md:block' />
								This expanded my work into editorial and culture projects.
							</div>
						</div>

						{/* ================= MOBILE Skills / Tools（更省空间，分配更协调） ================= */}
						<div className='mt-12 lg:hidden'>
							<div className='space-y-8'>
								<div>
									<div className='text-[11px] uppercase tracking-[0.35em] opacity-50 mb-3'>
										Skills
									</div>

									{/* ✅ 更短词、更紧凑 */}
									<div className='flex flex-wrap gap-2 text-[10.5px] leading-none'>
										{[
											'Brand',
											'Identity',
											'Graphic',
											'Editorial',
											'Digital',
											'E-commerce',
											'3D',
											'AI',
										].map((item) => (
											<span
												key={item}
												className='px-3 py-1 rounded-full border border-white/20 dark:border-black/20 opacity-70'
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

									<div className='flex flex-wrap gap-2 text-[10.5px] leading-none'>
										{[
											'AI',
											'Figma',
											'Ps',
											'Ai',
											'Id',
											'Blender',
											'Rhino',
											'KeyShot',
										].map((tool) => (
											<span
												key={tool}
												className='px-3 py-1 rounded-full border border-white/20 dark:border-black/20 opacity-65'
											>
												{tool}
											</span>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* ================= DESKTOP Right Sidebar（底部对齐） ================= */}
					<div className='hidden lg:block col-span-3 relative'>
						<div className='absolute top-0 left-0 h-full w-px bg-white/10 dark:bg-black/10' />

						<div className='h-full pl-10 flex flex-col justify-end'>
							<div className='mx-auto w-[240px] space-y-7'>
								<div>
									<div className={sidebarTitleClass}>Skills</div>
									<div className='mt-4 space-y-2 text-[10px] opacity-70 leading-[1.5]'>
										<div>Brand Strategy &amp; Positioning</div>
										<div>Visual Identity System Design</div>
										<div>Graphic Design</div>
										<div>Print &amp; Publication Design</div>
										<div>Digital Design &amp; E-commerce</div>
										<div>3D Modelling &amp; Rendering</div>
										<div>AI Image Generation</div>
									</div>
								</div>

								<div>
									<div className={sidebarTitleClass}>Tools</div>
									<div className='mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[10px] opacity-65 leading-[1.6]'>
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
					{/* ================= /DESKTOP Right Sidebar ================= */}
				</div>
			</div>
		</section>
	);
}
