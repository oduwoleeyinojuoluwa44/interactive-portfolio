<script lang="ts">
	let colorIndex = $state(0);
	let shapeIndex = $state(0);
	let patternIndex = $state(0);

	const colors = ['#fff500', '#00e0ff', '#ff00ff', '#00ff00', '#ff4d00'];
	const shapes = [
		'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', // Square
		'circle(50% at 50% 50%)', // Circle
		'polygon(50% 0%, 0% 100%, 100% 100%)', // Triangle
		'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', // Diamond
		'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)' // Parallelogram
	];
	const patterns = [
		'radial-gradient(circle, #000 10%, transparent 11%)',
		'linear-gradient(45deg, #000 25%, transparent 25%, transparent 50%, #000 50%, #000 75%, transparent 75%, transparent)',
		'repeating-linear-gradient(0deg, #000, #000 2px, transparent 2px, transparent 10px)',
		'none'
	];

	$effect(() => {
		const interval = setInterval(() => {
			colorIndex = (colorIndex + 1) % colors.length;
			shapeIndex = (shapeIndex + 1) % shapes.length;
			patternIndex = (patternIndex + 1) % patterns.length;
		}, 3000); // Slower cycle for more fluid feel
		return () => clearInterval(interval);
	});
</script>

<!-- Stable outer container -->
<div class="relative aspect-square border-4 border-ink bg-surface shadow-hard-sm flex items-center justify-center p-4 overflow-hidden">
	
	<!-- Inner animated shape with smoother transitions -->
	<div
		class="relative size-full transition-all duration-1000 ease-[var(--ease-fluid)]"
		style="
			background-color: {colors[colorIndex]};
			clip-path: {shapes[shapeIndex]};
		"
	>
		<!-- Pattern layer with its own smooth fade -->
		<div 
			class="absolute inset-0 opacity-15 transition-all duration-1000 ease-linear"
			style="
				background-image: {patterns[patternIndex]};
				background-size: 16px 16px;
			"
		></div>
	</div>

	<!-- Technical decoration -->
	<div class="absolute top-1 left-1 size-2 border-t-2 border-l-2 border-ink opacity-30"></div>
	<div class="absolute top-1 right-1 size-2 border-t-2 border-r-2 border-ink opacity-30"></div>
	<div class="absolute bottom-1 left-1 size-2 border-b-2 border-l-2 border-ink opacity-30"></div>
	<div class="absolute bottom-1 right-1 size-2 border-b-2 border-r-2 border-ink opacity-30"></div>
</div>
