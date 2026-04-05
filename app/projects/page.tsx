import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    title: "JL Laniog Law Firm AI System",
    description:
      "A comprehensive AI-powered legal intake and analysis system featuring n8n workflows, Ollama integration, and a Next.js dashboard for case management.",
    tech: ["Next.js", "Supabase", "n8n", "Ollama", "TypeScript"],
    github: "https://github.com",
    demo: "https://vercel.com",
    image: null,
  },
  {
    title: "AI-Powered CRM Platform",
    description:
      "Customer relationship management platform with AI-driven insights, automated follow-ups, and real-time analytics for sales teams.",
    tech: ["React", "Supabase", "OpenAI", "Tailwind CSS"],
    github: "https://github.com",
    demo: "https://vercel.com",
    image: null,
  },
  {
    title: "Real-Time Collaboration Tool",
    description:
      "Web application for team collaboration with live editing, chat, and task management features using WebSockets and Edge Functions.",
    tech: ["Next.js", "Supabase Realtime", "Edge Functions", "React"],
    github: "https://github.com",
    demo: "https://vercel.com",
    image: null,
  },
  {
    title: "Automated Data Pipeline",
    description:
      "ETL pipeline built with n8n to extract, transform, and load data from multiple sources into a centralized data warehouse with scheduled syncs.",
    tech: ["n8n", "PostgreSQL", "Python", "REST APIs"],
    github: "https://github.com",
    demo: null,
    image: null,
  },
];

export default function ProjectsPage() {
  return (
    <div className="animate-fade-in">
      <section className="container mx-auto px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Projects
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            A selection of work showcasing my expertise in full stack
            development, AI integration, and modern web technologies.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <Card key={index} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col justify-between">
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t, i) => (
                        <span
                          key={i}
                          className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {project.github && (
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="mr-2 h-4 w-4" />
                          Code
                        </a>
                      </Button>
                    )}
                    {project.demo && (
                      <Button size="sm" asChild>
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
