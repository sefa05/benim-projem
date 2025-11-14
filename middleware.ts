import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // Basit cookie kontrolü: auth-helpers olmadan kesin oturum doğrulaması yapmıyoruz;
  // burada sadece Supabase ile tipik olarak kullanılan cookie anahtar adlarına
  // sahip bir cookie var mı diye bakacağız. Daha güvenli bir kontrol isterseniz,
  // token'ı okuyup Supabase ile doğrulayan server-side kod ekleyebilirim.
  const cookieStore = cookies()
  const cookieKeys = Array.from(cookieStore.getAll()).map(c => c.name)
  const hasAuthCookie = cookieKeys.some(k => k.toLowerCase().includes('sb') || k.toLowerCase().includes('supabase'))

  const protectedRoutes = ['/panel', '/panel/']

  if (protectedRoutes.some((p) => req.nextUrl.pathname.startsWith(p))) {
    if (!hasAuthCookie) {
      const redirectUrl = new URL('/giris', req.url)
      return NextResponse.redirect(redirectUrl)
    }
  }

  if (req.nextUrl.pathname === '/giris') {
    if (hasAuthCookie) {
      return NextResponse.redirect(new URL('/panel', req.url))
    }
  }

  return res
}

export const config = {
  matcher: ['/panel/:path*', '/giris']
}
