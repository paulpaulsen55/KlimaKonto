import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ depends, locals: { supabase } }) => {
	depends('supabase:db:user_actions', 'supabase:db:actions');
	
	const { data: userActions } = await supabase.from('user_actions').select(
		`
			created_at,
			actions (name, score, category)
		`
	);
	
    const { data: actions } = await supabase.from('actions').select('id, score, name, category, image');

	return { userActions: userActions ?? [], actions: actions ?? [] };
};