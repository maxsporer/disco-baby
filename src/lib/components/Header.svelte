<script lang='ts'>
  import { QuestionCircleSolid } from 'flowbite-svelte-icons'
  import { createEventDispatcher } from 'svelte';
  import { Button, Modal} from 'flowbite-svelte';
  import type { ModalPlacementType } from 'flowbite-svelte';

  export let subtitle: string;
  export let title: string;

  let defaultModal = false;
  let placement: ModalPlacementType = 'top-center';
</script>

<div class='text-center'>
  <div class='flex text-2xl text-left lg:text-3xl lg:pt-4 border-b-2 border-b-gray-300 mx-4 lg:mx-8 pb-2 pt-2'>
    <div>
      disco-baby
    </div>
    <button type="button" on:click={() => (defaultModal = true)} class='ml-auto mt-1 w-6 h-6'>
      <QuestionCircleSolid />
    </button>
  </div>
</div>

<Modal {placement} title={title} bind:open={defaultModal} autoclose outsideclose class='top-10 lg:w-[75%]'>
  <div class='-mx-2 -mr-4 -my-2'>
    {subtitle}
  </div>
</Modal>