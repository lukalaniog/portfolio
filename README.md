# Luke Larcena Laniog - Portfolio

A modern, minimalist portfolio website built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**. Features a dark theme with purple-to-indigo gradient accents and mobile-first responsive design.

## 🚀 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Icons:** Lucide React
- **Database:** Supabase (PostgreSQL)
- **Deployment:** Vercel (recommended)

## 📁 Project Structure

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
│   └── ui/
│       ├── button.tsx
│       ├── card.tsx
│       └── separator.tsx
├── lib/
│   ├── supabase/
│   │   └── client.ts
│   └── utils.ts
├── public/
│   └── logo.svg
└── ...config files
```

## ⚡ Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/lukalaniog/portfolio.git
cd portfolio
npm install
```

### 2. Environment Variables

Copy `.env.local` and fill in your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Set Up Supabase Database

Run the following SQL in your Supabase SQL editor to create the `contacts` table:

```sql
-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Public can insert, but not read
CREATE POLICY "Allow public insert" ON contacts
  FOR INSERT WITH CHECK (true);

-- Authenticated users can read their own entries (optional)
CREATE POLICY "Allow individual read" ON contacts
  FOR SELECT USING (auth.uid() IS NOT NULL);
```

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 🚢 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Flukalaniog%2Fportfolio)

1. Click the button above or import the repository in Vercel
2. Add your Supabase environment variables in Vercel project settings
3. Deploy!

## 🎨 Design System

- **Primary Colors:** Purple `#7C3AED` → Indigo `#6366F1` → Lavender `#818CF8`
- **Theme:** Dark mode by default with CSS custom properties
- **Typography:** Inter (via Google Fonts)
- **Animations:** Subtle fade-ins, hover transitions

## 📝 License

MIT © Luke Larcena Laniog
