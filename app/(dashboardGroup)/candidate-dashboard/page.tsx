import { FileText, Bookmark, CalendarCheck, Briefcase } from 'lucide-react';
import { StatCard } from '@/components/shared/stat-card';
import { getCandidateOverview } from '@/service/getAnalytics';
import { StatusPieChart } from '@/components/shared/status-pie-chart';

export default async function CandidateOverviewPage() {
  const data = await getCandidateOverview();

  if (!data) {
    return <p className="text-sm text-muted-foreground">Unable to load your overview right now.</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-foreground">
          Welcome back
        </h1>
        <p className="text-sm text-muted-foreground">
          Here&apos;s a snapshot of your job search.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard title="Total Applications" value={data.totalApplications} icon={FileText} />
        <StatCard title="Saved Jobs" value={data.savedJobsCount} icon={Bookmark} />
        <StatCard title="Interviews" value={data.interviewCount} icon={CalendarCheck} />
      </div>

      {data.applicationsByStatus.length > 0 ? (
        <StatusPieChart data={data.applicationsByStatus} />
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16 text-center">
          <Briefcase className="size-8 text-muted-foreground" />
          <p className="mt-3 text-sm text-muted-foreground">
            You haven&apos;t applied to any jobs yet.
          </p>
        </div>
      )}
    </div>
  );
}