/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export default function AddProjectCard({ size = "w-90 h-90" }: { size?: string } = {}) {
  return (
    <Link
      href="/dashboard/projects/new"
      className={`group relative block ${size}`}
    >
      <img
        src="/new-project-template.png"
        alt="add a new project"
        className="h-full w-full transition-transform group-hover:scale-105"
      />
    </Link>
  );
}
