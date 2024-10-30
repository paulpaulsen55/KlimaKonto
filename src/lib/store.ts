import type { SupabaseClient, User } from "@supabase/supabase-js";
import { writable } from "svelte/store";


export const user = writable<User | null>(null);
export const userSetup = writable<boolean>(false);
export const supabase = writable<SupabaseClient | null>(null);