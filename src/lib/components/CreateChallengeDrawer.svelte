<script lang='ts'>
  import { hideDrawer, selectedTrack } from '$lib/stores/stores';
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
  class='w-full flex flex-col bg-zinc-800 {isMobile && 'pt-6'}'
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
  {#if isMobile}
  <div class='flex items-center justify-center gap-x-4'>
    <PlayButton src={$selectedTrack.preview} />
    <CreateButton track={$selectedTrack} />
  </div>
  {/if}
  <ChallengeLink />
</Drawer>
