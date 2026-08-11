import Link from 'next/link';
import { ShieldCheck, Briefcase } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { IPublicCompany } from '@/lib/type';

export function CompanyCard({ company }: { company: IPublicCompany }) {
  return (
    <Link href={`/companies/${company.id}`}>
      <Card className="h-full transition-shadow hover:shadow-md">
        <CardContent className="flex h-full flex-col p-6">
          <div className="flex items-start justify-between">
            <Avatar className="size-12 rounded-lg">
              <AvatarImage src={company.logo ?? undefined} className="object-contain" />
              <AvatarFallback className="rounded-lg bg-secondary text-secondary-foreground">
                {company.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {company.isVerified && (
              <Badge variant="outline" className="border-0 bg-emerald-500/15 font-medium text-emerald-700 dark:text-emerald-400">
                <ShieldCheck className="mr-1 size-3" />
                Verified
              </Badge>
            )}
          </div>

          <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
            {company.name}
          </h3>

          {company.description && (
            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
              {company.description}
            </p>
          )}

          <div className="mt-4 flex items-center gap-1 text-sm text-muted-foreground">
            <Briefcase className="size-4" />
            {company._count.jobs} open {company._count.jobs === 1 ? 'position' : 'positions'}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}