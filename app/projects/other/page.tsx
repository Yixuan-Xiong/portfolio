import Image from 'next/image';
import Link from 'next/link';
import { works } from '../constants';

type LayoutSpec = {
	col: string;
	minHeight: string;
};

function layoutSpecByIndex(index: number): LayoutSpec {
	const mod = index % 7;

	if (mod === 0)
		return {
			col: 'lg:col-span-8',
			minHeight: 'min-h-[420px] md:min-h-[520px]',
		};
	if (mod === 1)
		return {
			col: 'lg:col-span-4',
			minHeight: 'min-h-[520px] md:min-h-[620px]',
		};
	if (mod >= 2 && mod <= 4)
		return {
			col: 'lg:col-span-4',
			minHeight: 'min-h-[300px] md:min-h-[380px]',
		};

	return { col: 'lg:col-span-6', minHeight: 'min-h-[360px] md:min-h-[460px]' };
}

export default function OtherDesignPage() {
	const otherWorks = works.filter((work) => work.category === 'other');

	return (
		<div className='w-full px-6 pt-8 md:px-12 md:pt-10 lg:px-16'>
			<div className='flex items-center justify-between'>
				<Link
					href='/projects'
					className='text-[12px] uppercase tracking-[0.25em] font-medium opacity-70 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors'
				>
					← Projects
				</Link>
				<div />
			</div>

			<div className='mt-10 flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12'>
				<h1 className='text-[22px] md:text-[26px] uppercase tracking-[0.25em] font-medium opacity-80 text-black dark:text-white'>
					Other Design
				</h1>

				<p className='text-[14px] leading-[1.7] text-gray-600 dark:text-gray-400'>
					3D modelling &amp; rendering, graphic design, AI design.
				</p>
			</div>

			<div className='mt-8 md:mt-10 h-px w-full bg-black/10 dark:bg-white/10' />

			{/* ✅ gap 缩小：手机更紧凑 */}
			<div className='mt-14 md:mt-20 grid grid-cols-1 gap-x-10 gap-y-14 md:gap-x-16 md:gap-y-24 lg:grid-cols-12'>
				{otherWorks.map((work, index) => {
					const spec = layoutSpecByIndex(index);
					return (
						<div key={work.id} className={spec.col}>
							<div
								className={`relative w-full overflow-hidden ${spec.minHeight}`}
							>
								<Image
									src={work.cover}
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
				<div className='mt-16 text-[14px] text-gray-500 dark:text-gray-400'>
					No images in this category yet.
				</div>
			)}
		</div>
	);
}
