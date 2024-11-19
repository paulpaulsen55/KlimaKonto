<script lang="ts">
    import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	export let data: PageData;
    $: ({ supabase, actions, user } = data);	

    let action = 0;

    async function handleSubmit() {
        if (action == 0) return;

        await supabase.from('user_actions').insert({ action_id: action, user_id: user?.id });
        
        goto('/app/home');
    }
</script>

<form on:submit|preventDefault={handleSubmit}>
    <select name="action" class="border-2" bind:value={action}>
        <option value={0}>Select an action</option>
        {#each actions as action}
            <option value={action.id}>{action.name} - {action.score}</option>
        {/each}
    </select>
    <button type="submit" class="bg-green-500 p-2 rounded m-2">Speichern</button>
</form>