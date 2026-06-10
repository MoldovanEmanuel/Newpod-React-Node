export default function Hero() {
  return (
    <section id="acasa" className="mt-[66px] p-0 leading-none hidden md:block">
      <picture>
        <source media="(max-width: 750px)" srcSet="/images/banner-newpod-mobile.webp" width={750} height={400} />
        <img
          src="/images/banner-newpod.webp"
          alt="SC Newpod SRL — Instalatori panouri solare Bistrița"
          className="w-full h-auto block"
          width={1440}
          height={680}
          fetchPriority="high"
        />
      </picture>
    </section>
  );
}
