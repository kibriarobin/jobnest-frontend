'use server';

import { revalidatePath } from 'next/cache';
import { serverFetch } from '@/lib/server-fetch';
import { TProfileState } from '@/app/(dashboardGroup)/candidate-dashboard/profile/_actions/update-basic-info';

export async function updateCompanyAction(
  _prevState: TProfileState,
  formData: FormData
): Promise<TProfileState> {
  const payload = {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    website: formData.get('website') as string,
    logo: formData.get('logo') as string,
  };

  const { ok, result } = await serverFetch('/api/users/me/company-profile', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!ok) {
    return { success: false, message: result.message || 'Failed to update company profile' };
  }

  revalidatePath('/employer-dashboard/settings');
  return { success: true, message: 'Company profile updated successfully' };
}