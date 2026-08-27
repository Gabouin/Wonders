/* eslint-disable @next/next/no-img-element */
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { SESSION_COOKIE, verifySessionCookie } from "@/lib/hc-auth";
import { getProfile } from "@/lib/profiles";
import { deleteProject, getProject, updateProject } from "@/lib/projects";
import DeleteProjectButton from "@/app/dashboard/components/DeleteProjectButton";

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
    const githubUrl = String(formData.get("github-repo-url") ?? "").trim();
    const demoUrl = String(formData.get("demo-url") ?? "").trim();
    if (!title || !description || !githubUrl || !demoUrl) {
      return;
    }

    await updateProject(id, currentProfile.id, {
      title,
      description,
      link_url: demoUrl,
      github_url: githubUrl,
    });
    redirect("/wonders");
  }

  async function deleteProjectAction() {
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

    await deleteProject(id, currentProfile.id);
    revalidatePath("/dashboard");
    revalidatePath("/wonders");
  }

  return (
    <div className="relative flex min-h-screen flex-col gap-6 bg-[#F0EBD1] px-6 pt-24 pb-10 sm:px-10 md:bg-transparent md:px-14 md:py-16 lg:py-28">
      <img
        src="/new-or-edit-projects-template.png"
        alt=""
        className="fixed top-0 right-[12%] bottom-[14%] left-[7.5%] -z-10 hidden h-full w-full object-contain md:block"
      />
      <h1 className="font-finger-paint text-3xl text-[#5C4A2E] sm:text-4xl lg:text-5xl">
        Edit your Wonder
      </h1>
      <form
        action={submitProject}
        className="flex w-full flex-col gap-4 md:max-w-[84%]"
      >
        <p className="font-finger-paint text-[#5C4A2E]/70">
          Give your wonder a name :3
        </p>
        <input
          name="title"
          required
          defaultValue={project.title}
          placeholder="give it a name"
          className="w-full border border-[#8C8368]/30 bg-[#E7E2C9] px-4 py-3 font-finger-paint text-base text-[#5C4A2E] placeholder:text-[#8C8368] focus:border-[#8C8368] focus:outline-none md:border-0"
        />
        <p className="font-finger-paint text-[#5C4A2E]/70">
          Give your wonder a description :3
        </p>
        <textarea
          name="description"
          required
          defaultValue={project.description}
          placeholder="what is it? why does it feel like you?"
          rows={5}
          className="w-full font-finger-paint resize-none border border-[#8C8368]/30 bg-[#E7E2C9] px-4 py-3 text-base text-[#5C4A2E] placeholder:text-[#8C8368] focus:border-[#8C8368] focus:outline-none md:border-0"
        />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="flex w-full flex-col gap-2">
            <p className="font-finger-paint text-[#5C4A2E]/70">
              Github repo url :D
            </p>
            <input
              name="github-repo-url"
              required
              defaultValue={project.github_url ?? ""}
              placeholder="https://"
              className="w-full border border-[#8C8368]/30 bg-[#E7E2C9] px-4 py-3 font-finger-paint text-base text-[#5C4A2E] placeholder:text-[#8C8368] focus:border-[#8C8368] focus:outline-none md:border-0"
            />
          </span>
          <span className="flex w-full flex-col gap-2">
            <p className="font-finger-paint text-[#5C4A2E]/70">Demo url :D</p>
            <input
              name="demo-url"
              required
              defaultValue={project.link_url ?? ""}
              placeholder="https://"
              className="w-full border border-[#8C8368]/30 bg-[#E7E2C9] px-4 py-3 font-finger-paint text-base text-[#5C4A2E] placeholder:text-[#8C8368] focus:border-[#8C8368] focus:outline-none md:border-0"
            />
          </span>
        </div>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:justify-end">
          <DeleteProjectButton
            action={deleteProjectAction}
            label="Delete it :("
            className="w-full rounded-md bg-[#F2B3AD] px-4 py-2 font-finger-paint text-lg text-black/40 transition hover:scale-105 sm:w-48"
          />
          <button
            type="submit"
            className="w-full rounded-md bg-[#D1E4B5] px-4 py-2 font-finger-paint text-lg text-black/40 transition hover:scale-105 sm:w-48"
          >
            Save it :3
          </button>
        </div>
      </form>
    </div>
  );
}
