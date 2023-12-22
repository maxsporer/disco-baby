<script lang="ts">
	import type { ActionData } from './$types';
  import '../../app.css';
  import { Search, Button } from 'flowbite-svelte';
  import { SearchOutline } from 'flowbite-svelte-icons';

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
    console.log(id);
  }
</script>


<div class='bg-slate-300 w-full h-full p-8 min-h-screen'>
  <div class="pb-4 ml-[5$] mr-[5%] lg:mr-[80%]">
    <form method="POST" action="?/search" class="rounded-3xl flex bg-white p-4">
        <SearchOutline class="h-5 w-4 pt-1 pl-0.5"/>
      <input name="query" type="query" placeholder=" Search for a song or artist" class="w-full">
      <!-- <button formaction="?/search">Go!</button> -->
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
    <button class="m-4" on:click={create(selection)}>
      submit
    </button>
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
