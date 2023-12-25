<script lang='ts'>
  import PlayButton from '$lib/components/PlayButton.svelte';
  import SearchBar from '$lib/components/SearchBar.svelte';
  import type { ChallengeData } from '$lib/types';

  export let data: ChallengeData;
</script>

<div>
  Guess the song
</div>

{#if data.Item}
  <SearchBar />
  <PlayButton src={data.Item.preview.S} />
{/if}
