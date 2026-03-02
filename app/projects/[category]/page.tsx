// app/projects/[category]/page.tsx

import { Fragment } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProjectsList from '../projects';
import type { ServiceCategory } from '../constants';

function isValidCategory(value: string): value is ServiceCategory {
	return value === 'brand' || value === 'web' || value === 'brochure' || value === 'other';
}

const categoryTitle: Record<ServiceCategory, string> = {
	brand: 'Brand Design',
	web: 'E-commerce / Web Design',
	brochure: 'Brochure Design',
	other: 'Other Design',
};

const categoryDescription: Record<ServiceCategory, string> = {
	brand: 'Brand strategy, positioning and identity systems',
	web: 'E-commerce visuals, web design and UI systems',
	brochure: 'Catalogues, publications and editorial layouts',
	other: '3D modelling and rendering, graphic design, AI design',
};

export default async function CategoryPage({
	params,
}: {
	params: Promise<{ category: string }>;
}) {
	const resolvedParams = await params;

	const raw = resolvedParams.category ?? '';
	const category = decodeURIComponent(raw).replace(/\/+$/, '').toLowerCase();

	if (!isValidCategory(category)) {
		notFound();
	}

	return (
		<Fragment>
			<div className='w-full px-8 pt-8 md:px-12 md:pt-10 lg:px-16'>
				{/* 顶部栏 */}
				<div className='flex items-center justify-between'>
					<Link
						href='/'
						className='text-xl text-gray-400 hover:text-white transition-colors'
					>
						← Home
					</Link>
					<div />
				</div>

				{/* 标题行：分类全称 + 描述（同一行） */}
				<div className='mt-10 flex items-baseline gap-12'>
					<h1 className='text-[26px] uppercase tracking-[0.25em] font-medium opacity-80'>
						{categoryTitle[category]}
					</h1>

					<p className='text-lg leading-7 text-gray-500 dark:text-gray-400'>
						{categoryDescription[category]}
					</p>
				</div>

				<ProjectsList activeCategory={category} />
			</div>
		</Fragment>
	);
}