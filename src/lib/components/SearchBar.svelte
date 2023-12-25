<script lang="ts">
  import { Button, Search } from "flowbite-svelte";
  import { search } from "$lib/apiCalls.js";
  import { selectedTrack, hideDrawer } from "$lib/stores/stores";
  import TrackDetail from "./TrackDetail.svelte";
  import type { DeezerTrack } from "$lib/types";

  let q: string;
  let results: DeezerTrack[];

  function selectTrack(track: DeezerTrack) {
    hideDrawer.set(false);
    selectedTrack.set(track);
  }
</script>

<div class="flex p-4">
  <Search size="lg" class="py-4" bind:value={q}>
    <Button
      class="!p-2.5 mr-2"
      on:click={async () => {
        results = await search(q);
      }}
    >
      Search
    </Button>
  </Search>
</div>

{#if results}
  <div class="flex flex-col h-screen overflow-y-auto">
    {#each results as track}
      <button on:click={() => selectTrack(track)}>
        <TrackDetail track={track} />
      </button>
    {/each}
  </div>
{/if}
