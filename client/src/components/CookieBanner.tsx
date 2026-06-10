import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCookieStore } from '@/store';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const GA_ID = 'G-0K239B6FVN';

function loadGA() {
  if (document.getElementById('ga-script')) return;
  const s = document.createElement('script');
  s.id = 'ga-script';
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function (...args: unknown[]) { window.dataLayer!.push(args); };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, { anonymize_ip: true });
}

export default function CookieBanner() {
  const { consent, showBanner, setConsent } = useCookieStore();
  const [showPrefs, setShowPrefs] = useState(false);
  const [analyticsOn, setAnalyticsOn] = useState(true);

  useEffect(() => {
    if (consent === 'granted') loadGA();
  }, [consent]);

  if (!showBanner) return null;

  function acceptAll() {
    setConsent('granted');
  }

  function deny() {
    setConsent('denied');
  }

  function savePrefs() {
    setConsent(analyticsOn ? 'granted' : 'denied');
    setShowPrefs(false);
  }

  const BTN = 'px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer border-none transition-colors duration-200 whitespace-nowrap';

  return (
    <>
      {/* Main banner overlay */}
      {!showPrefs && (
        <div className="fixed inset-0 z-[9000] flex items-center justify-center p-4 bg-black/45 animate-fadeIn">
          <div className="bg-white rounded-[18px] shadow-[0_8px_40px_rgba(0,0,0,0.18)] p-8 max-w-[500px] w-full flex flex-col gap-5 scale-100 animate-fadeUp">
            <div>
              <strong className="block text-base text-ink font-semibold mb-1.5" style={{ fontFamily: '"DM Sans", sans-serif' }}>
                Folosim cookie-uri
              </strong>
              <p className="text-[0.82rem] text-muted m-0 leading-relaxed">
                Utilizăm cookie-uri de analiză (Google Analytics) pentru a înțelege cum este folosit site-ul.
                Cookie-urile necesare sunt întotdeauna active.{' '}
                <Link to="/politica-de-confidentialitate" className="text-green2 hover:underline">
                  Politică de confidențialitate
                </Link>
              </p>
            </div>
            <div className="flex gap-2.5 flex-wrap">
              <button onClick={deny} className={`${BTN} bg-transparent border border-border text-ink hover:border-green2 hover:text-green2`}>
                Respinge
              </button>
              <button onClick={() => setShowPrefs(true)} className={`${BTN} bg-transparent border border-border text-ink hover:border-green2 hover:text-green2`}>
                Preferințe
              </button>
              <button onClick={acceptAll} className={`${BTN} bg-green2 text-white hover:bg-ink2`}>
                Acceptă tot
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preferences modal */}
      {showPrefs && (
        <div className="fixed inset-0 z-[9500] flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-[18px] p-8 max-w-[520px] w-full relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowPrefs(false)}
              className="absolute top-4 right-4 bg-transparent border-none text-muted cursor-pointer px-2 py-1 rounded-md hover:bg-cream text-sm"
            >
              ✕
            </button>
            <h3 className="text-[1.2rem] font-bold text-ink mb-1" style={{ fontFamily: '"DM Sans", sans-serif' }}>Preferințe cookie-uri</h3>
            <p className="text-[0.82rem] text-muted mb-5">Alege ce tipuri de cookie-uri dorești să activezi.</p>

            {/* Necessary */}
            <div className="border border-border rounded-xl p-4 mb-3">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <strong className="block text-[0.86rem] text-ink mb-1">Cookie-uri necesare</strong>
                  <p className="text-[0.76rem] text-muted m-0 leading-relaxed">Esențiale pentru funcționarea site-ului. Nu pot fi dezactivate.</p>
                </div>
                <span className="text-[0.72rem] font-semibold text-green2 flex-shrink-0 mt-0.5">Întotdeauna active</span>
              </div>
            </div>

            {/* Analytics */}
            <div className="border border-border rounded-xl p-4 mb-5">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <strong className="block text-[0.86rem] text-ink mb-1">Cookie-uri de analiză</strong>
                  <p className="text-[0.76rem] text-muted m-0 leading-relaxed">Google Analytics — ne ajută să înțelegem cum este folosit site-ul (date anonimizate).</p>
                </div>
                <label className="relative w-11 h-6 flex-shrink-0 cursor-pointer mt-0.5">
                  <input
                    type="checkbox"
                    checked={analyticsOn}
                    onChange={(e) => setAnalyticsOn(e.target.checked)}
                    className="hidden"
                  />
                  <span className={`absolute inset-0 rounded-full transition-colors duration-200 ${analyticsOn ? 'bg-green2' : 'bg-[#ddd]'}`} />
                  <span className={`absolute top-[3px] left-[3px] w-[18px] h-[18px] bg-white rounded-full transition-transform duration-200 ${analyticsOn ? 'translate-x-5' : 'translate-x-0'}`} />
                </label>
              </div>
            </div>

            <div className="flex gap-2.5 justify-end flex-wrap">
              <button onClick={deny} className={`${BTN} bg-transparent border border-border text-ink hover:border-green2 hover:text-green2`}>
                Respinge toate
              </button>
              <button onClick={savePrefs} className={`${BTN} bg-green2 text-white hover:bg-ink2`}>
                Salvează preferințele
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
