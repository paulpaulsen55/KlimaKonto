<script lang="ts">
    import { invalidate } from '$app/navigation';
    import type { SupabaseClient } from '@supabase/supabase-js';
	import type { PageData } from './$types';
    import { supabase, user } from '$lib/store';

	export let data: PageData;

    $: ({ userActions, actions } = data);	

	let sc: SupabaseClient;
    let action = 0;

    supabase.subscribe(value => {
        if (!value) return;
        sc = value;
    });


    async function handleSubmit() {
        if (action == 0) return;

        await sc.from('user_actions').insert({ action_id: action, user_id: $user?.id });
        
        invalidate('supabase:db:user_actions');
    }
</script>
<body>
    <h1>Private page for user: {$user?.email}</h1>
    <h2>Bisherige Actions:</h2>
    <ul>
        {#each userActions as userAction}
            <li>
                {userAction.actions.name} - {userAction.actions.score} - {userAction.created_at}
            </li>
        {/each}
    </ul>



    <form on:submit|preventDefault={handleSubmit}>
        <select name="action" class="border-2" bind:value={action}>
            <option value={0}>Select an action</option>
            {#each actions as action}
                <option value={action.id}>{action.name} - {action.score}</option>
            {/each}
        </select>
        <button type="submit" class="bg-green-500 p-2 rounded m-2">Speichern</button>
    </form>
</body>