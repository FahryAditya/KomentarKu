-- ============================================
-- SETUP DATABASE SUPABASE - RUANG KOMENTAR
-- Jalankan SQL ini di Supabase SQL Editor
-- ============================================

-- 1. Buat tabel comments
CREATE TABLE IF NOT EXISTS comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL CHECK (char_length(name) >= 2 AND char_length(name) <= 50),
  message TEXT NOT NULL CHECK (char_length(message) >= 5 AND char_length(message) <= 500),
  avatar_seed TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Aktifkan Row Level Security (RLS)
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Semua orang bisa membaca komentar
CREATE POLICY "Anyone can read comments"
  ON comments FOR SELECT
  USING (true);

-- 4. Policy: Semua orang bisa menambah komentar
CREATE POLICY "Anyone can insert comments"
  ON comments FOR INSERT
  WITH CHECK (true);

-- 5. Policy: Semua orang bisa menghapus komentar (ubah sesuai kebutuhan)
CREATE POLICY "Anyone can delete comments"
  ON comments FOR DELETE
  USING (true);

-- 6. Index untuk performa query
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at DESC);

-- 7. Verifikasi tabel berhasil dibuat
SELECT * FROM comments LIMIT 1;
