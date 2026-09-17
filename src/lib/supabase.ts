import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function hasSupabaseEnv(): boolean {
  return Boolean(url && anonKey);
}

let client: SupabaseClient | null = null;

/** Browser / server client with the publishable (anon) key only. */
export function getSupabase(): SupabaseClient | null {
  if (!hasSupabaseEnv()) return null;
  if (!client) {
    client = createClient(url!, anonKey!);
  }
  return client;
}
