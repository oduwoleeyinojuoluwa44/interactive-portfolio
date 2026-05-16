<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import SocialLinks from '$lib/components/SocialLinks.svelte';

	const emailAddress = 'oduwoleeyinojuoluwa44@gmail.com';

	const contactMethods = [
		{
			title: 'Direct Dispatch',
			label: emailAddress,
			href: `mailto:${emailAddress}`,
			cta: 'Send Message'
		},
		{
			title: 'Social Frequency',
			label: 'GitHub · LinkedIn',
			isSocials: true
		},
		{
			title: 'Sync Calendar',
			label: 'Schedule a Video Call',
			href: '#',
			cta: 'Book Time'
		}
	];
</script>

<svelte:head>
	<title>Contact · TEO</title>
	<meta
		name="description"
		content="Get in touch with TEO — direct email, scheduling, social channels."
	/>
</svelte:head>

<section class="flex min-h-screen flex-col border-b-4 border-ink">
	<!-- Massive Hero Header -->
	<div class="flex-1 border-b-4 border-ink bg-bg p-6 sm:p-10 lg:p-20 flex items-end">
		<h1 class="font-display text-[15vw] font-black leading-[0.8] tracking-tighter uppercase sm:text-[18vw]">
			Let's<br /><span class="text-accent italic">Build.</span>
		</h1>
	</div>

	<!-- 3-Column Split -->
	<div class="grid divide-y-4 divide-ink lg:grid-cols-3 lg:divide-y-0 lg:divide-x-4">
		{#each contactMethods as method, i}
			<div class="group relative flex flex-col justify-between bg-surface p-10 transition-colors duration-500 hover:bg-ink hover:text-bg">
				<div class="to-reveal space-y-8" use:reveal={{ delay: i * 100 }}>
					<h2 class="font-mono text-xs font-black tracking-[0.4em] uppercase opacity-40 group-hover:opacity-100 group-hover:text-accent">
						{method.title}
					</h2>

					{#if method.isSocials}
						<div class="flex flex-col gap-6">
							<p class="font-display text-2xl font-bold uppercase">{method.label}</p>
							<div class="group-hover:invert group-hover:brightness-0">
								<SocialLinks variant="icon" />
							</div>
						</div>
					{:else}
						<div class="space-y-4">
							<p class="font-display text-3xl font-black break-all uppercase leading-tight sm:text-4xl">
								{method.label}
							</p>
							<a
								href={method.href}
								class="inline-block border-4 border-ink bg-accent px-6 py-3 font-mono text-[10px] font-black tracking-widest uppercase text-accent-ink transition-transform hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#000] active:translate-x-0 active:translate-y-0 group-hover:border-bg"
							>
								{method.cta} —&gt;
							</a>
						</div>
					{/if}
				</div>

				<!-- Column Index Decoration -->
				<span class="absolute bottom-4 right-6 font-mono text-6xl font-black opacity-5 group-hover:opacity-20">
					0{i + 1}
				</span>
			</div>
		{/each}
	</div>
</section>
