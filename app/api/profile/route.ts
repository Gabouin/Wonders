import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionCookie } from "@/lib/hc-auth";
import { getProfile, saveInterest } from "@/lib/profiles";

export async function GET(request: NextRequest) {
  const session = verifySessionCookie(request.cookies.get(SESSION_COOKIE)?.value);
  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const profile = await getProfile(session.slackId);
  return NextResponse.json({ profile });
}

export async function POST(request: NextRequest) {
  const session = verifySessionCookie(request.cookies.get(SESSION_COOKIE)?.value);
  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const interest =
    typeof body?.interest === "string" ? body.interest.trim() : "";
  if (!interest) {
    return NextResponse.json({ error: "interest is required" }, { status: 400 });
  }

  await saveInterest(session, interest);
  return NextResponse.json({ ok: true });
}
