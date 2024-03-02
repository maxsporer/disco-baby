import { writable } from 'svelte/store';
import type { DeezerTrack } from '$lib/types';

export const hideDrawer = writable<boolean>(true);
export const selectedTrack = writable<DeezerTrack>(null);
export const challengeId = writable<string>();
export const postRedirectPath = writable<string>('');
export const queuedGuess = writable<DeezerTrack>(null);
export const currentGuess = writable<DeezerTrack>(null);
export const lastChallenge = writable<string>();
