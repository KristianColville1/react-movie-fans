import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Fail here rather than at the first query, so a missing .env is obvious on
// the very first load instead of looking like a broken sign in.
if (!url || !publishableKey) {
    throw new Error(
        "Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in .env",
    );
}

// The publishable key is meant to be public. Row level security on every
// table is what actually keeps one user out of another user's rows.
export const supabase = createClient(url, publishableKey);
