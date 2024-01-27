<script lang='ts'>
  import type { DeezerTrack } from '$lib/types';
  import Icon from '@iconify/svelte';
  import PlayButton from './track_actions/PlayButton.svelte';
  import CreateButton from './track_actions/CreateButton.svelte';

  export let track: DeezerTrack;
  export let onDrawer: boolean = false;
  export let className: string = '';

  let innerWidth: number = 0;
  let isMobile: boolean = innerWidth <= 430;
</script>

<svelte:window bind:innerWidth />

<div class='{className} mt-2 mx-2 flex justify-between items-center overflow-hidden'>
  <div class='{onDrawer && 'w-[calc(100%-128px)]'} flex items-center'>
    <img class='{isMobile ? 'w-11 h-11' : 'w-14 h-14'}' src={track?.album.cover} alt='' />
    <div class='{isMobile ? 'text-lg pl-2' : 'text-xl pl-4'} flex flex-col text-left justify-center overflow-hidden'>
      <div class='whitespace-nowrap'>
        {track?.title}
      </div>
      <div class='{isMobile ? 'text-sm' : 'text-base'} text-gray-400 flex items-center'>
        {#if track?.explicit_lyrics}
          <Icon icon='material-symbols:explicit' class='{isMobile ? 'h-5' : 'h-7'} mr-1' />
        {/if}
        <div>
          {track?.artist.name}
        </div>
      </div>
    </div>
  </div>
  {#if onDrawer}
    <div class='flex items-center justify-center gap-x-4'>
      <PlayButton src={track?.preview} />
      <CreateButton track={track} />
    </div>
  {/if}
</div>
