import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ depends, locals: { supabase } }) => {
	depends('supabase:db:user_goals');

	const { data: userActions, error: error } = await supabase.from('user_actions').select(
		`
			created_at,
			actions (name, score, category),
			user_id (raw_user_meta_data)
		`
	);

	console.log(userActions, error);
	
	const { data: actions } = await supabase.from('actions').select('id, score, name, category');

	let userScores = {};
	userActions.forEach((userAction) => {
		userScores[userAction.user_id.raw_user_meta_data.display_name] = userScores[userAction.user_id.raw_user_meta_data.display_name] + userAction.actions.score;
	});

	console.log(userScores);
	
	return {  };
};