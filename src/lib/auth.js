/**
 * Minimal, dependency-free session auth for the admin panel.
 *
 * Built on the Web Crypto API (globalThis.crypto.subtle) rather than
 * Node's `crypto` module deliberately — Next.js Middleware runs on the
 * Edge runtime by default, which does not support Node's crypto module.
 * Web Crypto works identically in both the Edge runtime and Node.js,
 * so the same functions are safe to import from middleware.js, API
 * routes and server components alike.
 *
 * Credentials and the signing secret come from environment variables —
 * see .env.example. This is intentionally simple (no user table, single
 * shared admin login) since the site currently has exactly one admin
 * role. If multiple admin accounts are ever needed, replace this with
 * a proper users table + hashed passwords.
 */

const COOKIE_NAME = "kki_admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours

function toBase64Url(bytes) {
  let str = "";
  bytes.forEach((b) => { str += String.fromCharCode(b); });
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(b64url) {
  const b64 = b64url.replace(/-/g, "+").replace(/_/g, "/").padEnd(b64url.length + (4 - (b64url.length % 4 || 4)) % 4, "=");
  const str = atob(b64);
  return Uint8Array.from(str, (c) => c.charCodeAt(0));
}

function timingSafeEqualStr(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function getKey() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not set. Add it to .env.local before using the admin panel.");
  }
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

async function sign(value) {
  const key = await getKey();
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return toBase64Url(new Uint8Array(sig));
}

/** Verifies the supplied username/password against env-configured credentials. */
export function checkCredentials(username, password) {
  const validUser = process.env.ADMIN_USERNAME;
  const validPass = process.env.ADMIN_PASSWORD;
  if (!validUser || !validPass) return false;
  return timingSafeEqualStr(username || "", validUser) && timingSafeEqualStr(password || "", validPass);
}

/** Builds a signed session token: base64url(payload).signature */
export async function createSessionToken(username) {
  const payload = JSON.stringify({ u: username, exp: Date.now() + SESSION_TTL_MS });
  const encoded = toBase64Url(new TextEncoder().encode(payload));
  const signature = await sign(encoded);
  return `${encoded}.${signature}`;
}

/** Verifies a session token's signature and expiry. Returns the payload or null. */
export async function verifySessionToken(token) {
  if (!token || !token.includes(".")) return null;
  const [encoded, signature] = token.split(".");
  const expected = await sign(encoded);
  if (!timingSafeEqualStr(signature || "", expected)) return null;
  try {
    const payload = JSON.parse(new TextDecoder().decode(fromBase64Url(encoded)));
    if (!payload.exp || Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
export const ADMIN_COOKIE_MAX_AGE = Math.floor(SESSION_TTL_MS / 1000);
