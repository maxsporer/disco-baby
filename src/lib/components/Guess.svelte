<script lang='ts'>
  import { allGuesses, queuedGuess, addGuess, formatGuessHistory, remainingGuesses } from "$lib/stores/guessStore";
  import { setActiveToChallengeAudio } from "$lib/stores/audioStore";
  import { playAudio } from "$lib/audioControls";
  import type { ChallengeData, DeezerTrack } from "$lib/types";
  import { Button, Toast } from "flowbite-svelte";
  import { ArrowRightSolid } from "flowbite-svelte-icons";
  import Icon from '@iconify/svelte';
  import { page } from '$app/stores';

  export let challengeTrack: ChallengeData;

  let shareToastOpen = false;
  let challengeLink = '';

  // Set challenge link when page loads
  $: if ($page?.url?.origin) {
    challengeLink = `${$page.url.origin}${$page.url.pathname}${$page.url.search}`;
  }

  function submitGuess(track: DeezerTrack) {
    queuedGuess.set(null);
    addGuess(track);
  }

  // Get the most recent guess from allGuesses
  $: mostRecentGuess = $allGuesses[$allGuesses.length - 1];

  // Check if user has won
  $: hasWon = $allGuesses.length > 0 && mostRecentGuess?.trackId.toString() === challengeTrack?.Item?.deezer_id?.S;

  // Play the song when user wins
  $: if (hasWon) {
    setActiveToChallengeAudio();
    
    // Auto-play the song after a short delay
    setTimeout(() => {
      playAudio();
    }, 500);
  }
</script>

{#if $queuedGuess || $allGuesses.length > 0}
  <div class='mx-4'>
    {#if $allGuesses.length > 0}
      <div class='my-2'>
        <div class='text-sm text-gray-200 text-center'>
          {$remainingGuesses} guess{$remainingGuesses === 1 ? '' : 'es'} remaining
        </div>
      </div>
      <div class='flex flex-col gap-2 mb-2'>
        {#each $allGuesses as guess, index}
          <div class='border border-slate-300 p-1 rounded flex items-center gap-3'>
            <img src={guess.albumCover} alt="Album cover" class='w-12 h-12 rounded' />
            <div class='flex-1 min-w-0'>
              <div class='font-medium truncate'>{guess.trackTitle}</div>
              <div class='text-sm text-gray-400 truncate'>{guess.artistName}</div>
            </div>
            {#if guess.trackId.toString() === challengeTrack?.Item?.deezer_id?.S}
              <div class='flex items-center gap-1'>
                <span class='text-sm text-gray-300'>correct</span>
                <div class='w-10 h-10 flex items-center justify-center text-green-600 text-2xl'>✓</div>
              </div>
            {:else if guess.artistId.toString() === challengeTrack?.Item?.artist_id?.S}
              <div class='flex items-center gap-1'>
                <span class='text-sm text-gray-300'>correct artist</span>
                <div class='w-10 h-10 flex items-center justify-center text-yellow-600 text-2xl'>●</div>
              </div>
            {:else}
              <div class='flex items-center gap-1'>
                <span class='text-sm text-gray-300'>incorrect</span>
                <div class='w-10 h-10 flex items-center justify-center text-red-600 text-2xl'>✗</div>
              </div>
            {/if}
          </div>
        {/each}
      </div>
      
      {#if hasWon}
        <div class='border border-primary-300 p-2 rounded bg-gray-700 mb-2 flex items-center gap-3'>
          <div class='flex-1'>
            <div class='font-medium'>Nice job!</div>
            <div class='text-sm text-gray-200'>Keep it up, proud of you.</div>
          </div>
          <div class='flex gap-2'>
            <Button
              on:click={async () => {
                const historyText = formatGuessHistory($allGuesses, challengeTrack).replace('[Challenge Link]', challengeLink);
                try {
                  await navigator.clipboard.writeText(historyText);
                  shareToastOpen = true;
                  setTimeout(() => shareToastOpen = false, 2500);
                } catch (error) {
                  console.log('Error copying to clipboard:', error);
                }
              }}
              class='w-10 h-10 p-0 bg-primary-600 hover:bg-primary-700 focus-within:ring-0 dark:focus-within:ring-0'
            >
              <Icon icon="lucide:copy" class="w-5 h-5" />
            </Button>
            {#if navigator.share != undefined}
              <Button
                on:click={async () => {
                  const historyText = formatGuessHistory($allGuesses, challengeTrack).replace('[Challenge Link]', challengeLink);
                  try {
                    await navigator.share({
                      title: 'My Disco Baby Guesses',
                      text: historyText
                    });
                  } catch (error) {
                    console.log('Error sharing:', error);
                  }
                }}
                class='w-10 h-10 p-0 bg-white hover:bg-gray-100 focus-within:ring-0 dark:focus-within:ring-0 text-primary-600'
              >
                <Icon icon="tabler:share-2" class="w-5 h-5" />
              </Button>
            {/if}
          </div>
        </div>
      {/if}
    {/if}
    
    {#if $queuedGuess}
      <div class='flex items-center justify-between border border-slate-300 py-1 pl-1 pr-2 rounded mb-2'>
        <div class='flex items-center gap-3 flex-1 min-w-0'>
          <img src={$queuedGuess.album.cover_small} alt="Album cover" class='w-12 h-12 rounded' />
          <div class='flex-1 min-w-0'>
            <div class='font-medium truncate'>{$queuedGuess.title}</div>
            <div class='text-sm text-gray-600 truncate'>{$queuedGuess.artist.name}</div>
          </div>
        </div>
        <Button
          class='w-8 h-8 p-0 focus-within:ring-0 dark:focus-within:ring-0 rounded'
          on:click={() => submitGuess($queuedGuess)}
        >
          <ArrowRightSolid />
        </Button>
      </div>
    {/if}
  </div>
{/if}

<Toast
  bind:open={shareToastOpen}
  class='absolute z-50 bottom-3 left-0 right-0 mx-auto w-fit'
>
  Guess history copied to clipboard!
</Toast>
