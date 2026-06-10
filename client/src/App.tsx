import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Popup from '@/components/Popup';
import CookieBanner from '@/components/CookieBanner';
import Home from '@/pages/Home';
import Admin from '@/pages/Admin';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsConditions from '@/pages/TermsConditions';
import NotFound from '@/pages/NotFound';

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdmin && <Navbar />}
      <Popup />
      {!isAdmin && <CookieBanner />}

      <Routes>
        <Route path="/"                              element={<Home />} />
        <Route path="/admin"                         element={<Admin />} />
        <Route path="/politica-de-confidentialitate" element={<PrivacyPolicy />} />
        <Route path="/termeni-si-conditii"           element={<TermsConditions />} />
        <Route path="*"                              element={<NotFound />} />
      </Routes>

      {!isAdmin && <Footer />}
    </>
  );
}
