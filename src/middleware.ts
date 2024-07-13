import createMiddleware from 'next-intl/middleware';
import { pathnames, locales, localePrefix, defaultLocale } from './i18n';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { JWT } from 'shared/utils/jwt';
import { serverStore } from 'store/store';
import { auth } from 'store/common/thunks';

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

  if (
    pathname.includes('/products') ||
    pathname.includes('/users') ||
    pathname.includes('/files')
  ) {
    if (accessTokenCookie?.value) {
      try {
        const parsed = await JWT.parseToken(accessTokenCookie?.value);
        serverStore.dispatch(auth({ isAuth: true, user: parsed.user }));
      } catch (error) {
        return NextResponse.redirect(new URL('/login', req.url));
        //return new Response('Not authorized', { status: 401});
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
