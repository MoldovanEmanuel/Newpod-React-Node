import { useState } from 'react';
import { useUIStore } from '@/store';

const LABEL = 'block text-[0.72rem] font-bold uppercase tracking-[0.05em] text-muted mb-[0.32rem]';
const INPUT = 'w-full bg-cream border-[1.5px] border-border rounded-[10px] px-[0.9rem] py-[0.62rem] font-sans text-[0.87rem] text-ink outline-none transition-all focus:border-green focus:shadow-[0_0_0_3px_rgba(30,107,58,0.10)]';

export default function Contact() {
  const { showPopup } = useUIStore();
  const [form, setForm] = useState({ contact_nume: '', contact_email: '', contact_telefon: '', contact_mesaj: '', website: '' });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.website) return;
    setLoading(true);
    try {
      const res = await fetch('/api/forms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, form_type: 'contact' }),
      });
      const data = await res.json() as { success?: boolean; errors?: string[] };
      if (data.success) {
        showPopup('success', 'Mesajul a fost trimis! Vă răspundem în curând.');
        setForm({ contact_nume: '', contact_email: '', contact_telefon: '', contact_mesaj: '', website: '' });
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
    <section id="contact" className="py-24 px-[5%] bg-paper">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <p className="text-[0.72rem] font-bold tracking-[0.12em] uppercase text-orange mb-2">Suntem aproape</p>
        <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-bold tracking-[-0.03em] text-ink leading-[1.12] mb-3">Contact</h2>
        <p className="text-muted text-[0.97rem] max-w-[520px] mb-12">
          Fie că ai o întrebare sau ești gata să pornești proiectul, suntem la dispoziția ta.
        </p>

        <div className="grid md:grid-cols-2 gap-[3rem] items-stretch">
          {/* Left: Date de contact */}
          <div className="bg-cream border border-border rounded-[20px] p-8 flex flex-col xl:flex-row xl:gap-8">
            <div className="flex-shrink-0">
              <h3 className="font-sans text-[1.3rem] text-ink mb-[1.4rem]">Date de contact</h3>
              <div className="flex flex-col gap-[1.1rem]">
                {[
                  { icon: '📍', label: 'Adresă', value: 'Str. Ioan Sabău, Nr. 5\nBistrița, România' },
                  { icon: '📞', label: 'Telefon', value: '+40 (744) 638 212', href: 'tel:0744638212' },
                  { icon: '✉️', label: 'Email', value: 'office@newpod.ro', href: 'mailto:office@newpod.ro' },
                ].map(({ icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-[0.9rem]">
                    <span className="w-[42px] h-[42px] flex-shrink-0 bg-green/[0.08] rounded-xl flex items-center justify-center text-lg">{icon}</span>
                    <div>
                      <p className="text-[0.72rem] font-bold uppercase tracking-[0.05em] text-muted mb-1">{label}</p>
                      {href ? (
                        <a href={href} className="text-[0.97rem] font-semibold text-green no-underline hover:text-green2 transition-colors whitespace-pre-line">{value}</a>
                      ) : (
                        <p className="text-[0.97rem] font-semibold text-ink whitespace-pre-line">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="mt-6 xl:mt-0 xl:flex-1 rounded-xl overflow-hidden border border-border min-h-[200px]">
              <iframe
                src="https://www.google.com/maps?q=Strada+Ioan+Sab%C4%83u+5%2C+Bistri%C8%9Ba%2C+Rom%C3%A2nia&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block', minHeight: '200px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Newpod – Str. Ioan Sabău, Nr. 5, Bistrița"
              />
            </div>
          </div>

          {/* Right: Trimite un mesaj */}
          <div className="bg-cream border border-border rounded-[20px] p-8 flex flex-col">
            <h3 className="font-sans text-[1.2rem] text-ink mb-[1.2rem]">Trimite un mesaj</h3>
            <form onSubmit={handleSubmit} className="flex flex-col flex-1 gap-[0.85rem]" noValidate>
              <input type="text" name="website" value={form.website} onChange={(e) => setForm(f => ({ ...f, website: e.target.value }))} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

              <div>
                <label htmlFor="c-nume" className={LABEL}>Nume</label>
                <input id="c-nume" type="text" required placeholder="Numele dvs." value={form.contact_nume} onChange={(e) => setForm(f => ({ ...f, contact_nume: e.target.value }))} className={INPUT} />
              </div>
              <div>
                <label htmlFor="c-email" className={LABEL}>Email</label>
                <input id="c-email" type="email" required placeholder="email@exemplu.ro" value={form.contact_email} onChange={(e) => setForm(f => ({ ...f, contact_email: e.target.value }))} className={INPUT} />
              </div>
              <div>
                <label htmlFor="c-telefon" className={LABEL}>Telefon</label>
                <input id="c-telefon" type="tel" placeholder="07xx xxx xxx" value={form.contact_telefon} onChange={(e) => setForm(f => ({ ...f, contact_telefon: e.target.value }))} className={INPUT} />
              </div>
              <div className="flex-1 flex flex-col">
                <label htmlFor="c-mesaj" className={LABEL}>Mesaj</label>
                <textarea id="c-mesaj" rows={4} required placeholder="Cu ce vă putem ajuta?" value={form.contact_mesaj} onChange={(e) => setForm(f => ({ ...f, contact_mesaj: e.target.value }))} className={INPUT + ' resize-y min-h-[72px] flex-1'} />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 bg-lime text-ink border-none rounded-[10px] py-[0.85rem] px-8 font-sans text-[0.97rem] font-bold cursor-pointer transition-all shadow-[0_4px_18px_rgba(108,192,74,0.30)] hover:bg-[#80d05f] hover:-translate-y-px disabled:opacity-60"
              >
                {loading ? 'Se trimite…' : 'Trimite mesajul'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
