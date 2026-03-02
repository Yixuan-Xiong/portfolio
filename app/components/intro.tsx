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

	// ✅ Sidebar 标题：整体更小（像注释），但保持 uppercase + tracking
	const sidebarTitleClass = useMemo(
		() =>
			'text-[12px] uppercase tracking-[0.38em] font-medium opacity-60',
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
			{/* ===== 左侧 About Me ===== */}
			<div className='absolute left-10 top-28 z-20'>
				<h2 className='text-[18px] uppercase tracking-[0.32em] font-medium opacity-75'>
					About Me
				</h2>
			</div>

			{/* ===== 竖线 ===== */}
			<div className='pointer-events-none absolute top-0 z-10 hidden lg:block h-full w-px bg-white/10 dark:bg-black/10 right-[calc(2.5rem+260px+2.5rem)]' />

			{/* ===== 右侧 Skills / Tools ===== */}
			<div
				ref={refSkills}
				className='pointer-events-none absolute right-10 z-20 hidden lg:block'
				style={{ top: skillsTop }}
			>
				<div className='w-[260px] space-y-10'>
					<div className='space-y-4'>
						<div className={sidebarTitleClass}>Skills</div>

						{/* ✅ 内容：更小、更轻（像脚注） */}
						<div className='space-y-2 text-[12px] leading-[1.45] opacity-70'>
							<div>Brand Strategy &amp; Positioning</div>
							<div>Visual Identity System Design</div>
							<div>Graphic Design</div>
							<div>Print &amp; Publication Design</div>
							<div>Digital Design &amp; E-commerce Design</div>
							<div>3D Modelling &amp; Rendering</div>
							<div>AI Image Generation</div>
						</div>
					</div>

					<div className='space-y-4'>
						<div className={sidebarTitleClass}>Tools</div>

						<div className='flex flex-wrap gap-x-4 gap-y-2 text-[12px] leading-[1.65] opacity-65'>
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

			{/* ===== 中间正文 ===== */}
			<div className='mx-auto flex max-w-[1050px] flex-col justify-start px-10 pt-28 pb-24 font-medium leading-[1.75] text-[clamp(1.05rem,1.05vw,1.45rem)]'>
				{/* ✅ 控制段落宽度：2–3 行节奏 */}
				<div className='max-w-[40rem] space-y-16'>
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

					<div ref={refLastBlock} style={{ opacity: opacityForBlock(progress, 3) }}>
						In 2025, I was commissioned by a curator at the Kyoto Art Museum
						to design exhibition catalogues, posters and promotional materials,
						expanding my practice into editorial and cultural design.
					</div>
				</div>
			</div>
		</div>
	);
}