import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ depends, locals: { supabase } }) => {
	depends('supabase:db:actions');

	const { data: actions } = await supabase.from('actions').select('id, wiki, score, name, category, tip').order('score', { ascending: true });
	const uniqueCategories = [...new Set(actions.map((action: { category: any; }) => action.category))];

	return { actions, categories: uniqueCategories };
};