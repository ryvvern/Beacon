import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error(
    "Missing environment variable NEXT_PUBLIC_SUPABASE_URL. Set it in .env.local (see .env.example)."
  );
}

if (!supabaseServiceRoleKey) {
  throw new Error(
    "Missing environment variable SUPABASE_SERVICE_ROLE_KEY. Set it in .env.local (see .env.example). This key is server-side only — never expose it to the browser."
  );
}

export const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    persistSession: false,
  },
});
