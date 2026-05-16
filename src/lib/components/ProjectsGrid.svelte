<script lang="ts">
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { categories, projects, type FilterValue } from '$lib/data/projects';
	import { reducedMotion } from '$lib/stores/motion.svelte';
	import ProjectCard from './ProjectCard.svelte';

	let active = $state<FilterValue>('all');

	const filtered = $derived(
		active === 'all' ? projects : projects.filter((p) => p.category === active)
	);

	function countFor(value: FilterValue): number {
		return value === 'all' ? projects.length : projects.filter((p) => p.category === value).length;
	}

	const flipDuration = $derived(reducedMotion.current ? 0 : 380);
	const fadeDuration = $derived(reducedMotion.current ? 0 : 200);
</script>

<!-- Filter Ticker Band -->
<div
	class="flex overflow-x-auto border-b-4 border-ink no-scrollbar"
	role="group"
	aria-label="Filter projects by category"
>
	{#each categories as cat (cat.value)}
		{@const isActive = active === cat.value}
		{@const count = countFor(cat.value)}
		<button
			type="button"
			onclick={() => (active = cat.value)}
			aria-pressed={isActive}
			disabled={count === 0}
			class="group inline-flex items-center gap-4 border-r-4 border-ink px-10 py-6 font-mono text-xs font-black tracking-[0.3em] whitespace-nowrap uppercase transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-30"
			class:active-tab={isActive}
			class:inactive-tab={!isActive}
		>
			<span>{cat.label}</span>
			<span class="tabular-nums group-aria-pressed:text-accent-ink/70">
				[{count}]
			</span>
		</button>
	{/each}
</div>

<!-- Blueprint Grid -->
<div
	class="grid grid-cols-1 md:grid-cols-2"
	aria-live="polite"
	aria-atomic="false"
>
	{#each filtered as project, i (project.slug)}
		<div
			class="group border-b-4 border-ink md:even:border-l-4"
			class:md:col-span-2={project.featured}
			animate:flip={{ duration: flipDuration }}
			in:fade={{ duration: fadeDuration, delay: i * 30 }}
			out:fade={{ duration: fadeDuration }}
		>
			<ProjectCard {project} index={i} />
		</div>
	{/each}
</div>

{#if filtered.length === 0}
	<div class="p-10">
		<p class="font-mono text-sm tracking-wider text-ink-muted uppercase">
			No projects found in system.
		</p>
	</div>
{/if}

<style>
	.active-tab {
		background: var(--color-accent);
		color: var(--color-accent-ink);
	}
	.inactive-tab {
		color: var(--color-ink-muted);
		background: var(--color-bg);
	}
	.inactive-tab:hover:not(:disabled) {
		color: var(--color-ink);
		background: var(--color-surface-raised);
	}
	
	.no-scrollbar::-webkit-scrollbar {
		display: none;
	}
	.no-scrollbar {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
</style>
