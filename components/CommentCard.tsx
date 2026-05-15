'use client'

import { useState, useTransition } from 'react'
import { deleteComment } from '@/lib/actions'
import { formatDistanceToNow } from 'date-fns'
import { id } from 'date-fns/locale'
import type { Comment } from '@/lib/supabase'

function getAvatarBg(name: string) {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
    '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F',
    '#BB8FCE', '#85C1E9', '#F0B27A', '#82E0AA',
  ]
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export default function CommentCard({ 
  comment, 
  isAdmin = false 
}: { 
  comment: Comment, 
  isAdmin?: boolean 
}) {
  const [showDelete, setShowDelete] = useState(false)
  const [isPending, startTransition] = useTransition()
  const avatarBg = getAvatarBg(comment.name)
  const initials = getInitials(comment.name)

  const timeAgo = formatDistanceToNow(new Date(comment.created_at), {
    addSuffix: true,
    locale: id,
  })

  const handleDelete = () => {
    startTransition(async () => {
      await deleteComment(comment.id)
    })
  }

  return (
    <div
      className={`comment-card ${isPending ? 'deleting' : ''}`}
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      <div className="comment-avatar" style={{ backgroundColor: avatarBg }}>
        {initials}
      </div>

      <div className="comment-content">
        <div className="comment-header">
          <span className="comment-name">{comment.name}</span>
          <span className="comment-time">{timeAgo}</span>
        </div>
        <p className="comment-message">{comment.message}</p>
      </div>

      {isAdmin && showDelete && (
        <button
          className="delete-btn"
          onClick={handleDelete}
          disabled={isPending}
          title="Hapus komentar"
        >
          {isPending ? '⏳' : '🗑️'}
        </button>
      )}
    </div>
  )
}
