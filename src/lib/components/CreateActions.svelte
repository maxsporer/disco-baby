<script lang="ts">
  import type { DeezerTrack } from "$lib/types";
  import { Button, Spinner } from 'flowbite-svelte';
  import PlayButton from './PlayButton.svelte';
  import { create } from '$lib/apiCalls';
  import add_song from '$lib/svgs/add_song.svg';
  import { challengeId } from "$lib/stores/stores";

  export let track: DeezerTrack;

  let waiting: boolean = false;
</script>

<div class='flex items-center justify-center gap-x-4'>
  <PlayButton src={track.preview} />
  {#if !waiting}
    <Button
      class='w-12 h-12 p-2.5 rounded-full focus-within:ring-0 dark:focus-within:ring-0'
      on:click={async () => {
        waiting = !waiting;
        await setTimeout(async () => {
          create(track).then((id) => challengeId.set(id));
          waiting = !waiting;
        }, 500);
      }}
    >
      <img src={add_song} alt=''/>
    </Button>
  {:else}
    <Spinner class='w-12 h-12'/>
  {/if}
</div>
