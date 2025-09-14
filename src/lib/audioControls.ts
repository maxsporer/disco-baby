import { get } from 'svelte/store';
import { audioElement, activeAudioSrc, isPlaying } from '$lib/stores/audioStore';

export function handlePlayPause() {
  const audio = get(audioElement);
  const src = get(activeAudioSrc);
  const playing = get(isPlaying);

  if (audio && src) {
    if (playing) {
      audio.pause();
      isPlaying.set(false);
    } else {
      audio.play().then(() => {
        isPlaying.set(true);
      }).catch(error => {
        console.error('Failed to play audio:', error);
        isPlaying.set(false);
      });
    }
  }
}

export function pauseAudio() {
  const audio = get(audioElement);
  if (audio) {
    audio.pause();
    isPlaying.set(false);
  }
}

export function playAudio() {
  const audio = get(audioElement);
  const src = get(activeAudioSrc);
  
  if (audio && src) {
    audio.play().then(() => {
      isPlaying.set(true);
    }).catch(error => {
      console.error('Failed to play audio:', error);
      isPlaying.set(false);
    });
  }
}
