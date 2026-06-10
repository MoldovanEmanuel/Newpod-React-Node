import { useEffect } from 'react';
import { useUIStore } from '@/store';

interface Props {
  images: { src: string; alt: string }[];
}

export default function Lightbox({ images }: Props) {
  const { lightboxOpen, lightboxIndex, closeLightbox, nextLightbox, prevLightbox } = useUIStore();

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     closeLightbox();
      if (e.key === 'ArrowRight') nextLightbox(images.length);
      if (e.key === 'ArrowLeft')  prevLightbox(images.length);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [lightboxOpen, images.length, closeLightbox, nextLightbox, prevLightbox]);

  if (!lightboxOpen) return null;

  const current = images[lightboxIndex];

  const BTN = 'flex items-center justify-center w-[52px] h-[52px] rounded-full bg-white/[0.08] border border-white/[0.15] text-white hover:bg-white/20 transition-colors cursor-pointer';

  return (
    <div
      className="fixed inset-0 z-[900] flex items-center justify-center bg-[rgba(8,15,7,0.95)]"
      onClick={closeLightbox}
    >
      {/* Close — top-right of viewport */}
      <button
        onClick={closeLightbox}
        className={`${BTN} absolute top-5 right-6 text-lg`}
        aria-label="Închide"
      >
        ✕
      </button>

      {/* Prev — left edge of viewport */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); prevLightbox(images.length); }}
          className={`${BTN} absolute left-6 top-1/2 -translate-y-1/2 text-4xl font-light`}
          aria-label="Anterior"
        >
          ‹
        </button>
      )}

      {/* Image */}
      <div className="flex items-center justify-center max-w-[90vw] max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
        <img
          src={current?.src}
          alt={current?.alt}
          className="max-w-[90vw] max-h-[88vh] object-contain rounded-[10px] shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
        />
      </div>

      {/* Next — right edge of viewport */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); nextLightbox(images.length); }}
          className={`${BTN} absolute right-6 top-1/2 -translate-y-1/2 text-4xl font-light`}
          aria-label="Următor"
        >
          ›
        </button>
      )}

      {/* Counter — bottom center of viewport */}
      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/45 text-xs tracking-[0.08em]">
        {lightboxIndex + 1} / {images.length}
      </p>
    </div>
  );
}
