import { Briefcase, Star, MessageSquare, CalendarDays } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function CompanyStats({
  openJobsCount,
  totalReviews,
  avgRating,
  memberSince,
}: {
  openJobsCount: number;
  totalReviews: number;
  avgRating: string | null;
  memberSince: string;
}) {
  const stats = [
    {
      icon: Briefcase,
      label: 'Open Positions',
      value: String(openJobsCount),
    },
    {
      icon: Star,
      label: 'Average Rating',
      value: avgRating ? `${avgRating} / 5` : '—',
    },
    {
      icon: MessageSquare,
      label: 'Total Reviews',
      value: String(totalReviews),
    },
    {
      icon: CalendarDays,
      label: 'Member Since',
      value: new Date(memberSince).toLocaleDateString('en-GB', {
        month: 'short',
        year: 'numeric',
      }),
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex size-9 items-center justify-center rounded-lg bg-accent/15 text-accent">
                <Icon className="size-4" />
              </div>
              <p className="mt-3 text-lg font-semibold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}