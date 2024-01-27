<script lang='ts'>
  import Guess from '$lib/components/Guess.svelte';
  import SearchBar from '$lib/components/SearchBar.svelte';
  import PlayButton from '$lib/components/track_actions/PlayButton.svelte';
  import { currentGuess, queuedGuess } from '$lib/stores/stores';
  import type { ChallengeData } from '$lib/types';
  import { setContext } from 'svelte';

  export let data: ChallengeData;

  setContext('page', 'guess');
</script>

{#if data.Item}
  <div class='flex flex-col justify-between items-center'>
    <div class='{$queuedGuess || $currentGuess ? 'h-[calc(100dvh-158px)]' : 'h-[calc(100dvh-90px)]'} w-full overflow-hidden'>
      <SearchBar placeholder='guess the song' />
    </div>
    <Guess challengeTrack={data}/>
    <div class='my-2 py-3 w-full border-t-2'>
      <PlayButton src={data.Item.preview.S} showTime={true} />
    </div>
  </div>
{/if}
