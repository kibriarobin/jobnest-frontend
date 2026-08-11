import Link from 'next/link';
import { MapPin, Briefcase, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { IJob } from '@/lib/type';

function formatSalary(min: number, max: number) {
  return `${min.toLocaleString('en-US')} - ${max.toLocaleString('en-US')}`;
}

function getTypeLabel(type: string) {
  if (type === 'REMOTE') {
    return 'Remote';
  } else if (type === 'ONSITE') {
    return 'Onsite';
  } else {
    return 'Hybrid';
  }
}

export function JobCard({ job }: { job: IJob }) {
  return (
    <Link href={`/jobs/${job.id}`}>
      <Card className="h-full transition-shadow hover:shadow-md">
        <CardContent className="flex h-full flex-col p-5">
          <div className="flex items-start gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-md bg-muted font-heading text-lg font-semibold text-muted-foreground">
              {job.company.name.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="line-clamp-1 font-semibold text-foreground">{job.title}</h3>
              <p className="line-clamp-1 text-sm text-muted-foreground">{job.company.name}</p>
            </div>
          </div>

          <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
            {job.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="secondary" className="gap-1 font-normal">
              <MapPin className="size-3" />
              {job.location}
            </Badge>
            <Badge variant="secondary" className="gap-1 font-normal">
              <Briefcase className="size-3" />
              {getTypeLabel(job.type)}
            </Badge>
          </div>

          <div className="mt-auto flex items-center justify-between pt-4">
            <span className="font-heading text-sm font-semibold text-primary">
              ${formatSalary(job.salaryMin, job.salaryMax)}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="size-3" />
              View Details
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}