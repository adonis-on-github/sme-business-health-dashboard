import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { routes } from '@/lib/routes'

export const updateSession = async (request: NextRequest) => {
  const bypassKey = process.env.TEST_AUTH_BYPASS_KEY
  const clientKey = request.headers.get('x-test-bypass-key')

  if (bypassKey && clientKey === bypassKey) {
    console.log('✅ Auth Bypassed for Playwright Test')

    return NextResponse.next()
  }

  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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

  if (
    !user &&
    request.nextUrl.pathname !== routes.home &&
    !request.nextUrl.pathname.startsWith(routes.login)
  ) {
    const url = request.nextUrl.clone()
    const next = request.nextUrl.pathname + request.nextUrl.search

    url.pathname = routes.login
    url.searchParams.set('next', next)

    return NextResponse.redirect(url)
  }

  if (
    user &&
    (
      request.nextUrl.pathname.startsWith(routes.home) ||
      request.nextUrl.pathname.startsWith(routes.login)
    )
  ) {
    const url = request.nextUrl.clone()

    url.pathname = routes.business
    url.searchParams.delete('next')

    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
