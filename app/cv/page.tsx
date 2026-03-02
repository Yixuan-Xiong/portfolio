// app/cv/page.tsx
import Link from 'next/link';
import Image from 'next/image';

const CV_PDF_PATH = '/cv/Yixuan_Xiong_CV.pdf';

// ✅ 改这里：你的 CV 有几页就写几
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
			{/* 顶部栏：Back + Download */}
			<div className="flex items-center justify-between">
				<Link
					href="/"
					className="text-xl text-gray-400 hover:text-black dark:hover:text-white transition-colors"
				>
					← Home
				</Link>

				<a
					href={CV_PDF_PATH}
					download="Yixuan_Xiong_CV.pdf"
					className="text-sm uppercase tracking-[0.22em] border-b border-current pb-1 hover:opacity-60 transition-opacity"
					aria-label="Download CV as PDF"
				>
					Download CV →
				</a>
			</div>

			{/* 标题 */}
			<div className="mt-10">
				<h1 className="text-[26px] uppercase tracking-[0.25em] font-medium opacity-80 text-black dark:text-white">
					CV
				</h1>
				<div className="mt-10 h-px w-full bg-black/10 dark:bg-white/10" />
			</div>

			{/* ✅ CV 图片展示（像画册一样） */}
			<div className="mt-14">
				<div className="mx-auto w-full max-w-5xl space-y-14">
					{cvPages.map((page, index) => (
						<div key={page.src} className="w-full">
							<Image
								src={page.src}
								alt={page.alt}
								width={2400}
								height={3394}
								priority={index === 0}
								className="w-full h-auto block object-contain"
							/>
						</div>
					))}
				</div>
			</div>
		</main>
	);
}