import Link from 'next/link';
import { Search, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function HeroSection() {
  return (
    <section className="relative flex min-h-[65vh] items-center overflow-hidden bg-muted/40">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,var(--accent)_0%,transparent_35%)] opacity-[0.08]"
      />

      <div className="mx-auto w-full max-w-4xl px-4 py-20 text-center sm:px-6">
        <span className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
          Now connecting candidates with companies across Bangladesh
        </span>

        <h1 className="mt-6 font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Find the job that <span className="text-accent">grows with you</span>
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
          Browse verified openings, apply in a few clicks, and track every
          application from one dashboard.
        </p>

        <form
          action="/jobs"
          className="mx-auto mt-8 flex max-w-xl flex-col gap-2 rounded-xl border border-border bg-background p-2 shadow-sm sm:flex-row"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              name="searchTerm"
              placeholder="Job title, keyword..."
              className="border-0 pl-9 shadow-none focus-visible:ring-0"
            />
          </div>
          <Button type="submit" className="gap-2">
            Search Jobs
            <ArrowRight className="size-4" />
          </Button>
        </form>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
          <span>Popular:</span>
          {['React Developer', 'Digital Marketing', 'UI/UX Designer'].map((term) => (
            <Link
              key={term}
              href={`/jobs?searchTerm=${encodeURIComponent(term)}`}
              className="rounded-full border border-border px-3 py-1 hover:bg-muted"
            >
              {term}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}