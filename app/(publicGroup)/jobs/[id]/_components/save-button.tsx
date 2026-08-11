'use client';

import { useTransition } from 'react';
import { Loader2, Bookmark } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { saveJobAction } from '../_actions/save';
import { IUser } from '@/lib/type';

export function SaveButton({ jobId, user }: { jobId: string; user: IUser | null }) {
  const [isPending, startTransition] = useTransition();

  if (!user || user.role !== 'CANDIDATE') {
    return null;
  }

  const handleSave = () => {
    startTransition(async () => {
      const result = await saveJobAction(jobId);

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <Button variant="outline" size="lg" className="w-full gap-2" onClick={handleSave} disabled={isPending}>
      {isPending ? <Loader2 className="size-4 animate-spin" /> : <Bookmark className="size-4" />}
      Save Job
    </Button>
  );
}