<script lang="ts">
  import { Button } from "flowbite-svelte";
  import { PlaySolid, PauseSolid } from "flowbite-svelte-icons";

  export let data;
  let audio: HTMLAudioElement;
</script>

<div>
  Guess the song
</div>

{#if data.Item}
  <div>
    <audio src={data.Item.preview.S} bind:this={audio} />
    <Button pill on:click={() => audio.play()}><PlaySolid /></Button>
    <Button pill on:click={() => audio.pause()}><PauseSolid /></Button>
  </div>
{/if}
