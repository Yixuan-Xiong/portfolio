// app/components/work/work-content.tsx

import Link from 'next/link';
import Image from 'next/image';
import type { WorkTile } from './workTiles';

export default function WorkContent({ work }: { work: WorkTile }) {
	return (
		<Link
			href={work.href}
			className='group block h-full w-full'
			aria-label={`View ${work.title}`}
		>
			<div className='flex h-full w-full flex-col justify-between'>
				{/* 文本 */}
				<div className='space-y-3'>
					<p className='text-sm uppercase tracking-[0.28em] opacity-60'>
						{work.description}
					</p>
					<h3 className='text-4xl font-medium tracking-tight md:text-6xl'>
						{work.title}
					</h3>
					<div className='pt-4 text-lg opacity-60 transition-opacity group-hover:opacity-100'>
						View work →
					</div>
				</div>

				{/* 封面 */}
				<div className='relative mt-10 w-full overflow-hidden'>
					<Image
						src={work.image.src}
						alt={work.title}
						width={work.image.width}
						height={work.image.height}
						className='h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]'
						priority={false}
					/>
				</div>
			</div>
		</Link>
	);
}