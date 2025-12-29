import Scene from "@/components/3d/Scene";
import { Navigation } from "@/pages/Navigation";
import { Hero } from "@/pages/Hero";
import { Projects } from "@/pages/Projects";
import { Skills } from "@/pages/Skills";
import { Contact } from "@/pages/Contact";
import About from "./About";
import { Footer } from "./Footer";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
const Index = () => {
  // const divRef = useRef(null);
  // const containerRef = useRef(null);
  // useGSAP(
  //   () => {
  //     gsap.from(divRef.current, {
  //       scrollTrigger: {
  //         trigger: divRef.current,
  //         markers: true,
  //         toggleActions: "restart pause reverse pause",
  //         scrub: true,
  //         start: "top 80%",
  //         // pin: containerRef.current,
  //         // pinSpacing: false,
  //       },
  //       x: 2000,
  //       xPercent: -200,
  //       duration: 4,
  //     });
  //     gsap.from(containerRef.current, {
  //       scrollTrigger: {
  //         trigger: containerRef.current,
  //         markers: true,
  //         // toggleActions: "restart pause reverse pause",
  //         // scrub: true,
  //         // start: "top top",
  //         pin: true,
  //         pinSpacing: false,
  //       },
  //     });
  //   },

  //   {
  //     scope: divRef,
  //   }
  // );
  // useGSAP(() => {}, {
  //   scope: containerRef,
  // });
  return (
    <div className="min-h-screen  max-w-screen relative  overflow-x-hidden text-foreground">
      {/* 3D Background Scene */}

      <Navigation />
      <Scene />

      <main className="py-20 md:py-0">
        <section id="home">
          <Hero />
        </section>
        <section id="about">
          <About />
        </section>

        <section id="projects">
          <Projects />
        </section>

        <section id="skills">
          <Skills />
        </section>

        <section id="contact">
          <Contact />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
