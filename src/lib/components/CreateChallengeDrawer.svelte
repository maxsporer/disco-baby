<script lang='ts'>
  import { hideDrawer, selectedTrack } from '$lib/stores/stores';
  import { Drawer, CloseButton } from 'flowbite-svelte';
  import { sineIn } from 'svelte/easing';
  import TrackDetail from './TrackDetail.svelte';

  let hidden: boolean = true;
  let transitionParamsBottom = {
    y: 320,
    duration: 200,
    easing: sineIn
  };

  $: hidden = $hideDrawer;
  $: hideDrawer.set(hidden);
</script>

<Drawer
  placement='bottom'
  transitionType='fly'
  transitionParams={transitionParamsBottom}
  bind:hidden={hidden}
  class='w-full flex flex-col bg-zinc-800'
>
  <CloseButton
    class='absolute right-0 top-0 text-white hover:bg-gray-700'
    on:click={() => (hidden = true)}
  />
  <TrackDetail track={$selectedTrack} />
</Drawer>
