import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
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
const databaseId = import.meta.env.VITE_FIREBASE_DATABASE_ID || undefined;
export const isFirebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId);
let app: ReturnType<typeof initializeApp> | null = null;
function getAppInstance() {
  if (!isFirebaseConfigured) throw new Error('Firebase is not configured. Add the VITE_FIREBASE_* environment variables in Vercel.');
  if (!app) app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  return app;
}
export function getAuthInstance() { return getAuth(getAppInstance()); }
export function getDb() { const instance = getAppInstance(); return databaseId ? getFirestore(instance, databaseId) : getFirestore(instance); }
export async function loginAdmin(email: string, password: string) { return signInWithEmailAndPassword(getAuthInstance(), email, password); }
export async function logoutAdmin() { await signOut(getAuthInstance()); }
async function adminRequest(path: string, init: RequestInit = {}) {
  const user = getAuthInstance().currentUser;
  if (!user) throw new Error('Please sign in as an administrator.');
  const token = await user.getIdToken();
  const response = await fetch(path, { ...init, headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, ...(init.headers || {}) } });
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
