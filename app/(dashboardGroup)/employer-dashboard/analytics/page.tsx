import { getEmployerOverview } from '@/service/getAnalytics';
import { StatusPieChart } from '@/components/shared/status-pie-chart';
import { ApplicationsBarChart } from '../_components/applications-bar-chart';
import { ApplicationsLineChart } from '../_components/applications-line-chart';

export default async function EmployerAnalyticsPage() {
  const data = await getEmployerOverview();

  if (!data) {
    return (
      <p className="text-sm text-muted-foreground">
        Unable to load analytics right now.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-foreground">Analytics</h1>
        <p className="text-sm text-muted-foreground">
          A closer look at your hiring pipeline and job performance.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {data.applicantsByStatus.length > 0 && (
          <StatusPieChart data={data.applicantsByStatus} />
        )}
        {data.applicationsOverTime.length > 0 && (
          <ApplicationsLineChart data={data.applicationsOverTime} />
        )}
      </div>

      {data.applicationsPerJob.length > 0 && (
        <ApplicationsBarChart data={data.applicationsPerJob} />
      )}
    </div>
  );
}