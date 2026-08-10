import { serverFetch } from '@/lib/server-fetch';
import { ICategory } from '@/lib/type';

export async function getCategories(): Promise<ICategory[]> {
  const { ok, result } = await serverFetch('/api/categories');

  if (!ok) {
    return [];
  }

  return result.data;
}