import createMiddleware from 'next-intl/middleware';
import { pathnames, locales, localePrefix, defaultLocale } from './i18n';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { JWT } from 'shared/utils/jwt';
import { serverStore } from './store/store';
import { authorize } from './store/common/thunks';

const resultOfLocale = createMiddleware({
  defaultLocale,
  locales,
  pathnames,
  localePrefix,
});

//resultOfLocale function middleware(request)

export default async function middleware(req: NextRequest) {
  const NextResponseLocale = resultOfLocale(req);
  const cookieStore = cookies();
  const accessTokenCookie = cookieStore.get('accessToken');
  const pathname = req.nextUrl.pathname;

  const updateProductUrl = pathname.match(/products\/\w*\d\w*\/update/);
  const protectedUrls =
    updateProductUrl ||
    pathname.includes('/users') ||
    pathname.includes('/files');

  if (protectedUrls) {
    if (!accessTokenCookie?.value)
      return NextResponse.redirect(new URL('/login', req.url));

    try {
      const parsed = await JWT.parseToken(accessTokenCookie.value);
      serverStore.dispatch(authorize({ user: parsed.user }));

      if (
        updateProductUrl &&
        !serverStore.getState().products.productsPermissions.canUpdateProduct
      ) {
        throw new Error('Forbidden');
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/login', req.url));
      //return new Response((error as Error).message, { status: 401 });
    }
  }

  if (pathname.includes('/login') || pathname.includes('/vhod')) {
    if (accessTokenCookie?.value) {
      try {
        await JWT.parseToken(accessTokenCookie.value);
        return NextResponse.redirect(new URL('/', req.url));
      } catch (error) {
        error;
      }
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
