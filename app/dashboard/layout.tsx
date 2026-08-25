/* eslint-disable @next/next/no-img-element */

import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionCookie } from "@/lib/hc-auth";
import SidebarNav from "./components/SidebarNav";

export default async function DashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const session = verifySessionCookie(cookieStore.get(SESSION_COOKIE)?.value);

  return (
    <div className="relative flex min-h-screen">
      <img
        className="fixed inset-0 -z-10 h-full w-full object-cover"
        src={"/bg-effect-4.png"}
        alt=""
      />
      {session && (
        <div className="relative sticky top-0 hidden h-screen shrink-0 md:block">
          <img className="h-full w-auto" src={"/sidebar.png"} alt="" />
          <SidebarNav />
        </div>
      )}
      <main className="relative min-w-0 flex-1">{children}</main>
    </div>
  );
}
