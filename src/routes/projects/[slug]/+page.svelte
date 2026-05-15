<script lang="ts">
	import { resolve } from '$app/paths';

	let { data } = $props<{
		data: {
			project: {
				title: string;
				category: string;
				description: string;
				longDescription: string;
				impact: string;
				technologies: string[];
				metrics: string[];
				year: string;
				image: string;
				demoUrl: string;
				repoUrl: string;
			};
		};
	}>();
</script>

<svelte:head>
	<title>{data.project.title} | Bamitale</title>
	<meta name="description" content={data.project.description} />
</svelte:head>

<main class="detail shell">
	<button
		type="button"
		class="back mono"
		onclick={() => window.location.assign(`${resolve('/')}#projects`)}
	>
		Back to portfolio
	</button>

	<section class="hero panel">
		<div class="copy">
			<div class="eyebrow">{data.project.category} • {data.project.year}</div>
			<h1>{data.project.title}</h1>
			<p>{data.project.longDescription}</p>
			<div class="links">
				<button
					type="button"
					class="link-button"
					onclick={() => window.open(data.project.demoUrl, '_blank', 'noreferrer')}
				>
					Live context
				</button>
				<button
					type="button"
					class="link-button"
					onclick={() => window.open(data.project.repoUrl, '_blank', 'noreferrer')}
				>
					Repository
				</button>
			</div>
		</div>
		<div class="visual">
			<img src={data.project.image} alt={`${data.project.title} project preview`} />
		</div>
	</section>

	<section class="detail-grid">
		<article class="panel block">
			<h2>Impact</h2>
			<p>{data.project.impact}</p>
		</article>

		<article class="panel block">
			<h2>Key metrics</h2>
			<ul>
				{#each data.project.metrics as metric (metric)}
					<li>{metric}</li>
				{/each}
			</ul>
		</article>

		<article class="panel block">
			<h2>Technology stack</h2>
			<div class="chips">
				{#each data.project.technologies as technology (technology)}
					<span>{technology}</span>
				{/each}
			</div>
		</article>
	</section>
</main>

<style>
	.detail {
		display: grid;
		gap: 1rem;
		padding: 1rem 0 4rem;
	}

	.back {
		width: fit-content;
		padding: 0.75rem 1rem;
		border-radius: 999px;
		color: var(--muted);
		background: var(--surface);
		border: 1px solid var(--line);
	}

	.hero {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1rem;
		padding: 1rem;
		border-radius: var(--radius-xl);
	}

	.copy,
	.block {
		display: grid;
		gap: 1rem;
	}

	h1 {
		font-size: clamp(2.8rem, 7vw, 5.2rem);
		line-height: 0.95;
		letter-spacing: -0.06em;
		margin: 0;
	}

	p,
	li {
		line-height: 1.7;
		color: var(--muted);
	}

	.links,
	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 0.8rem;
	}

	.chips span {
		padding: 0.8rem 1rem;
		border-radius: 999px;
		border: 1px solid var(--line);
	}

	.link-button {
		padding: 0.8rem 1rem;
		border-radius: 999px;
		border: 1px solid var(--line);
		background: transparent;
		color: var(--accent);
		font: inherit;
	}

	.link-button {
		color: var(--accent);
	}

	.visual {
		padding: 1rem;
		border-radius: calc(var(--radius-xl) - 8px);
		background:
			radial-gradient(circle at top, rgba(var(--accent-rgb), 0.18), transparent 35%), #081120;
		border: 1px solid rgba(255, 255, 255, 0.08);
	}

	img {
		width: 100%;
		border-radius: 20px;
	}

	.detail-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1rem;
	}

	.block {
		padding: 1.2rem;
		border-radius: var(--radius-lg);
	}

	ul {
		margin: 0;
		padding-left: 1rem;
	}

	.chips span {
		background: rgba(var(--accent-rgb), 0.1);
	}

	@media (max-width: 960px) {
		.hero,
		.detail-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
