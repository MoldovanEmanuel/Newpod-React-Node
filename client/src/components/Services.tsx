const SERVICES = [
  {
    icon: '🔥',
    pill: 'ACM · Încălzire · Iarnă-Vară',
    title: 'Energie termică',
    desc: 'Sistemele solare de apă caldă folosesc radiația solară pentru încălzirea apei. La latitudini geografice joase (sub 40°) pot furniza 60–70% din apa caldă menajeră necesară, cu temperaturi până la 60°C. Circuit închis presurizat, funcționează iarnă–vară.',
    pillStyle: { background: 'rgba(244,117,42,0.15)', color: '#f9a25c', border: '1px solid rgba(244,117,42,0.25)' },
  },
  {
    icon: '☀️',
    pill: 'Fotovoltaice · Invertoare · Stocare',
    title: 'Energie solară',
    desc: 'Energia solară — lumina și căldura radiantă a soarelui — o sursă gratuită și ecologică. Instalăm panouri fotovoltaice pentru producerea energiei electrice proprii, cu invertoare, regulatoare și acumulatori.',
    pillStyle: { background: 'rgba(108,192,74,0.12)', color: '#6cc04a', border: '1px solid rgba(108,192,74,0.22)' },
  },
  {
    icon: '🏡',
    pill: 'AFM · Dosar gratuit · Nerambursabil',
    title: 'Alte produse „Casa Verde"',
    desc: 'Statul subvenționează înlocuirea sistemelor tradiționale prin programul „Casa Verde". Noi întocmim toată documentația pentru programul AFM complet gratuit — de la dosar până la decontare.',
    pillStyle: { background: 'rgba(30,107,58,0.15)', color: '#8ecf8e', border: '1px solid rgba(30,107,58,0.3)' },
  },
];

export default function Services() {
  return (
    <section id="servicii" className="py-24 px-[5%] bg-ink relative overflow-hidden">
      <div className="absolute -top-48 -right-48 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(108,192,74,0.07)_0%,transparent_70%)] pointer-events-none" />
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <p className="text-xs font-bold tracking-[0.12em] uppercase text-lime mb-2">Ce oferim</p>
          <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-bold tracking-tight text-white leading-tight">
            Serviciile noastre
          </h2>
          <p className="mt-3 text-white/50 max-w-xl text-base">
            Soluții complete de energie regenerabilă, instalate profesionist pentru orice tip de imobil.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-[1.2rem]">
          {SERVICES.map(({ icon, pill, title, desc, pillStyle }, i) => (
            <div
              key={title}
              className="bg-white/[0.04] border border-white/[0.09] rounded-2xl p-8 hover:bg-white/[0.08] hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4 relative overflow-hidden group"
            >
              <div
                className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center text-[1.8rem]"
                style={{ background: i === 0 ? 'rgba(244,117,42,0.15)' : i === 1 ? 'rgba(108,192,74,0.12)' : 'rgba(30,107,58,0.15)' }}
              >
                {icon}
              </div>
              <h3 className="text-xl font-semibold text-white">{title}</h3>
              <p className="text-white/55 text-sm leading-relaxed flex-1">{desc}</p>
              <span
                className="self-start text-[0.7rem] font-bold tracking-[0.04em] uppercase px-[0.82rem] py-[0.28rem] rounded-full"
                style={pillStyle}
              >
                {pill}
              </span>
              <div className={`absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity ${i === 0 ? 'bg-gradient-to-r from-orange to-orange2' : i === 1 ? 'bg-gradient-to-r from-lime to-[#a8e07a]' : 'bg-gradient-to-r from-green to-lime'}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
