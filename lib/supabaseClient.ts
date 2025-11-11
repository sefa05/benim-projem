import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { createClient } from '@supabase/supabase-js'

// İstemci tarafı için helper
export function getBrowserSupabase() {
  return createBrowserSupabaseClient()
}

// Sunucu tarafı için (servis rol anahtarı ile doğrudan Supabase kullanmak isterseniz)
export function getServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const key = process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY || ''
  return createClient(url, key)
}
