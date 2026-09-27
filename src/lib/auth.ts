import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'session';

/**
 * Return the signing key.
 *
 * Deliberately FAILS CLOSED: no hardcoded fallback. A fallback secret that
 * lives in the repo lets anyone forge a session for any account.
 */
function getSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not set — refusing to use an insecure default secret');
  }
  return new TextEncoder().encode(secret);
}

export interface SessionPayload {
  telegramId: number;
  username: string | null;
  firstName: string | null;
}

export async function createSession(payload: SessionPayload): Promise<string> {
  const token = await new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(getSecret());

  (await cookies()).set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60,
    path: '/',
    domain: '.techinterviewai.com',
  });

  return token;
}

export async function getSession(): Promise<SessionPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;

    const { payload } = await jwtVerify(token, getSecret());
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function destroySession() {
  (await cookies()).delete({ name: COOKIE_NAME, domain: '.techinterviewai.com', path: '/' });
}

/**
 * Headers that forward the caller's session cookie to the backend API
 * (server-to-server).
 *
 * The API verifies the JWT itself, so identity is cryptographically proven
 * instead of being asserted with a spoofable `X-User-ID` header.
 */
export async function sessionCookieHeader(): Promise<Record<string, string>> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  return token ? { Cookie: `${COOKIE_NAME}=${token}` } : {};
}
