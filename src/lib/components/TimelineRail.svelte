<script lang="ts">
	import type { timeline as timelineType } from '$lib/data/portfolio';

	type TimelineItem = (typeof timelineType)[number];

	let { items } = $props<{ items: TimelineItem[] }>();
</script>

<div class="timeline">
	{#each items as item (item.period)}
		<article class="item">
			<div class="dot" aria-hidden="true"></div>
			<div class="content panel">
				<span class="period mono">{item.period}</span>
				<h3>{item.title}</h3>
				<p>{item.description}</p>
			</div>
		</article>
	{/each}
</div>

<style>
	.timeline {
		position: relative;
		display: grid;
		gap: 1rem;
	}

	.timeline::before {
		content: '';
		position: absolute;
		left: 13px;
		top: 0;
		bottom: 0;
		width: 1px;
		background: linear-gradient(var(--accent), transparent);
		opacity: 0.55;
	}

	.item {
		position: relative;
		display: grid;
		grid-template-columns: 28px 1fr;
		gap: 1rem;
		align-items: start;
	}

	.dot {
		width: 28px;
		height: 28px;
		border-radius: 50%;
		background: rgba(var(--accent-rgb), 0.14);
		border: 1px solid rgba(var(--accent-rgb), 0.4);
		box-shadow: 0 0 24px rgba(var(--accent-rgb), 0.35);
	}

	.content {
		padding: 1.2rem;
		border-radius: var(--radius-lg);
		display: grid;
		gap: 0.55rem;
	}

	.period {
		font-size: 0.82rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--accent);
	}

	p {
		color: var(--muted);
		line-height: 1.7;
	}
</style>
