import { Briefcase, CheckCircle2, Users, UserCheck } from 'lucide-react';
import { StatCard } from '@/components/shared/stat-card';
import { getEmployerOverview } from '@/service/getAnalytics';
import { ApplicationsBarChart } from './_components/applications-bar-chart';
import { ApplicationsLineChart } from './_components/applications-line-chart';

export default async function EmployerOverviewPage() {
  const data = await getEmployerOverview();

  if (!data) {
    return <p className="text-sm text-muted-foreground">Unable to load your overview right now.</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-foreground">
          Company Overview
        </h1>
        <p className="text-sm text-muted-foreground">
          Track your job posts and applicant pipeline.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Jobs" value={data.totalJobs} icon={Briefcase} />
        <StatCard title="Active Jobs" value={data.activeJobs} icon={CheckCircle2} />
        <StatCard title="Total Applicants" value={data.totalApplicants} icon={Users} />
        <StatCard title="Hired" value={data.hiredCount} icon={UserCheck} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {data.applicationsPerJob.length > 0 && (
          <ApplicationsBarChart data={data.applicationsPerJob} />
        )}
        {data.applicationsOverTime.length > 0 && (
          <ApplicationsLineChart data={data.applicationsOverTime} />
        )}
      </div>
    </div>
  );
}