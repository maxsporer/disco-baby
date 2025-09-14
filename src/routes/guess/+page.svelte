<script lang='ts'>
  import Guess from '$lib/components/Guess.svelte';
  import Header from '$lib/components/Header.svelte';
  import SearchBar from '$lib/components/SearchBar.svelte';
  import PlayButton from '$lib/components/track_actions/PlayButton.svelte';
  import { lastChallenge } from '$lib/stores/stores';
  import { challengeAudioSrc, setActiveToChallengeAudio } from '$lib/stores/audioStore';
  import { resetGuesses } from '$lib/stores/guessStore';
  import type { ChallengeData } from '$lib/types';
  import { setContext } from 'svelte';
  import ProgressBar from '$lib/components/ProgressBar.svelte';

  export let data: ChallengeData;

  setContext('page', 'guess');

  if (data.Item) {
    lastChallenge.set('/guess?id=' + data.Item.id.S);
    // Clear any previous guesses when loading a new challenge
    resetGuesses();
    // Set the challenge audio source and make it active
    challengeAudioSrc.set(data.Item.preview.S);
    setActiveToChallengeAudio();
  }
</script>

<div class='h-full flex flex-col'>
  <Header
    title='How to Play'
    subtitle='Listen to the song and search for what you think it is. Press your guess and then the arrow to submit your guess!'
    challengeTrack={data}
  />
  {#if data.Item}
    <div class='flex-1 flex flex-col justify-between min-h-0 mx-auto w-full max-w-screen-sm'>
      <SearchBar placeholder='guess the song' challengeTrack={data} />
      <div>
        <Guess challengeTrack={data} />
        <div class='mt-2 mb-3 w-full flex flex-col gap-y-3'>
          <ProgressBar />
          <PlayButton showTime={true} />
        </div>
      </div>
    </div>
  {/if}
</div>
