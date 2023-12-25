<script lang="ts">
  import { showNotification } from '$lib/stores/SelectionStore';
  import { Toast } from 'flowbite-svelte';

  let open: boolean;

  $: open = $showNotification;
  $: if (open) setTimeout(() => showNotification.set(false), 2500);
</script>
<Toast
  bind:open
  class="absolute z-50 bottom-3 left-0 right-0 mx-auto w-fit"
>
  Copied to clipboard.
</Toast>
