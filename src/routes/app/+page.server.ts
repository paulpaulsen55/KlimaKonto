import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ depends, locals: { supabase } }) => {
	depends('supabase:db:user_actions', 'supabase:db:actions');
	const { data: userActions } = await supabase.from('user_actions').select('action_id, created_at');
    const { data: actions } = await supabase.from('actions').select('*');
	return { userActions: userActions ?? [], actions: actions ?? [] };
};