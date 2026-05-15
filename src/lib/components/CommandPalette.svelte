<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import type { commandGroups as groupsType } from '$lib/data/portfolio';

	type CommandGroup = (typeof groupsType)[number];

	let {
		open = false,
		groups = [],
		onSelect
	} = $props<{
		open?: boolean;
		groups?: CommandGroup[];
		onSelect: (commandId: string) => void;
	}>();

	let query = $state('');
	let searchInput = $state<HTMLInputElement | null>(null);

	const filteredGroups = $derived(
		groups
			.map((group: CommandGroup) => ({
				...group,
				commands: group.commands.filter((command: CommandGroup['commands'][number]) =>
					`${command.title} ${command.hint}`.toLowerCase().includes(query.toLowerCase())
				)
			}))
			.filter((group: CommandGroup) => group.commands.length > 0)
	);

	$effect(() => {
		if (!open) {
			query = '';
			return;
		}

		searchInput?.focus();
	});

	function handleBackdropKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			onSelect('close');
		}
	}

	function handleDialogKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			onSelect('close');
		}
	}
</script>

{#if open}
	<div
		class="backdrop"
		role="button"
		tabindex="0"
		aria-label="Close command palette"
		transition:fade
		onclick={() => onSelect('close')}
		onkeydown={handleBackdropKeydown}
	>
		<div
			class="palette panel"
			role="dialog"
			aria-modal="true"
			aria-label="Command palette"
			tabindex="-1"
			transition:fly={{ y: 18, duration: 200 }}
			onclick={(event) => event.stopPropagation()}
			onkeydown={handleDialogKeydown}
		>
			<div class="input-row">
				<label class="sr-only" for="command-search">Search commands</label>
				<input
					id="command-search"
					class="mono"
					type="text"
					placeholder="Search commands, themes, or sections"
					bind:this={searchInput}
					bind:value={query}
				/>
				<span class="hint mono">ESC</span>
			</div>

			<div class="groups">
				{#each filteredGroups as group (group.label)}
					<section>
						<h3 class="mono">{group.label}</h3>
						<div class="command-list">
							{#each group.commands as command (command.id)}
								<button type="button" onclick={() => onSelect(command.id)}>
									<span>{command.title}</span>
									<small>{command.hint}</small>
								</button>
							{/each}
						</div>
					</section>
				{/each}
			</div>
		</div>
	</div>
{/if}

<style>
	.backdrop {
		position: fixed;
		inset: 0;
		z-index: 60;
		display: grid;
		place-items: start center;
		padding: 8vh 1rem 1rem;
		background: rgba(2, 7, 18, 0.54);
		backdrop-filter: blur(18px);
	}

	.palette {
		width: min(760px, 100%);
		border-radius: var(--radius-xl);
		padding: 1rem;
	}

	.input-row {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 0.35rem;
		margin-bottom: 1rem;
		border-radius: 22px;
		background: var(--surface-soft);
		border: 1px solid var(--line);
	}

	input {
		width: 100%;
		background: transparent;
		border: none;
		outline: none;
		padding: 1rem;
		font-size: 1rem;
		color: var(--text);
	}

	.hint {
		padding-right: 1rem;
		font-size: 0.8rem;
		color: var(--muted);
	}

	.groups {
		display: grid;
		gap: 1rem;
	}

	section {
		display: grid;
		gap: 0.75rem;
	}

	h3 {
		font-size: 0.82rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--muted);
	}

	.command-list {
		display: grid;
		gap: 0.7rem;
	}

	.command-list button {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		padding: 1rem 1.1rem;
		border-radius: 20px;
		text-align: left;
		background: transparent;
		color: var(--text);
		border: 1px solid var(--line);
	}

	.command-list button:hover {
		transform: translateY(-2px);
		border-color: rgba(var(--accent-rgb), 0.3);
		background: rgba(var(--accent-rgb), 0.08);
	}

	small {
		color: var(--muted);
	}

	@media (max-width: 640px) {
		.command-list button {
			flex-direction: column;
		}
	}
</style>
