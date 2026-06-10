import { useState } from 'react';
import { useUIStore } from '@/store';
import type { QuoteFormData } from '@/types';

const EMPTY: QuoteFormData = {
  nume: '', telefon: '', email: '', fax: '',
  destinatia_sistemului: '', destinatia_imobilului: '', piscina: '',
  nr_persoane: '', suprafata: '', orientare_acoperis: '', tip_acoperis: '',
  material_acoperis: '', distanta: '', sistem_backup: '', judet: '', adresa: '',
  info_suplimentare: '', website: '',
};

const LABEL = 'text-[0.72rem] font-bold text-muted uppercase tracking-[0.05em] block mb-[0.32rem]';
const INPUT = 'w-full bg-cream border-[1.5px] border-border rounded-[10px] px-[0.9rem] py-[0.62rem] font-sans text-[0.87rem] text-ink focus:outline-none focus:border-green focus:ring-2 focus:ring-green/10 transition-all';
const SELECT = INPUT + ' cursor-pointer select-field';

export default function QuoteForm() {
  const [form, setForm] = useState<QuoteFormData>(EMPTY);
  const [loading, setLoading] = useState(false);
  const { showPopup } = useUIStore();

  function update(field: keyof QuoteFormData, val: string) {
    setForm((f) => ({ ...f, [field]: val }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.website) return; // honeypot
    setLoading(true);
    try {
      const res = await fetch('/api/forms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, form_type: 'oferta' }),
      });
      const data = await res.json() as { success?: boolean; errors?: string[] };
      if (data.success) {
        showPopup('success', 'Cererea a fost trimisă! Vă vom contacta în curând.');
        setForm(EMPTY);
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
    <section id="oferta" className="min-h-svh pt-[calc(66px+5rem)] pb-[5rem] px-[5%] bg-cream flex flex-col justify-center">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Hero text */}
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.1em] uppercase text-green bg-green/10 px-4 py-1.5 rounded-full mb-6">
            <span className="dot-blink" />
            Soluții de energie solară
          </div>
          <h1 className="text-[clamp(2.6rem,5vw,4.2rem)] font-bold tracking-tight text-ink leading-[1.08] mb-4">
            Instalare panouri solare<br />
            în <em className="italic text-lime">nordul României</em>
          </h1>
          <p className="text-[0.82rem] font-semibold text-muted tracking-[0.03em] leading-[1.7] mb-4">
            Alba · Bihor · Bistrița-Năsăud · Botoșani · Cluj · Maramureș · Mureș · Satu Mare · Sălaj · Suceava
          </p>
          <p className="text-muted text-base mb-6 max-w-md">
            Newpod oferă, pentru persoane fizice, întreprinderi și instituții, soluții destinate utilizării energiei solare — atât pentru apă caldă/încălzire, cât și pentru generare de curent electric.
          </p>
          <div className="flex flex-col gap-3 mb-8">
            {[
              'Încălzirea apei calde menajere gratuit',
              'Panouri solare fotovoltaice pentru energie electrică',
              'Documentație gratuită pentru programul „Casa Verde"',
            ].map((b, i) => (
              <div key={b} className="flex items-center gap-3 text-sm font-medium text-ink">
                <span className="w-7 h-7 rounded-full bg-ink text-white flex items-center justify-center text-[0.72rem] font-bold flex-shrink-0">{i + 1}</span>
                {b}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-5 flex-wrap">
            <a href="#oferta" className="bg-lime text-white px-8 py-3 rounded-full font-bold text-sm shadow-btn hover:bg-green hover:-translate-y-0.5 transition-all duration-150">
              Cere ofertă acum →
            </a>
            <a href="tel:0744638212" className="text-green font-semibold text-sm flex items-center gap-1.5 hover:gap-2.5 transition-all">
              📞 0744 638 212
            </a>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-paper rounded-[24px] p-[2.4rem] shadow-card" noValidate>
          {/* Card header */}
          <div className="flex items-start justify-between flex-wrap gap-3 mb-6">
            <h2 className="text-[1.6rem] font-semibold text-ink leading-[1.2] tracking-tight">
              Cere ofertă<br />GRATUIT
            </h2>
            <div className="flex flex-col gap-[0.4rem] items-end">
              <span className="text-[0.7rem] font-bold px-[0.72rem] py-[0.25rem] rounded-full bg-green/10 text-green border border-green/20 inline-flex items-center gap-[0.3rem]">✔ Răspuns în 72 ore</span>
              <span className="text-[0.7rem] font-bold px-[0.72rem] py-[0.25rem] rounded-full bg-orange/10 text-orange border border-orange/22 inline-flex items-center gap-[0.3rem]">✔ Casa Verde — dosar gratuit</span>
            </div>
          </div>
          <p className="text-[0.8rem] text-muted mb-[1.2rem]">Completați datele de mai jos și în termen de 3 zile veți fi contactat pentru a stabili soluția optimă corespunzătoare solicitărilor dvs.</p>

          {/* honeypot */}
          <input type="text" name="website" value={form.website} onChange={(e) => update('website', e.target.value)} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

          {/* Single two-column form grid — full-width fields use col-span-2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[0.8rem]">
            <div>
              <label htmlFor="q-nume" className={LABEL}>Nume</label>
              <input id="q-nume" type="text" required placeholder="Numele dvs." value={form.nume} onChange={(e) => update('nume', e.target.value)} className={INPUT} />
            </div>
            <div>
              <label htmlFor="q-telefon" className={LABEL}>Telefon</label>
              <input id="q-telefon" type="tel" required placeholder="07xx xxx xxx" value={form.telefon} onChange={(e) => update('telefon', e.target.value)} className={INPUT} />
            </div>

            <div>
              <label htmlFor="q-email" className={LABEL}>Email</label>
              <input id="q-email" type="email" required placeholder="email@exemplu.ro" value={form.email} onChange={(e) => update('email', e.target.value)} className={INPUT} />
            </div>
            <div>
              <label htmlFor="q-fax" className={LABEL}>Fax (opțional)</label>
              <input id="q-fax" type="tel" placeholder="Fax" value={form.fax} onChange={(e) => update('fax', e.target.value)} className={INPUT} />
            </div>

            <div className="col-span-2">
              <label htmlFor="q-dest-sis" className={LABEL}>Destinația sistemului</label>
              <select id="q-dest-sis" value={form.destinatia_sistemului} onChange={(e) => update('destinatia_sistemului', e.target.value)} className={SELECT}>
                <option>Apă caldă și încălzire</option>
                <option>Apă caldă menajeră</option>
                <option>Energie electrică (fotovoltaice)</option>
                <option>Combinat – toate cele de mai sus</option>
              </select>
            </div>

            <div>
              <label htmlFor="q-dest-imob" className={LABEL}>Destinația imobilului</label>
              <select id="q-dest-imob" value={form.destinatia_imobilului} onChange={(e) => update('destinatia_imobilului', e.target.value)} className={SELECT}>
                <option>Casă / Apartament</option>
                <option>Spațiu comercial</option>
                <option>Instituție / Firmă</option>
                <option>Cabană / Locuință de vacanță</option>
              </select>
            </div>
            <div>
              <label htmlFor="q-piscina" className={LABEL}>Aveți piscină?</label>
              <select id="q-piscina" value={form.piscina} onChange={(e) => update('piscina', e.target.value)} className={SELECT}>
                <option>Nu</option>
                <option>Da</option>
              </select>
            </div>

            <div>
              <label htmlFor="q-persoane" className={LABEL}>Nr. persoane</label>
              <input id="q-persoane" type="number" min={1} max={20} placeholder="ex. 4" value={form.nr_persoane} onChange={(e) => update('nr_persoane', e.target.value)} className={INPUT} />
            </div>
            <div>
              <label htmlFor="q-suprafata" className={LABEL}>Suprafața de încălzire (m²)</label>
              <input id="q-suprafata" type="number" min={0} placeholder="ex. 120" value={form.suprafata} onChange={(e) => update('suprafata', e.target.value)} className={INPUT} />
            </div>

            <div>
              <label htmlFor="q-orientare" className={LABEL}>Orientare acoperiș</label>
              <select id="q-orientare" value={form.orientare_acoperis} onChange={(e) => update('orientare_acoperis', e.target.value)} className={SELECT}>
                <option>Sud</option>
                <option>Sud-Est</option>
                <option>Sud-Vest</option>
                <option>Est / Vest</option>
                <option>Nord</option>
              </select>
            </div>
            <div>
              <label htmlFor="q-tip-ac" className={LABEL}>Tip acoperiș</label>
              <select id="q-tip-ac" value={form.tip_acoperis} onChange={(e) => update('tip_acoperis', e.target.value)} className={SELECT}>
                <option>45 grade (înclinat)</option>
                <option>Plat (0–10 grade)</option>
                <option>Terasă plată</option>
              </select>
            </div>

            <div>
              <label htmlFor="q-material" className={LABEL}>Material acoperiș</label>
              <input id="q-material" type="text" placeholder="ex. țiglă, tablă, lemn..." value={form.material_acoperis} onChange={(e) => update('material_acoperis', e.target.value)} className={INPUT} />
            </div>

            <div className="col-span-2">
              <label htmlFor="q-distanta" className={LABEL}>Distanța estimativă colectori ↔ boiler</label>
              <input id="q-distanta" type="text" placeholder="ex. 10 metri" value={form.distanta} onChange={(e) => update('distanta', e.target.value)} className={INPUT} />
            </div>

            <div>
              <label htmlFor="q-backup" className={LABEL}>Sistem de backup?</label>
              <select id="q-backup" value={form.sistem_backup} onChange={(e) => update('sistem_backup', e.target.value)} className={SELECT}>
                <option>Da</option>
                <option>Nu</option>
              </select>
            </div>
            <div>
              <label htmlFor="q-judet" className={LABEL}>Județ / Localitate</label>
              <input id="q-judet" type="text" placeholder="ex. Bistrița" value={form.judet} onChange={(e) => update('judet', e.target.value)} className={INPUT} />
            </div>

            <div className="col-span-2">
              <label htmlFor="q-adresa" className={LABEL}>Adresă completă</label>
              <input id="q-adresa" type="text" placeholder="Strada, nr., localitate, județ" value={form.adresa} onChange={(e) => update('adresa', e.target.value)} className={INPUT} />
            </div>

            <div className="col-span-2">
              <label htmlFor="q-info" className={LABEL}>Informații suplimentare</label>
              <textarea id="q-info" rows={3} placeholder="Descrieți situația actuală, cerințe speciale, întrebări..." value={form.info_suplimentare} onChange={(e) => update('info_suplimentare', e.target.value)} className={INPUT + ' resize-none'} />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-lime text-ink font-bold py-[0.85rem] rounded-[10px] text-[0.97rem] hover:bg-[#80d05f] hover:-translate-y-px transition-all disabled:opacity-60 mt-[1rem] shadow-[0_4px_18px_rgba(108,192,74,0.3)]"
          >
            {loading ? 'Se trimite…' : 'Trimite cererea de ofertă →'}
          </button>
          <p className="text-center text-[0.75rem] text-muted mt-[0.7rem]">
            Sau sunați direct:{' '}
            <a href="tel:0744638212" className="text-orange font-semibold no-underline">0744 638 212</a>
          </p>
        </form>
      </div>
    </section>
  );
}
