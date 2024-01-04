<script lang='ts'>
  import { QuestionCircleSolid } from 'flowbite-svelte-icons'
  import { Modal } from 'flowbite-svelte';

  export let title: string;
  export let subtitle: string;

  let modelOpen = false;
</script>

<div class='text-center'>
  <div class='flex justify-between items-center text-2xl lg:text-3xl lg:pt-4 border-b-2 border-b-gray-300 mx-4 pb-2 pt-2'>
    <div>
      disco-baby
    </div>
    <button
      type='button'
      on:click={() => (modelOpen = true)}
    >
      <QuestionCircleSolid class='w-6 h-6' />
    </button>
  </div>
</div>
<Modal
  class='mt-10 md:w-[75%]'
  placement={'top-center'}
  title={title}
  bind:open={modelOpen}
  autoclose outsideclose
>
  <div class='-m-2'>
    {subtitle}
  </div>
</Modal>
