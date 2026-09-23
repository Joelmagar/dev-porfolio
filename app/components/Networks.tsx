"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent } from "react";
import {
  ArrowUpRight,
  Atom,
  Braces,
  Code2,
  Database,
  Gauge,
  GitBranch,
  GitFork,
  Layers3,
  Monitor,
  Network,
  Palette,
  PanelsTopLeft,
  Puzzle,
  Smartphone,
  Users,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionLabel } from "./Interface";

interface GraphNode {
  name: string;
  icon: LucideIcon;
  x: number;
  y: number;
  description: string;
  category?: string;
}

const architecture: GraphNode[] = [
  {
    name: "React",
    icon: Atom,
    x: 47,
    y: 46,
    description:
      "Reusable components, predictable state, and interfaces that feel effortless to use.",
  },
  {
    name: "Next.js",
    icon: Layers3,
    x: 74,
    y: 20,
    description:
      "Thoughtful routing and rendering strategies that turn a React interface into a complete web experience.",
  },
  {
    name: "JavaScript",
    icon: Braces,
    x: 21,
    y: 19,
    description:
      "The logic behind the experience: clean, maintainable JavaScript and reliable interaction patterns.",
  },
  {
    name: "HTML",
    icon: Code2,
    x: 16,
    y: 53,
    description:
      "Semantic structure that makes every page understandable, accessible, and resilient.",
  },
  {
    name: "CSS",
    icon: Palette,
    x: 31,
    y: 82,
    description:
      "Responsive layouts, precise visual details, and purposeful motion across screen sizes.",
  },
  {
    name: "REST APIs",
    icon: Database,
    x: 83,
    y: 54,
    description:
      "Reliable API integrations, clear loading states, data validation, and thoughtful error handling.",
  },
  {
    name: "UI/UX",
    icon: PanelsTopLeft,
    x: 57,
    y: 12,
    description:
      "Clean visual systems and intuitive user journeys built around real people and their goals.",
  },
  {
    name: "Performance",
    icon: Gauge,
    x: 65,
    y: 81,
    description:
      "Less waiting, smoother interactions, and careful attention to how every asset reaches the browser.",
  },
  {
    name: "Responsive",
    icon: Smartphone,
    x: 89,
    y: 84,
    description:
      "Interfaces that adapt naturally, with cross-browser testing and accessibility built into the process.",
  },
];

const skills: GraphNode[] = [
  {
    name: "React.js",
    icon: Atom,
    x: 31,
    y: 42,
    category: "Frontend",
    description:
      "Component-driven interfaces, hooks, state management, and reusable design systems.",
  },
  {
    name: "Next.js",
    icon: Layers3,
    x: 53,
    y: 20,
    category: "Frontend",
    description:
      "File-based routing, server rendering, and fast, production-ready React applications.",
  },
  {
    name: "JavaScript",
    icon: Braces,
    x: 72,
    y: 43,
    category: "Frontend",
    description:
      "Modern ES6+, asynchronous data flows, and thoughtful interactions that bring an interface to life.",
  },
  {
    name: "HTML",
    icon: Code2,
    x: 15,
    y: 76,
    category: "Frontend",
    description:
      "Accessible, semantic document structure that gives every experience a solid foundation.",
  },
  {
    name: "CSS",
    icon: Palette,
    x: 48,
    y: 76,
    category: "Frontend",
    description:
      "Fluid layouts, precise styling, responsive systems, and expressive, purposeful animation.",
  },
  {
    name: "GSAP",
    icon: Zap,
    x: 89,
    y: 74,
    category: "Frontend",
    description:
      "Scroll-linked storytelling, coordinated timelines, and smooth, performance-minded animation.",
  },
  {
    name: "Git",
    icon: GitBranch,
    x: 11,
    y: 23,
    category: "Tools",
    description:
      "Clear version history, feature branches, and dependable collaboration across a shared codebase.",
  },
  {
    name: "GitHub",
    icon: GitFork,
    x: 35,
    y: 11,
    category: "Tools",
    description:
      "Pull requests, constructive code reviews, and a transparent development workflow.",
  },
  {
    name: "NeoVim",
    icon: Code2,
    x: 91,
    y: 18,
    category: "Tools",
    description:
      "A focused development environment for building, debugging, and refining frontend experiences.",
  },
  {
    name: "Chrome DevTools",
    icon: Monitor,
    x: 70,
    y: 82,
    category: "Tools",
    description:
      "Profiling performance, inspecting layouts, debugging requests, and checking responsive behavior.",
  },
  {
    name: "Problem Solving",
    icon: Puzzle,
    x: 9,
    y: 50,
    category: "Human",
    description:
      "Breaking complex challenges into clear steps and finding practical, maintainable solutions.",
  },
  {
    name: "Team Collaboration",
    icon: Users,
    x: 61,
    y: 53,
    category: "Human",
    description:
      "Communicating clearly, sharing context, and building better software together in an agile team.",
  },
];

const skillLinks = [
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [0, 7],
  [0, 10],
  [0, 11],
  [1, 2],
  [1, 7],
  [1, 8],
  [2, 5],
  [2, 8],
  [2, 9],
  [3, 4],
  [3, 6],
  [4, 5],
  [4, 9],
  [5, 9],
  [6, 7],
  [6, 10],
  [7, 11],
  [9, 11],
];

function NetworkLines({
  nodes,
  links,
  active,
  className = "",
}: {
  nodes: GraphNode[];
  links: number[][];
  active: number;
  className?: string;
}) {
  return (
    <svg
      className={`network-lines ${className}`}
      viewBox="0 0 1000 500"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {links.map(([from, to]) => {
        const a = nodes[from];
        const b = nodes[to];
        const highlighted = from === active || to === active;
        return (
          <g
            key={`${from}-${to}`}
            className={highlighted ? "connection is-lit" : "connection"}
          >
            <path
              d={`M${a.x * 10},${a.y * 5} L${b.x * 10},${b.y * 5}`}
              className="connection-track"
            />
            {highlighted && (
              <path
                d={`M${a.x * 10},${a.y * 5} L${b.x * 10},${b.y * 5}`}
                className="connection-flow"
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}

function handleTilt(event: PointerEvent<HTMLElement>, reducedMotion: boolean) {
  if (reducedMotion || event.pointerType === "touch") return;
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty(
    "--rx",
    `${((event.clientY - rect.top - rect.height / 2) / rect.height) * -5}deg`,
  );
  event.currentTarget.style.setProperty(
    "--ry",
    `${((event.clientX - rect.left - rect.width / 2) / rect.width) * 7}deg`,
  );
}

export function About({ reducedMotion }: { reducedMotion: boolean }) {
  const [active, setActive] = useState(0);
  const section = useRef<HTMLElement>(null);
  const activeNode = architecture[active];
  const Icon = activeNode.icon;

  useEffect(() => {
    if (reducedMotion) return;
    const trigger = ScrollTrigger.create({
      trigger: section.current,
      start: "top 50%",
      end: "bottom 55%",
      onUpdate: (self) => {
        setActive(
          Math.min(
            architecture.length - 1,
            Math.floor(self.progress * architecture.length),
          ),
        );
        section.current?.style.setProperty(
          "--architecture-depth",
          `${self.progress * 35 - 12}px`,
        );
      },
    });
    return () => {
      trigger.kill();
      section.current?.style.removeProperty("--architecture-depth");
    };
  }, [reducedMotion]);

  return (
    <section ref={section} id="about" className="section about-section">
      <div className="section-shell">
        <SectionLabel number="02" meta="THE THINKING BEHIND THE INTERFACE">
          SYSTEM ARCHITECTURE
        </SectionLabel>
        <div className="section-heading reveal">
          <h2>
            Good interfaces.
            <br />
            <span className="muted-heading">Solid foundations.</span>
          </h2>
          <p>
            I connect thoughtful design with clean engineering.
            <br className="desktop-break" /> Every part has a purpose. Every
            detail matters.
          </p>
        </div>
        <div className="architecture-layout">
          <div
            className="architecture-stage"
            onPointerMove={(event) => handleTilt(event, reducedMotion)}
            onPointerLeave={(event) => {
              event.currentTarget.style.setProperty("--rx", "0deg");
              event.currentTarget.style.setProperty("--ry", "0deg");
            }}
          >
            <div className="architecture-grid" aria-hidden="true" />
            <div className="architecture-plane">
              <NetworkLines
                nodes={architecture}
                links={architecture.slice(1).map((_, i) => [0, i + 1])}
                active={active}
              />
              {architecture.map((node, i) => {
                const NodeIcon = node.icon;
                return (
                  <button
                    key={node.name}
                    type="button"
                    className={`architecture-node ${active === i ? "is-active" : ""} ${i === 0 ? "is-central" : ""}`}
                    style={
                      {
                        left: `${node.x}%`,
                        top: `${node.y}%`,
                        "--node-delay": `${i * -0.7}s`,
                      } as CSSProperties
                    }
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-pressed={active === i}
                    aria-label={
                      node.name === "Responsive"
                        ? "Responsive Design"
                        : node.name
                    }
                  >
                    <span className="node-cube">
                      <span />
                      <NodeIcon size={i === 0 ? 29 : 23} strokeWidth={1.3} />
                    </span>
                    <span className="node-name">{node.name}</span>
                  </button>
                );
              })}
            </div>
            <span className="diagram-caption">
              <span className="status-dot" /> AN INTERCONNECTED APPROACH{" "}
              <span className="diagram-hint">HOVER TO EXPLORE</span>
            </span>
          </div>
          <div className="architecture-info glass-panel">
            <div className="panel-topline">
              <Network size={14} />
              <span>THE DEVELOPER BEHIND THE SYSTEM</span>
              <span className="tiny-cross">+</span>
            </div>
            <h3>
              Built by Joel.
              <br />
              Built for people.
            </h3>
            <p>
              Frontend Developer with <strong>1.5+ years of experience</strong>{" "}
              building responsive, user-focused web applications.
            </p>
            <p className="about-detail">
              From API integration to the last responsive breakpoint, I care
              about the whole experience. Clean UI/UX, cross-browser
              compatibility, performance optimization, and team collaboration
              are part of every build.
            </p>
            <div
              className="architecture-readout"
              aria-live="polite"
              aria-atomic="true"
            >
              <span className="readout-label">
                <Icon size={15} />
                {activeNode.name === "Responsive"
                  ? "Responsive Design"
                  : activeNode.name}
                <span>MODULE_{String(active + 1).padStart(2, "0")}</span>
              </span>
              <p>{activeNode.description}</p>
            </div>
            <a className="text-link" href="#experience">
              Follow the journey <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Skills({ reducedMotion }: { reducedMotion: boolean }) {
  const [filter, setFilter] = useState("All systems");
  const [active, setActive] = useState(0);
  const field = useRef<HTMLDivElement>(null);
  const activeNode = skills[active];
  const visibleCount =
    filter === "All systems"
      ? skills.length
      : skills.filter((node) => node.category === filter).length;

  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || event.pointerType === "touch" || !field.current)
      return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    field.current
      .querySelectorAll<HTMLElement>(".skill-node")
      .forEach((node, index) => {
        const dx = x - (skills[index].x / 100) * bounds.width;
        const dy = y - (skills[index].y / 100) * bounds.height;
        const distance = Math.hypot(dx, dy);
        const attraction = Math.max(0, 1 - distance / 210) * 0.055;
        node.style.setProperty("--gravity-x", `${dx * attraction}px`);
        node.style.setProperty("--gravity-y", `${dy * attraction}px`);
      });
  };

  const selectFilter = (value: string) => {
    setFilter(value);
    if (value !== "All systems")
      setActive(skills.findIndex((node) => node.category === value));
  };

  return (
    <section id="skills" className="section skills-section">
      <div className="section-shell">
        <SectionLabel number="03" meta="CONNECTED, NOT COLLECTED">
          SKILL MATRIX
        </SectionLabel>
        <div className="section-heading reveal">
          <h2>
            The tools.
            <br />
            <span className="muted-heading">The possibilities.</span>
          </h2>
          <p>
            A connected toolkit for bringing ideas to life.
            <br />
            Select a node. Explore the connections.
          </p>
        </div>
        <div className="skill-toolbar">
          <div
            className="skill-filters"
            role="group"
            aria-label="Filter skills"
          >
            {["All systems", "Frontend", "Tools", "Human"].map((label) => (
              <button
                key={label}
                type="button"
                className={filter === label ? "is-active" : ""}
                onClick={() => selectFilter(label)}
                aria-pressed={filter === label}
              >
                {label}
              </button>
            ))}
          </div>
          <span className="matrix-count">
            {String(visibleCount).padStart(2, "0")} NODES ONLINE
            <span className="status-dot" />
          </span>
        </div>
        <div
          ref={field}
          className="skill-field"
          onPointerMove={move}
          onPointerLeave={() =>
            field.current
              ?.querySelectorAll<HTMLElement>(".skill-node")
              .forEach((node) => {
                node.style.setProperty("--gravity-x", "0px");
                node.style.setProperty("--gravity-y", "0px");
              })
          }
        >
          <div className="skill-grid" aria-hidden="true" />
          <NetworkLines nodes={skills} links={skillLinks} active={active} />
          {skills.map((node, i) => {
            const Icon = node.icon;
            const dimmed = filter !== "All systems" && filter !== node.category;
            const connected = skillLinks.some(
              ([a, b]) =>
                (a === active && b === i) || (b === active && a === i),
            );
            return (
              <button
                key={node.name}
                type="button"
                className={`skill-node ${active === i ? "is-active" : ""} ${dimmed ? "is-dim" : ""} ${connected ? "is-connected" : ""} ${i < 3 ? "is-primary" : ""}`}
                style={
                  {
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    "--node-delay": `${i * -0.38}s`,
                  } as CSSProperties
                }
                disabled={dimmed}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-pressed={active === i}
                aria-describedby={
                  active === i ? "skill-description" : undefined
                }
              >
                <span className="skill-orbit">
                  <Icon size={i < 3 ? 29 : 22} strokeWidth={1.25} />
                  <span className="node-spark" />
                </span>
                <span className="skill-name">{node.name}</span>
                <span className="skill-node-id">
                  {node.category?.toUpperCase()} /{" "}
                  {String(i + 1).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </div>
        <div className="skill-readout" aria-live="polite" aria-atomic="true">
          <span className="readout-index">
            [{String(active + 1).padStart(2, "0")}]
          </span>
          <h3>{activeNode.name}</h3>
          <p id="skill-description">{activeNode.description}</p>
          <span className="readout-status">
            <span className="status-dot" /> SYSTEM READY
          </span>
        </div>
      </div>
    </section>
  );
}
