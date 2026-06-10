import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAdminStore } from '@/store';
import { useAdminReviews, useUpdateReview, useDeleteReview } from '@/hooks/useReviews';
import type { Review } from '@/types';

// ── Setup / Login form ───────────────────────────────────────────────────────
function AuthForm() {
  const setToken = useAdminStore((s) => s.setToken);
  const { data: status } = useQuery<{ setup: boolean }>({
    queryKey: ['admin-status'],
    queryFn: () => fetch('/api/admin/status').then((r) => r.json()),
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm,  setConfirm]  = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  const isSetup = status?.setup === false;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (isSetup && password !== confirm) { setError('Parolele nu coincid.'); return; }
    setLoading(true);
    try {
      const endpoint = isSetup ? '/api/admin/setup' : '/api/admin/login';
      const res  = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json() as { token?: string; error?: string };
      if (data.token) { setToken(data.token); }
      else { setError(data.error ?? 'Eroare necunoscută'); }
    } catch {
      setError('Eroare de rețea.');
    } finally {
      setLoading(false);
    }
  }

  const LABEL = 'block text-[0.72rem] font-bold uppercase tracking-[0.05em] text-muted mb-[0.32rem]';
  const INPUT = 'w-full bg-cream border-[1.5px] border-border rounded-[10px] px-[0.9rem] py-[0.62rem] text-[0.87rem] text-ink focus:outline-none focus:border-green focus:ring-2 focus:ring-green/10 transition-all';

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="bg-paper rounded-3xl shadow-card w-full max-w-[420px] p-10">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl">☀️</span>
          <p className="font-bold text-green text-xl leading-none">Newpod Admin</p>
        </div>

        <h2 className="text-[1.6rem] font-bold text-ink mb-6">{isSetup ? 'Configurare inițială' : 'Autentificare'}</h2>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm mb-5">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className={LABEL}>Username</label>
            <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} className={INPUT} autoComplete="username" />
          </div>
          <div>
            <label className={LABEL}>Parolă</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className={INPUT} autoComplete={isSetup ? 'new-password' : 'current-password'} />
          </div>
          {isSetup && (
            <div>
              <label className={LABEL}>Confirmare parolă</label>
              <input type="password" required value={confirm} onChange={(e) => setConfirm(e.target.value)} className={INPUT} autoComplete="new-password" />
            </div>
          )}
          <button type="submit" disabled={loading} className="w-full bg-green text-white font-bold py-[0.85rem] rounded-[10px] hover:bg-green2 transition-colors disabled:opacity-60 mt-2">
            {loading ? 'Se procesează…' : isSetup ? 'Crează contul →' : 'Intră în panou →'}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-muted">
          <a href="/" className="hover:text-green transition-colors">← Înapoi la site</a>
        </p>
      </div>
    </div>
  );
}

// ── Review edit card ─────────────────────────────────────────────────────────
function ReviewEditCard({ review }: { review: Review }) {
  const update = useUpdateReview();
  const remove = useDeleteReview();
  const [draft, setDraft] = useState<Partial<Review>>({});
  const [expanded, setExpanded] = useState(false);

  const r = { ...review, ...draft };

  async function save() {
    await update.mutateAsync({ id: review._id, data: draft });
    setDraft({});
  }
  async function approve() {
    await update.mutateAsync({ id: review._id, data: { ...draft, status: 'approved' } });
    setDraft({});
  }

  const LABEL = 'block text-[0.7rem] font-bold uppercase tracking-[0.06em] text-muted mb-1';
  const LABEL_HINT = 'font-normal normal-case tracking-normal text-muted/60 ml-1';
  const INPUT = 'w-full bg-paper border border-border rounded-lg px-3 py-2 text-sm text-ink focus:outline-none focus:border-green transition-all';
  const date = new Date(review.date_submitted).toLocaleDateString('ro-RO', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '.');

  return (
    <div className={`bg-paper rounded-2xl border shadow-sm p-5 flex flex-col gap-3 ${r.featured ? 'border-green' : 'border-border'}`}>
      {/* Collapsed preview — click to toggle */}
      <div className="cursor-pointer" onClick={() => setExpanded(e => !e)}>
        {/* Badges row */}
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-[0.68rem] font-bold uppercase tracking-wide px-2 py-0.5 rounded-md ${r.status === 'approved' ? 'bg-green/10 text-green' : 'bg-orange/10 text-orange'}`}>
            {r.status === 'approved' ? 'Publicat' : 'În așteptare'}
          </span>
          {r.featured && (
            <span className="text-[0.68rem] font-bold uppercase tracking-wide px-2 py-0.5 rounded-md bg-yellow-50 text-yellow-600">
              ⭐ Featured
            </span>
          )}
          <span className={`ml-auto text-muted text-lg leading-none transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}>⌄</span>
        </div>
        {/* Title */}
        <p className="font-semibold text-ink text-[1rem] leading-snug mb-1">
          {r.display_name}{r.location ? ` — ${r.location}` : ''}
        </p>
        {/* Stars */}
        <div className="text-orange text-sm tracking-wide mb-1">
          {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
        </div>
        {/* Text preview */}
        {!expanded && (
          <p className="text-sm text-muted line-clamp-2 leading-relaxed">{r.text}</p>
        )}
      </div>

      {/* Expandable edit form */}
      {expanded && (<><div className="border-t border-border -mx-5 mb-3" />
      {/* Private contact info */}
      {(review.email || review.phone) && (
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted mb-1">
          <span className="text-muted/50 text-[0.65rem] uppercase tracking-wider font-semibold w-full">Date private</span>
          {review.email && <span>✉ {review.email}</span>}
          {review.phone && <span>📞 {review.phone}</span>}
          <span>📅 {date}</span>
        </div>
      )}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={LABEL}>Nume afișat public</label>
          <input type="text" value={r.display_name} onChange={(e) => setDraft(d => ({...d, display_name: e.target.value}))} className={INPUT} />
        </div>
        <div>
          <label className={LABEL}>Etichetă card <span className={LABEL_HINT}>(titlu afișat)</span></label>
          <input type="text" value={r.label} onChange={(e) => setDraft(d => ({...d, label: e.target.value}))} className={INPUT} />
        </div>
        <div>
          <label className={LABEL}>Localitate</label>
          <input type="text" value={r.location} onChange={(e) => setDraft(d => ({...d, location: e.target.value}))} className={INPUT} />
        </div>
        <div>
          <label className={LABEL}>Rating</label>
          <div className="flex items-center gap-2 mt-1">
            {[1,2,3,4,5].map((v) => (
              <label key={v} className={`flex items-center gap-1 text-sm cursor-pointer px-2 py-1 rounded-lg border transition-colors ${r.rating === v ? 'border-orange bg-orange/10 text-orange font-bold' : 'border-border text-muted hover:border-orange/50'}`}>
                <input type="radio" name={`rating-${review._id}`} value={v} checked={r.rating === v} onChange={() => setDraft(d => ({...d, rating: v}))} className="hidden" />
                {v} ★
              </label>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label className={LABEL}>Textul recenziei</label>
        <textarea rows={4} value={r.text} onChange={(e) => setDraft(d => ({...d, text: e.target.value}))} className={INPUT + ' resize-y'} />
      </div>

      <div>
        <label className={LABEL}>Răspuns Newpod <span className={LABEL_HINT}>(optional — apare public sub recenzie)</span></label>
        <textarea rows={3} value={r.owner_reply} onChange={(e) => setDraft(d => ({...d, owner_reply: e.target.value}))} className={INPUT + ' resize-none'} placeholder="Mulțumim pentru recenzie..." />
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" id={`feat-${review._id}`} checked={r.featured} onChange={(e) => setDraft(d => ({...d, featured: e.target.checked}))} className="w-4 h-4 accent-green" />
        <label htmlFor={`feat-${review._id}`} className="text-sm text-ink">Afișează ca recenzie principală (hero card mare)</label>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 pt-1">
        {r.status !== 'approved' && (
          <button onClick={approve} disabled={update.isPending} className="bg-green text-white text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-green2 transition-colors disabled:opacity-60">
            ✓ Aprobă & publică
          </button>
        )}
        <button onClick={save} disabled={update.isPending} className="bg-green text-white text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-green2 transition-colors disabled:opacity-60">
          Salvează modificările
        </button>
        <button onClick={() => { if (window.confirm('Ești sigur că vrei să ștergi această recenzie?')) remove.mutate(review._id); }} className="bg-red-50 text-red-500 border border-red-200 text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-red-100 transition-colors">
          Șterge
        </button>
      </div>
      </>)}
    </div>
  );
}

// ── Dashboard ────────────────────────────────────────────────────────────────
function Dashboard() {
  const logout = useAdminStore((s) => s.logout);
  const { data: reviews, isLoading, error } = useAdminReviews();
  const [menuOpen, setMenuOpen] = useState(false);

  if (isLoading) return <div className="flex items-center justify-center min-h-screen text-muted">Se încarcă…</div>;
  if (error)    { logout(); return null; }

  const pending  = (reviews ?? []).filter((r) => r.status === 'pending');
  const approved = (reviews ?? []).filter((r) => r.status === 'approved');

  return (
    <div className="min-h-screen bg-[#f0f0f0]">
      {/* Top bar */}
      <header className="bg-paper border-b border-border px-6 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="text-xl">☀️</span>
          <p className="font-bold text-ink text-[1rem]">Newpod — Recenzii</p>
        </div>
        <div className="relative">
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="w-10 h-10 flex items-center justify-center border border-border rounded-lg hover:bg-cream transition-colors text-ink"
            aria-label="Meniu"
          >
            ☰
          </button>
          {menuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 top-12 z-50 bg-paper border border-border rounded-2xl shadow-card w-52 py-2 overflow-hidden">
                <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-2.5 text-sm text-ink hover:bg-cream transition-colors" onClick={() => setMenuOpen(false)}>
                  🌐 <span>Vezi site</span>
                </a>
                <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-2.5 text-sm text-ink hover:bg-cream transition-colors" onClick={() => setMenuOpen(false)}>
                  📊 <span>Google Analytics</span>
                </a>
                <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-2.5 text-sm text-ink hover:bg-cream transition-colors" onClick={() => setMenuOpen(false)}>
                  🔍 <span>Search Console</span>
                </a>
                <div className="border-t border-border my-1" />
                <button onClick={() => { setMenuOpen(false); logout(); }} className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left">
                  — <span>Ieșire</span>
                </button>
              </div>
            </>
          )}
        </div>
      </header>

      <div className="px-[5%] py-10 max-w-4xl mx-auto space-y-12">
        {/* Pending */}
        <section>
          <h2 className="text-xl font-bold text-ink pb-4 mb-5 border-b border-border flex items-center gap-2">
            Recenzii în așteptare
            <span className="text-sm font-semibold bg-border text-muted px-2 py-0.5 rounded-full">{pending.length}</span>
          </h2>
          {pending.length === 0
            ? <p className="text-muted text-sm text-center py-6 border border-dashed border-border rounded-xl bg-paper">Nicio recenzie în așteptare.</p>
            : <div className="space-y-3">{pending.map((r) => <ReviewEditCard key={r._id} review={r} />)}</div>
          }
        </section>

        {/* Approved */}
        <section>
          <h2 className="text-xl font-bold text-ink pb-4 mb-5 border-b border-border flex items-center gap-2">
            Publicate
            <span className="text-sm font-semibold bg-green/20 text-green px-2 py-0.5 rounded-full">{approved.length}</span>
          </h2>
          {approved.length === 0
            ? <p className="text-muted text-sm text-center py-6 border border-dashed border-border rounded-xl bg-paper">Nicio recenzie publicată încă.</p>
            : <div className="space-y-3">{approved.map((r) => <ReviewEditCard key={r._id} review={r} />)}</div>
          }
        </section>
      </div>
    </div>
  );
}

// ── Page entry point ─────────────────────────────────────────────────────────
export default function Admin() {
  const token = useAdminStore((s) => s.token);
  return token ? <Dashboard /> : <AuthForm />;
}
