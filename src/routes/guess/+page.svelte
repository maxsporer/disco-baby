<script lang='ts'>
  import PlayButton from '$lib/components/PlayButton.svelte';
  import SearchBar from '$lib/components/SearchBar.svelte';
  import type { ChallengeData } from '$lib/types';

  export let data: ChallengeData;
</script>

{#if data.Item}
  <div class='flex flex-col justify-between items-center'>
    <div class='my-2 py-3 w-full border-b-2'>
      <PlayButton src={data.Item.preview.S} showTime={true}/>
    </div>
    <div class='w-full h-[calc(100dvh-90px)] overflow-hidden'>
      <SearchBar placeholder='Search to guess song'/>
    </div>
  </div>
{/if}
