import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Skills from '../sections/Skills';
import Projects from '../sections/Projects';
import ResumeSection from '../sections/ResumeSection';
import Documents from '../sections/Documents';
import CreativeWork from '../sections/CreativeWork';
import Writing from '../sections/Writing';
import MartialArts from '../sections/MartialArts';
import Journey from '../sections/Journey';
import GitHub from '../sections/GitHub';
import Testimonials from '../sections/Testimonials';
import Contact from '../sections/Contact';
import Footer from '../components/Footer';

export default function AlanPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Alan Hanma Umar | Full Stack Developer & Digital Creator";
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <ResumeSection />
      <Documents />
      <CreativeWork />
      <Writing />
      <MartialArts />
      <Journey />
      <GitHub />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}
