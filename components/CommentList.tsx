import CommentCard from './CommentCard'
import Link from 'next/link'
import type { Comment } from '@/lib/supabase'

export default function CommentList({ 
  comments, 
  isAdmin = false 
}: { 
  comments: Comment[], 
  isAdmin?: boolean 
}) {
  if (comments.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🌟</div>
        <h3 className="empty-title">Belum ada komentar</h3>
        <p className="empty-text">Jadilah yang pertama berkomentar!</p>
      </div>
    )
  }

  return (
    <div className="comments-section">
      <div className="comments-header">
        <h2 className="comments-title">
          💬 Semua Komentar
          <span className="comment-badge">{comments.length}</span>
        </h2>
        {!isAdmin && (
          <Link href="/admin" className="admin-link-badge" style={{ fontSize: '11px', padding: '4px 12px' }}>
            Moderasi 🔐
          </Link>
        )}
      </div>
      <div className="comments-list">
        {comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} isAdmin={isAdmin} />
        ))}
      </div>
    </div>
  )
}
