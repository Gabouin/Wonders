import { NextRequest, NextResponse } from "next/server";
import {
  HC_AUTH_ME_URL,
  HC_AUTH_TOKEN_URL,
  STATE_COOKIE,
  SESSION_COOKIE,
  createSessionCookie,
} from "@/lib/hc-auth";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const expectedState = request.cookies.get(STATE_COOKIE)?.value;

  if (!code || !state || !expectedState || state !== expectedState) {
    return NextResponse.redirect(
      new URL("/login?error=state", request.url),
    );
  }

  const clientId = process.env.HC_AUTH_CLIENT_ID;
  const clientSecret = process.env.HC_AUTH_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { error: "HC auth is not configured" },
      { status: 500 },
    );
  }

  const redirectUri =
    process.env.HC_AUTH_REDIRECT_URI ??
    new URL("/api/hc-auth/callback", request.url).toString();

  const tokenRes = await fetch(HC_AUTH_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });

  if (!tokenRes.ok) {
    return NextResponse.redirect(
      new URL("/login?error=token", request.url),
    );
  }

  const tokenData = (await tokenRes.json()) as { access_token?: string };
  if (!tokenData.access_token) {
    return NextResponse.redirect(
      new URL("/login?error=token", request.url),
    );
  }

  const meRes = await fetch(HC_AUTH_ME_URL, {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  });

  if (!meRes.ok) {
    return NextResponse.redirect(
      new URL("/login?error=profile", request.url),
    );
  }

  const meData = (await meRes.json()) as {
    identity?: { primary_email?: string; name?: string; slack_id?: string };
  };
  const email = meData.identity?.primary_email;
  const name = meData.identity?.name ?? "";
  const slackId = meData.identity?.slack_id ?? "";

  if (!email) {
    return NextResponse.redirect(
      new URL("/login?error=profile", request.url),
    );
  }

  const session = createSessionCookie({ email, name, slackId });
  const response = NextResponse.redirect(new URL("/dashboard", request.url));
  response.cookies.set(SESSION_COOKIE, session.value, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: session.maxAge,
    path: "/",
  });
  response.cookies.delete(STATE_COOKIE);
  return response;
}
