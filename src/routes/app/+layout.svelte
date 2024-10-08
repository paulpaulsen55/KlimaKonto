<script>
    import { goto } from '$app/navigation';

	export let data;
	$: ({ supabase } = data);

	$: logout = async () => {
		await supabase.auth.signOut();
        goto('/');
	};
</script>

<header>
	<div class="bg-green-500 flex justify-between items-center p-4">
        <p>KlimaKonto</p>
        <button on:click={logout}>Logout</button>
    </div>
</header>
<main>
	<slot />
</main>