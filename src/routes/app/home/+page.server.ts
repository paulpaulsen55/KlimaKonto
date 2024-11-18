import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ depends, locals: { supabase } }) => {
	depends('supabase:db:user_actions', 'supabase:db:actions');

	const { data: userActions } = await supabase.from('user_actions').select(
		`
			created_at,
			actions (name, score, category)
		`
	);
	const { data: actions } = await supabase.from('actions').select('id, score, name, category');
	const { data: userGoal } = await supabase.from('user_goals').select('goal').single();

	let score = 0;
	userActions.forEach((userAction) => {
		const action = actions.find((action) => action.name === userAction.actions.name);
		score += action.score;
	});

	return {goal: userGoal.goal ?? 0, score};
};