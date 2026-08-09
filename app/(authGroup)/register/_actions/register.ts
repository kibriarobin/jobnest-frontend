'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { registerSchema } from '@/lib/validations/auth.validation';
import { Role } from '@/lib/type';

export type TRegisterState = {
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

    let maxAge = 60 * 60 * 24;
    if (name.trim() === 'refreshToken') {
      maxAge = 60 * 60 * 24 * 7;
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
  } else {
    return '/';
  }
}

export async function registerAction(
  prevState: TRegisterState,
  formData: FormData
): Promise<TRegisterState> {
  const rawData = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    role: formData.get('role') as string,
    companyName: (formData.get('companyName') as string) || undefined,
  };

  const parsed = registerSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  let dashboardPath = '/';

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsed.data),
    });

    const result = await res.json();

    if (!res.ok) {
      return { success: false, message: result.message || 'Registration failed' };
    }

    await setAuthCookiesFromResponse(res);
    dashboardPath = getDashboardPath(parsed.data.role);
  } catch {
  return { success: false, message: 'Something went wrong. Please try again.' };
}

  redirect(dashboardPath);
}