// app/projects/layout.tsx
import type React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
	return <div className='w-full'>{children}</div>;
}