import "server-only";
import { supabase } from "@/lib/supabase";

export interface Profile {
  id: string;
  slack_id: string;
  email: string;
  name: string;
  interest: string | null;
}

export async function getProfile(slackId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, slack_id, email, name, interest")
    .eq("slack_id", slackId)
    .maybeSingle();

  if (error) {
    throw error;
  }
  return data;
}

export async function saveInterest(session: {
  slackId: string;
  email: string;
  name: string;
}, interest: string) {
  const { error } = await supabase.from("profiles").upsert(
    {
      slack_id: session.slackId,
      email: session.email,
      name: session.name,
      interest,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "slack_id" },
  );

  if (error) {
    throw error;
  }
}
