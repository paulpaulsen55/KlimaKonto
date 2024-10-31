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

<div class="bg-dark-olive fixed inset-0">
	<header>
		<button on:click={logout}>Logout</button>
	</header>
	<slot />
    <footer class="bg-ultra-olive fixed bottom-0 w-full h-[9.09vh] flex justify-around items-center p-4">
		<div class="flex justify-between w-full max-w-md mx-auto text-light-olive">
			<a href="/app/home" class="flex-1 text-center">
				<button class="w-full rounded-full p-2" class:bg-dark-gray={$page.url.pathname === '/app/home'}>
					<img src="/navbar/Home.svg" alt="Home Icon" class="w-6 h-6 mx-auto">
					<p class="text-xs">Home</p>
				</button>
			</a>
			<a href="/app/leaderboard" class="flex-1 text-center">
				<button class="w-full rounded-full p-2" class:bg-dark-gray={$page.url.pathname === '/app/leaderboard'}>
					<img src="/navbar/Chart.svg" alt="Leaderboard Icon" class="w-6 h-6 mx-auto">
					<p class="text-xs">Leaderboard</p>
				</button>
			</a>
			<a href="/app/track" class="flex-1 text-center">
				<button class="w-full rounded-full p-2" class:bg-dark-gray={$page.url.pathname === '/app/track'}>
					<img src="/navbar/Plus.svg" alt="Track Icon" class="w-6 h-6 mx-auto">
					<p class="text-xs">Track</p>
				</button>
			</a>
			<a href="/app/wiki" class="flex-1 text-center">
				<button class="w-full rounded-full p-2" class:bg-dark-gray={$page.url.pathname === '/app/wiki'}>
					<img src="/navbar/Brain.svg" alt="Wiki Icon" class="w-6 h-6 mx-auto">
					<p class="text-xs">Wiki</p>
				</button>
			</a>
			<a href="/app/profile" class="flex-1 text-center">
				<button class="w-full rounded-full p-2" class:bg-dark-gray={$page.url.pathname === '/app/profile'}>
					<img src="/navbar/Profile.svg" alt="Profile Icon" class="w-6 h-6 mx-auto">
					<p class="text-xs">Profile</p>
				</button>
			</a>
		</div>
	</footer>
</div>

