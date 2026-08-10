import { Building2, ShieldCheck } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { getAllCompaniesForAdmin } from '@/service/getAllCompaniesForAdmin';
import { ToggleVerifyButton } from './_components/toggle-verify-button';
import { CompaniesPagination } from './_components/companies-pagination';

const PAGE_LIMIT = 10;

export default async function AdminManageCompaniesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Number(pageParam) || 1;

  const { data: companies, meta } = await getAllCompaniesForAdmin(page, PAGE_LIMIT);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-foreground">Manage Companies</h1>
        <p className="text-sm text-muted-foreground">
          Review and verify companies registered on the platform.
        </p>
      </div>

      {companies.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16 text-center">
          <Building2 className="size-8 text-muted-foreground" />
          <p className="mt-3 text-sm text-muted-foreground">No companies found.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Jobs</TableHead>
                <TableHead>Reviews</TableHead>
                <TableHead>Verified</TableHead>
                <TableHead>User Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {companies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="size-8">
                        <AvatarImage src={company.logo ?? undefined} />
                        <AvatarFallback className="bg-secondary text-xs text-secondary-foreground">
                          {company.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-sm font-medium">{company.name}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{company.user.email}</TableCell>
                  <TableCell className="text-muted-foreground">{company._count.jobs}</TableCell>
                  <TableCell className="text-muted-foreground">{company._count.reviews}</TableCell>
                  <TableCell>
                    {company.isVerified ? (
                      <Badge variant="outline" className="border-0 bg-emerald-500/15 font-medium text-emerald-700 dark:text-emerald-400">
                        <ShieldCheck className="mr-1 size-3" />
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-0 bg-muted font-medium text-muted-foreground">
                        Unverified
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {company.user.isBanned ? (
                      <Badge variant="outline" className="border-0 bg-destructive/10 font-medium text-destructive">
                        Banned
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-0 bg-emerald-500/15 font-medium text-emerald-700 dark:text-emerald-400">
                        Active
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <ToggleVerifyButton companyId={company.id} isVerified={company.isVerified} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <CompaniesPagination
            page={meta.page}
            limit={meta.limit}
            total={meta.total}
            basePath="/admin-dashboard/manage-companies"
          />
        </div>
      )}
    </div>
  );
}