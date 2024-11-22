<script lang="ts">
    import { invalidate } from '$app/navigation';
    import type { SupabaseClient } from '@supabase/supabase-js';
	import type { PageData } from './$types';
    import { supabase, user } from '$lib/store';

	export let data: PageData;
    type Action = {
        id: number;
        name: string;
        score: number;
        category: string;
        image: string;
    };
    export let actions: Action[] = [];
    $: ({ userActions, actions } = data);
    $: categories = [...new Set(actions.map((action) => action.category))];

    $: filteredActions = actions.filter(
    (action) => action.category === selectedCategory
    );
    $: sortedActions = [...filteredActions].sort((a, b) => a.score - b.score);

	let sc: SupabaseClient;
    let selectedCategory = "";

    supabase.subscribe(value => {
        if (!value) return;
        sc = value;
    });


    async function handleSubmit(actionId: number) {
        if (!actionId ) return;

        await sc.from('user_actions').insert({ action_id: actionId, user_id: $user?.id });
        
        invalidate('supabase:db:user_actions');
    }

    function getColor(score: number): string {
        if (score < 2) return "bg-light-green text-black"; // Niedriger Score -> Grün
        if (score < 5) return "bg-yellow text-black"; // Mittlerer Score -> Gelb
        if (score < 7) return "bg-orange text-black"; // Höherer Score -> Orange
        return "bg-red text-black"; // Höchster Score -> Rot
    }
</script>

<body class= "m-6">
    <h2 class="text-light-olive text-4xl ml-1">Activity</h2>
    <select name="category" class="border rounded h-10 mb-2" bind:value={selectedCategory}>
        <option value={""} style="font-size: 0.75rem;">Select an action</option>
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
                        <img src= "/{action.image}" alt="pictogram" class="w-10 h-10">
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
                        type="button"
                        class={`flex justify-between items-center p-4 rounded ${getColor(userAction.actions.score)}`}
                        on:click={() => handleSubmit(userAction.actions.id)}
                    >
                        <img src= "/{userAction.actions.image}" alt="pictogram" class="w-10 h-10">
                    </button>
            </li>
        {/each}
    </ul>
</body>