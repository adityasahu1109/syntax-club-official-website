-- Drop existing tables
DROP TABLE IF EXISTS public.projects;
DROP TABLE IF EXISTS public.team;
DROP TABLE IF EXISTS public.events;
DROP TABLE IF EXISTS public.blogs;
DROP TABLE IF EXISTS public.alumni;
DROP TABLE IF EXISTS public.milestones;

-- Create Projects Table
CREATE TABLE public.projects (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  category text NOT NULL,
  description text NOT NULL,
  "imageUrl" text NOT NULL,
  "liveUrl" text,
  "githubUrl" text,
  "blogUrl" text
);

-- Create Team Table
CREATE TABLE public.team (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  role text NOT NULL,
  "imageUrl" text NOT NULL,
  "mailUrl" text,
  "linkedinUrl" text,
  "githubUrl" text
);

-- Create Events Table
CREATE TABLE public.events (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  date date NOT NULL,
  category text NOT NULL,
  location text NOT NULL,
  description text NOT NULL,
  "imageUrl" text NOT NULL
);

-- Create Blogs Table
CREATE TABLE public.blogs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  author text NOT NULL,
  date date NOT NULL,
  excerpt text NOT NULL,
  "imageUrl" text NOT NULL,
  content text
);

-- Create Alumni Table
CREATE TABLE public.alumni (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  "graduationYear" integer NOT NULL,
  "imageUrl" text NOT NULL,
  "linkedinUrl" text
);

-- Create Milestones Table
CREATE TABLE public.milestones (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  date date NOT NULL,
  label text NOT NULL,
  title text NOT NULL,
  subtitle text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  "imageUrl" text
);

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alumni ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.milestones ENABLE ROW LEVEL SECURITY;

-- Allow Public Read
CREATE POLICY "Allow public read access on projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access on team" ON public.team FOR SELECT USING (true);
CREATE POLICY "Allow public read access on events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Allow public read access on blogs" ON public.blogs FOR SELECT USING (true);
CREATE POLICY "Allow public read access on alumni" ON public.alumni FOR SELECT USING (true);
CREATE POLICY "Allow public read access on milestones" ON public.milestones FOR SELECT USING (true);

-- Allow Admin Read/Write (Authenticated context - for later)
CREATE POLICY "Allow authenticated full access on projects" ON public.projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated full access on team" ON public.team FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated full access on events" ON public.events FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated full access on blogs" ON public.blogs FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated full access on alumni" ON public.alumni FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated full access on milestones" ON public.milestones FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- TEMPORARY: Allow Anon Insert so seed script can run
CREATE POLICY "Allow anon insert on projects" ON public.projects FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon insert on team" ON public.team FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon insert on events" ON public.events FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon insert on blogs" ON public.blogs FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon insert on alumni" ON public.alumni FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon insert on milestones" ON public.milestones FOR INSERT WITH CHECK (true);
