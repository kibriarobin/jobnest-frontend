'use server';

import { revalidatePath } from 'next/cache';
import { serverFetch } from '@/lib/server-fetch';

export type TCategoryFormState = {
  success: boolean;
  message?: string;
};

export async function createCategoryAction(
  _prevState: TCategoryFormState,
  formData: FormData
): Promise<TCategoryFormState> {
  const name = formData.get('name') as string;
  const icon = formData.get('icon') as string;

  if (!name || name.trim().length < 2) {
    return { success: false, message: 'Category name must be at least 2 characters' };
  }

  const { ok, result } = await serverFetch('/api/categories', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: name.trim(), icon: icon || undefined }),
  });

  if (!ok) {
    return { success: false, message: result.message || 'Failed to create category' };
  }

  revalidatePath('/admin-dashboard/categories');
  return { success: true, message: 'Category created successfully' };
}

export async function updateCategoryAction(
  categoryId: string,
  _prevState: TCategoryFormState,
  formData: FormData
): Promise<TCategoryFormState> {
  const name = formData.get('name') as string;
  const icon = formData.get('icon') as string;

  if (!name || name.trim().length < 2) {
    return { success: false, message: 'Category name must be at least 2 characters' };
  }

  const { ok, result } = await serverFetch(`/api/categories/${categoryId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: name.trim(), icon: icon || undefined }),
  });

  if (!ok) {
    return { success: false, message: result.message || 'Failed to update category' };
  }

  revalidatePath('/admin-dashboard/categories');
  return { success: true, message: 'Category updated successfully' };
}

export async function deleteCategoryAction(categoryId: string) {
  const { ok, result } = await serverFetch(`/api/categories/${categoryId}`, {
    method: 'DELETE',
  });

  if (!ok) {
    return { success: false, message: result.message || 'Failed to delete category' };
  }

  revalidatePath('/admin-dashboard/categories');
  return { success: true, message: 'Category deleted successfully' };
}