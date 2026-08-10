import Link from 'next/link';
import { FileText } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { StatusBadge } from '@/components/shared/status-badge';
import { serverFetch } from '@/lib/server-fetch';
import { IApplication, ApplicationStatus } from '@/lib/type';
import { WithdrawButton } from './_components/withdraw-button';

export default async function MyApplicationsPage() {
  const { result } = await serverFetch('/api/applications/my-applications');
  const applications: IApplication[] = result.success ? result.data : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-foreground">
          My Applications
        </h1>
        <p className="text-sm text-muted-foreground">
          Track the status of every job you&apos;ve applied to.
        </p>
      </div>

      {applications.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16 text-center">
          <FileText className="size-8 text-muted-foreground" />
          <p className="mt-3 text-sm text-muted-foreground">
            You haven&apos;t applied to any jobs yet.
          </p>
          <Link href="/jobs" className="mt-3 text-sm font-medium text-primary hover:underline">
            Browse open positions
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Applied On</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium">{app.job.title}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {app.job.company.name}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(app.appliedAt).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={app.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    {app.status !== ApplicationStatus.HIRED && (
                      <WithdrawButton applicationId={app.id} />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}