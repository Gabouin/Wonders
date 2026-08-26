/* eslint-disable @next/next/no-img-element */
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionCookie } from "@/lib/hc-auth";
import { getProfile } from "@/lib/profiles";
import { getProject, updateProject } from "@/lib/projects";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const cookieStore = await cookies();
  const session = verifySessionCookie(cookieStore.get(SESSION_COOKIE)?.value);
  if (!session) {
    redirect("/login");
  }

  const profile = await getProfile(session.slackId);
  if (!profile) {
    redirect("/onboarding");
  }

  const project = await getProject(id);
  if (!project || project.profile_id !== profile.id) {
    redirect("/wonders");
  }

  async function submitProject(formData: FormData) {
    "use server";

    const store = await cookies();
    const current = verifySessionCookie(store.get(SESSION_COOKIE)?.value);
    if (!current) {
      redirect("/login");
    }

    const currentProfile = await getProfile(current.slackId);
    if (!currentProfile) {
      redirect("/onboarding");
    }

    const existing = await getProject(id);
    if (!existing || existing.profile_id !== currentProfile.id) {
      redirect("/wonders");
    }

    const title = String(formData.get("title") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    if (!title || !description) {
      return;
    }

    await updateProject(id, currentProfile.id, { title, description });
    redirect("/wonders");
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-6 px-6 py-10 text-center">
      <h1 className="font-finger-paint max-w-md text-3xl text-[#BFD8A8]">
        Edit your Wonder
      </h1>
      <form action={submitProject} className="w-full max-w-sm">
        <div className="relative mx-auto aspect-527/500 w-full">
          <img
            src="/project-template-base-with-inputs.png"
            alt=""
            className="absolute inset-0 h-full w-full"
          />
          <input
            name="title"
            required
            defaultValue={project.title}
            placeholder="give it a name"
            className="absolute top-[44%] left-[9%] right-[6%] h-[11%] bg-transparent px-3 font-finger-paint text-base text-[#5C4A2E] placeholder:text-[#8C8368] focus:outline-none"
          />
          <textarea
            name="description"
            required
            defaultValue={project.description}
            placeholder="what is it? why does it feel like you?"
            className="absolute top-[58%] left-[9%] right-[6%] h-[24%] resize-none bg-transparent px-3 py-2 font-poppins text-sm text-[#5C4A2E] placeholder:text-[#8C8368] focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="mt-6 rounded-md bg-[#3B82C4] px-4 py-2 font-finger-paint text-lg text-white transition hover:scale-105"
        >
          Save
        </button>
      </form>
    </div>
  );
}
