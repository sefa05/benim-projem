'use client'
import { getBrowserSupabase } from './supabaseClient'

export function useVoiceAssistant() {
  const supabase = getBrowserSupabase()

  const startVoiceAssistant = async () => {
    console.log('Sesli asistan başlatıldı (test modu).')
    try {
      await supabase.from('loglar').insert({ tip: 'sesli_asistan', mesaj: 'Sesli asistan başlatıldı (test modu).' })
    } catch (err) {
      console.error('Log eklenirken hata:', err)
    }
  }

  const stopVoiceAssistant = async () => {
    console.log('Sesli asistan durduruldu (test modu).')
    try {
      await supabase.from('loglar').insert({ tip: 'sesli_asistan', mesaj: 'Sesli asistan durduruldu (test modu).' })
    } catch (err) {
      console.error('Log eklenirken hata:', err)
    }
  }

  return { startVoiceAssistant, stopVoiceAssistant }
}
