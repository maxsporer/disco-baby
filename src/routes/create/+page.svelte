<script lang="ts">
  import SearchBar from '$lib/components/SearchBar.svelte';
  import CreateChallengeDrawer from '$lib/components/CreateChallengeDrawer.svelte';
  import Header from '$lib/components/Header.svelte';
</script>

<Header title='How to create a challenge' subtitle='Search for a song you want your buddy to guess. Once you&#39ve found the song, click it, and send them the link!'/>
<SearchBar placeholder='Search to create challenge'/>
<CreateChallengeDrawer />
