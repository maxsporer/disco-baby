<script lang="ts">
  import { LinkSolid } from 'flowbite-svelte-icons';
  import { challengeId } from '$lib/stores/stores';
  import { Toast } from 'flowbite-svelte';
  import { page } from '$app/stores';
  import Icon from '@iconify/svelte';

  let open: boolean = false;

  $: if (open) setTimeout(() => open = false, 2500);
  $: challengeLink = `${$page.url.origin}/guess?id=${$challengeId}`;
</script>

{#if $challengeId}
  <div class='flex items-center justify-between mt-4 mb-2 mx-4 p-2 rounded outline outline-2 outline-white'>
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
            open = true;
          }}
          class='outline-0'
        />
      </div>
    </div>
  </div>
  <Toast
  bind:open
  class="absolute z-50 bottom-3 left-0 right-0 mx-auto w-fit"
  >
    Copied to clipboard.
  </Toast>
{/if}