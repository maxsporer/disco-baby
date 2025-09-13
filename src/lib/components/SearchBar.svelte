<script lang='ts'>
  import { Search } from 'flowbite-svelte';
  import { search } from '$lib/apiCalls.js';
  import { hideDrawer, challengeId, queuedGuess } from '$lib/stores/stores';
  import { selectedTrack, setActiveToSelectedTrack } from '$lib/stores/audioStore';
  import TrackDetail from './TrackDetail.svelte';
  import type { DeezerTrack } from '$lib/types';
  import { getContext } from 'svelte';

  export let placeholder: string;

  let q: string;
  let results: DeezerTrack[];
  let page = getContext('page');

  function selectTrack(track: DeezerTrack) {
    hideDrawer.set(false);
    selectedTrack.set(track);
    setActiveToSelectedTrack();
    challengeId.set('');
  }

  function queueGuess(track: DeezerTrack) {
    queuedGuess.set(track);
  };

  $: if (q) setTimeout(async () => results = await search(q), 150);
</script>


<div class='p-4 gap-x-4 flex flex-col h-full'>
  <Search
    size='lg'
    class='py-4 rounded-sm'
    bind:value={q}
    placeholder={placeholder}
  />
  {#if results}
    <div class='flex flex-col overflow-y-auto overflow-x-hidden'>
      {#each results as track}
        <button on:click={() => {
          if (page === 'guess') queueGuess(track); 
          else selectTrack(track);
        }}>
          <TrackDetail track={track} />
        </button>
      {/each}
    </div>
  {/if}
</div>
