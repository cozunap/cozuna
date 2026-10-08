import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

const locales = ['en', 'es', 'fr']
const defaultLocale = 'en'

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language')
  if (!acceptLanguage) return defaultLocale;

  const headers = { 'accept-language': acceptLanguage }
  try {
    const languages = new Negotiator({ headers }).languages()
    return match(languages, locales, defaultLocale)
  } catch (error) {
    return defaultLocale;
  }
}

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  
  // Redirect www to non-www
  if (url.hostname.startsWith('www.')) {
    url.hostname = url.hostname.replace(/^www\./, '')
    return NextResponse.redirect(url, 301)
  }

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

  // 1. Legacy and canonical 301 redirects (Pages 3, 4 of cozuna-seo-audit.pdf)
  // Clean trailing slash for standard lookup
  const normalizedPath = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

  const legacyRedirects: Record<string, string> = {
    // Unlocalized canonical routes -> redirect to /en/ counterparts
    '/services': '/en/services',
    '/about-us': '/en/about-us',
    '/what-we-do': '/en/what-we-do',
    '/get-a-quote': '/en/get-a-quote',
    '/blog': '/en/blog',
    '/affordable-web-development': '/en/affordable-web-development',
    '/ecommerce-web-design': '/en/ecommerce-web-design',
    '/landing-page-design': '/en/landing-page-design',
    '/graphic-design-for-small-business': '/en/graphic-design-for-small-business',
    '/privacy-policy': '/en/privacy-policy',
    '/terms-of-service': '/en/terms-of-service',

    // Legacy service pages from pre-rebuild site (Page 4 of audit)
    '/printing-services': '/en/services',
    '/graphic-design': '/en/services',
    '/digital-signage': '/en/services',
    '/web-development': '/en/affordable-web-development',
    '/business-cards': '/en/services',
    '/promotional-flyers': '/en/services',
    '/contact-us': '/en/get-a-quote',

    // Legacy portfolio slugs -> new project URLs (Page 4 of audit)
    '/ajs-mechanical': '/en/what-we-do',
    '/elsy-leonso': '/en/what-we-do/elsy-leonso',
    '/la-casa-del-mofongo-md': '/en/what-we-do/la-casa-del-mofongo',
    '/jacinthe-coiffure-studio': '/en/what-we-do/jacinthe-studio',
    '/bel-air-clean': '/en/what-we-do',
    '/la-shisha-restaurant': '/en/what-we-do/la-shisha-restaurant',
    '/monica-nails-spa': '/en/what-we-do/monica-nails-spa',
    '/crossway-driving-school': '/en/what-we-do/crossway-driving-school',

    // Outdated WordPress default post
    '/hello-world': '/en/blog',
  };

  if (legacyRedirects[normalizedPath]) {
    url.pathname = legacyRedirects[normalizedPath];
    return NextResponse.redirect(url, 301);
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return NextResponse.next()

  // Redirect to the appropriate locale based on browser language
  const preferredLocale = getLocale(request);
  
  request.nextUrl.pathname = `/${preferredLocale}${pathname === '/' ? '' : pathname}`
  return NextResponse.redirect(request.nextUrl, 301)
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
}
