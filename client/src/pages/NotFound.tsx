import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="pt-[66px] min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-[8rem] font-bold text-green leading-none mb-4">404</h1>
        <h2 className="text-[1.6rem] font-bold text-ink mb-3">Pagina nu a fost găsită</h2>
        <p className="text-muted mb-8">Pagina pe care o cauți nu există sau a fost mutată.</p>
        <Link
          to="/"
          className="inline-block bg-orange text-white font-bold px-8 py-4 rounded-full hover:bg-orange2 transition-colors no-underline"
        >
          ← Înapoi acasă
        </Link>
      </div>
    </main>
  );
}
