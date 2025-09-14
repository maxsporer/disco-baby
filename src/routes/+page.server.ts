import { redirect, fail } from '@sveltejs/kit';
import { PASSPHRASE } from '$env/static/private';
import { postRedirectPath } from '$lib/stores/stores.js';

type status = 307 | 300 | 301 | 302 | 303 | 304 | 305 | 306 | 308
export function load({ cookies }) {
	if (cookies.get('allowed')) {
		route(307);
	}
}

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		
		if (data.get('passphrase') === PASSPHRASE) {
			cookies.set('allowed', 'true', {
				secure: false,
				path: '/'
			});
			route(303);
		}

		return fail(403, {
			incorrect: true
		});
	}
};

function route(code: status) {
	postRedirectPath.subscribe((path) => {
		redirect(code, path ? path : '/home');
	});
}
