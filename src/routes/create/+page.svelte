<script lang="ts">
  import type { ActionData } from './$types';
  import { Search, Button } from 'flowbite-svelte';
  import Icon from '@iconify/svelte';

  export let form: ActionData;
  let selection: any;

  async function create(selection: any) {
    const response = await fetch('/api/create', {
      method: 'POST',
			body: JSON.stringify({ selection }),
			headers: {
				'content-type': 'application/json'
			}
    })

    const id = await response.json();
  }
</script>

<div class='w-full h-full p-8'>
  <div class="pb-4">
    <form method="POST" action="?/search" class="flex">
      <Search size="lg" name="query" type="query" class="py-4">
        <Button class="!p-2.5 mr-2" type="submit">Search</Button>
      </Search>
    </form>
  </div>

  {#if selection}
  <div class="border-solid border-2 border-sky-500 mb-4 flex justify-between">
    <div class='flex m-4'>
      <img src={selection.album.cover} alt=''/>
      <div class='pl-4 flex text-center'>
        {selection.title}
      </div>
    </div>
    <button class="m-4" on:click={() => create(selection)}>
      submit
    </button>
  </div>
  {/if}
  
  {#if form?.data}
    {#each form.data as track, i}
    <button class='flex m-4 items-center' on:click={() => selection = track}>
      <img class='w-14 h-14' src={track.album.cover} alt=''/>
      <div class='pl-4 flex flex-col text-left text-2xl justify-center'>
        <div>
          {track.title}
        </div>
        <div class='text-lg text-gray-400 flex'>
          {#if track.explicit_lyrics}
            <Icon icon="material-symbols:explicit" class='h-7 mr-1' />
          {/if}
          <div> 
            {track.artist.name}
          </div>
        </div>
      </div>
    </button>
    {/each}
  {/if}
</div>
