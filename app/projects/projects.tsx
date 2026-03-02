'use client';

import Image from 'next/image';
import Link from 'next/link';
import { works, type ServiceCategory } from './constants';

type CategoryFilter = 'all' | ServiceCategory;

export default function ProjectsList({
	activeCategory,
}: {
	activeCategory?: CategoryFilter;
}) {
	const selected: CategoryFilter = activeCategory ?? 'all';

	// ✅ All 页不展示 other（你原本就是这样）
	const visibleWorks = works.filter((work) => work.category !== 'other');

	const filteredWorks =
		selected === 'all'
			? visibleWorks
			: visibleWorks.filter((work) => work.category === selected);

	// ✅ 修复：All 不统计 other
	const counts = {
		all: visibleWorks.length,
		brand: works.filter((w) => w.category === 'brand').length,
		web: works.filter((w) => w.category === 'web').length,
		brochure: works.filter((w) => w.category === 'brochure').length,
		other: works.filter((w) => w.category === 'other').length,
	};

	const tabs: Array<{
		label: string;
		value: CategoryFilter;
		href: string;
	}> = [
		{ label: `All (${counts.all})`, value: 'all', href: '/projects' },
		{ label: `Brand design (${counts.brand})`, value: 'brand', href: '/projects/brand' },
		{ label: `E-commerce / web design (${counts.web})`, value: 'web', href: '/projects/web' },
		{ label: `Brochure design (${counts.brochure})`, value: 'brochure', href: '/projects/brochure' },
		{ label: `Other design (${counts.other})`, value: 'other', href: '/projects/other' },
	];

	return (
		<section className='mt-12'>
			{/* ================= Tabs ================= */}
			<div className='flex flex-wrap gap-3 border-b border-black/10 pb-8 dark:border-white/10'>
				{tabs.map((tab) => {
					const isActive = tab.value === selected;

					return (
						<Link
							key={tab.value}
							href={tab.href}
							className={[
								'rounded-full border px-4 py-2 text-sm transition-all',
								isActive
									? 'border-black text-black dark:border-white dark:text-white'
									: 'border-black/20 text-gray-600 hover:text-black dark:border-white/20 dark:text-gray-400 dark:hover:text-white',
							].join(' ')}
						>
							{tab.label}
						</Link>
					);
				})}
			</div>

			{/* ================= Works Grid ================= */}
			<div className='mt-16 grid grid-cols-1 gap-x-16 gap-y-24 md:grid-cols-2'>
				{filteredWorks.map((work) => {
					const slugOrId = (work as unknown as { slug?: string }).slug ?? String(work.id);
					const detailHref = `/projects/detail/${slugOrId}`;

					return (
						<Link key={work.id} href={detailHref} className='group block'>
							<div className='relative w-full aspect-[16/9] overflow-hidden'>
								<Image
									src={work.cover}
									alt={work.title}
									fill
									sizes='(min-width: 768px) 50vw, 100vw'
									className='object-contain transition-opacity duration-300 group-hover:opacity-90'
								/>
							</div>

							<div className='mt-8 flex items-start justify-between'>
								<h3 className='text-2xl md:text-3xl font-medium tracking-tight text-black dark:text-white'>
									{work.title}
								</h3>

								<span className='text-lg text-gray-500 opacity-0 transition-all duration-300 group-hover:opacity-100 dark:text-gray-400'>
									View →
								</span>
							</div>

							<div className='mt-3 flex flex-wrap gap-x-3 gap-y-2 text-sm text-gray-600 dark:text-gray-400'>
								{work.year && <span>{work.year}</span>}
								{work.tags?.map((tag: string) => (
									<span key={tag}>{tag}</span>
								))}
							</div>

							<div className='mt-10 h-px w-full bg-black/10 dark:bg-white/10' />
						</Link>
					);
				})}
			</div>
		</section>
	);
}