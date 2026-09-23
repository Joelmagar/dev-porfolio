"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, Volume2, VolumeX, X } from "lucide-react";
import gsap from "gsap";

export const sections = [
  { id: "home", title: "Digital core" },
  { id: "about", title: "System architecture" },
  { id: "skills", title: "Skill matrix" },
  { id: "projects", title: "Project lab" },
  { id: "experience", title: "Development pipeline" },
  { id: "process", title: "The build process" },
  { id: "contact", title: "Connection hub" },
];

export function ForgeMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 36"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M16 2 29 9.5v16L16 33 3 25.5v-16L16 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="m9 12 7-4 7 4-7 4-7-4Zm0 6 7 4 7-4M9 24l7 4 7-4M16 16v12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SectionLabel({
  number,
  children,
  meta,
}: {
  number: string;
  children: React.ReactNode;
  meta?: string;
}) {
  return (
    <div className="section-label">
      <span>
        <span className="section-number">{number}</span>
        <span className="label-slash">/</span>
        {children}
      </span>
      {meta && <span className="section-meta">{meta}</span>}
    </div>
  );
}

function AudioToggle() {
  const [enabled, setEnabled] = useState(false);
  const [error, setError] = useState("");
  const audio = useRef<{ context: AudioContext; master: GainNode } | null>(
    null,
  );
  const enabledRef = useRef(false);
  const pauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const visibility = () => {
      if (!audio.current) return;
      if (document.hidden) void audio.current.context.suspend();
      else if (enabledRef.current) void audio.current.context.resume();
    };
    document.addEventListener("visibilitychange", visibility);
    return () => {
      document.removeEventListener("visibilitychange", visibility);
      if (pauseTimer.current) clearTimeout(pauseTimer.current);
      if (audio.current) void audio.current.context.close();
      audio.current = null;
    };
  }, []);

  const toggle = async () => {
    try {
      if (pauseTimer.current) clearTimeout(pauseTimer.current);
      if (!audio.current) {
        const context = new AudioContext();
        const master = context.createGain();
        master.gain.value = 0;
        master.connect(context.destination);
        // A quiet synthesized pad avoids downloading audio or starting it without consent.
        [110, 164.81, 220, 329.63].forEach((frequency, index) => {
          const oscillator = context.createOscillator();
          const voice = context.createGain();
          oscillator.type = "sine";
          oscillator.frequency.value = frequency;
          oscillator.detune.value = index % 2 ? -4 : 4;
          voice.gain.value = 0.18;
          oscillator.connect(voice);
          voice.connect(master);
          oscillator.start();
        });
        audio.current = { context, master };
      }
      const { context, master } = audio.current;
      const next = !enabledRef.current;
      await context.resume();
      master.gain.cancelScheduledValues(context.currentTime);
      master.gain.setValueAtTime(master.gain.value, context.currentTime);
      master.gain.linearRampToValueAtTime(
        next ? 0.075 : 0,
        context.currentTime + 0.4,
      );
      if (!next)
        pauseTimer.current = setTimeout(() => {
          void context.suspend();
        }, 450);
      enabledRef.current = next;
      setEnabled(next);
      setError("");
    } catch {
      setError("Ambient sound is unavailable in this browser.");
    }
  };

  return (
    <div className="audio-control">
      <button
        className={`audio-toggle ${enabled ? "is-on" : ""}`}
        type="button"
        onClick={toggle}
        aria-pressed={enabled}
        aria-label={enabled ? "Mute ambient sound" : "Enable ambient sound"}
        title={enabled ? "Mute ambient sound" : "Enable ambient sound"}
      >
        {enabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
        <span>SOUND {enabled ? "ON" : "OFF"}</span>
        <span className="sound-bars" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
      </button>
      {error && (
        <span className="audio-error" role="status">
          {error}
        </span>
      )}
    </div>
  );
}

export function Header({ activeSection }: { activeSection: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menuOpen]);

  return (
    <header className="site-header">
      <a
        className="brand"
        href="#home"
        aria-label="Joel Magar, back to the digital core"
        onClick={() => setMenuOpen(false)}
      >
        <ForgeMark />
        <span>
          JOEL<span className="brand-period">.</span>
        </span>
      </a>
      <nav
        id="main-navigation"
        className={`main-nav ${menuOpen ? "is-open" : ""}`}
        aria-label="Main navigation"
      >
        {["about", "skills", "projects", "experience", "contact"].map((id) => (
          <a
            key={id}
            href={`#${id}`}
            className={activeSection === id ? "is-active" : ""}
            aria-current={activeSection === id ? "location" : undefined}
            onClick={() => setMenuOpen(false)}
          >
            {id}
            <span className="nav-dot" />
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <a href="#contact" className="availability">
          <span className="status-dot" /> OPEN TO WORK{" "}
          <ArrowUpRight size={13} />
        </a>
        <AudioToggle />
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>
    </header>
  );
}

export function SectionRail({ activeSection }: { activeSection: string }) {
  return (
    <nav className="section-rail" aria-label="Experience chapters">
      {sections.map((section, i) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className={activeSection === section.id ? "is-active" : ""}
          aria-label={`${String(i + 1).padStart(2, "0")}. ${section.title}`}
          aria-current={activeSection === section.id ? "location" : undefined}
          title={section.title}
        >
          <span>{String(i + 1).padStart(2, "0")}</span>
          <i />
        </a>
      ))}
    </nav>
  );
}

export function CustomCursor({ reducedMotion }: { reducedMotion: boolean }) {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion || !window.matchMedia("(pointer: fine)").matches) return;
    const pointer = { x: -100, y: -100 };
    const eased = { x: -100, y: -100 };
    let magnetic: HTMLElement | null = null;

    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      document.documentElement.classList.add("has-custom-cursor");
      ring.current?.classList.add("is-visible");
      dot.current?.classList.add("is-visible");
      const target = event.target instanceof Element ? event.target : null;
      ring.current?.classList.toggle(
        "is-interactive",
        Boolean(target?.closest('a,button,input,textarea,[role="tab"]')),
      );
      const next = target?.closest<HTMLElement>("[data-magnetic]") ?? null;
      if (magnetic && magnetic !== next) magnetic.style.translate = "0 0";
      magnetic = next;
      if (magnetic) {
        const bounds = magnetic.getBoundingClientRect();
        magnetic.style.translate = `${(event.clientX - bounds.left - bounds.width / 2) * 0.06}px ${(event.clientY - bounds.top - bounds.height / 2) * 0.12}px`;
      }
    };
    const hide = () => {
      ring.current?.classList.remove("is-visible");
      dot.current?.classList.remove("is-visible");
      document.documentElement.classList.remove("has-custom-cursor");
    };
    const tick = () => {
      eased.x += (pointer.x - eased.x) * 0.16;
      eased.y += (pointer.y - eased.y) * 0.16;
      if (ring.current)
        ring.current.style.transform = `translate3d(${eased.x}px, ${eased.y}px, 0)`;
      if (dot.current)
        dot.current.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0)`;
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("mouseleave", hide);
    window.addEventListener("blur", hide);
    gsap.ticker.add(tick);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("mouseleave", hide);
      window.removeEventListener("blur", hide);
      gsap.ticker.remove(tick);
      document.documentElement.classList.remove("has-custom-cursor");
      if (magnetic) magnetic.style.translate = "0 0";
    };
  }, [reducedMotion]);

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true">
        <i />
      </div>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
