// app/work/works-data.ts

export type WorkCategory = 'brand' | 'web' | 'editorial' | 'other';

export const categoryMeta: Record<
	WorkCategory,
	{ title: string; description: string }
> = {
	brand: {
		title: 'Brand Design',
		description: 'Brand strategy, positioning and visual identity systems.',
	},
	web: {
		title: 'E-commerce / Web Design',
		description: 'Web, e-commerce and UI visuals focused on clarity and conversion.',
	},
	editorial: {
		title: 'Editorial Design',
		description: 'Catalogues, publication design and typographic layout.',
	},
	other: {
		title: 'Other Design',
		description: '3D visualisation, experiments and other design work.',
	},
};

export type WorkItem = {
	title: string;
	year?: string;
	category: WorkCategory;
	cover: string; // 用于分类页展示
	href: string;  // 可以先放外链，或者未来做作品详情页
	tags?: string[];
};

export const works: WorkItem[] = [
	{
		title: 'Brand Identity — Project A',
		year: '2025',
		category: 'brand',
		cover: '/static/images/works/brand-a.webp',
		href: '#',
		tags: ['Identity', 'Typography'],
	},
	{
		title: 'E-commerce Visual System — Project B',
		year: '2024',
		category: 'web',
		cover: '/static/images/works/web-b.webp',
		href: '#',
		tags: ['E-commerce', 'UI'],
	},
	{
		title: 'Exhibition Catalogue — Project C',
		year: '2025',
		category: 'editorial',
		cover: '/static/images/works/editorial-c.webp',
		href: '#',
		tags: ['Catalogue', 'Layout'],
	},
	{
		title: '3D Visualisation — Project D',
		year: '2024',
		category: 'other',
		cover: '/static/images/works/other-d.webp',
		href: '#',
		tags: ['3D', 'Visual'],
	},
];

export function worksByCategory(category: WorkCategory) {
	return works.filter((w) => w.category === category);
}