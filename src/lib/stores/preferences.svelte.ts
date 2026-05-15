import { browser } from '$app/environment';

export type Theme = 'dark' | 'light';
export type Accent = 'cyan' | 'amber' | 'rose';

export const theme = $state<{ current: Theme }>({ current: 'dark' });
export const accent = $state<{ current: Accent }>({ current: 'cyan' });
export const motionEnabled = $state<{ current: boolean }>({ current: true });

const THEME_KEY = 'portfolio-theme';
const ACCENT_KEY = 'portfolio-accent';
const MOTION_KEY = 'portfolio-motion';

export function applyPreferences() {
	if (!browser) {
		return;
	}

	document.documentElement.dataset.theme = theme.current;
	document.documentElement.dataset.accent = accent.current;
	document.documentElement.dataset.motion = motionEnabled.current ? 'full' : 'reduced';

	localStorage.setItem(THEME_KEY, theme.current);
	localStorage.setItem(ACCENT_KEY, accent.current);
	localStorage.setItem(MOTION_KEY, motionEnabled.current ? 'full' : 'reduced');
}

export function initializePreferences() {
	if (!browser) {
		return;
	}

	const savedTheme = localStorage.getItem(THEME_KEY) as Theme | null;
	const savedAccent = localStorage.getItem(ACCENT_KEY) as Accent | null;
	const savedMotion = localStorage.getItem(MOTION_KEY);

	if (savedTheme === 'dark' || savedTheme === 'light') {
		theme.current = savedTheme;
	} else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
		theme.current = 'light';
	}

	if (savedAccent === 'cyan' || savedAccent === 'amber' || savedAccent === 'rose') {
		accent.current = savedAccent;
	}

	if (savedMotion === 'reduced') {
		motionEnabled.current = false;
	}

	applyPreferences();
}

export function toggleTheme() {
	theme.current = theme.current === 'dark' ? 'light' : 'dark';
	applyPreferences();
}

export function cycleAccent() {
	accent.current =
		accent.current === 'cyan' ? 'amber' : accent.current === 'amber' ? 'rose' : 'cyan';
	applyPreferences();
}

export function toggleMotion() {
	motionEnabled.current = !motionEnabled.current;
	applyPreferences();
}
