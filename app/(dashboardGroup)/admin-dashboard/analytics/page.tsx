import { getAdminOverview } from '@/service/getAnalytics';
import { CategoryBarChart } from '../_components/category-bar-chart';
import { UserGrowthLineChart } from '../_components/user-growth-line-chart';
import { StatusPieChart } from '@/components/shared/status-pie-chart';

export default async function AdminAnalyticsPage() {
  const data = await getAdminOverview();

  if (!data) {
    return (
      <p className="text-sm text-muted-foreground">
        Unable to load analytics right now.
      </p>
    );
  }

  const jobStatusData = data.jobsByStatus.map((item: { status: string; count: number }) => ({
    status: item.status,
    count: item.count,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-foreground">Analytics</h1>
        <p className="text-sm text-muted-foreground">
          Platform-wide trends across jobs, categories, and user growth.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {jobStatusData.length > 0 && <StatusPieChart data={jobStatusData} />}
        {data.userGrowth.length > 0 && <UserGrowthLineChart data={data.userGrowth} />}
      </div>

      {data.jobsByCategory.length > 0 && <CategoryBarChart data={data.jobsByCategory} />}
    </div>
  );
}