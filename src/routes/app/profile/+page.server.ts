import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ depends, locals: { supabase, user } }) => {
	depends('supabase:db:user_goals');

	const { data: userGoal } = await supabase.from('user_goals').select('goal').single();
	const {data : profile} = await supabase.from('profiles').select('display_name').eq('user_id', user?.id).single();

	return { userGoal: userGoal.goal as number ?? 0, profile};
};