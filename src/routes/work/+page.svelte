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

<section class="border-b-4 border-ink">
	<!-- Heading Band -->
	<div class="border-b-4 border-ink p-6 sm:p-10 lg:p-20">
		<div class="to-reveal space-y-6" use:reveal>
			<p class="font-mono text-xs tracking-[0.4em] text-ink-dim uppercase">
				Archive Data · {projectYearRange()}
			</p>
			<h1 class="font-display text-7xl font-black tracking-tighter uppercase sm:text-9xl md:text-[12rem]">
				Work.
			</h1>
		</div>
	</div>

	<!-- Filter & Projects -->
	<div class="to-reveal" use:reveal={{ delay: 100 }}>
		<ProjectsGrid />
	</div>
</section>
