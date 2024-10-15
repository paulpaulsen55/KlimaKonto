<script lang="ts">
    import { invalidate } from '$app/navigation';
  import SelectInitialGoalPopup from '$lib/SelectInitialGoalPopup.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ userActions, actions, supabase, user } = data);

    async function handleSubmit(event: Event) {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const action = formData.get('action') as string;

        if (!action) return;

        const {error} = await supabase.from('user_actions').insert({ action_id: action, user_id: user?.id });
        console.log(error);
        
        invalidate('supabase:db:user_actions');
        form.reset();
    }
</script>
<SelectInitialGoalPopup {supabase} {user} goal = {0}>

</SelectInitialGoalPopup>
<h1>Private page for user: {user?.email}</h1>
<h2>Bisherige Actions:</h2>
<ul>
	{#each userActions as action}
        <li>
            {actions.find(a => a.id === action.action_id)?.name} 
            - 
            {new Date(action.created_at).toLocaleDateString()}
        </li>
	{/each}
</ul>


<form on:submit={handleSubmit}>
    <select name="action" class="border-2">
        <option value="">Select an action</option>
        {#each actions as action}
            <option value={action.id}>{action.name}</option>
        {/each}
    </select>
    <button type="submit" class="bg-green-500 p-2 rounded m-2">Speichern</button>
</form>