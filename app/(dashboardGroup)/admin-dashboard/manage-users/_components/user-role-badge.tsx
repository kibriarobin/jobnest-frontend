import { Badge } from '@/components/ui/badge';
import { TRole } from '@/lib/type';

interface UserRoleBadgeProps {
  role: TRole;
}

export function UserRoleBadge({
  role,
}: UserRoleBadgeProps) {
  let className = '';

  if (role === 'ADMIN') {
    className =
      'bg-secondary/15 text-secondary';
  } else if (role === 'EMPLOYER') {
    className =
      'bg-blue-500/15 text-blue-700 dark:text-blue-400';
  } else {
    className =
      'bg-muted text-muted-foreground';
  }

  return (
    <Badge
      variant="outline"
      className={`border-0 font-medium ${className}`}
    >
      {role}
    </Badge>
  );
}