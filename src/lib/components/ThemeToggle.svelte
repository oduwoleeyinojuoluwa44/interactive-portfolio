<script lang="ts">
	import {
		accent,
		cycleAccent,
		motionEnabled,
		theme,
		toggleMotion,
		toggleTheme
	} from '$lib/stores/preferences.svelte';

	let { compact = false } = $props<{ compact?: boolean }>();
</script>

<div class:compact class="controls panel">
	<button type="button" aria-label="Toggle theme" onclick={toggleTheme}>
		<span>{theme.current === 'dark' ? 'Light' : 'Dark'}</span>
	</button>
	<button type="button" aria-label="Change accent color" onclick={cycleAccent}>
		<span>{accent.current}</span>
	</button>
	<button type="button" aria-label="Toggle motion preferences" onclick={toggleMotion}>
		<span>{motionEnabled.current ? 'Motion on' : 'Motion off'}</span>
	</button>
</div>

<style>
	.controls {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.45rem;
		border-radius: 999px;
	}

	button {
		padding: 0.75rem 0.95rem;
		border-radius: 999px;
		border: 1px solid transparent;
		font-size: 0.78rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--muted);
		background: transparent;
	}

	button:hover {
		color: var(--text);
		border-color: var(--line);
		background: rgba(var(--accent-rgb), 0.08);
	}

	.compact {
		padding: 0.35rem;
	}

	.compact button {
		padding: 0.65rem 0.8rem;
	}

	@media (max-width: 720px) {
		.controls {
			flex-wrap: wrap;
			border-radius: 24px;
		}
	}
</style>
