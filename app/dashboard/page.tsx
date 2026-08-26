/* eslint-disable @next/next/no-img-element */
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";
import { SESSION_COOKIE, verifySessionCookie } from "@/lib/hc-auth";
import { getProfile } from "@/lib/profiles";
import { getProjects } from "@/lib/projects";
import ProjectCard from "./components/ProjectCard";
import AddProjectCard from "./components/AddProjectCard";

export default async function DashPage() {
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
    <div className="flex min-h-screen w-full flex-col px-6 pt-20 md:px-10 md:pt-10">
      <img
        src="/hi-welcome.png"
        alt="hi, welcome"
        className="h-auto w-full max-w-120"
      />
      <h1 className="font-finger-paint wrap-break-word text-5xl text-[#D9D3AF]">
        {session.name || session.email}
      </h1>
      <div className="pt-10 w-full flex flex-col gap-5">
        <div className="flex flex-wrap items-center justify-between gap-3 w-full max-w-180">
          <h1 className="text-[#BFD8A8] font-finger-paint text-4xl">Wonders</h1>
          <Link
            href="/wonders"
            className="font-finger-paint text-lg text-[#F2B3AD] hover:underline"
          >
            go to /wonders to see all &gt;
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              size="aspect-square w-full max-w-90"
            />
          ))}
          <AddProjectCard size="aspect-square w-full max-w-90" />
        </div>
      </div>
    </div>
  );
}
