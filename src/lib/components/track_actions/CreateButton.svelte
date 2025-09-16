<script lang="ts">
  import type { DeezerTrack } from "$lib/types";
  import { Button, Spinner } from 'flowbite-svelte';
  import { create } from '$lib/apiCalls';
  import add_song from '$lib/svgs/add_song.svg';
  import { challengeId } from "$lib/stores/stores";

  export let track: DeezerTrack;

  let waiting: boolean = false;

  async function createTrack(track: DeezerTrack) {
    waiting = true;
    try {
      const result = await create(track);
      if (result.error) {
        console.error('Failed to create challenge:', result.error);
        // Handle error - could show a toast or alert
      } else {
        challengeId.set(result);
      }
    } catch (error) {
      console.error('Network error:', error);
      // Handle network error
    } finally {
      waiting = false;
    }
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
