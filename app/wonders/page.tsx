/* eslint-disable @next/next/no-img-element */
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionCookie } from "@/lib/hc-auth";
import { getProfile } from "@/lib/profiles";
import { getProjects } from "@/lib/projects";
import SidebarNav from "@/app/dashboard/components/SidebarNav";
import ProjectCardWide from "@/app/dashboard/components/ProjectCardWide";
import AddProjectCardWide from "@/app/dashboard/components/AddProjectCardWide";

export default async function ProjectsPage() {
  const cookieStore = await cookies();
  const session = verifySessionCookie(cookieStore.get(SESSION_COOKIE)?.value);

  if (!session) {
    redirect("/login");
  }

  const profile = await getProfile(session.slackId);
  if (!profile) {
    redirect("/onboarding");
  }

  const projects = await getProjects(profile.id);

  return (
    <div className="relative flex min-h-screen">
      <img
        className="fixed inset-0 -z-10 h-full w-full object-cover"
        src="/bg-effect-4.png"
        alt=""
      />
      <div className="relative sticky top-0 hidden h-screen shrink-0 md:block">
        <img className="h-full w-auto" src="/sidebar.png" alt="" />
        <SidebarNav />
      </div>
      <main className="relative min-w-0 flex-1 px-10 pt-10">
        <h1 className="font-finger-paint text-4xl text-[#BFD8A8]">
          Your Wonders
        </h1>
        <div className="mt-8 flex flex-col items-start gap-3">
          {projects.map((project) => (
            <ProjectCardWide
              key={project.id}
              project={project}
              className="w-full max-w-6xl"
            />
          ))}
          <AddProjectCardWide className="w-full max-w-6xl" redirectTo="/wonders" />
        </div>
      </main>
    </div>
  );
}
