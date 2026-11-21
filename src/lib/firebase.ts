import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, getDocs, deleteDoc, onSnapshot, query, orderBy, updateDoc, increment } from 'firebase/firestore';
import type { RsvpGuest, GalleryPhoto } from '../types';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
export const isFirebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId);
let app: ReturnType<typeof initializeApp> | null = null;
function getAppInstance() {
  if (!isFirebaseConfigured) throw new Error('Firebase is not configured. Add the VITE_FIREBASE_* environment variables in Vercel.');
  if (!app) app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  return app;
}
export function getDb() { return getFirestore(getAppInstance()); }
export async function loginAdmin(password: string) {
  const response = await fetch('/api/admin/login', { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'Sign-in failed.');
}
export async function logoutAdmin() { await fetch('/api/admin/logout', { method: 'POST', credentials: 'same-origin' }); }
export async function checkAdminSession(): Promise<boolean> {
  const response = await fetch('/api/admin/session', { credentials: 'same-origin', cache: 'no-store' });
  const data = await response.json().catch(() => ({}));
  return Boolean(response.ok && data.authenticated);
}
async function adminRequest(path: string, init: RequestInit = {}) {
  const response = await fetch(path, { ...init, credentials: 'same-origin', headers: { 'Content-Type': 'application/json', ...(init.headers || {}) } });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'Request failed.');
  return data;
}
export async function saveRsvp(rsvp: RsvpGuest): Promise<void> {
  const response = await fetch('/api/rsvp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(rsvp) });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'Unable to save RSVP.');
}
export async function findRsvpByPhone(_phone: string): Promise<RsvpGuest | null> { return null; }
export async function getRsvps(): Promise<RsvpGuest[]> { const data = await adminRequest('/api/admin/rsvps'); return data.guests || []; }
export async function deleteRsvp(id: string) { await adminRequest('/api/admin/rsvps', { method: 'DELETE', body: JSON.stringify({ id }) }); }
export async function updateRsvpStatus(id: string, willAttend: 'yes' | 'no', adultsCount: number) { await adminRequest('/api/admin/rsvps', { method: 'PATCH', body: JSON.stringify({ id, willAttend, adultsCount }) }); }
export function subscribeToRsvps(_onUpdate: (rsvps: RsvpGuest[]) => void): () => void { return () => {}; }

const GALLERY_COLLECTION = 'gallery';
export async function saveGalleryPhoto(photo: GalleryPhoto): Promise<void> { await setDoc(doc(getDb(), GALLERY_COLLECTION, photo.id), photo); }
export async function getGalleryPhotos(): Promise<GalleryPhoto[]> {
  const snap = await getDocs(query(collection(getDb(), GALLERY_COLLECTION), orderBy('uploadedAt', 'desc')));
  return snap.docs.map(d => d.data() as GalleryPhoto);
}
export async function likeGalleryPhoto(photoId: string): Promise<void> { await updateDoc(doc(getDb(), GALLERY_COLLECTION, photoId), { likes: increment(1) }); }
export function subscribeToGalleryPhotos(onUpdate: (photos: GalleryPhoto[]) => void): () => void {
  try {
    return onSnapshot(query(collection(getDb(), GALLERY_COLLECTION), orderBy('uploadedAt', 'desc')), snap => onUpdate(snap.docs.map(d => d.data() as GalleryPhoto)), err => console.error('Gallery subscription failed', err));
  } catch (error) { console.error('Gallery is not configured:', error); onUpdate([]); return () => {}; }
}
