import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { type ServiceCategory, works } from '../../constants';

// =========================
// ✅ 扩展类型（支持 product）
// =========================
type DetailCategory = ServiceCategory | 'product';

type BaseWork = (typeof works)[number];

type DetailWork = Omit<BaseWork, 'category'> & {
	category: DetailCategory;
};

// =========================
// ✅ Product Works
// =========================
const productWorks: DetailWork[] = [
	{
		id: 'product-a',
		title: 'Immersive Installation Design',
		year: '2025',
		category: 'product',
		cover: '/static/images/works/product-1.jpg',
		detailImages: ['/static/images/details/product-1.jpg'],
		href: '/projects/detail/product-a',
		tags: ['Installation Design', 'Spatial Design', '3D Modelling'],
	},
	{
		id: 'product-b',
		title: 'Food Trailer Design',
		year: '2025',
		category: 'product',
		cover: '/static/images/works/product-2.jpg',
		detailImages: ['/static/images/details/product-2.jpg'],
		href: '/projects/detail/product-b',
		tags: ['Interior Design', 'Mobile Space', '3D Visualisation'],
	},
	{
		id: 'product-c',
		title: 'Green City Design',
		year: '2026',
		category: 'product',
		cover: '/static/images/works/product-3.jpg',
		detailImages: ['/static/images/details/product-3.jpg'],
		href: '/projects/detail/product-c',
		tags: ['Urban Concept', 'Furniture System', 'Spatial Design'],
	},
];

// =========================
// ✅ 合并所有项目
// =========================
const allWorks: DetailWork[] = [...works, ...productWorks];

export default async function WorkDetailPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	// ✅ 用 allWorks（关键）
	const work = allWorks.find((w) => w.id === slug);
	if (!work) notFound();

	if (!work.detailImages || work.detailImages.length === 0) notFound();

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
			<div className='flex items-center justify-between'>
				<Link
					href={`/projects/${work.category}`}
					className='text-[12px] uppercase tracking-[0.25em] font-medium opacity-70 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors'
				>
					← Back
				</Link>
				<div />
			</div>

			<div className='mt-10'>
				<h1 className='text-[22px] md:text-[28px] font-medium tracking-tight text-black dark:text-white'>
					{work.title}
				</h1>

				{introText && (
					<p className='mt-4 max-w-3xl text-[14px] leading-[1.7] text-gray-600 dark:text-gray-400'>
						{introText}
					</p>
				)}
			</div>

			<div className='mt-14 w-full'>
				<div className='mx-auto w-full max-w-[1100px]'>
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

// =========================
// ✅ 静态生成（必须改）
// =========================
export function generateStaticParams() {
	return allWorks.map((w) => ({ slug: w.id }));
}
