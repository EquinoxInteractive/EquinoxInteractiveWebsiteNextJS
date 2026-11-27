import Navbar from '@/components/navbar';
import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import Team from '@/components/sections/team';
import Games from '@/components/sections/games';
import Contact from '@/components/sections/contact';
import Footer from '@/components/sections/footer';
import BackToTop from '@/components/back-to-top';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Team />
        <Games />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
