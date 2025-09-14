<script lang='ts'>
  import { QuestionCircleSolid } from 'flowbite-svelte-icons'
  import { Modal } from 'flowbite-svelte';
  import { getContext } from 'svelte';
  import { lastChallenge } from '$lib/stores/stores';
  import add_song from '$lib/svgs/add_song.svg';
  import Icon from '@iconify/svelte';

  export let title: string;
  export let subtitle: string;

  let modelOpen = false;
  let page = getContext('page');
</script>

<div class='text-center'>
  <div class='border-b-2 border-b-gray-300'>
    <div class='flex justify-between items-center text-2xl lg:text-3xl lg:pt-4 py-2 px-4 mx-auto w-full max-w-screen-sm'>
      <div>
        disco-baby
      </div>
      <div class='flex'>
        {#if page === 'guess'}
          <a href='/create' class='mr-2 flex'>
            <button class='w-6 h-6'>
              <img src={add_song} alt='' />
            </button>
          </a>
        {:else if $lastChallenge}
          <a href={$lastChallenge} class='mr-2'>
            <Icon class='w-6 h-6' icon="ri:arrow-go-back-fill" />
          </a>
        {/if}
        <button
          type='button'
          on:click={() => (modelOpen = true)}
        >
          <QuestionCircleSolid class='w-6 h-6' />
        </button>
      </div>
    </div>
    </div>
</div>
<Modal
  class='mt-10 md:w-[75%]'
  dialogClass='fixed top-0 start-0 end-0 h-full md:inset-0 z-50 w-full p-2 flex'
  placement={'top-center'}
  title={title}
  bind:open={modelOpen}
  autoclose outsideclose
>
  <div>
    {subtitle}
  </div>
</Modal>
