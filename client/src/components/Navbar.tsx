import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUIStore } from '@/store';

const NAV_LINKS = [
  { href: '#oferta',    label: 'Ofertă' },
  { href: '#servicii',  label: 'Servicii' },
  { href: '#galerie',   label: 'Galerie' },
  { href: '#parteneri', label: 'Parteneri' },
  { href: '#recenzii',  label: 'Recenzii' },
  { href: '#intrebari', label: 'Întrebări' },
  { href: '#contact',   label: 'Contact' },
  { href: '/admin',     label: 'Admin' },
];

const LEGAL_NAV_LINKS = [
  { href: '/#oferta',   label: 'Cere ofertă' },
  { href: '/#servicii', label: 'Servicii' },
  { href: '/#contact',  label: 'Contact' },
];

const LEGAL_PATHS = ['/termeni-si-conditii', '/politica-de-confidentialitate'];

export default function Navbar() {
  const { menuOpen, activeSection, setMenuOpen, setActiveSection } = useUIStore();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isLegal = LEGAL_PATHS.includes(location.pathname);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!isHome) return;
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current!.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, [isHome, setActiveSection]);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 860) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [setMenuOpen]);

  function handleNavClick(href: string) {
    setMenuOpen(false);
    if (isHome) {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const desktopLinks = isLegal ? null : (
    <ul className="hidden md:flex gap-[1.9rem] list-none items-center">
      {NAV_LINKS.map(({ href, label }) => {
        const active = isHome && activeSection === href.slice(1);
        return (
          <li key={href}>
            <a
              href={isHome ? href : `/${href}`}
              onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
              className={`relative text-sm font-medium no-underline transition-colors duration-200 pb-[3px]
                after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:rounded-sm
                after:bg-green after:scale-x-0 after:origin-center after:transition-transform after:duration-[250ms]
                hover:text-green hover:after:scale-x-100
                ${active ? 'text-green font-semibold after:scale-x-100' : 'text-ink'}`}
            >
              {label}
            </a>
          </li>
        );
      })}
    </ul>
  );

  const legalDesktopLinks = isLegal ? (
    <ul className="hidden md:flex gap-[1.9rem] list-none items-center">
      {LEGAL_NAV_LINKS.map(({ href, label }) => (
        <li key={href}>
          <Link
            to={href}
            className="relative text-sm font-medium no-underline text-ink transition-colors duration-200 hover:text-green"
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  ) : null;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[200] flex items-center justify-between px-[5%] h-[66px] bg-cream/95 backdrop-blur-md border-b border-border">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 no-underline">
          <span className="w-[34px] h-[34px] rounded-[10px] bg-gradient-to-br from-green to-lime flex items-center justify-center text-lg flex-shrink-0">
            ☀️
          </span>
          <span className="font-semibold text-xl tracking-tight text-ink leading-none">
            New<span className="text-orange">pod</span>
            <span className="block text-[0.48rem] font-bold tracking-[0.22em] uppercase text-green mt-[0.2rem]">
              Energie solară
            </span>
          </span>
        </Link>

        {/* Desktop links */}
        {desktopLinks}
        {legalDesktopLinks}

        {/* Desktop CTA */}
        <a
          href="tel:0744638212"
          className="hidden md:flex items-center gap-2 bg-lime text-white px-[1.15rem] py-2 rounded-full font-bold text-[0.85rem] no-underline shadow-btn transition-all duration-200 hover:bg-green hover:-translate-y-px"
        >
          📞 0744 638 212
        </a>

        {/* Burger */}
        <button
          className={`flex md:hidden flex-col justify-center items-center w-10 h-10 cursor-pointer gap-[5px] bg-transparent border-none p-0 z-[400] ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Meniu"
        >
          <span className={`block w-[22px] h-[2px] bg-ink rounded-sm transition-all duration-300 origin-center ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`block w-[22px] h-[2px] bg-ink rounded-sm transition-all duration-300 ${menuOpen ? 'opacity-0 w-0' : ''}`} />
          <span className={`block w-[22px] h-[2px] bg-ink rounded-sm transition-all duration-300 origin-center ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>
      </nav>

      {/* Mobile overlay menu */}
      <div className={`fixed inset-0 z-[350] bg-cream flex flex-col pt-[90px] px-[6%] pb-12 overflow-y-auto transition-transform duration-[400ms] ease-[cubic-bezier(0.77,0,0.18,1)] ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-[1.1rem] right-[5%] w-11 h-11 flex items-center justify-center bg-paper border-[1.5px] border-border rounded-full cursor-pointer text-base text-ink transition-all duration-200 hover:bg-cream hover:border-green hover:text-green hover:rotate-90"
        >
          ✕
        </button>

        <ul className="list-none flex flex-col w-full border-t border-border mb-auto">
          {(isLegal ? LEGAL_NAV_LINKS : NAV_LINKS).map(({ href, label }) => {
            const active = isHome && !isLegal && activeSection === href.slice(1);
            return (
              <li key={href} className="border-b border-border">
                <a
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center justify-between no-underline py-[1.1rem] text-[1.9rem] font-semibold tracking-tight transition-colors duration-200 ${active ? 'text-green' : 'text-ink hover:text-green'}`}
                >
                  {label}
                  <span className={`text-xl font-light transition-opacity duration-200 ${active ? 'opacity-100 text-green' : 'opacity-25'}`}>→</span>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="pt-10 flex flex-col gap-4">
          <a href="tel:0744638212" className="flex items-center justify-center gap-2 bg-orange text-white py-4 px-8 rounded-full font-bold text-base no-underline shadow-[0_4px_20px_rgba(244,117,42,0.3)]">
            📞 0744 638 212
          </a>
          <a href="mailto:office@newpod.ro" className="flex items-center justify-center gap-2 text-green py-[0.9rem] px-8 rounded-full border-[1.5px] border-border font-semibold text-[0.9rem] no-underline">
            ✉ office@newpod.ro
          </a>
          <p className="text-center text-[0.72rem] text-muted tracking-[0.08em] uppercase mt-2">
            SC Newpod SRL · Bistrița, România
          </p>
        </div>
      </div>
    </>
  );
}
