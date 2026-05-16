<script lang="ts">
	import { page } from '$app/state';
	import Logo from './Logo.svelte';
	import ThemeToggle from './ThemeToggle.svelte';
	import PaletteTrigger from './PaletteTrigger.svelte';

	const links = [
		{ href: '/work', label: 'Work' },
		{ href: '/about', label: 'About' },
		{ href: '/contact', label: 'Contact' }
	];

	let mobileOpen = $state(false);

	function isActive(href: string) {
		// /work and /work/[slug] both highlight the Work link
		return href === '/' ? page.url.pathname === '/' : page.url.pathname.startsWith(href);
	}
</script>

<header
	class="sticky top-0 z-40 border-b-4 border-ink bg-bg/95"
>
	<div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
		<Logo />

		<!-- Desktop nav -->
		<nav class="hidden items-center gap-1 md:flex" aria-label="Primary">
			{#each links as link (link.href)}
				{@const active = isActive(link.href)}
				<a
					href={link.href}
					aria-current={active ? 'page' : undefined}
					class="relative px-3 py-1.5 font-mono text-xs font-black tracking-[0.2em] uppercase transition-colors duration-200 {active
						? 'bg-accent text-accent-ink border-2 border-ink shadow-[2px_2px_0_0_#000]'
						: 'text-ink-muted hover:text-ink'}"
				>
					{link.label}
				</a>
			{/each}
		</nav>

		<div class="flex items-center gap-2">
			<PaletteTrigger />
			<ThemeToggle />

			<!-- Mobile menu trigger -->
			<button
				type="button"
				onclick={() => (mobileOpen = !mobileOpen)}
				aria-expanded={mobileOpen}
				aria-controls="mobile-nav"
				aria-label="Toggle menu"
				class="inline-flex size-9 items-center justify-center border-4 border-ink bg-accent text-accent-ink transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[2px_2px_0_0_#000] md:hidden"
			>
				<svg
					class="size-4 text-ink"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="square"
					aria-hidden="true"
				>
					{#if mobileOpen}
						<path d="M6 6L18 18M6 18L18 6" />
					{:else}
						<path d="M4 7h16M4 12h16M4 17h16" />
					{/if}
				</svg>
			</button>
		</div>
	</div>

	<!-- Mobile menu panel -->
	{#if mobileOpen}
		<nav id="mobile-nav" aria-label="Primary mobile" class="border-t border-border bg-bg md:hidden">
			<ul class="flex flex-col px-6 py-3 sm:px-10">
				{#each links as link (link.href)}
					{@const active = isActive(link.href)}
					<li>
						<a
							href={link.href}
							aria-current={active ? 'page' : undefined}
							onclick={() => (mobileOpen = false)}
							class="block py-3 font-mono text-sm tracking-[0.2em] uppercase transition-colors {active
								? 'text-accent'
								: 'text-ink-muted hover:text-ink'}"
						>
							{link.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	{/if}
</header>
