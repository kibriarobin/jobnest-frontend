export function StatsSection({
  totalJobs,
  totalCategories,
  totalCandidates,
  totalCompanies,
}: {
  totalJobs: number;
  totalCategories: number;
  totalCandidates: number;
  totalCompanies: number;
}) {
  const stats = [
    { label: 'Live Job Openings', value: totalJobs },
    { label: 'Job Categories', value: totalCategories },
    { label: 'Candidates Registered', value: totalCandidates },
    { label: 'Companies Hiring', value: totalCompanies },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-8 rounded-xl border border-border bg-muted/30 p-8 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-heading text-3xl font-semibold text-primary sm:text-4xl">
              {stat.value}+
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}