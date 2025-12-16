import { ArrowRight, Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center  overflow-hidden ">
      <div className="container  mx-auto px-6   ">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 z-10  p-2 ">
            <div className="space-y-4  p-2 rounded-sm">
              <p className="text-primary font-medium tracking-wide  text-sm">
                Hi , I am
              </p>
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-br from-primary via-primary/9 backdrop-blur-lg  to-secondary  text-transparent bg-clip-text ">
                  Joel Magar.
                </span>
                <br />
                <span className="text-muted-foreground text-5xl">
                  {" "}
                  I build things for the web.
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                I'm a Frontend & MERN Stack Developer with 1.5 years of
                experience crafting responsive, user-centric web applications. I
                specialize in React,Next.js, Node.js, and creating seamless
                digital experiences.
              </p>
            </div>

            {/* Skills Tags */}
            <div className="flex flex-wrap gap-2">
              {["React", "Three.js", "TypeScript", "UI/UX", "WebGL"].map(
                (skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-secondary/20 border border-primary/20 hover:bg-secondary/80 backdrop-blur-md rounded-full text-sm text-foreground"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-fit ">
              <Button
                variant="default"
                onClick={() => scrollToSection("#projects")}
                size="lg"
                className="group"
              >
                View My Work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                <Download className="w-4 h-4" />
                Download CV
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square max-w-lg mx-auto relative">
              <img
                src="/pesa.webp"
                alt=""
                className="bg-primary w-full h-full object-cover animate-floating rounded-full shadow-[0px_0px_150px_1px] border-2 border-primary shadow-primary/40"
              />
              {/* <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-full blur-2xl scale-75" /> */}

              {/* <div className="relative z-10 w-full h-full rounded-2xl border border-primary/10 bg-card/20 backdrop-blur-sm overflow-hidden shadow-elegant">
                <ThreeScene />
              </div>

              <div className="absolute top-4 right-4 bg-card/80 backdrop-blur-sm border border-primary/20 rounded-lg px-3 py-2">
                <p className="text-xs text-muted-foreground">Interactive 3D</p>
            </div>
          </div>
          <div classNam
              </div>

              <div className="absolute bottom-4 left-4 bg-card/80 backdrop-blur-sm border border-primary/20 rounded-lg px-3 py-2">
                <p className="text-xs text-muted-foreground">Drag to rotate</p>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2">
        <p className="text-xs text-muted-foreground">Scroll to explore</p>
        <div className="w-px h-8 bg-primary/50 animate-pulse" />
      </div>
    </section>
  );
}
