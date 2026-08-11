import Link from 'next/link';
import { Layers } from 'lucide-react';
import { ICategory } from '@/lib/type';

export function CategoriesSection({ categories }: { categories: ICategory[] }) {
  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="bg-muted/30 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-semibold text-foreground">
            Browse by Category
          </h2>
          <p className="mx-auto mt-2 max-w-md text-muted-foreground">
            Explore roles across every field, from engineering to marketing.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.slice(0, 8).map((category) => (
            <Link
              key={category.id}
              href={`/jobs?category=${category.id}`}
              className="group flex items-center gap-3 rounded-lg border border-border bg-background p-4 transition-colors hover:border-primary"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-lg">
                {category.icon || <Layers className="size-4 text-primary" />}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">
                  {category.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {category._count?.jobs ?? 0} openings
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}