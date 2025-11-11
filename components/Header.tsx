import React from 'react'

export default function Header({ title }: { title: string }) {
  return (
    <header className="flex items-center justify-between">
      <h1 className="text-xl font-bold">{title}</h1>
      <div className="text-sm text-gray-600">Çamlıca Diş Kliniği</div>
    </header>
  )
}
