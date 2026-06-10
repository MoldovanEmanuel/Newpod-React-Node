import { describe, it, expect, beforeEach } from 'vitest';
import { useUIStore } from '@/store';

describe('UIStore', () => {
  beforeEach(() => {
    useUIStore.setState({
      menuOpen: false, activeSection: 'oferta', popup: null,
      lightboxOpen: false, lightboxIndex: 0,
    });
  });

  it('toggles mobile menu', () => {
    useUIStore.getState().setMenuOpen(true);
    expect(useUIStore.getState().menuOpen).toBe(true);
    useUIStore.getState().setMenuOpen(false);
    expect(useUIStore.getState().menuOpen).toBe(false);
  });

  it('shows and hides popup', () => {
    useUIStore.getState().showPopup('success', 'Test message');
    expect(useUIStore.getState().popup).toEqual({ type: 'success', message: 'Test message' });
    useUIStore.getState().hidePopup();
    expect(useUIStore.getState().popup).toBeNull();
  });

  it('advances lightbox with wrapping', () => {
    useUIStore.getState().openLightbox(0);
    useUIStore.getState().nextLightbox(3);
    expect(useUIStore.getState().lightboxIndex).toBe(1);
    useUIStore.getState().nextLightbox(3);
    useUIStore.getState().nextLightbox(3);
    expect(useUIStore.getState().lightboxIndex).toBe(0); // wraps
  });
});
