import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CompaniesPagination({
  page,
  limit,
  total,
  basePath,
}: {
  page: number;
  limit: number;
  total: number;
  basePath: string;
}) {
  const totalPages = Math.max(1, Math.ceil(total / limit));

  if (totalPages <= 1) {
    return null;
  }

  const prevPage = Math.max(1, page - 1);
  const nextPage = Math.min(totalPages, page + 1);

  return (
    <div className="flex items-center justify-between border-t border-border px-4 py-3">
      <p className="text-sm text-muted-foreground">
        Page {page} of {totalPages} · {total} total
      </p>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link
            href={`${basePath}?page=${prevPage}`}
            aria-disabled={page <= 1}
            className={page <= 1 ? 'pointer-events-none opacity-50' : ''}
          >
            <ChevronLeft className="size-4" />
            Previous
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link
            href={`${basePath}?page=${nextPage}`}
            aria-disabled={page >= totalPages}
            className={page >= totalPages ? 'pointer-events-none opacity-50' : ''}
          >
            Next
            <ChevronRight className="size-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}