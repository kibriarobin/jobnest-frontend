import { Badge } from '@/components/ui/badge';

export function StatusBadge({ status }: { status: string }) {
  let className = '';

  if (status === 'APPLIED') {
    className = 'bg-muted text-muted-foreground';
  } else if (status === 'SHORTLISTED') {
    className = 'bg-secondary/15 text-secondary';
  } else if (status === 'INTERVIEW') {
    className = 'bg-accent/15 text-accent-foreground';
  } else if (status === 'HIRED') {
    className = 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400';
  } else if (status === 'REJECTED') {
    className = 'bg-destructive/10 text-destructive';
  }

  return (
    <Badge variant="outline" className={`border-0 font-medium ${className}`}>
      {status}
    </Badge>
  );
}