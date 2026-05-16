/**
 * Personal Career timeline.
 */

export type TimelineEntry = {
	year: number;
	title: string;
	subtitle?: string;
	body: string;
};

export const timeline: TimelineEntry[] = [
	{
		year: 2025,
		title: 'Back End Developer',
		subtitle: 'Emerj LLC · Full-time',
		body: 'Dec 2025 - Present. Driving backend architecture and implementation for scalable enterprise solutions in Nigeria.'
	},
	{
		year: 2025,
		title: 'Back End Developer',
		subtitle: 'XPRESSCORE · Full-time',
		body: 'Oct 2025 - Present. Focused on Back-End Web Development, Critical Thinking, and optimizing core system performance.'
	},
	{
		year: 2025,
		title: 'Back End Developer',
		subtitle: 'HNG Tech · Internship',
		body: 'Oct 2025 - Dec 2025. Contributed to intensive backend development cycles within a fast-paced internship environment.'
	},
	{
		year: 2024,
		title: 'Cybersecurity Intern',
		subtitle: 'CodeAlpha · Internship',
		body: 'Nov 2024 - Dec 2024. Remote. Gained hands-on experience in cybersecurity protocols and vulnerability analysis.'
	},
	{
		year: 2024,
		title: 'Cybersecurity Intern',
		subtitle: 'KPMG Nigeria · Internship',
		body: 'Jul 2024 - Nov 2024. Developed robust understanding of business resilience, risk assessment, VAPT, and disaster recovery planning.'
	},
	{
		year: 2023,
		title: 'Backend Software Engineer',
		subtitle: 'HNG Tech · Contract',
		body: 'Aug 2023 - Nov 2023. Worked on high-impact projects including a Chrome Extension for screen recording, Zuri Portfolio enhancements (marketplace, revenue tracking), and the Free Lunch app. Technologies: Postgres, MySQL, JS/TS, Node, Express.'
	}
];
