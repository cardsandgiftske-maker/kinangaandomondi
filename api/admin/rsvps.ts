import type { VercelRequest, VercelResponse } from '@vercel/node';
import { firebaseAdmin, requireAdmin } from '../../server/firebaseAdmin.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');
  try {
    await requireAdmin(req);
    const { db } = firebaseAdmin();
    const collection = db.collection('rsvps');
    if (req.method === 'GET') {
      const snap = await collection.orderBy('submittedAt', 'desc').get();
      return res.status(200).json({ guests: snap.docs.map(d => d.data()) });
    }
    const id = String(req.query.id || req.body?.id || '');
    if (!id || id.includes('/')) return res.status(400).json({ error: 'A valid RSVP ID is required.' });
    if (req.method === 'PATCH') {
      const { willAttend, adultsCount } = req.body || {};
      if (!['yes', 'no'].includes(willAttend)) return res.status(400).json({ error: 'Invalid attendance status.' });
      await collection.doc(id).update({ willAttend, adultsCount: willAttend === 'yes' ? Math.min(Math.max(Number(adultsCount) || 1, 1), 10) : 0 });
      return res.status(200).json({ ok: true });
    }
    if (req.method === 'DELETE') {
      await collection.doc(id).delete();
      return res.status(200).json({ ok: true });
    }
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    const status = error?.message === 'UNAUTHORIZED' ? 401 : error?.message === 'FORBIDDEN' ? 403 : 500;
    return res.status(status).json({ error: status === 401 ? 'Please sign in.' : status === 403 ? 'This account is not an approved administrator.' : 'Admin request failed.' });
  }
}
