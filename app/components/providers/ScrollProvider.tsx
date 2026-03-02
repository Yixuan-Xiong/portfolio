'use client';

import { createContext, type ReactNode, useEffect, useRef, useState } from 'react';

interface ScrollValue {
	scrollY: number;
}

export const ScrollContext = createContext<ScrollValue>({
	scrollY: 0,
});

interface ScrollProviderProps {
	children: ReactNode;
}

export const ScrollProvider = ({ children }: ScrollProviderProps) => {
	const [scrollY, setScrollY] = useState(0);
	const rafRef = useRef<number | null>(null);

	useEffect(() => {
		const update = () => {
			// ✅ 永远用真实 window.scrollY
			setScrollY(window.scrollY || 0);
		};

		const onScroll = () => {
			// ✅ RAF 节流，避免每次 scroll 都 setState
			if (rafRef.current) return;
			rafRef.current = window.requestAnimationFrame(() => {
				rafRef.current = null;
				update();
			});
		};

		// 初始同步一次（避免返回首页时卡住）
		update();

		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll);

		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
			if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
		};
	}, []);

	return (
		<ScrollContext.Provider value={{ scrollY }}>
			{children}
		</ScrollContext.Provider>
	);
};