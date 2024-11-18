import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ depends, locals: { supabase, user } }) => {
	depends('supabase:db:user_actions', 'supabase:db:actions', 'supabase:db:user_goals');
	
	const { data: userActions } = await supabase.from('user_actions').select(
		`
			created_at,
			actions (name, score, category)
		`
	).order('created_at', { ascending: false }).eq('user_id',user.id).limit(4);
	const { data: userGoal } = await supabase.from('user_goals').select('goal').single();

	let score = 0;
	userActions.forEach((userAction) => {
		score += userAction.actions.score;
	});

	return { goal: userGoal.goal as number ?? 0, score, userActions };
};