"use client";
import { useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";
import { ArrowDown, ArrowUpRight, MoveRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import {
  CustomCursor,
  Header,
  SectionRail,
  sections,
} from "./components/Interface";
import { About, Skills } from "./components/Networks";
import ProjectLab from "./components/ProjectLab";
import { Contact, Experience, Footer, Process } from "./components/Journey";
import Scene from "./components/Scene";
import { useMedia } from "./hooks";
import LoadingModal from "./components/LoadingModal";

gsap.registerPlugin(ScrollTrigger);

function Hero({ reducedMotion }: { reducedMotion: boolean }) {
  const hero = useRef<HTMLElement>(null);
  const art = useRef<HTMLDivElement>(null);

  const parallax = (event: PointerEvent<HTMLElement>) => {
    if (reducedMotion || event.pointerType === "touch" || !art.current) return;
    art.current.style.setProperty(
      "--art-x",
      `${(event.clientX / window.innerWidth - 0.5) * 13}px`,
    );
    art.current.style.setProperty(
      "--art-y",
      `${(event.clientY / window.innerHeight - 0.5) * 9}px`,
    );
  };

  return (
    <section
      id="home"
      ref={hero}
      className="hero"
      aria-labelledby="hero-title"
      onPointerMove={parallax}
    >
      <div className="hero-art-parallax" aria-hidden="true">
        <div ref={art} className="hero-art ">
          <img
            src="/images/digital-core.jpg"
            // src="/nobg.png"
            alt=""
            className="w-full h-full object-cover object-center opacity-85"
            fetchPriority="high"
          />
          <div className="hero-art-shade" />
        </div>
      </div>
      <Scene mode="core" reducedMotion={reducedMotion} />
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-content section-shell">
        <div className="hero-copy">
          <div className="hero-eyebrow hero-entrance">
            <span className="forge-bracket">[</span> DIGITAL FORGE{" "}
            <span className="forge-bracket">]</span>
            <span className="hero-edition">A DEVELOPER'S WORKSHOP</span>
          </div>
          <h1 id="hero-title" className="hero-entrance">
            JOEL
            <br />
            <span className="hero-last-name">
              MAGAR<span className="name-period ">.</span>
            </span>
          </h1>
          <div className="hero-role hero-entrance">
            <span />
            FRONTEND DEVELOPER
          </div>
          <p className="hero-description hero-entrance">
            I build responsive, interactive, and user-focused web experiences
            with <strong>React</strong> and <strong>Next.js.</strong>
          </p>
          <div className="hero-actions hero-entrance">
            <a href="#projects" className="button button-primary" data-magnetic>
              View projects <ArrowUpRight size={17} />
            </a>
            <a
              href="#contact"
              className="button button-secondary"
              data-magnetic
            >
              Let's work together <MoveRight size={17} />
            </a>
          </div>
        </div>
      </div>
      <div className="hero-bottom section-shell hero-entrance">
        <a className="scroll-cue" href="#about">
          <span className="scroll-arrow">
            <ArrowDown size={16} />
          </span>
          <span>
            SCROLL TO EXPLORE<span>THERE'S MORE BENEATH THE SURFACE</span>
          </span>
        </a>
        <span className="hero-chapter">
          <span>01</span> / DIGITAL CORE
        </span>
      </div>
    </section>
  );
}

export default function PageContent() {
  const reducedMotion = useMedia("(prefers-reduced-motion: reduce)");
  const [activeSection, setActiveSection] = useState("home");
  const page = useRef<HTMLDivElement>(null);
  const smoothScroll = useRef<Lenis | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    let frame = 0;
    let previous = "home";
    const update = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty(
        "--scroll-progress",
        `${maxScroll > 0 ? window.scrollY / maxScroll : 0}`,
      );
      let current = "home";
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (
          element &&
          element.getBoundingClientRect().top <= window.innerHeight * 0.4
        )
          current = section.id;
      }
      if (current !== previous) {
        previous = current;
        setActiveSection(current);
      }
      frame = 0;
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", scroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", scroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      anchors: { offset: -88 },
      prevent: (node) => Boolean(node.closest("dialog")),
    });
    smoothScroll.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    const context = gsap.context(() => {
      gsap.from(".hero-entrance", {
        y: 25,
        opacity: 0,
        duration: 1.1,
        stagger: 0.105,
        ease: "power3.out",
        delay: 0.15,
      });
      gsap.to(".hero-art-parallax", {
        yPercent: 13,
        scale: 1.035,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
        gsap.from(element, {
          y: 26,
          opacity: 0,
          duration: 0.85,
          ease: "power2.out",
          scrollTrigger: { trigger: element, start: "top 91%", once: true },
        });
      });
    }, page);
    let mounted = true;
    document.fonts.ready.then(() => {
      if (mounted) ScrollTrigger.refresh();
    });
    const refresh = setTimeout(() => ScrollTrigger.refresh(), 1000);
    return () => {
      mounted = false;
      clearTimeout(refresh);
      context.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
      smoothScroll.current = null;
    };
  }, [reducedMotion]);

  const scrollTo = (position: number) => {
    if (smoothScroll.current)
      smoothScroll.current.scrollTo(position, { immediate: true });
    else window.scrollTo({ top: position, behavior: "instant" });
  };

  return (
    <div
      ref={page}
      className={`digital-forge ${reducedMotion ? "reduced-motion" : ""}`}
    >
      {isLoading && <LoadingModal onComplete={() => setLoading(false)} />}

      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="scroll-progress" aria-hidden="true" />

      <Header activeSection={activeSection} />
      <SectionRail activeSection={activeSection} />
      <CustomCursor reducedMotion={reducedMotion} />
      <main id="main-content" tabIndex={-1}>
        <Hero reducedMotion={reducedMotion} />
        <About reducedMotion={reducedMotion} />
        <Skills reducedMotion={reducedMotion} />
        <ProjectLab reducedMotion={reducedMotion} scrollTo={scrollTo} />
        <Experience reducedMotion={reducedMotion} />
        <Process reducedMotion={reducedMotion} />
        <Contact reducedMotion={reducedMotion} />
      </main>
      <Footer />
    </div>
  );
}
