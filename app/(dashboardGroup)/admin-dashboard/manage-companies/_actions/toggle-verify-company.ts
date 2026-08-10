'use server';

import { revalidatePath } from 'next/cache';
import { serverFetch } from '@/lib/server-fetch';

export async function toggleVerifyCompanyAction(companyId: string) {
  const { ok, result } = await serverFetch(`/api/companies/admin/${companyId}/verify`, {
    method: 'PATCH',
  });

  if (!ok) {
    return { success: false, message: result.message || 'Failed to update company' };
  }

  revalidatePath('/admin-dashboard/manage-companies');
  return { success: true, message: result.message || 'Company updated' };
}