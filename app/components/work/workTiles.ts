
export type WorkTile = {
	title: string;
	description: string;
	href: string;
	image: {
		src: string;
		width: number;
		height: number;
	};
};

export const workTiles: WorkTile[] = [
	{
		description: 'Brand strategy, positioning and identity systems',
		title: 'Brand Design',
		href: '/projects/brand',   // ✅ 改这里
		image: {
			src: '/static/images/work-brand.jpg',
			width: 600,
			height: 770,
		},
	},
	{
		description: 'E-commerce visuals, web design and UI systems',
		title: 'E-commerce / Web Design',
		href: '/projects/web',     // ✅ 改这里
		image: {
			src: '/static/images/work-web.jpg',
			width: 600,
			height: 554,
		},
	},
	{
		description: 'Catalogues, publications and editorial layouts',
		title: 'Brochure Design',
		href: '/projects/brochure', // ✅ 改这里
		image: {
			src: '/static/images/work-brochure.jpg',
			width: 600,
			height: 717,
		},
	},
	{
		description: '3D modelling and rendering, graphic design, AI design',
		title: 'Other Design',
		href: '/projects/other',   // ✅ 改这里
		image: {
			src: '/static/images/work-other.jpg',
			width: 600,
			height: 717,
		},
	},
];