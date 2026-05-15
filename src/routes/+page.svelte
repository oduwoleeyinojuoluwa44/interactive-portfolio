<script lang="ts">
	import { browser } from '$app/environment';
	import { enhance } from '$app/forms';
	import AmbientOrbs from '../lib/components/AmbientOrbs.svelte';
	import CommandPalette from '../lib/components/CommandPalette.svelte';
	import ProjectCard from '../lib/components/ProjectCard.svelte';
	import SectionHeading from '../lib/components/SectionHeading.svelte';
	import SkillMatrix from '../lib/components/SkillMatrix.svelte';
	import ThemeToggle from '../lib/components/ThemeToggle.svelte';
	import TimelineRail from '../lib/components/TimelineRail.svelte';
	import {
		capabilities,
		commandGroups,
		projects,
		skills,
		stats,
		timeline
	} from '../lib/data/portfolio';
	import {
		cycleAccent,
		initializePreferences,
		toggleMotion,
		toggleTheme
	} from '../lib/stores/preferences.svelte';
	import { flip } from 'svelte/animate';
	import { fade, fly } from 'svelte/transition';

	let { form } = $props<{
		form?: {
			success?: boolean;
			errors?: Record<string, string>;
			values?: { name?: string; email?: string; message?: string };
			mailtoHref?: string;
		};
	}>();

	const filters = [
		'All',
		'Frontend Systems',
		'Data Viz',
		'Full Stack',
		'Design Engineering'
	] as const;
	type Filter = (typeof filters)[number];

	let activeFilter = $state<Filter>('All');
	let paletteOpen = $state(false);
	let submitting = $state(false);

	const visibleProjects = $derived(
		activeFilter === 'All'
			? projects
			: projects.filter((project) => project.category === activeFilter)
	);

	const commandPreview = $derived.by(() => {
		if (activeFilter === 'All') {
			return 'status: all project lanes live';
		}

		return `status: filtered for ${activeFilter.toLowerCase()}`;
	});

	const formValues = $derived({
		name: form?.values?.name ?? '',
		email: form?.values?.email ?? '',
		message: form?.values?.message ?? ''
	});

	function scrollToId(id: string) {
		if (!browser) {
			return;
		}

		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	function executeCommand(commandId: string) {
		paletteOpen = false;

		const filtersByCommand: Record<string, Filter> = {
			'filter-all': 'All',
			'filter-frontend-systems': 'Frontend Systems',
			'filter-data-viz': 'Data Viz'
		};

		if (commandId in filtersByCommand) {
			activeFilter = filtersByCommand[commandId];
			scrollToId('projects');
			return;
		}

		if (commandId === 'toggle-theme') {
			toggleTheme();
			return;
		}

		if (commandId === 'toggle-motion') {
			toggleMotion();
			return;
		}

		if (commandId === 'cycle-accent') {
			cycleAccent();
			return;
		}

		if (commandId === 'go-projects') {
			scrollToId('projects');
			return;
		}

		if (commandId === 'go-skills') {
			scrollToId('skills');
			return;
		}

		if (commandId === 'go-contact') {
			scrollToId('contact');
			return;
		}
	}

	function downloadResume() {
		if (!browser) {
			return;
		}

		const link = document.createElement('a');
		link.href = '/Bamitale-Resume.txt';
		link.download = 'Bamitale-Resume.txt';
		link.click();
	}

	$effect(() => {
		if (!browser) {
			return;
		}

		initializePreferences();

		const onKeydown = (event: KeyboardEvent) => {
			if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
				event.preventDefault();
				paletteOpen = !paletteOpen;
			}

			if (event.key === 'Escape') {
				paletteOpen = false;
			}
		};

		window.addEventListener('keydown', onKeydown);
		return () => window.removeEventListener('keydown', onKeydown);
	});
</script>

<svelte:head>
	<title>Bamitale | Interactive Frontend Portfolio</title>
	<meta
		name="description"
		content="Immersive SvelteKit developer portfolio showcasing interaction design, performance thinking, and creative frontend engineering."
	/>
</svelte:head>

<AmbientOrbs />
<CommandPalette open={paletteOpen} groups={commandGroups} onSelect={executeCommand} />

<a class="skip-link" href="#content">Skip to content</a>

<div class="page-shell">
	<header class="shell topbar">
		<a href="#top" class="brand mono">BAMITALE/PORTFOLIO</a>
		<nav aria-label="Primary">
			<a href="#projects">Projects</a>
			<a href="#skills">Skills</a>
			<a href="#contact">Contact</a>
		</nav>
		<div class="actions">
			<button type="button" class="command-button panel mono" onclick={() => (paletteOpen = true)}>
				<span>Command palette</span>
				<kbd>Ctrl K</kbd>
			</button>
			<ThemeToggle compact />
		</div>
	</header>

	<main id="content">
		<section id="top" class="hero shell">
			<div class="hero-copy" transition:fly={{ y: 24, duration: 320 }}>
				<div class="eyebrow">SvelteKit • Motion-first • Production-minded</div>
				<h1>
					Frontend systems
					<span>that feel alive.</span>
				</h1>
				<p>
					I design and engineer immersive product interfaces that balance cinematic motion, clear
					information architecture, and performance discipline.
				</p>

				<div class="cta-row">
					<a class="primary-cta" href="#projects">Explore selected work</a>
					<button type="button" class="secondary-cta" onclick={downloadResume}>
						Download resume
					</button>
				</div>

				<div class="socials">
					<a href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
					<a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn</a>
					<a href="mailto:hello@yourdomain.dev">Email</a>
					<a href="https://cal.com/" target="_blank" rel="noreferrer">Schedule</a>
				</div>
			</div>

			<div class="hero-stage panel" transition:fade>
				<div class="hud">
					<div>
						<span class="label mono">Current focus</span>
						<strong>Interaction engineering</strong>
					</div>
					<div>
						<span class="label mono">System state</span>
						<strong>{commandPreview}</strong>
					</div>
				</div>

				<div class="radar">
					<div class="ring-a ring"></div>
					<div class="ring-b ring"></div>
					<div class="ring-c ring"></div>
					<div class="core">
						<span class="mono">SvelteKit</span>
					</div>
					<div class="node node-a">UX</div>
					<div class="node node-b">Perf</div>
					<div class="node node-c">A11y</div>
					<div class="node node-d">Motion</div>
				</div>

				<div class="hero-stats">
					{#each stats as stat (stat.label)}
						<div class="stat">
							<strong>{stat.value}</strong>
							<span>{stat.label}</span>
						</div>
					{/each}
				</div>
			</div>
		</section>

		<section class="shell narrative-grid">
			<div class="panel manifesto">
				<span class="eyebrow">Why this portfolio behaves like software</span>
				<p>
					The portfolio itself is the proof. Instead of a passive gallery, it uses routes, reactive
					filters, keyboard workflows, and calibrated motion to show how I think about frontend
					systems under real constraints.
				</p>
			</div>

			<div class="panel terminal">
				<div class="terminal-head">
					<span class="traffic"></span>
					<span class="traffic"></span>
					<span class="traffic"></span>
					<strong class="mono">portfolio-shell</strong>
				</div>
				<div class="terminal-body mono">
					<p>$ init portfolio --mode immersive</p>
					<p>$ load priorities</p>
					<p class="muted">interaction-design, accessibility, performance, originality</p>
					<p>$ open command-palette</p>
					<p class="success">ready: press Ctrl/Cmd + K</p>
				</div>
			</div>
		</section>

		<section id="projects" class="shell section-block">
			<div class="section-top">
				<SectionHeading
					eyebrow="Project Showcase"
					title="Work designed to be explored, not skimmed."
					description="Each project route goes deeper, but the overview grid is already interactive, filterable, and performance-conscious."
				/>
				<div class="filters" role="tablist" aria-label="Project categories">
					{#each filters as filter (filter)}
						<button
							type="button"
							role="tab"
							aria-selected={activeFilter === filter}
							class:active={activeFilter === filter}
							onclick={() => (activeFilter = filter)}
						>
							{filter}
						</button>
					{/each}
				</div>
			</div>

			<div class="project-grid">
				{#each visibleProjects as project, index (project.slug)}
					<div animate:flip>
						<ProjectCard {project} featured={index === 0 && visibleProjects.length > 1} />
					</div>
				{/each}
			</div>
		</section>

		<section id="skills" class="shell section-block split">
			<div class="column">
				<SectionHeading
					eyebrow="Capabilities"
					title="A frontend stack shaped by systems thinking."
					description="The goal is not just visual polish. It is product clarity, resilient architecture, and delightful interactions that still respect budgets."
				/>

				<div class="capability-list">
					{#each capabilities as capability (capability.title)}
						<article class="panel capability">
							<h3>{capability.title}</h3>
							<p>{capability.description}</p>
						</article>
					{/each}
				</div>

				<SkillMatrix groups={skills} />
			</div>

			<div class="column">
				<TimelineRail items={timeline} />
			</div>
		</section>

		<section class="shell section-block lab">
			<SectionHeading
				eyebrow="Creative Feature"
				title="A command-driven portfolio shell."
				description="The palette doubles as navigation, mode switching, and accessibility support. It is a small developer-tool gesture that reinforces the product identity."
			/>

			<div class="lab-grid">
				<div class="panel lab-card">
					<h3>Built for keyboard-first exploration</h3>
					<p>
						Open the command palette, filter projects, toggle motion, or change themes without
						chasing interface chrome.
					</p>
					<button type="button" class="primary-cta small" onclick={() => (paletteOpen = true)}>
						Launch command palette
					</button>
				</div>
				<div class="panel lab-card">
					<h3>Responsive by design</h3>
					<p>
						The layout shifts from cinematic two-column framing into touch-friendly stacked panels
						without losing hierarchy or interaction clarity.
					</p>
				</div>
				<div class="panel lab-card">
					<h3>Reduced motion support</h3>
					<p>
						Motion is expressive, but it is never mandatory. Preferences can be toggled in the UI
						and are persisted across visits.
					</p>
				</div>
			</div>
		</section>

		<section id="contact" class="shell section-block contact-section">
			<div class="contact-copy">
				<SectionHeading
					eyebrow="Contact"
					title="Let’s build something that earns a second look."
					description="This form validates on submit and prepares a clean mail draft, keeping the contact flow functional without exposing secrets."
				/>
				<div class="contact-points panel">
					<a href="mailto:hello@yourdomain.dev">hello@yourdomain.dev</a>
					<a href="https://cal.com/" target="_blank" rel="noreferrer">Book a working session</a>
					<a href="https://github.com/" target="_blank" rel="noreferrer">Browse code samples</a>
				</div>
			</div>

			<form
				class="panel contact-form"
				method="POST"
				action="?/contact"
				use:enhance={() => {
					submitting = true;
					return async ({ update }) => {
						await update();
						submitting = false;
					};
				}}
			>
				<div class="field">
					<label for="name">Name</label>
					<input id="name" name="name" type="text" value={formValues.name} autocomplete="name" />
					{#if form?.errors?.name}<small>{form.errors.name}</small>{/if}
				</div>

				<div class="field">
					<label for="email">Email</label>
					<input
						id="email"
						name="email"
						type="email"
						value={formValues.email}
						autocomplete="email"
					/>
					{#if form?.errors?.email}<small>{form.errors.email}</small>{/if}
				</div>

				<div class="field">
					<label for="message">Project brief</label>
					<textarea id="message" name="message" rows="6">{formValues.message}</textarea>
					{#if form?.errors?.message}<small>{form.errors.message}</small>{/if}
				</div>

				<button type="submit" class="primary-cta"
					>{submitting ? 'Preparing draft...' : 'Prepare email draft'}</button
				>

				{#if form?.success && form.mailtoHref}
					<div class="success-box" transition:fade>
						<p>Your message is validated and ready to send.</p>
						<button
							type="button"
							class="mail-button"
							onclick={() => browser && window.location.assign(form.mailtoHref!)}
						>
							Open email draft
						</button>
					</div>
				{/if}
			</form>
		</section>
	</main>
</div>

<style>
	:global(body) {
		margin: 0;
	}

	:global(main) {
		display: grid;
		gap: 4rem;
		padding-bottom: 5rem;
	}

	.page-shell {
		position: relative;
		padding: 1rem 0 3rem;
	}

	.topbar {
		position: sticky;
		top: 1rem;
		z-index: 30;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 2rem;
		padding: 0.85rem 1rem;
		border-radius: 999px;
		backdrop-filter: blur(20px);
		background: rgba(7, 17, 31, 0.58);
		border: 1px solid var(--line);
	}

	.brand {
		font-size: 0.8rem;
		letter-spacing: 0.18em;
		color: var(--muted);
	}

	nav,
	.actions,
	.socials,
	.cta-row,
	.hero-stats,
	.filters,
	.terminal-head {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
	}

	nav,
	.actions {
		gap: 0.65rem;
	}

	nav a {
		padding: 0.65rem 0.9rem;
		border-radius: 999px;
		color: var(--muted);
	}

	nav a:hover,
	.socials a:hover {
		color: var(--text);
		background: rgba(var(--accent-rgb), 0.08);
	}

	.command-button {
		display: inline-flex;
		align-items: center;
		gap: 0.7rem;
		padding: 0.8rem 1rem;
		border-radius: 999px;
		border: 1px solid var(--line);
		color: var(--muted);
		background: transparent;
	}

	kbd {
		padding: 0.2rem 0.4rem;
		border-radius: 8px;
		border: 1px solid var(--line);
		font-size: 0.75rem;
	}

	.hero,
	.split,
	.contact-section {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1.4rem;
		align-items: start;
	}

	.hero {
		padding-top: 2rem;
		min-height: calc(100vh - 7rem);
	}

	.hero-copy,
	.contact-copy,
	.column {
		display: grid;
		gap: 1.25rem;
	}

	h1 {
		font-size: clamp(3.4rem, 10vw, 7.4rem);
		line-height: 0.92;
		letter-spacing: -0.08em;
		margin: 0;
		max-width: 10ch;
	}

	h1 span {
		display: block;
		color: var(--accent);
	}

	.hero-copy p,
	.manifesto p,
	.lab-card p,
	.contact-points a,
	.field small {
		line-height: 1.75;
	}

	.hero-copy > p {
		max-width: 36rem;
		font-size: 1.1rem;
		color: var(--muted);
	}

	.cta-row,
	.socials,
	.filters {
		gap: 0.8rem;
	}

	.primary-cta,
	.secondary-cta,
	.filters button,
	.contact-points a {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.9rem 1.15rem;
		border-radius: 999px;
		border: 1px solid var(--line);
	}

	.primary-cta {
		background: linear-gradient(135deg, var(--accent), var(--accent-strong));
		color: #04111f;
		font-weight: 700;
	}

	.primary-cta:hover,
	.secondary-cta:hover,
	.filters button:hover {
		transform: translateY(-2px);
	}

	.secondary-cta,
	.filters button,
	.contact-points a {
		color: var(--muted);
		background: transparent;
	}

	.small {
		width: fit-content;
	}

	.socials a {
		padding: 0.4rem 0.75rem;
		border-radius: 999px;
		color: var(--muted);
	}

	.hero-stage {
		display: grid;
		gap: 1.2rem;
		padding: 1.2rem;
		border-radius: var(--radius-xl);
		min-height: 42rem;
	}

	.hud {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1rem;
	}

	.hud > div,
	.stat,
	.manifesto,
	.terminal,
	.capability,
	.lab-card,
	.contact-points {
		padding: 1.2rem;
		border-radius: var(--radius-lg);
		background: var(--surface-soft);
		border: 1px solid var(--line);
	}

	.label {
		display: block;
		margin-bottom: 0.45rem;
		font-size: 0.8rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--muted);
	}

	.radar {
		position: relative;
		display: grid;
		place-items: center;
		min-height: 24rem;
		border-radius: calc(var(--radius-xl) - 8px);
		background:
			radial-gradient(circle at center, rgba(var(--accent-rgb), 0.16), transparent 44%),
			linear-gradient(180deg, rgba(255, 255, 255, 0.05), transparent), #081120;
		overflow: hidden;
	}

	.ring,
	.core,
	.node {
		position: absolute;
		border-radius: 50%;
	}

	.ring {
		border: 1px solid rgba(var(--accent-rgb), 0.18);
		animation: pulse 6s ease-in-out infinite;
	}

	.ring-a {
		width: 18rem;
		height: 18rem;
	}

	.ring-b {
		width: 27rem;
		height: 27rem;
		animation-delay: -1.4s;
	}

	.ring-c {
		width: 36rem;
		height: 36rem;
		animation-delay: -2.8s;
	}

	.core {
		display: grid;
		place-items: center;
		width: 7.5rem;
		height: 7.5rem;
		background: linear-gradient(180deg, rgba(var(--accent-rgb), 0.55), rgba(24, 167, 255, 0.32));
		box-shadow: 0 0 50px rgba(var(--accent-rgb), 0.3);
	}

	.node {
		display: grid;
		place-items: center;
		width: 5rem;
		height: 5rem;
		font-size: 0.85rem;
		background: rgba(255, 255, 255, 0.07);
		border: 1px solid rgba(255, 255, 255, 0.12);
		backdrop-filter: blur(16px);
	}

	.node-a {
		top: 20%;
		left: 23%;
	}

	.node-b {
		top: 18%;
		right: 20%;
	}

	.node-c {
		bottom: 18%;
		left: 18%;
	}

	.node-d {
		bottom: 14%;
		right: 16%;
	}

	.hero-stats {
		gap: 1rem;
	}

	.stat {
		flex: 1 1 10rem;
		display: grid;
		gap: 0.45rem;
	}

	.stat strong {
		font-size: 2rem;
	}

	.stat span,
	.manifesto p,
	.terminal-body p,
	.capability p,
	.lab-card p,
	.contact-points a {
		color: var(--muted);
	}

	.narrative-grid,
	.section-top,
	.capability-list,
	.lab-grid {
		display: grid;
		gap: 1rem;
	}

	.narrative-grid {
		grid-template-columns: 1.2fr 0.8fr;
	}

	.terminal-head {
		gap: 0.45rem;
		margin-bottom: 1rem;
	}

	.traffic {
		width: 0.72rem;
		height: 0.72rem;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.18);
	}

	.terminal-body {
		font-size: 0.9rem;
	}

	.terminal-body p {
		margin: 0 0 0.75rem;
	}

	.success {
		color: var(--accent) !important;
	}

	.section-block {
		padding-top: 3rem;
	}

	.filters button.active {
		background: rgba(var(--accent-rgb), 0.18);
		color: var(--text);
		border-color: rgba(var(--accent-rgb), 0.28);
	}

	.project-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1rem;
	}

	.capability-list,
	.lab-grid {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}

	.capability,
	.lab-card {
		display: grid;
		gap: 0.75rem;
	}

	.contact-section {
		padding-bottom: 3rem;
	}

	.contact-points {
		display: grid;
		gap: 0.9rem;
	}

	.contact-form {
		display: grid;
		gap: 1rem;
		padding: 1.2rem;
		border-radius: var(--radius-xl);
	}

	.field {
		display: grid;
		gap: 0.45rem;
	}

	label {
		font-size: 0.94rem;
	}

	input,
	textarea {
		width: 100%;
		padding: 1rem 1.05rem;
		border-radius: 18px;
		border: 1px solid var(--line);
		background: rgba(255, 255, 255, 0.03);
		color: var(--text);
	}

	textarea {
		resize: vertical;
		min-height: 11rem;
	}

	small {
		color: var(--danger);
	}

	.success-box {
		display: grid;
		gap: 0.65rem;
		padding: 1rem;
		border-radius: 18px;
		background: rgba(var(--accent-rgb), 0.12);
		border: 1px solid rgba(var(--accent-rgb), 0.26);
	}

	.mail-button {
		width: fit-content;
		padding: 0;
		border: none;
		background: transparent;
		color: var(--accent);
		font: inherit;
	}

	.mail-button {
		color: var(--accent);
	}

	@keyframes pulse {
		0%,
		100% {
			transform: scale(0.98);
			opacity: 0.55;
		}

		50% {
			transform: scale(1.02);
			opacity: 1;
		}
	}

	@media (max-width: 1080px) {
		.hero,
		.split,
		.contact-section,
		.narrative-grid,
		.project-grid,
		.lab-grid,
		.capability-list {
			grid-template-columns: 1fr;
		}

		.hero-stage {
			min-height: auto;
		}
	}

	@media (max-width: 780px) {
		.topbar {
			position: static;
			display: grid;
			justify-content: stretch;
			border-radius: 28px;
		}

		nav,
		.actions,
		.hud {
			justify-content: flex-start;
		}

		h1 {
			max-width: none;
		}

		.ring-c {
			width: 28rem;
			height: 28rem;
		}
	}
</style>
