'use server';

import { revalidatePath } from 'next/cache';
import { serverFetch } from '@/lib/server-fetch';

export async function unsaveJobAction(jobId: string) {
  const { ok, result } = await serverFetch(`/api/saved-jobs/${jobId}`, {
    method: 'DELETE',
  });

  if (!ok) {
    return { success: false, message: result.message || 'Failed to remove job' };
  }

  revalidatePath('/candidate-dashboard/saved-jobs');
  return { success: true, message: 'Job removed from saved list' };
}