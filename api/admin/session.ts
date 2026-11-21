import type { VercelRequest, VercelResponse } from '@vercel/node';
import { requireAdmin } from '../../server/firebaseAdmin';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed.' });
  try { await requireAdmin(req); return res.status(200).json({ authenticated: true }); }
  catch { return res.status(200).json({ authenticated: false }); }
}
