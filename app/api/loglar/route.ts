import { NextResponse } from 'next/server'
import { getServerSupabase } from '../../../lib/supabaseClient'

export async function GET() {
  const supabase = getServerSupabase()
  const { data, error } = await supabase.from('loglar').select('*').order('tarih_saat', { ascending: false }).limit(200)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const body = await request.json()
  const supabase = getServerSupabase()
  const { data, error } = await supabase.from('loglar').insert(body).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
