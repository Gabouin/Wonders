import crypto from "node:crypto";

export const HC_AUTH_SITE = "https://auth.hackclub.com";
export const HC_AUTH_AUTHORIZE_URL = `${HC_AUTH_SITE}/oauth/authorize`;
export const HC_AUTH_TOKEN_URL = `${HC_AUTH_SITE}/oauth/token`;
export const HC_AUTH_ME_URL = `${HC_AUTH_SITE}/api/v1/me`;
export const HC_AUTH_SCOPE = "openid email name slack_id";

export const SESSION_COOKIE = "wonders_session";
export const STATE_COOKIE = "wonders_hc_auth_state";

const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

interface SessionPayload {
  email: string;
  name: string;
  slackId: string;
  exp: number;
}

function getSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET env var is not set");
  }
  return secret;
}

function sign(payload: string) {
  return crypto
    .createHmac("sha256", getSecret())
    .update(payload)
    .digest("base64url");
}

export function createSessionCookie(data: {
  email: string;
  name: string;
  slackId: string;
}) {
  const payload: SessionPayload = {
    email: data.email,
    name: data.name,
    slackId: data.slackId,
    exp: Date.now() + SESSION_MAX_AGE * 1000,
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = sign(encoded);
  return { value: `${encoded}.${signature}`, maxAge: SESSION_MAX_AGE };
}

export function verifySessionCookie(
  value: string | undefined,
): SessionPayload | null {
  if (!value) return null;
  const [encoded, signature] = value.split(".");
  if (!encoded || !signature) return null;

  const expected = sign(encoded);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;

  try {
    const payload = JSON.parse(
      Buffer.from(encoded, "base64url").toString(),
    ) as SessionPayload;
    if (payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export function isEmailAllowed(email: string) {
  const allowlist = (process.env.ALLOWED_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return allowlist.includes(email.trim().toLowerCase());
}
