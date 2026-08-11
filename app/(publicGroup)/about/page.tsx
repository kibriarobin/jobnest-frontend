import { Target, Users, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    description:
      'To close the gap between skilled candidates and the companies that need them, without the noise of endless job boards.',
  },
  {
    icon: Users,
    title: 'Who We Serve',
    description:
      'Job seekers building their next career move, and employers looking to hire faster with less friction.',
  },
  {
    icon: Sparkles,
    title: 'What Sets Us Apart',
    description:
      'Verified employers, real-time application tracking, and a hiring flow built around clarity instead of clutter.',
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="font-heading text-3xl font-semibold text-foreground sm:text-4xl">
          About JobNest
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          JobNest is a job portal built to make hiring feel less like paperwork — for candidates
          searching for their next role, and for employers trying to find the right person
          without wading through noise.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {values.map((value) => {
          const Icon = value.icon;
          return (
            <Card key={value.title}>
              <CardContent className="p-6">
                <div className="flex size-11 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-4 font-semibold text-foreground">{value.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-16 space-y-4 text-muted-foreground">
        <h2 className="font-heading text-xl font-semibold text-foreground">How JobNest Started</h2>
        <p>
          JobNest began as a response to a simple frustration: job platforms had become bloated,
          cluttered with irrelevant listings and slow application flows. We set out to build
          something leaner — a platform where every job post is reviewed before it goes live, and
          every application status update reaches the candidate in real time.
        </p>
        <p>
          Today, JobNest connects candidates and employers through a streamlined dashboard
          experience, transparent hiring pipelines, and a moderation process that keeps listings
          trustworthy.
        </p>
      </div>
    </div>
  );
}