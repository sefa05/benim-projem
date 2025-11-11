import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res, cookies })

  const protectedRoutes = ['/panel', '/panel/']

  if (protectedRoutes.some((p) => req.nextUrl.pathname.startsWith(p))) {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      const redirectUrl = new URL('/giris', req.url)
      return NextResponse.redirect(redirectUrl)
    }
  }

  if (req.nextUrl.pathname === '/giris') {
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      return NextResponse.redirect(new URL('/panel', req.url))
    }
  }

  return res
}

export const config = {
  matcher: ['/panel/:path*', '/giris']
}
