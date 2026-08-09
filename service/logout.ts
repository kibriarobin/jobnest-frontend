'use server';

import { cookies } from 'next/headers';

export const logoutUser = async () => {
  const cookieStore = await cookies();

  try {
    await fetch(`${process.env.BACKEND_API_URL}/api/auth/logout`, {
      method: 'POST',
      headers: { Cookie: `accessToken=${cookieStore.get('accessToken')?.value}` },
    });
  } catch {
  }

  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');
};