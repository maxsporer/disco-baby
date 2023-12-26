import { writable } from 'svelte/store';
import type { DeezerTrack } from '$lib/types';

export const hideDrawer = writable<boolean>(true);
export const selectedTrack = writable<DeezerTrack>();
export const challengeId = writable<string>();
export const postRedirectPath = writable<string>('');
