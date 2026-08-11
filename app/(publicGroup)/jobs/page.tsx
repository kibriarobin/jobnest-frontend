import { Briefcase } from 'lucide-react';
import { JobFilters } from '@/components/shared/job-filters';
import { PaginationControls } from '@/components/shared/pagination-controls';
import { getJobs } from '@/service/getJobs';
import { getCategories } from '@/service/getCategories';
import { JobCard } from '@/components/shared/job-card';

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;

  const [jobsResult, categories] = await Promise.all([
    getJobs({
      searchTerm: params.searchTerm,
      category: params.category,
      location: params.location,
      type: params.type,
      sort: params.sort,
      page,
      limit: 9,
    }),
    getCategories(),
  ]);

  const totalPages = Math.ceil(jobsResult.total / jobsResult.limit);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="font-heading text-3xl font-semibold text-foreground">Find Jobs</h1>
        <p className="mt-1 text-muted-foreground">
          {jobsResult.total} open position{jobsResult.total !== 1 ? 's' : ''} waiting for you.
        </p>
      </div>

      <div className="mb-8">
        <JobFilters categories={categories} />
      </div>

      {jobsResult.jobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-20 text-center">
          <Briefcase className="size-8 text-muted-foreground" />
          <p className="mt-3 text-sm text-muted-foreground">
            No jobs match your filters — try adjusting your search.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {jobsResult.jobs.map((job: import('@/lib/type').IJob) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>

          <div className="mt-10">
            <PaginationControls currentPage={jobsResult.page} totalPages={totalPages} />
          </div>
        </>
      )}
    </div>
  );
}