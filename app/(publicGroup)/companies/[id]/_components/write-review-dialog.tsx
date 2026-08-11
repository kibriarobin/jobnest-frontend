'use client';

import { useState, useTransition } from 'react';
import { Loader2, Star, MessageSquarePlus } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { createReviewAction, TReviewState } from '../_actions/create-review';

const initialState: TReviewState = { success: false };

export function WriteReviewDialog({ companyId }: { companyId: string }) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState<TReviewState['errors']>();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const result = await createReviewAction(initialState, formData);

      if (result.success) {
        toast.success(result.message);
        setOpen(false);
        setRating(0);
        setErrors(undefined);
      } else {
        setErrors(result.errors);
        toast.error(result.message ?? 'Failed to submit review');
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <MessageSquarePlus className="size-4" />
          Write a Review
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Review this company</DialogTitle>
          <DialogDescription>
            Only candidates who completed an interview with this company can leave a review.
          </DialogDescription>
        </DialogHeader>

        <form action={handleSubmit} className="space-y-4">
          <input type="hidden" name="companyId" value={companyId} />
          <input type="hidden" name="rating" value={rating} />

          <div className="space-y-2">
            <Label>Rating</Label>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => {
                const value = i + 1;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRating(value)}
                    disabled={isPending}
                    className="p-0.5"
                  >
                    <Star
                      className={`size-6 ${
                        value <= rating ? 'fill-accent text-accent' : 'text-muted-foreground'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
            {errors?.rating && <p className="text-xs text-destructive">{errors.rating[0]}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">Comment (optional)</Label>
            <Textarea
              id="comment"
              name="comment"
              rows={4}
              placeholder="Share your interview experience..."
              disabled={isPending}
            />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isPending || rating === 0}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Review'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}