<script lang="ts">
    import { invalidate } from '$app/navigation';
    import { supabase, user } from '$lib/store';
    import type { SupabaseClient } from '@supabase/supabase-js';

    let goal = 0;
    let sc: SupabaseClient;

    supabase.subscribe(value => {
        if (!value) return;
        sc = value;
    });

    async function handleSubmit() {
        await sc.from('user_goals').upsert({ goal: goal, id: $user?.id });
        
        invalidate('supabase:db:user_goals');
    }
</script>
<div>
    <p>Settings</p>
    <form on:submit|preventDefault={handleSubmit}>
        <input type="number" name="goal" class="border-2" bind:value={goal} />
        <button type="submit" class="bg-green-500 p-2 rounded m-2">Speichern</button>
    </form>
</div>