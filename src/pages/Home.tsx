import Scene from "@/components/3d/Scene";
import { Navigation } from "@/pages/Navigation";
import { Hero } from "@/pages/Hero";
import { Projects } from "@/pages/Projects";
import { Skills } from "@/pages/Skills";
import { Contact } from "@/pages/Contact";
import About from "./About";
import { Footer } from "./Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* 3D Background Scene */}

      <Navigation />
      <Scene />

      <main>
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
