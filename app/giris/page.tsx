'use client'
import React, { useState } from 'react'
import { getBrowserSupabase } from '../../lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function GirisPage() {
  const supabase = getBrowserSupabase()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) {
      setError('Giriş başarısız: ' + (error.message || 'Bir hata oluştu, lütfen tekrar deneyin.'))
    } else {
      router.push('/panel')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-semibold mb-4 text-center">Çamlıca Diş Kliniği – Sesli Asistan Paneli</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm">E-posta</label>
            <input required type="email" value={email} onChange={(e)=>setEmail(e.target.value)}
              className="w-full mt-1 p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm">Şifre</label>
            <input required type="password" value={password} onChange={(e)=>setPassword(e.target.value)}
              className="w-full mt-1 p-2 border rounded" />
          </div>
          {error && <div className="text-sm text-red-600">{error}</div>}
          <div className="flex items-center justify-between">
            <button disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
              {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
