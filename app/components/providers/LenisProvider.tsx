'use client';

import { ReactLenis, useLenis } from 'lenis/dist/lenis-react';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

function LenisResizeOnRouteChange() {
	const pathname = usePathname();
	const lenis = useLenis();

	useEffect(() => {
		if (!lenis) return;

		// 等 DOM 稳定一帧再 resize
		const id = requestAnimationFrame(() => {
			lenis.resize();
		});

		return () => cancelAnimationFrame(id);
	}, [pathname, lenis]);

	return null;
}

export default function LenisProvider({ children }: Props) {
	return (
		<ReactLenis root>
			<LenisResizeOnRouteChange />
			{children}
		</ReactLenis>
	);
}