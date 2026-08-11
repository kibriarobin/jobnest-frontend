import Link from 'next/link';
import { Briefcase, Home, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background px-4 py-20">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-accent/15 text-accent">
          <Briefcase className="size-8" />
        </div>

        <p className="mt-6 font-heading text-7xl font-bold text-foreground">404</p>

        <h1 className="mt-4 font-heading text-2xl font-semibold text-foreground">
          This page went off the market
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist, was moved, or the job post may have
          been closed.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/">
              <Home className="size-4" />
              Back to Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/jobs">
              <Search className="size-4" />
              Browse Jobs
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}