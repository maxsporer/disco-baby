import { redirect } from '@sveltejs/kit';
import { postRedirectPath } from '$lib/stores/stores.js';

export function load({ cookies, url }) {
	if (!cookies.get('allowed')) {
		postRedirectPath.set(url.pathname + url.search);
		redirect(307, '/');
	}
}
