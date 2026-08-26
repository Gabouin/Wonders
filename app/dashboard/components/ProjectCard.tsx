/* eslint-disable @next/next/no-img-element */
import type { Project } from "@/lib/projects";

const STATUS_LABEL: Record<Project["status"], string> = {
  building: "building :)",
  shipped: "shipped :D",
  in_review: "in review :3",
  reviewed: "reviewed :3c",
};

export default function ProjectCard({
  project,
  size = "w-90 h-90",
}: {
  project: Project;
  size?: string;
}) {
  return (
    <div className={`relative ${size}`}>
      <img
        src="/project-template-base-with-inputs.png"
        alt=""
        className="absolute inset-0 h-full w-full"
      />
      <img
        src={project.image_url || "/project-image-fallback.png"}
        alt=""
        className="absolute top-[6%] left-[8%] right-[8%] h-[40%] rounded-md object-cover"
      />
      <div className="absolute top-[51%] left-[14%] right-[6%] h-[11%] flex items-center overflow-hidden">
        <h3 className="truncate font-finger-paint text-lg text-[#5C4A2E]">
          {project.title}
        </h3>
      </div>
      <p className="absolute top-[66%] left-[14%] right-[6%] h-[24%] overflow-hidden font-poppins text-xs text-[#5C4A2E]">
        {project.description}
      </p>
      <span className="absolute bottom-[5%] right-[9%] font-finger-paint text-[10px] text-[#7A6B4A]">
        {STATUS_LABEL[project.status]}
      </span>
    </div>
  );
}
