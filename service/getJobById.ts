import { serverFetch } from '@/lib/server-fetch';
import { IEmployerJobDetail } from '@/lib/type';

export async function getJobById(jobId: string): Promise<IEmployerJobDetail | null> {
  const { ok, result } = await serverFetch(`/api/jobs/${jobId}`);

  if (!ok) {
    return null;
  }

  return result.data;
}