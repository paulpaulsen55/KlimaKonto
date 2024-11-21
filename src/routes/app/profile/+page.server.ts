import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const actions: Actions = {
   changePassword: async ({ request, locals: { supabase } }) => {
      const formData = await request.formData();
      const newPassword = formData.get('new_password') as string;
      
      const { error } = await supabase.auth.updateUser({ password: newPassword });

      if (error) return fail(400, { error: { message: "Password change failed", target: 5 } });

      return { success: { message: "Password changed successfully", target: 5 } };
   },
   deleteEntry: async ({ request, locals: { supabase } }) => {
      const formData = await request.formData();
      const id = formData.get('id');
  
      const { error } = await supabase
        .from('user_actions')
        .delete()
        .eq('id', id);
  
      if (error) return fail(500, { error: { message: "Entry could not be deleted", target: 0 } });
      
      return { success: { message: "Entry deleted successfully", target: 0 } };
   },
   updateDisplayname: async ({ request, locals: { supabase, user } }) => {
      const formData = await request.formData();
      const display_name = formData.get('display_name') as string;

      const { error } = await supabase.from('profiles').upsert({
         display_name: display_name,
         user_id: user.id
      });

      if (error) return fail(400, { error: { message: "Display name could not be changed", target: 3 } });

      return { success: { message: "Display name changed successfully", target: 3 } };
   },
   updateGoal: async ({ request, locals: { supabase, user } }) => {
      const formData = await request.formData();
      const goal = Number(formData.get('goal'));

      if (goal <= 0 || goal > 1000) return fail(400, { error: { message: "Error: Make sure to select a value between 1 and 1000", target: 1 } });

      const { error } = await supabase.from('user_goals').upsert({
         goal: goal,
         id: user.id
      });

      if (error) return fail(400, { error: { message: "Goal could not be changed", target: 1 } });

      console.log('Goal changed successfully', goal);
      
      return { success: { message: "Goal changed successfully", target: 1 } };
   }
};

export const load: PageServerLoad = async ({ depends, locals: { supabase, user } }) => {
	depends('supabase:db:user_actions', 'supabase:db:user_goals','supabase:db:profiles');
	
	const { data: userActions } = await supabase.from('user_actions').select(
		`
			created_at,
			actions (name, score, category),
         id
		`
	).limit(20).order('created_at', { ascending: false });
	
   const { data: actions } = await supabase.from('actions').select('id, score, name, category');
   const { data: userGoal } = await supabase.from('user_goals').select('id, goal').single();
   const { data : profile} = await supabase.from('profiles').select('display_name').eq('user_id', user?.id).single();

	return { userActions: userActions ?? [], actions: actions ?? [], userGoal: userGoal.goal ?? [], profile };
};