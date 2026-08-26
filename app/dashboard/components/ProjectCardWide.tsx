/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { SESSION_COOKIE, verifySessionCookie } from "@/lib/hc-auth";
import { getProfile } from "@/lib/profiles";
import { deleteProject, type Project } from "@/lib/projects";
import DeleteProjectButton from "./DeleteProjectButton";

const STATUS_LABEL: Record<Project["status"], string> = {
  building: "building :)",
  shipped: "shipped :D",
  in_review: "in review :3",
  reviewed: "reviewed :3c",
};

export default function ProjectCardWide({
  project,
  className = "w-full max-w-3xl",
}: {
  project: Project;
  className?: string;
}) {
  async function deleteProjectAction() {
    "use server";

    const cookieStore = await cookies();
    const session = verifySessionCookie(cookieStore.get(SESSION_COOKIE)?.value);
    if (!session) {
      redirect("/login");
    }

    const profile = await getProfile(session.slackId);
    if (!profile) {
      redirect("/onboarding");
    }

    await deleteProject(project.id, profile.id);
    revalidatePath("/dashboard");
    revalidatePath("/wonders");
  }

  return (
    <div className={`relative aspect-1327/345 overflow-hidden ${className}`}>
      <img
        src="/project-template-base-with-inputs-1.png"
        alt=""
        className="absolute top-[-51.01%] left-[-25.62%] w-[144.69%] max-w-none"
      />
      <img
        src={project.image_url || "/project-image-fallback.png"}
        alt=""
        className="absolute top-[5%] left-[3%] h-[74%] w-[36%] rounded-md object-cover"
      />
      <div className="absolute top-[5.5%] left-[43%] h-[16%] w-[56%] flex items-center overflow-hidden">
        <h3 className="truncate font-finger-paint text-lg text-[#5C4A2E]">
          {project.title}
        </h3>
      </div>
      <p className="absolute top-[26%] left-[43%] h-[39%] w-[56%] overflow-hidden font-poppins text-xs text-[#5C4A2E]">
        {project.description}
      </p>
      <DeleteProjectButton
        action={deleteProjectAction}
        className="absolute bottom-[22%] left-[42%] w-[28%] py-1 cursor-pointer hover:zoom-110 transition-all font-finger-paint text-xl bg-[#F2B3AD] text-black/45 rounded-lg"
      />
      <Link
        href={`/dashboard/projects/edit/${project.id}`}
        className="absolute bottom-[22%] right-[0%] w-[28%] py-1 text-center cursor-pointer hover:zoom-110 transition-all font-finger-paint text-xl bg-[#D0E4B4] text-black/45 rounded-lg"
      >
        Edit :3
      </Link>
      <span className="absolute bottom-[18%] right-[2%] font-finger-paint text-[10px] text-[#7A6B4A]">
        {STATUS_LABEL[project.status]}
      </span>
    </div>
  );
}
