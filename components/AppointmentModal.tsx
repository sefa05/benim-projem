'use client'
import React, { useState, useEffect } from 'react'
import { getBrowserSupabase } from '../lib/supabaseClient'

type Props = {
  editItem: any | null
  close: () => void
}

export default function AppointmentModal({ editItem, close }: Props) {
  const supabase = getBrowserSupabase()
  const [hasta_adi, setHastaAdi] = useState('')
  const [telefon, setTelefon] = useState('')
  const [tarih_saat, setTarihSaat] = useState('')
  const [durum, setDurum] = useState('beklemede')
  const [notlar, setNotlar] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(()=>{
    if (editItem) {
      setHastaAdi(editItem.hasta_adi || '')
      setTelefon(editItem.telefon || '')
      setTarihSaat(editItem.tarih_saat ? new Date(editItem.tarih_saat).toISOString().slice(0,16) : '')
      setDurum(editItem.durum || 'beklemede')
      setNotlar(editItem.notlar || '')
    } else {
      setHastaAdi(''); setTelefon(''); setTarihSaat(''); setDurum('beklemede'); setNotlar('')
    }
  }, [editItem])

  const handleSave = async () => {
    if (!hasta_adi || !telefon || !tarih_saat) {
      alert('Lütfen zorunlu alanları doldurun.')
      return
    }
    setSaving(true)
    const payload = {
      hasta_adi, telefon, notlar, tarih_saat: new Date(tarih_saat).toISOString(), durum
    }

    try {
      if (editItem) {
        const { error } = await supabase.from('randevular').update(payload).eq('id', editItem.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from('randevular').insert(payload)
        if (error) throw error
      }
      close()
    } catch (err) {
      console.error(err)
      alert('Bir hata oluştu, lütfen tekrar deneyin.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-full max-w-lg">
        <h3 className="text-lg font-semibold mb-4">{editItem ? 'Randevuyu Düzenle' : 'Yeni Randevu Ekle'}</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm">Hasta Adı*</label>
            <input value={hasta_adi} onChange={e=>setHastaAdi(e.target.value)} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm">Telefon*</label>
            <input value={telefon} onChange={e=>setTelefon(e.target.value)} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm">Tarih & Saat*</label>
            <input type="datetime-local" value={tarih_saat} onChange={e=>setTarihSaat(e.target.value)} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm">Durum</label>
            <select value={durum} onChange={e=>setDurum(e.target.value)} className="w-full p-2 border rounded">
              <option value="beklemede">Beklemede</option>
              <option value="onayli">Onaylı</option>
              <option value="iptal">İptal</option>
            </select>
          </div>
          <div>
            <label className="block text-sm">Notlar</label>
            <textarea value={notlar} onChange={e=>setNotlar(e.target.value)} className="w-full p-2 border rounded" />
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button onClick={close} className="px-3 py-2 rounded border">Vazgeç</button>
          <button onClick={handleSave} disabled={saving} className="px-3 py-2 rounded bg-blue-600 text-white">{saving ? 'Kaydediliyor...' : 'Kaydet'}</button>
        </div>
      </div>
    </div>
  )
}
