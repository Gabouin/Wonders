/* eslint-disable @next/next/no-img-element */
import type { Project } from "@/lib/projects";

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
  return (
    <div
      className={`relative aspect-1327/345 overflow-hidden ${className}`}
    >
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
      <div className="absolute top-[5.5%] left-[42%] h-[16%] w-[56%] flex items-center overflow-hidden">
        <h3 className="truncate font-finger-paint text-lg text-[#5C4A2E]">
          {project.title}
        </h3>
      </div>
      <p className="absolute top-[24%] left-[42%] h-[39%] w-[56%] overflow-hidden font-poppins text-xs text-[#5C4A2E]">
        {project.description}
      </p>
      <span className="absolute bottom-[3%] right-[3%] font-finger-paint text-[10px] text-[#7A6B4A]">
        {STATUS_LABEL[project.status]}
      </span>
    </div>
  );
}
