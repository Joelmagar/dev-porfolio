"use client";
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Check,
  CheckCheck,
  Copy,
  ExternalLink,
  GitBranch,
  Globe2,
  LockKeyhole,
  Send,
  Terminal,
} from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ForgeMark, SectionLabel } from "./Interface";
import Scene from "./Scene";

const experience = [
  {
    title: "The first commit ",
    company: "Ayata Inc.",
    role: "Frontend Development Intern",
    period: "Jun 2024 - Aug 2024",
    label: "THE FOUNDATION",
    summary:
      "Turning the fundamentals into real-world experience, one component, review, and release at a time.",
    tasks: [
      "React and JavaScript development",
      "Building responsive interfaces",
      "REST API integration",
      "Cross-browser compatibility",
      "Learning through code reviews",
      "Agile team collaboration",
    ],
  },
  {
    title: "Building forward ",
    company: "Ayata Inc.",
    role: "Frontend Developer",
    period: "Aug 2024 - June 2026",
    label: "THE NEXT ITERATION",
    summary:
      "Building thoughtful, production-ready web experiences with a collaborative team and a detail-first mindset.",
    tasks: [
      "Building interactive web applications",
      "React and JavaScript development",
      "REST API integration",
      "Responsive design",
      "Cross-browser compatibility",
      "Performance and accessibility improvements",
      "Code reviews",
      "Agile team collaboration",
    ],
  },
  {
    title: "Continuing Journey ",
    company: "Prepx",
    role: "Frontend Developer",
    period: "June 2026 - Present",
    label: "THE NEW BEGINNING",
    summary:
      "Building thoughtful, production-ready web experiences with a collaborative team and a detail-first mindset.",
    tasks: [
      "Building interactive web applications",
      "React and JavaScript development",
      "REST API integration",
      "Responsive design",
      "Cross-browser compatibility",
      "Performance and accessibility improvements",
      "Code reviews",
      "Agile team collaboration",
    ],
  },
];

export function Experience({ reducedMotion }: { reducedMotion: boolean }) {
  const [active, setActive] = useState(1);
  const section = useRef<HTMLElement>(null);
  const current = experience[active];
  useEffect(() => {
    if (reducedMotion) return;
    const trigger = ScrollTrigger.create({
      trigger: section.current,
      start: "top 75%",
      end: "center 45%",
      onUpdate: (self) => setActive(self.progress > 0.5 ? 1 : 0),
    });
    return () => trigger.kill();
  }, [reducedMotion]);

  return (
    <section
      ref={section}
      id="experience"
      className="section experience-section"
    >
      <div className="section-shell">
        <SectionLabel number="05" meta="ALWAYS BUILDING. ALWAYS EVOLVING.">
          DEVELOPMENT PIPELINE
        </SectionLabel>
        <div className="section-heading reveal">
          <h2>
            Better with
            <br />
            <span className="muted-heading">every build.</span>
          </h2>
          <p>
            Real teams. Real challenges.
            <br />A continuous journey of learning and making.
          </p>
        </div>
        <div className="experience-layout">
          <div className="experience-timeline">
            <span className="timeline-coordinate">
              CAREER_TRAJECTORY / LIVE
            </span>
            <svg
              viewBox="0 0 550 370"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="timeline-fade" x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0%" stopColor="#577268" stopOpacity=".1" />
                  <stop offset="100%" stopColor="#a5ecd6" stopOpacity=".6" />
                </linearGradient>
              </defs>
              <path
                d="M10 332 535 60"
                stroke="url(#timeline-fade)"
                fill="none"
              />
              <path
                d="M10 332 535 60"
                className="timeline-stream"
                fill="none"
              />
              <path
                d="M10 357 535 85M10 307 535 35"
                stroke="#a5ecd6"
                strokeOpacity=".06"
                fill="none"
              />
            </svg>
            {experience.map((item, i) => (
              <button
                key={item.role}
                type="button"
                className={`timeline-checkpoint checkpoint-${i} ${active === i ? "is-active" : ""}`}
                aria-pressed={active === i}
                onClick={() => setActive(i)}
              >
                <span className="checkpoint-dot">
                  <span />
                </span>
                <span className="checkpoint-copy">
                  <small>{i === 0 ? "JUN 2024" : "AUG 2024 - NOW"}</small>
                  <strong>{item.title} </strong>
                  <span>
                    {item.role}
                    <ArrowUpRight size={12} />
                  </span>
                </span>
              </button>
            ))}
            <span className="timeline-year" aria-hidden="true">
              2024<span> / ONWARD</span>
            </span>
          </div>
          <div
            className="experience-panel glass-panel"
            aria-live="polite"
            aria-atomic="true"
          >
            <div className="panel-topline">
              <GitBranch size={14} />
              <span>{current.label}</span>
              <span className="experience-current">
                {active === 1 ? (
                  <>
                    <span className="status-dot" /> CURRENT
                  </>
                ) : (
                  "COMPLETED"
                )}
              </span>
            </div>
            <span className="experience-period">{current.period}</span>
            <h3>{current.role}</h3>
            <span className="experience-company">
              {current.company}
              <ArrowUpRight size={13} />
            </span>
            <p>{current.summary}</p>
            <ul className="responsibility-list">
              {current.tasks.map((task) => (
                <li key={task}>
                  <span>+</span>
                  {task}
                </li>
              ))}
            </ul>
            <div className="experience-panel-footer">
              <span>LEARN. BUILD. REFINE. REPEAT.</span>
              <span>0{active + 1} / 02</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const stages = [
  {
    name: "IDEA",
    subtitle: "Start with the why.",
    description:
      "Understand the people, define the problem, and find the outcome worth building for.",
    code: "discover(problem, people)",
  },
  {
    name: "DESIGN",
    subtitle: "Make the complex clear.",
    description:
      "Map the journey, shape the visual system, and make every interaction feel natural.",
    code: "design(intent, experience)",
  },
  {
    name: "DEVELOP",
    subtitle: "Build on good foundations.",
    description:
      "Turn the design into clean, reusable components with semantic structure and responsive layouts.",
    code: "build(components, interfaces)",
  },
  {
    name: "INTEGRATE",
    subtitle: "Connect the moving parts.",
    description:
      "Bring APIs, data, and application state together with dependable validation and clear feedback.",
    code: "connect(data, experience)",
  },
  {
    name: "OPTIMIZE",
    subtitle: "Refine the details.",
    description:
      "Test accessibility, profile performance, and polish the experience across browsers and screen sizes.",
    code: "refine(speed, accessibility)",
  },
  {
    name: "DEPLOY",
    subtitle: "Ship. Learn. Improve.",
    description:
      "Run the final checks, deliver with confidence, and keep listening to make the next iteration better.",
    code: "deploy(quality, confidence)",
  },
];

export function Process({ reducedMotion }: { reducedMotion: boolean }) {
  const [active, setActive] = useState(0);
  const section = useRef<HTMLElement>(null);
  useEffect(() => {
    if (reducedMotion) return;
    const trigger = ScrollTrigger.create({
      trigger: section.current,
      start: "top 65%",
      end: "bottom 65%",
      onUpdate: (self) => setActive(Math.min(5, Math.floor(self.progress * 6))),
    });
    return () => trigger.kill();
  }, [reducedMotion]);

  return (
    <section ref={section} id="process" className="section process-section">
      <div className="section-shell">
        <SectionLabel number="06" meta="A PROCESS, NOT A GUESS">
          THE BUILD PROCESS
        </SectionLabel>
        <div className="section-heading reveal">
          <h2>
            From the first spark.
            <br />
            <span className="muted-heading">To the final deploy.</span>
          </h2>
          <p>
            Good work doesn't happen by accident.
            <br />
            Here's how I get from what if to what's next.
          </p>
        </div>
        <div className="build-pipeline">
          <div className="pipeline-objects">
            <Scene
              mode="pipeline"
              reducedMotion={reducedMotion}
              active={active}
            />
            <div className="pipeline-fallback" aria-hidden="true">
              {stages.map((stage, i) => (
                <span
                  key={stage.name}
                  className={i === active ? "is-active" : ""}
                >
                  <i />
                </span>
              ))}
            </div>
          </div>
          <div className="pipeline-track" aria-hidden="true">
            <span style={{ width: `${(active / 5) * 100}%` }} />
            <i style={{ left: `${(active / 5) * 100}%` }} />
          </div>
          <ol className="pipeline-stages">
            {stages.map((stage, i) => (
              <li key={stage.name}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className={
                    active === i ? "is-active" : i < active ? "is-complete" : ""
                  }
                  aria-pressed={active === i}
                >
                  <span className="pipeline-number">
                    {i < active ? <Check size={11} /> : `0${i + 1}`}
                  </span>
                  <span>{stage.name}</span>
                  <ArrowRight size={12} />
                </button>
              </li>
            ))}
          </ol>
        </div>
        <div className="process-readout" aria-live="polite" aria-atomic="true">
          <div>
            <span className="eyebrow">PHASE 0{active + 1} / 06</span>
            <h3>{stages[active].subtitle}</h3>
          </div>
          <p>{stages[active].description}</p>
          <code>
            <span>&gt; </span>
            {stages[active].code}
            <i />
          </code>
        </div>
      </div>
    </section>
  );
}

function SocialMark({ kind }: { kind: "github" | "linkedin" }) {
  return kind === "github" ? (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width="16"
      height="16"
      aria-hidden="true"
    >
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.86c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.82.09-.65.35-1.08.64-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.03A9.58 9.58 0 0 1 12 6.84c.85 0 1.7.11 2.5.34 1.91-1.3 2.75-1.03 2.75-1.03.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  ) : (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width="16"
      height="16"
      aria-hidden="true"
    >
      <path d="M5.4 7.5a2.1 2.1 0 1 0 0-4.2 2.1 2.1 0 0 0 0 4.2ZM3.6 9H7v12H3.6V9Zm5.7 0h3.3v1.6h.1c.5-.9 1.6-1.9 3.3-1.9 3.6 0 4.3 2.4 4.3 5.4V21h-3.4v-6.1c0-1.5 0-3.3-2-3.3s-2.2 1.6-2.2 3.2V21H9.3V9Z" />
    </svg>
  );
}

export function Contact({ reducedMotion }: { reducedMotion: boolean }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "routing" | "draft">("idle");
  const [feedback, setFeedback] = useState("");
  const [copied, setCopied] = useState(false);
  const [messageCopied, setMessageCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const messageBody = `Hi Joel,\n\n${form.message.trim()}\n\nBest,\n${form.name.trim()}\n${form.email.trim()}`;
  const mailto = `mailto:magarjoel8@gmail.com?subject=${encodeURIComponent(`Let's build something - ${form.name.trim()}`)}&body=${encodeURIComponent(messageBody)}`;

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
      if (copyTimer.current) clearTimeout(copyTimer.current);
    },
    [],
  );

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name.trim() || !form.message.trim()) {
      setFeedback("Please add your name and a message before connecting.");
      return;
    }
    setFeedback("");
    setStatus("routing");
    window.location.href = mailto;
    timer.current = setTimeout(
      () => setStatus("draft"),
      reducedMotion ? 0 : 1400,
    );
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("magarjoel8@gmail.com");
      setCopied(true);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2200);
    } catch {
      setFeedback(
        "You can copy the email address directly: magarjoel8@gmail.com",
      );
    }
  };

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(messageBody);
      setMessageCopied(true);
    } catch {
      setFeedback(
        "Clipboard access is unavailable. Please copy your message from the form.",
      );
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="section-shell">
        <SectionLabel number="07" meta="A GOOD CONVERSATION IS A GOOD START">
          CONNECTION HUB
        </SectionLabel>
        <div className="contact-layout">
          <div className="contact-copy">
            <span className="contact-availability">
              <span className="status-dot" /> OPEN FOR THE NEXT CHAPTER
            </span>
            <h2 className="reveal">
              LET'S BUILD
              <br />
              <span>SOMETHING.</span>
              <ArrowUpRight aria-hidden="true" />
            </h2>
            <p>
              I'm open to interesting frontend projects,
              <br className="desktop-break" /> collaborations, and
              opportunities.
            </p>
            <div className="email-link">
              <a href="mailto:magarjoel8@gmail.com">magarjoel8@gmail.com</a>
              <button
                type="button"
                className="icon-button"
                onClick={copyEmail}
                aria-label={
                  copied ? "Email address copied" : "Copy email address"
                }
                title={copied ? "Copied!" : "Copy email"}
              >
                {copied ? <CheckCheck size={16} /> : <Copy size={16} />}
              </button>
              <span className="copy-feedback" role="status">
                {copied ? "COPIED" : ""}
              </span>
            </div>
            <div className="social-links">
              <a
                href="https://joelmagar.com.np"
                target="_blank"
                rel="noreferrer"
              >
                <Globe2 size={15} /> Portfolio <ArrowUpRight size={12} />
              </a>
              <a
                href="https://github.com/search?q=Joel+Magar&type=users"
                target="_blank"
                rel="noreferrer"
                title="Find Joel Magar on GitHub"
              >
                <SocialMark kind="github" /> GitHub <ArrowUpRight size={12} />
              </a>
              <a
                href="https://www.linkedin.com/search/results/people/?keywords=Joel%20Magar"
                target="_blank"
                rel="noreferrer"
                title="Find Joel Magar on LinkedIn"
              >
                <SocialMark kind="linkedin" /> LinkedIn{" "}
                <ArrowUpRight size={12} />
              </a>
            </div>
            <div
              className={`connection-art ${status === "routing" ? "is-transmitting" : ""}`}
            >
              <Scene
                mode="connection"
                reducedMotion={reducedMotion}
                transmitting={status === "routing"}
              />
              <span className="connection-art-caption">
                <span className="status-dot" />{" "}
                {status === "routing"
                  ? "ROUTING TO YOUR EMAIL CLIENT"
                  : "READY WHEN YOU ARE"}
              </span>
            </div>
          </div>
          <form
            className={`contact-terminal glass-panel ${status === "routing" ? "is-transmitting" : ""}`}
            onSubmit={submit}
          >
            <div className="panel-topline">
              <Terminal size={15} />
              <span>NEW_CONNECTION</span>
              <span className="terminal-indicator">
                <span className="status-dot" /> ONLINE
              </span>
            </div>
            <div className="terminal-heading">
              <h3>Good things start with hello.</h3>
              <p>Have something in mind? Let's talk.</p>
            </div>
            <div className="form-field">
              <label htmlFor="contact-name">
                <span>01</span> YOUR NAME
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                placeholder="What should I call you?"
                autoComplete="name"
                required
                minLength={2}
                maxLength={100}
                value={form.name}
                onChange={(event) =>
                  setForm({ ...form, name: event.target.value })
                }
              />
            </div>
            <div className="form-field">
              <label htmlFor="contact-email">
                <span>02</span> YOUR EMAIL
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                placeholder="you@somewhere.com"
                autoComplete="email"
                required
                maxLength={160}
                value={form.email}
                onChange={(event) =>
                  setForm({ ...form, email: event.target.value })
                }
              />
            </div>
            <div className="form-field">
              <label htmlFor="contact-message">
                <span>03</span> YOUR MESSAGE
              </label>
              <textarea
                id="contact-message"
                name="message"
                placeholder="Tell me a little about your idea..."
                required
                minLength={10}
                maxLength={2500}
                rows={3}
                value={form.message}
                onChange={(event) =>
                  setForm({ ...form, message: event.target.value })
                }
              />
            </div>
            <button
              type="submit"
              className="button button-primary contact-send"
              data-magnetic
              disabled={status === "routing"}
            >
              <span>
                {status === "routing"
                  ? "Establishing connection..."
                  : status === "draft"
                    ? "Open email draft again"
                    : "Send message"}
              </span>
              {status === "routing" ? (
                <span className="sending-dots">...</span>
              ) : (
                <Send size={16} />
              )}
            </button>
            <p className="form-note">
              <LockKeyhole size={11} /> Opens your email app. Your details are
              never stored.
            </p>
            <div className="form-status" aria-live="polite" aria-atomic="true">
              {status === "draft" && (
                <div className="draft-notice">
                  <CheckCheck size={18} />
                  <div>
                    <strong>Your message is ready for takeoff.</strong>
                    <p>
                      Send the draft in your email app to complete the
                      connection. No app opened?
                    </p>
                    <div>
                      <a href={mailto}>
                        Open email app <ExternalLink size={11} />
                      </a>
                      <button type="button" onClick={copyMessage}>
                        {messageCopied ? "Message copied" : "Copy message"}{" "}
                        <Copy size={11} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {feedback && <p className="form-feedback">{feedback}</p>}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="section-shell">
        <div className="footer-top">
          <a href="#home" className="footer-brand">
            <ForgeMark />
            <span>
              THOUGHTFULLY DESIGNED.
              <br />
              CAREFULLY ENGINEERED.
            </span>
          </a>
          <a className="back-to-top" href="#home">
            BACK TO THE SURFACE <ArrowUp size={15} />
          </a>
        </div>
        <div className="footer-wordmark" aria-label="Digital Forge">
          DIGITAL FORGE<span>.</span>
        </div>
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} JOEL MAGAR</span>
          <span>BUILT WITH REACT. DRIVEN BY CURIOSITY.</span>
          <span className="footer-status">
            <span className="status-dot" /> ALL SYSTEMS HUMAN.
          </span>
        </div>
      </div>
    </footer>
  );
}
