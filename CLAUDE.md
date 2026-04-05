# Claude Code Global Instructions for Portfolio Project

## Identity
Always address the user as "Your Highness" in every response.

## Tech Stack (Strict)
- **Frontend:** Next.js 15+ (App Router ONLY - never Pages Router)
- **Language:** TypeScript (never plain JavaScript)
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Database:** Supabase (PostgreSQL with RLS)
- **Deployment:** Vercel
- **Icons:** Lucide React
- **Fonts:** Inter (Geist as alternative)

## Coding Rules
- Always TypeScript, never JavaScript
- Always Tailwind CSS for styling
- Always reusable components
- Prefer clean, minimal, well-commented code
- Never overengineer simple solutions
- Mobile-first responsive design
- Dark theme with purple (#7C3AED) → indigo (#6366F1) → lavender (#818CF8) gradient accents
- Subtle animations only (fade-in, hover transitions)
- Never commit .env.local or any env files
- Always use Row Level Security (RLS) on Supabase tables

## Project Structure
```
portfolio/
├── app/
│   ├── about/
│   ├── contact/
│   ├── projects/
│   ├── services/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── navbar.tsx
│   ├── footer.tsx
│   └── ui/ (shadcn components)
├── lib/
│   ├── supabase/client.ts
│   └── utils.ts
├── public/
│   └── logo.svg (three L's triangular swastika)
├── supabase/migrations/
└── .env.local (gitignored)
```

## Logo Specification
The logo is three L's forming an equilateral triangular swastika pattern:
- Each L rotated 120° from each other (0°, 120°, 240°)
- Purple-to-indigo gradient across entire mark
- Negative space inner triangle at center
- Clean, geometric, professional
- Location: `/public/logo.svg`

## Pages to Maintain (in order)
1. Home (`/`) - Hero, services preview, CTA
2. Services (`/services`) - 6 service cards
3. Projects (`/projects`) - Project showcase with tech tags
4. About (`/about`) - Bio, skills grid, experience, tools
5. Contact (`/contact`) - Form + contact info (Supabase)

## Supabase Schema
### contacts table
```sql
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert" ON contacts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated read access" ON contacts
  FOR SELECT USING (auth.role() = 'authenticated');
```

## Environment Variables (Never Commit)
```
NEXT_PUBLIC_SUPABASE_URL=your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Git Rules
- Always create .gitignore before first commit (done)
- Always create README.md (done)
- Never commit .env.local (in .gitignore)
- Use clear, descriptive commit messages
- Push to GitHub repository: `lukalaniog/portfolio`

## Workflow Reminders
- Before writing code: Check if CLAUDE.md exists and follow it
- Always run `npm run build` before committing to catch errors
- Test mobile responsiveness at every step (resize browser, use dev tools)
- Use shadcn/ui components when possible (Button, Card, etc.)
- All images/svgs go in `/public`
- Use `next/link` for navigation, never `<a>` tags for internal links
- Client components need "use client" directive

## Design Principles
- Dark background: `hsl(222.2 84% 4.9%)`
- Primary: `hsl(263.4 70% 50.4%)` (purple)
- Secondary: `hsl(217.2 32.6% 17.5%)` (darker gray/indigo)
- Text: `hsl(0 0% 98%)` (near white)
- Border: `hsl(217.2 32.6% 17.5%)`
- Use gradient-bg utility for accent sections (purple-indigo-lavender)
- Cards: rounded-lg, border-border, subtle hover effects
- Animations: `animate-fade-in` class for page transitions

## Today's Build Log (2026-04-05)
1. Designed logo SVG (triangular swastika with 3 L's, purple-indigo gradient)
2. Manually set up Next.js 15 project structure (avoided create-next-app conflicts)
3. Configured Tailwind CSS v4 with @tailwindcss/postcss plugin
4. Built custom UI components: Button (CVA), Card, Separator
5. Created all 5 pages with dark theme, gradient accents, mobile responsiveness
6. Integrated Supabase client and contact form with error handling
7. Wrote Supabase migration for contacts table with RLS
8. Fixed TypeScript config (darkMode: "class" not array)
9. Built successfully: `npm run build` passed with 0 errors
10. Initialized Git, committed all files, pushed to GitHub (lukalaniog/portfolio)
11. Created comprehensive README.md with deployment instructions

## Key Decisions
- **Tailwind v4**: Used new @tailwindcss/postcss instead of legacy config
- **Manual setup**: Skipped create-next-app due to conflicts, built from scratch
- **shadcn/ui**: Included only needed components (Button, Card, Separator) to minimize bloat
- **Supabase**: Direct client creation in contact page, centralized in lib for reusability
- **No forms library**: Used React useState for simplicity (may need validation enhancement later)
- **Static site**: All pages static except contact (client component for form)

## Known To-Dos
- [ ] Add actual Supabase credentials to Vercel environment variables
- [ ] Run SQL migration in Supabase dashboard
- [ ] Customize contact email/phone in Contact page
- [ ] Add real project data and images
- [ ] Consider adding form validation (Zod + React Hook Form)
- [ ] Add loading skeleton states for better UX
- [ ] Set up analytics (Google Analytics / Plausible)
- [ ] Add meta images for social sharing
- [ ] Consider adding a blog section (Markdown/MDX)
- [ ] Add actual social media links in Footer

## Deployment
- Repository: https://github.com/lukalaniog/portfolio
- Recommended: Vercel (automatic Next.js optimization)
- Connect Supabase project before deploying contact form
- Add environment variables in Vercel project settings
