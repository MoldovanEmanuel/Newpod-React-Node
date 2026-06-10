import { useUIStore } from '@/store';
import Lightbox from './Lightbox';

const IMAGES = [
  { src: '/images/gallery/gallery-1.webp', thumb: '/images/gallery/gallery-1.jpg', alt: 'Instalare panouri solare Bistrița 1' },
  { src: '/images/gallery/gallery-2.webp', thumb: '/images/gallery/gallery-2.jpg', alt: 'Instalare panouri solare Bistrița 2' },
  { src: '/images/gallery/gallery-3.webp', thumb: '/images/gallery/gallery-3.jpg', alt: 'Instalare panouri solare Bistrița 3' },
  { src: '/images/gallery/gallery-4.webp', thumb: '/images/gallery/gallery-4.jpg', alt: 'Sistem solar termic 1' },
  { src: '/images/gallery/gallery-5.webp', thumb: '/images/gallery/gallery-5.jpg', alt: 'Sistem solar termic 2' },
  { src: '/images/gallery/gallery-6.webp', thumb: '/images/gallery/gallery-6.jpg', alt: 'Sistem fotovoltaic 1' },
  { src: '/images/gallery/gallery-7.webp', thumb: '/images/gallery/gallery-7.jpg', alt: 'Sistem fotovoltaic 2' },
  { src: '/images/gallery/gallery-8.webp', thumb: '/images/gallery/gallery-8.jpg', alt: 'Lucrare solară finalizată' },
];

export default function Gallery() {
  const { openLightbox } = useUIStore();

  return (
    <section id="galerie" className="py-24 px-[5%] bg-paper">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <p className="text-xs font-bold tracking-[0.12em] uppercase text-orange mb-2">Lucrările noastre</p>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight text-ink">
            Galerie foto
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-[0.6rem]">
          {IMAGES.map((img, i) => (
            <button
              key={img.src}
              onClick={() => openLightbox(i)}
              className="relative overflow-hidden rounded-xl cursor-pointer group aspect-square bg-border"
              aria-label={`Deschide imaginea: ${img.alt}`}
            >
              <img
                src={img.thumb}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-colors duration-300 flex items-center justify-center">
                <span className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">⊕</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Lightbox images={IMAGES} />
    </section>
  );
}
