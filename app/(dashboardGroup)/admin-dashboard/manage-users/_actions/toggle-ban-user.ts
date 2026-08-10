'use server';

import { revalidatePath } from 'next/cache';
import { serverFetch } from '@/lib/server-fetch';

export async function toggleBanUserAction(userId: string) {
  const { ok, result } = await serverFetch(
    `/api/users/${userId}/toggle-ban`,
    {
      method: 'PATCH',
    }
  );

  if (!ok) {
    return {
      success: false,
      message:
        result?.message || 'Failed to update user status',
    };
  }

  revalidatePath('/admin-dashboard/manage-users');

  return {
    success: true,
    message:
      result?.message || 'User status updated successfully',
  };
}