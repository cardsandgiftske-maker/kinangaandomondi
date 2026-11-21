import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import type { VercelRequest } from '@vercel/node';

const COOKIE_NAME = 'kinanga_admin_session';
const SESSION_SECONDS = 8 * 60 * 60;

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing server environment variable: ${name}`);
  return value;
}

export function firebaseAdmin() {
  if (!getApps().length) {
    initializeApp({
      credential: cert({
        projectId: required('FIREBASE_PROJECT_ID'),
        clientEmail: required('FIREBASE_CLIENT_EMAIL'),
        privateKey: required('FIREBASE_PRIVATE_KEY').replace(/\\n/g, '\n'),
      }),
    });
  }
  const app = getApps()[0];
  return { db: getFirestore(app) };
}

function sessionSecret() { return required('SESSION_SECRET'); }
function sign(value: string) { return createHmac('sha256', sessionSecret()).update(value).digest('base64url'); }
function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export function createAdminSession() {
  const payload = Buffer.from(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + SESSION_SECONDS, nonce: cryptoRandom() })).toString('base64url');
  return `${payload}.${sign(payload)}`;
}

function cryptoRandom() {
  return randomBytes(32).toString('base64url');
}

export function isValidAdminSession(token?: string) {
  if (!token) return false;
  const [payload, signature, extra] = token.split('.');
  if (!payload || !signature || extra) return false;
  if (!safeEqual(signature, sign(payload))) return false;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as { exp?: number };
    return typeof data.exp === 'number' && data.exp > Math.floor(Date.now() / 1000);
  } catch { return false; }
}

export function getAdminCookie(req: VercelRequest) {
  const raw = req.headers.cookie || '';
  const entry = raw.split(';').map(part => part.trim()).find(part => part.startsWith(`${COOKIE_NAME}=`));
  return entry ? decodeURIComponent(entry.slice(COOKIE_NAME.length + 1)) : undefined;
}

export function adminCookieHeader(token: string, maxAge = SESSION_SECONDS) {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  return `${COOKIE_NAME}=${encodeURIComponent(token)}; HttpOnly; Path=/; SameSite=Strict; Max-Age=${maxAge}${secure}`;
}

export function verifyAdminPassword(password: unknown) {
  const expected = required('ADMIN_PASSWORD');
  if (typeof password !== 'string') return false;
  // Compare fixed-length digests so timingSafeEqual can be used for all inputs.
  const actualDigest = createHmac('sha256', 'admin-password-check').update(password).digest();
  const expectedDigest = createHmac('sha256', 'admin-password-check').update(expected).digest();
  return timingSafeEqual(actualDigest, expectedDigest);
}

export async function requireAdmin(req: VercelRequest) {
  if (!isValidAdminSession(getAdminCookie(req))) throw new Error('UNAUTHORIZED');
}

export function normalizePhone(phone: string) {
  const digits = String(phone || '').replace(/\D/g, '');
  return digits.startsWith('0') && digits.length === 10 ? `254${digits.slice(1)}` : digits;
}
