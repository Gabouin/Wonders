import Link from "next/link";

export default function AddProjectCardWide({
  className = "w-full max-w-4xl",
  redirectTo = "/dashboard",
}: {
  className?: string;
  redirectTo?: string;
} = {}) {
  return (
    <Link
      href={`/dashboard/projects/new?redirect_to=${encodeURIComponent(redirectTo)}`}
      className={`group relative block aspect-1327/345 overflow-hidden ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/project-template-base-1.png"
        alt="add a new project"
        className="absolute top-[-51.01%] left-[-25.62%] w-[144.69%] max-w-none"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative aspect-square h-[55%] rounded-full bg-[#E7E2C9] transition-transform group-hover:scale-110">
          <span className="absolute top-1/2 left-1/2 h-[12%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F8F7E8]" />
          <span className="absolute top-1/2 left-1/2 h-[70%] w-[12%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F8F7E8]" />
        </div>
      </div>
    </Link>
  );
}
