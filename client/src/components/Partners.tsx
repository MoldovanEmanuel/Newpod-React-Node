const PARTNER_COLS = [
  {
    title: 'Parteneri europeni',
    icon: '🌍',
    sub: 'Austria & Olanda',
    items: [
      { name: 'Fronius',        logo: '/images/partners/logo-fronius.png' },
      { name: 'my-PV',          logo: '/images/partners/logo-mypv.png' },
      { name: 'Victron Energy', logo: '/images/partners/logo-victron.png' },
    ],
  },
  {
    title: 'Baterii Litiu',
    icon: '🔋',
    sub: 'China',
    items: [
      { name: 'Dyness',    logo: '/images/partners/logo-dyness.png' },
      { name: 'Deye',      logo: '/images/partners/logo-deye.png' },
      { name: 'Pylontech', logo: '/images/partners/logo-pylontech.png' },
      { name: 'BYD',       logo: '/images/partners/logo-byd.png' },
    ],
  },
  {
    title: 'Invertoare',
    icon: '⚡',
    sub: 'China',
    items: [
      { name: 'Solis',   logo: '/images/partners/logo-solis.png' },
      { name: 'Growatt', logo: '/images/partners/logo-growatt.png' },
      { name: 'SolaX',   logo: '/images/partners/logo-solax.png' },
      { name: 'Huawei',  logo: '/images/partners/logo-huawei.png' },
      { name: 'Deye',    logo: '/images/partners/logo-deye.png' },
    ],
  },
];

export default function Partners() {
  return (
    <section id="parteneri" className="py-24 px-[5%] bg-cream">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-xs font-bold tracking-[0.12em] uppercase text-orange mb-2">Cu cine lucrăm</p>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight text-ink">
            Parteneri & furnizori
          </h2>
          <p className="mt-3 text-muted max-w-lg text-base">
            Lucrăm exclusiv cu branduri certificate și testate — echipamente europene și asiatice de top, cu garanție și suport tehnic.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PARTNER_COLS.map(({ title, icon, sub, items }) => (
            <div key={title} className="flex flex-col gap-6 bg-cream border border-border rounded-[20px] p-[1.8rem]">
              {/* Column header */}
              <div className="flex items-center gap-[0.9rem] pb-[1.2rem] border-b border-border">
                <span className="text-[1.4rem] flex-shrink-0">{icon}</span>
                <div>
                  <p className="font-semibold text-[1.1rem] text-ink leading-[1.2] tracking-[-0.01em]">{title}</p>
                  <p className="text-[0.72rem] text-muted uppercase tracking-[0.08em] font-semibold mt-[0.15rem]">{sub}</p>
                </div>
              </div>
              {/* Logo cards */}
              <div className="flex flex-col gap-3">
                {items.map(({ name, logo }) => (
                  <div key={name} className="flex items-center justify-center bg-paper border border-border rounded-xl p-3 h-[72px] hover:shadow-card hover:-translate-y-0.5 transition-all duration-200">
                    <img src={logo} alt={name} className="h-11 w-full object-contain mix-blend-multiply" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
