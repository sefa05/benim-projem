import React from 'react'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { cookies, headers } from 'next/headers'

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerComponentSupabaseClient({ headers, cookies })
  const { data } = await supabase.auth.getSession()
  const user = data.session?.user

  return (
    <div className="min-h-screen flex">
      <Sidebar userEmail={user?.email ?? null} />
      <div className="flex-1 p-6">
        <Header title="Çamlıca Diş Kliniği – Sesli Asistan Paneli" />
        <main className="mt-6">
          {children}
        </main>
      </div>
    </div>
  )
}
