<script lang="ts">
  import '../../app.css';
	import type { ActionData } from './$types';
  import { Search, Button } from 'flowbite-svelte';

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
    <div class='flex m-4 w-full'>
      <img src={selection.album.cover} alt=''/>
      <div class="flex flex-col justify-between">
        <div class='pl-4 flex text-center'>
          {selection.title}
        </div>
        <Button class="m-4 h-fit" on:click={() => create(selection)}>
          submit
        </Button>
      </div>
    </div>
  </div>
  {/if}
  
  {#if form?.data}
    {#each form.data as track, i}
    <button class='flex m-4' on:click={() => selection = track}>
      <img src={track.album.cover} alt=''/>
      <div class='pl-4 flex text-center'>
        {track.title}
      </div>
    </button>
    {/each}
  {/if}
</div>
