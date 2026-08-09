import Link from 'next/link';
import { Briefcase } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-muted/30 px-4 py-12">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Briefcase className="size-4" />
          </span>
          <span className="font-heading text-2xl font-semibold tracking-tight">
            Job<span className="text-accent">Nest</span>
          </span>
        </Link>
        {children}
      </div>
    </div>
  );
}