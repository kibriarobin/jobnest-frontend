import { notFound } from 'next/navigation';
import { MapPin, Briefcase, Clock, DollarSign, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { JobCard } from '@/components/shared/job-card';
import { getJobDetail } from '@/service/getJobDetail';
import { getMe } from '@/service/getMe';
import { IJobDetail } from '@/lib/type';
import { ApplyDialog } from './_components/apply-dialog';
import { SaveButton } from './_components/save-button';

function formatSalary(min: number, max: number) {
  return `${min.toLocaleString('en-US')} - ${max.toLocaleString('en-US')}`;
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [job, user]: [IJobDetail | null, Awaited<ReturnType<typeof getMe>>] =
    await Promise.all([getJobDetail(id), getMe()]);

  if (!job) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-lg bg-muted font-heading text-xl font-semibold text-muted-foreground">
            {job.company.name.charAt(0)}
          </div>
          <div>
            <h1 className="font-heading text-2xl font-semibold text-foreground">
              {job.title}
            </h1>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span>{job.company.name}</span>
              {job.company.isVerified && (
                <Badge variant="outline" className="border-0 bg-secondary/15 text-xs text-secondary">
                  Verified
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main content */}
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardContent className="space-y-6 p-6">
              <div>
                <h2 className="font-heading text-lg font-semibold text-foreground">
                  Description
                </h2>
                <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                  {job.description}
                </p>
              </div>

              <div>
                <h2 className="font-heading text-lg font-semibold text-foreground">
                  Requirements
                </h2>
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-muted-foreground">
                  {job.requirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>

              {job.company.description && (
                <div>
                  <h2 className="font-heading text-lg font-semibold text-foreground">
                    About {job.company.name}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {job.company.description}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {job.relatedJobs.length > 0 && (
            <div>
              <h2 className="font-heading text-lg font-semibold text-foreground">
                Related Jobs
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {job.relatedJobs.map((related) => (
                  <JobCard key={related.id} job={related} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardContent className="space-y-4 p-5">
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <DollarSign className="size-4 shrink-0" />
                  <span className="font-medium text-foreground">
                    {formatSalary(job.salaryMin, job.salaryMax)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="size-4 shrink-0" />
                  {job.location}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Briefcase className="size-4 shrink-0" />
                  {job.type}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="size-4 shrink-0" />
                  {job.vacancy} opening{job.vacancy !== 1 ? 's' : ''}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="size-4 shrink-0" />
                  Apply before{' '}
                  {new Date(job.deadline).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <ApplyDialog jobId={job.id} user={user} />
                <SaveButton jobId={job.id} user={user} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}