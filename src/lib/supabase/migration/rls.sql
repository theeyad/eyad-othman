-- ============================================================================
-- 1. ROW LEVEL SECURITY (RLS) POLICIES — DATABASE TABLES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;

-- ----------------------------------------------------------------------------
-- Projects Policies
-- ----------------------------------------------------------------------------
CREATE POLICY "Allow public read access on projects"
ON projects FOR SELECT TO public
USING (true);

CREATE POLICY "Allow authenticated full access on projects"
ON projects FOR ALL TO authenticated
USING (true)
WITH CHECK (true);

-- ----------------------------------------------------------------------------
-- Project Images Policies
-- ----------------------------------------------------------------------------
CREATE POLICY "Allow public read access on project_images"
ON project_images FOR SELECT TO public
USING (true);

CREATE POLICY "Allow authenticated full access on project_images"
ON project_images FOR ALL TO authenticated
USING (true)
WITH CHECK (true);

-- ----------------------------------------------------------------------------
-- Experience Policies
-- ----------------------------------------------------------------------------
CREATE POLICY "Allow public read access on experience"
ON experience FOR SELECT TO public
USING (true);

CREATE POLICY "Allow authenticated full access on experience"
ON experience FOR ALL TO authenticated
USING (true)
WITH CHECK (true);

-- ----------------------------------------------------------------------------
-- Profile Policies
-- ----------------------------------------------------------------------------
CREATE POLICY "Allow public read access on profile"
ON profile FOR SELECT TO public
USING (true);

CREATE POLICY "Allow authenticated full access on profile"
ON profile FOR ALL TO authenticated
USING (true)
WITH CHECK (true);

-- ============================================================================
-- 2. ROW LEVEL SECURITY (RLS) POLICIES — STORAGE BUCKETS
-- ============================================================================

-- ----------------------------------------------------------------------------
-- project_media bucket policies
-- ----------------------------------------------------------------------------
CREATE POLICY "Allow public read access on project_media"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'project_media');

CREATE POLICY "Allow authenticated insert on project_media"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'project_media');

CREATE POLICY "Allow authenticated update on project_media"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'project_media');

CREATE POLICY "Allow authenticated delete on project_media"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'project_media');

-- ----------------------------------------------------------------------------
-- profile_media bucket policies
-- ----------------------------------------------------------------------------
CREATE POLICY "Allow public read access on profile_media"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'profile_media');

CREATE POLICY "Allow authenticated insert on profile_media"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'profile_media');

CREATE POLICY "Allow authenticated update on profile_media"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'profile_media');

CREATE POLICY "Allow authenticated delete on profile_media"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'profile_media');

