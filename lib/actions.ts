'use server'

import { createClient } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder',
  {
    auth: {
      persistSession: false,
    },
  }
)

export async function getUser() {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) return null
  return user
}

export async function signIn(prevState: any, formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: 'Email atau password salah!' }
  }

  revalidatePath('/admin')
  return { success: true }
}

export async function signOut() {
  await supabase.auth.signOut()
  revalidatePath('/admin')
}

export async function getComments() {
  const { data, error } = await supabase
    .from('comments')
    .select('id, name, message, avatar_seed, created_at')
    .order('created_at', { ascending: false })
    .limit(50)

  if (error) {
    console.error('Error fetching comments:', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code
    })
    return { data: [], error: error.message }
  }

  return { data: data || [], error: null }
}

export async function addComment(formData: FormData) {
  const name = formData.get('name') as string
  const message = formData.get('message') as string

  if (!name?.trim() || !message?.trim()) {
    return { error: 'Nama dan komentar wajib diisi!' }
  }

  if (name.trim().length < 2) {
    return { error: 'Nama minimal 2 karakter!' }
  }

  if (message.trim().length < 5) {
    return { error: 'Komentar minimal 5 karakter!' }
  }

  const avatarSeed = name.trim().toLowerCase().replace(/\s+/g, '-') + '-' + Date.now()

  const { error } = await supabase.from('comments').insert([
    {
      name: name.trim(),
      message: message.trim(),
      avatar_seed: avatarSeed,
    },
  ])

  if (error) {
    console.error('Error inserting comment:', error)
    return { error: 'Gagal mengirim komentar. Coba lagi!' }
  }

  revalidatePath('/')
  return { success: true }
}

export async function deleteComment(id: string) {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { error: 'Anda harus login sebagai admin!' }
  }

  const { error } = await supabase.from('comments').delete().eq('id', id)

  if (error) {
    return { error: 'Gagal menghapus komentar.' }
  }

  revalidatePath('/')
  revalidatePath('/admin')
  return { success: true }
}
