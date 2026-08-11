'use server';

import { revalidatePath } from 'next/cache';
import { serverFetch } from '@/lib/server-fetch';

export async function saveJobAction(jobId: string) {
  const { ok, result } = await serverFetch('/api/saved-jobs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jobId }),
  });

  if (!ok) {
    return { success: false, message: result.message || 'Failed to save job' };
  }

  revalidatePath(`/jobs/${jobId}`);
  return { success: true, message: 'Job saved to your list' };
}