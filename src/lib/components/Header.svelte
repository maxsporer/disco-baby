<script lang='ts'>
  import { QuestionCircleSolid } from 'flowbite-svelte-icons'
  import { Modal } from 'flowbite-svelte';
  import { getContext } from 'svelte';
  import { lastChallenge } from '$lib/stores/stores';
  import { allGuesses, hasGuessesLeft } from '$lib/stores/guessStore';
  import add_song from '$lib/svgs/add_song.svg';
  import Icon from '@iconify/svelte';

  export let title: string;
  export let subtitle: string;
  export let challengeTrack: any = undefined;

  let modelOpen = false;
  let page = getContext('page');
  let showTooltip = true;
  
  // Check if user has completed a challenge on guess page
  $: gameCompleted = page === 'guess' && $allGuesses.length > 0 && (
    !$hasGuessesLeft || 
    (challengeTrack && $allGuesses.length > 0 && $allGuesses[$allGuesses.length - 1]?.trackId.toString() === challengeTrack?.Item?.deezer_id?.S)
  );
  
  // Reset tooltip visibility when game state changes
  $: if (gameCompleted) {
    showTooltip = true;
  }
  
  function dismissTooltip() {
    showTooltip = false;
  }
</script>

<div class='text-center'>
  <div class='border-b-2 border-b-gray-300'>
    <div class='flex justify-between items-center text-2xl lg:text-3xl lg:pt-4 py-2 px-4 mx-auto w-full max-w-screen-sm'>
      <div>
        disco-baby
      </div>
      <div class='flex gap-x-2.5'>
        {#if page === 'home'}
          <a href='/create' class='flex'>
            <button class='w-6 h-6'>
              <img src={add_song} alt='' />
            </button>
          </a>
        {:else if page === 'guess'}
          <div class='relative'>
            <a href='/create' class='flex' id="create-challenge-btn">
              <button class='w-6 h-6'>
                <img src={add_song} alt='' />
              </button>
            </a>
            {#if gameCompleted && showTooltip}
              <div class='absolute top-8 left-1/2 transform -translate-x-[70%] bg-primary-600 text-white text-sm font-medium px-3 py-2 rounded-lg shadow-lg z-10 whitespace-nowrap'>
                <div class='flex items-center gap-2'>
                  <span>Create your own challenge!</span>
                  <button 
                    on:click={dismissTooltip}
                    class='text-white hover:text-gray-200 ml-1'
                  >
                    ✕
                  </button>
                </div>
                <!-- Arrow pointing up -->
                <div class='absolute bottom-full left-[70%] transform -translate-x-1/2 border-4 border-transparent border-b-primary-600'></div>
              </div>
            {/if}
          </div>
        {:else if $lastChallenge}
          <a href={$lastChallenge}>
            <Icon class='w-6 h-6' icon="ri:arrow-go-back-fill" />
          </a>
        {/if}
        <button
          type='button'
          on:click={() => (modelOpen = true)}
        >
          <QuestionCircleSolid class='w-6 h-6' />
        </button>
        <a href='/home'>
          <Icon class='w-6 h-6' icon="material-symbols:home" />
        </a>
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
