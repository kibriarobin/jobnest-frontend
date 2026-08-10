import { serverFetch } from '@/lib/server-fetch';
import { IAdminCompany } from '@/lib/type';

export type TPaginatedCompanies = {
  data: IAdminCompany[];
  meta: { page: number; limit: number; total: number };
};

export async function getAllCompaniesForAdmin(
  page: number = 1,
  limit: number = 10
): Promise<TPaginatedCompanies> {
  const { ok, result } = await serverFetch(`/api/companies/admin/all?page=${page}&limit=${limit}`);

  if (!ok) {
    return { data: [], meta: { page, limit, total: 0 } };
  }

  return { data: result.data, meta: result.meta };
}