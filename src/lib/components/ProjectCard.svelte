<script lang="ts">
	import { resolve } from '$app/paths';
	import { fade, fly } from 'svelte/transition';
	import type { Project } from '$lib/data/portfolio';

	let { project, featured = false } = $props<{ project: Project; featured?: boolean }>();
</script>

<article class:featured class="project-card panel" transition:fade>
	<div class="media" style={`--project-accent:${project.accent}`}>
		<img src={project.image} alt={`${project.title} interface preview`} loading="lazy" />
	</div>

	<div class="content">
		<div class="meta mono">
			<span>{project.category}</span>
			<span>{project.year}</span>
		</div>
		<h3>{project.title}</h3>
		<p>{project.description}</p>

		<ul class="metrics">
			{#each project.metrics as metric (metric)}
				<li transition:fly={{ y: 10, duration: 220 }}>{metric}</li>
			{/each}
		</ul>

		<div class="stack">
			{#each project.technologies as technology (technology)}
				<span>{technology}</span>
			{/each}
		</div>

		<div class="links">
			<a href={resolve('/projects/[slug]', { slug: project.slug })}>Explore case study</a>
			<button
				type="button"
				class="link-button"
				onclick={() => window.open(project.repoUrl, '_blank', 'noreferrer')}
			>
				Repository
			</button>
		</div>
	</div>
</article>

<style>
	.project-card {
		display: grid;
		gap: 1.25rem;
		padding: 1rem;
		border-radius: var(--radius-lg);
		overflow: hidden;
		height: 100%;
	}

	.project-card:hover {
		transform: translateY(-6px);
	}

	.media {
		position: relative;
		padding: 1rem;
		border-radius: calc(var(--radius-lg) - 8px);
		background:
			radial-gradient(circle at top, var(--project-accent), transparent 42%),
			linear-gradient(180deg, rgba(255, 255, 255, 0.06), transparent), #081120;
		border: 1px solid rgba(255, 255, 255, 0.08);
		overflow: hidden;
		min-height: 220px;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 18px;
	}

	.content {
		display: grid;
		gap: 1rem;
		padding: 0.4rem 0.35rem 0.2rem;
	}

	.meta {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		font-size: 0.78rem;
		text-transform: uppercase;
		letter-spacing: 0.14em;
		color: var(--muted);
	}

	h3 {
		font-size: clamp(1.5rem, 2vw, 2.15rem);
		font-weight: 700;
		letter-spacing: -0.04em;
	}

	p {
		line-height: 1.7;
		color: var(--muted);
	}

	.metrics,
	.stack {
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem;
		padding: 0;
		margin: 0;
		list-style: none;
	}

	.metrics li,
	.stack span {
		padding: 0.55rem 0.8rem;
		border-radius: 999px;
		background: rgba(var(--accent-rgb), 0.09);
		border: 1px solid var(--line);
		font-size: 0.88rem;
	}

	.stack span {
		background: transparent;
		color: var(--muted);
	}

	.links {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin-top: 0.4rem;
	}

	.links a {
		color: var(--accent);
	}

	.link-button {
		padding: 0;
		border: none;
		background: transparent;
		color: var(--accent);
		font: inherit;
	}

	.featured {
		grid-column: span 2;
	}

	@media (max-width: 960px) {
		.featured {
			grid-column: span 1;
		}
	}
</style>
