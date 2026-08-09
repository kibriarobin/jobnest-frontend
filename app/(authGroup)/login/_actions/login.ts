'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { loginSchema } from '@/lib/validations/auth.validation';
import { Role } from '@/lib/type';

export type TLoginState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
};

async function setAuthCookiesFromResponse(res: Response) {
  const cookieStore = await cookies();
  const setCookieHeaders = res.headers.getSetCookie?.() || [];

  setCookieHeaders.forEach((cookieStr) => {
    const [nameValue] = cookieStr.split(';');
    const [name, ...rest] = nameValue.split('=');
    const value = rest.join('=');

    if (!name || !value) return;

    let maxAge = 60 * 60 * 24; // 1 day, accessToken এর জন্য
    if (name.trim() === 'refreshToken') {
      maxAge = 60 * 60 * 24 * 7; // 7 days
    }

    cookieStore.set(name.trim(), decodeURIComponent(value), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge,
    });
  });
}

function getDashboardPath(role: string) {
  if (role === Role.CANDIDATE) {
    return '/candidate-dashboard';
  } else if (role === Role.EMPLOYER) {
    return '/employer-dashboard';
  } else if (role === Role.ADMIN) {
    return '/admin-dashboard';
  } else {
    return '/';
  }
}

export async function loginAction(
  prevState: TLoginState,
  formData: FormData
): Promise<TLoginState> {
  const rawData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const parsed = loginSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  let dashboardPath = '/';

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsed.data),
    });

    const result = await res.json();

    if (!res.ok) {
      return { success: false, message: result.message || 'Login failed' };
    }

    await setAuthCookiesFromResponse(res);

    const role = result.data?.user?.role || result.data?.role;
    dashboardPath = getDashboardPath(role);
  } catch {
  return { success: false, message: 'Something went wrong. Please try again.' };
}

  redirect(dashboardPath);
}