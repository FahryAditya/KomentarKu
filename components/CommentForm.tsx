'use client'

import { useState, useRef, useTransition } from 'react'
import { addComment } from '@/lib/actions'

export default function CommentForm() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isPending, startTransition] = useTransition()
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    const formData = new FormData(formRef.current!)

    startTransition(async () => {
      const result = await addComment(formData)
      if (result?.error) {
        setError(result.error)
      } else {
        setSuccess(true)
        setName('')
        setMessage('')
        formRef.current?.reset()
        setTimeout(() => setSuccess(false), 3000)
      }
    })
  }

  const charCount = message.length
  const maxChars = 500

  return (
    <div className="form-card">
      <div className="form-header">
        <div className="form-icon">✍️</div>
        <div>
          <h2 className="form-title">Tinggalkan Komentar</h2>
          <p className="form-subtitle">Bagikan pikiran & ceritamu</p>
        </div>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="form-body">
        <div className="input-group">
          <label className="input-label" htmlFor="name">
            <span className="label-icon">👤</span> Nama Kamu
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Masukkan namamu..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
            maxLength={50}
            required
            disabled={isPending}
          />
          <div className="input-hint">{name.length}/50 karakter</div>
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="message">
            <span className="label-icon">💬</span> Komentar
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Tulis komentarmu di sini..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="textarea-field"
            rows={4}
            maxLength={maxChars}
            required
            disabled={isPending}
          />
          <div className={`input-hint ${charCount > maxChars * 0.9 ? 'warning' : ''}`}>
            {charCount}/{maxChars} karakter
          </div>
        </div>

        {error && (
          <div className="alert alert-error">
            <span>⚠️</span> {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success">
            <span>🎉</span> Komentar berhasil dikirim!
          </div>
        )}

        <button
          type="submit"
          className={`submit-btn ${isPending ? 'loading' : ''}`}
          disabled={isPending}
        >
          {isPending ? (
            <>
              <span className="spinner" /> Mengirim...
            </>
          ) : (
            <>
              <span>🚀</span> Kirim Komentar
            </>
          )}
        </button>
      </form>
    </div>
  )
}
