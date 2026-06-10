import Hero from '@/components/Hero';
import QuoteForm from '@/components/QuoteForm';
import Services from '@/components/Services';
import Gallery from '@/components/Gallery';
import Partners from '@/components/Partners';
import Reviews from '@/components/Reviews';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import QuestionForm from '@/components/QuestionForm';

export default function Home() {
  return (
    <main>
      <Hero />
      <QuoteForm />
      <Services />
      <Gallery />
      <Partners />
      <Reviews />
      <FAQ />
      <Contact />
      <QuestionForm />
    </main>
  );
}
