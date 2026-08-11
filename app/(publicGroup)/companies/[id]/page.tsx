import { notFound } from 'next/navigation';
import { getCompanyById } from '@/service/getCompanyById';
import { getMe } from '@/service/getMe';
import { CompanyStats } from './_components/company-stats';
import { CompanyAbout } from './_components/company-about';
import { CompanyJobsList } from './_components/company-jobs-list';
import { CompanyReviewsSection } from './_components/company-reviews-section';
import { CompanyHeader } from './_components/company-header';

export default async function CompanyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [company, user] = await Promise.all([getCompanyById(id), getMe()]);

  if (!company) {
    notFound();
  }

  const approvedJobs = company.jobs.filter((job) => job.status === 'APPROVED');

  const avgRating =
    company.reviews.length > 0
      ? (company.reviews.reduce((sum, r) => sum + r.rating, 0) / company.reviews.length).toFixed(1)
      : null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <CompanyHeader company={company} />

      <div className="mt-8">
        <CompanyStats
          openJobsCount={approvedJobs.length}
          totalReviews={company.reviews.length}
          avgRating={avgRating}
          memberSince={company.createdAt}
        />
      </div>

      {company.description && (
        <div className="mt-8">
          <CompanyAbout description={company.description} />
        </div>
      )}

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CompanyJobsList jobs={approvedJobs} />
        </div>

        <CompanyReviewsSection
          companyId={company.id}
          reviews={company.reviews}
          userRole={user?.role}
        />
      </div>
    </div>
  );
}