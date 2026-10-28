-- ============================================================================
-- 1. ROW LEVEL SECURITY (RLS) POLICIES — DATABASE TABLES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;

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

-- ============================================================================
-- 2. ROW LEVEL SECURITY (RLS) POLICIES — STORAGE (project_media bucket)
-- ============================================================================

-- Allow public viewing of images in project_media bucket
CREATE POLICY "Allow public read access on project_media"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'project_media');

-- Allow authenticated users (admin) to upload images to project_media bucket
CREATE POLICY "Allow authenticated insert on project_media"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'project_media');

-- Allow authenticated users (admin) to update images in project_media bucket
CREATE POLICY "Allow authenticated update on project_media"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'project_media');

-- Allow authenticated users (admin) to delete images from project_media bucket
CREATE POLICY "Allow authenticated delete on project_media"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'project_media');
