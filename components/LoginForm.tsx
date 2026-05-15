'use client'

import { useActionState } from 'react'
import { signIn } from '@/lib/actions'
import Link from 'next/link'

export default function LoginForm() {
  // state will hold the return value from signIn { error, success }
  const [state, formAction, isPending] = useActionState(signIn, null)

  return (
    <div className="form-body">
      <form action={formAction} className="comments-section">
        {state?.error && (
          <div className="alert alert-error" style={{ marginBottom: '16px' }}>
            <span>⚠️</span> {state.error}
          </div>
        )}
        
        <div className="input-group">
          <label htmlFor="email" className="input-label">
            <span className="label-icon">📧</span> Email Address
          </label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            required 
            placeholder="admin@example.com"
            className="input-field"
            disabled={isPending}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password" className="input-label">
            <span className="label-icon">🔑</span> Password
          </label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            required 
            placeholder="••••••••"
            className="input-field"
            disabled={isPending}
          />
        </div>
        <button type="submit" className="submit-btn" disabled={isPending}>
          {isPending ? <span className="spinner"></span> : 'Sign In'}
        </button>
      </form>
      
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Link href="/" className="back-link">← Back to Public Page</Link>
      </div>
    </div>
  )
}
