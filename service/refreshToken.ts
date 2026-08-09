'use server';

import { cookies } from 'next/headers';

export const getNewAccessToken = async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/refresh-token`, {
      method: 'POST',
      headers: {
        Cookie: `refreshToken=${refreshToken}`,
      },
    });

    const result = await res.json();

    if (result.success) {
      return { success: true, data: result.data };
    }

    return { success: false, data: null };
  } catch {
    return { success: false, data: null };
  }
};