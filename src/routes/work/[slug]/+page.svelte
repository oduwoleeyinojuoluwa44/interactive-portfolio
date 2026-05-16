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

<article class="mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-24">
	<!-- Header -->
	<header class="to-reveal space-y-6" use:reveal>
		<div class="flex flex-wrap items-center gap-4 font-mono text-xs tracking-widest uppercase">
			<span class="text-accent">{categoryLabel[project.category]}</span>
			<span class="text-ink-dim">/</span>
			<span class="text-ink-muted">{project.year}</span>
		</div>

		<h1 class="font-display text-6xl font-black tracking-tight sm:text-8xl">
			{project.title}
		</h1>

		<p class="max-w-2xl text-xl leading-relaxed text-ink-muted sm:text-2xl">
			{project.tagline}
		</p>

		<!-- Links -->
		<div class="flex flex-wrap items-center gap-4 pt-4 font-mono text-xs tracking-[0.2em] uppercase">
			{#if project.links.live}
				<a
					href={project.links.live}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 border-4 border-ink bg-accent px-6 py-3 font-black text-accent-ink transition-transform hover:-translate-x-1 hover:-translate-y-1 hover:shadow-hard"
				>
					<span>Visit Live</span>
					<span aria-hidden="true">↗</span>
				</a>
			{/if}
			{#if project.links.github}
				<a
					href={project.links.github}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 border-4 border-ink bg-surface px-6 py-3 font-black text-ink transition-transform hover:-translate-x-1 hover:-translate-y-1 hover:shadow-hard"
				>
					<span>Source Code</span>
					<span aria-hidden="true">↗</span>
				</a>
			{/if}
		</div>
	</header>

	<!-- Cover -->
	<div class="to-reveal mt-20" use:reveal={{ delay: 100 }}>
		<div
			class="relative aspect-[21/9] overflow-hidden border-4 border-ink bg-surface shadow-hard"
			style="view-transition-name: project-cover-{project.slug};"
		>
			{#if cover}
				<enhanced:img
					src={cover}
					alt={project.coverAlt ?? project.title}
					class="size-full object-cover"
				/>
			{:else}
				<div
					class="flex size-full items-center justify-center bg-accent opacity-20"
					aria-hidden="true"
				>
					<span class="font-display text-9xl font-black opacity-10">
						{project.title.charAt(0)}
					</span>
				</div>
			{/if}
		</div>
	</div>

	<!-- Content -->
	<div class="mt-20 grid gap-16 lg:grid-cols-[1fr_320px]">
		<!-- Description -->
		<div class="to-reveal space-y-12" use:reveal={{ delay: 200 }}>
			<section class="space-y-6">
				<h2 class="font-mono text-xs tracking-[0.3em] text-ink-dim uppercase">Overview</h2>
				<div class="prose-ink prose text-lg leading-relaxed text-ink-muted">
					<p>{project.description}</p>
				</div>
			</section>
		</div>

		<!-- Sidebar -->
		<aside class="to-reveal space-y-12" use:reveal={{ delay: 300 }}>
			<!-- Tech -->
			<section class="space-y-6">
				<h2 class="font-mono text-xs tracking-[0.3em] text-ink-dim uppercase">Technologies</h2>
				<ul class="flex flex-wrap gap-2">
					{#each project.tech as t}
						<li class="border-2 border-ink bg-surface px-3 py-1 font-mono text-[10px] tracking-widest uppercase">
							{t}
						</li>
					{/each}
				</ul>
			</section>

			<!-- Year -->
			<section class="space-y-6 border-t-2 border-ink pt-12">
				<h2 class="font-mono text-xs tracking-[0.3em] text-ink-dim uppercase">Year</h2>
				<p class="font-display text-2xl font-bold">{project.year}</p>
			</section>
		</aside>
	</div>

	<!-- Footer nav -->
	<footer class="mt-40 border-t-4 border-ink pt-12">
		<a
			href="/work"
			class="group inline-flex items-center gap-4 font-display text-2xl font-black tracking-tight uppercase"
		>
			<span class="transition-transform group-hover:-translate-x-2" aria-hidden="true">←</span>
			<span>Back to work</span>
		</a>
	</footer>
</article>
