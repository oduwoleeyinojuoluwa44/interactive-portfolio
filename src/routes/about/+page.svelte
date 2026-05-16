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

<!-- Full Bleed Container -->
<div class="border-b-4 border-ink">
	<section class="grid lg:grid-cols-2">
		<!-- Left Side: Massive Bio -->
		<div class="to-reveal border-b-4 border-ink p-6 sm:p-10 lg:border-b-0 lg:border-r-4" use:reveal>
			<h1 class="font-display text-6xl font-black tracking-tighter uppercase sm:text-8xl md:text-9xl">
				About<br /><span class="text-accent">TEO.</span>
			</h1>

			<div class="mt-16 space-y-8 text-xl leading-snug text-ink-muted sm:text-2xl">
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
			</div>

			<!-- Quick stats inside bio block -->
			<dl class="mt-20 grid grid-cols-2 gap-px border-4 border-ink bg-ink">
				{#each stats as stat}
					<div class="bg-bg p-6">
						<dt class="font-mono text-[10px] tracking-widest text-ink-dim uppercase">
							{stat.label}
						</dt>
						<dd class="mt-2 font-display text-lg font-bold text-ink">{stat.value}</dd>
					</div>
				{/each}
			</dl>
		</div>

		<!-- Right Side: Dynamic Visual & Philosophy -->
		<div class="flex flex-col">
			<!-- Dynamic Visual Block -->
			<div class="to-reveal border-b-4 border-ink p-12 lg:flex-1 lg:p-24" use:reveal={{ delay: 100 }}>
				<div class="mx-auto max-w-sm">
					<DynamicBox />
				</div>
			</div>

			<!-- Philosophy Block -->
			<div class="to-reveal bg-surface p-10 sm:p-16 lg:p-20" use:reveal={{ delay: 200 }}>
				<h2 class="font-mono text-xs tracking-[0.4em] text-ink-dim uppercase">Philosophy</h2>
				<p class="mt-6 font-display text-3xl font-bold leading-tight italic sm:text-4xl">
					"Simple is hard. Complex is easy. I strive for the former."
				</p>
			</div>
		</div>
	</section>
</div>

<!-- Expertise Section: Dense Grid -->
<section class="border-b-4 border-ink">
	<div class="border-b-4 border-ink p-6 sm:p-10">
		<h2 class="to-reveal font-display text-5xl font-black tracking-tight uppercase" use:reveal>
			Expertise
		</h2>
	</div>

	<div class="grid divide-y-4 divide-ink">
		{#each skillCategories as category (category.key)}
			<div class="to-reveal grid lg:grid-cols-[300px_1fr]" use:reveal={{ delay: 50 }}>
				<!-- Category Label -->
				<div class="bg-surface p-6 sm:p-10 lg:border-r-4 lg:border-ink">
					<h3 class="font-mono text-sm font-black tracking-[0.3em] text-ink-muted uppercase">
						{category.label}
					</h3>
				</div>

				<!-- Skills Tiles Grid (Seamless) -->
				<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
					{#each category.items as skill}
						<div class="border-r-4 border-b-4 border-ink last:border-r-0">
							<SkillTile {skill} categoryLabel={category.label} />
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</section>

<!-- Timeline Section -->
<section class="p-6 sm:p-10 lg:p-20">
	<div class="to-reveal mb-20 space-y-4" use:reveal>
		<h2 class="font-display text-5xl font-black tracking-tight uppercase sm:text-7xl">Timeline</h2>
		<p class="font-mono text-xs tracking-[0.5em] text-ink-dim uppercase">The Professional Log</p>
	</div>

	<div class="to-reveal mx-auto max-w-4xl" use:reveal={{ delay: 100 }}>
		<Timeline />
	</div>
</section>
