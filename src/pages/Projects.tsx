import { useEffect, useRef, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Folder } from "lucide-react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/splide/dist/css/splide.min.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Strumify",
    description:
      "An all-in-one guitar app designed to guide players from beginner to advanced, with lessons, exercises, tools, and practice plans that help you build skills, improve technique, and grow confidently at every stage of your guitar journey.",
    image: "/strumify.png",
    tech: ["Next.js", "TypeScript", "TailwindCss", "MongoDb"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "ChatUp",
    description:
      "A real-time messaging app with private and group chat features, online status indicators, and message notifications. Full MERN stack implementation with Socket.io for live updates.",
    image: "/chatup.png",
    tech: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "MongoDb",
      "Expressjs",
      "TailwindCss",
    ],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "BoozeBar",
    description:
      "A full-featured e-commerce platform with product management, cart functionality, payment integration with Stripe, and admin dashboard. Built with React frontend and collaborated with a Nodejs backend team.",
    image: "/boozebar.png",
    tech: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "MongoDb",
      "Expressjs",
      "TailwindCss",
      "Stripe",
    ],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 4,
    title: "MockUp",
    description:
      "A mock test application with AI powered feedback designed to simulate real exam experiences with a clean interface, timed assessments, and detailed performance insights.It also has admin dashboard to upload new questions and tests.",
    image: "/mockup.png",
    tech: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "MongoDb",
      "Expressjs",
      "TailwindCss",
      "Stripe",
    ],
    liveUrl: "#",
    githubUrl: "#",
  },
];
const otherProjects = [
  {
    title: "Random Scale Generator",
    description:
      "A simple tool that gives random note and scales to practice guitar efectively.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com",
    live: "https://guitarscales.netlify.app/",
  },
  {
    title: "ihrTrack",
    description:
      "Advanced HR tracking with seamless, secure, and smart solutions. Featuring biometric login, AI-powered facial recognition, RFID access, and mobile check-ins with geolocation.",
    tech: ["Reactjs", "TailwindCSS", "JavaScript", "Websocket"],
    github: "https://github.com",
    live: "https://ihrtrack.com",
  },
  {
    title: "ByteCape",
    description:
      "A landing page showcasing every events , blogs and seemless animations of the company bytecape.",
    tech: ["Reactjs", "TailwindCSS", "JavaScript", "emailjs"],
    github: "https://github.com",
    live: "https://bytecape.com",
  },
  {
    title: "Medipuzzle",
    description:
      "Medipuzzle is a game-based learning platform for Medical Education that makes learning online easier.The website features two engaging quiz games tailored for medical enthusiasts.And the app contains more than 5 other games to boost user's medical knowledge. ",
    tech: ["Reactjs", "TailwindCSS", "JavaScript"],
    github: "https://github.com",
    live: "https://medipuzzle.com",
  },
  {
    title: "Uniseek",
    description:
      "A comprehensive web app designed to simplify the study abroad application process. Key features include global university search, document management, Duolingo English Test (DET) preparation with mock tests, and an advanced appointment booking system for consultations. The platform also offers personalized guidance on program selection, visa assistance, scholarships, and financial planning, all in one seamless experience. ",
    tech: ["Nextjs", "TailwindCSS", "TypeScript"],
    github: "https://github.com",
    live: "https://uniseek.app",
  },
];

export const Projects = () => {
  const contentRef = useRef(null);
  // useGSAP(() => {
  //   gsap.to(contentRef.current, {
  //     scrollTrigger: {
  //       trigger: "#marker",
  //       markers: true,
  //       scrub: true,
  //       start: "top 20%",
  //       end: "bottom top",
  //       pin: true,
  //     },

  //     duration: 2,
  //   });
  // });
  return (
    <section id="projects" className="py-20 ">
      <div className="container mx-auto px-6 ">
        <h2 className="relative flex items-center gap-4 text-2xl md:text-4xl font-bold text-foreground mb-1">
          <span className="font-mono text-primary text-xl">02.</span>
          Featured Projects
          <span className="h-px bg-border flex-1 max-w-full" />
        </h2>
        <div className="relative text-center mb-16 md:ml-14">
          <p className="text-xl text-muted-foreground  text-start ">
            Showcasing innovative solutions that push the boundaries of web
            technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card
              key={project.id}
              className="  bg-primary/5 backdrop-blur-sm z-20 hover:scale-y-105 border-2 hover:border-primary/50 transition-all duration-300 group overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover  object-top  duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              </div>

              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2 w-fit">
                  {project.tech.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="bg-secondary/20 text-secondary-foreground border border-secondary/30"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-2  gap-2">
                  {project.liveUrl && (
                    <Button
                      size="sm"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="glass border-2 hover:border-primary/50"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="  relref={contentRef}ative  gap-4">
          <h3 className="text-center relative text-4xl text-gradient font-bold text-foreground mt-20">
            Other Noteworthy Projects
          </h3>
          {/* <div className="flex gap-2">
            {otherProjects.map((project, index) => (
              <div
                key={index}
                className="group p-6 w-full mt-5  rounded-lg bg-card/50 border border-border hover:border-primary/50 hover:-translate-y-2 transition-all duration-300"
                // style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center justify-between mb-6">
                  <Folder className="w-10 h-10 text-primary" />
                  <div className="flex gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Github size={18} />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h4>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>
                <ul className="flex flex-wrap gap-2 font-mono text-xs text-muted-foreground">
                  {project.tech.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div> */}
          <Splide
            options={{
              type: "loop",
              perPage: 3,
              perMove: 1,
              gap: "2rem",
              autoScroll: {
                pauseOnHover: true,
                pauseOnFocus: false,
                rewind: true,
                speed: 1,
              },
              arrows: false,
              pagination: false,
              breakpoints: {
                768: {
                  perPage: 1.5,
                },
                1024: {
                  perPage: 3,
                },
              },
            }}
            extensions={{ AutoScroll }}
          >
            {otherProjects.map((project, index) => (
              <SplideSlide
                key={index}
                className="group p-6 w-full mt-5  rounded-lg bg-card/50 border border-border hover:border-primary/50 hover:-translate-y-2 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <Folder className="w-10 h-10 text-primary" />
                  <div className="flex gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Github size={18} />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h4>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>
                <ul className="flex flex-wrap gap-2 font-mono text-xs text-muted-foreground">
                  {project.tech.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </div>
    </section>
  );
};
