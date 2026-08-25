/* eslint-disable @next/next/no-img-element */
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionCookie } from "@/lib/hc-auth";

export default async function DashPage({
  searchParams,
}: {
  searchParams: Promise<{ denied?: string; error?: string }>;
}) {
  const { denied, error } = await searchParams;
  const cookieStore = await cookies();
  const session = verifySessionCookie(cookieStore.get(SESSION_COOKIE)?.value);

  if (!session) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <img src="/logo.png" alt="hi, welcome" className="w-120 h-auto" />
        {denied && (
          <p className="max-w-sm font-poppins text-sm text-red-600">
            That Hack Club account isn&apos;t allowed in here yet.
          </p>
        )}
        {error && (
          <p className="max-w-sm font-poppins text-sm text-red-600">
            Something went wrong signing you in ({error}). Try again.
          </p>
        )}
        <a href="/api/hc-auth/login" className="group">
          <img
            src="/login-with-hc.png"
            alt="login with hc"
            className="w-90 h-auto group-hover:w-95 transition-all"
          />
        </a>
      </div>
    );
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
