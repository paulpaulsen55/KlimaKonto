<script lang="ts">
    import { supabase } from '$lib/store';
    import type { SupabaseClient } from '@supabase/supabase-js';

    let displayName = "";
    let sc: SupabaseClient;

    supabase.subscribe(value => {
        if (!value) return;
        sc = value;
    });

    async function handleSubmit() {
        if (displayName == "") return;
        
        await sc.auth.updateUser({
            data: {
                display_name: displayName,
            }
        });
    }
</script>
<div>
    <p>Anzeigenamen Bearbeiten:</p>
    <form on:submit|preventDefault={handleSubmit}>
        <input type="text" name="displayName" class="border-2 text-black" bind:value={displayName} />
        <button type="submit" class="bg-green-500 p-2 rounded m-2">Speichern</button>
    </form>
</div>