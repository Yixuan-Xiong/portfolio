'use client';

import { useEffect, useMemo, useRef, useState, useCallback } from 'react';

function opacityForBlock(sectionProgress: number, blockNumber: number) {
	const progress = sectionProgress - blockNumber;
	return progress >= 0 && progress < 1 ? 1 : 0.2;
}

export default function Intro() {
	const [skillsTop, setSkillsTop] = useState(0);
	const [progress, setProgress] = useState(0);

	const refContainer = useRef<HTMLDivElement>(null);
	const refLastBlock = useRef<HTMLDivElement>(null);
	const refSkills = useRef<HTMLDivElement>(null);

	const rafRef = useRef<number | null>(null);

	// ✅ Sidebar 标题：小一点，但清晰
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

		const lastEl = refLastBlock.current;
		const skillsEl = refSkills.current;
		if (!lastEl || !skillsEl) return;

		const containerRect = containerEl.getBoundingClientRect();
		const lastRect = lastEl.getBoundingClientRect();
		const skillsRect = skillsEl.getBoundingClientRect();

		const lastBottom = lastRect.bottom - containerRect.top;
		const nextSkillsTop = lastBottom - skillsRect.height;

		setSkillsTop(nextSkillsTop);
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
			{/* ================= Three-column Swiss container ================= */}
			<div className='mx-auto w-full max-w-[1400px] px-10 pt-28 pb-24 lg:px-16'>
				<div className='relative grid grid-cols-12 gap-x-16'>
					{/* ===== Left: About Me ===== */}
					<div className='col-span-12 lg:col-span-3'>
						<h2 className='text-[18px] uppercase tracking-[0.32em] font-medium opacity-75'>
							About Me
						</h2>
					</div>

					{/* ===== Middle: Text (left aligned) ===== */}
					<div className='col-span-12 mt-14 lg:col-span-6 lg:mt-0'>
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

							<div
								ref={refLastBlock}
								style={{ opacity: opacityForBlock(progress, 3) }}
							>
								In 2025, I was commissioned by a curator at the Kyoto Art Museum
								to design exhibition catalogues, posters and promotional materials,
								expanding my practice into editorial and cultural design.
							</div>
						</div>
					</div>

					{/* ===== Right: Skills / Tools ===== */}
					<div className='col-span-12 mt-14 lg:col-span-3 lg:mt-0'>
						{/* ✅ 竖线：只在大屏显示，略往左推一点 + 留出右栏呼吸 */}
						<div className='pointer-events-none absolute top-0 hidden h-full w-px bg-white/10 dark:bg-black/10 lg:block left-[calc(75%+1rem)]' />

						{/* ✅ 右栏整体往右靠一点（不要挤在竖线边上） */}
						<div
							ref={refSkills}
							className='hidden lg:block pl-8'
							style={{ top: skillsTop, position: 'relative' }}
						>
							{/* ✅ Skills/Tools 间距更紧凑 */}
							<div className='w-[260px] space-y-6'>
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

						{/* 小屏不显示右侧栏：你原本就是 hidden lg:block */}
					</div>
				</div>
			</div>
		</div>
	);
}