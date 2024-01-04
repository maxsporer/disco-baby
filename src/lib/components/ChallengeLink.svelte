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
  <div class='Challenge grid grid-flow-col grid-cols-2 mt-4 mb-2 mx-4 p-2 rounded outline outline-2 outline-white'>
    <div class='Challenge-link'>
      {challengeLink}
    </div>
    <div class='flex items-center gap-x-2 ml-2 mr-1 pl-2 border-l-2'>
      <a href={challengeLink} class='hover:text-primary-600'>
        <Icon icon='tabler:external-link' class='w-6 h-6' />
      </a>
      <div class='hover:text-primary-600'>
        <LinkSolid
          on:click={() => {
            navigator.clipboard.writeText(challengeLink);
            open = true;
          }}
          class='outline-0'
        />
      </div>
      {#if navigator.share}
        <button class='hover:text-primary-600' on:click={() => {navigator.share({url: challengeLink})}}>
          <Icon icon='tabler:share-2' class='h-6 w-6' />
        </button>
      {/if}
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
