import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Brain, LineChart, Bot, Database, Cloud } from "lucide-react";

const services = [
  {
    icon: Code,
    title: "Full Stack Web Development",
    description:
      "Modern, responsive web applications using Next.js, React, TypeScript, and Tailwind CSS. I build performant, accessible, and SEO-friendly sites with the latest best practices.",
  },
  {
    icon: Brain,
    title: "AI Integration",
    description:
      "Seamlessly integrate AI capabilities into your applications using OpenAI, Claude, Ollama, and custom machine learning models to automate and enhance user experiences.",
  },
  {
    icon: Bot,
    title: "Workflow Automation",
    description:
      "Streamline business processes with n8n automation. Connect apps, automate repetitive tasks, and build intelligent workflows that save time and reduce errors.",
  },
  {
    icon: Database,
    title: "Database Architecture",
    description:
      "Design and implement scalable database solutions with Supabase/PostgreSQL. From schema design to optimization, I ensure your data is structured for growth.",
  },
  {
    icon: LineChart,
    title: "Analytics & Monitoring",
    description:
      "Set up comprehensive analytics, error tracking, and performance monitoring to make data-driven decisions and maintain application health.",
  },
  {
    icon: Cloud,
    title: "DevOps & Deployment",
    description:
      "CI/CD pipelines, cloud infrastructure, and deployment strategies using Vercel, GitHub Actions, and containerization for reliable, scalable applications.",
  },
];

export default function ServicesPage() {
  return (
    <div className="animate-fade-in">
      <section className="container mx-auto px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Services
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            I offer a comprehensive range of services to bring your digital
            projects to life. From concept to deployment, I combine technical
            expertise with creative problem-solving.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Card key={index} className="group hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="mb-3 inline-flex rounded-lg bg-primary/10 p-3">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 md:px-6">
        <div className="mx-auto max-w-4xl rounded-2xl gradient-bg p-8 text-white md:p-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold md:text-3xl">
              Have a project in mind?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">
              Let&apos;s discuss how I can help you achieve your goals. I work
              with startups, businesses, and individuals to deliver tailored
              solutions.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
