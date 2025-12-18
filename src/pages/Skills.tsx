import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, GitBranch, Layout, Server } from "lucide-react";

interface SkillCategory {
  title: string;
  skills: string[];
  icon: any;
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend Development",
    icon: Layout,
    skills: [
      "React.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Next.js",
      "Redux",
      "HTML5/CSS3",
    ],
  },
  {
    title: "Backend ",
    icon: Server,
    skills: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "GraphQL",
      "JWT Auth",
      "Middleware",
    ],
  },
  {
    title: "Database",
    icon: Database,
    skills: ["MongoDB", "PostgreSQL", "Mongoose", "Firebase", "Redis", "SQL"],
  },
  {
    title: "Tools & Others",
    icon: GitBranch,
    skills: ["Git", "GitHub", "Docker", "AWS", "Vercel", "Figma", "Postman"],
  },
];

export const Skills = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-4 relative text-2xl md:text-4xl font-bold text-foreground mb-1">
          <span className="font-mono text-primary text-xl">03.</span>
          <h1 className="flex flex-col"> Skills & Technologies</h1>
          <span className="h-px bg-border flex-1 max-w-full" />
        </div>
        <span className="text-lg relative md:ml-14 text-muted-foreground max-w-2xl ">
          Mastering cutting-edge technologies to create exceptional digital
          experiences
        </span>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient"></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {skillCategories.map((category, index) => (
            <Card
              key={category.title}
              className="border border-border bg-black/5 backdrop-blur-sm  z-20 hover:scale-105 transition-all duration-300 animate-floating"
              style={{
                animationDelay: `${index * 0.2}s`,
                animationDuration: `${6 + index * 0.5}s`,
              }}
            >
              <CardHeader className="text-center">
                <div className="text-4xl text-primary mb-2 mx-auto">
                  <category.icon size={40} />
                </div>
                <CardTitle className="text-xl font-bold text-foreground">
                  {category.title}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap  gap-2 justify-center">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="bg-secondary/20 w-fit  text-secondary-foreground border border-secondary/30 hover:bg-secondary/30 transition-colors cursor-pointer"
                      style={{
                        animationDelay: `${index * 0.2 + skillIndex * 0.1}s`,
                      }}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Floating tech icons */}
        <div className="relative mt-16 h-32">
          <div className="absolute inset-0 flex flex-wrap items-center justify-center space-x-8 opacity-80">
            <div className="text-6xl animate-floating">⚛️</div>
            <div className="text-6xl animate-floating floating-delayed">🔧</div>
            <div
              className="text-6xl animate-floating"
              style={{ animationDelay: "-1s" }}
            >
              🚀
            </div>
            <div
              className="text-6xl animate-floating floating-delayed"
              style={{ animationDelay: "-4s" }}
            >
              💎
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
