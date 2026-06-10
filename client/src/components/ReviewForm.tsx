import { useState } from 'react';
import { useUIStore } from '@/store';
import StarPicker from './StarPicker';
import { useReviewStats } from '@/hooks/useReviews';

const LABEL = 'block text-[0.72rem] font-bold uppercase tracking-[0.05em] text-muted mb-[0.32rem]';
const INPUT = 'w-full bg-cream border-[1.5px] border-border rounded-[10px] px-[0.9rem] py-[0.62rem] font-sans text-[0.87rem] text-ink outline-none transition-all focus:border-green focus:shadow-[0_0_0_3px_rgba(30,107,58,0.10)]';

const RIP_POINTS = [
  'Recenziile sunt verificate de echipa Newpod înainte de publicare',
  'Experiența ta ajută alți clienți să facă alegerea potrivită',
  'Publicate în maxim 24 de ore',
  'Un singur review per client',
];

export default function ReviewForm() {
  const { showPopup } = useUIStore();
  const { data: stats } = useReviewStats();
  const [form, setForm] = useState({
    rev_name: '', rev_location: '', rev_email: '', rev_phone: '',
    rev_text: '', website: '',
  });
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const charCount = form.rev_text.length;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.website) return;
    setLoading(true);
    try {
      const res = await fetch('/api/forms/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, rev_rating: rating }),
      });
      const data = await res.json() as { success?: boolean; errors?: string[]; error?: string };
      if (data.success) {
        showPopup('success', 'Recenzia a fost trimisă și va fi publicată după verificare. Mulțumim!');
        setForm({ rev_name: '', rev_location: '', rev_email: '', rev_phone: '', rev_text: '', website: '' });
        setRating(5);
      } else if (data.error) {
        showPopup('error', data.error);
      } else {
        showPopup('error', `Câmpuri invalide: ${(data.errors ?? []).join(', ')}`);
      }
    } catch {
      showPopup('error', 'Eroare de rețea. Încercați din nou.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid md:grid-cols-[1fr_0.7fr] gap-10 mt-[3rem] pt-[2.5rem] border-t-2 border-border items-start">
      {/* Form */}
      <div>
        <h3 className="font-sans text-[1.3rem] text-ink mb-1">Lasă o recenzie</h3>
        <p className="text-[0.87rem] text-muted mb-6">Experiența ta ajută alți clienți. Recenziile sunt verificate înainte de publicare.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-[0.85rem]" noValidate>
          <input type="text" name="website" value={form.website} onChange={(e) => setForm(f => ({...f, website: e.target.value}))} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[0.9rem]">
            <div>
              <label htmlFor="rv-name" className={LABEL}>Nume *</label>
              <input id="rv-name" type="text" required placeholder="Numele dvs." maxLength={80} value={form.rev_name} onChange={(e) => setForm(f => ({...f, rev_name: e.target.value}))} className={INPUT} />
            </div>
            <div>
              <label htmlFor="rv-loc" className={LABEL}>Localitate *</label>
              <input id="rv-loc" type="text" required placeholder="ex. Bistrița" maxLength={60} value={form.rev_location} onChange={(e) => setForm(f => ({...f, rev_location: e.target.value}))} className={INPUT} />
            </div>
            <div>
              <label htmlFor="rv-email" className={LABEL}>Email <span className="normal-case font-normal">(opțional)</span></label>
              <input id="rv-email" type="email" placeholder="email@exemplu.ro" maxLength={120} value={form.rev_email} onChange={(e) => setForm(f => ({...f, rev_email: e.target.value}))} className={INPUT} />
            </div>
            <div>
              <label htmlFor="rv-phone" className={LABEL}>Telefon <span className="normal-case font-normal">(opțional)</span></label>
              <input id="rv-phone" type="tel" placeholder="07xx xxx xxx" maxLength={20} value={form.rev_phone} onChange={(e) => setForm(f => ({...f, rev_phone: e.target.value}))} className={INPUT} />
            </div>
          </div>

          <div>
            <label className={LABEL}>Notă *</label>
            <StarPicker value={rating} onChange={setRating} />
          </div>

          <div>
            <div className="flex justify-between items-baseline mb-[0.32rem]">
              <label htmlFor="rv-text" className={LABEL}>
                Recenzia ta * <span className="normal-case font-normal">(minim 30 caractere)</span>
              </label>
            </div>
            <textarea
              id="rv-text"
              rows={4}
              required
              minLength={30}
              maxLength={1000}
              placeholder="Descrieți experiența dvs. cu Newpod..."
              value={form.rev_text}
              onChange={(e) => setForm(f => ({...f, rev_text: e.target.value}))}
              className={INPUT + ' resize-y min-h-[72px]'}
            />
            <span className={`block text-right text-[0.75rem] mt-1 ${charCount < 30 ? 'text-orange' : 'text-muted'}`}>
              {charCount} / 1000
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-lime text-ink border-none rounded-[10px] py-[0.85rem] px-8 font-sans text-[0.97rem] font-bold cursor-pointer transition-all shadow-[0_4px_18px_rgba(108,192,74,0.30)] hover:bg-[#80d05f] hover:-translate-y-px disabled:opacity-60"
          >
            {loading ? 'Se trimite…' : 'Trimite recenzia →'}
          </button>
          <p className="text-[0.75rem] text-muted text-center mt-1">Recenziile sunt publicate după verificare în maxim 24 ore.</p>
        </form>
      </div>

      {/* Info panel — hidden on mobile */}
      <div className="hidden md:block bg-gradient-to-br from-ink2 to-[#0b2211] rounded-[22px] p-[2.2rem] text-white sticky top-[82px]">
        <p className="text-[0.72rem] font-semibold tracking-[0.1em] uppercase text-lime mb-[1.2rem]">⭐ Recenzii clienți</p>

        {stats && stats.count > 0 && (
          <div className="flex items-center gap-4 mb-[1.6rem] pb-[1.4rem] border-b border-white/[0.08]">
            <span className="font-sans text-[3rem] font-bold leading-none text-white">
              {stats.avg.toFixed(1)}
            </span>
            <div>
              <div className="text-orange2 text-base tracking-[0.05em] mb-[0.2rem]">
                {'★'.repeat(Math.round(stats.avg))}{'☆'.repeat(5 - Math.round(stats.avg))}
              </div>
              <div className="text-[0.75rem] text-white/50">{stats.count} recenzii verificate</div>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-[0.85rem] mb-[1.6rem]">
          {RIP_POINTS.map((pt) => (
            <div key={pt} className="flex gap-[0.75rem] items-start text-[0.83rem] text-white/[0.72] leading-[1.5]">
              <span className="flex-shrink-0 w-[18px] h-[18px] bg-lime/[0.22] rounded-full flex items-center justify-center text-[0.6rem] text-lime mt-[0.15rem]">✓</span>
              {pt}
            </div>
          ))}
        </div>

        <div className="bg-white/[0.06] rounded-xl p-[0.85rem_1rem] text-[0.8rem] text-white/60 leading-[1.55]">
          <strong className="text-white">Peste 15 ani</strong> de experiență în instalații solare în județul Bistrița-Năsăud și împrejurimi.
        </div>
      </div>
    </div>
  );
}
