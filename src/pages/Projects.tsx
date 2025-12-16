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
    tech: ["React", "TypeScript", "D3.js", "TensorFlow.js", "WebGL"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "ChatUp",
    description:
      "A real-time messaging app with private and group chat features, online status indicators, and message notifications. Full MERN stack implementation with Socket.io for live updates.",
    image: "/chatup.png",
    tech: ["WebXR", "Three.js", "WebGL", "Spatial Audio", "React"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "BoozeBar",
    description:
      "A full-featured e-commerce platform with product management, cart functionality, payment integration with Stripe, and admin dashboard. Built with React frontend and collaborated with a Django backend team.",
    image: "/boozebar.png",
    tech: ["Solidity", "Web3.js", "React", "IPFS", "MetaMask"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 4,
    title: "MockUp",
    description:
      "A mock test application designed to simulate real exam experiences with a clean interface, timed assessments, and detailed performance insights.",
    image: "/mockup.png",
    tech: ["Three.js", "TensorFlow.js", "WebWorkers", "React", "WebGL"],
    liveUrl: "#",
    githubUrl: "#",
  },
];
const otherProjects = [
  {
    title: "Weather Dashboard",
    description:
      "A weather application with location-based forecasts, interactive maps, and historical data visualization.",
    tech: ["React", "OpenWeather API", "Chart.js"],
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    title: "Blog CMS",
    description:
      "A headless CMS for managing blog content with markdown support, image optimization, and SEO features.",
    tech: ["Node.js", "MongoDB", "Express", "React"],
    github: "https://github.com",
  },
  {
    title: "Portfolio Generator",
    description:
      "A CLI tool that generates responsive portfolio websites from JSON configuration files.",
    tech: ["Node.js", "Handlebars", "SCSS"],
    github: "https://github.com",
  },
];

export const Projects = () => {
  return (
    <section id="projects" className="py-20 ">
      <div className="container mx-auto px-6">
        <h2 className="flex items-center gap-4 text-2xl md:text-4xl font-bold text-foreground mb-10">
          <span className="font-mono text-primary text-xl">02.</span>
          Featured Projects
          <span className="h-px bg-border flex-1 max-w-full" />
        </h2>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl  font-bold mb-4 text-gradient"></h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
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
                  className="w-full h-48 object-cover  object-top transition-transform duration-300 group-hover:scale-110"
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
        <h3 className="text-center text-2xl font-semibold text-foreground my-10">
          Other Noteworthy Projects
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {otherProjects.map((project, index) => (
            <div
              key={project.title}
              className="group p-6 rounded-lg bg-card border border-border hover:border-primary/50 hover:-translate-y-2 transition-all duration-300"
              style={{ transitionDelay: `${index * 50}ms` }}
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
        </div>
      </div>
    </section>
  );
};
