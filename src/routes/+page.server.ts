import { fail } from '@sveltejs/kit';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitize(value: string) {
	return value.replace(/[<>]/g, '').replace(/\s+/g, ' ').trim();
}

export const actions = {
	contact: async ({ request }) => {
		const formData = await request.formData();

		const name = sanitize(String(formData.get('name') ?? ''));
		const email = sanitize(String(formData.get('email') ?? ''));
		const message = sanitize(String(formData.get('message') ?? ''));

		const values = { name, email, message };
		const errors: Record<string, string> = {};

		if (name.length < 2) {
			errors.name = 'Tell me your name so I know how to reply.';
		}

		if (!emailPattern.test(email)) {
			errors.email = 'Add a valid email address.';
		}

		if (message.length < 24) {
			errors.message = 'Share a little more context so I can help well.';
		}

		if (Object.keys(errors).length > 0) {
			return fail(400, { success: false, errors, values });
		}

		const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
		const body = encodeURIComponent(
			`Hi Bamitale,%0D%0A%0D%0A${message}%0D%0A%0D%0AReply to: ${email}`
		);

		return {
			success: true,
			values: { name: '', email: '', message: '' },
			mailtoHref: `mailto:hello@yourdomain.dev?subject=${subject}&body=${body}`
		};
	}
};
