-- 1. Drop the incorrect milestones table
DROP TABLE IF EXISTS public.milestones;

-- 2. Recreate milestones table with correct columns
CREATE TABLE public.milestones (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  date date NOT NULL,
  label text NOT NULL,
  title text NOT NULL,
  subtitle text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  color text NOT NULL,
  "imageUrl" text,
  order_id integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS and add public read
ALTER TABLE public.milestones ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on milestones" ON public.milestones FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access on milestones" ON public.milestones FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 3. Temporarily allow anonymous INSERTS so our seeding script can upload the JSON data
CREATE POLICY "Allow anon insert on projects" ON public.projects FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon insert on team" ON public.team FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon insert on events" ON public.events FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon insert on blogs" ON public.blogs FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon insert on alumni" ON public.alumni FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon insert on milestones" ON public.milestones FOR INSERT WITH CHECK (true);
