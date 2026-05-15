<script lang="ts">
	import type { skills as skillsType } from '$lib/data/portfolio';

	type SkillGroup = (typeof skillsType)[number];

	let { groups } = $props<{ groups: SkillGroup[] }>();
</script>

<div class="matrix">
	{#each groups as group (group.group)}
		<section class="panel card">
			<h3>{group.group}</h3>
			<div class="items">
				{#each group.items as item (item)}
					<span>{item}</span>
				{/each}
			</div>
		</section>
	{/each}
</div>

<style>
	.matrix {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1rem;
	}

	.card {
		padding: 1.4rem;
		border-radius: var(--radius-lg);
		display: grid;
		gap: 1rem;
	}

	h3 {
		font-size: 1.1rem;
	}

	.items {
		display: flex;
		flex-wrap: wrap;
		gap: 0.7rem;
	}

	span {
		padding: 0.7rem 0.85rem;
		border-radius: 16px;
		background: var(--surface-soft);
		border: 1px solid var(--line);
		font-size: 0.92rem;
	}

	@media (max-width: 720px) {
		.matrix {
			grid-template-columns: 1fr;
		}
	}
</style>
