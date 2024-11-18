import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ depends, locals: { supabase } }) => {
	depends('supabase:db:user_actions', 'supabase:db:actions');

	const { data: userActions } = await supabase.from('user_actions').select(
		`
			created_at,
			actions (name, score, category)
		`
	).order('created_at', { ascending: false });
	const { data: actions } = await supabase.from('actions').select('id, score, name, category');
	const { data: userGoal } = await supabase.from('user_goals').select('goal').single();

	let score = 0;
	userActions.forEach((userAction) => {
		const action = actions.find((action) => action.name === userAction.actions.name);
		score += action.score;
	});

	const lastActionDate: string = userActions[0]?.created_at;
	let daysSinceLastAction = 0;
	if (lastActionDate) {
		const lastActionDateObj = new Date(lastActionDate);
		const today = new Date();
		const diffTime = Math.abs(today.getTime() - lastActionDateObj.getTime());
		daysSinceLastAction = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	}
	
	console.log(daysSinceLastAction);
	

	return {goal: userGoal.goal as number ?? 0, score, daysSinceLastAction: daysSinceLastAction};
};