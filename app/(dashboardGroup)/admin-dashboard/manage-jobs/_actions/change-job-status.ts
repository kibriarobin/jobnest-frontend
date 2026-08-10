'use server';

import { revalidatePath } from 'next/cache';
import { serverFetch } from '@/lib/server-fetch';
import { TJobStatus } from '@/lib/type';

export async function changeJobStatusAction(jobId: string, status: TJobStatus) {
  const { ok, result } = await serverFetch(`/api/jobs/admin/status/${jobId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });

  if (!ok) {
    return { success: false, message: result.message || 'Failed to update job status' };
  }

  revalidatePath('/admin-dashboard/manage-jobs');
  return { success: true, message: `Job ${status.toLowerCase()}` };
}