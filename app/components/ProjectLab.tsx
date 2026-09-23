"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Code2,
  FileText,
  Globe2,
  GraduationCap,
  HeartPulse,
  Layers3,
  LockKeyhole,
  Mail,
  Search,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionLabel } from "./Interface";
import { useMedia } from "../hooks";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  name: string;
  category: string;
  description: string;
  technologies: string[];
  accent: string;
  year: string;
  focus: string[];
  overview: string;
}

const projects: Project[] = [
  {
    name: "UNISEEK",
    category: "EDTECH / WEB PLATFORM",
    description:
      "A clearer path to studying abroad. Mentorship, test preparation, and document management, all in one place.",
    technologies: ["React", "JavaScript", "REST APIs", "CSS"],
    accent: "#a4e9d6",
    year: "01",
    focus: [
      "A connected study-abroad planning experience",
      "Responsive mentorship and test-preparation interfaces",
      "Intuitive document management and API integration",
    ],
    overview:
      "UNISEEK brings the moving parts of an international education journey together. The frontend centers on making complex planning tasks approachable, from discovering mentorship to preparing documents and navigating test preparation.",
  },
  {
    name: "MEDIPUZZLE",
    category: "HEALTHCARE / INTERACTIVE LEARNING",
    description:
      "Serious learning. A little more play. A game-based platform making complex medical concepts engaging and intuitive.",
    technologies: ["React", "JavaScript", "CSS", "REST APIs"],
    accent: "#b8a6ec",
    year: "02",
    focus: [
      "Engaging, game-based medical learning",
      "Clear feedback and intuitive interaction patterns",
      "Responsive, accessible learning interfaces",
    ],
    overview:
      "MEDIPUZZLE rethinks how complex medical concepts are experienced on screen. Interactive learning flows and clear visual feedback make challenging material feel less intimidating and more rewarding to explore.",
  },
  {
    name: "IHRTRACK",
    category: "BUSINESS / WORKFORCE MANAGEMENT",
    description:
      "A better view of the workday. A digital workspace for business attendance and everyday workforce activity.",
    technologies: ["React", "JavaScript", "REST APIs", "HTML"],
    accent: "#97badf",
    year: "03",
    focus: [
      "Readable attendance and workforce interfaces",
      "API-connected data views and reliable UI states",
      "Consistent layouts across browsers and devices",
    ],
    overview:
      "IHRTRACK helps make daily workforce activity easier to understand. The interface brings attendance and business data into focused views with readable layouts, predictable navigation, and dependable data handling.",
  },
  {
    name: "CLUBCANVA",
    category: "SAAS / MEMBER MANAGEMENT",
    description:
      "Membership, without the friction. Connected workflows that make managing a community feel simple.",
    technologies: ["React", "JavaScript", "REST APIs", "CSS"],
    accent: "#e2b69c",
    year: "04",
    focus: [
      "API integrations and data validation",
      "Streamlined member-management workflows",
      "Quality assurance and cross-browser testing",
    ],
    overview:
      "CLUBCANVA organizes the details behind a thriving membership community. Work spans API-connected interfaces, validated data entry, membership workflows, and QA to keep the experience consistent and dependable.",
  },
  {
    name: "ZUNOON",
    category: "LANGUAGE / TRANSLATION EXPERIENCE",
    description:
      "Less lost in translation. A friendly, interactive English-Spanish experience built around real-time communication.",
    technologies: ["JavaScript", "HTML", "CSS", "REST APIs"],
    accent: "#bed79f",
    year: "05",
    focus: [
      "An intuitive English-Spanish translation interface",
      "Clear real-time translation and input states",
      "A responsive, approachable user experience",
    ],
    overview:
      "ZUNOON makes moving between English and Spanish feel natural. A focused interface keeps the words at the center, with clear input and output areas and responsive interactions designed for everyday use.",
  },
  {
    name: "BYTECAPE",
    category: "WEB EXPERIENCE / INTERFACE DEVELOPMENT",
    description:
      "A playground for considered interfaces. Responsive layouts and interactive details, built with care from the ground up.",
    technologies: ["JavaScript", "HTML", "CSS"],
    accent: "#b1b5f4",
    year: "06",
    focus: [
      "Responsive, adaptable page layouts",
      "Polished interactive UI elements",
      "Semantic HTML and maintainable CSS",
    ],
    overview:
      "BYTECAPE is a responsive web experience focused on strong layout foundations and expressive interface details. It brings together semantic structure, adaptable styling, and interactions that feel coherent on every screen.",
  },
];

function ProjectPreview({ project }: { project: Project }) {
  const name = project.name;
  return (
    <div
      className={`project-preview preview-${name.toLowerCase()}`}
      aria-label={`Representative interface study for ${name}`}
      role="img"
    >
      <div className="preview-browser">
        <span />
        <span />
        <span />
        <div>
          <LockKeyhole size={7} /> {name.toLowerCase()} / interface study
        </div>
        <span className="preview-browser-plus">+</span>
      </div>
      {name === "UNISEEK" && (
        <div className="uniseek-preview">
          <div className="preview-nav">
            <strong>
              <GraduationCap size={15} /> uniseek<span>.</span>
            </strong>
            <span>Discover &nbsp;&nbsp; Mentorship &nbsp;&nbsp; Resources</span>
            <i>
              Get started <ArrowUpRight size={8} />
            </i>
          </div>
          <div className="uniseek-main">
            <span className="mini-eyebrow">BIG DREAMS. BRIGHTER FUTURES.</span>
            <h4>
              Your next chapter
              <br />
              starts <em>here.</em>
            </h4>
            <p>
              From where you are to where you want to be.
              <br />
              Your study-abroad journey, simplified.
            </p>
            <span className="mini-cta">
              Find your path <ArrowUpRight size={10} />
            </span>
            <div className="uniseek-photo">
              <img
                src="https://images.pexels.com/photos/35314982/pexels-photo-35314982.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
                alt=""
                loading="lazy"
              />
              <span>
                YOUR WORLD IS WAITING <Globe2 size={12} />
              </span>
            </div>
            <span className="uniseek-asterisk" aria-hidden="true">
              *
            </span>
          </div>
          <div className="uniseek-bottom">
            <span>
              <Users size={12} /> Find your mentor
            </span>
            <span>
              <FileText size={12} /> Prepare with confidence
            </span>
            <span>
              <Globe2 size={12} /> Explore the world
            </span>
          </div>
        </div>
      )}
      {name === "MEDIPUZZLE" && (
        <div className="medipuzzle-preview">
          <div className="preview-nav">
            <strong>
              <HeartPulse size={15} /> medipuzzle
            </strong>
            <span>Your journey &nbsp;&nbsp; Challenges</span>
            <i>My learning</i>
          </div>
          <div className="medical-main">
            <span className="mini-eyebrow">A NEW WAY TO KNOW MORE</span>
            <h4>
              Big concepts.
              <br />
              Small <em>aha!</em> moments.
            </h4>
            <p>
              Build your medical knowledge.
              <br />
              One challenge at a time.
            </p>
            <span className="mini-cta">
              Start a challenge <ArrowRight size={10} />
            </span>
            <div className="medical-puzzle">
              <span>+</span>
              <span>
                <HeartPulse size={36} />
              </span>
              <span>
                <Sparkles size={31} />
              </span>
              <span>?</span>
            </div>
          </div>
          <div className="medical-bottom">
            <span>01 &nbsp; DISCOVER</span>
            <span>02 &nbsp; PLAY</span>
            <span>03 &nbsp; UNDERSTAND</span>
          </div>
        </div>
      )}
      {name === "IHRTRACK" && (
        <div className="ihrtrack-preview">
          <aside>
            <strong>
              <Layers3 size={14} /> ihrtrack
            </strong>
            <span className="selected">Overview</span>
            <span>Attendance</span>
            <span>Team members</span>
            <span>Reports</span>
            <small>
              YOUR WORKPLACE,
              <br />
              CONNECTED.
            </small>
          </aside>
          <div className="hr-main">
            <div className="hr-top">
              <span>Workspace / Overview</span>
              <Search size={11} />
            </div>
            <h4>
              A good day to do
              <br />
              great work.
            </h4>
            <p>Here's what's happening with your team.</p>
            <div className="hr-stats">
              <span>
                Team members<b>48</b>
              </span>
              <span>
                Present today<b>45</b>
              </span>
              <span>
                Attendance<b>94%</b>
              </span>
            </div>
            <div className="hr-chart">
              <span>Workforce activity</span>
              <div>
                {[45, 70, 55, 80, 62, 95, 78, 88, 67, 93, 84, 98].map(
                  (height, i) => (
                    <i key={i} style={{ height: `${height}%` }} />
                  ),
                )}
              </div>
            </div>
            <small className="demo-data">ILLUSTRATIVE DATA</small>
          </div>
        </div>
      )}
      {name === "CLUBCANVA" && (
        <div className="club-preview">
          <div className="preview-nav">
            <strong>
              clubcanva<span>*</span>
            </strong>
            <span>Community &nbsp;&nbsp; Memberships &nbsp;&nbsp; Events</span>
            <i>My workspace</i>
          </div>
          <div className="club-main">
            <span className="mini-eyebrow">
              GOOD PEOPLE. GREAT POSSIBILITIES.
            </span>
            <h4>
              Less admin.
              <br />
              <em>More community.</em>
            </h4>
            <p>
              A little more connected.
              <br />A whole lot easier to manage.
            </p>
            <span className="mini-cta">
              Meet your community <ArrowUpRight size={10} />
            </span>
            <div className="member-stack">
              {["Alex Morgan", "Jamie Parker", "Sam Rivera"].map(
                (member, i) => (
                  <div key={member}>
                    <span>
                      {member
                        .split(" ")
                        .map((word) => word[0])
                        .join("")}
                    </span>
                    <strong>
                      {member}
                      <small>
                        {i === 0 ? "Community organizer" : "Active member"}
                      </small>
                    </strong>
                    <Check size={12} />
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      )}
      {name === "ZUNOON" && (
        <div className="zunoon-preview">
          <div className="preview-nav">
            <strong>
              <Globe2 size={15} /> zunoon
            </strong>
            <span>A world without language barriers</span>
            <i>EN / ES</i>
          </div>
          <div className="zunoon-main">
            <span className="mini-eyebrow">WORDS BRING US CLOSER.</span>
            <h4>
              Same meaning.
              <br />
              <em>New possibilities.</em>
            </h4>
            <div className="translation-ui">
              <div>
                <span>
                  English <ChevronRight size={9} />
                </span>
                <p>
                  Hello, world.
                  <br />
                  Let's build something.
                </p>
                <small>34 / 5000</small>
              </div>
              <ArrowRight size={15} />
              <div>
                <span>
                  Spanish <ChevronRight size={9} />
                </span>
                <p>
                  Hola, mundo.
                  <br />
                  Construyamos algo.
                </p>
                <small>TRANSLATION PREVIEW</small>
              </div>
            </div>
          </div>
        </div>
      )}
      {name === "BYTECAPE" && (
        <div className="bytecape-preview">
          <div className="preview-nav">
            <strong>
              BYTECAPE<span>_</span>
            </strong>
            <span>Explore &nbsp;&nbsp; Our approach &nbsp;&nbsp; Connect</span>
            <i>
              <ArrowUpRight size={12} />
            </i>
          </div>
          <div className="bytecape-main">
            <span className="mini-eyebrow">
              A LITTLE CURIOUS. A LOT OF CODE.
            </span>
            <h4>
              Ideas into
              <br />
              <em>interfaces.</em>
            </h4>
            <p>
              Digital experiences that look closer,
              <br />
              think deeper, and work better.
            </p>
            <span className="mini-cta">
              Enter the experience <ArrowUpRight size={10} />
            </span>
            <div className="bytecape-art">
              <Code2 size={55} strokeWidth={0.7} />
            </div>
          </div>
          <div className="bytecape-bottom">
            <span>DESIGN / DEVELOP / EXPLORE</span>
            <span>
              SCROLL TO DISCOVER <ArrowDown size={9} />
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function ProjectDialog({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [tab, setTab] = useState("Overview");
  useEffect(() => {
    const element = dialog.current;
    const returnFocus = document.activeElement as HTMLElement | null;
    element?.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      element?.close();
      document.body.style.overflow = overflow;
      returnFocus?.focus({ preventScroll: true });
    };
  }, []);

  return (
    <dialog
      ref={dialog}
      className="project-dialog"
      data-lenis-prevent
      aria-labelledby="project-dialog-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="dialog-inner"
        style={{ "--project-accent": project.accent } as CSSProperties}
      >
        <div className="dialog-topline">
          <span>PROJECT LAB / MODULE {project.year}</span>
          <button
            type="button"
            className="icon-button"
            onClick={onClose}
            aria-label="Close project details"
            autoFocus
          >
            <X size={20} />
          </button>
        </div>
        <span className="eyebrow">{project.category}</span>
        <h2 id="project-dialog-title">
          {project.name}
          <span>.</span>
        </h2>
        <div className="dialog-preview">
          <ProjectPreview project={project} />
        </div>
        <p className="preview-note">
          Representative interface study, not a screenshot of the live product.
        </p>
        <div
          className="dialog-tabs"
          role="tablist"
          aria-label="Project information"
        >
          {["Overview", "Technical focus"].map((label) => (
            <button
              key={label}
              type="button"
              role="tab"
              id={`project-tab-${label === "Overview" ? "overview" : "technical"}`}
              aria-controls="project-tab-panel"
              aria-selected={tab === label}
              className={tab === label ? "is-active" : ""}
              onClick={() => setTab(label)}
              onKeyDown={(event) => {
                if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                  event.preventDefault();
                  setTab(label === "Overview" ? "Technical focus" : "Overview");
                  const sibling =
                    label === "Overview"
                      ? event.currentTarget.nextElementSibling
                      : event.currentTarget.previousElementSibling;
                  (sibling as HTMLButtonElement)?.focus();
                }
              }}
            >
              {label}
            </button>
          ))}
        </div>
        <div
          id="project-tab-panel"
          role="tabpanel"
          aria-labelledby={`project-tab-${tab === "Overview" ? "overview" : "technical"}`}
          className="dialog-tab-content"
        >
          {tab === "Overview" ? (
            <p>{project.overview}</p>
          ) : (
            <ul>
              {project.focus.map((item) => (
                <li key={item}>
                  <Check size={15} />
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="dialog-tech">
          <span>TOOLKIT</span>
          {project.technologies.join(" / ")}
        </div>
        <div className="dialog-actions">
          <a
            className="button button-primary"
            href={`mailto:magarjoel8@gmail.com?subject=${encodeURIComponent(`I'd love a walkthrough of ${project.name}`)}`}
          >
            <Mail size={15} /> Request a walkthrough <ArrowUpRight size={16} />
          </a>
          <span>
            Live links and source access
            <br />
            available on request.
          </span>
        </div>
      </div>
    </dialog>
  );
}

export default function ProjectLab({
  reducedMotion,
  scrollTo,
}: {
  reducedMotion: boolean;
  scrollTo: (position: number) => void;
}) {
  const section = useRef<HTMLElement>(null);
  const transition = useRef<HTMLDivElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const [selected, setSelected] = useState(0);
  const [dialogProject, setDialogProject] = useState<Project | null>(null);
  const compact = useMedia("(max-width: 900px), (max-height: 680px)");
  const project = projects[selected];

  useEffect(() => {
    if (compact || reducedMotion || !section.current) return;
    trigger.current = ScrollTrigger.create({
      trigger: section.current,
      start: "top top+=88",
      end: "bottom bottom",
      onUpdate: (self) =>
        setSelected(
          Math.min(
            projects.length - 1,
            Math.floor(self.progress * projects.length),
          ),
        ),
    });
    return () => {
      trigger.current?.kill();
      trigger.current = null;
    };
  }, [compact, reducedMotion]);

  useLayoutEffect(() => {
    if (reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-copy",
        { autoAlpha: 0.2, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.55, ease: "power2.out" },
      );
      gsap.fromTo(
        ".project-device",
        { autoAlpha: 0.1, x: 35, rotateY: -15, rotateX: 7 },
        {
          autoAlpha: 1,
          x: 0,
          rotateY: -9,
          rotateX: 5,
          duration: 0.85,
          ease: "power3.out",
        },
      );
    }, transition);
    return () => ctx.revert();
  }, [selected, reducedMotion]);

  const goTo = (index: number) => {
    const next = (index + projects.length) % projects.length;
    setSelected(next);
    if (trigger.current && !compact && !reducedMotion) {
      scrollTo(
        trigger.current.start +
          ((next + 0.12) / projects.length) *
            (trigger.current.end - trigger.current.start),
      );
    }
  };

  return (
    <>
      <section
        ref={section}
        id="projects"
        className={`section projects-section ${compact || reducedMotion ? "projects-unpinned" : ""}`}
      >
        <div className="project-sticky section-shell">
          <SectionLabel
            number="04"
            meta="REAL CHALLENGES. THOUGHTFUL SOLUTIONS."
          >
            PROJECT LAB
          </SectionLabel>
          <div className="project-section-heading reveal">
            <h2>Ideas. Engineered.</h2>
            <p>A selection of things I've helped bring to life.</p>
          </div>
          <div
            ref={transition}
            className="project-stage"
            style={{ "--project-accent": project.accent } as CSSProperties}
          >
            <div className="project-copy" aria-live="polite" aria-atomic="true">
              <span className="project-category">
                <span className="status-dot" />
                {project.category}
              </span>
              <h3>
                {project.name}
                <span>.</span>
              </h3>
              <p>{project.description}</p>
              <div className="project-technologies">
                {project.technologies.map((technology, index) => (
                  <span key={technology}>
                    {index > 0 && <i>/</i>}
                    {technology}
                  </span>
                ))}
              </div>
              <div className="project-actions">
                <button
                  type="button"
                  className="button button-primary"
                  data-magnetic
                  onClick={() => setDialogProject(project)}
                >
                  View project <ArrowUpRight size={16} />
                </button>
                <a
                  href={`mailto:magarjoel8@gmail.com?subject=${encodeURIComponent(`Source access request: ${project.name}`)}`}
                  className="source-link"
                  title="Request access to this project's source"
                >
                  <Code2 size={16} />
                  <span>Request source</span>
                </a>
              </div>
              <div className="project-stepper">
                <span>
                  {String(selected + 1).padStart(2, "0")} <i>/ 06</i>
                </span>
                <div>
                  <button
                    type="button"
                    className="icon-button"
                    aria-label="Previous project"
                    onClick={() => goTo(selected - 1)}
                  >
                    <ArrowLeft size={17} />
                  </button>
                  <button
                    type="button"
                    className="icon-button"
                    aria-label="Next project"
                    onClick={() => goTo(selected + 1)}
                  >
                    <ArrowRight size={17} />
                  </button>
                </div>
              </div>
            </div>
            <div className="project-visual">
              <div className="project-halo" aria-hidden="true" />
              <div className="project-floor" aria-hidden="true" />
              <button
                type="button"
                className="project-device"
                onClick={() => setDialogProject(project)}
                aria-label={`Explore ${project.name}`}
              >
                <span className="device-camera" />
                <ProjectPreview project={project} />
                <span className="device-bottom">
                  <span />
                  DIGITAL FORGE / PROJECT MODULE {project.year}
                </span>
              </button>
              <span className="project-visual-caption">
                <span>INTERFACE STUDY / {project.year}</span>
                <span>
                  CLICK TO EXPLORE <ArrowUpRight size={12} />
                </span>
              </span>
            </div>
          </div>
          <div
            className="project-selector"
            role="group"
            aria-label="Select a project"
          >
            {projects.map((item, index) => (
              <button
                key={item.name}
                type="button"
                className={selected === index ? "is-active" : ""}
                aria-pressed={selected === index}
                onClick={() => goTo(index)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item.name}
                <ArrowUpRight size={13} />
              </button>
            ))}
          </div>
          <p className="project-scroll-hint">
            {compact || reducedMotion
              ? "USE THE CONTROLS TO EXPLORE THE LAB"
              : "KEEP SCROLLING TO EXPLORE THE LAB"}
            <ArrowDown size={11} />
          </p>
        </div>
      </section>
      {dialogProject && (
        <ProjectDialog
          project={dialogProject}
          onClose={() => setDialogProject(null)}
        />
      )}
    </>
  );
}
