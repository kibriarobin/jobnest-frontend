'use client';

import { useTransition } from 'react';
import { Loader2, Check, X } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { changeJobStatusAction } from '../_actions/change-job-status';
import { TJobStatus } from '@/lib/type';

export function JobStatusActions({
  jobId,
  currentStatus,
}: {
  jobId: string;
  currentStatus: TJobStatus;
}) {
  const [isPending, startTransition] = useTransition();

  const handleChange = (status: TJobStatus) => {
    startTransition(async () => {
      const result = await changeJobStatusAction(jobId, status);

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  if (currentStatus !== 'PENDING') {
    return (
      <span className="text-xs text-muted-foreground">
        {isPending ? <Loader2 className="size-4 animate-spin" /> : '—'}
      </span>
    );
  }

  return (
    <div className="flex justify-end gap-1">
      <Button
        variant="ghost"
        size="icon"
        className="text-emerald-600 hover:text-emerald-600"
        onClick={() => handleChange('APPROVED')}
        disabled={isPending}
      >
        {isPending ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" />}
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="text-destructive hover:text-destructive"
        onClick={() => handleChange('REJECTED')}
        disabled={isPending}
      >
        {isPending ? <Loader2 className="size-4 animate-spin" /> : <X className="size-4" />}
      </Button>
    </div>
  );
}