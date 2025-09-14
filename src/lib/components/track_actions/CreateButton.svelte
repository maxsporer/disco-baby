<script lang="ts">
  import type { DeezerTrack } from "$lib/types";
  import { Button, Spinner } from 'flowbite-svelte';
  import { create } from '$lib/apiCalls';
  import add_song from '$lib/svgs/add_song.svg';
  import { challengeId } from "$lib/stores/stores";

  export let track: DeezerTrack;

  let waiting: boolean = false;

  async function createTrack(track: DeezerTrack) {
    waiting = !waiting;
    await setTimeout(async () => {
      create(track).then((id) => challengeId.set(id));
      waiting = !waiting;
    }, 500);
  }
</script>

{#if !waiting}
  <Button
    class='w-12 h-12 p-2.5 rounded-full'
    on:click={() => createTrack(track)}
  >
    <img src={add_song} alt='' tabindex="-1" />
  </Button>
{:else}
  <Spinner class='w-12 h-12' />
{/if}
