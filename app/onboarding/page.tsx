/* eslint-disable @next/next/no-img-element */
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionCookie } from "@/lib/hc-auth";
import { getProfile, saveInterest } from "@/lib/profiles";

export default async function OnboardingPage() {
  const cookieStore = await cookies();
  const session = verifySessionCookie(cookieStore.get(SESSION_COOKIE)?.value);

  if (!session) {
    redirect("/login");
  }

  const profile = await getProfile(session.slackId);
  if (profile?.interest) {
    redirect("/dashboard");
  }

  async function submitInterest(formData: FormData) {
    "use server";

    const store = await cookies();
    const current = verifySessionCookie(store.get(SESSION_COOKIE)?.value);
    if (!current) {
      redirect("/login");
    }

    const interest = String(formData.get("interest") ?? "").trim();
    if (!interest) {
      return;
    }

    await saveInterest(current, interest);
    redirect("/dashboard");
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <img
        className="fixed inset-0 -z-10 h-full w-full object-cover"
        src="/bg-effect-4.png"
        alt=""
      />
      <h1 className="font-finger-paint max-w-md text-3xl text-[#BFD8A8]">
        What interests you the most?
      </h1>
      <p className="max-w-md font-finger-paint text-sm text-[#F2B3AD]">
        this helps us see if your project really looks like you :3
      </p>
      <form
        action={submitInterest}
        className="flex w-full max-w-xl flex-col gap-4"
      >
        <div className="relative mx-auto aspect-900/724 w-full">
          <img src="/text-area.png" alt="" className="absolute h-110 w-200" />
          <textarea
            name="interest"
            required
            placeholder="anything :3, hobbies, obsessions, weird niches..."
            className="absolute max-h-95 inset-0 h-full w-full resize-none bg-transparent text-lg p-18 pr-22 font-finger-paint text-[#C4BE9D] placeholder:text-[#D9D3AF] focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="rounded-md bg-[#F2B3AD] px-4 py-2 font-finger-paint text-lg text-white transition hover:zoom-110 transition-all"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
