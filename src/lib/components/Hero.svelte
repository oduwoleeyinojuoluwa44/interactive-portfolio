<script lang="ts">
	import { resumeUrl } from '$lib/data/socials';
	import { reducedMotion } from '$lib/stores/motion.svelte';
	import HeroBackground from './HeroBackground.svelte';
	import SocialLinks from './SocialLinks.svelte';

	// Cursor parallax
	let mx = $state(0);
	let my = $state(0);

	// Interactive taps
	type Tap = { id: number; x: number; y: number; dx: number; dy: number; color?: string };
	let taps = $state<Tap[]>([]);
	let nextId = 0;

	function triggerLine(x: number, y: number, color?: string) {
		const dx = Math.random() > 0.5 ? 1 : -1;
		const dy = Math.random() > 0.5 ? 1 : -1;
		const id = nextId++;
		
		taps.push({ id, x, y, dx, dy, color });

		setTimeout(() => {
			taps = taps.filter((t) => t.id !== id);
		}, 1500);
	}

	function handleTap(e: MouseEvent | TouchEvent) {
		const target = e.currentTarget as HTMLElement;
		const rect = target.getBoundingClientRect();
		
		let clientX, clientY;
		if ('touches' in e) {
			clientX = e.touches[0].clientX;
			clientY = e.touches[0].clientY;
		} else {
			clientX = e.clientX;
			clientY = e.clientY;
		}

		triggerLine(clientX - rect.left, clientY - rect.top, 'var(--color-navy-green)');
	}

	$effect(() => {
		if (reducedMotion.current) return;
		
		// Timer for autonomous "Ghost Lines" (Navy Green)
		const autoInterval = setInterval(() => {
			const randomX = Math.random() * window.innerWidth;
			const randomY = Math.random() * 600; // Constrain to hero area
			triggerLine(randomX, randomY, 'var(--color-navy-green)');
		}, 4000); // Appear every 4 seconds

		let raf = 0;
		function handle(e: PointerEvent) {
			if (e.pointerType !== 'mouse') return;
			cancelAnimationFrame(raf);
			raf = requestAnimationFrame(() => {
				mx = e.clientX / window.innerWidth - 0.5;
				my = e.clientY / window.innerHeight - 0.5;
			});
		}
		window.addEventListener('pointermove', handle, { passive: true });
		return () => {
			window.removeEventListener('pointermove', handle);
			clearInterval(autoInterval);
			cancelAnimationFrame(raf);
		};
	});
</script>

<section 
	class="relative isolate overflow-hidden cursor-crosshair"
	onclick={handleTap}
	onkeydown={(e) => e.key === 'Enter' && handleTap(e as any)}
	role="button"
	tabindex="0"
	aria-label="Interact with background grid"
>
	<HeroBackground {mx} {my} {taps} />

	<div class="relative z-10 mx-auto w-full max-w-6xl px-6 py-20 sm:px-10 sm:py-32 pointer-events-none">
		<div class="pointer-events-auto grid gap-12 lg:grid-cols-12">
			
			<div class="lg:col-span-8">
				<!-- Status / tagline -->
				<p class="reveal font-mono text-xs tracking-[0.3em] text-ink-muted uppercase" style="--d: 0ms">
					<span class="mr-2 inline-block size-1.5 bg-accent align-middle"></span>
					Available for work · 2026
				</p>

				<!-- Headline -->
				<h1
					class="mt-8 font-display text-6xl leading-[0.9] font-black tracking-tight sm:text-8xl md:text-9xl"
				>
					<span class="reveal block" style="--d: 150ms">
						Engineering
					</span>
					<span class="reveal block text-accent" style="--d: 300ms">
						Systems.
					</span>
				</h1>

				<!-- Intro -->
				<p class="reveal mt-12 max-w-2xl text-xl leading-relaxed text-ink-muted sm:text-2xl" style="--d: 450ms">
					I'm <span class="font-bold text-ink">TEO</span>. I build robust, scalable architectures from database to interface, bridging the gap between complex logic and seamless user experiences.
				</p>
			</div>

			<div class="flex flex-col justify-end gap-10 lg:col-span-4 lg:pb-4">
				<!-- CTAs -->
				<div
					class="reveal flex flex-col gap-4 font-mono text-xs tracking-[0.2em] uppercase"
					style="--d: 600ms"
				>
					<a
						href="/work"
						class="inline-flex items-center justify-between border-4 border-ink bg-accent px-6 py-4 font-black text-accent-ink transition-[box-shadow,transform] duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-hard active:translate-x-0 active:translate-y-0 active:shadow-none"
					>
						<span>Browse work</span>
						<span aria-hidden="true">→</span>
					</a>
					<a
						href={resumeUrl}
						download
						class="inline-flex items-center justify-between border-4 border-ink bg-surface px-6 py-4 font-black text-ink transition-[box-shadow,transform] duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-hard active:translate-x-0 active:translate-y-0 active:shadow-none"
					>
						<span>Resume / CV</span>
						<span aria-hidden="true">↓</span>
					</a>
				</div>

				<!-- Socials -->
				<div class="reveal" style="--d: 750ms">
					<p class="mb-4 font-mono text-[10px] tracking-widest text-ink-dim uppercase">Connectivity</p>
					<SocialLinks variant="icon" />
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* Custom styling remains the same as it's used globally or for internal elements */
</style>
