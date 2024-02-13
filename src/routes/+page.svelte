<script>
  import { Input } from "flowbite-svelte";
  import { ArrowRightSolid } from "flowbite-svelte-icons";

	export let form;

	let innerWidth = 0;

	$: isSm = innerWidth <= 640;
</script>

<svelte:window bind:innerWidth />

<form method='POST'>
	<div class='flex flex-col {isSm ? 'mx-8' : 'mx-[30%]'} gap-y-2 mt-[160px] justify-center'>
		<div class='flex'>
			<Input class='rounded-none' type='password' name='passphrase' autocomplete='off' placeholder='password' />
			<button class='bg-gray-50 p-2.5' type='submit'>
				<ArrowRightSolid class='text-primary-600 focus:outline-0' />
			</button>
		</div>
		{#if form?.incorrect}
			<div class='text-red-600'>wrong passphrase!</div>
		{/if}
	</div>
</form>
