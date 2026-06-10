import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function TermsConditions() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const H2 = 'text-[1.1rem] font-bold text-ink mt-9 mb-2';
  const P = 'text-[0.92rem] text-muted leading-[1.75]';
  const LI = 'text-[0.92rem] text-muted leading-[1.75] mb-1';

  return (
    <main className="pt-[66px] min-h-screen bg-cream">
      <div className="max-w-[780px] mx-auto px-[5%] py-20">
        <Link to="/" className="inline-flex items-center gap-1.5 text-[0.85rem] text-muted hover:text-green2 transition-colors mb-10">
          ← Înapoi la site
        </Link>

        <h1 className="text-[clamp(1.8rem,3vw,2.6rem)] font-bold text-ink tracking-tight mb-1">
          Termeni și condiții
        </h1>
        <span className="block text-[0.8rem] text-muted mb-12">Ultima actualizare: mai 2025</span>

        <div className="bg-cream border-l-[3px] border-green2 rounded-r-[10px] px-5 py-4 mb-8 text-[0.88rem] text-ink2 leading-[1.65]">
          Prin utilizarea site-ului newpod.ro sau prin solicitarea unei oferte, acceptați termenii și condițiile de mai jos. Vă rugăm să le citiți cu atenție.
        </div>

        <h2 className={H2}>1. Informații generale</h2>
        <p className={P}>
          Site-ul newpod.ro este operat de <strong>SC Newpod SRL</strong>, cu sediul în Str. Ioan Sabău, Nr. 5,
          Bistrița, județul Bistrița-Năsăud, România. Ne puteți contacta la{' '}
          <a href="mailto:office@newpod.ro" className="text-green2">office@newpod.ro</a> sau la{' '}
          <a href="tel:0744638212" className="text-green2">0744 638 212</a>.
        </p>

        <h2 className={H2}>2. Servicii oferite</h2>
        <p className={P}>SC Newpod SRL oferă servicii de proiectare, furnizare și instalare a sistemelor de energie solară, inclusiv:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li className={LI}>Panouri solare fotovoltaice (PV) pentru producție de energie electrică</li>
          <li className={LI}>Sisteme solare pentru apă caldă menajeră (ACM)</li>
          <li className={LI}>Sisteme combinate (iarnă–vară)</li>
          <li className={LI}>Întocmirea documentației pentru programul „Casa Verde" (AFM)</li>
          <li className={LI}>Service și mentenanță instalații solare</li>
        </ul>

        <h2 className={H2}>3. Solicitarea ofertelor</h2>
        <p className={P}>
          Formularele de pe site sunt destinate exclusiv solicitării de oferte și informații. Completarea unui formular
          nu constituie un contract și nu generează obligații financiare pentru nicio parte. Ofertele sunt transmise
          după analizarea datelor furnizate și pot fi modificate în funcție de condițiile tehnice reale ale obiectivului.
        </p>

        <h2 className={H2}>4. Prețuri și plăți</h2>
        <p className={P}>
          Prețurile sunt comunicate individual prin ofertă scrisă și sunt valabile pentru perioada menționată în ofertă.
          Prețurile afișate sau comunicate verbal nu sunt angajante până la semnarea unui contract. Modalitățile de plată
          sunt stabilite de comun acord în contractul de prestări servicii.
        </p>

        <h2 className={H2}>5. Execuție și livrare</h2>
        <p className={P}>
          Termenele de execuție sunt estimate la momentul ofertării și pot varia în funcție de disponibilitatea
          echipamentelor, condițiile meteorologice și accesul la obiectiv. SC Newpod SRL nu răspunde pentru întârzieri
          cauzate de factori independenți (furnizori, condiții de vreme, aprobări administrative).
        </p>

        <h2 className={H2}>6. Garanție</h2>
        <p className={P}>
          Produsele instalate beneficiază de garanția producătorului conform specificațiilor tehnice ale fiecărui echipament.
          Manopera este garantată conform prevederilor legale în vigoare. Garanția nu acoperă deteriorările cauzate de
          utilizare necorespunzătoare, calamități naturale sau intervenții ale unor terți neautorizați.
        </p>

        <h2 className={H2}>7. Limitarea răspunderii</h2>
        <p className={P}>SC Newpod SRL nu poate fi trasă la răspundere pentru:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li className={LI}>Producția energetică estimată — aceasta depinde de factori climatici și de consum care variază în timp</li>
          <li className={LI}>Pierderi indirecte sau pierderi de profit generate de funcționarea sau nefuncționarea sistemului</li>
          <li className={LI}>Daune cauzate de forță majoră sau evenimente imprevizibile</li>
          <li className={LI}>Informații inexacte furnizate de client la solicitarea ofertei</li>
        </ul>

        <h2 className={H2}>8. Proprietate intelectuală</h2>
        <p className={P}>
          Conținutul site-ului newpod.ro — texte, imagini, grafice, logo-uri — este proprietatea SC Newpod SRL și este
          protejat de legislația privind drepturile de autor. Reproducerea fără acordul scris al companiei este interzisă.
        </p>

        <h2 className={H2}>9. Protecția datelor</h2>
        <p className={P}>
          Datele personale colectate prin formulare sunt prelucrate în conformitate cu{' '}
          <Link to="/politica-de-confidentialitate" className="text-green2">Politica de confidențialitate</Link>{' '}
          și cu prevederile GDPR (UE) 2016/679.
        </p>

        <h2 className={H2}>10. Legea aplicabilă și soluționarea litigiilor</h2>
        <p className={P}>
          Prezentele condiții sunt guvernate de legislația română. Orice litigiu se va soluționa pe cale amiabilă sau,
          în caz contrar, de instanțele judecătorești competente din România. Consumatorii pot apela și la platforma
          europeană de soluționare online a litigiilor:{' '}
          <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener" className="text-green2">
            ec.europa.eu/consumers/odr
          </a>.
        </p>

        <h2 className={H2}>11. Modificări ale termenilor</h2>
        <p className={P}>
          SC Newpod SRL își rezervă dreptul de a modifica acești termeni în orice moment. Versiunea actualizată va fi
          publicată pe această pagină cu data revizuirii. Continuarea utilizării site-ului după publicarea modificărilor
          constituie acceptarea noilor termeni.
        </p>

        <h2 className={H2}>12. Contact</h2>
        <p className={P}>
          Pentru orice întrebări legate de acești termeni, ne puteți contacta la{' '}
          <a href="mailto:office@newpod.ro" className="text-green2">office@newpod.ro</a> sau la{' '}
          <a href="tel:0744638212" className="text-green2">0744 638 212</a>.
        </p>
      </div>
    </main>
  );
}
