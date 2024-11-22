<script lang="ts">
    import { onMount } from 'svelte';
    import { invalidate } from '$app/navigation';
	import type { PageData } from './$types';

    export let data: PageData;
    $: ({ userActions, actions, categories, supabase, user } = data);

    let selectedCategory = "";
    onMount(() => {
        selectedCategory = categories[0];        
    })

    $: filteredActions = actions.filter(
        (action) => action.category === selectedCategory
    );
    $: sortedActions = [...filteredActions].sort((a, b) => a.score - b.score);

    async function handleSubmit(actionId: number) {
        if (!actionId ) return;

        await supabase.from('user_actions').insert({ action_id: actionId, user_id: user?.id });
        
        invalidate('supabase:db:user_actions');
    }

    function getColor(score: number): string {
        if (score < 2) return "bg-light-green text-black"; 
        if (score < 5) return "bg-yellow text-black"; 
        if (score < 7) return "bg-orange text-black"; 
        return "bg-red text-black"; 
    }
</script>

<body class= "m-6">
    <h2 class="text-light-olive text-4xl ml-1">Activity</h2>
    <select name="category" class="border p-2 rounded h-10 mb-2 w-full text-black" bind:value={selectedCategory}>
        {#each categories as category}
            <option class="p-2 text-base sm:text-lg md:text-xl lg:text-2xl" value={category} style="font-size: 0.75rem;">{category}</option>
        {/each}
    </select>

    {#if selectedCategory}
        <ul>
            {#each sortedActions as action}
                <li class="mb-2">
                    <button
                        type="button"
                        class={`flex justify-between items-center p-4 rounded ${getColor(action.score)} w-full`}
                        on:click={() => handleSubmit(action.id)}
                    >
                        <img src= "/{action.image}" alt="icon" class="w-10 h-10">
                        <span class="flex-1 text-center text-lg font-medium">{action.name}</span>
                        <span class="text-sm text-gray-500 font-semibold">+{action.score}</span>
                    </button>
                </li>
            {/each}
        </ul>
    {/if}

    
    <h2 class="text-light-olive text-4xl ml-1">Recent Activity</h2>
    <ul class="flex flex-wrap gap-4">
        {#each userActions as userAction}
            <li >
                <button
                    title="Add {userAction.actions.name} again ({userAction.actions.score} points)"
                    type="button"
                    class={`flex justify-between items-center p-4 rounded ${getColor(userAction.actions.score)}`}
                    on:click={() => handleSubmit(userAction.actions.id)}
                >
                    <img src= "/{userAction.actions.image}" alt="icon" class="w-10 h-10">
                </button>
            </li>
        {/each}
    </ul>
</body>