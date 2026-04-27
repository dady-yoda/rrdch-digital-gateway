// ─────────────────────────────────────────────────────────
//  RRDCH — Supabase client (singleton)
// ─────────────────────────────────────────────────────────
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase env vars. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file."
  );
}

// Create a dummy lock to bypass local storage lock hangs during login
const dummyLock = {
  acquire: async (name: string, callback: () => Promise<any>) => {
    return await callback();
  },
  release: async (name: string) => {}
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storageKey: 'rrdch-auth-token-v3', // Force fresh storage key
    lock: dummyLock, // Bypass standard locking mechanism which causes the 10s timeouts
  }
});
