import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ depends, locals: { supabase } }) => {
	depends('supabase:db:user_goals');

	const { data: userGoal } = await supabase.from('user_goals').select('goal').single();

	return { userGoal: userGoal.goal as number ?? 0 };
};