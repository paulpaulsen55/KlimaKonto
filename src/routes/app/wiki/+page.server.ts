import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ depends, locals: { supabase } }) => {
	depends('supabase:db:actions');

	const { data: actions } = await supabase.from('actions').select('id, score, name, category, tip')
	const { data: categories } = await supabase.from('actions').select('category')
	const uniqueCategories = [...new Set(actions.map((action: { category: any; }) => action.category))];

	return { actions, categories: uniqueCategories };
};