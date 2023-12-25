<script lang='ts'>
  import type { DeezerTrack } from '$lib/types';
  import Icon from '@iconify/svelte';
  
  export let track: DeezerTrack;
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
</div>