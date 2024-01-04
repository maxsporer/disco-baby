<script lang='ts'>
  import Guess from '$lib/components/Guess.svelte';
  import Header from '$lib/components/Header.svelte';
  import SearchBar from '$lib/components/SearchBar.svelte';
  import PlayButton from '$lib/components/track_actions/PlayButton.svelte';
  import { currentGuess, queuedGuess } from '$lib/stores/stores';
  import type { ChallengeData } from '$lib/types';
  import { setContext } from 'svelte';

  export let data: ChallengeData;

  setContext('page', 'guess');
</script>

<Header
  title='How to Play'
  subtitle='Listen to the song and search for what you think it is. Press your guess and then the arrow to submit your guess!'
/>
{#if data.Item}
  <div class='flex flex-col justify-between items-center'>
    <div class='{$queuedGuess || $currentGuess ? 'h-[calc(100dvh-208px)] lg:h-[calc(100dvh-220px)]' : 'h-[calc(100dvh-140px)] lg:h-[calc(100dvh-152px)]'} w-full overflow-hidden'>
      <SearchBar placeholder='guess the song' />
    </div>
    <Guess challengeTrack={data} />
    <div class='my-2 py-3 w-full border-t-2'>
      <PlayButton src={data.Item.preview.S} showTime={true} />
    </div>
  </div>
{/if}
