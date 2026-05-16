<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import SocialLinks from '$lib/components/SocialLinks.svelte';

	const emailAddress = 'oduwoleeyinojuoluwa44@gmail.com';
</script>

<svelte:head>
	<title>Contact · TEO</title>
	<meta
		name="description"
		content="Get in touch with TEO — direct email, scheduling, social channels."
	/>
</svelte:head>

<section class="mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-24">
	<div class="grid gap-16 lg:grid-cols-2">
		<!-- Left: Headline & Intro -->
		<div class="to-reveal space-y-8" use:reveal>
			<h1 class="font-display text-6xl leading-[0.95] font-black tracking-tight sm:text-8xl">
				Let's build<br /><span class="text-accent">together.</span>
			</h1>

			<p class="max-w-md text-lg leading-relaxed text-ink-muted">
				I’m currently available for full-time roles and freelance projects. If you have a question
				or just want to say hi, my inbox is always open.
			</p>

			<div class="pt-4">
				<SocialLinks variant="icon" />
			</div>
		</div>

		<!-- Right: Methods -->
		<div class="space-y-12">
			<!-- Email -->
			<div class="to-reveal space-y-6" use:reveal={{ delay: 100 }}>
				<h2 class="font-mono text-xs tracking-[0.3em] text-ink-dim uppercase">Direct Email</h2>
				<a
					href="mailto:{emailAddress}"
					class="group block border-4 border-ink bg-surface p-8 transition-transform hover:-translate-x-1 hover:-translate-y-1 hover:shadow-hard"
				>
					<span
						class="font-display text-2xl font-bold break-all transition-colors group-hover:text-accent sm:text-3xl"
					>
						{emailAddress}
					</span>
					<div class="mt-4 flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase">
						<span>Click to copy or send</span>
						<span class="transition-transform group-hover:translate-x-1" aria-hidden="true"
							>—&gt;</span
						>
					</div>
				</a>
			</div>

			<!-- Scheduling -->
			<div class="to-reveal space-y-6" use:reveal={{ delay: 200 }}>
				<h2 class="font-mono text-xs tracking-[0.3em] text-ink-dim uppercase">Quick Chat</h2>
				<p class="text-sm leading-relaxed text-ink-muted">
					Prefer a video call? You can find a time that works for you on my calendar. I’m always
					happy to discuss new projects or technical challenges.
				</p>
				<a
					href="#"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 border-4 border-ink bg-accent px-6 py-4 font-black text-accent-ink transition-transform hover:-translate-x-1 hover:-translate-y-1 hover:shadow-hard"
				>
					<span>Schedule a meet</span>
					<span aria-hidden="true">↗</span>
				</a>
			</div>
		</div>
	</div>
</section>
