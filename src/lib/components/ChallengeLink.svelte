<script lang='ts'>
  import { challengeId } from '$lib/stores/stores';
  import { Button, Toast } from 'flowbite-svelte';
  import { page } from '$app/stores';
  import Icon from '@iconify/svelte';

  let open: boolean = false;
  let challengeLink: string = '';

  $: if (open) setTimeout(() => open = false, 2500);
  $: if (!challengeLink && $challengeId) challengeLink = `${$page.url.origin}/guess?id=${$challengeId}`;
</script>

{#if $challengeId}
  <div class='Challenge grid grid-flow-col grid-cols-1 grid-rows-1 p-2 align-middle w-full'>
    <div class='Challenge-link flex'>
      <input
        type='text'
        class="bg-gray-100 text-gray-900 text-md select-auto rounded-md block p-2.5 h-10 grow min-w-0"
        bind:value={challengeLink}
      >
      <Button
        on:click={async () => {
          if (navigator.share === undefined) {
            navigator.clipboard.writeText(challengeLink);
            open = true;
          } else {
            await navigator.share({url: challengeLink});
          }
        }}
        class='h-10 w-10 sm:w-fit text-sm flex px-4 ml-1 p-0 sm:p-2.5 focus-within:ring-0 dark:focus-within:ring-0'
      >
        {#if navigator.share === undefined}
          <span class='hidden sm:block mr-2 text-sm'>
            Copy
          </span>
        {/if}
        {#if navigator.share === undefined}
          <Icon class='w-5 h-5' icon="lucide:copy" />
        {:else}
          <Icon class='w-7 h-7 sm:w-6 sm:h-6' icon="tabler:share-2" />
        {/if}
      </Button>
      <Button href={challengeLink} class='min-w-10 h-10 p-0 bg-gray-100 ml-1 focus-within:ring-0 dark:focus-within:ring-0 text-primary-700 hover:text-gray-100'>
        <Icon icon='octicon:arrow-up-right-16' class='w-6 h-6' />
      </Button>
    </div>
  </div>
  <Toast
    bind:open
    class='absolute z-50 bottom-3 left-0 right-0 mx-auto w-fit'
  >
    Copied to clipboard.
  </Toast>
{/if}

<style lang='scss'>
  .Challenge {
    grid-template-columns: minmax(0, 1fr) auto;

    &-link {
      word-wrap: break-word;
    }
  }
</style>
