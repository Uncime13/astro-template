import { createClient } from "@supabase/supabase-js";

export function getSupabaseServerClient(runtimeEnv) {
  const url = runtimeEnv?.locals.runtime.env.SUPABASE_URL;
  const key = runtimeEnv?.locals.runtime.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("Missing Supabase credentials.");
  }
  return createClient(url, key);
}
