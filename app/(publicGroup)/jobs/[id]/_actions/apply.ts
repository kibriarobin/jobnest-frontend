'use server';

import { revalidatePath } from 'next/cache';
import { serverFetch } from '@/lib/server-fetch';

export type TApplyState = {
  success: boolean;
  message?: string;
};

export async function applyToJobAction(
  jobId: string,
  _prevState: TApplyState,
  formData: FormData
): Promise<TApplyState> {
  const resumeUrl = formData.get('resumeUrl') as string;
  const coverLetter = formData.get('coverLetter') as string;

  if (!resumeUrl) {
    return { success: false, message: 'Resume URL is required' };
  }

  const { ok, result } = await serverFetch('/api/applications', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jobId, resumeUrl, coverLetter }),
  });

  if (!ok) {
    return { success: false, message: result.message || 'Failed to submit application' };
  }

  revalidatePath(`/jobs/${jobId}`);
  return { success: true, message: 'Application submitted successfully!' };
}