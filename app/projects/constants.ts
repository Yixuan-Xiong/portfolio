// app/projects/constants.ts

export type ServiceCategory = 'brand' | 'web' | 'brochure' | 'other';

export type Service = {
	title: string;
	slug: ServiceCategory;
	cover: string;
	description: string;
};

export type Work = {
	id: string;
	title: string;
	year?: string;
	category: ServiceCategory;
	cover: string;
	detailImages: string[];
	href: string;
	tags?: string[];
};

export const services: Service[] = [
	{
		title: 'Brand Design',
		slug: 'brand',
		cover: '/static/images/work-brand.jpg',
		description: 'Brand strategy, positioning and identity systems',
	},
	{
		title: 'E-commerce / Web Design',
		slug: 'web',
		cover: '/static/images/work-web.jpg',
		description: 'E-commerce visuals, web design and UI systems',
	},
	{
		title: 'Brochure Design',
		slug: 'brochure',
		cover: '/static/images/work-brochure.jpg',
		description: 'Catalogues, publications and editorial layouts',
	},
	{
		title: 'Other Design',
		slug: 'other',
		cover: '/static/images/work-other.jpg',
		description: '3D modelling and rendering, graphic design, AI design',
	},
];

export const works: Work[] = [
	// =========================
	// BRAND
	// =========================
	{
		id: 'brand-a',
		title: '山岛 SHAND Perfume',
		year: '2026',
		category: 'brand',
		cover: '/static/images/works/5.jpg',
		detailImages: ['/static/images/details/山岛.jpg'],
		href: '/projects/detail/brand-a',
		tags: ['Brand', 'Logo', 'Typography', 'Packaging', '3D', 'Poster'],
	},
	{
		id: 'brand-b',
		title: 'Share Coffee',
		year: '2023',
		category: 'brand',
		cover: '/static/images/works/6.jpg',
		detailImages: ['/static/images/details/share.jpg'],
		href: '/projects/detail/brand-b',
		tags: ['Brand', 'Logo', 'Packaging'],
	},
	{
		id: 'brand-c',
		title: 'STILLUME Tumbler',
		year: '2025',
		category: 'brand',
		cover: '/static/images/works/7.jpg',
		detailImages: ['/static/images/details/stillume.jpg'],
		href: '/projects/detail/brand-c',
		tags: ['Brand', 'Logo', 'Packaging', '3D', 'Poster'],
	},
	{
		id: 'brand-d',
		title: 'Pickleball Sports',
		year: '2026',
		category: 'brand',
		cover: '/static/images/works/8.jpg',
		detailImages: ['/static/images/details/picpals.jpg'],
		href: '/projects/detail/brand-d',
		tags: ['Brand', 'Logo', 'Packaging', '3D', 'Poster', 'Brochure'],
	},

	// =========================
	// WEB
	// =========================
	{
		id: 'web-a',
		title: 'Amazon — Coffee Table',
		year: '2024',
		category: 'web',
		cover: '/static/images/works/1.jpg',
		detailImages: ['/static/images/details/1.jpg'],
		href: '/projects/detail/web-a',
		tags: ['E-commerce', '3D', 'AI'],
	},
	{
		id: 'web-b',
		title: 'Amazon — Bedside Table',
		year: '2025',
		category: 'web',
		cover: '/static/images/works/2.jpg',
		detailImages: ['/static/images/details/2.jpg'],
		href: '/projects/detail/web-b',
		tags: ['E-commerce', '3D', 'AI'],
	},
	{
		id: 'web-c',
		title: 'Amazon — HEADSET Earbud',
		year: '2024',
		category: 'web',
		cover: '/static/images/works/3.jpg',
		detailImages: ['/static/images/details/3.jpg'],
		href: '/projects/detail/web-c',
		tags: ['E-commerce', '3D'],
	},
	{
		id: 'web-d',
		title: 'Amazon — Coffee Machine',
		year: '2025',
		category: 'web',
		cover: '/static/images/works/4.jpg',
		detailImages: ['/static/images/details/4.jpg'],
		href: '/projects/detail/web-d',
		tags: ['E-commerce', '3D', 'AI', 'Photography'],
	},
	{
		id: 'web-e',
		title: 'Northgrain Furniture Website',
		year: '2024',
		category: 'web',
		cover: '/static/images/works/9.jpg',
		detailImages: [
			'/static/images/details/Northgrain1.jpg',
			'/static/images/details/Northgrain2.jpg',
			'/static/images/details/Northgrain3.jpg',
			'/static/images/details/Northgrain4.jpg',
			'/static/images/details/Northgrain5.jpg',
		],
		href: '/projects/detail/web-e',
		tags: ['E-commerce', 'Web design', 'UI Design'],
	},

	// =========================
	// BROCHURE
	// =========================
	{
		id: 'brochure-a',
		title: 'Kyoto Art Museum Catalogue',
		year: '2025',
		category: 'brochure',
		cover: '/static/images/works/10.jpg',
		detailImages: ['/static/images/details/云鹤游天图录排版.jpg'],
		href: '/projects/detail/brochure-a',
		tags: ['Exhibition', 'Editorial Layout'],
	},
];

// =========================
// OTHER — Swiss Gallery (1–16)
// =========================

const otherWorks: Work[] = Array.from({ length: 16 }, (_, i) => {
	const index = i + 1;
	return {
		id: `other-${index}`,
		title: `Other ${index.toString().padStart(2, '0')}`,
		year: '2025',
		category: 'other',
		cover: `/static/images/others/${index}.jpg`,
		detailImages: [`/static/images/others/${index}.jpg`],
		href: '#',
	};
});

works.push(...otherWorks);