import { serverFetch } from '@/lib/server-fetch';
import { IAdminJob } from '@/lib/type';

export type TPaginatedJobs = {
  data: IAdminJob[];
  meta: { page: number; limit: number; total: number };
};

export async function getAllJobsForAdmin(
  page: number = 1,
  limit: number = 10
): Promise<TPaginatedJobs> {
  const { ok, result } = await serverFetch(`/api/jobs/admin/all?page=${page}&limit=${limit}`);

  if (!ok) {
    return { data: [], meta: { page, limit, total: 0 } };
  }

  return { data: result.data, meta: result.meta };
}