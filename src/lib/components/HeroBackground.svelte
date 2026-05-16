<script lang="ts">
	type Tap = { id: number; x: number; y: number; dx: number; dy: number; color?: string };
	type Props = { mx?: number; my?: number; taps: Tap[] };
	let { mx = 0, my = 0, taps }: Props = $props();
</script>

<div class="bg-stack" aria-hidden="true">
	<!-- Static Grid -->
	<div class="grid-lines"></div>
	
	<!-- Automatic Scanline -->
	<div class="scanline"></div>

	<!-- Interactive & Autonomous Taps -->
	{#each taps as tap (tap.id)}
		<!-- Horizontal line -->
		<div 
			class="user-line h-line" 
			style="top: {tap.y}px; --dist: {tap.dy * 150}px; background-color: {tap.color ?? 'var(--color-accent)'};"
		></div>
		<!-- Vertical line -->
		<div 
			class="user-line v-line" 
			style="left: {tap.x}px; --dist: {tap.dx * 150}px; background-color: {tap.color ?? 'var(--color-accent)'};"
		></div>
	{/each}

	<div class="glow" style="--gx: {mx * 40}px; --gy: {my * 40}px;"></div>
</div>

<style>
	.bg-stack {
		position: absolute;
		inset: 0;
		overflow: hidden;
		pointer-events: none;
		z-index: 0;
	}

	.grid-lines {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(to right, var(--color-ink) 2px, transparent 2px),
			linear-gradient(to bottom, var(--color-ink) 2px, transparent 2px);
		background-size: 60px 60px;
		opacity: 0.1;
	}

	.scanline {
		position: absolute;
		left: 0;
		right: 0;
		height: 4px;
		background: var(--color-accent);
		opacity: 0.2;
		animation: scan 8s linear infinite;
	}

	.user-line {
		position: absolute;
		background: var(--color-navy-green);
		opacity: 0;
		pointer-events: none;
	}

	.h-line {
		left: 0;
		right: 0;
		height: 2px;
		animation: h-drift 1.5s var(--ease-fluid) forwards;
	}

	.v-line {
		top: 0;
		bottom: 0;
		width: 2px;
		animation: v-drift 1.5s var(--ease-fluid) forwards;
	}

	@keyframes h-drift {
		0% { 
			opacity: 0; 
			transform: translateY(calc(var(--dist) * -0.2)); 
		}
		20% { 
			opacity: 0.8; 
			transform: translateY(0); 
		}
		100% { 
			opacity: 0; 
			transform: translateY(var(--dist)); 
		}
	}

	@keyframes v-drift {
		0% { 
			opacity: 0; 
			transform: translateX(calc(var(--dist) * -0.2)); 
		}
		20% { 
			opacity: 0.8; 
			transform: translateX(0); 
		}
		100% { 
			opacity: 0; 
			transform: translateX(var(--dist)); 
		}
	}

	.glow {
		display: none;
	}

	@keyframes scan {
		from {
			top: -2%;
		}
		to {
			top: 102%;
		}
	}
</style>
