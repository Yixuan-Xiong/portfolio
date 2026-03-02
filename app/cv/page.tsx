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

				{/* ✅ 更稳定版本：新标签页打开 PDF */}
				<a
					href={CV_PDF_PATH}
					target='_blank'
					rel='noopener noreferrer'
					className='text-[12px] uppercase tracking-[0.25em] border-b border-current pb-1 hover:opacity-60 transition-opacity'
					aria-label='Download CV as PDF'
				>
					Download CV →
				</a>
			</div>

			{/* ===== Title ===== */}
			<div className='mt-10'>
				<h1 className='text-[22px] md:text-[26px] uppercase tracking-[0.25em] font-medium opacity-80 text-black dark:text-white'>
					CV
				</h1>
				<div className='mt-8 md:mt-10 h-px w-full bg-black/10 dark:bg-white/10' />
			</div>

			{/* ===== CV Images ===== */}
			<div className='mt-10 md:mt-14'>
				<div className='mx-auto w-full max-w-[860px] space-y-2 md:space-y-3'>
					{cvPages.map((page, index) => (
						<div
							key={page.src}
							className='relative w-full overflow-hidden'
							style={{ aspectRatio: '1 / 1.414' }} // A4 比例
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
