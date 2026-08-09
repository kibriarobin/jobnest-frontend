import { cookies } from 'next/headers';

export const getMe = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) return null;

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/users/me`, {
      headers: { Cookie: `accessToken=${accessToken}` },
      cache: 'no-store',
    });

    if (!res.ok) return null;

    const result = await res.json();
    return result.data;
  } catch {
    return null;
  }
};