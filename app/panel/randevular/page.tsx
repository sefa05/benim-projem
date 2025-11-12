'use client'
import React, { useEffect, useState } from 'react'
import { getBrowserSupabase } from '../../../lib/supabaseClient'
import AppointmentModal from '../../../components/AppointmentModal'
import ConfirmDialog from '../../../components/ConfirmDialog'

type Appointment = {
  id: string
  hasta_adi: string
  telefon: string
  notlar?: string
  tarih_saat: string
  durum: string
}

export default function RandevularPage() {
  const supabase = getBrowserSupabase()
  const [randevular, setRandevular] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(false)
  const [filterStatus, setFilterStatus] = useState<'Tümü'|'beklemede'|'onayli'|'iptal'>('Tümü')
  const [filterDate, setFilterDate] = useState<string>('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editItem, setEditItem] = useState<Appointment | null>(null)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [toDeleteId, setToDeleteId] = useState<string | null>(null)

  const fetchData = async () => {
    setLoading(true)
    let query = supabase.from('randevular').select('*')
    if (filterStatus !== 'Tümü') {
      query = query.eq('durum', filterStatus)
    }
    if (filterDate) {
      const dayStart = new Date(filterDate)
      dayStart.setHours(0,0,0,0)
      const dayEnd = new Date(filterDate)
      dayEnd.setHours(23,59,59,999)
      query = query.gte('tarih_saat', dayStart.toISOString()).lte('tarih_saat', dayEnd.toISOString())
    }
    const { data, error } = await query.order('tarih_saat', { ascending: true })
    setLoading(false)
    if (error) {
      console.error(error)
      alert('Bir hata oluştu, lütfen daha sonra tekrar deneyin.')
      return
    }
    setRandevular(data as Appointment[])
  }

  useEffect(() => { fetchData() }, [filterStatus, filterDate])

  const openNew = () => { setEditItem(null); setModalOpen(true) }
  const openEdit = (a: Appointment) => { setEditItem(a); setModalOpen(true) }
  const confirmDelete = (id: string) => { setToDeleteId(id); setConfirmOpen(true) }

  const doDelete = async () => {
    if (!toDeleteId) return
    const { error } = await supabase.from('randevular').delete().eq('id', toDeleteId)
    if (error) {
      alert('Silme işlemi başarısız.')
    } else {
      setRandevular(prev => prev.filter(r => r.id !== toDeleteId))
    }
    setConfirmOpen(false)
    setToDeleteId(null)
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Randevular</h2>
        <div>
          <button onClick={openNew} className="bg-green-600 text-white px-3 py-2 rounded">Yeni Randevu Ekle</button>
        </div>
      </div>

      <div className="mt-4 bg-white p-4 rounded shadow">
        <div className="flex gap-2 items-end">
          <div>
            <label className="block text-sm">Tarih</label>
            <input type="date" value={filterDate} onChange={(e)=>setFilterDate(e.target.value)} className="p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm">Durum</label>
            <select value={filterStatus} onChange={(e)=>setFilterStatus(e.target.value as any)} className="p-2 border rounded">
              <option value="Tümü">Tümü</option>
              <option value="beklemede">Beklemede</option>
              <option value="onayli">Onaylı</option>
              <option value="iptal">İptal</option>
            </select>
          </div>
          <div>
            <button onClick={fetchData} className="bg-blue-600 text-white px-3 py-2 rounded">Filtrele</button>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="text-left text-sm text-gray-600">
                <th className="p-2">Hasta Adı</th>
                <th className="p-2">Telefon</th>
                <th className="p-2">Tarih & Saat</th>
                <th className="p-2">Durum</th>
                <th className="p-2">Notlar</th>
                <th className="p-2">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {loading && <tr><td colSpan={6} className="p-4">Yükleniyor...</td></tr>}
              {!loading && randevular.length === 0 && <tr><td colSpan={6} className="p-4">Kayıt bulunamadı.</td></tr>}
              {randevular.map(r => (
                <tr key={r.id} className="border-t">
                  <td className="p-2">{r.hasta_adi}</td>
                  <td className="p-2">{r.telefon}</td>
                  <td className="p-2">{new Date(r.tarih_saat).toLocaleString('tr-TR')}</td>
                  <td className="p-2">{r.durum}</td>
                  <td className="p-2">{r.notlar}</td>
                  <td className="p-2">
                    <button onClick={()=>openEdit(r)} className="text-sm mr-2 px-2 py-1 bg-yellow-200 rounded">Düzenle</button>
                    <button onClick={()=>confirmDelete(r.id)} className="text-sm px-2 py-1 bg-red-200 rounded">Sil</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && <AppointmentModal close={()=>{setModalOpen(false); fetchData()}} editItem={editItem} />}
      {confirmOpen && <ConfirmDialog title="Randevu silinecek" message="Randevuyu silmek istediğinize emin misiniz?" onConfirm={doDelete} onCancel={()=>setConfirmOpen(false)} />}
    </div>
  )
}
