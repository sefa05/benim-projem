'use client'
import React from 'react'

export default function ConfirmDialog({ title, message, onConfirm, onCancel }:{ title:string, message:string, onConfirm:()=>void, onCancel:()=>void }) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-full max-w-md">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-2">{message}</p>
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onCancel} className="px-3 py-2 rounded border">Vazgeç</button>
          <button onClick={onConfirm} className="px-3 py-2 rounded bg-red-600 text-white">Sil</button>
        </div>
      </div>
    </div>
  )
}
