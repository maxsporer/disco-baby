<script lang='ts'>
  import { Button, Search } from 'flowbite-svelte';
  import { search } from '$lib/apiCalls.js';
  import { selectedTrack, hideDrawer, challengeId } from '$lib/stores/stores';
  import TrackDetail from './TrackDetail.svelte';
  import type { DeezerTrack } from '$lib/types';

  export let placeholder: string;

  let q: string;
  let results: DeezerTrack[];
  let innerWidth = 0;

  function selectTrack(track: DeezerTrack) {
    hideDrawer.set(false);
    selectedTrack.set(track);
  }

  async function submitSearch(q: string) {
    challengeId.set('');
    results = await search(q);
  }

</script>

<svelte:window bind:innerWidth />

<form class='flex p-4' on:submit={() => submitSearch(q)}>
  <Search size='lg' class='py-4 rounded-r-none' bind:value={q} placeholder={placeholder} >
  </Search>
  <Button
    class='!p-2.5 rounded-l-none focus-within:ring-0 dark:focus-within:ring-0'
    on:click={() => submitSearch(q)}
  >
    Search
  </Button>
</form>

{#if results}
  <div class='flex flex-col overflow-y-auto overflow-x-hidden h-[calc(100%-88px)]'>
    {#each results as track}
      <button on:click={() => selectTrack(track)}>
        <TrackDetail track={track} isMobile={innerWidth <= 430}/>
      </button>
    {/each}
  </div>
{/if}
