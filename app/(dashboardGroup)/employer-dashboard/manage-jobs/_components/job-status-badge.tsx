import { Badge } from '@/components/ui/badge';
import { TJobStatus } from '@/lib/type';

export function JobStatusBadge({ status }: { status: TJobStatus }) {
  let className = '';

  if (status === 'PENDING') {
    className = 'bg-muted text-muted-foreground';
  } else if (status === 'APPROVED') {
    className = 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400';
  } else if (status === 'REJECTED') {
    className = 'bg-destructive/10 text-destructive';
  } else if (status === 'CLOSED') {
    className = 'bg-secondary/15 text-secondary';
  }

  return (
    <Badge variant="outline" className={`border-0 font-medium ${className}`}>
      {status}
    </Badge>
  );
}