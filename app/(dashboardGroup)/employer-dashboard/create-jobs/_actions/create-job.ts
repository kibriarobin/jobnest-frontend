'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { serverFetch } from '@/lib/server-fetch';

export type TCreateJobState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
};

const createJobSchema = z
  .object({
    categoryId: z.string().min(1, 'Category is required'),
    title: z.string().min(3, 'Title must be at least 3 characters'),
    description: z.string().min(20, 'Description must be at least 20 characters'),
    requirements: z.string().min(1, 'Add at least one requirement'),
    location: z.string().min(1, 'Location is required'),
    type: z.enum(['REMOTE', 'ONSITE', 'HYBRID']),
    salaryMin: z.coerce.number().positive('Minimum salary must be greater than 0'),
    salaryMax: z.coerce.number().positive('Maximum salary must be greater than 0'),
    experienceLevel: z.string().min(1, 'Experience level is required'),
    vacancy: z.coerce.number().min(1).default(1),
    deadline: z.string().min(1, 'Deadline is required'),
  })
  .refine((data) => data.salaryMax >= data.salaryMin, {
    message: 'Maximum salary must be greater than or equal to minimum salary',
    path: ['salaryMax'],
  });

export async function createJobAction(
  _prevState: TCreateJobState,
  formData: FormData
): Promise<TCreateJobState> {
  const rawData = {
    categoryId: formData.get('categoryId') as string,
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    requirements: formData.get('requirements') as string,
    location: formData.get('location') as string,
    type: formData.get('type') as string,
    salaryMin: formData.get('salaryMin') as string,
    salaryMax: formData.get('salaryMax') as string,
    experienceLevel: formData.get('experienceLevel') as string,
    vacancy: formData.get('vacancy') as string,
    deadline: formData.get('deadline') as string,
  };

  const parsed = createJobSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const requirementsArray = parsed.data.requirements
    .split('\n')
    .map((r) => r.trim())
    .filter(Boolean);

  const { ok, result } = await serverFetch('/api/jobs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...parsed.data,
      requirements: requirementsArray,
      deadline: new Date(parsed.data.deadline).toISOString(),
    }),
  });

  if (!ok) {
    return { success: false, message: result.message || 'Failed to create job' };
  }

  redirect('/employer-dashboard/manage-jobs');
}