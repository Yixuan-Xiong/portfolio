import { redirect } from 'next/navigation';

export default function WorkRedirect({ params }: { params: { category: string } }) {
	redirect(`/projects?category=${params.category}`);
}