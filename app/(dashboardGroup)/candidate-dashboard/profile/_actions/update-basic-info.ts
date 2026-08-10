'use server';

import { revalidatePath } from 'next/cache';
import { serverFetch } from '@/lib/server-fetch';

export type TProfileState = {
  success: boolean;
  message?: string;
};

export async function updateBasicInfoAction(
  _prevState: TProfileState,
  formData: FormData
): Promise<TProfileState> {
  const name = formData.get('name') as string;

  const { ok, result } = await serverFetch('/api/users/me', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });

  if (!ok) {
    return { success: false, message: result.message || 'Failed to update profile' };
  }

  revalidatePath('/candidate-dashboard/profile');
  return { success: true, message: 'Basic info updated successfully' };
}