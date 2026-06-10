import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { reviewsDb } from '../db/reviews';
import { signToken } from '../utils/jwt';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();

const CONFIG_PATH = path.join(__dirname, '../../data/admin.json');

interface AdminConfig { user: string; hash: string }

function loadConfig(): AdminConfig | null {
  if (!fs.existsSync(CONFIG_PATH)) return null;
  try { return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8')) as AdminConfig; }
  catch { return null; }
}

function saveConfig(user: string, hash: string): void {
  const dir = path.dirname(CONFIG_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(CONFIG_PATH, JSON.stringify({ user, hash }, null, 2));
}

// GET /api/admin/status
router.get('/status', (_req, res) => {
  res.json({ setup: loadConfig() !== null });
});

// POST /api/admin/setup
router.post('/setup', async (req: Request, res: Response) => {
  if (loadConfig()) return res.status(400).json({ error: 'Already configured' });
  const { username, password } = req.body as { username: string; password: string };
  if (!username || username.length < 3) return res.status(400).json({ error: 'Username prea scurt (min 3 caractere)' });
  if (!password || password.length < 8) return res.status(400).json({ error: 'Parola prea scurtă (min 8 caractere)' });
  const hash = await bcrypt.hash(password, 12);
  saveConfig(username, hash);
  const token = signToken({ role: 'admin', user: username });
  res.json({ token });
});

// POST /api/admin/login
router.post('/login', async (req: Request, res: Response) => {
  const config = loadConfig();
  if (!config) return res.status(400).json({ error: 'Contul admin nu a fost configurat' });
  const { username, password } = req.body as { username: string; password: string };
  if (username !== config.user) return res.status(401).json({ error: 'Credențiale invalide' });
  const valid = await bcrypt.compare(password, config.hash);
  if (!valid) return res.status(401).json({ error: 'Credențiale invalide' });
  const token = signToken({ role: 'admin', user: username });
  res.json({ token });
});

// GET /api/admin/reviews
router.get('/reviews', requireAuth, (_req, res) => {
  res.json(reviewsDb.all());
});

// PUT /api/admin/reviews/:id
router.put('/reviews/:id', requireAuth, (req: AuthRequest, res: Response) => {
  const updated = reviewsDb.update(req.params.id, req.body as Record<string, unknown>);
  if (!updated) return res.status(404).json({ error: 'Review negăsit' });
  res.json(updated);
});

// DELETE /api/admin/reviews/:id
router.delete('/reviews/:id', requireAuth, (req: AuthRequest, res: Response) => {
  const ok = reviewsDb.delete(req.params.id);
  if (!ok) return res.status(404).json({ error: 'Review negăsit' });
  res.json({ success: true });
});

export default router;
