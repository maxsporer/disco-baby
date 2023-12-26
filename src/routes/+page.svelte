<script>
  import { Input, Label } from "flowbite-svelte";

	export let form;

	let innerWidth = 0;

	$: isSm = innerWidth <= 640;
</script>

<svelte:window bind:innerWidth />

<form method='POST'>
	<div class='flex flex-col {isSm ? 'mx-8' : 'mx-[30%]'} gap-y-2 mt-[160px] justify-center'>
		<Label class='text-white' for='passphrase'>Enter passphrase:</Label>
		<Input type='password' name='passphrase' autocomplete='off' />
		{#if form?.incorrect}
			<div class='text-red-600'>wrong passphrase!</div>
		{/if}
	</div>
</form>
