'use server';

import { revalidatePath } from 'next/cache';
import { serverFetch } from '@/lib/server-fetch';

export async function withdrawApplicationAction(applicationId: string) {
  const { ok, result } = await serverFetch(`/api/applications/${applicationId}`, {
    method: 'DELETE',
  });

  if (!ok) {
    return { success: false, message: result.message || 'Failed to withdraw application' };
  }

  revalidatePath('/candidate-dashboard/applications');
  return { success: true, message: 'Application withdrawn successfully' };
}