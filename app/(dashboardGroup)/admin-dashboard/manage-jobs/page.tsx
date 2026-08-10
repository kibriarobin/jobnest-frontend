import { Briefcase } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getAllJobsForAdmin } from '@/service/getAllJobsForAdmin';
import { JobsPagination } from './_components/jobs-pagination';
import { JobStatusActions } from './_components/job-status-actions';
import { JobStatusBadge } from './_components/job-status-badge';

const PAGE_LIMIT = 10;

export default async function AdminManageJobsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Number(pageParam) || 1;

  const { data: jobs, meta } = await getAllJobsForAdmin(page, PAGE_LIMIT);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-foreground">Manage Job Posts</h1>
        <p className="text-sm text-muted-foreground">
          Review and moderate job posts submitted by employers.
        </p>
      </div>

      {jobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16 text-center">
          <Briefcase className="size-8 text-muted-foreground" />
          <p className="mt-3 text-sm text-muted-foreground">No jobs found.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">{job.title}</TableCell>
                  <TableCell className="text-muted-foreground">{job.company.name}</TableCell>
                  <TableCell className="text-muted-foreground">{job.category.name}</TableCell>
                  <TableCell className="text-muted-foreground">{job.location}</TableCell>
                  <TableCell>
                    <JobStatusBadge status={job.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <JobStatusActions jobId={job.id} currentStatus={job.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <JobsPagination
            page={meta.page}
            limit={meta.limit}
            total={meta.total}
            basePath="/admin-dashboard/manage-jobs"
          />
        </div>
      )}
    </div>
  );
}