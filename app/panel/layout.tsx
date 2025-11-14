import React from 'react'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  // Geçici: auth-helpers kaldırıldı, bu yüzden sunucu tarafı oturum kontrolünü
  // burada atlıyoruz. Daha tam bir migration isterseniz, cookie'den token okuyup
  // user bilgisi almak için yardımcı ekleyebilirim.
  return (
    <div className="min-h-screen flex">
      <Sidebar userEmail={null} />
      <div className="flex-1 p-6">
        <Header title="Çamlıca Diş Kliniği – Sesli Asistan Paneli" />
        <main className="mt-6">
          {children}
        </main>
      </div>
    </div>
  )
}
