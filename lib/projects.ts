import "server-only";
import { supabase } from "@/lib/supabase";

export type ProjectStatus = "building" | "shipped" | "in_review" | "reviewed";

export interface Project {
  id: string;
  profile_id: string;
  title: string;
  description: string;
  image_url: string | null;
  link_url: string | null;
  status: ProjectStatus;
  reviewer_note: string | null;
  reward: string | null;
  created_at: string;
}

export async function getProjects(profileId: string): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select(
      "id, profile_id, title, description, image_url, link_url, status, reviewer_note, reward, created_at",
    )
    .eq("profile_id", profileId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }
  return data;
}

export async function createProject(
  profileId: string,
  data: { title: string; description: string; link_url?: string },
): Promise<Project> {
  const { data: project, error } = await supabase
    .from("projects")
    .insert({
      profile_id: profileId,
      title: data.title,
      description: data.description,
      link_url: data.link_url || null,
    })
    .select(
      "id, profile_id, title, description, image_url, link_url, status, reviewer_note, reward, created_at",
    )
    .single();

  if (error) {
    throw error;
  }
  return project;
}

export async function getProject(id: string): Promise<Project | null> {
  const { data, error } = await supabase
    .from("projects")
    .select(
      "id, profile_id, title, description, image_url, link_url, status, reviewer_note, reward, created_at",
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw error;
  }
  return data;
}

export async function updateProject(
  id: string,
  profileId: string,
  data: { title: string; description: string; link_url?: string },
) {
  const { error } = await supabase
    .from("projects")
    .update({
      title: data.title,
      description: data.description,
      link_url: data.link_url || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("profile_id", profileId);

  if (error) {
    throw error;
  }
}

export async function deleteProject(id: string, profileId: string) {
  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id)
    .eq("profile_id", profileId);

  if (error) {
    throw error;
  }
}
