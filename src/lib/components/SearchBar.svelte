<script lang='ts'>
  import { Search } from 'flowbite-svelte';
  import { search } from '$lib/apiCalls.js';
  import { hideDrawer, challengeId } from '$lib/stores/stores';
  import { queuedGuess, hasGuessesLeft, allGuesses } from '$lib/stores/guessStore'
  import { selectedTrack, setActiveToSelectedTrack } from '$lib/stores/audioStore';
  import TrackDetail from './TrackDetail.svelte';
  import type { DeezerTrack, ChallengeData } from '$lib/types';
  import { getContext } from 'svelte';

  export let placeholder: string;
  export let challengeTrack: ChallengeData | undefined = undefined;

  let q: string;
  let results: DeezerTrack[];
  let page = getContext('page');
  let searchTimeout: number;

  // Check if game is over (won or no guesses left)
  $: gameOver = page === 'guess' && challengeTrack && (
    !$hasGuessesLeft || 
    ($allGuesses.length > 0 && $allGuesses[$allGuesses.length - 1]?.trackId.toString() === challengeTrack?.Item?.deezer_id?.S)
  );

  function selectTrack(track: DeezerTrack) {
    if (gameOver) return;
    hideDrawer.set(false);
    selectedTrack.set(track);
    setActiveToSelectedTrack();
    challengeId.set('');
    q = ''; // Clear search input
  }

  function queueGuess(track: DeezerTrack) {
    if (gameOver) return;
    queuedGuess.set(track);
    q = ''; // Clear search input
  };

  $: {
    // Clear any existing timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    
    if (q && q.trim() && !gameOver) {
      searchTimeout = setTimeout(async () => {
        results = await search(q);
      }, 150);
    } else {
      results = [];
    }
  }
</script>


<div class='relative'>
  <div class='px-4 pt-4'>
    <Search
      size='lg'
      class='py-4 rounded-sm'
      bind:value={q}
      placeholder={gameOver ? "" : placeholder}
      disabled={gameOver}
    />
  </div>
  {#if results && results.length > 0 }
    <div class='absolute top-full left-0 right-0 bg-gray-800 border border-gray-600 rounded-b-lg shadow-lg z-50 max-h-96 overflow-y-auto mx-4'>
      <div class='flex flex-col'>
        {#each results as track}
          <button 
            on:click={() => {
              if (page === 'guess') queueGuess(track);
              else selectTrack(track);
            }}
            disabled={gameOver}
            class={`hover:bg-gray-700 border-b border-gray-600 last:border-b-0 ${gameOver ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <TrackDetail track={track} />
          </button>
        {/each}
      </div>
    </div>
  {/if}
</div>