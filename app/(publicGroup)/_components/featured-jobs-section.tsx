import Link from 'next/link';
import { ArrowRight, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { JobCard } from '@/components/shared/job-card';
import { IJob } from '@/lib/type';

export function FeaturedJobsSection({ jobs }: { jobs: IJob[] }) {
  let content;

  if (jobs.length === 0) {
    content = (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16 text-center">
        <Briefcase className="size-8 text-muted-foreground" />
        <p className="mt-3 text-sm text-muted-foreground">
          New openings are being reviewed — check back shortly.
        </p>
      </div>
    );
  } else {
    content = (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="font-heading text-3xl font-semibold text-foreground">
            Trending Jobs
          </h2>
          <p className="mt-2 text-muted-foreground">
            Fresh, verified openings from companies actively hiring.
          </p>
        </div>
        <Button variant="ghost" asChild className="hidden gap-1 sm:inline-flex">
          <Link href="/jobs">
            View all
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>

      <div className="mt-10">{content}</div>
    </section>
  );
}