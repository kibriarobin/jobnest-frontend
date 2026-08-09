import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { jwtUtils } from './utils/jwt';
import { getNewAccessToken } from './service/refreshToken';
import { Role } from './lib/type';

const AUTH_ROUTES = ['/login', '/register'];
const PUBLIC_ROUTES = [
  '/',
  '/jobs',
  '/companies',
  '/login',
  '/register',
  '/about',
  '/contact',
];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const cookieStore = await cookies();

  let accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  let decodedAccessToken = accessToken
    ? await jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string)
    : null;

  const decodedRefreshToken = refreshToken
    ? await jwtUtils.verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET as string)
    : null;

  if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
    const result = await getNewAccessToken();

    if (result.success) {
      const newAccessToken = result.data.accessToken;

      cookieStore.set('accessToken', newAccessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24, // 1 day
        sameSite: 'lax',
      });

      accessToken = newAccessToken;
      decodedAccessToken = accessToken
        ? await jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string)
        : null;
    }
  }

  let userRole = null;

  if (!decodedAccessToken?.success) {
    cookieStore.delete('accessToken');
  }

  if (decodedAccessToken?.success && decodedAccessToken.data) {
    userRole = decodedAccessToken.data.role as string;
  }

  if (accessToken && AUTH_ROUTES.includes(pathname)) {
    if (userRole === Role.CANDIDATE) {
      return NextResponse.redirect(new URL('/candidate-dashboard', request.url));
    } else if (userRole === Role.EMPLOYER) {
      return NextResponse.redirect(new URL('/employer-dashboard', request.url));
    } else if (userRole === Role.ADMIN) {
      return NextResponse.redirect(new URL('/admin-dashboard', request.url));
    } else {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + '/')
  );
  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + '/')
  );

  
  if (!accessToken && !isPublicRoute && !isAuthRoute) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Role-based dashboard protection
  if (pathname.startsWith('/candidate-dashboard') && userRole !== Role.CANDIDATE) {
    return NextResponse.redirect(new URL('/not-found', request.url));
  } else if (pathname.startsWith('/employer-dashboard') && userRole !== Role.EMPLOYER) {
    return NextResponse.redirect(new URL('/not-found', request.url));
  } else if (pathname.startsWith('/admin-dashboard') && userRole !== Role.ADMIN) {
    return NextResponse.redirect(new URL('/not-found', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};