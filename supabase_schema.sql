-- Create Projects Table
CREATE TABLE public.projects (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  category text NOT NULL,
  description text NOT NULL,
  "imageUrl" text NOT NULL,
  "liveUrl" text,
  "githubUrl" text,
  "blogUrl" text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Team Table
CREATE TABLE public.team (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  role text NOT NULL,
  "imageUrl" text NOT NULL,
  "mailUrl" text,
  "linkedinUrl" text,
  "githubUrl" text,
  order_id integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Events Table
CREATE TABLE public.events (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  date date NOT NULL,
  category text NOT NULL,
  location text NOT NULL,
  description text NOT NULL,
  "imageUrl" text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Blogs Table
CREATE TABLE public.blogs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  author text NOT NULL,
  date date NOT NULL,
  excerpt text NOT NULL,
  "imageUrl" text NOT NULL,
  content text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Alumni Table
CREATE TABLE public.alumni (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  batch text NOT NULL,
  company text NOT NULL,
  role text NOT NULL,
  "imageUrl" text NOT NULL,
  "linkedinUrl" text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Milestones Table
CREATE TABLE public.milestones (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  year text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  order_id integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) but allow anonymous reads initially for the public website
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alumni ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.milestones ENABLE ROW LEVEL SECURITY;

-- Create Policies to allow public read access
CREATE POLICY "Allow public read access on projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access on team" ON public.team FOR SELECT USING (true);
CREATE POLICY "Allow public read access on events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Allow public read access on blogs" ON public.blogs FOR SELECT USING (true);
CREATE POLICY "Allow public read access on alumni" ON public.alumni FOR SELECT USING (true);
CREATE POLICY "Allow public read access on milestones" ON public.milestones FOR SELECT USING (true);

-- Create Policies to allow authenticated users to perform all operations (CRUD)
CREATE POLICY "Allow authenticated full access on projects" ON public.projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated full access on team" ON public.team FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated full access on events" ON public.events FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated full access on blogs" ON public.blogs FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated full access on alumni" ON public.alumni FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated full access on milestones" ON public.milestones FOR ALL TO authenticated USING (true) WITH CHECK (true);
