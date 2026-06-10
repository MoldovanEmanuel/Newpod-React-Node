import { Router } from 'express';
import { reviewsDb } from '../db/reviews';

const router = Router();

// GET /api/reviews
router.get('/', (_req, res) => {
  res.json(reviewsDb.public());
});

// GET /api/reviews/featured
router.get('/featured', (_req, res) => {
  res.json(reviewsDb.featured());
});

// GET /api/reviews/stats
router.get('/stats', (_req, res) => {
  res.json(reviewsDb.stats());
});

export default router;
