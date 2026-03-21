import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { routes } from '@/lib/routes'
import { env } from '@/lib/env'

export const updateSession = async (request: NextRequest) => {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL!,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })

          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    if (
      request.nextUrl.pathname !== routes.home &&
      !request.nextUrl.pathname.startsWith(routes.login)
    ) {
      return NextResponse.redirect(new URL(routes.login, request.url))
    }
  }

  if (
    user &&
    (
      request.nextUrl.pathname === routes.home ||
      request.nextUrl.pathname.startsWith(routes.login)
    )
  ) {
    const url = request.nextUrl.clone()

    url.pathname = routes.business

    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
