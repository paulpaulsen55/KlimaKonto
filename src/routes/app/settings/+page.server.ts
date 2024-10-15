import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({
  depends,
  locals: { supabase },
}) => {
  depends("supabase:db:user_goals");
  const { data: goal } = await supabase.from("user_goals").select("goal");
  return { goal: goal ?? [] };
};
