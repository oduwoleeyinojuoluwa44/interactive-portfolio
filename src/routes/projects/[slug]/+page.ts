import { error } from '@sveltejs/kit';
import { getProjectBySlug, projects } from '../../../lib/data/portfolio';

export function entries() {
	return projects.map((project) => ({ slug: project.slug }));
}

export function load({ params }) {
	const project = getProjectBySlug(params.slug);

	if (!project) {
		throw error(404, 'Project not found');
	}

	return { project };
}
