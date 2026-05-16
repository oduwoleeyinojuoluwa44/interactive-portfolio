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

<!-- Sized to its content (+ padding) rather than forced to fill the viewport —
     avoids the dead vertical space that justify-center used to pad around it. -->
<section 
	class="relative isolate overflow-hidden cursor-crosshair"
	onclick={handleTap}
	onkeydown={(e) => e.key === 'Enter' && handleTap(e as any)}
	role="button"
	tabindex="0"
	aria-label="Interact with background grid"
>
	<HeroBackground {mx} {my} {taps} />

	<div class="relative z-10 mx-auto w-full max-w-6xl px-6 py-20 sm:px-10 sm:py-24">
		<div class="pointer-events-auto">
			<!-- Status / tagline -->
			<p class="reveal font-mono text-xs tracking-[0.3em] text-ink-muted uppercase" style="--d: 0ms">
				<span class="mr-2 inline-block size-1.5 bg-accent align-middle"></span>
				Available for work · 2026
			</p>

			<!-- Headline -->
			<h1
				class="mt-6 font-display text-5xl leading-[0.95] font-extrabold tracking-tight sm:text-7xl md:text-8xl"
			>
				<span class="reveal block" style="--d: 100ms">
					I'm <span class="text-accent">TEO</span>.
				</span>
				<span
					class="reveal mt-3 block text-3xl font-medium text-ink-muted sm:text-5xl md:text-6xl"
					style="--d: 220ms"
				>
					I'm a Full Stack
				</span>
				<span class="reveal block" style="--d: 340ms">
					Developer.
				</span>
			</h1>

			<!-- Intro -->
			<p class="reveal mt-10 max-w-xl text-lg leading-relaxed text-ink-muted" style="--d: 480ms">
				Building robust, scalable applications from database to interface. Focused on creating seamless digital experiences with modern web technologies like Next.js, Svelte, and Node.js.
			</p>

			<!-- CTAs -->
			<div
				class="reveal mt-10 flex flex-wrap items-center gap-3 font-mono text-xs tracking-[0.2em] uppercase"
				style="--d: 600ms"
			>
				<a
					href="/work"
					class="inline-flex items-center gap-2 border-4 border-ink bg-accent px-5 py-3 font-black text-accent-ink transition-[box-shadow,transform] duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-hard active:translate-x-0 active:translate-y-0 active:shadow-none"
				>
					<span>See work</span>
					<span aria-hidden="true">→</span>
				</a>
				<a
					href={resumeUrl}
					download
					class="inline-flex items-center gap-2 border-4 border-ink bg-surface px-5 py-3 font-black text-ink transition-[box-shadow,transform] duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-hard active:translate-x-0 active:translate-y-0 active:shadow-none"
				>
					<span aria-hidden="true">↓</span>
					<span>Resume</span>
				</a>
			</div>

			<!-- Socials -->
			<div class="reveal mt-12" style="--d: 720ms">
				<SocialLinks variant="icon" />
			</div>
		</div>
	</div>
</section>

<style>
	/* Highlight word: hand-drawn-ish underbar that pulses subtly */
	.alive {
		position: relative;
		color: var(--color-accent);
		display: inline-block;
	}
	.alive::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0.06em;
		height: 0.18em;
		background: var(--color-accent);
		opacity: 0.25;
		transform-origin: left;
		animation: alive-bar 1.2s 1s cubic-bezier(0.65, 0, 0.35, 1) backwards;
	}
	@keyframes alive-bar {
		from {
			transform: scaleX(0);
		}
		to {
			transform: scaleX(1);
		}
	}
</style>
