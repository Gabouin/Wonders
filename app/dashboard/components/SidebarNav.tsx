/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

const links = [
  { href: "/dash", label: "Dashboard :)", src: "/button-template-1.png" },
  { href: "/projects", label: "Projects :D", src: "/button-template-2.png" },
  { href: "/explore", label: "Explore :3", src: "/button-template-3.png" },
];

export default function SidebarNav() {
  return (
    <nav className="absolute inset-0 flex flex-col gap-4 pt-32">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="relative block self-start group"
        >
          <img
            src={link.src}
            alt=""
            className="h-auto w-80 group-hover:w-85 transition-all"
          />
          <span className="absolute inset-0 flex items-center justify-center font-finger-paint text-3xl tracking-wide text-black">
            {link.label}
          </span>
        </Link>
      ))}
      <a
        href="/api/hc-auth/logout"
        className="relative mt-auto block self-start group"
      >
        <img
          src="/logout-button-template.png"
          alt=""
          className="h-auto w-95 group-hover:w-100 transition-all"
        />
        <span className="absolute inset-0 flex items-center justify-center font-finger-paint text-lg tracking-wide text-white">
          Log out :(
        </span>
      </a>
    </nav>
  );
}
