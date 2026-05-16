<script lang="ts">
	import { categoryLabel, type Project } from '$lib/data/projects';
	import { getCover } from '$lib/data/covers';

	type Props = { project: Project; index: number };
	let { project, index }: Props = $props();

	const cover = $derived(getCover(project.cover));

	// Random hue for the placeholder gradient (Stage 4 baseline).
	const h = (index * 137) % 360;
</script>

<a
	href="/work/{project.slug}"
	class="card relative isolate flex h-full flex-col overflow-hidden bg-bg transition-colors duration-300 hover:bg-surface-raised"
	aria-label="View project: {project.title}"
>
	<!-- Massive Side-by-Side on Desktop -->
	<div class="flex flex-col lg:flex-row lg:items-stretch">
		<!-- Cover -->
		<div class="cover relative aspect-video overflow-hidden border-b-4 border-ink lg:aspect-square lg:w-1/2 lg:border-b-0 lg:border-r-4">
			{#if cover}
				<enhanced:img
					src={cover}
					alt={project.coverAlt ?? project.title}
					class="size-full object-cover transition-transform duration-700 ease-[var(--ease-drift)] group-hover:scale-110"
					style="view-transition-name: project-cover-{project.slug}"
				/>
			{:else}
				<div class="placeholder flex size-full items-center justify-center" style="--h: {h}">
					<span class="font-display text-6xl font-black opacity-10 uppercase">
						{project.title.charAt(0)}
					</span>
				</div>
			{/if}
		</div>

		<!-- Info -->
		<div class="flex flex-col justify-between p-6 sm:p-10 lg:w-1/2">
			<div class="space-y-4">
				<div class="flex items-center gap-3 font-mono text-[10px] font-black tracking-widest uppercase text-ink-dim">
					<span class="text-accent">{categoryLabel[project.category]}</span>
					<span>/</span>
					<span>{project.year}</span>
				</div>

				<h3 class="font-display text-4xl font-black leading-[0.9] tracking-tighter uppercase sm:text-5xl lg:text-6xl">
					{project.title}
				</h3>

				<p class="max-w-md text-lg leading-snug text-ink-muted">
					{project.tagline}
				</p>
			</div>

			<div class="mt-8 flex flex-wrap gap-2">
				{#each project.tech.slice(0, 3) as tech}
					<span class="border-2 border-ink px-2 py-1 font-mono text-[9px] font-black tracking-tighter uppercase">
						{tech}
					</span>
				{/each}
			</div>
		</div>
	</div>

	<!-- Interaction Decoration -->
	<div class="absolute top-4 right-4 translate-x-12 translate-y-[-12px] rotate-45 bg-accent px-10 py-1 font-mono text-[10px] font-black tracking-widest uppercase text-accent-ink transition-transform duration-300 group-hover:translate-x-8 group-hover:translate-y-[-8px]">
		Launch
	</div>
</a>

<style>
	.placeholder {
		background:
			repeating-linear-gradient(135deg, transparent 0 14px, oklch(0.5 0.15 var(--h)) 14px 15px),
			linear-gradient(135deg, var(--color-surface-raised), var(--color-surface));
		opacity: 0.9;
	}
</style>
