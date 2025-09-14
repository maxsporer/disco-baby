<script lang='ts'>
  import { hideDrawer, challengeId } from '$lib/stores/stores';
  import { selectedTrack } from '$lib/stores/audioStore';
  import { Drawer, CloseButton } from 'flowbite-svelte';
  import { sineIn } from 'svelte/easing';
  import TrackDetail from './TrackDetail.svelte';
  import PlayButton from './track_actions/PlayButton.svelte';
  import CreateButton from './track_actions/CreateButton.svelte';
  import ChallengeLink from './ChallengeLink.svelte';
  import TrackDetailLarge from './TrackDetailLarge.svelte';

  let hidden: boolean = true;
  let innerWidth = 0;
  let transitionParamsBottom = {
    y: 320,
    duration: 200,
    easing: sineIn
  };

  $: hidden = $hideDrawer;
  $: hideDrawer.set(hidden);
  $: isMobile = innerWidth <= 430;
</script>

<svelte:window bind:innerWidth />

<Drawer
  placement='bottom'
  transitionType='fly'
  transitionParams={transitionParamsBottom}
  bind:hidden={hidden}
  class='w-full flex flex-col bg-zinc-800 mx-auto w-full max-w-screen-sm {isMobile && 'pt-6'}'
>
  <CloseButton
    class='absolute right-0 top-0 text-white hover:bg-gray-700'
    on:click={() => (hidden = true)}
  />
  {#if isMobile}
    <TrackDetailLarge track={$selectedTrack} />
  {:else}
    <TrackDetail track={$selectedTrack} onDrawer={true} />
  {/if}
  {#if !$challengeId}
    {#if isMobile}
      <div class='flex items-center justify-center gap-x-4 h-16'>
        <PlayButton />
        <CreateButton track={$selectedTrack} />
      </div>
    {/if}
  {:else}
    <div class='h-16 w-full flex items-center'>
      <ChallengeLink />
    </div>
  {/if}
</Drawer>
