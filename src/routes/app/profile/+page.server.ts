import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { goto } from '$app/navigation';
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
   //  changeGoal: async ({ request, locals: {supabase} }) => {
   //    const formData = await request.formData();
   //    const goal = formData.get('goal');
   //    const id = formData.get('id');
   //    console.log(`${id}: ${goal}`)
   //    if (!goal || !id) {
   //       return fail(400, { error: 'Goal oder User ID fehlen.' });
   //     }

   //    const { data, error } = await supabase
   //    .from('user_goals') 
   //    .update({ goal }) 
   //    .eq('id', id); 

   //   if (error) {
   //     console.error('Fehler beim Aktualisieren des Ziels:', error.message);
   //     return fail(500, { error: 'Aktualisieren des Ziels fehlgeschlagen.' });
   //   }
 
   //   return {
   //     success: true,
   //     updatedGoal: data
   //   };
   // },
};

export const load: PageServerLoad = async ({ depends, locals: { supabase } }) => {
	depends('supabase:db:user_actions', 'supabase:db:actions');
	
	const { data: userActions } = await supabase.from('user_actions').select(
		`
			created_at,
			actions (name, score, category),
         id
		`
	);
	
   const { data: actions } = await supabase.from('actions').select('id, score, name, category');
   const { data: userGoals } = await supabase.from('user_goals').select('id, goal');


	return { userActions: userActions ?? [], actions: actions ?? [], userGoals: userGoals ?? [] };
};