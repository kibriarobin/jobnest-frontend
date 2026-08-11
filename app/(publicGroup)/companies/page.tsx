import { Building2 } from 'lucide-react';
import { getCompanies } from '@/service/getCompanies';
import { CompanyCard } from './_components/company-card';
import { CompaniesSearch } from './_components/companies-search';
import { PaginationControls } from '@/components/shared/pagination-controls';

const PAGE_LIMIT = 12;

export default async function CompaniesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; searchTerm?: string }>;
}) {
  const { page: pageParam, searchTerm } = await searchParams;
  const page = Number(pageParam) || 1;

  const { data: companies, meta } = await getCompanies(page, PAGE_LIMIT, searchTerm);
  const totalPages = Math.max(1, Math.ceil(meta.total / meta.limit));

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="font-heading text-3xl font-semibold text-foreground sm:text-4xl">
          Companies Hiring on JobNest
        </h1>
        <p className="mt-2 text-muted-foreground">
          Explore verified employers actively hiring across every industry.
        </p>
      </div>

      <div className="mt-8 max-w-md">
        <CompaniesSearch />
      </div>

      {companies.length === 0 ? (
        <div className="mt-12 flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16 text-center">
          <Building2 className="size-8 text-muted-foreground" />
          <p className="mt-3 text-sm text-muted-foreground">No companies found.</p>
        </div>
      ) : (
        <>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {companies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>

          <div className="mt-10">
            <PaginationControls currentPage={meta.page} totalPages={totalPages} />
          </div>
        </>
      )}
    </div>
  );
}