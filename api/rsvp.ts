import type { VercelRequest, VercelResponse } from '@vercel/node';
import { firebaseAdmin } from '../server/firebaseAdmin.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const { fullName, willAttend, adultsCount, dietaryRequirements, notes } = req.body || {};
    const name = String(fullName || '').trim().replace(/\s+/g, ' ');
    if (name.length < 2 || name.length > 120) {
      return res.status(400).json({ error: 'Please provide a valid full name.' });
    }
    if (!['yes', 'no'].includes(willAttend)) return res.status(400).json({ error: 'Invalid attendance response.' });
    const { db } = firebaseAdmin();
    const rsvps = db.collection('rsvps');
    // Do not collect phone numbers. Use a fresh server-generated ID so guests with
    // identical names can still RSVP independently (e.g. family members).
    const ref = rsvps.doc();
    await ref.create({
      id: ref.id, fullName: name, phoneNumber: '', willAttend,
      adultsCount: willAttend === 'yes' ? Math.min(Math.max(Number(adultsCount) || 1, 1), 10) : 0,
      dietaryRequirements: String(dietaryRequirements || 'None').slice(0, 300),
      notes: String(notes || '').slice(0, 1000), submittedAt: new Date().toISOString(),
    });
    const saved = await ref.get();
    return res.status(201).json({ ok: true, guest: saved.data() });
  } catch (error: any) {
    console.error('RSVP API error:', error);
    return res.status(500).json({ error: 'We could not save your RSVP. Please try again.' });
  }
}
