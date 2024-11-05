import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { goto } from '$app/navigation';

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
};