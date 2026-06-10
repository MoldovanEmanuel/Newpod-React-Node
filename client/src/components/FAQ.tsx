const FAQS = [
  {
    q: 'Se poate folosi un colector solar împreună cu sistemul existent de apă caldă?',
    a: 'Da. Pentru apă caldă menajeră tot anul, recomandăm ca panourile solare să funcționeze în tandem cu sistemul existent (centrală pe gaz / combustibil solid). Panourile acoperă necesarul în perioadele cu radiație bună, sistemul clasic asigură diferența.',
  },
  {
    q: 'Panourile solare funcționează și iarna?',
    a: 'Sistemele de panouri solare cu circuit închis presurizat, umplute cu glycol, produc apă caldă și iarna — la un randament mai scăzut (ziua este mai scurtă, radiația solară mai slabă). Panourile nepresurizate (fără antigel-glycol) trebuie golite pe perioada iernii la temperaturi apropiate de 0°C.',
  },
  {
    q: 'Cât se poate economisi cu panouri solare?',
    a: 'Economia la producerea apei calde menajere diferă în funcție de zona geografică, anotimp și componentele sistemului. În perioada aprilie–octombrie se poate ajunge la o economie de 100%. Anual, media este de 60–70%.',
  },
  {
    q: 'Cum se întrețin panourile solare?',
    a: 'Panourile solare nu necesită întreținere specială. Este recomandată verificarea și curățarea panourilor și a sistemului o dată pe an. Panourile nepresurizate (fără antigel-glycol) trebuie golite pe perioada iernii la temperaturi apropiate de 0°C.',
  },
  {
    q: 'Ce este programul „Casa Verde" și cine poate beneficia?',
    a: 'Statul subvenționează cu sume fixe înlocuirea sau completarea sistemelor tradiționale de încălzire prin programul „Casa Verde" administrat de AFM. Poate beneficia orice persoană fizică proprietară de imobil care nu a mai accesat anterior același program. Noi întocmim dosarul complet gratuit.',
  },
  {
    q: 'Cât durează instalarea unui sistem solar?',
    a: 'Un sistem rezidențial standard se instalează în 1–2 zile lucrătoare. Dosarul pentru programul „Casa Verde" poate necesita 2–6 săptămâni suplimentare, în funcție de procesarea AFM.',
  },
];

const CV_POINTS = [
  'Finanțare nerambursabilă — nu se returnează',
  'Eligibil persoane fizice proprietare de imobil',
  'Documentație gratuită — noi o întocmim complet',
  'Instalare realizată de firme autorizate AFM',
  'Aplicabil pentru panouri solare și pompe de căldură',
];

export default function FAQ() {
  return (
    <section id="intrebari" className="py-24 px-[5%] bg-cream">
      <div className="max-w-6xl mx-auto">
        <p className="text-[0.72rem] font-bold tracking-[0.12em] uppercase text-orange mb-2">Întrebări frecvente</p>
        <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-bold tracking-[-0.03em] text-ink leading-[1.12] mb-[0.9rem]">Răspunsuri clare</h2>

        <div className="grid md:grid-cols-[1.15fr_0.85fr] gap-[5rem] items-start mt-10">
          {/* FAQ list */}
          <div className="flex flex-col">
            {FAQS.map(({ q, a }, i) => (
              <div
                key={i}
                className={`py-6 border-b border-border ${i === 0 ? 'pt-0' : ''} ${i === FAQS.length - 1 ? 'border-b-0' : ''}`}
              >
                <div className="flex gap-[0.82rem] items-start mb-2">
                  <span className="flex-shrink-0 w-[22px] h-[22px] bg-orange rounded-[6px] text-white text-[0.68rem] font-extrabold flex items-center justify-center mt-[0.1rem]">
                    {i + 1}
                  </span>
                  <p className="font-bold text-[0.95rem] text-ink leading-snug">{q}</p>
                </div>
                <p className="text-[0.87rem] text-muted pl-8 leading-[1.65]">{a}</p>
              </div>
            ))}
          </div>

          {/* Casa Verde panel */}
          <div className="bg-gradient-to-br from-ink to-[#0b2211] rounded-[22px] p-[2.3rem] text-white sticky top-[82px]">
            <span className="inline-flex items-center gap-1.5 bg-[rgba(244,117,42,0.18)] border border-[rgba(244,117,42,0.3)] text-orange2 text-[0.7rem] font-bold tracking-[0.07em] uppercase px-[0.85rem] py-[0.28rem] rounded-full mb-[1.1rem]">
              🌿 Program AFM
            </span>
            <h3 className="font-sans text-[1.4rem] font-semibold leading-[1.25] mb-[0.85rem]">
              Programul<br />„Casa Verde"
            </h3>
            <p className="text-[0.86rem] text-white/60 mb-[0.85rem]">
              Statul subvenționează cu <strong className="text-white">sume fixe nerambursabile</strong> înlocuirea și completarea sistemelor tradiționale de încălzire, prin programul administrat de <strong className="text-white">Administrația Fondului pentru Mediu (AFM).</strong>
            </p>
            <p className="text-[0.86rem] text-white/60 mb-[0.85rem]">
              Noi ne ocupăm de întreaga documentație — <strong className="text-white">complet gratuit</strong> pentru dvs.
            </p>
            <div className="flex flex-col gap-[0.7rem] my-[1.1rem]">
              {CV_POINTS.map((pt) => (
                <div key={pt} className="flex gap-[0.72rem] items-start text-[0.84rem] text-white/75">
                  <span className="flex-shrink-0 w-[18px] h-[18px] bg-lime/25 rounded-full flex items-center justify-center text-[0.62rem] text-lime mt-[0.1rem]">✓</span>
                  {pt}
                </div>
              ))}
            </div>
            <div className="bg-[rgba(244,117,42,0.12)] border border-[rgba(244,117,42,0.22)] rounded-xl p-[0.9rem_1rem] mt-[1.3rem]">
              <span className="block font-sans text-[1.7rem] font-semibold text-orange2 leading-none">Dosar gratuit</span>
              <span className="block text-[0.73rem] text-white/45 mt-[0.18rem]">Oferim întocmirea documentației „Casa Verde" complet gratuit pentru toți clienții noștri</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
