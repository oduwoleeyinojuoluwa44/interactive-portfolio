export type SocialLink = {
	label: string;
	href: string;
};

export type Project = {
	slug: string;
	title: string;
	category: 'Frontend Systems' | 'Data Viz' | 'Full Stack' | 'Design Engineering';
	description: string;
	longDescription: string;
	impact: string;
	technologies: string[];
	metrics: string[];
	year: string;
	image: string;
	demoUrl: string;
	repoUrl: string;
	accent: string;
};

export const socialLinks: SocialLink[] = [
	{ label: 'GitHub', href: 'https://github.com/' },
	{ label: 'LinkedIn', href: 'https://www.linkedin.com/' },
	{ label: 'Email', href: 'mailto:hello@yourdomain.dev' },
	{ label: 'Schedule', href: 'https://cal.com/' }
];

export const stats = [
	{ value: '5+', label: 'years crafting interfaces' },
	{ value: '92+', label: 'Lighthouse scores targeted' },
	{ value: '18ms', label: 'average interaction budget' }
];

export const timeline = [
	{
		period: 'Now',
		title: 'Independent Frontend Engineer',
		description:
			'Designing polished product surfaces with a focus on motion systems, Svelte architecture, and usable complexity.'
	},
	{
		period: '2025',
		title: 'Realtime Experience Builder',
		description:
			'Built dashboards and live collaboration views that balance data density, clarity, and low-latency rendering.'
	},
	{
		period: '2024',
		title: 'Full-Stack Product Partner',
		description:
			'Shipped features across frontend and backend systems, turning undefined ideas into maintainable production flows.'
	}
];

export const capabilities = [
	{
		title: 'Interaction Systems',
		description:
			'State choreography, motion language, keyboard flows, and UI behavior that feels intentionally engineered.'
	},
	{
		title: 'Performance Thinking',
		description:
			'Asset restraint, lazy boundaries, visual stability, and animation choices that protect responsiveness.'
	},
	{
		title: 'Frontend Architecture',
		description:
			'Reusable Svelte components, route-aware data modeling, progressive enhancement, and long-term maintainability.'
	}
];

export const skills = [
	{ group: 'Core', items: ['SvelteKit', 'TypeScript', 'Accessibility', 'Progressive Enhancement'] },
	{
		group: 'Motion',
		items: ['Native Svelte transitions', 'FLIP layout animation', 'Scroll choreography']
	},
	{
		group: 'Systems',
		items: ['Design tokens', 'Component APIs', 'State modeling', 'Content architecture']
	},
	{
		group: 'Delivery',
		items: ['Vercel deploys', 'Lighthouse tuning', 'Static assets', 'Error handling']
	}
];

export const projects: Project[] = [
	{
		slug: 'realtime-viz-platform',
		title: 'Realtime Viz Platform',
		category: 'Data Viz',
		description: 'A live data surface for monitoring streams without overwhelming the operator.',
		longDescription:
			'This project explores dense telemetry UI with careful hierarchy, making fast-changing metrics readable. I focused on composable widgets, reactive data channels, and restrained motion that supports comprehension instead of competing with it.',
		impact: 'Turned a noisy dashboard concept into a calmer, clearer control surface.',
		technologies: ['Vue', 'TypeScript', 'ECharts', 'Design Systems'],
		metrics: ['Sub-second chart refreshes', 'Filterable views', 'Reduced cognitive noise'],
		year: '2026',
		image: '/projects/realtime-viz.svg',
		demoUrl: '#projects',
		repoUrl: '#projects',
		accent: 'rgba(84, 225, 193, 0.4)'
	},
	{
		slug: 'skillbridge-suite',
		title: 'SkillBridge Suite',
		category: 'Full Stack',
		description:
			'A product ecosystem connecting skills, profiles, and backend workflows into a cohesive user journey.',
		longDescription:
			'SkillBridge is about end-to-end coherence. The work combined frontend trust-building patterns, modular UI states, and backend-aware UX so users always understand where they are, what is loading, and what happens next.',
		impact: 'Created a clearer path from discovery to action for multi-step workflows.',
		technologies: ['NestJS', 'TypeScript', 'Form UX', 'API Design'],
		metrics: ['Multi-step flows', 'Structured validation', 'Status-driven UI'],
		year: '2026',
		image: '/projects/skillbridge-suite.svg',
		demoUrl: '#contact',
		repoUrl: '#contact',
		accent: 'rgba(255, 184, 100, 0.38)'
	},
	{
		slug: 'frontend-wizards-portfolio-os',
		title: 'Portfolio OS',
		category: 'Design Engineering',
		description:
			'A cinematic portfolio interface shaped like a lightweight operating environment for developer storytelling.',
		longDescription:
			'This concept treats the portfolio as an instrument rather than a brochure. It combines command-driven navigation, layered panels, and route transitions to make browsing projects feel tactile, deliberate, and memorable.',
		impact: 'Showcases frontend craft through the portfolio itself instead of only describing it.',
		technologies: ['SvelteKit', 'TypeScript', 'Tailwind v4', 'Native motion'],
		metrics: ['Command palette', 'Theme persistence', 'Route-level project pages'],
		year: '2026',
		image: '/projects/portfolio-os.svg',
		demoUrl: '#top',
		repoUrl: '#top',
		accent: 'rgba(255, 135, 197, 0.42)'
	}
];

export const commandGroups = [
	{
		label: 'Navigation',
		commands: [
			{ id: 'go-projects', title: 'Jump to Projects', hint: 'Reveal showcase grid' },
			{ id: 'go-skills', title: 'Jump to Skills', hint: 'Open capabilities matrix' },
			{ id: 'go-contact', title: 'Jump to Contact', hint: 'Start a conversation' }
		]
	},
	{
		label: 'Modes',
		commands: [
			{ id: 'filter-all', title: 'Show All Projects', hint: 'Reset portfolio filter' },
			{
				id: 'filter-frontend-systems',
				title: 'Focus Frontend Systems',
				hint: 'Prioritize systems work'
			},
			{ id: 'filter-data-viz', title: 'Focus Data Viz', hint: 'Prioritize dashboards' },
			{ id: 'toggle-theme', title: 'Toggle Theme', hint: 'Switch dark and light' },
			{ id: 'toggle-motion', title: 'Toggle Motion', hint: 'Respect reduced-motion needs' },
			{ id: 'cycle-accent', title: 'Cycle Accent', hint: 'Change visual signature' }
		]
	}
];

export function getProjectBySlug(slug: string) {
	return projects.find((project) => project.slug === slug);
}
