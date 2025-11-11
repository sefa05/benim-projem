'use client'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getBrowserSupabase } from '../lib/supabaseClient'

export default function Sidebar({ userEmail }: { userEmail: string | null }) {
  const supabase = getBrowserSupabase()
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/giris')
  }

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-4 hidden md:block">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Çamlıca Diş Kliniği</h2>
        <p className="text-sm text-gray-600">Sesli Asistan Paneli</p>
        {userEmail && <p className="mt-2 text-xs text-gray-500">Giriş: {userEmail}</p>}
      </div>

      <nav className="space-y-2">
        <Link href="/panel"><a className="block py-2 px-3 rounded hover:bg-gray-100">Panel</a></Link>
        <Link href="/panel/randevular"><a className="block py-2 px-3 rounded hover:bg-gray-100">Randevular</a></Link>
        <Link href="/panel/sesli-asistan"><a className="block py-2 px-3 rounded hover:bg-gray-100">Sesli Asistan</a></Link>
        <Link href="/panel/loglar"><a className="block py-2 px-3 rounded hover:bg-gray-100">Loglar</a></Link>
        <button onClick={handleSignOut} className="w-full text-left py-2 px-3 rounded hover:bg-gray-100 text-red-600">Çıkış Yap</button>
      </nav>
    </aside>
  )
}
