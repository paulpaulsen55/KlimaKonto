import { redirect, fail } from '@sveltejs/kit'

import type { Actions } from './$types'

export const actions: Actions = {
    register: async ({ request, locals: { supabase } }) => {
        const formData = await request.formData()
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        const { error } = await supabase.auth.signUp({ email, password })
        if (error) {
            return fail(400, { error: 'Invalid email or password' })
        } else {
            redirect(303, '/app/home')
        }
    },
}