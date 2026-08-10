'use server';

import { revalidatePath } from 'next/cache';
import { serverFetch } from '@/lib/server-fetch';
import { TProfileState } from './update-basic-info';

export async function updateCandidateProfileAction(
  _prevState: TProfileState,
  formData: FormData
): Promise<TProfileState> {
  const skillsRaw = formData.get('skills') as string;
  const skills = skillsRaw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  const payload = {
    skills,
    experience: formData.get('experience') as string,
    bio: formData.get('bio') as string,
    resumeUrl: formData.get('resumeUrl') as string,
  };

  const { ok, result } = await serverFetch('/api/users/me/candidate-profile', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!ok) {
    return { success: false, message: result.message || 'Failed to update profile' };
  }

  revalidatePath('/candidate-dashboard/profile');
  return { success: true, message: 'Candidate details updated successfully' };
}