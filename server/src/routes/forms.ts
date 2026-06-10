import { Router, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import { reviewsDb } from '../db/reviews';
import { sendEmail, makeDisplayName, sanitize, isValidEmail } from '../utils/email';

const router = Router();

const reviewLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 1,
  keyGenerator: (req) => req.ip ?? 'unknown',
  message: { error: 'Un singur review per IP pe zi' },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/', async (req: Request, res: Response) => {
  if (req.body.website) return res.json({ success: true });

  const { form_type } = req.body as { form_type: string };

  // ── Quote request ──
  if (form_type === 'oferta') {
    const { nume, telefon, email } = req.body as Record<string, string>;
    const errors: string[] = [];
    if (!nume)    errors.push('Nume');
    if (!telefon) errors.push('Telefon');
    if (!email)   errors.push('Email');
    if (email && !isValidEmail(email)) errors.push('Email invalid');
    if (errors.length) return res.status(400).json({ errors });

    const fieldMap: Record<string, string> = {
      'Nume': 'nume', 'Telefon': 'telefon', 'Email': 'email',
      'Destinația sistemului': 'destinatia_sistemului',
      'Destinația imobilului': 'destinatia_imobilului',
      'Piscină': 'piscina', 'Nr. persoane': 'nr_persoane',
      'Suprafața încălzire (m²)': 'suprafata',
      'Orientare acoperiș': 'orientare_acoperis',
      'Tip acoperiș': 'tip_acoperis',
      'Material acoperiș': 'material_acoperis',
      'Distanța colectori ↔ boiler': 'distanta',
      'Sistem de backup': 'sistem_backup',
      'Județ / Localitate': 'judet',
      'Adresă completă': 'adresa',
      'Informații suplimentare': 'info_suplimentare',
    };
    let message = '';
    for (const [label, key] of Object.entries(fieldMap)) {
      const val = (req.body as Record<string, string>)[key];
      if (val) message += `${label}: ${sanitize(val)}\n`;
    }
    try {
      await sendEmail('Cerere ofertă – newpod.ro', message);
      return res.json({ success: true, type: 'oferta' });
    } catch {
      return res.status(500).json({ error: 'Email sending failed' });
    }
  }

  // ── Contact message ──
  if (form_type === 'contact') {
    const { contact_nume, contact_email, contact_mesaj, contact_telefon } = req.body as Record<string, string>;
    const errors: string[] = [];
    if (!contact_nume)   errors.push('Nume');
    if (!contact_email)  errors.push('Email');
    if (!contact_mesaj)  errors.push('Mesaj');
    if (contact_email && !isValidEmail(contact_email)) errors.push('Email invalid');
    if (errors.length) return res.status(400).json({ errors });

    const message = [
      `Nume: ${sanitize(contact_nume)}`,
      `Email: ${sanitize(contact_email)}`,
      `Telefon: ${sanitize(contact_telefon ?? '')}`,
      `Mesaj: ${sanitize(contact_mesaj)}`,
    ].join('\n');
    try {
      await sendEmail('Mesaj contact – newpod.ro', message);
      return res.json({ success: true, type: 'contact' });
    } catch {
      return res.status(500).json({ error: 'Email sending failed' });
    }
  }

  // ── Question ──
  if (form_type === 'intrebare') {
    const { intrebare_nume, intrebare_email, intrebare_mesaj } = req.body as Record<string, string>;
    const errors: string[] = [];
    if (!intrebare_nume)   errors.push('Nume');
    if (!intrebare_email)  errors.push('Email');
    if (!intrebare_mesaj)  errors.push('Mesaj');
    if (intrebare_email && !isValidEmail(intrebare_email)) errors.push('Email invalid');
    if (errors.length) return res.status(400).json({ errors });

    const message = [
      `Nume: ${sanitize(intrebare_nume)}`,
      `Email: ${sanitize(intrebare_email)}`,
      `Mesaj: ${sanitize(intrebare_mesaj)}`,
    ].join('\n');
    try {
      await sendEmail('Întrebare – newpod.ro', message);
      return res.json({ success: true, type: 'intrebare' });
    } catch {
      return res.status(500).json({ error: 'Email sending failed' });
    }
  }

  return res.status(400).json({ error: 'Invalid form_type' });
});

// ── Review submission ──
router.post('/review', reviewLimiter, (req: Request, res: Response) => {
  if (req.body.website) return res.json({ success: true });

  const { rev_name, rev_location, rev_text, rev_rating, rev_email, rev_phone } = req.body as Record<string, string>;
  const errors: string[] = [];
  if (!rev_name)     errors.push('Nume');
  if (!rev_location) errors.push('Localitate');
  if (!rev_text)     errors.push('Recenzie');
  if (rev_text && rev_text.trim().length < 30) errors.push('Recenzia trebuie să aibă minim 30 de caractere');
  if (errors.length) return res.status(400).json({ errors });

  const rating = Math.min(5, Math.max(1, parseInt(rev_rating ?? '5') || 5));
  const name   = sanitize(rev_name);

  const review = reviewsDb.add({
    name,
    display_name:   makeDisplayName(name),
    label:          name,
    location:       sanitize(rev_location),
    email:          sanitize(rev_email  ?? ''),
    phone:          sanitize(rev_phone  ?? ''),
    rating,
    text:           sanitize(rev_text),
    owner_reply:    '',
    status:         'pending',
    featured:       false,
    date_submitted: new Date().toISOString(),
    date_approved:  null,
  });

  const email = sanitize(rev_email ?? '');
  const phone = sanitize(rev_phone ?? '');
  const notifLines = [
    'Ai un review care așteaptă să fie publicat.',
    '',
    `Nume: ${name}`,
    `Localitate: ${sanitize(rev_location)}`,
    ...(email ? [`Email: ${email}`] : []),
    ...(phone ? [`Telefon: ${phone}`] : []),
    `Rating: ${rating} stele`,
    `Recenzie: ${sanitize(rev_text)}`,
    '',
    'Gestionează: https://newpod.ro/admin',
  ];
  const notif = notifLines.join('\n');
  sendEmail('Review nou – newpod.ro', notif).catch(() => { /* non-blocking */ });

  return res.json({ success: true, type: 'recenzie', id: review._id });
});

export default router;
