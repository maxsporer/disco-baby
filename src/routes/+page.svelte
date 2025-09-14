<script>
  import { Input } from "flowbite-svelte";
  import { ArrowRightSolid } from "flowbite-svelte-icons";
  import Icon from '@iconify/svelte';

	export let form;

	let innerWidth = 0;
	let showPassword = false;

	$: isSm = innerWidth <= 640;

	function togglePassword() {
		showPassword = !showPassword;
	}
</script>

<svelte:window bind:innerWidth />

<form method='POST'>
	<div class='flex flex-col {isSm ? 'mx-8' : 'mx-[30%]'} gap-y-2 mt-[160px] justify-center'>
		<div class='flex relative'>
			<Input 
				class='rounded-none pr-20' 
				type={showPassword ? 'text' : 'password'} 
				name='passphrase' 
				autocomplete='off' 
				placeholder='password' 
			/>
			<button 
				type='button'
				class='absolute right-12 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700'
				on:click={togglePassword}
			>
				<Icon 
					icon={showPassword ? 'lucide:eye-off' : 'lucide:eye'} 
					class='w-5 h-5' 
				/>
			</button>
			<button class='bg-gray-50 p-2 m-0.5 absolute right-0' type='submit'>
				<ArrowRightSolid class='text-primary-600 focus:outline-0' />
			</button>
		</div>
		{#if form?.incorrect}
			<div class='text-red-600'>wrong passphrase!</div>
		{/if}
	</div>
</form>
