<script lang="ts">
	let { eyebrow, title, description } = $props<{
		eyebrow: string;
		title: string;
		description: string;
	}>();
</script>

<div class="section-heading">
	<div class="eyebrow">{eyebrow}</div>
	<h2>{title}</h2>
	<p>{description}</p>
</div>

<style>
	.section-heading {
		display: grid;
		gap: 1rem;
		max-width: 44rem;
	}

	h2 {
		font-size: clamp(2rem, 4vw, 3.8rem);
		line-height: 0.95;
		font-weight: 700;
		letter-spacing: -0.05em;
	}

	p {
		font-size: 1.05rem;
		line-height: 1.7;
		color: var(--muted);
	}
</style>
