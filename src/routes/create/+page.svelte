<script lang="ts">
  import CreateChallengeDrawer from '$lib/components/CreateChallengeDrawer.svelte';
  import SearchBar from '$lib/components/SearchBar.svelte';
  import Header from '$lib/components/Header.svelte';
</script>

<Header
  title='How to Create a Challenge'
  subtitle='Search for a song you want your friend to guess. Once you&#39ve found the song, click it, create the challenge, and send it to your friend!'
/>
<div class='h-[calc(100dvh-50px)] lg:h-[calc(100dvh-62px)]'>
  <SearchBar placeholder='search song to create challenge' />
</div>
<CreateChallengeDrawer />
