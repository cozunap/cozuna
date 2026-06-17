import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en', 'es', 'fr']
const defaultLocale = 'en'

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl
  
  // Skip paths that shouldn't be localized
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // like favicon.ico, robots.txt, etc.
  ) {
    return NextResponse.next()
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return NextResponse.next()

  // Redirect if there is no locale
  const acceptLanguage = request.headers.get('accept-language') || ''
  
  let preferredLocale = defaultLocale;
  if (acceptLanguage.toLowerCase().includes('fr')) {
    preferredLocale = 'fr';
  } else if (acceptLanguage.toLowerCase().includes('es')) {
    preferredLocale = 'es';
  }
  
  request.nextUrl.pathname = `/${preferredLocale}${pathname === '/' ? '' : pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
}
