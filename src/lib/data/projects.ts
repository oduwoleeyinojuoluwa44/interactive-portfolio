/**
 * Projects data layer.
 */

export type ProjectCategoryValue = 'web-app' | 'tool' | 'experiment';
export type FilterValue = 'all' | ProjectCategoryValue;

export type Project = {
	slug: string;
	title: string;
	tagline: string;
	description: string;
	year: number;
	category: ProjectCategoryValue;
	tech: string[];
	cover?: string;
	coverAlt?: string;
	links: {
		live?: string;
		github?: string;
	};
	featured?: boolean;
};

export const categories: { value: FilterValue; label: string }[] = [
	{ value: 'all', label: 'All' },
	{ value: 'web-app', label: 'Web apps' },
	{ value: 'tool', label: 'Tools' },
	{ value: 'experiment', label: 'Experiments' }
];

export const categoryLabel: Record<ProjectCategoryValue, string> = {
	'web-app': 'Web app',
	tool: 'Tool',
	experiment: 'Experiment'
};

export const projects: Project[] = [
	{
		slug: 'lawyers-for-visas',
		title: 'lawyersForvisas',
		tagline: 'UK Immigration Law Specialists providing end-to-end legal support.',
		description: 'A professional legal platform for an immigration law firm. It advises corporate organizations and private clients on complex UK visa applications, appeals, and administrative reviews. The site features structured service overviews, consultation booking, and a comprehensive FAQ section.',
		year: 2026,
		category: 'web-app',
		tech: ['React', 'Next.js', 'Tailwind CSS', 'Node.js'],
		links: { live: 'https://www.lawyersforvisas.com/' },
		featured: true
	},
	{
		slug: 'momento-living',
		title: 'Momento Living',
		tagline: 'Modern rental homes across Europe designed for living.',
		description: 'A sophisticated property management and rental platform operating across major European cities like London, Berlin, and Vienna. It offers a seamless interface for finding apartments, managing corporate stays, and accessing resident amenities such as gyms and social spaces.',
		year: 2026,
		category: 'web-app',
		tech: ['Next.js', 'React', 'Node.js', 'PostgreSQL'],
		links: { live: 'https://www.momentoliving.com/en' },
		featured: true
	},
	{
		slug: 'verta-property',
		title: 'Verta Property Group',
		tagline: 'Trusted UK Property Investment Company for Buy-To-Let opportunities.',
		description: 'An investment-focused platform that connects global investors with high-performing property opportunities in the UK and Dubai. It features a searchable property portfolio, investment guides, and a lead generation system.',
		year: 2026,
		category: 'web-app',
		tech: ['Next.js', 'Node.js', 'MySQL', 'Tailwind CSS'],
		links: { live: 'https://vertapropertygroup.co.uk/' }
	},
	{
		slug: 'deen-ai',
		title: 'Deen AI',
		tagline: 'AI-Powered Qur\'an Learning and spiritual companion for every Muslim.',
		description: 'A faith-centered AI application designed to deepen spiritual connection. It features an AI chat for Qur\'anic guidance, a private reflection space for journaling, prayer time tracking, and an authentic Hadith search tool.',
		year: 2026,
		category: 'tool',
		tech: ['Next.js', 'React', 'OpenAI API', 'Tailwind CSS', 'Python'],
		links: { live: 'https://deenai.app/' },
		featured: true
	},
	{
		slug: 'manifesti',
		title: 'Manifesti',
		tagline: 'AI-powered manifestation studio for visualizing your future.',
		description: 'A creative tool that uses AI to turn user intentions into hyper-realistic, cinematic visuals. It helps users visualize their goals through a "Vision Gallery," daily affirmations, and shareable social media exports.',
		year: 2025,
		category: 'tool',
		tech: ['Next.js', 'React', 'Stable Diffusion API', 'AWS S3', 'Node.js'],
		links: { live: 'https://manifesti.app/' }
	},
	{
		slug: 'xpress-drop',
		title: 'XpressDrop',
		tagline: 'The infrastructure powering laundry services in Nigeria.',
		description: 'A logistics and marketplace platform revolutionizing the laundry industry in Nigeria. It connects customers with verified vendors, providing real-time order tracking, transparent pricing, and vendor analytics.',
		year: 2026,
		category: 'web-app',
		tech: ['Next.js', 'React', 'Node.js', 'Google Maps API', 'MongoDB'],
		links: { live: 'https://www.usexpressdrop.com/' }
	}
];

export function projectBySlug(slug: string): Project | undefined {
	return projects.find((p) => p.slug === slug);
}

export function projectYearRange(): string {
	const years = projects.map((p) => p.year);
	const min = Math.min(...years);
	const max = Math.max(...years);
	return min === max ? `${min}` : `${min} – ${max}`;
}
