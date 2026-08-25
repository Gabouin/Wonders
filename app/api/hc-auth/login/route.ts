import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { HC_AUTH_AUTHORIZE_URL, HC_AUTH_SCOPE, STATE_COOKIE } from "@/lib/hc-auth";

export async function GET(request: NextRequest) {
  const clientId = process.env.HC_AUTH_CLIENT_ID;
  if (!clientId) {
    return NextResponse.json(
      { error: "HC_AUTH_CLIENT_ID is not configured" },
      { status: 500 },
    );
  }

  const redirectUri =
    process.env.HC_AUTH_REDIRECT_URI ??
    new URL("/api/hc-auth/callback", request.url).toString();

  const state = crypto.randomBytes(16).toString("hex");

  const authorizeUrl = new URL(HC_AUTH_AUTHORIZE_URL);
  authorizeUrl.searchParams.set("client_id", clientId);
  authorizeUrl.searchParams.set("redirect_uri", redirectUri);
  authorizeUrl.searchParams.set("response_type", "code");
  authorizeUrl.searchParams.set("scope", HC_AUTH_SCOPE);
  authorizeUrl.searchParams.set("state", state);

  const response = NextResponse.redirect(authorizeUrl);
  response.cookies.set(STATE_COOKIE, state, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 10,
    path: "/",
  });
  return response;
}
