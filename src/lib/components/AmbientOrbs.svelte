<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	let x = $state(50);
	let y = $state(24);

	onMount(() => {
		if (!browser) {
			return;
		}

		const move = (event: PointerEvent) => {
			x = (event.clientX / window.innerWidth) * 100;
			y = (event.clientY / window.innerHeight) * 100;
		};

		window.addEventListener('pointermove', move, { passive: true });
		return () => window.removeEventListener('pointermove', move);
	});
</script>

<div class="ambient" aria-hidden="true">
	<div class="orb orb-a" style={`left:${x * 0.45}%; top:${y * 0.7}%`}></div>
	<div class="orb orb-b" style={`left:${100 - x * 0.35}%; top:${16 + y * 0.2}%`}></div>
	<div class="orb orb-c" style={`left:${18 + x * 0.12}%; top:${66 - y * 0.18}%`}></div>
</div>

<style>
	.ambient {
		position: fixed;
		inset: 0;
		pointer-events: none;
		overflow: clip;
	}

	.orb {
		position: absolute;
		width: 28rem;
		height: 28rem;
		border-radius: 50%;
		filter: blur(40px);
		opacity: 0.2;
		will-change: transform, left, top;
	}

	.orb-a {
		background: radial-gradient(circle, rgba(var(--accent-rgb), 0.75), transparent 62%);
	}

	.orb-b {
		background: radial-gradient(circle, rgba(24, 167, 255, 0.65), transparent 60%);
	}

	.orb-c {
		background: radial-gradient(circle, rgba(255, 128, 94, 0.55), transparent 65%);
	}

	@media (max-width: 720px) {
		.orb {
			width: 18rem;
			height: 18rem;
		}
	}
</style>
