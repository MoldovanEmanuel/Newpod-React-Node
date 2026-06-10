import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
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
          Politică de confidențialitate
        </h1>
        <span className="block text-[0.8rem] text-muted mb-12">Ultima actualizare: mai 2025</span>

        <div className="bg-cream border-l-[3px] border-green2 rounded-r-[10px] px-5 py-4 mb-8 text-[0.88rem] text-ink2 leading-[1.65]">
          Această pagină explică ce date colectăm, de ce le colectăm și cum le protejăm. Nu vindem și nu transmitem datele dvs. unor terțe părți în scop comercial.
        </div>

        <h2 className={H2}>1. Cine suntem</h2>
        <p className={P}>
          SC Newpod SRL, cu sediul în Str. Ioan Sabău, Nr. 5, Bistrița, județul Bistrița-Năsăud, România.
          Puteți lua legătura cu noi la adresa{' '}
          <a href="mailto:office@newpod.ro" className="text-green2">office@newpod.ro</a>{' '}
          sau la numărul{' '}
          <a href="tel:0744638212" className="text-green2">0744 638 212</a>.
        </p>

        <h2 className={H2}>2. Ce date colectăm și de ce</h2>

        <p className={P}><strong>Formularul de cerere ofertă și formularul de contact</strong></p>
        <p className={P}>Când completați unul dintre formularele de pe site, colectăm datele pe care le introduceți:</p>
        <ul className="list-disc pl-5 mt-2 mb-3 space-y-1">
          <li className={LI}>Nume, telefon, adresă de e-mail</li>
          <li className={LI}>Informații tehnice despre imobil (opționale, pentru calculul ofertei)</li>
          <li className={LI}>Mesajul sau întrebarea dvs.</li>
        </ul>
        <p className={P}>Aceste date sunt trimise direct la adresa noastră de e-mail și sunt folosite exclusiv pentru a răspunde solicitării dvs. Nu sunt stocate în nicio bază de date pe server.</p>

        <p className={`${P} mt-4`}><strong>Formularul de recenzie</strong></p>
        <p className={`${P} mt-1`}>Dacă lăsați o recenzie, colectăm:</p>
        <ul className="list-disc pl-5 mt-2 mb-3 space-y-1">
          <li className={LI}>Numele dvs. (afișat public în formatul „Prenume N.")</li>
          <li className={LI}>Localitatea (afișată public)</li>
          <li className={LI}>Adresa de e-mail și numărul de telefon (opționale — nu sunt afișate public, folosite doar pentru verificare internă)</li>
          <li className={LI}>Textul recenziei și nota acordată</li>
        </ul>
        <p className={P}>Recenziile sunt stocate pe serverul nostru într-un fișier securizat și publicate doar după verificare manuală.</p>

        <p className={`${P} mt-4`}><strong>Adresa IP</strong></p>
        <p className={`${P} mt-1`}>Pentru a preveni spam-ul, înregistrăm adresa IP a dispozitivului de la care se trimite o recenzie. Această informație este păstrată maximum 48 de ore și nu este folosită în alt scop.</p>

        <h2 className={H2}>3. Cookie-uri</h2>
        <p className={P}>
          Site-ul newpod.ro nu folosește cookie-uri de urmărire sau publicitate pentru vizitatorii obișnuiți.
          Singurul cookie tehnic folosit este un cookie de sesiune pentru panoul de administrare intern —
          acesta nu se activează pentru vizitatorii site-ului.
        </p>

        <p className={`${P} mt-4`}><strong>Google Analytics</strong></p>
        <p className={`${P} mt-1`}>
          Site-ul poate utiliza Google Analytics pentru a înțelege modul în care este folosit (număr de vizitatori, pagini accesate).
          Google Analytics poate stoca cookie-uri anonime în browserul dvs. Datele colectate sunt anonimizate
          și nu permit identificarea personală. Puteți dezactiva urmărirea prin{' '}
          <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener" className="text-green2">
            Google Analytics Opt-out
          </a>.
        </p>

        <h2 className={H2}>4. Cât timp păstrăm datele</h2>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li className={LI}>Mesajele primite prin formulare: atât timp cât este necesar pentru a răspunde solicitării</li>
          <li className={LI}>Recenziile aprobate: pe termen nelimitat, ca parte din conținutul public al site-ului</li>
          <li className={LI}>Adresele IP pentru protecție anti-spam: maximum 48 de ore</li>
        </ul>

        <h2 className={H2}>5. Drepturile dvs.</h2>
        <p className={P}>Conform Regulamentului GDPR (UE) 2016/679, aveți dreptul să:</p>
        <ul className="list-disc pl-5 mt-2 mb-3 space-y-1">
          <li className={LI}>Solicitați accesul la datele personale pe care le deținem despre dvs.</li>
          <li className={LI}>Solicitați corectarea sau ștergerea acestora</li>
          <li className={LI}>Vă opuneți prelucrării datelor dvs.</li>
          <li className={LI}>
            Depuneți o plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP):{' '}
            <a href="https://www.dataprotection.ro" target="_blank" rel="noopener" className="text-green2">dataprotection.ro</a>
          </li>
        </ul>
        <p className={P}>
          Pentru orice solicitare legată de datele dvs. personale, ne puteți contacta la{' '}
          <a href="mailto:office@newpod.ro" className="text-green2">office@newpod.ro</a>.
        </p>

        <h2 className={H2}>6. Securitate</h2>
        <p className={P}>
          Luăm măsuri rezonabile pentru a proteja datele colectate: accesul la fișierele de date este restricționat
          la nivel de server, fișierele sensibile nu sunt accesibile public, iar comunicarea cu site-ul se face
          prin conexiune securizată HTTPS.
        </p>

        <h2 className={H2}>7. Modificări ale acestei politici</h2>
        <p className={P}>
          Orice modificare a acestei politici va fi publicată pe această pagină cu actualizarea datei de mai sus.
          Vă recomandăm să o consultați periodic.
        </p>
      </div>
    </main>
  );
}
