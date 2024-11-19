import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ depends, locals: { supabase } }) => {
	depends('supabase:db:leaderboard');

	const { data: userActions } = await supabase.from('leaderboard').select(
		`
			score,
			user_id (display_name)
		`
	).order('score', { ascending: true }).limit(10);

	return { userActions };
};