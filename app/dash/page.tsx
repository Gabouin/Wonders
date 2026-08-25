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
        <h1 className="font-poppins text-2xl font-bold text-black">
          Player Dashboard
        </h1>
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
        <a
          href="/api/hc-auth/login"
          className="rounded-lg bg-black px-6 py-3 font-poppins font-medium text-white transition-opacity hover:opacity-80"
        >
          Sign in with Hack Club
        </a>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="font-poppins text-2xl font-bold break-words text-black">
        Welcome, {session.name || session.email}
      </h1>
      <p className="font-poppins text-sm text-black/60">
        Player dashboard coming soon.
      </p>
      <a
        href="/api/hc-auth/logout"
        className="font-poppins text-sm text-black/60 underline"
      >
        Sign out
      </a>
    </div>
  );
}
