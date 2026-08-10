'use client';

import { useTransition } from 'react';
import {
  Loader2,
  Ban,
  CheckCircle,
} from 'lucide-react';
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

import { toggleBanUserAction } from '../_actions/toggle-ban-user';

interface ToggleBanButtonProps {
  userId: string;
  isBanned: boolean;
}

export function ToggleBanButton({
  userId,
  isBanned,
}: ToggleBanButtonProps) {
  const [isPending, startTransition] =
    useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      const result =
        await toggleBanUserAction(userId);

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
          disabled={isPending}
          className={
            isBanned
              ? 'text-emerald-600 hover:text-emerald-600'
              : 'text-destructive hover:text-destructive'
          }
        >
          {isBanned ? (
            <CheckCircle className="size-4" />
          ) : (
            <Ban className="size-4" />
          )}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isBanned
              ? 'Unban this user?'
              : 'Ban this user?'}
          </AlertDialogTitle>

          <AlertDialogDescription>
            {isBanned
              ? "This will restore the user's access to the platform."
              : "This will prevent the user from accessing the platform."}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleToggle}
            disabled={isPending}
            className={
              !isBanned
                ? 'bg-destructive hover:bg-destructive/90'
                : ''
            }
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Please wait...
              </>
            ) : isBanned ? (
              'Unban'
            ) : (
              'Ban'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}