import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/hc-auth";

export async function GET(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/login", request.url));
  response.cookies.delete(SESSION_COOKIE);
  return response;
}
