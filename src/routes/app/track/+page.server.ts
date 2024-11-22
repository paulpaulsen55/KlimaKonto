import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ depends, locals: { supabase } }) => {
	depends('supabase:db:user_actions', 'supabase:db:actions');
	
	const { data: userActions } = await supabase.from('user_actions').select(
		`
			created_at,
			actions (id, name, score, category, image)
		`
	).limit(8).order('created_at', { ascending: false });
	
	const { data: allActions } = await supabase.from('actions').select('id, score, name, category, image');
	const actions: Action[] = allActions ?? [];

	const categories = [...new Set(actions.map((action) => action.category))]

	return { userActions: userActions ?? [], actions, categories };
};