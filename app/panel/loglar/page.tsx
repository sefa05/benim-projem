import React from 'react'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export default async function LoglarPage() {
  const supabase = createServerComponentClient({ cookies })
  const { data } = await supabase.from('loglar').select('*').order('tarih_saat', { ascending: false }).limit(200)

  return (
    <div>
      <h2 className="text-lg font-semibold">Loglar</h2>
      <div className="mt-4 bg-white p-4 rounded shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-600">
                <th className="p-2">Tarih & Saat</th>
                <th className="p-2">Tip</th>
                <th className="p-2">Mesaj</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((l:any) => (
                <tr key={l.id} className="border-t">
                  <td className="p-2">{new Date(l.tarih_saat).toLocaleString('tr-TR')}</td>
                  <td className="p-2">{l.tip}</td>
                  <td className="p-2">{l.mesaj}</td>
                </tr>
              )) ?? <tr><td colSpan={3} className="p-4">Kayıt yok</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
