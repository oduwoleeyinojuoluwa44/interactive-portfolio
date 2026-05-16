<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import ProjectsGrid from '$lib/components/ProjectsGrid.svelte';
	import { projectYearRange } from '$lib/data/projects';
</script>

<svelte:head>
	<title>Work · TEO</title>
	<meta
		name="description"
		content="Selected projects by TEO — web apps, tools, and experiments."
	/>
</svelte:head>

<section class="mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-24">
	<!-- Heading -->
	<div class="to-reveal space-y-4" use:reveal>
		<p class="font-mono text-xs tracking-[0.3em] text-ink-dim uppercase">
			Archive · {projectYearRange()}
		</p>
		<h1 class="font-display text-6xl font-black tracking-tight sm:text-8xl">Work</h1>
	</div>

	<!-- Projects -->
	<div class="mt-20">
		<ProjectsGrid />
	</div>
</section>
