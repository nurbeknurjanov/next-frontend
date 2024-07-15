import createMiddleware from 'next-intl/middleware';
import { pathnames, locales, localePrefix, defaultLocale } from './i18n';
import { NextRequest, NextResponse } from 'next/server';
import { serverStore } from './store/store';
import { authorizeUser } from 'app/actions';

const resultOfLocale = createMiddleware({
  defaultLocale,
  locales,
  pathnames,
  localePrefix,
});

//resultOfLocale function middleware(request)

export default async function middleware(req: NextRequest) {
  const NextResponseLocale = resultOfLocale(req);
  const pathname = req.nextUrl.pathname;

  const protectedUpdateProductUrl = pathname.match(
    /products\/\w*\d\w*\/update/
  );
  const protectedUrls =
    pathname.includes('/users') ||
    pathname.includes('/files') ||
    protectedUpdateProductUrl;

  if (protectedUrls) {
    try {
      console.log('middlware before');
      await authorizeUser();
      console.log('middlware after');
    } catch (error) {
      console.log('error in middlware', error);
      if ((error as Error & { status: number }).status === 403) {
        return NextResponse.redirect(new URL('/login', req.url));
      }
    }

    const state = serverStore.getState();
    const isAuth = state.common.auth.isAuth;

    if (
      protectedUpdateProductUrl &&
      !state.products.productsPermissions.canUpdateProduct
    ) {
      if (!isAuth) return NextResponse.redirect(new URL('/login', req.url));

      return new Response('Forbidden', { status: 403 });
    }

    if (!isAuth) return NextResponse.redirect(new URL('/login', req.url));
  }

  if (pathname.includes('/login') || pathname.includes('/vhod')) {
    try {
      await authorizeUser();
      return NextResponse.redirect(new URL('/', req.url));
    } catch (error) {
      error;
    }
  }

  return NextResponseLocale;
}

//export default resultOfLocale;

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(ru|en)/:path*',

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!_next|_vercel|.*\\..*).*)',
  ],
};
