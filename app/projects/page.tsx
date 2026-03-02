// app/projects/page.tsx
import Link from 'next/link';
import ProjectsList from './projects';

export default function Page() {
	return (
		<div className='w-full px-8 pt-8 md:px-12 md:pt-10 lg:px-16'>
			<div className='flex items-center justify-between'>
				<Link
					href='/'
					className='text-xl text-gray-400 hover:text-white transition-colors'
				>
					← Home
				</Link>
				<div />
			</div>

			<div className='mt-10 flex items-baseline gap-10'>
				<h1 className='text-[26px] uppercase tracking-[0.25em] font-medium opacity-80'>
					Projects
				</h1>

				<p className='text-lg leading-7 text-gray-500 dark:text-gray-400'>
					Explore my work by service category.
				</p>
			</div>

			{/* ✅ All 页：不传分类 */}
			<ProjectsList />
		</div>
	);
}