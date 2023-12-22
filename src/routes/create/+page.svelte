<script lang="ts">
	import type { ActionData } from './$types';
  import '../../app.css';

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

<div class='bg-slate-300 w-full h-full p-8'>
  <div class="pb-4">
    <form method="POST" action="?/search">
      <input name="query" type="query">
      <button formaction="?/search">search</button>
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
