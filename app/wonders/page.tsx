/* eslint-disable @next/next/no-img-element */
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionCookie } from "@/lib/hc-auth";
import { getProfile } from "@/lib/profiles";
import { getProjects } from "@/lib/projects";
import Sidebar from "@/app/dashboard/components/Sidebar";
import ProjectCard from "@/app/dashboard/components/ProjectCard";
import AddProjectCard from "@/app/dashboard/components/AddProjectCard";
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
      <Sidebar />
      <main className="relative min-w-0 flex-1 px-6 pt-20 md:px-10 md:pt-10">
        <h1 className="font-finger-paint text-4xl text-[#BFD8A8]">
          Your Wonders
        </h1>

        {/* mobile: square card grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:hidden">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              size="aspect-square w-full"
            />
          ))}
          <AddProjectCard size="aspect-square w-full" redirectTo="/wonders" />
        </div>

        {/* desktop: wide banner list */}
        <div className="mt-8 hidden flex-col items-start gap-3 md:flex">
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
