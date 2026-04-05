-- Create contacts table for portfolio contact form
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

-- Allow public to insert contacts (contact form)
CREATE POLICY "Allow public insert" ON contacts
  FOR INSERT WITH CHECK (true);

-- Allow authenticated users (admin) to view all contacts
CREATE POLICY "Allow authenticated read access" ON contacts
  FOR SELECT USING (auth.role() = 'authenticated');

-- Optional: Allow users to delete their own submission (if we had user_id)
-- Not needed for anonymous contact form
