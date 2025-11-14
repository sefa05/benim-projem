import { createClient } from '@supabase/supabase-js'

// İstemci tarafı için basit Supabase helper
export function getBrowserSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  if (!url || !key) return null as any
  return createClient(url, key)
}

// Sunucu tarafı helper: servis rol anahtarı varsa onu, yoksa anon anahtar kullanır.
// Not: Sunucu tarafında kullanıcı bazlı oturum doğrulaması yapacaksanız
// cookie/authorization token okumayı ve token'ı client'a set etmeyi ayrıca eklemelisiniz.
export function getServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const key = process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  if (!url || !key) return null as any
  return createClient(url, key)
}
