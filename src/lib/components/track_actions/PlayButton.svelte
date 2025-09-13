<script lang='ts'>
  import { Button } from 'flowbite-svelte';
  import { PlaySolid, PauseSolid } from 'flowbite-svelte-icons';
  import { 
    audioElement, 
    activeAudioSrc, 
    isPlaying, 
    currentTime, 
    duration, 
    currentTimeFormatted, 
    durationFormatted 
  } from '$lib/stores/audioStore';

  export let showTime: boolean = false;

  let audio: HTMLAudioElement;

  // Update store when audio element is ready
  $: if (audio) {
    audioElement.set(audio);
  }

  // Update time and duration in store
  setInterval(() => {
    if (audio?.duration && $duration === 0) {
      duration.set(audio.duration);
    }
    if (audio?.currentTime !== undefined) {
      currentTime.set(audio.currentTime);
    }
  }, 100);

  function handlePlayPause() {
    if (audio) {
      if ($isPlaying) {
        audio.pause();
        isPlaying.set(false);
      } else {
        audio.play();
        isPlaying.set(true);
      }
    }
  }
</script>

<audio src={$activeAudioSrc} bind:this={audio} />

<div class='flex items-center justify-evenly'>
  <div>
    {#if showTime}
      {$currentTimeFormatted || '0:00'}
    {/if}
  </div>
  <Button
    class='w-12 h-12 rounded-full focus-within:ring-0 dark:focus-within:ring-0'
    on:click={handlePlayPause}
  >
    {#if $isPlaying}
      <PauseSolid />
    {:else}
      <PlaySolid class='ml-[3.5px]'/>
    {/if}
  </Button>
  <div>
    {#if showTime}
      {$durationFormatted}
    {/if}
  </div>
</div>
