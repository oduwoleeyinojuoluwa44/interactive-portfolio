/**
 * Single source of truth for external links — consumed by Hero, Footer,
 * and (Stage 8) the command palette's `cv` / `contact` commands.
 * Edit URLs here when real handles are confirmed.
 */

export type Social = {
	key: 'github' | 'twitter' | 'linkedin' | 'email';
	label: string;
	href: string;
};

export const socials: Social[] = [
	{ key: 'github', label: 'GitHub', href: 'https://github.com/oduwoleeyinojuoluwa44' },
	{ key: 'twitter', label: 'Twitter', href: '#' },
	{ key: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/oduwole-eyinojuoluwa-taofeek-teo-54544b290/' },
	{ key: 'email', label: 'Email', href: 'mailto:oduwoleeyinojuoluwa44@gmail.com' }
];

export const resumeUrl = '/resume.pdf';
