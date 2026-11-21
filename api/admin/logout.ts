import type { VercelRequest, VercelResponse } from '@vercel/node';
import { adminCookieHeader } from '../../server/firebaseAdmin.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' });
  res.setHeader('Set-Cookie', adminCookieHeader('', 0));
  return res.status(200).json({ ok: true });
}
