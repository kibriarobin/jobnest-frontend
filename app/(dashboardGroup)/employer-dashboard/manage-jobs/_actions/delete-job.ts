'use server';

import { revalidatePath } from 'next/cache';
import { serverFetch } from '@/lib/server-fetch';

export async function deleteJobAction(jobId: string) {
  const { ok, result } = await serverFetch(`/api/jobs/${jobId}`, { method: 'DELETE' });

  if (!ok) {
    return { success: false, message: result.message || 'Failed to delete job' };
  }

  revalidatePath('/employer-dashboard/jobs');
  return { success: true, message: 'Job deleted successfully' };
}