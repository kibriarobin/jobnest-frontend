'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { changeApplicantStatusAction } from '../_actions/change-status';
import { ApplicationStatus, TApplicationStatus } from '@/lib/type';

const statusOptions: TApplicationStatus[] = [
  ApplicationStatus.APPLIED,
  ApplicationStatus.SHORTLISTED,
  ApplicationStatus.INTERVIEW,
  ApplicationStatus.HIRED,
  ApplicationStatus.REJECTED,
];

export function StatusSelect({
  applicationId,
  currentStatus,
}: {
  applicationId: string;
  currentStatus: TApplicationStatus;
}) {
  const [isPending, startTransition] = useTransition();

  const handleChange = (value: string) => {
    startTransition(async () => {
      const result = await changeApplicantStatusAction(
        applicationId,
        value as TApplicationStatus
      );

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <Select defaultValue={currentStatus} onValueChange={handleChange} disabled={isPending}>
      <SelectTrigger className="w-40">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {statusOptions.map((status) => (
          <SelectItem key={status} value={status}>
            {status}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}