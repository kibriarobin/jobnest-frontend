import { serverFetch } from '@/lib/server-fetch';
import { IPublicCompany } from '@/lib/type';

export type TPaginatedCompanies = {
  data: IPublicCompany[];
  meta: { page: number; limit: number; total: number };
};

export async function getCompanies(
  page: number = 1,
  limit: number = 12,
  searchTerm?: string
): Promise<TPaginatedCompanies> {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (searchTerm) params.set('searchTerm', searchTerm);

  const { ok, result } = await serverFetch(`/api/companies?${params.toString()}`);

  if (!ok) {
    return { data: [], meta: { page, limit, total: 0 } };
  }

  return { data: result.data, meta: result.meta };
}