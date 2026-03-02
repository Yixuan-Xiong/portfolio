// app/cv/page.tsx

import Image from 'next/image';
import Link from 'next/link';

const CV_PDF_PATH = '/cv/Yixuan_Xiong_CV.pdf';
const CV_PAGE_COUNT = 2;

const cvPages = Array.from({ length: CV_PAGE_COUNT }, (_, i) => {
	const pageNumber = i + 1;
	return {
		src: `/cv/pages/${pageNumber}.png`,
		alt: `CV page ${pageNumber}`,
	};
});

export default function CVPage() {
	return (
		<main className='w-full px-6 pt-8 md:px-12 md:pt-10 lg:px-16'>
			{/* ===== Top Bar ===== */}
			<div className='flex items-center justify-between'>
				<Link
					href='/'
					prefetch={false}
					className='text-[12px] uppercase tracking-[0.25em] font-medium opacity-70 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors'
				>
					← Home
				</Link>

				{/* ❌ 手机端不再在这里显示下载按钮 */}
				<div className='hidden md:block'>
					<a
						href={CV_PDF_PATH}
						target='_blank'
						rel='noopener noreferrer'
						className='text-[12px] uppercase tracking-[0.25em] border-b border-current pb-1 hover:opacity-60 transition-opacity'
					>
						Download CV →
					</a>
				</div>
			</div>

			{/* ===== Title + Mobile Download ===== */}
			<div className='mt-10 flex items-center justify-between'>
				<h1 className='text-[22px] md:text-[26px] uppercase tracking-[0.25em] font-medium opacity-80 text-black dark:text-white'>
					CV
				</h1>

				{/* ✅ 手机端下载按钮放标题右边 */}
				<a
					href={CV_PDF_PATH}
					target='_blank'
					rel='noopener noreferrer'
					className='md:hidden text-[13px] uppercase tracking-[0.2em] opacity-70 hover:opacity-50 transition-opacity'
				>
					Download →
				</a>
			</div>

			<div className='mt-8 md:mt-10 h-px w-full bg-black/10 dark:bg-white/10' />

			{/* ===== CV Images ===== */}
			<div className='mt-10 md:mt-14'>
				<div className='mx-auto w-full max-w-[860px] space-y-2 md:space-y-3'>
					{cvPages.map((page, index) => (
						<div
							key={page.src}
							className='relative w-full overflow-hidden'
							style={{ aspectRatio: '1 / 1.414' }}
						>
							<Image
								src={page.src}
								alt={page.alt}
								fill
								priority={index === 0}
								sizes='(min-width: 1024px) 860px, (min-width: 768px) 85vw, 94vw'
								className='object-contain'
							/>
						</div>
					))}
				</div>
			</div>
		</main>
	);
}
