import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const actions: Actions = {
   changePassword: async ({ request, locals: { supabase } }) => {
      const formData = await request.formData();
      const newPassword = formData.get('new_password') as string;

      // Nutzer muss authentifiziert sein
      const { data: user } = await supabase.auth.getUser();

      if (!user) {
         return fail(401, { error: 'Benutzer ist nicht angemeldet' });
      }

      const { error } = await supabase.auth.updateUser({
         password: newPassword
      });

      if (error) {
         return fail(400, { error: 'Passwortänderung fehlgeschlagen: ' + error.message });
      }

      return {
         success: 'Passwort wurde erfolgreich geändert'
      };
   },
   deleteEntry: async ({ request, locals: {supabase} }) => {
      const formData = await request.formData();
      const id = formData.get('id');
      console.log(`Eintrag mit ID ${id} löschen...`);
      if (!id) {
        return fail(400, { error: 'Keine ID angegeben' });
      }
  
      const { error } = await supabase
        .from('user_actions')
        .delete()
        .eq('id', id);
  
      if (error) {
        console.error('Löschen fehlgeschlagen:', error.message);
        return fail(500, { error: 'Löschen fehlgeschlagen' });
      }
      console.log(`Eintrag mit ID ${id} gelöscht`);
      return { success: true };
   },
};

export const load: PageServerLoad = async ({ depends, locals: { supabase, user } }) => {
	depends('supabase:db:user_actions', 'supabase:db:actions');
	
	const { data: userActions } = await supabase.from('user_actions').select(
		`
			created_at,
			actions (name, score, category),
         id
		`
	);
	
   const { data: actions } = await supabase.from('actions').select('id, score, name, category');
   const { data: userGoal } = await supabase.from('user_goals').select('id, goal').single();
   const { data : profile} = await supabase.from('profiles').select('display_name').eq('user_id', user?.id).single();

	return { userActions: userActions ?? [], actions: actions ?? [], userGoal: userGoal.goal ?? [], profile };
};