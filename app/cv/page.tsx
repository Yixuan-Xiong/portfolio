// app/cv/page.tsx
import Link from 'next/link';
import Image from 'next/image';

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
		<main className="w-full px-8 pt-8 md:px-12 md:pt-10 lg:px-16">
			{/* ===== Top Bar ===== */}
			<div className="flex items-center justify-between">
				<Link
					href="/"
					className="text-[12px] uppercase tracking-[0.25em] font-medium opacity-70 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
				>
					← Home
				</Link>

				<a
					href={CV_PDF_PATH}
					download="Yixuan_Xiong_CV.pdf"
					className="text-[12px] uppercase tracking-[0.25em] border-b border-current pb-1 hover:opacity-60 transition-opacity"
					aria-label="Download CV as PDF"
				>
					Download CV →
				</a>
			</div>

			{/* ===== Title ===== */}
			<div className="mt-10">
				<h1 className="text-[22px] md:text-[26px] uppercase tracking-[0.25em] font-medium opacity-80 text-black dark:text-white">
					CV
				</h1>
				<div className="mt-10 h-px w-full bg-black/10 dark:bg-white/10" />
			</div>

			{/* ===== CV Images (No gap, smaller width) ===== */}
			<div className="mt-14">
				<div className="mx-auto w-full max-w-[980px] space-y-3">
					{cvPages.map((page, index) => (
						<Image
							key={page.src}
							src={page.src}
							alt={page.alt}
							width={2400}
							height={3394}
							priority={index === 0}
							className="w-full h-auto block object-contain"
						/>
					))}
				</div>
			</div>
		</main>
	);
}