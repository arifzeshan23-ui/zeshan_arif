"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/shared/Navbar";
import ScrollProgress from "@/components/shared/ScrollProgress";
import LoadingScreen from "@/components/shared/LoadingScreen";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";
import Certificates from "@/components/sections/Certificates";
import Experience from "@/components/sections/Experience";
import Achievements from "@/components/sections/Achievements";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

const ParticleBackground = dynamic(
  () => import("@/components/shared/ParticleBackground"),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <ParticleBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Services />
        <Certificates />
        <Experience />
        <Achievements />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
