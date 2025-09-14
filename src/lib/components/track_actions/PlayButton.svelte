<script lang='ts'>
  import { Button, Spinner } from 'flowbite-svelte';
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
  import { handlePlayPause } from '$lib/audioControls';

  export let showTime: boolean = false;
  export let onCustomClick: (() => void) | undefined = undefined;

  let audio: HTMLAudioElement;
  let audioReady = false;

  // Update store when audio element is ready
  $: if (audio) {
    audioElement.set(audio);
  }

  // Reset audioReady when source changes
  $: if ($activeAudioSrc && audio) {
    audioReady = false;
    // Force audio to load
    audio.load();
  }

  // Handle audio loading events
  function handleAudioLoad() {
    audioReady = true;
  }

  function handleAudioError(event: Event) {
    audioReady = false;
    console.error('Audio failed to load:', event);
  }

  function handleAudioEnded() {
    isPlaying.set(false);
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
</script>

<audio 
  src={$activeAudioSrc} 
  bind:this={audio}
  preload="metadata"
  on:loadeddata={handleAudioLoad}
  on:canplaythrough={handleAudioLoad}
  on:error={handleAudioError}
  on:ended={handleAudioEnded}
/>

<div class='flex items-center justify-evenly'>
  <div>
    {#if showTime}
      {$currentTimeFormatted || '0:00'}
    {/if}
  </div>
  
  {#if !$activeAudioSrc || !audioReady}
    <Spinner class='w-12 h-12' />
  {:else}
    <Button
      class='w-12 h-12 rounded-full'
      on:click={() => {
        if (audioReady) {
          if (onCustomClick) {
            onCustomClick();
          }
          handlePlayPause();
        }
      }}
    >
      {#if $isPlaying}
        <PauseSolid tabindex="-1" />
      {:else}
        <PlaySolid class='ml-[3.5px]' tabindex="-1" />
      {/if}
    </Button>
  {/if}
  
  <div>
    {#if showTime}
      {$durationFormatted}
    {/if}
  </div>
</div>
