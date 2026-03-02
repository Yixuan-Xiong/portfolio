import Link from 'next/link';
import ProjectsList from './projects';

export default function Page() {
	return (
		<div className='w-full px-8 pt-8 md:px-12 md:pt-10 lg:px-16'>
			<div className='flex items-center justify-between'>
				<Link
					href='/'
					className='text-[12px] uppercase tracking-[0.25em] font-medium opacity-70 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors'
				>
					← Home
				</Link>
				<div />
			</div>

			<div className='mt-10 flex items-baseline gap-10'>
				<h1 className='text-[22px] md:text-[26px] uppercase tracking-[0.25em] font-medium opacity-80 text-black dark:text-white'>
					Projects
				</h1>

				<p className='text-[14px] leading-[1.7] text-gray-600 dark:text-gray-400'>
					Explore my work by service category.
				</p>
			</div>

			<ProjectsList />
		</div>
	);
}