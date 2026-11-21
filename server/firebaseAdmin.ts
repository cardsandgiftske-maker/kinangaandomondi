import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

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
  const databaseId = process.env.FIREBASE_DATABASE_ID;
  return { db: databaseId ? getFirestore(app, databaseId) : getFirestore(app), auth: getAuth(app) };
}

export async function requireAdmin(authorization?: string) {
  if (!authorization?.startsWith('Bearer ')) throw new Error('UNAUTHORIZED');
  const token = authorization.slice(7);
  const { auth } = firebaseAdmin();
  const decoded = await auth.verifyIdToken(token);
  const allowed = (process.env.ADMIN_UIDS || '').split(',').map(x => x.trim()).filter(Boolean);
  if (!allowed.includes(decoded.uid)) throw new Error('FORBIDDEN');
  return decoded;
}

export function normalizePhone(phone: string) {
  const digits = String(phone || '').replace(/\D/g, '');
  return digits.startsWith('0') && digits.length === 10 ? `254${digits.slice(1)}` : digits;
}
