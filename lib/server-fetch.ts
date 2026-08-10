import { cookies } from 'next/headers';

export async function serverFetch(path: string, options?: RequestInit) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  const res = await fetch(`${process.env.BACKEND_API_URL}${path}`, {
    ...options,
    headers: {
      ...(options?.headers || {}),
      Cookie: `accessToken=${accessToken}`,
    },
    cache: 'no-store',
  });

  const result = await res.json();

  return { ok: res.ok, result };
}