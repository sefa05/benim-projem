'use client'
import React, { useState } from 'react'
import { getBrowserSupabase } from '../../../../lib/supabaseClient'
import { useVoiceAssistant } from '../../../../lib/useVoiceAssistant'

export default function SesliAsistanPage() {
  const supabase = getBrowserSupabase()
  const [assistantId, setAssistantId] = useState(process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID || '')
  const { startVoiceAssistant, stopVoiceAssistant } = useVoiceAssistant()

  const start = async () => {
    startVoiceAssistant()
  }

  return (
    <div>
      <h2 className="text-lg font-semibold">Sesli Asistan</h2>
      <div className="mt-4 bg-white p-4 rounded shadow">
        <p>Sesli asistan, hastaların aramalarına yanıt verebilen veya randevu alma işlemlerini kolaylaştıran bir dış servistir. Aşağıdaki alanlara Vapi yapılandırmanızı girin.</p>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm">Vapi Assistant ID</label>
            <input value={assistantId} onChange={(e)=>setAssistantId(e.target.value)} className="w-full p-2 border rounded" placeholder="NEXT_PUBLIC_VAPI_ASSISTANT_ID" />
            <p className="text-xs text-gray-500 mt-1">Gerçek id'yi .env.local içinde NEXT_PUBLIC_VAPI_ASSISTANT_ID olarak ayarlayın.</p>
          </div>
          <div>
            <label className="block text-sm">API Key</label>
            <input placeholder="(Gizli - sadece sunucu tarafında kullanılmalı)" className="w-full p-2 border rounded" disabled />
            <p className="text-xs text-gray-500 mt-1">API anahtarı sunucu tarafında saklanmalıdır (ör. SUPABASE servis rol anahtarı veya Vapi anahtarı).</p>
          </div>
        </div>

        <div className="mt-4">
          <button onClick={start} className="bg-green-600 text-white px-3 py-2 rounded">Sesli Asistanı Başlat</button>
          <button onClick={stopVoiceAssistant} className="ml-2 bg-gray-200 px-3 py-2 rounded">Durdur</button>
        </div>

        <div className="mt-4 p-3 bg-gray-50 rounded">
          <p className="text-sm">VAPI entegrasyon notları:</p>
          <ul className="list-disc ml-5 text-sm">
            <li>Gerçek entegrasyon için Vapi'nin script tag'ini <code>{'<script src="https://cdn.vapi.ai/vapi.js"></script>'}</code> veya React SDK'sını layout'a ekleyin.</li>
            <li>Örnek (pseudo-kod):
              <pre className="text-xs bg-white p-2 rounded mt-1">{`/* 
<script src="https://cdn.vapi.ai/vapi.js"></script>
Vapi.init({ assistantId: process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID, apiKey: process.env.VAPI_API_KEY }); 
Vapi.start();
*/`}</pre>
            </li>
            <li>Bu uygulamada startVoiceAssistant() mock olarak konsola ve loglar tablosuna kayıt yapar.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
