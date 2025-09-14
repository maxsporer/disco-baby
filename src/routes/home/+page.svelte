<script lang="ts">
  import { goto } from '$app/navigation';
  import { Button } from 'flowbite-svelte';
  import Header from '$lib/components/Header.svelte';
  import { setContext } from 'svelte';

  setContext('page', 'home');
</script>

<div class='h-full flex flex-col'>
  <Header
    title='Welcome to Disco Baby'
    subtitle='The music guessing game that will test your musical knowledge!'
  />
  <div class='flex flex-col items-center mx-auto w-full max-w-screen-sm px-5 pt-6 flex-1'>
    <div class='flex flex-col gap-y-8'>
      <div class='flex flex-col gap-y-4'>
        <div>
          <h3 class='text-xl font-semibold mb-3 text-primary-0'>Creating a Challenge</h3>
          <div class='text-left space-y-2 text-gray-300 max-w-md'>
            <div class='flex items-start gap-3'>
              <span class='text-primary-500 font-bold'>1.</span>
              <span>Search for the song you want to challenge others with</span>
            </div>
            <div class='flex items-start gap-3'>
              <span class='text-primary-500 font-bold'>2.</span>
              <span>Select the track and create your challenge</span>
            </div>
            <div class='flex items-start gap-3'>
              <span class='text-primary-500 font-bold'>3.</span>
              <span>Share the challenge link with friends</span>
            </div>
          </div>
        </div>
        <Button
          class='w-full text-md py-2'
          on:click={() => goto('/create')}
        >
          Create a Challenge
        </Button>
      </div>
      <div class='flex flex-col gap-y-4'>
        <div>
          <h3 class='text-xl font-semibold mb-3 text-primary-0'>Playing a Challenge</h3>
          <div class='text-left space-y-2 text-gray-300 max-w-md'>
            <div class='flex items-start gap-3'>
              <span class='text-primary-500 font-bold'>1.</span>
              <span>Play the song</span>
            </div>
            <div class='flex items-start gap-3'>
              <span class='text-primary-500 font-bold'>2.</span>
              <span>Search and guess what song it is</span>
            </div>
            <div class='flex items-start gap-3'>
              <span class='text-primary-500 font-bold'>3.</span>
              <span>You have 6 chances to get it right</span>
            </div>
            <div class='flex items-start gap-3'>
              <span class='text-primary-500 font-bold'>4.</span>
              <span>Share your results with friends!</span>
            </div>
          </div>
        </div>
        <Button
          class='w-full text-md py-2'
          color='alternative'
          on:click={() => goto('/guess?id=dc6b0098-59dd-428d-9d2a-cb9434ae77e4')}
        >
          Try Random Challenge
        </Button>
      </div>
    </div>
    <div class='mt-auto pb-4 text-center text-sm text-gray-500'>
      <div class='flex flex-col sm:flex-row sm:items-center sm:justify-center gap-y-1 sm:gap-x-3'>
        <span>
          created by
          <a href='https://maxsporer.github.io/' target='_blank' class='text-primary-400 hover:text-primary-300 underline'>
            Max
          </a>
          {' '}and{' '}
          <a href='https://tsporer.github.io/' target='_blank' class='text-primary-400 hover:text-primary-300 underline'>
            Tommy
          </a>
          Sporer
        </span>
        <span class='hidden sm:inline'>|</span>
        <span>
          <a href='https://github.com/maxsporer/disco-baby' target='_blank' class='text-primary-400 hover:text-primary-300 underline'>
            view source code
          </a>
        </span>
      </div>
    </div>
  </div>
</div>