import { motion } from "framer-motion";
export default function About() {
  return (
    <section
      id="about"
      className="section-padding container min-h-[80vh] flex flex-col justify-center mx-auto"
    >
      <div className={`transition-all duration-700 opacity-100 translate-y-0 `}>
        <h2 className="flex items-center gap-4 text-2xl md:text-4xl font-bold text-foreground mb-10">
          <span className="font-mono text-primary text-xl">01.</span>
          About Me
          <span className="h-px bg-border flex-1 max-w-full" />
        </h2>

        <div className="grid md:grid-cols-3 gap-20">
          <motion.div
            initial={{ x: -50 }}
            whileInView={{ x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.31 }}
            //  ={{ x: 5 }}
            className="md:col-span-2 space-y-10  rounded-md pr-20  shadow-primary p-2 text-muted-foreground"
          >
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
            <p className="text-white backdrop-blur-lg text-lg font-medium">
              Here are some technologies I've been working with recently:
            </p>
            <ul className="grid grid-cols-2 space-y-1 gap-2 font-mono text-sm">
              {[
                "React.js",
                "Node.js",
                "TypeScript",
                "MongoDB",
                "Express.js",
                "Next.js",
              ].map((tech) => (
                <li key={tech} className="flex  items-center  gap-2">
                  <span className="text-primary">▹</span>
                  {tech}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            whileHover={{ y: -5 }}
            initial={{ x: 50 }}
            whileInView={{ x: 0 }}
            transition={{ duration: 0.31 }}
            viewport={{ once: true }}
            //  ={{ x: 5 }}
            className="relative shadow-primary/40 h-fit mx-7 my-auto  shadow-[0px_0px_20px_2px]   rounded-2xl p-8 border backdrop-blur-sm space-y-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center text-3xl font-heading font-bold gradient-text">
                JM
              </div>
              <div>
                <h4 className="font-heading font-semibold text-lg">
                  Joel Magar
                </h4>
                <p className="text-muted-foreground text-sm">
                  MERN Stack Developer
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Experience</span>
                <span className="text-primary font-medium">1.5+ Years</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Projects</span>
                <span className="text-primary font-medium">15+ Completed</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Location</span>
                <span className="text-foreground">Kathmandu, Nepal</span>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <div className="flex gap-2 flex-wrap">
                {["Frontend", "Backend", "Full-Stack"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
