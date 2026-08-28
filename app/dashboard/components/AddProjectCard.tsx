/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export default function AddProjectCard({
  size = "w-90 h-90",
  redirectTo = "/dashboard",
}: {
  size?: string;
  redirectTo?: string;
} = {}) {
  return (
    <Link
      href={`/dashboard/projects/new?redirect_to=${encodeURIComponent(redirectTo)}`}
      className={`group relative block ${size}`}
    >
      <img
        src="/project-template-base.png"
        alt="add a new project"
        className="h-full w-full transition-transform group-hover:zoom-110"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative aspect-square h-[40%] rounded-full bg-[#E7E2C9] transition-transform group-hover:scale-110">
          <span className="absolute top-1/2 left-1/2 h-[12%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F8F7E8]" />
          <span className="absolute top-1/2 left-1/2 h-[70%] w-[12%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F8F7E8]" />
        </div>
      </div>
    </Link>
  );
}
