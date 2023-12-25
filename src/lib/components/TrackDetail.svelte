<script lang='ts'>
  import type { DeezerTrack } from '$lib/types';
  import add_song from '$lib/svgs/add_song.svg';
  import Icon from '@iconify/svelte';
  import { Button, Spinner } from 'flowbite-svelte';
  import PlayButton from './PlayButton.svelte';
  import { create } from '$lib/apiCalls';
  import { page } from '$app/stores';
  import { LinkSolid } from 'flowbite-svelte-icons';
  import { showNotification } from '$lib/stores/SelectionStore';
  
  export let track: DeezerTrack;
  export let onDrawer: boolean = false;

  let id: string = '';
  let waiting: boolean = false;
  let challengeLink: string;
  
  $: challengeLink = `${$page.url.origin}/guess?id=${id}`;
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
  {#if onDrawer}
    <div class='flex items-center justify-center gap-x-4'>
      <PlayButton src={track.preview} />
      {#if !waiting}
        <Button
          class='w-12 h-12 p-2.5 rounded-full focus-within:ring-0 dark:focus-within:ring-0'
          on:click={async () => {
            waiting = !waiting;
            id = await create(track);
            waiting = !waiting;
          }}
        >
          <img src={add_song} alt=''/>
        </Button>
      {:else}
        <Spinner />
      {/if}
    </div>
  {/if}
</div>
{#if onDrawer && id}
  <div class='flex items-center justify-between my-2 mx-4 p-2 rounded outline outline-2 outline-white'>
    <div>
      {challengeLink}
    </div>
    <div class='flex items-center gap-x-2 mr-2'>
      <a href={challengeLink} class='hover:text-primary-700'>
        <Icon icon='tabler:external-link' class='w-6 h-6'/>
      </a>
      <div class='hover:text-primary-500 '>
        <LinkSolid
          on:click={() => {
            navigator.clipboard.writeText(challengeLink);
            showNotification.set(true);
          }}
          class='outline-0'
        />
      </div>
    </div>
  </div>
{/if}
