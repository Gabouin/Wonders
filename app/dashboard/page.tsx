/* eslint-disable @next/next/no-img-element */
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionCookie } from "@/lib/hc-auth";

export default async function DashPage() {
  const cookieStore = await cookies();
  const session = verifySessionCookie(cookieStore.get(SESSION_COOKIE)?.value);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen w-full flex-col pt-10">
      <img src="/hi-welcome.png" alt="hi, welcome" className="w-120 h-auto" />
      <h1 className="font-finger-paint text-5xl text-[#D9D3AF]">
        {session.name || session.email}
      </h1>
    </div>
  );
}
