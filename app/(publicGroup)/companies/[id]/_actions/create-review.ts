'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { serverFetch } from '@/lib/server-fetch';

export type TReviewState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
};

const reviewSchema = z.object({
  companyId: z.string().min(1),
  rating: z.coerce.number().min(1, 'Please select a rating').max(5),
  comment: z.string().optional(),
});

export async function createReviewAction(
  _prevState: TReviewState,
  formData: FormData
): Promise<TReviewState> {
  const rawData = {
    companyId: formData.get('companyId') as string,
    rating: formData.get('rating') as string,
    comment: formData.get('comment') as string,
  };

  const parsed = reviewSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const { ok, result } = await serverFetch('/api/reviews', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      companyId: parsed.data.companyId,
      rating: parsed.data.rating,
      comment: parsed.data.comment || undefined,
    }),
  });

  if (!ok) {
    return { success: false, message: result.message || 'Failed to submit review' };
  }

  revalidatePath(`/companies/${parsed.data.companyId}`);
  return { success: true, message: 'Review submitted successfully' };
}