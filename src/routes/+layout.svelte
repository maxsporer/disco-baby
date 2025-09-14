<script>
  import "../app.pcss";
  import { navigating } from '$app/stores';
  import { Spinner } from 'flowbite-svelte';
</script>

<slot />

{#if $navigating}
  <div class='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
    <div class='rounded-lg p-6 flex flex-col items-center gap-4'>
      <Spinner size='8' />
      <div class='text-white text-lg'>Loading...</div>
    </div>
  </div>
{/if}