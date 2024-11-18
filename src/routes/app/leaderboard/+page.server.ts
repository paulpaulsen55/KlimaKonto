import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ depends, locals: { supabase } }) => {
	depends('supabase:db:leaderboard');

	const { data: userActions, error: error } = await supabase.from('leaderboard').select(
		`
			score,
			profi´les:user_id
		`
	).order('score', { ascending: false });

	console.log(error, userActions);
	

	return { userActions };
};