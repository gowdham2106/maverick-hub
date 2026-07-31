-- =========================
-- MEMBERS
-- =========================
CREATE TABLE public.members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  department text,
  email text,
  linkedin_url text,
  photo_url text,
  initials text,
  hue integer NOT NULL DEFAULT 264,
  member_group text NOT NULL DEFAULT 'core',
  responsibilities text[] NOT NULL DEFAULT '{}',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.members TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.members TO authenticated;
GRANT ALL ON public.members TO service_role;
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "members public read" ON public.members FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "members admin insert" ON public.members FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "members admin update" ON public.members FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "members admin delete" ON public.members FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE INDEX members_group_order_idx ON public.members (member_group, sort_order);

-- =========================
-- PROJECT DETAILS
-- =========================
CREATE TABLE public.project_details (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'In Development',
  progress integer NOT NULL DEFAULT 0,
  current_phase text NOT NULL DEFAULT '',
  problem text NOT NULL DEFAULT '',
  solution text NOT NULL DEFAULT '',
  features text[] NOT NULL DEFAULT '{}',
  technologies text[] NOT NULL DEFAULT '{}',
  outcomes text[] NOT NULL DEFAULT '{}',
  business_benefits text[] NOT NULL DEFAULT '{}',
  business_impact text NOT NULL DEFAULT '',
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.project_details TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.project_details TO authenticated;
GRANT ALL ON public.project_details TO service_role;
ALTER TABLE public.project_details ENABLE ROW LEVEL SECURITY;
CREATE POLICY "project public read" ON public.project_details FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "project admin insert" ON public.project_details FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "project admin update" ON public.project_details FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "project admin delete" ON public.project_details FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- =========================
-- ROADMAP
-- =========================
CREATE TABLE public.roadmap_weeks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  week_number integer NOT NULL UNIQUE,
  title text NOT NULL,
  focus_items text[] NOT NULL DEFAULT '{}',
  deliverables text[] NOT NULL DEFAULT '{}',
  progress integer NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'upcoming',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.roadmap_weeks TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.roadmap_weeks TO authenticated;
GRANT ALL ON public.roadmap_weeks TO service_role;
ALTER TABLE public.roadmap_weeks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "roadmap public read" ON public.roadmap_weeks FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "roadmap admin insert" ON public.roadmap_weeks FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "roadmap admin update" ON public.roadmap_weeks FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "roadmap admin delete" ON public.roadmap_weeks FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- =========================
-- GALLERY
-- =========================
CREATE TABLE public.gallery_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL DEFAULT 'General',
  description text,
  file_path text NOT NULL,
  file_name text NOT NULL,
  file_size bigint NOT NULL DEFAULT 0,
  mime_type text,
  media_type text NOT NULL DEFAULT 'image',
  uploaded_by uuid,
  uploaded_by_name text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.gallery_items TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.gallery_items TO authenticated;
GRANT ALL ON public.gallery_items TO service_role;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "gallery public read" ON public.gallery_items FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "gallery admin insert" ON public.gallery_items FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "gallery admin update" ON public.gallery_items FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "gallery admin delete" ON public.gallery_items FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE INDEX gallery_created_idx ON public.gallery_items (created_at DESC);
CREATE INDEX gallery_category_idx ON public.gallery_items (category);

-- =========================
-- NOTIFICATIONS
-- =========================
CREATE TABLE public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  message text,
  type text NOT NULL DEFAULT 'info',
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.notifications TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.notifications TO authenticated;
GRANT ALL ON public.notifications TO service_role;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "notifications public read" ON public.notifications FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "notifications admin write" ON public.notifications FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- =========================
-- DOCUMENTS ENHANCEMENTS
-- =========================
ALTER TABLE public.documents ADD COLUMN IF NOT EXISTS version text NOT NULL DEFAULT '1.0';
CREATE INDEX IF NOT EXISTS documents_week_idx ON public.documents (week_number);
CREATE INDEX IF NOT EXISTS documents_type_idx ON public.documents (document_type);
CREATE INDEX IF NOT EXISTS activity_logs_created_idx ON public.activity_logs (created_at DESC);

-- Allow authenticated admins to append activity entries
DROP POLICY IF EXISTS "activity admin insert" ON public.activity_logs;
CREATE POLICY "activity admin insert" ON public.activity_logs FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
GRANT INSERT ON public.activity_logs TO authenticated;

-- =========================
-- updated_at triggers
-- =========================
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;
REVOKE ALL ON FUNCTION public.set_updated_at() FROM PUBLIC;

CREATE TRIGGER members_updated_at BEFORE UPDATE ON public.members FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER project_updated_at BEFORE UPDATE ON public.project_details FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER roadmap_updated_at BEFORE UPDATE ON public.roadmap_weeks FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER gallery_updated_at BEFORE UPDATE ON public.gallery_items FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =========================
-- STORAGE POLICIES (gallery bucket created via tooling)
-- =========================
DROP POLICY IF EXISTS "gallery public read objects" ON storage.objects;
CREATE POLICY "gallery public read objects" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'gallery');
DROP POLICY IF EXISTS "gallery admin insert objects" ON storage.objects;
CREATE POLICY "gallery admin insert objects" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'gallery' AND public.has_role(auth.uid(), 'admin'));
DROP POLICY IF EXISTS "gallery admin update objects" ON storage.objects;
CREATE POLICY "gallery admin update objects" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'gallery' AND public.has_role(auth.uid(), 'admin'));
DROP POLICY IF EXISTS "gallery admin delete objects" ON storage.objects;
CREATE POLICY "gallery admin delete objects" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'gallery' AND public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "documents admin insert objects" ON storage.objects;
CREATE POLICY "documents admin insert objects" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'documents' AND public.has_role(auth.uid(), 'admin'));
DROP POLICY IF EXISTS "documents admin update objects" ON storage.objects;
CREATE POLICY "documents admin update objects" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'documents' AND public.has_role(auth.uid(), 'admin'));
DROP POLICY IF EXISTS "documents admin delete objects" ON storage.objects;
CREATE POLICY "documents admin delete objects" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'documents' AND public.has_role(auth.uid(), 'admin'));

-- =========================
-- SEED CONTENT
-- =========================
INSERT INTO public.members (name, role, department, email, linkedin_url, initials, hue, member_group, responsibilities, sort_order) VALUES
('Chandrasekhar Siddabattula', 'Coach (Program)', 'Program Leadership', 'chandrasekhar.siddabattula@missionmavericks.dev', 'https://www.linkedin.com/', 'CS', 264, 'leadership', '{"Program governance","Delivery coaching"}', 1),
('Thiyagarajan Mani', 'Team Mentor', 'Engineering Mentorship', 'thiyagarajan.mani@missionmavericks.dev', 'https://www.linkedin.com/', 'TM', 300, 'leadership', '{"Technical mentorship","Architecture review"}', 2),
('Pavithra Aruchamy', 'Scrum Lead', 'Agile Delivery', 'pavithra.aruchamy@missionmavericks.dev', 'https://www.linkedin.com/', 'PA', 210, 'leadership', '{"Sprint facilitation","Innovation & Presentation Lead"}', 3),
('Dharani Veerapathiran', 'Business Analysis Lead', 'Business Analysis', 'dharani.veerapathiran@missionmavericks.dev', 'https://www.linkedin.com/', 'DV', 264, 'core', '{"Business Analysis Lead","Data & Analytics Lead"}', 1),
('Isha Subash', 'Business Analyst', 'Business Analysis', 'isha.subash@missionmavericks.dev', 'https://www.linkedin.com/', 'IS', 300, 'core', '{"Business Analysis Lead","Data & Analytics Lead"}', 2),
('Pavithra Aruchamy', 'Innovation & Presentation Lead', 'Agile Delivery', 'pavithra.aruchamy@missionmavericks.dev', 'https://www.linkedin.com/', 'PA', 210, 'core', '{"Innovation & Presentation Lead"}', 3),
('Dharun Krishna Manoharan', 'Development Lead', 'Engineering', 'dharun.krishna@missionmavericks.dev', 'https://www.linkedin.com/', 'DM', 162, 'core', '{"Development Lead"}', 4),
('Jijendra Manoharan', 'Business Analysis Lead', 'Business Analysis', 'jijendra.manoharan@missionmavericks.dev', 'https://www.linkedin.com/', 'JM', 330, 'core', '{"Business Analysis Lead"}', 5),
('Varun Sai Addepalli', 'QA Lead', 'Quality Engineering', 'varun.sai@missionmavericks.dev', 'https://www.linkedin.com/', 'VA', 24, 'core', '{"QA Lead"}', 6),
('Monisha Murugavel', 'Development Lead', 'Engineering', 'monisha.murugavel@missionmavericks.dev', 'https://www.linkedin.com/', 'MM', 96, 'core', '{"Development Lead"}', 7),
('Desingh Kannan', 'QA Lead', 'Quality Engineering', 'desingh.kannan@missionmavericks.dev', 'https://www.linkedin.com/', 'DK', 240, 'core', '{"QA Lead"}', 8),
('Gowdham Gokul', 'Development Lead', 'Engineering', 'gowdham.gokul@missionmavericks.dev', 'https://www.linkedin.com/', 'GG', 285, 'core', '{"Development Lead"}', 9);

INSERT INTO public.project_details (name, category, status, progress, current_phase, problem, solution, features, technologies, outcomes, business_benefits, business_impact) VALUES
('Claim Shield Plus',
 'AI Powered Motor Insurance Claims Platform',
 'In Development',
 62,
 'Week 3 — Development',
 'Motor insurance claims are slowed down because customer information, vehicle history, policy terms and supporting documents live in disconnected systems. Manual verification increases cycle time, inflates leakage and produces inconsistent settlement decisions across handlers.',
 'Claim Shield Plus unifies vehicle, policy and claim data into one intelligent workspace. It guides first notification of loss, validates supporting documents with AI, scores claim readiness and fraud risk, and recommends a settlement decision with explainable evidence for every recommendation.',
 '{"360 degree vehicle and policy profile","Guided first notification of loss","AI document validation and OCR extraction","Claim readiness score","Fraud and risk assessment","Explainable settlement recommendation","Straight-through processing rules","Claims operations dashboard"}',
 '{"React","TypeScript","Tailwind CSS","ASP.NET Core Web API","Supabase Authentication","Supabase Database","Supabase Storage","AI Engine","REST API"}',
 '{"Faster claim cycle time","Higher document quality at first submission","Reduced manual verification effort","Consistent settlement decisions","Improved policyholder experience"}',
 '{"Lower claims operating cost per file","Reduced claims leakage through earlier fraud signals","Improved regulatory auditability with explainable decisions","Higher customer retention through faster settlement","Scalable capacity without proportional headcount"}',
 'Claim Shield Plus targets a measurable reduction in average settlement time and manual touchpoints per claim, while giving claims leadership a single operational view of pipeline, risk exposure and handler performance.');

INSERT INTO public.roadmap_weeks (week_number, title, focus_items, deliverables, progress, status) VALUES
(1, 'Planning', '{"Planning","Requirement Gathering","Technology Discussion"}', '{"Requirement backlog","Technology decision record","Team charter"}', 100, 'completed'),
(2, 'Research', '{"Research","Problem Finalization","Architecture Design"}', '{"Research findings","Finalised problem statement","Architecture diagram"}', 100, 'completed'),
(3, 'Build', '{"Frontend Development","Backend Development","Supabase Integration"}', '{"Frontend application","API services","Supabase database and storage integration"}', 65, 'in-progress'),
(4, 'Release', '{"Testing","Bug Fixing","Review","Final Demonstration"}', '{"Test report","Defect closure log","Final demonstration deck"}', 0, 'upcoming');