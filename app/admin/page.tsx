import { getComments, getUser, signOut } from '@/lib/actions'
import CommentList from '@/components/CommentList'
import LoginForm from '@/components/LoginForm'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function AdminPage() {
  const user = await getUser()
  const { data: comments } = await getComments()

  if (!user) {
    return (
      <main className="page-wrapper min-h-screen flex items-center justify-center">
        <div className="bg-blob blob-1" />
        <div className="bg-blob blob-2" />
        <div className="container" style={{ maxWidth: '440px' }}>
          <div className="login-card">
            <div className="form-header">
              <div className="form-icon">🔐</div>
              <div>
                <h2 className="form-title">Admin Login</h2>
                <p className="form-subtitle">Masuk untuk mengelola komentar</p>
              </div>
            </div>
            
            <LoginForm />
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="page-wrapper">
      <div className="bg-blob blob-1" />
      <div className="bg-blob blob-3" />
      <div className="container">
        <header className="hero">
          <div className="hero-badge">Administrator Panel</div>
          <h1 className="hero-title">
            Panel <span className="gradient-text">Moderasi</span>
          </h1>
          <p className="hero-subtitle">
            Kelola komentar komunitas dengan mudah dan cepat.
          </p>
          
          <div className="hero-stats" style={{ marginTop: '10px' }}>
            <div className="stat">
              <span className="stat-label">Logged in as</span>
              <span className="stat-number" style={{ fontSize: '16px' }}>{user.email}</span>
            </div>
            <div className="stat-divider" />
            <form action={signOut}>
              <button type="submit" className="submit-btn" style={{ padding: '8px 20px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)' }}>
                Logout
              </button>
            </form>
          </div>
        </header>

        <div className="main-grid" style={{ gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto' }}>
          <div className="comments-column">
            <CommentList comments={comments} isAdmin={true} />
          </div>
        </div>

        <footer className="page-footer">
          <Link href="/" className="back-link">← Kembali ke Halaman Publik</Link>
        </footer>
      </div>
    </main>
  )
}
