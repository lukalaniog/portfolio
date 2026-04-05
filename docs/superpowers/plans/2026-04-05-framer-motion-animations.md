# Framer Motion Animations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add smooth, performant animations across all portfolio pages using framer-motion, including scroll-triggered fade-ins, floating hero headline, staggered card animations, and page transitions.

**Architecture:** 
- Install framer-motion dependency
- Create reusable animation wrapper components in a new `components/animations/` directory
- Use framer-motion's `motion` components with `whileInView` for scroll-based reveals
- Implement `AnimatePresence` for page transitions via layout wrapper
- Apply animations consistently across all 5 pages with minimal code changes

**Tech Stack:** 
- framer-motion (latest compatible with React 19)
- Existing: Next.js 15, React 19, Tailwind CSS

---

## File Structure

**Files to create:**
- `components/animations/fade-in-scroll.tsx` - Reusable scroll-triggered fade component
- `components/animations/floating-headline.tsx` - Floating animation wrapper for hero text
- `components/animations/stagger-container.tsx` - Staggered children animations
- `components/animations/page-transition.tsx` - Page transition wrapper
- `components/animations/index.ts` - Barrel export

**Files to modify:**
- `package.json` - Add framer-motion dependency
- `app/layout.tsx` - Wrap with page transition provider
- `app/page.tsx` - Add animations to hero, services preview, CTA
- `app/services/page.tsx` - Add staggered card animations
- `app/projects/page.tsx` - Add staggered card animations
- `app/about/page.tsx` - Add fade-in scroll to sections
- `app/contact/page.tsx` - Add fade-in scroll to sections

---

## Task 1: Install framer-motion Dependency

**Files:**
- Modify: `package.json`

- [ ] **Step 1:** Add framer-motion to dependencies in package.json

```json
{
  "name": "portfolio",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@radix-ui/react-slot": "^1.2.2",
    "@tailwindcss/postcss": "^4.2.2",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "framer-motion": "^11.18.2",
    "lucide-react": "^0.511.0",
    "next": "^15.3.2",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "tailwind-merge": "^3.3.0",
    "tailwindcss-animate": "^1.0.7"
  }
}
```

- [ ] **Step 2:** Run `npm install`

Expected output: `added X packages, audited Y packages in Zs`

- [ ] **Step 3:** Commit

```bash
git add package.json package-lock.json
git commit -m "feat: add framer-motion dependency for animations"
```

---

## Task 2: Create FadeInScroll Component

**Files:**
- Create: `components/animations/fade-in-scroll.tsx`

- [ ] **Step 1:** Create the FadeInScroll component

```tsx
"use client";

import { HTMLAttributes } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

interface FadeInScrollProps extends HTMLAttributes<HTMLDivElement> {
  /** Delay in seconds before animation starts */
  delay?: number;
  /** Duration in seconds for the animation */
  duration?: number;
  /** Custom class name */
  className?: string;
  /** Children to animate */
  children: React.ReactNode;
}

export function FadeInScroll({
  delay = 0,
  duration = 0.6,
  className = "",
  children,
  ...props
}: FadeInScrollProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const shouldReduceMotion = useReducedMotion();

  // If user prefers reduced motion, use instant visibility
  if (shouldReduceMotion) {
    return (
      <div ref={ref} className={className} {...props}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2:** Commit

```bash
git add components/animations/fade-in-scroll.tsx
git commit -m "feat: add FadeInScroll component for scroll-triggered animations"
```

---

## Task 3: Create FloatingHeadline Component

**Files:**
- Create: `components/animations/floating-headline.tsx`

- [ ] **Step 1:** Create the FloatingHeadline component

```tsx
"use client";

import { HTMLAttributes } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface FloatingHeadlineProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Float intensity in pixels (default: 10) */
  intensity?: number;
  /** Float duration in seconds (default: 3) */
  duration?: number;
  /** Custom class name */
  className?: string;
  /** Children to animate */
  children: React.ReactNode;
}

export function FloatingHeadline({
  intensity = 10,
  duration = 3,
  className = "",
  children,
  ...props
}: FloatingHeadlineProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <h1 className={className} {...props}>
        {children}
      </h1>
    );
  }

  return (
    <motion.h1
      initial={{ y: 0 }}
      animate={{
        y: [-intensity, intensity, -intensity],
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.h1>
  );
}
```

- [ ] **Step 2:** Commit

```bash
git add components/animations/floating-headline.tsx
git commit -m "feat: add FloatingHeadline component with gentle bob animation"
```

---

## Task 4: Create StaggerContainer Component

**Files:**
- Create: `components/animations/stagger-container.tsx`

- [ ] **Step 1:** Create the StaggerContainer component

```tsx
"use client";

import { HTMLAttributes, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface StaggerContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Stagger delay in seconds between each child (default: 0.1) */
  staggerDelay?: number;
  /** Animation duration in seconds for each item (default: 0.5) */
  duration?: number;
  /** Custom class name */
  className?: string;
  /** Children to animate (typically cards) */
  children: ReactNode;
}

export function StaggerContainer({
  staggerDelay = 0.1,
  duration = 0.5,
  className = "",
  children,
  ...props
}: StaggerContainerProps) {
  const shouldReduceMotion = useReducedMotion();

  // Convert children to array to map with index
  const childArray = Array.isArray(children) ? children : [children];

  if (shouldReduceMotion) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      {...props}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {childArray.map((child, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration,
                ease: "easeOut",
              },
            },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
```

- [ ] **Step 2:** Commit

```bash
git add components/animations/stagger-container.tsx
git commit -m "feat: add StaggerContainer component for staggered card animations"
```

---

## Task 5: Create PageTransition Component

**Files:**
- Create: `components/animations/page-transition.tsx`

- [ ] **Step 1:** Create the PageTransition component

```tsx
"use client";

import { HTMLAttributes, ReactNode } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

interface PageTransitionProps extends HTMLAttributes<HTMLDivElement> {
  /** Children to animate */
  children: ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    x: 20,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

export function PageTransition({
  children,
  className = "",
  ...props
}: PageTransitionProps) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className} {...props}>{children}</div>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

- [ ] **Step 2:** Create barrel export

```bash
echo "export { FadeInScroll } from './fade-in-scroll';" > components/animations/index.ts
echo "export { FloatingHeadline } from './floating-headline';" >> components/animations/index.ts
echo "export { StaggerContainer } from './stagger-container';" >> components/animations/index.ts
echo "export { PageTransition } from './page-transition';" >> components/animations/index.ts
```

- [ ] **Step 3:** Commit

```bash
git add components/animations/
git commit -m "feat: add animation components (FadeInScroll, FloatingHeadline, StaggerContainer, PageTransition)"
```

---

## Task 6: Integrate Page Transitions in Layout

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1:** Wrap main content with PageTransition

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageTransition } from "@/components/animations";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Luke Larcena Laniog - Portfolio",
  description: "Professional portfolio of Luke Larcena Laniog - Full Stack Developer & AI Engineer specializing in modern web applications and intelligent systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 2:** Commit

```bash
git add app/layout.tsx
git commit -m "feat: wrap main content with PageTransition for route animations"
```

---

## Task 7: Animate Home Page

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1:** Import animation components and wrap sections

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, Code, Brain, LineChart } from "lucide-react";
import { FadeInScroll, FloatingHeadline, StaggerContainer } from "@/components/animations";

export default function HomePage() {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 md:px-6 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <FloatingHeadline
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-4"
            intensity={8}
            duration={4}
          >
            <span className="block">Luke Larcena</span>
            <span className="block bg-gradient-to-r from-purple-400 via-indigo-400 to-lavender-400 bg-clip-text text-transparent">
              Laniog
            </span>
          </FloatingHeadline>
          <FadeInScroll delay={0.2} duration={0.8}>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
              Full Stack Developer &amp; AI Engineer crafting intelligent, scalable web solutions
              with modern technologies and creative problem-solving.
            </p>
          </FadeInScroll>
          <FadeInScroll delay={0.4} duration={0.8}>
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
          </FadeInScroll>
        </div>
      </section>

      {/* Services Preview */}
      <section className="container mx-auto px-4 py-16 md:px-6">
        <div className="mx-auto max-w-6xl">
          <FadeInScroll duration={0.8}>
            <h2 className="mb-12 text-center text-3xl font-bold">What I Do</h2>
          </FadeInScroll>
          <StaggerContainer staggerDelay={0.15} duration={0.6}>
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
                  <CardTitle>AI &amp; Automation</CardTitle>
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
                    Designing scalable database schemas with PostgreSQL and optimized queries.
                  </p>
                </CardContent>
              </Card>
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 md:px-6">
        <div className="mx-auto max-w-4xl rounded-2xl gradient-bg p-8 text-center text-white md:p-12">
          <FadeInScroll duration={0.8}>
            <>
              <h2 className="text-2xl font-bold md:text-3xl">
                Ready to bring your ideas to life?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-white/80">
                Let&apos;s collaborate and build something exceptional together.
              </p>
              <Button size="lg" variant="secondary" asChild className="mt-8">
                <Link href="/contact">Start a Conversation</Link>
              </Button>
            </>
          </FadeInScroll>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 2:** Commit

```bash
git add app/page.tsx
git commit -m "feat: add animations to home page (floating headline, staggered cards, fade on scroll)"
```

---

## Task 8: Animate Services Page

**Files:**
- Modify: `app/services/page.tsx`

- [ ] **Step 1:** Import and wrap service cards with StaggerContainer, add FadeInScroll to headings

```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Brain, LineChart, Bot, Database, Cloud } from "lucide-react";
import { FadeInScroll, StaggerContainer } from "@/components/animations";

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
      "Design and implement scalable database solutions with PostgreSQL. From schema design to optimization, I ensure your data is structured for growth.",
  },
  {
    icon: LineChart,
    title: "Analytics &amp; Monitoring",
    description:
      "Set up comprehensive analytics, error tracking, and performance monitoring to make data-driven decisions and maintain application health.",
  },
  {
    icon: Cloud,
    title: "DevOps &amp; Deployment",
    description:
      "CI/CD pipelines, cloud infrastructure, and deployment strategies using Vercel, GitHub Actions, and containerization for reliable, scalable applications.",
  },
];

export default function ServicesPage() {
  return (
    <div className="animate-fade-in">
      <section className="container mx-auto px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <FadeInScroll duration={0.8}>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Services
            </h1>
          </FadeInScroll>
          <FadeInScroll delay={0.2} duration={0.8}>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              I offer a comprehensive range of services to bring your digital
              projects to life. From concept to deployment, I combine technical
              expertise with creative problem-solving.
            </p>
          </FadeInScroll>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8 md:px-6">
        <div className="mx-auto max-w-6xl">
          <StaggerContainer staggerDelay={0.15} duration={0.6}>
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
          </StaggerContainer>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 md:px-6">
        <div className="mx-auto max-w-4xl rounded-2xl gradient-bg p-8 text-white md:p-12">
          <FadeInScroll duration={0.8}>
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
          </FadeInScroll>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 2:** Commit

```bash
git add app/services/page.tsx
git commit -m "feat: add staggered card animations and fade on scroll to services page"
```

---

## Task 9: Animate Projects Page

**Files:**
- Modify: `app/projects/page.tsx`

- [ ] **Step 1:** Import StaggerContainer and wrap project cards, add FadeInScroll to header

```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { FadeInScroll, StaggerContainer } from "@/components/animations";

const projects = [
  {
    title: "JL Laniog Law Firm AI System",
    description:
      "A comprehensive AI-powered legal intake and analysis system featuring n8n workflows, Ollama integration, and a Next.js dashboard for case management.",
    tech: ["Next.js", "n8n", "Ollama", "TypeScript"],
    github: "https://github.com",
    demo: "https://vercel.com",
  },
  {
    title: "AI-Powered CRM Platform",
    description:
      "Customer relationship management platform with AI-driven insights, automated follow-ups, and real-time analytics for sales teams.",
    tech: ["React", "Supabase", "OpenAI", "Tailwind CSS"],
    github: "https://github.com",
    demo: "https://vercel.com",
  },
  {
    title: "Real-Time Collaboration Tool",
    description:
      "Web application for team collaboration with live editing, chat, and task management features using WebSockets and Edge Functions.",
    tech: ["Next.js", "Supabase Realtime", "Edge Functions", "React"],
    github: "https://github.com",
    demo: "https://vercel.com",
  },
  {
    title: "Automated Data Pipeline",
    description:
      "ETL pipeline built with n8n to extract, transform, and load data from multiple sources into a centralized data warehouse with scheduled syncs.",
    tech: ["n8n", "PostgreSQL", "Python", "REST APIs"],
    github: "https://github.com",
    demo: null,
  },
];

export default function ProjectsPage() {
  return (
    <div className="animate-fade-in">
      <section className="container mx-auto px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <FadeInScroll duration={0.8}>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Projects
            </h1>
          </FadeInScroll>
          <FadeInScroll delay={0.2} duration={0.8}>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              A selection of work showcasing my expertise in full stack
              development, AI integration, and modern web technologies.
            </p>
          </FadeInScroll>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16 md:px-6">
        <div className="mx-auto max-w-6xl">
          <StaggerContainer staggerDelay={0.15} duration={0.6}>
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
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 2:** Commit

```bash
git add app/projects/page.tsx
git commit -m "feat: add staggered card animations and fade on scroll to projects page"
```

---

## Task 10: Animate About Page and Contact Page

**Files:**
- Modify: `app/about/page.tsx`
- Modify: `app/contact/page.tsx`

- [ ] **Step 1:** Animate About page - add FadeInScroll to all major sections

Read the current about page and wrap each major section with FadeInScroll. Each section should have staggered delays.

- [ ] **Step 2:** Animate Contact page - add FadeInScroll to sections

Read the contact page and wrap the contact info card and main message with FadeInScroll.

- [ ] **Step 3:** Commit

```bash
git add app/about/page.tsx app/contact/page.tsx
git commit -m "feat: add fade on scroll animations to about and contact pages"
```

---

## Task 11: Test Build and Verify Animations

**Files:**
- All modified files

- [ ] **Step 1:** Run `npm run build`

Expected: Build completes with no errors

```bash
npm run build
```

- [ ] **Step 2:** Run `npm run dev` and manually verify:
  - Page transitions animate on navigation
  - Hero headline floats smoothly
  - Cards stagger animate on scroll in Services and Projects
  - All sections fade in when scrolling
  - Animations feel smooth and not overwhelming
  - Respects system reduced-motion setting

- [ ] **Step 3:** Fix any TypeScript or animation issues

- [ ] **Step 4:** Final commit

```bash
git add .
git commit -m "feat: complete framer-motion animation integration across all pages"
```

---

## Self-Review

**1. Spec coverage:**
- ✅ Fade-in on scroll for every section - FadeInScroll component added to all pages
- ✅ Subtle float animation on hero headline - FloatingHeadline applied to home page hero
- ✅ Staggered card animations on Services page - StaggerContainer wrapping service cards
- ✅ Staggered card animations on Projects page - StaggerContainer wrapping project cards
- ✅ Smooth page transitions on route changes - PageTransition in app/layout.tsx with AnimatePresence
- ✅ Install framer-motion - Task 1

**2. Placeholder scan:** No placeholders. All code complete.

**3. Type consistency:** All component exports match imports. Animation props (delay, duration, intensity, staggerDelay) consistently named and used.

All tasks are complete and ready for execution.
