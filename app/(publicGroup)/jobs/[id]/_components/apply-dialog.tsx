'use client';

import { useState, useTransition } from 'react';
import { Loader2, Send } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { applyToJobAction } from '../_actions/apply';
import { IUser } from '@/lib/type';

export function ApplyDialog({ jobId, user }: { jobId: string; user: IUser | null }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const result = await applyToJobAction(jobId, { success: false }, formData);

      if (result.success) {
        toast.success(result.message);
        setOpen(false);
      } else {
        toast.error(result.message);
      }
    });
  };

  if (!user) {
    return (
      <Button size="lg" className="w-full" asChild>
        <a href="/login">Log in to Apply</a>
      </Button>
    );
  }

  if (user.role !== 'CANDIDATE') {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full gap-2">
          <Send className="size-4" />
          Apply Now
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Apply for this position</DialogTitle>
          <DialogDescription>
            Share your resume so the employer can review your application.
          </DialogDescription>
        </DialogHeader>
        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="resumeUrl">Resume URL</Label>
            <Input
              id="resumeUrl"
              name="resumeUrl"
              placeholder="https://..."
              defaultValue={user.candidateProfile?.resumeUrl ?? ''}
              required
              disabled={isPending}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="coverLetter">Cover Letter (optional)</Label>
            <Textarea
              id="coverLetter"
              name="coverLetter"
              rows={4}
              placeholder="Tell the employer why you're a great fit..."
              disabled={isPending}
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Application'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}