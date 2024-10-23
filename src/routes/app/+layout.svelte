<script>
    import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	export let data;
	$: ({ supabase } = data);
	$: currentPath = $page.url.pathname;

	$: logout = async () => {
		await supabase.auth.signOut();
        goto('/');
	};
</script>

<header>
    <button on:click={logout}>Logout</button>
</header>


<main>
	<slot />
</main>

