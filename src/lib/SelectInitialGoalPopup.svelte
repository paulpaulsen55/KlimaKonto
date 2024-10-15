<script lang="ts">
    import { invalidate } from '$app/navigation';

	export let goal: Number;
	export let supabase;
	export let user;

    async function handleSubmit(event: Event) {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const goal = formData.get('goal');

        if (!goal) return;

        const {error} = await supabase.from('user_goals').insert({ goal: goal, id: user?.id });
        console.log(error);
        
        invalidate('supabase:db:user_goals');
        form.reset();
    }
</script>
<div>
    <p>Settings</p>
    <form on:submit={handleSubmit}>
        <input type="number" name="goal" class="border-2" />
        <button type="submit" class="bg-green-500 p-2 rounded m-2">Speichern</button>
    </form>
</div>