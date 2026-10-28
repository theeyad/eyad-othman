-- ============================================================================
-- 1. PROJECTS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  category TEXT NOT NULL,
  category_ar TEXT NOT NULL,
  description TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  long_description TEXT NOT NULL,
  long_description_ar TEXT NOT NULL,
  tech_stack TEXT[] NOT NULL DEFAULT '{}',
  highlights TEXT[] NOT NULL DEFAULT '{}',
  highlights_ar TEXT[] NOT NULL DEFAULT '{}',
  live_url TEXT,
  github_url TEXT,
  featured BOOLEAN DEFAULT false,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================================
-- 2. PROJECT IMAGES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS project_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  position INT DEFAULT 0,
  is_primary BOOLEAN DEFAULT false,
  alt_text TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================================
-- 3. EXPERIENCE TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS experience (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role TEXT NOT NULL,
  role_ar TEXT NOT NULL,
  company TEXT NOT NULL,
  company_url TEXT,
  type TEXT NOT NULL,          -- e.g., "Freelance", "Full-time"
  type_ar TEXT NOT NULL,       -- e.g., "عمل حر", "دوام كامل"
  start_date DATE NOT NULL,
  end_date DATE,               -- NULL if currently working
  is_current BOOLEAN DEFAULT false,
  description TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================================
-- 4. PERFORMANCE INDEXES
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured, display_order);
CREATE INDEX IF NOT EXISTS idx_project_images_project_id ON project_images(project_id);
CREATE INDEX IF NOT EXISTS idx_project_images_position ON project_images(project_id, position);
CREATE INDEX IF NOT EXISTS idx_experience_order ON experience(display_order);
CREATE INDEX IF NOT EXISTS idx_experience_dates ON experience(start_date DESC);

-- ============================================================================
-- 5. PROFILE / SETTINGS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS profile (
  id INT PRIMARY KEY DEFAULT 1,
  avatar_url TEXT NOT NULL DEFAULT '/me.webp',
  resume_url TEXT NOT NULL DEFAULT '/Eyad_Othman_Frontend.pdf',
  available_for_work BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT single_row CHECK (id = 1)
);

-- Seed initial default row
INSERT INTO profile (id, avatar_url, resume_url, available_for_work)
VALUES (1, '/me.webp', '/Eyad_Othman_Frontend.pdf', true)
ON CONFLICT (id) DO NOTHING;

