import Image from 'next/image';
import Link from 'next/link';
import { workTiles } from './workTiles';

const recentWorkImages = [
	{ src: '/static/images/recent/recent-01.jpg', alt: 'Recent work 01' },
	{ src: '/static/images/recent/recent-02.jpg', alt: 'Recent work 02' },
	{ src: '/static/images/recent/recent-03.jpg', alt: 'Recent work 03' },
	{ src: '/static/images/recent/recent-04.jpg', alt: 'Recent work 04' },
	{ src: '/static/images/recent/recent-05.jpg', alt: 'Recent work 05' },
	{ src: '/static/images/recent/recent-06.jpg', alt: 'Recent work 06' },
];

export default function Works() {
	return (
		<section className='mt-16 md:mt-20'>
			<div className='mx-auto w-full max-w-[1680px] px-6 md:px-12 lg:px-16'>
				<div className='mb-14'>
					<h2 className='text-[18px] uppercase tracking-[0.32em] font-medium opacity-75'>
						Recent Works
					</h2>
				</div>

				<div className='grid grid-cols-1 gap-x-16 gap-y-24 md:grid-cols-2 lg:gap-x-20 lg:gap-y-24'>
					{workTiles.map((work) => (
						<Link key={work.title} href={work.href} className='group block'>
							<div className='relative aspect-[16/9] w-full overflow-hidden bg-black/20 dark:bg-white/10'>
								<Image
									src={work.image.src}
									alt={work.title}
									fill
									className='object-contain transition-opacity duration-300 group-hover:opacity-90'
								/>
							</div>

							<div className='mt-7 flex items-start justify-between'>
								<h3 className='text-[clamp(1.15rem,1.4vw,1.55rem)] font-medium tracking-tight'>
									{work.title}
								</h3>

								<span className='text-[13px] uppercase tracking-[0.2em] text-gray-400 opacity-0 transition-all duration-300 group-hover:opacity-100'>
									View →
								</span>
							</div>

							<p className='mt-3 text-[13px] leading-[1.7] text-gray-500 dark:text-gray-400 opacity-80'>
								{work.description}
							</p>

							<div className='mt-9 h-px w-full bg-black/10 dark:bg-white/10' />
						</Link>
					))}
				</div>
			</div>

			{/* marquee: mobile smaller + add more bottom space */}
			<div className='mt-20 md:mt-24 w-screen overflow-hidden pb-10 md:pb-16'>
				<div className='marquee'>
					<div className='marquee__track'>
						{[...recentWorkImages, ...recentWorkImages].map((item, index) => (
							<div
								key={`${item.src}-${index}`}
								className='relative flex-none overflow-hidden bg-black/20 dark:bg-white/10
									h-[140px] w-[250px]
									sm:h-[160px] sm:w-[285px]
									md:h-[190px] md:w-[338px]'
							>
								<Image src={item.src} alt={item.alt} fill className='object-contain' />
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}