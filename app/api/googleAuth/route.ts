import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  const accessToken = request.nextUrl.searchParams.get('accessToken');
  const refreshToken = request.nextUrl.searchParams.get('refreshToken');

  if (!accessToken || !refreshToken) {
    return NextResponse.redirect(new URL('/login?error=google_auth_failed', request.url));
  }

  const cookieStore = await cookies();

  cookieStore.set('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 1 day
  });

  cookieStore.set('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return NextResponse.redirect(new URL('/candidate-dashboard', request.url));
}