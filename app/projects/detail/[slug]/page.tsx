// app/projects/detail/[slug]/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { works } from '../../constants';

export default async function WorkDetailPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	const work = works.find((w) => w.id === slug);
	if (!work) notFound();

	if (!work.detailImages || work.detailImages.length === 0) {
		notFound();
	}

	// ✅ 只用 year + tags 生成标题下方信息
	const introText =
		[
			work.year ? String(work.year) : null,
			Array.isArray(work.tags) && work.tags.length > 0
				? work.tags.join(' · ')
				: null,
		]
			.filter(Boolean)
			.join(' · ') || '';

	return (
		<div className='w-full px-8 pt-8 md:px-12 md:pt-10 lg:px-16'>
			{/* 顶部栏：Back */}
			<div className='flex items-center justify-between'>
				<Link
					href={`/projects/${work.category}`}
					className='text-xl text-gray-400 hover:text-black dark:hover:text-white transition-colors'
				>
					← Back
				</Link>
				<div />
			</div>

			{/* 标题区 */}
			<div className='mt-10'>
				<h1 className='text-3xl md:text-4xl font-medium tracking-tight text-black dark:text-white'>
					{work.title}
				</h1>

				{introText && (
					<p className='mt-4 max-w-3xl text-lg leading-7 text-gray-600 dark:text-gray-400'>
						{introText}
					</p>
				)}
			</div>

			{/* 图片展示区 */}
			<div className='mt-14 w-full'>
				<div className='mx-auto w-full max-w-7xl'>
					{work.detailImages.map((src, index) => (
						<Image
							key={`${work.id}-${index}`}
							src={src}
							alt={`${work.title}-${index + 1}`}
							width={2600}
							height={5200}
							sizes='100vw'
							className='w-full h-auto block'
							priority={index === 0}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export function generateStaticParams() {
	return works.map((w) => ({
		slug: w.id,
	}));
}