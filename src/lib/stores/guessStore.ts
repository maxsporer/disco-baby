import { writable, derived } from 'svelte/store';
import type { DeezerTrack } from '$lib/types';

// Type for storing essential guess data
export type GuessData = {
  trackId: string;
  artistId: number;
  artistName: string;
  trackTitle: string;
  albumCover: string;
  bigAlbumCover: string;
};

// Store all submitted guesses
export const allGuesses = writable<GuessData[]>([]);
export const queuedGuess = writable<DeezerTrack>(null);

// Constants
export const maxGuesses = 6;

// Derived stores from the guess array
export const guessCount = derived(allGuesses, ($allGuesses) => $allGuesses.length);
export const remainingGuesses = derived(guessCount, ($guessCount) => maxGuesses - $guessCount);
export const hasGuessesLeft = derived(guessCount, ($guessCount) => $guessCount < maxGuesses);

// Actions
export function addGuess(track: DeezerTrack): void {
  if (!track) return;
  
  const guessData: GuessData = {
    trackId: track.id,
    artistId: track.artist.id,
    artistName: track.artist.name,
    trackTitle: track.title,
    albumCover: track.album.cover_small,
    bigAlbumCover: track.album.cover_big 
  };
  
  allGuesses.update(guesses => [...guesses, guessData]);
}

export function resetGuesses(): void {
  allGuesses.set([]);
}

// Format guess history for sharing
export function formatGuessHistory(guesses: GuessData[], challengeTrack: any): string {
  const header = "🎵 My Disco Baby Score 🎵\n\n";
  
  const guessLines = guesses.map((guess, index) => {
    const guessNumber = `${index + 1}. `;
    
    // Determine status
    let status = "";
    if (guess.trackId.toString() === challengeTrack?.Item?.deezer_id?.S) {
      status = "✅ Correct";
    } else if (guess.artistId.toString() === challengeTrack?.Item?.artist_id?.S) {
      status = "🟡 Correct artist";
    } else {
      status = "❌ Incorrect";
    }
    
    return `${guessNumber}${status}`;
  }).join('\n');
  
  const attempts = `\nSolved in ${guesses.length}/${maxGuesses} attempts!`;
  const footer = "\n\nTry it yourself: [Challenge Link]";
  
  return header + guessLines + attempts + footer;
}
