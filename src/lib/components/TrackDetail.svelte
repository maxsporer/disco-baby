<script lang='ts'>
  import type { DeezerTrack } from '$lib/types';
  import add_song from '$lib/svgs/add_song.svg';
  import Icon from '@iconify/svelte';
  import { Button } from 'flowbite-svelte';
  import PlayButton from './PlayButton.svelte';
  import { create } from '$lib/apiCalls';
  
  export let track: DeezerTrack;
  export let onDrawer: boolean = false;
</script>

<div class='flex m-4 justify-between items-center'>
  <div class='flex items-center'>
    <img class='w-14 h-14' src={track.album.cover} alt=''/>
    <div class='pl-4 flex flex-col text-left text-xl justify-center overflow-hidden '>
      <div class='whitespace-nowrap'>
        {track.title}
      </div>
      <div class='text-base text-gray-400 flex items-center'>
        {#if track.explicit_lyrics}
          <Icon icon='material-symbols:explicit' class='h-7 mr-1' />
        {/if}
        <div> 
          {track.artist.name}
        </div>
      </div>
    </div>
  </div>
  {#if onDrawer}
    <div class='flex items-center justify-center gap-x-4'>
      <PlayButton src={track.preview} />
      <Button
        class='w-12 h-12 p-2.5 rounded-full focus-within:ring-0 dark:focus-within:ring-0'
        on:click={() => create(track)}
      >
        <img src={add_song} alt=''/>
      </Button>
    </div>
  {/if}
</div>
