import fs from 'fs';
import path from 'path';

export interface Review {
  _id: string;
  name: string;
  display_name: string;
  label: string;
  location: string;
  email: string;
  phone: string;
  rating: number;
  text: string;
  owner_reply: string;
  status: 'pending' | 'approved';
  featured: boolean;
  date_submitted: string;
  date_approved: string | null;
}

const DATA_PATH = path.join(__dirname, '../../data/reviews.json');

function load(): Review[] {
  if (!fs.existsSync(DATA_PATH)) return [];
  try { return JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8')) as Review[]; }
  catch { return []; }
}

function save(reviews: Review[]): void {
  const dir = path.dirname(DATA_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(DATA_PATH, JSON.stringify(reviews, null, 2));
}

function nextId(reviews: Review[]): string {
  const max = reviews.reduce((m, r) => Math.max(m, parseInt(r._id) || 0), 0);
  return String(max + 1);
}

function strip(r: Review): Omit<Review, 'email' | 'phone' | 'name'> {
  const { email: _e, phone: _p, name: _n, ...pub } = r;
  return pub;
}

export const reviewsDb = {
  all: (): Review[]  => load(),

  public: () => load()
    .filter(r => r.status === 'approved' && !r.featured)
    .sort((a, b) => new Date(b.date_submitted).getTime() - new Date(a.date_submitted).getTime())
    .map(strip),

  featured: () => {
    const r = load().find(r => r.status === 'approved' && r.featured);
    return r ? strip(r) : null;
  },

  stats: () => {
    const approved = load().filter(r => r.status === 'approved');
    if (!approved.length) return { count: 0, avg: 0 };
    const sum = approved.reduce((acc, r) => acc + r.rating, 0);
    return { count: approved.length, avg: Math.round((sum / approved.length) * 10) / 10 };
  },

  byId: (id: string): Review | null => load().find(r => r._id === id) ?? null,

  add(data: Omit<Review, '_id'>): Review {
    const reviews = load();
    const review: Review = { _id: nextId(reviews), ...data };
    save([...reviews, review]);
    return review;
  },

  update(id: string, data: Partial<Review>): Review | null {
    const reviews = load();
    const idx = reviews.findIndex(r => r._id === id);
    if (idx === -1) return null;
    if (data.featured === true) {
      reviews.forEach(r => { if (r._id !== id) r.featured = false; });
    }
    if (data.status === 'approved' && !reviews[idx].date_approved) {
      data.date_approved = new Date().toISOString();
    }
    reviews[idx] = { ...reviews[idx], ...data };
    save(reviews);
    return reviews[idx];
  },

  delete(id: string): boolean {
    const reviews = load();
    const filtered = reviews.filter(r => r._id !== id);
    if (filtered.length === reviews.length) return false;
    save(filtered);
    return true;
  },
};
