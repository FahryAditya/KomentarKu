import { getComments } from '@/lib/actions'
import CommentForm from '@/components/CommentForm'
import CommentList from '@/components/CommentList'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const revalidate = 30 // Cache data for 30 seconds to save database resources

export default async function Home() {
  const { data: comments, error } = await getComments()

  return (
    <main className="page-wrapper">
      <div className="bg-blob blob-1" />
      <div className="bg-blob blob-2" />
      <div className="bg-blob blob-3" />

      <div className="container">
        {error && (
          <div style={{ 
            padding: '1rem', 
            margin: '1rem 0', 
            backgroundColor: '#fee2e2', 
            color: '#b91c1c', 
            borderRadius: '0.5rem',
            border: '1px solid #fecaca'
          }}>
            <strong>Database Error:</strong> {error}
            <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>
              Pastikan Anda sudah menjalankan SQL setup di dashboard Supabase.
            </p>
          </div>
        )}
        <header className="hero">
          <div className="hero-badge-group">
            <div className="hero-badge">
              <span className="pulse-dot" />
              Live &amp; Real-time
            </div>
            <Link href="/admin" className="admin-link-badge">
              🔐 Admin Login
            </Link>
          </div>
          <h1 className="hero-title">
            Ruang
            <span className="gradient-text"> Komentar</span>
          </h1>
          <p className="hero-subtitle">
            Tempat berbagi pikiran, cerita, dan inspirasi bersama komunitas
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">{comments.length}</span>
              <span className="stat-label">Komentar</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-number">
                {new Set(comments.map((c: any) => c.name)).size}
              </span>
              <span className="stat-label">Kontributor</span>
            </div>
          </div>
        </header>

        <div className="main-grid">
          <div className="form-column">
            <CommentForm />
          </div>
          <div className="comments-column">
            <CommentList comments={comments} isAdmin={false} />
          </div>
        </div>

        <footer className="page-footer">
          <p> Di Buat Oleh Mimin Artemis</p>
        </footer>
      </div>
    </main>
  )
}
