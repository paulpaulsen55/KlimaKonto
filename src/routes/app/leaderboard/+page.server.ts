import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ depends, locals: { supabase } }) => {
	depends('supabase:db:leaderboard');

	const { data: userActions } = await supabase.from('leaderboard').select("display_name, score").order('score', { ascending: false });

	return { userActions };
};