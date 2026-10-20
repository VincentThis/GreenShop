import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";
const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
// Explicit opt-in prevents contacting the inaccessible old project.
export const isSupabaseConfigured =
  import.meta.env.VITE_ENABLE_SUPABASE === "true" && Boolean(url && key);
export const supabase = createClient<Database>(
  isSupabaseConfigured ? url : "https://preview.supabase.co",
  isSupabaseConfigured ? key : "preview-public-key",
  {
    auth: {
      persistSession: isSupabaseConfigured,
      autoRefreshToken: isSupabaseConfigured,
      detectSessionInUrl: isSupabaseConfigured,
    },
  },
);
