<script lang="ts">
  import CreateChallengeDrawer from '$lib/components/CreateChallengeDrawer.svelte';
  import SearchBar from '$lib/components/SearchBar.svelte';
  import Header from '$lib/components/Header.svelte';
  import { setContext, onDestroy } from 'svelte';
  import { selectedTrack } from '$lib/stores/audioStore';
  import { hideDrawer, challengeId } from '$lib/stores/stores';

  setContext('page', 'create');

  // Clear challenge creation state when navigating away from create page
  onDestroy(() => {
    selectedTrack.set(null);
    hideDrawer.set(true);
    challengeId.set('');
  });
</script>

<Header
  title='How to Create a Challenge'
  subtitle='Search for a song you want your friend to guess. Once you&#39ve found the song, click it, create the challenge, and send it to your friend!'
/>
<div class='h-[calc(100dvh-50px)] lg:h-[calc(100dvh-62px)] mx-auto w-full max-w-screen-sm'>
  <SearchBar placeholder='search a song to create a challenge' />
</div>
<CreateChallengeDrawer />
