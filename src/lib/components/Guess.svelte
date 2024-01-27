<script lang='ts'>
  import TrackDetail from "./TrackDetail.svelte";
  import { currentGuess, queuedGuess } from "$lib/stores/stores";
  import type { ChallengeData, DeezerTrack } from "$lib/types";
  import { Button } from "flowbite-svelte";
  import { ArrowRightSolid } from "flowbite-svelte-icons";

  export let challengeTrack: ChallengeData;

  function submitGuess(track: DeezerTrack) {
    queuedGuess.set(null);
    currentGuess.set(track);
  }
</script>

{#if $queuedGuess || $currentGuess}
  <div class='flex items-center justify-between w-full mx-4 border-2 border-slate-500 min-h-[68px]'>
    {#if $queuedGuess}
      <TrackDetail track={$queuedGuess} className='mb-2'/>
      <Button
        class='w-12 h-full mr-3 focus-within:ring-0 dark:focus-within:ring-0 rounded-sm'
        on:click={() => submitGuess($queuedGuess)}
      >
        <ArrowRightSolid />
      </Button>
    {:else if $currentGuess?.id.toString() === challengeTrack?.Item?.deezer_id?.S}
      <div class='px-4 text-green-600'>correct</div>
    {:else if $currentGuess?.id.toString() !== challengeTrack?.Item?.deezer_id?.S}
      <div class='px-4 text-red-600'>incorrect</div>
    {/if}
  </div>
{/if}
