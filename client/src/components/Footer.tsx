import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#080f07] text-paper/40 text-sm py-12 px-[1.8rem]">
      <div className="max-w-[1100px] mx-auto">
        {/* Top row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-center gap-10 pb-5 border-b border-paper/[0.08] mb-4">
          {/* Links */}
          <nav className="flex flex-col gap-1.5" aria-label="Footer navigation">
            <Link to="/termeni-si-conditii" className="hover:text-green2 transition-colors">
              Termeni și condiții
            </Link>
            <Link to="/politica-de-confidentialitate" className="hover:text-green2 transition-colors">
              Politică de confidențialitate
            </Link>
          </nav>

          {/* ANPC badges */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <a href="https://anpc.ro/ce-este-sal/" target="_blank" rel="noopener noreferrer">
              <img src="/images/anpc-sal.png" alt="ANPC SAL" className="max-w-[160px] w-full h-auto opacity-85 hover:opacity-100 transition-opacity" />
            </a>
            <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
              <img src="/images/anpc-sol.png" alt="ANPC SOL" className="max-w-[160px] w-full h-auto opacity-85 hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>

        {/* Legal */}
        <p className="leading-7">
          © {year} SC Newpod SRL · CUI 29078920 · J06/560/2011 · Str. Ioan Sabău, Nr. 5, Bistrița, România ·{' '}
          <a href="tel:+40744638212" className="hover:text-green2 transition-colors">+40 (744) 638 212</a> ·{' '}
          <a href="mailto:office@newpod.ro" className="hover:text-green2 transition-colors">office@newpod.ro</a>
        </p>
      </div>
    </footer>
  );
}
