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
		<div class='flex relative'>
			<Input class='rounded-none pr-10' type='password' name='passphrase' autocomplete='off' placeholder='password' />
			<button class='bg-gray-50 p-2 m-0.5 absolute right-0' type='submit'>
				<ArrowRightSolid class='text-primary-600 focus:outline-0' />
			</button>
		</div>
		{#if form?.incorrect}
			<div class='text-red-600'>wrong passphrase!</div>
		{/if}
	</div>
</form>
