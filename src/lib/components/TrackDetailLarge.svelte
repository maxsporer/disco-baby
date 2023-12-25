<script lang='ts'>
  import type { DeezerTrack } from '$lib/types';
  
  export let track: DeezerTrack;
</script>

<div class='flex flex-col'>
  <div class='flex justify-center m-3'>
    <img class='w-full' src={track.album.cover} alt=''/>
  </div>
  <div class='text-lg flex flex-col text-left justify-center overflow-hidden mx-3'>
    <div class='whitespace-nowrap'>
      {track.title}
    </div>
    <div class='text-sm text-gray-400 flex items-center'>
      {track.artist.name}
    </div>
  </div>
</div>
