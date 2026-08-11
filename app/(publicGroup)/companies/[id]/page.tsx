import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Globe, ShieldCheck, Briefcase } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { getCompanyById } from '@/service/getCompanyById';
import { CompanyReviewItem } from './_components/company-review-item';

export default async function CompanyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const company = await getCompanyById(id);

  if (!company) {
    notFound();
  }

  const approvedJobs = company.jobs.filter((job) => job.status === 'APPROVED');

  const avgRating =
    company.reviews.length > 0
      ? (
          company.reviews.reduce((sum, r) => sum + r.rating, 0) / company.reviews.length
        ).toFixed(1)
      : null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        <Avatar className="size-20 rounded-xl">
          <AvatarImage src={company.logo ?? undefined} className="object-contain" />
          <AvatarFallback className="rounded-xl bg-secondary text-xl text-secondary-foreground">
            {company.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
              {company.name}
            </h1>
            {company.isVerified && (
              <Badge variant="outline" className="border-0 bg-emerald-500/15 font-medium text-emerald-700 dark:text-emerald-400">
                <ShieldCheck className="mr-1 size-3" />
                Verified
              </Badge>
            )}
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {company.website && (
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-foreground"
              >
                <Globe className="size-4" />
                Website
              </a>
            )}
            <span className="flex items-center gap-1">
              <Briefcase className="size-4" />
              {approvedJobs.length} open {approvedJobs.length === 1 ? 'position' : 'positions'}
            </span>
            {avgRating && (
              <span className="flex items-center gap-1">⭐ {avgRating} ({company.reviews.length})</span>
            )}
          </div>
        </div>
      </div>

      {company.description && (
        <p className="mt-8 max-w-3xl text-muted-foreground">{company.description}</p>
      )}

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="font-heading text-xl font-semibold text-foreground">Open Positions</h2>

          {approvedJobs.length === 0 ? (
            <div className="mt-4 flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-12 text-center">
              <Briefcase className="size-6 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">
                No open positions right now.
              </p>
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {approvedJobs.map((job) => (
                <Link key={job.id} href={`/jobs/${job.id}`}>
                  <Card className="transition-shadow hover:shadow-sm">
                    <CardContent className="flex items-center justify-between p-4">
                      <p className="font-medium text-foreground">{job.title}</p>
                      <span className="text-xs text-muted-foreground">
                        {new Date(job.createdAt).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="font-heading text-xl font-semibold text-foreground">Reviews</h2>

          {company.reviews.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">No reviews yet.</p>
          ) : (
            <div className="mt-4">
              {company.reviews.map((review) => (
                <CompanyReviewItem
                  key={review.id}
                  rating={review.rating}
                  comment={review.comment}
                  createdAt={review.createdAt}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}