import "server-only";
import { createClient } from "@supabase/supabase-js";

function getEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} env var is not set`);
  }
  return value;
}

export const supabase = createClient(
  getEnv("SUPABASE_URL"),
  getEnv("SUPABASE_SERVICE_ROLE_KEY"),
  { auth: { persistSession: false } },
);
