// app/projects/other/page.tsx
import { Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { works } from '../constants';

type LayoutSpec = {
	col: string;
	minHeight: string;
};

function layoutSpecByIndex(index: number): LayoutSpec {
	// 瑞士节奏 + 高度错开
	const mod = index % 7;

	if (mod === 0) return { col: 'lg:col-span-8', minHeight: 'min-h-[520px] md:min-h-[640px]' };
	if (mod === 1) return { col: 'lg:col-span-4', minHeight: 'min-h-[640px] md:min-h-[760px]' };
	if (mod >= 2 && mod <= 4)
		return { col: 'lg:col-span-4', minHeight: 'min-h-[360px] md:min-h-[420px]' };

	return { col: 'lg:col-span-6', minHeight: 'min-h-[440px] md:min-h-[520px]' };
}

export default function OtherDesignPage() {
	const otherWorks = works.filter((work) => work.category === 'other');

	return (
		<Fragment>
			<div className='w-full px-8 pt-8 md:px-12 md:pt-10 lg:px-16'>
				{/* 返回 */}
				<div className='flex items-center justify-between'>
					<Link
						href='/projects'
						className='text-xl text-gray-400 hover:text-black dark:hover:text-white transition-colors'
					>
						← Projects
					</Link>
					<div />
				</div>

				{/* 标题 */}
				<div className='mt-10 flex items-baseline gap-12'>
					<h1 className='text-[26px] uppercase tracking-[0.25em] font-medium opacity-80 text-black dark:text-white'>
						Other Design
					</h1>

					<p className='text-lg leading-7 text-gray-600 dark:text-gray-400'>
						3D modelling &amp; rendering, graphic design, AI design.
					</p>
				</div>

				{/* 分割线 */}
				<div className='mt-10 h-px w-full bg-black/10 dark:bg-white/10' />

				{/* Swiss Editorial Grid */}
				<div className='mt-20 grid grid-cols-1 gap-x-16 gap-y-28 lg:grid-cols-12'>
					{otherWorks.map((work, index) => {
						const spec = layoutSpecByIndex(index);
						const thumbSrc = work.cover;

						return (
							<div key={work.id} className={spec.col}>
								{/* 图片容器：无背景，无边框，仅空间留白 */}
								<div
									className={`relative w-full overflow-hidden ${spec.minHeight}`}
								>
									<Image
										src={thumbSrc}
										alt={work.title}
										fill
										sizes='(min-width: 1024px) 90vw, 100vw'
										className='object-contain'
										priority={index === 0}
									/>
								</div>

								
							</div>
						);
					})}
				</div>

				{otherWorks.length === 0 && (
					<div className='mt-20 text-gray-500 dark:text-gray-400'>
						No images in this category yet.
					</div>
				)}
			</div>
		</Fragment>
	);
}