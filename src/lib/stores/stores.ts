import { writable } from 'svelte/store';

export const hideDrawer = writable<boolean>(true);
export const challengeId = writable<string>();
export const postRedirectPath = writable<string>('');
export const lastChallenge = writable<string>();
