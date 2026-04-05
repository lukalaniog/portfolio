import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Code, Database, Brain, Cloud, Wrench, MessageSquare } from "lucide-react";

const skills = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js"] },
  { category: "Backend", items: ["Node.js", "Python", "Supabase", "PostgreSQL", "REST APIs"] },
  { category: "AI/ML", items: ["OpenAI", "Claude", "Ollama", "LangChain", "Prompt Engineering"] },
  { category: "DevOps", items: ["Vercel", "GitHub Actions", "Docker", "CI/CD", "Linux"] },
  { category: "Automation", items: ["n8n", "Zapier", "Webhooks", "Workflow Design"] },
  { category: "Tools", items: ["Git", "Figma", "VS Code", "Cursor", "Postman"] },
];

const experiences = [
  {
    role: "Full Stack Developer & AI Engineer",
    company: "Independent",
    period: "2023 - Present",
    description: "Building web applications and AI integrations for clients worldwide.",
  },
  {
    role: "Software Engineer",
    company: "Tech Innovations",
    period: "2021 - 2023",
    description: "Developed scalable solutions and led automation initiatives.",
  },
];

export default function AboutPage() {
  return (
    <div className="animate-fade-in">
      <section className="container mx-auto px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            About Me
          </h1>
          <div className="mt-8 space-y-6 text-lg text-muted-foreground">
            <p>
              I&apos;m Luke Larcena Laniog, a passionate full stack developer
              and AI engineer based in the Philippines. I specialize in building
              modern web applications with a focus on performance,
              accessibility, and user experience.
            </p>
            <p>
              My expertise spans the full stack—from responsive frontend design
              with React and Next.js to robust backend architectures with
              Supabase and Node.js. I&apos;m particularly enthusiastic about
              integrating artificial intelligence into practical applications,
              using tools like n8n, Ollama, and Claude to create intelligent
              workflows that solve real-world problems.
            </p>
            <p>
              When I&apos;m not coding, I&apos;m exploring new technologies,
              contributing to open-source projects, and sharing knowledge with
              the developer community.
            </p>
          </div>
        </div>
      </section>

      <Separator className="mx-auto max-w-6xl" />

      {/* Skills Section */}
      <section className="container mx-auto px-4 py-16 md:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-center text-3xl font-bold">Skills & Technologies</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((skillGroup) => (
              <Card key={skillGroup.category}>
                <CardHeader>
                  <CardTitle className="text-lg">{skillGroup.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md bg-muted px-2.5 py-1 text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Separator className="mx-auto max-w-6xl" />

      {/* Experience Section */}
      <section className="container mx-auto px-4 py-16 md:px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-3xl font-bold">Experience</h2>
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                    <CardTitle className="text-xl">{exp.role}</CardTitle>
                    <span className="text-sm text-muted-foreground">{exp.period}</span>
                  </div>
                  <p className="text-primary">{exp.company}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{exp.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Separator className="mx-auto max-w-6xl" />

      {/* Tools & Workflow */}
      <section className="container mx-auto px-4 py-16 md:px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-3xl font-bold">Tools & Workflow</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="mb-2 inline-flex rounded-lg bg-primary/10 p-3">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Development</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Cursor, VS Code, TypeScript, ESLint, Prettier
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="mb-2 inline-flex rounded-lg bg-primary/10 p-3">
                  <Cloud className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Deployment</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Vercel, GitHub, Docker, CI/CD pipelines
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="mb-2 inline-flex rounded-lg bg-primary/10 p-3">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>AI Stack</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Claude, OpenAI, Ollama, n8n, LangChain
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
