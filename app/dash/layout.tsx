/* eslint-disable @next/next/no-img-element */

import SidebarNav from "./components/SidebarNav";

export default function DashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen">
      <img
        className="fixed inset-0 -z-10 h-full w-full object-cover"
        src={"/bg-effect-2.png"}
        alt=""
      />
      <div className="relative sticky top-0 hidden h-screen shrink-0 md:block">
        <img className="h-full w-auto" src={"/sidebar.png"} alt="" />
        <SidebarNav />
      </div>
      <main className="relative min-w-0 flex-1">{children}</main>
    </div>
  );
}
