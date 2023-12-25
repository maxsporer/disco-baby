<script lang="ts">
  import { Button } from 'flowbite-svelte';
  import { PlaySolid, PauseSolid } from 'flowbite-svelte-icons';

  export let src: string;
  let audio: HTMLAudioElement;
  let isPlaying: boolean = false;
</script>

<audio src={src} bind:this={audio} />
<Button
  class='w-12 h-12 rounded-full focus-within:ring-0 dark:focus-within:ring-0'
  on:click={() => {
    isPlaying ? audio.pause() : audio.play();
    isPlaying = !isPlaying;
  }}
>
  {#if isPlaying}
    <PauseSolid />
  {:else}
    <PlaySolid />
  {/if}
</Button>
