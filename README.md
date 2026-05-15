# Interactive Developer Portfolio

An immersive SvelteKit portfolio built as a frontend experience rather than a static profile page. The app combines cinematic layout composition, route-based project stories, a command-palette creative feature, responsive design, and a validated contact flow.

## Setup

```bash
npm install
npm run dev
```

Production commands:

```bash
npm run check
npm run lint
npm run build
```

## Architecture

- `src/routes/+page.svelte`: the main portfolio experience, including hero, filtering, creative feature, and contact section.
- `src/routes/+page.server.ts`: progressive-enhancement contact action with validation and sanitized mailto generation.
- `src/routes/projects/[slug]`: route-level project case studies to demonstrate routing and code splitting.
- `src/lib/data/portfolio.ts`: structured content model for projects, stats, commands, and capability copy.
- `src/lib/components/*`: reusable UI pieces for the command palette, cards, timeline, theming controls, and section headers.
- `src/lib/stores/preferences.svelte.ts`: persisted theme, accent, and motion preferences.

## Animation Decisions

- Used native Svelte transitions (`fade`, `fly`) for lightweight entrance motion.
- Used `animate:flip` for responsive project-grid reflow during filtering.
- Kept large motion moments concentrated in the hero radar, ambient background, and command palette so the site feels alive without becoming noisy.
- Added reduced-motion support and a manual motion toggle so users can opt down from the cinematic defaults.

## Performance Optimization Techniques

- Kept the stack dependency-light and relied mostly on native SvelteKit features.
- Split deeper project content into route-level pages instead of forcing everything into a single bundle.
- Used local SVG artwork for sharp visuals with small asset weight.
- Limited always-on animation to CSS transforms and opacity-friendly effects.
- Lazy-loaded project preview images in the showcase grid.

## Accessibility Considerations

- Semantic landmarks and headings across sections.
- Skip link for keyboard users.
- Visible focus states and keyboard-usable command palette trigger.
- Reduced-motion support through both `prefers-reduced-motion` and a persisted manual toggle.
- Form validation messaging tied directly to each input.

## Trade-offs

- The contact experience uses validated mail integration instead of a secret-backed email API so the project remains deployable without exposing credentials.
- Social links and resume content are scaffolded placeholders because personal profile details were not supplied in the brief.
- The portfolio prioritizes a single polished home route plus routed project detail pages over a larger multi-page content system.
