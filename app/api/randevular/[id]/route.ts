import { NextResponse } from 'next/server'
import { createRouteHandlerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { cookies, headers } from 'next/headers'

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json()
  const supabase = createRouteHandlerSupabaseClient({ headers, cookies })
  const { data, error } = await supabase.from('randevular').update(body).eq('id', params.id).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const supabase = createRouteHandlerSupabaseClient({ headers, cookies })
  const { error } = await supabase.from('randevular').delete().eq('id', params.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
