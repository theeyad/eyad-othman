-- ============================================================================
-- AUTOMATIC updated_at TIMESTAMP FUNCTION & TRIGGERS
-- ============================================================================

-- Function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for projects.updated_at
DROP TRIGGER IF EXISTS set_projects_updated_at ON projects;
CREATE TRIGGER set_projects_updated_at
BEFORE UPDATE ON projects
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Trigger for experience.updated_at
DROP TRIGGER IF EXISTS set_experience_updated_at ON experience;
CREATE TRIGGER set_experience_updated_at
BEFORE UPDATE ON experience
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
