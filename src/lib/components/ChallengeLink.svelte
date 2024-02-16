<script lang="ts">
  import { LinkSolid } from 'flowbite-svelte-icons';
  import { challengeId } from '$lib/stores/stores';
  import { Toast } from 'flowbite-svelte';
  import { page } from '$app/stores';
  import Icon from '@iconify/svelte';

  let open: boolean = false;
  let challengeLink: string;

  $: if (open) setTimeout(() => open = false, 2500);
  $: challengeLink = `${$page.url.origin}/guess?id=${$challengeId}`;
</script>

{#if $challengeId}
  <div class='Challenge grid grid-flow-col grid-cols-1 grid-rows-2 lg:grid-rows-1 mt-4 mb-2 mx-4 p-2 align-middle rounded outline outline-2 outline-white'>
    <div class='Challenge-link'>
      <input type="text" id="first_name" class="bg-gray-100
      text-gray-900 text-md select-auto rounded-md block w-full p-2.5" value={challengeLink}>
    </div>
    <div class='flex lg:flex items-center items-stretch lg:ml-2 mt-[1.5px] lg:mt-1 lg:mt-0'>
      <div class='lg:flex hover:border-slate-600 hover:bg-slate-600 lg:hover:bg-primary-800 lg:hover:border-primary-800 border-y-[12px] lg:border-[10px] border-x-[44px] lg:border-x-[50px] m-auto rounded-md bg-slate-500 border-slate-500 lg:bg-primary-700 lg:border-primary-700'>
        <span class="hidden lg:flex mr-1">Copy</span>
        <span class="hidden lg:flex mr-2">link</span>
        <LinkSolid
          on:click={() => {
            navigator.clipboard.writeText(challengeLink);
            open = true;
          }}
          class='outline-0 w-6 h-6 lg:w-5 lg:h-5'
        />
      </div>
      {#if navigator.share}
        <button class='hover:border-slate-600 hover:bg-slate-600 border-y-[8px] lg:border-[10px] border-x-[40px] lg:border-x-[50px] m-auto rounded-md bg-primary-700 border-primary-700' on:click={() => {navigator.share({url: challengeLink})}}>
          <Icon icon='tabler:share-2' class='w-8 h-8' />
        </button>
      {/if}
      <a href={challengeLink} class='hover:border-slate-600 hover:bg-slate-600 border-y-[8px] lg:border-[10px] border-x-[40px] lg:border-x-[50px] m-auto rounded-md bg-slate-500 border-slate-500'>
        <Icon icon='tabler:external-link' class='w-8 h-8 lg:w-6 lg:h-6' />
      </a>
    </div>
  </div>
  <Toast
    bind:open
    class="absolute z-50 bottom-3 left-0 right-0 mx-auto w-fit"
  >
    Copied to clipboard.
  </Toast>
{/if}

<style lang="scss">
  .Challenge {
    grid-template-columns: minmax(0, 1fr) auto;

    &-link {
      word-wrap: break-word;
    }
  }
</style>
