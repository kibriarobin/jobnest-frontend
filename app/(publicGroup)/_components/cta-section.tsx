import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function CtaSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-6 rounded-2xl bg-accent px-6 py-14 text-center text-accent-foreground sm:flex-row sm:justify-between sm:text-left">
        <div>
          <h2 className="font-heading text-2xl font-semibold sm:text-3xl">
            Ready to find your next role?
          </h2>
          <p className="mt-2 text-accent-foreground/80">
            Join JobNest today - it takes less than two minutes.
          </p>
        </div>
        <Button size="lg" variant="secondary" asChild>
          <Link href="/register">Get Started Free</Link>
        </Button>
      </div>
    </section>
  );
}