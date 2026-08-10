'use server';

import { revalidatePath } from 'next/cache';
import { serverFetch } from '@/lib/server-fetch';
import { TApplicationStatus } from '@/lib/type';

export async function changeApplicantStatusAction(
  applicationId: string,
  status: TApplicationStatus
) {
  const { ok, result } = await serverFetch(`/api/applications/${applicationId}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });

  if (!ok) {
    return { success: false, message: result.message || 'Failed to update status' };
  }

  revalidatePath('/employer-dashboard/applicants');
  return { success: true, message: `Status updated to ${status}` };
}