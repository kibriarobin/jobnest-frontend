import { ClipboardList } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { serverFetch } from '@/lib/server-fetch';
import { IApplicantRow } from '@/lib/type';
import { StatusSelect } from './_components/status-select';

export default async function ApplicantsPage() {
  const { result } = await serverFetch('/api/applications/employer');
  const applicants: IApplicantRow[] = result.success ? result.data : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-foreground">Applicants</h1>
        <p className="text-sm text-muted-foreground">
          Review and manage candidates across all your job posts.
        </p>
      </div>

      {applicants.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16 text-center">
          <ClipboardList className="size-8 text-muted-foreground" />
          <p className="mt-3 text-sm text-muted-foreground">No applicants yet.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate</TableHead>
                <TableHead>Applied For</TableHead>
                <TableHead>Applied On</TableHead>
                <TableHead>Resume</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applicants.map((app) => (
                <TableRow key={app.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="size-8">
                        <AvatarImage src={app.user.profilePhoto ?? undefined} />
                        <AvatarFallback className="bg-secondary text-xs text-secondary-foreground">
                          {app.user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{app.user.name}</p>
                        <p className="text-xs text-muted-foreground">{app.user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{app.job.title}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(app.appliedAt).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </TableCell>
                  <TableCell>
                    <Button variant="link" size="sm" asChild className="h-auto p-0">
                      <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer">
                        View
                      </a>
                    </Button>
                  </TableCell>
                  <TableCell>
                    <StatusSelect applicationId={app.id} currentStatus={app.status} />
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