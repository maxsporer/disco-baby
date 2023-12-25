<script lang='ts'>
  import type { DeezerTrack } from '$lib/types';
  import Icon from '@iconify/svelte';
  import CreateActions from './CreateActions.svelte';
  
  export let track: DeezerTrack;
  export let isMobile: boolean = false;
  export let onDrawer: boolean = false;
</script>

<div class='{isMobile ? 'my-1' : 'my-2'} mx-4 flex justify-between items-center overflow-hidden'>
  <div class='{onDrawer && 'w-[calc(100%-128px)]'} flex items-center'>
    <img class='{isMobile ? 'w-11 h-11' : 'w-14 h-14'}' src={track.album.cover} alt=''/>
    <div class='{isMobile ? 'text-lg pl-2' : 'text-xl pl-4'} flex flex-col text-left justify-center overflow-hidden'>
      <div class='whitespace-nowrap'>
        {track.title}
      </div>
      <div class='{isMobile ? 'text-sm' : 'text-base'} text-gray-400 flex items-center'>
        {#if track.explicit_lyrics}
          <Icon icon='material-symbols:explicit' class='{isMobile ? 'h-5' : 'h-7'} mr-1' />
        {/if}
        <div>
          {track.artist.name}
        </div>
      </div>
    </div>
  </div>
  {#if onDrawer}
    <CreateActions track={track} />
  {/if}
</div>
