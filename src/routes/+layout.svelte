<script lang="ts">
    import "../app.css";
    import { invalidate } from '$app/navigation';
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    const hiddenNavRoutes = ['/', '/auth'];

    export let data;
    $: ({ session, supabase } = data);

    onMount(() => {
        const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
            if (newSession?.expires_at !== session?.expires_at) {
                invalidate('supabase:auth');
            }
        });

        return () => data.subscription.unsubscribe();
    });
</script>

{#if !hiddenNavRoutes.includes($page.url.pathname)}
    <!-- Navbar oder Footer -->
    <footer class="bg-ultra-olive fixed bottom-0 w-full h-[9.09vh] flex justify-around items-center p-4">
        <div class="flex justify-between w-full max-w-md mx-auto text-light-olive">
            <a href="/home" class="flex-1 text-center">
                <button class="w-full rounded-full p-2" class:bg-olive={$page.url.pathname === '/home'}>
                    <img src="/navbar/Home.svg" alt="Home Icon" class="w-6 h-6 mx-auto">
                    <p class="text-xs">Home</p>
                </button>
            </a>
            <a href="/leaderboard" class="flex-1 text-center">
                <button class="w-full rounded-full p-2" class:bg-olive={$page.url.pathname === '/leaderboard'}>
                    <img src="/navbar/Chart.svg" alt="Leaderboard Icon" class="w-6 h-6 mx-auto">
                    <p class="text-xs">Leaderboard</p>
                </button>
            </a>
            <a href="/track" class="flex-1 text-center">
                <button class="w-full rounded-full p-2" class:bg-olive={$page.url.pathname === '/track'}>
                    <img src="/navbar/Plus.svg" alt="Track Icon" class="w-6 h-6 mx-auto">
                    <p class="text-xs">Track</p>
                </button>
            </a>
            <a href="/wiki" class="flex-1 text-center">
                <button class="w-full rounded-full p-2" class:bg-olive={$page.url.pathname === '/wiki'}>
                    <img src="/navbar/Brain.svg" alt="Wiki Icon" class="w-6 h-6 mx-auto">
                    <p class="text-xs">Wiki</p>
                </button>
            </a>
            <a href="/profile" class="flex-1 text-center">
                <button class="w-full rounded-full p-2" class:bg-olive={$page.url.pathname === '/profile'}>
                    <img src="/navbar/Profile.svg" alt="Profile Icon" class="w-6 h-6 mx-auto">
                    <p class="text-xs">Profile</p>
                </button>
            </a>
        </div>
    </footer>
{/if}

<style>
    :global(body) {
        font-family: 'Sen', sans-serif;
        font-style: normal;
        font-weight: 200;
        background-color: dark-olive;
    }
</style>
<slot />