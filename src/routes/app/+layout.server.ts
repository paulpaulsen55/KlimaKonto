import { redirect } from '@sveltejs/kit';


/** @type {import('./$types').PageServerLoad} */
export const load = async ({ route, depends, locals: { supabase } }) => {
    depends('supabase:db:user_goals');
    const { data: userGoals } = await supabase.from('user_goals').select('id');

    if (route.id !== "/app/setup" && userGoals.length === 0) {
        throw redirect(302, '/app/setup');
    } else {
        return;
    }
};