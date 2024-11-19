import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ depends, locals: { supabase } }) => {
	depends('supabase:db:actions');

	const { data: actions } = await supabase.from('actions').select('id, score, name, category')

	return { actions };
};