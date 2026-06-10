import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ── UI store (ephemeral) ──────────────────────────────────────────────────────
interface UIStore {
  menuOpen: boolean;
  activeSection: string;
  popup: { type: 'success' | 'error'; message: string } | null;
  lightboxOpen: boolean;
  lightboxIndex: number;
  setMenuOpen: (open: boolean) => void;
  setActiveSection: (id: string) => void;
  showPopup: (type: 'success' | 'error', message: string) => void;
  hidePopup: () => void;
  openLightbox: (index: number) => void;
  closeLightbox: () => void;
  nextLightbox: (total: number) => void;
  prevLightbox: (total: number) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  menuOpen:       false,
  activeSection:  'oferta',
  popup:          null,
  lightboxOpen:   false,
  lightboxIndex:  0,

  setMenuOpen:      (open)    => set({ menuOpen: open }),
  setActiveSection: (id)      => set({ activeSection: id }),
  showPopup:        (type, message) => set({ popup: { type, message } }),
  hidePopup:        ()        => set({ popup: null }),
  openLightbox:     (index)   => set({ lightboxOpen: true, lightboxIndex: index }),
  closeLightbox:    ()        => set({ lightboxOpen: false }),
  nextLightbox:     (total)   => set((s) => ({ lightboxIndex: (s.lightboxIndex + 1) % total })),
  prevLightbox:     (total)   => set((s) => ({ lightboxIndex: (s.lightboxIndex - 1 + total) % total })),
}));

// ── Cookie consent store (persisted to localStorage) ─────────────────────────
type ConsentState = 'granted' | 'denied' | null;

interface CookieStore {
  consent: ConsentState;
  showBanner: boolean;
  setConsent: (c: ConsentState) => void;
  dismissBanner: () => void;
}

export const useCookieStore = create<CookieStore>()(
  persist(
    (set) => ({
      consent:    null,
      showBanner: true,
      setConsent: (consent) => set({ consent, showBanner: false }),
      dismissBanner: () => set({ showBanner: false }),
    }),
    { name: 'newpod_cookie_consent' }
  )
);

// ── Admin store (token persisted) ────────────────────────────────────────────
interface AdminStore {
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set) => ({
      token:    null,
      setToken: (token) => set({ token }),
      logout:   ()      => set({ token: null }),
    }),
    { name: 'newpod_admin_token' }
  )
);
