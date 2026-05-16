<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import Timeline from '$lib/components/Timeline.svelte';
	import SkillTile from '$lib/components/SkillTile.svelte';
	import DynamicBox from '$lib/components/DynamicBox.svelte';
	import { skillCategories } from '$lib/data/skills';

	const stats = [
		{ label: 'Role', value: 'Full Stack Developer' },
		{ label: 'Location', value: 'Earth' },
		{ label: 'Building', value: 'myself · TEO v2' },
		{ label: 'Availability', value: 'Ready to ship' }
	];
</script>

<svelte:head>
	<title>About · TEO</title>
	<meta
		name="description"
		content="About TEO — Full Stack Developer building robust, scalable web applications."
	/>
</svelte:head>

<section class="mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-24">
	<div class="grid gap-16 lg:grid-cols-[1fr_360px]">
		<!-- Bio -->
		<div class="to-reveal max-w-2xl" use:reveal>
			<h1 class="font-display text-5xl font-black tracking-tight sm:text-7xl">
				Hi — I'm<br /><span class="text-accent">TEO.</span>
			</h1>

			<div class="mt-12 space-y-6 text-lg leading-relaxed text-ink-muted sm:text-xl">
				<p>
					I’m a software engineer working at the intersection of robust backend systems and
					intuitive frontend interfaces. I specialize in building end-to-end applications that are
					performant, accessible, and scalable.
				</p>
				<p>
					Currently, I’m focused on mastering modern web architectures, exploring the potential of
					AI-driven tools, and refining the art of shipping high-quality code. I believe that the
					best products are built when deep technical knowledge meets a user-centric design
					philosophy.
				</p>
				<p>
					When I’m not at my terminal, I’m likely researching new technologies, contributing to
					open-source projects, or looking for ways to bridge the gap between complex data and
					seamless user experiences.
				</p>
			</div>

			<!-- Quick stats -->
			<dl class="mt-16 grid grid-cols-2 gap-8 border-t-4 border-ink pt-12 sm:grid-cols-4">
				{#each stats as stat}
					<div class="flex flex-col gap-1">
						<dt class="font-mono text-[10px] tracking-widest text-ink-dim uppercase">
							{stat.label}
						</dt>
						<dd class="font-display font-bold text-ink">{stat.value}</dd>
					</div>
				{/each}
			</dl>
		</div>

		<!-- Identity sidebar (desktop) -->
		<aside class="to-reveal hidden lg:block" use:reveal={{ delay: 100 }}>
			<div class="sticky top-32 space-y-12">
				<!-- Dynamic shape/color box -->
				<DynamicBox />
				<div class="space-y-4">
					<h2 class="font-mono text-xs tracking-[0.3em] text-ink-dim uppercase">Philosophy</h2>
					<p class="text-sm leading-relaxed text-ink-muted italic">
						"Simple is hard. Complex is easy. I strive for the former."
					</p>
				</div>
			</div>
		</aside>
	</div>

	<!-- Expertise -->
	<div class="mt-32">
		<h2 class="to-reveal font-display text-4xl font-black tracking-tight" use:reveal>Expertise</h2>
		<div class="mt-12 space-y-16">
			{#each skillCategories as category (category.key)}
				<div class="to-reveal group space-y-8" use:reveal={{ delay: 50 }}>
					<h3
						class="inline-block border-b-4 border-ink pb-1 font-mono text-xs tracking-[0.3em] text-ink-dim uppercase transition-colors group-hover:text-accent"
					>
						{category.label}
					</h3>
					<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
						{#each category.items as skill}
							<SkillTile {skill} categoryLabel={category.label} />
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Timeline -->
	<div class="mt-40 max-w-3xl">
		<div class="to-reveal space-y-4" use:reveal>
			<h2 class="font-display text-4xl font-black tracking-tight">Timeline</h2>
			<p class="font-mono text-xs tracking-widest text-ink-dim uppercase">The Journey So Far</p>
		</div>

		<div class="mt-16">
			<Timeline />
		</div>
	</div>
</section>
