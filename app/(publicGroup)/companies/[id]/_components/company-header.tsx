import { Globe, ShieldCheck } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ICompanyDetail } from '@/lib/type';

export function CompanyHeader({ company }: { company: ICompanyDetail }) {
  return (
    <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
      <Avatar className="size-20 rounded-xl">
        <AvatarImage src={company.logo ?? undefined} className="object-contain" />
        <AvatarFallback className="rounded-xl bg-secondary text-xl text-secondary-foreground">
          {company.name.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
            {company.name}
          </h1>
          {company.isVerified && (
            <Badge variant="outline" className="border-0 bg-emerald-500/15 font-medium text-emerald-700 dark:text-emerald-400">
              <ShieldCheck className="mr-1 size-3" />
              Verified
            </Badge>
          )}
        </div>

        {company.website && (
          <a
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <Globe className="size-4" />
            {company.website.replace(/^https?:\/\//, '')}
          </a>
        )}
      </div>
    </div>
  );
}