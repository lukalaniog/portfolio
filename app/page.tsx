import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, Code, Brain, LineChart } from "lucide-react";

export default function HomePage() {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 md:px-6 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            <span className="block">Luke Larcena</span>
            <span className="block bg-gradient-to-r from-purple-400 via-indigo-400 to-lavender-400 bg-clip-text text-transparent">
              Laniog
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Full Stack Developer & AI Engineer crafting intelligent, scalable web solutions
            with modern technologies and creative problem-solving.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild className="gradient-bg border-0">
              <Link href="/projects">
                View Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="container mx-auto px-4 py-16 md:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold">What I Do</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="group hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="mb-2 inline-flex rounded-lg bg-primary/10 p-3">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Full Stack Development</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Building responsive web applications with Next.js, React, TypeScript, and modern UI frameworks.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="mb-2 inline-flex rounded-lg bg-primary/10 p-3">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>AI & Automation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Integrating AI solutions with n8n, Ollama, and custom ML models for intelligent workflows.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="mb-2 inline-flex rounded-lg bg-primary/10 p-3">
                  <LineChart className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Database Design</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Designing scalable database schemas with Supabase, PostgreSQL, and optimized queries.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 md:px-6">
        <div className="mx-auto max-w-4xl rounded-2xl gradient-bg p-8 text-center text-white md:p-12">
          <h2 className="text-2xl font-bold md:text-3xl">
            Ready to bring your ideas to life?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            Let&apos;s collaborate and build something exceptional together.
          </p>
          <Button size="lg" variant="secondary" asChild className="mt-8">
            <Link href="/contact">Start a Conversation</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
