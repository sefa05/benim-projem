import React from 'react'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'

export default async function PanelPage() {
  const supabase = createServerComponentClient({ cookies })

  const todayStart = new Date()
  todayStart.setHours(0,0,0,0)
  const todayEnd = new Date()
  todayEnd.setHours(23,59,59,999)

  const { data: todayCountData } = await supabase
    .from('randevular')
    .select('id', { count: 'exact' })
    .gte('tarih_saat', todayStart.toISOString())
    .lte('tarih_saat', todayEnd.toISOString())

  const { data: confirmedData } = await supabase
    .from('randevular')
    .select('id', { count: 'exact' })
    .eq('durum', 'onayli')

  const { data: pendingData } = await supabase
    .from('randevular')
    .select('id', { count: 'exact' })
    .eq('durum', 'beklemede')

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500">Bugünkü Randevu Sayısı</div>
          <div className="text-2xl font-semibold mt-2">{todayCountData?.length ?? 0}</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500">Onaylı Randevular</div>
          <div className="text-2xl font-semibold mt-2">{confirmedData?.length ?? 0}</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500">Bekleyen Randevular</div>
          <div className="text-2xl font-semibold mt-2">{pendingData?.length ?? 0}</div>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex gap-2">
          <Link className="bg-blue-600 text-white px-3 py-2 rounded" href="/panel/randevular">Randevular</Link>
          <Link className="bg-gray-200 px-3 py-2 rounded" href="/panel/sesli-asistan">Sesli Asistan</Link>
          <Link className="bg-gray-200 px-3 py-2 rounded" href="/panel/loglar">Loglar</Link>
        </div>

        <div className="mt-4 bg-white p-4 rounded shadow">
          <p>Panel ana sayfası. Sol menüden Randevular, Sesli Asistan veya Loglar bölümüne geçiş yapabilirsiniz.</p>
        </div>
      </div>
    </div>
  )
}
