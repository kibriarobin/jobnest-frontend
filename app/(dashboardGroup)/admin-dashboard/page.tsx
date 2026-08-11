import { Users, Briefcase, Building2, Clock } from 'lucide-react';
import { StatCard } from '@/components/shared/stat-card';
import { getAdminOverview } from '@/service/getAnalytics';
import { CategoryBarChart } from './_components/category-bar-chart';
import { UserGrowthLineChart } from './_components/user-growth-line-chart';
import { StatusPieChart } from '@/components/shared/status-pie-chart';

export default async function AdminOverviewPage() {
  const data = await getAdminOverview();

  if (!data) {
    return <p className="text-sm text-muted-foreground">Unable to load platform overview right now.</p>;
  }

  const jobStatusData = data.jobsByStatus.map((item: { status: string; count: number }) => ({
    status: item.status,
    count: item.count,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-foreground">
          Platform Overview
        </h1>
        <p className="text-sm text-muted-foreground">
          Monitor JobNest activity across all users.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Users" value={data.totalUsers} icon={Users} />
        <StatCard title="Total Jobs" value={data.totalJobs} icon={Briefcase} />
        <StatCard title="Pending Jobs" value={data.pendingJobs} icon={Clock} />
        <StatCard title="Companies" value={data.totalCompanies} icon={Building2} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {jobStatusData.length > 0 && <StatusPieChart data={jobStatusData} />}
        {data.jobsByCategory.length > 0 && (
          <CategoryBarChart data={data.jobsByCategory} />
        )}
      </div>

      {data.userGrowth.length > 0 && <UserGrowthLineChart data={data.userGrowth} />}
    </div>
  );
}