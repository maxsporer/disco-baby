import { writable, derived } from 'svelte/store';
import type { DeezerTrack } from '$lib/types';

// Core audio state
export const audioElement = writable<HTMLAudioElement | null>(null);
export const selectedTrack = writable<DeezerTrack>(null);
export const isPlaying = writable(false);
export const currentTime = writable(0);
export const duration = writable(0);

// Separate audio sources for different contexts
export const challengeAudioSrc = writable<string>('');
export const selectedTrackAudioSrc = derived(
  selectedTrack,
  ($selectedTrack) => $selectedTrack?.preview || ''
);

// Current active audio source (set explicitly based on context)
export const activeAudioSrc = writable<string>('');

// Derived stores
export const progress = derived(
  [currentTime, duration],
  ([$currentTime, $duration]) => $duration ? ($currentTime / $duration) * 100 : 0
);

export const currentTimeFormatted = derived(
  currentTime,
  ($currentTime) => new Date($currentTime * 1000).toISOString().slice(15, 19)
);

export const durationFormatted = derived(
  duration,
  ($duration) => $duration ? new Date($duration * 1000).toISOString().slice(15, 19) : '0:30'
);

// Helper functions to set active audio context
export function setActiveToChallengeAudio() {
  challengeAudioSrc.subscribe(src => activeAudioSrc.set(src))();
  isPlaying.set(false);
}

export function setActiveToSelectedTrack() {
  selectedTrackAudioSrc.subscribe(src => activeAudioSrc.set(src))();
}

// Reset audio state when active source changes
activeAudioSrc.subscribe(() => {
  isPlaying.set(false);
  currentTime.set(0);
  duration.set(0);
});
