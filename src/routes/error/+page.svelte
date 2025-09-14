<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { Button } from 'flowbite-svelte';
  import Header from '$lib/components/Header.svelte';

  $: errorMessage = $page.url.searchParams.get('message') || 'An unknown error occurred';
</script>

<div class='h-full flex flex-col'>
  <Header
    title='Oops!'
    subtitle='Something went wrong'
  />
  
  <div class='flex-1 flex flex-col items-center justify-center mx-auto w-full max-w-screen-sm px-4'>
    <div class='text-center mb-8'>
      <div class='text-6xl mb-4'>🎵</div>
      <h2 class='text-2xl font-bold mb-2'>Challenge Not Found</h2>
      <p class='text-gray-400 mb-6'>{errorMessage}</p>
      
      <div class='flex flex-col gap-3 max-w-xs mx-auto'>
        <Button
          class='w-full'
          on:click={() => goto('/')}
        >
          Go Home
        </Button>
        
        <Button
          class='w-full'
          color='alternative'
          on:click={() => goto('/create')}
        >
          Create a Challenge
        </Button>
      </div>
    </div>
  </div>
</div>
