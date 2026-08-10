'use client';

import { useTransition } from 'react';
import { Loader2, ShieldCheck, ShieldOff } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toggleVerifyCompanyAction } from '../_actions/toggle-verify-company';

export function ToggleVerifyButton({
  companyId,
  isVerified,
}: {
  companyId: string;
  isVerified: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      const result = await toggleVerifyCompanyAction(companyId);

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={isVerified ? 'text-destructive hover:text-destructive' : 'text-emerald-600 hover:text-emerald-600'}
        >
          {isVerified ? <ShieldOff className="size-4" /> : <ShieldCheck className="size-4" />}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isVerified ? 'Unverify this company?' : 'Verify this company?'}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isVerified
              ? 'This will remove the verified badge from this company.'
              : 'This will mark the company as verified, showing a trust badge to candidates.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleToggle} disabled={isPending}>
            {isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : isVerified ? (
              'Unverify'
            ) : (
              'Verify'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}