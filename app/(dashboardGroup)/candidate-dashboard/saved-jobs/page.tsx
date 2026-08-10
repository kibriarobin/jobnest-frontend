import Link from 'next/link';
import { Bookmark, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { serverFetch } from '@/lib/server-fetch';
import { ISavedJob } from '@/lib/type';
import { UnsaveButton } from './_components/unsave-button';

export default async function SavedJobsPage() {
  const { result } = await serverFetch('/api/saved-jobs');
  const savedJobs: ISavedJob[] = result.success ? result.data : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-foreground">Saved Jobs</h1>
        <p className="text-sm text-muted-foreground">
          Jobs you&apos;ve bookmarked to apply to later.
        </p>
      </div>

      {savedJobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16 text-center">
          <Bookmark className="size-8 text-muted-foreground" />
          <p className="mt-3 text-sm text-muted-foreground">
            You haven&apos;t saved any jobs yet.
          </p>
          <Link href="/jobs" className="mt-3 text-sm font-medium text-primary hover:underline">
            Browse open positions
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {savedJobs.map((saved) => (
            <Card key={saved.id}>
              <CardContent className="flex items-start justify-between gap-3 p-5">
                <Link href={`/jobs/${saved.job.id}`} className="min-w-0 flex-1">
                  <h3 className="line-clamp-1 font-semibold text-foreground">
                    {saved.job.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {saved.job.company.name}
                  </p>
                  <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="size-3" />
                    {saved.job.location}
                  </p>
                  <p className="mt-2 font-heading text-sm font-semibold text-primary">
                    ৳{(saved.job.salaryMin / 1000).toFixed(0)}k - ৳
                    {(saved.job.salaryMax / 1000).toFixed(0)}k
                  </p>
                </Link>
                <UnsaveButton jobId={saved.job.id} />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}