import { serverFetch } from '@/lib/server-fetch';
import { ICompanyDetail } from '@/lib/type';

export async function getCompanyById(id: string): Promise<ICompanyDetail | null> {
  const { ok, result } = await serverFetch(`/api/companies/${id}`);

  if (!ok) {
    return null;
  }

  return result.data;
}