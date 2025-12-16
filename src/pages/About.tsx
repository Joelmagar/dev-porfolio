import { useEffect, useRef, useState } from "react";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-padding container min-h-[80vh] flex flex-col justify-center mx-auto"
    >
      <div
        className={`transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="flex items-center gap-4 text-2xl md:text-4xl font-bold text-foreground mb-10">
          <span className="font-mono text-primary text-xl">01.</span>
          About Me
          <span className="h-px bg-border flex-1 max-w-full" />
        </h2>

        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-4 backdrop-blur-lg rounded-md animate-pulse-glow shadow-primary p-2 text-muted-foreground">
            <p className="backdrop-blur-lg">
              Hello! I'm a passionate developer who loves building things that
              live on the internet. My journey into web development started
              during my college days when I discovered the magic of turning
              ideas into interactive experiences.
            </p>
            <p className="backdrop-blur-lg">
              With{" "}
              <span className="text-primary font-medium">
                1.5 years of professional experience
              </span>
              , I've had the privilege of working on diverse projects ranging
              from e-commerce platforms to real-time collaboration tools. I've
              collaborated with talented backend developers and also built
              full-stack applications independently using the MERN stack.
            </p>
            <p className="backdrop-blur-lg">
              I enjoy the challenge of creating efficient, scalable, and
              user-friendly applications. Whether it's a sleek frontend
              interface or a robust Node.js backend, I'm always eager to learn
              and push the boundaries of what's possible.
            </p>
            <p className="text-foreground backdrop-blur-lg font-medium">
              Here are some technologies I've been working with recently:
            </p>
            <ul className="grid grid-cols-2  gap-2 font-mono text-sm">
              {[
                "React.js",
                "Node.js",
                "TypeScript",
                "MongoDB",
                "Express.js",
                "Next.js",
              ].map((tech) => (
                <li key={tech} className="flex  items-center gap-2">
                  <span className="text-primary">▹</span>
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative group">
            <div className="relative z-10 rounded-lg overflow-hidden">
              <div className="aspect-square bg-gradient-to-br from-secondary to-card rounded-lg flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary/30">
                  <span className="text-4xl font-bold text-primary font-mono">
                    JD
                  </span>
                </div>
              </div>
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-300" />
            </div>
            <div className="absolute inset-0 border-2 border-primary rounded-lg translate-x-4 translate-y-4 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </section>
  );
}
