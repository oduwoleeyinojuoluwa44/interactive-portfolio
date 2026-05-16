<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { categoryLabel } from '$lib/data/projects';
	import { getCover } from '$lib/data/covers';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const { project } = data;

	const cover = $derived(getCover(project.cover));
</script>

<svelte:head>
	<title>{project.title} · TEO</title>
	<meta name="description" content={project.tagline} />
	<meta property="og:title" content="{project.title} · TEO" />
</svelte:head>

<!-- Full-Bleed Top Cover -->
<section class="relative h-[60vh] w-full overflow-hidden border-b-4 border-ink bg-bg">
	{#if cover}
		<enhanced:img
			src={cover}
			alt={project.coverAlt ?? project.title}
			class="size-full object-cover"
			style="view-transition-name: project-cover-{project.slug};"
		/>
	{:else}
		<div class="flex size-full items-center justify-center bg-accent opacity-20">
			<span class="font-display text-[20vw] font-black opacity-10">
				{project.title.charAt(0)}
			</span>
		</div>
	{/if}

	<!-- Floating Metadata Label -->
	<div class="absolute bottom-6 left-6 border-4 border-ink bg-bg px-6 py-3 font-mono text-xs font-black tracking-widest uppercase shadow-hard-sm">
		{categoryLabel[project.category]} / {project.year}
	</div>
</section>

<!-- Title & Action Band -->
<section class="border-b-4 border-ink bg-surface">
	<div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
		<div class="border-b-4 border-ink p-6 sm:p-10 lg:border-b-0 lg:border-r-4 lg:flex-1">
			<h1 class="font-display text-6xl font-black tracking-tighter uppercase sm:text-8xl">
				{project.title}
			</h1>
		</div>

		<div class="flex flex-wrap gap-4 p-6 sm:p-10">
			{#if project.links.live}
				<a
					href={project.links.live}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 border-4 border-ink bg-accent px-8 py-4 font-mono text-[10px] font-black tracking-widest uppercase text-accent-ink transition-transform hover:-translate-x-1 hover:-translate-y-1 hover:shadow-hard"
				>
					<span>Visit System</span>
					<span aria-hidden="true">↗</span>
				</a>
			{/if}
			{#if project.links.github}
				<a
					href={project.links.github}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 border-4 border-ink bg-bg px-8 py-4 font-mono text-[10px] font-black tracking-widest uppercase text-ink transition-transform hover:-translate-x-1 hover:-translate-y-1 hover:shadow-hard"
				>
					<span>View Source</span>
					<span aria-hidden="true">↗</span>
				</a>
			{/if}
		</div>
	</div>
</section>

<!-- Detailed Grid Layout -->
<section class="grid divide-y-4 divide-ink lg:grid-cols-[1fr_360px] lg:divide-y-0 lg:divide-x-4">
	<!-- Left: Narrative -->
	<div class="to-reveal p-6 sm:p-10 lg:p-16" use:reveal>
		<h2 class="mb-10 font-mono text-xs font-black tracking-[0.4em] text-ink-dim uppercase">
			Project Architecture
		</h2>
		<div class="prose-ink prose max-w-none text-xl leading-snug text-ink-muted sm:text-2xl">
			<p>{project.description}</p>
		</div>
	</div>

	<!-- Right: Technical Specs -->
	<aside class="to-reveal bg-surface p-6 sm:p-10" use:reveal={{ delay: 100 }}>
		<div class="space-y-16">
			<section>
				<h2 class="mb-6 font-mono text-xs font-black tracking-[0.4em] text-ink-dim uppercase">
					Core Stack
				</h2>
				<ul class="grid grid-cols-1 gap-2">
					{#each project.tech as t}
						<li class="border-4 border-ink bg-bg p-4 font-mono text-xs font-black tracking-tighter uppercase transition-colors hover:bg-accent hover:text-accent-ink">
							{t}
						</li>
					{/each}
				</ul>
			</section>

			<section class="border-t-4 border-ink pt-12">
				<h2 class="mb-6 font-mono text-xs font-black tracking-[0.4em] text-ink-dim uppercase">
					Release Year
				</h2>
				<p class="font-display text-5xl font-black">{project.year}</p>
			</section>
		</div>
	</aside>
</section>

<!-- Footer Nav -->
<section class="border-t-4 border-ink">
	<a
		href="/work"
		class="group flex items-center justify-center py-20 transition-colors duration-300 hover:bg-ink hover:text-bg"
	>
		<div class="flex items-center gap-10 font-display text-4xl font-black tracking-tighter uppercase sm:text-6xl md:text-8xl">
			<span class="transition-transform group-hover:-translate-x-10" aria-hidden="true">←</span>
			<span>Back to work</span>
		</div>
	</a>
</section>
