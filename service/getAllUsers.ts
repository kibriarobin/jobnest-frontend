import { serverFetch } from '@/lib/server-fetch';
import { IAdminUser } from '@/lib/type';

export async function getAllUsers(): Promise<IAdminUser[]> {
  const { ok, result } = await serverFetch('/api/users');

  if (!ok) {
    return [];
  }

  return result.data;
}