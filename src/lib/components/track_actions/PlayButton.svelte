<script lang='ts'>
  import { Button } from 'flowbite-svelte';
  import { PlaySolid, PauseSolid } from 'flowbite-svelte-icons';

  export let src: string;
  export let showTime: boolean = false;

  let audio: HTMLAudioElement;
  let isPlaying: boolean = false;
  let currentTime: string;
  let duration: string;

  setInterval(() => {
    if (audio?.duration && !duration) duration = new Date(audio.duration * 1000).toISOString().slice(15, 19);
    if (audio?.currentTime) currentTime = new Date(audio.currentTime * 1000).toISOString().slice(15, 19);
  }, 100);
</script>

<audio src={src} bind:this={audio} />
<div class='flex items-center justify-evenly'>
  <div>
    {#if showTime}
      {currentTime ? currentTime : '0:00'}
    {/if}
  </div>
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
  <div>
    {#if showTime}
      {duration ? duration : '0:30'}
    {/if}
  </div>
</div>
