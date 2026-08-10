'use client';

import { useTransition } from 'react';
import { Loader2, Bookmark } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { unsaveJobAction } from '../_actions/unsave';

export function UnsaveButton({ jobId }: { jobId: string }) {
  const [isPending, startTransition] = useTransition();

  const handleUnsave = () => {
    startTransition(async () => {
      const result = await unsaveJobAction(jobId);

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleUnsave}
      disabled={isPending}
      aria-label="Remove from saved jobs"
    >
      {isPending ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Bookmark className="size-4 fill-accent text-accent" />
      )}
    </Button>
  );
}