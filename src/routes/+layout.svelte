<script lang="ts">
	import './layout.css';
	import favicon from '../lib/assets/favicon.svg';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { applyPreferences, motionEnabled, theme } from '../lib/stores/preferences.svelte';

	let { children } = $props();

	onMount(() => {
		applyPreferences();

		if (!browser) {
			return;
		}

		const media = window.matchMedia('(prefers-reduced-motion: reduce)');
		motionEnabled.current = !media.matches;

		const updateMotion = () => {
			if (!localStorage.getItem('portfolio-motion')) {
				motionEnabled.current = !media.matches;
				applyPreferences();
			}
		};

		media.addEventListener('change', updateMotion);
		return () => media.removeEventListener('change', updateMotion);
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Space+Grotesk:wght@400;500;700&display=swap"
		rel="stylesheet"
	/>
	<meta name="theme-color" content={theme.current === 'light' ? '#eef4fb' : '#07111f'} />
</svelte:head>

{@render children()}
