import { useState } from 'react';
import { useUIStore } from '@/store';

const LABEL = 'block text-xs font-bold uppercase tracking-[0.05em] text-white/50 mb-1.5';
const INPUT = 'w-full bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-lime focus:bg-white/[0.09] focus:ring-2 focus:ring-lime/[0.12] transition-all';

export default function QuestionForm() {
  const { showPopup } = useUIStore();
  const [form, setForm] = useState({ intrebare_nume: '', intrebare_email: '', intrebare_mesaj: '', website: '' });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.website) return;
    setLoading(true);
    try {
      const res = await fetch('/api/forms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, form_type: 'intrebare' }),
      });
      const data = await res.json() as { success?: boolean; errors?: string[] };
      if (data.success) {
        showPopup('success', 'Întrebarea a fost trimisă! Vă răspundem în maxim 24 ore.');
        setForm({ intrebare_nume: '', intrebare_email: '', intrebare_mesaj: '', website: '' });
      } else {
        showPopup('error', `Eroare: ${(data.errors ?? []).join(', ')}`);
      }
    } catch {
      showPopup('error', 'Eroare de rețea. Încercați din nou.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="trimite" className="py-[4.5rem] px-[5%] bg-ink">
      <div className="max-w-[520px]">
        <p className="text-xs font-bold tracking-[0.12em] uppercase text-lime mb-3">Ai o curiozitate?</p>
        <h2 className="text-[2rem] font-bold tracking-tight text-white mb-2">Trimite o întrebare</h2>
        <p className="text-white/50 mb-8">Răspundem în maxim 24 ore printr-un specialist în energie solară.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left" noValidate>
          <input type="text" name="website" value={form.website} onChange={(e) => setForm(f => ({...f, website: e.target.value}))} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <div>
            <label className={LABEL}>Nume</label>
            <input type="text" required placeholder="Numele dvs." value={form.intrebare_nume} onChange={(e) => setForm(f => ({...f, intrebare_nume: e.target.value}))} className={INPUT} />
          </div>
          <div>
            <label className={LABEL}>Email</label>
            <input type="email" required placeholder="email@exemplu.ro" value={form.intrebare_email} onChange={(e) => setForm(f => ({...f, intrebare_email: e.target.value}))} className={INPUT} />
          </div>
          <div>
            <label className={LABEL}>Mesaj</label>
            <textarea rows={4} required placeholder="Scrie întrebarea ta..." value={form.intrebare_mesaj} onChange={(e) => setForm(f => ({...f, intrebare_mesaj: e.target.value}))} className={INPUT + ' resize-none'} />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-lime text-ink font-bold py-3.5 rounded-xl hover:bg-[#80d05f] hover:-translate-y-px transition-all disabled:opacity-60 mt-1"
          >
            {loading ? 'Se trimite…' : 'Trimite întrebarea →'}
          </button>
        </form>
      </div>
    </section>
  );
}
