import type { VercelRequest, VercelResponse } from '@vercel/node';
import { adminCookieHeader, createAdminSession, verifyAdminPassword } from '../../server/firebaseAdmin.js';

const attempts = new Map<string, { count: number; resetAt: number }>();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' });
  const forwarded = req.headers['x-forwarded-for'];
  const ip = (Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(',')[0]) || 'unknown';
  const now = Date.now();
  const record = attempts.get(ip);
  if (record && record.resetAt > now && record.count >= 8) return res.status(429).json({ error: 'Too many attempts. Please try again later.' });
  if (!record || record.resetAt <= now) attempts.set(ip, { count: 1, resetAt: now + 15 * 60 * 1000 });
  else record.count += 1;

  try {
    if (!verifyAdminPassword(req.body?.password)) return res.status(401).json({ error: 'Incorrect password.' });
    attempts.delete(ip);
    res.setHeader('Set-Cookie', adminCookieHeader(createAdminSession()));
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Admin login configuration error:', error);
    return res.status(500).json({ error: 'Admin sign-in is not configured.' });
  }
}
