import { UserPlus, FileSearch, Send, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    title: 'Create your profile',
    description: 'Sign up and build a profile that highlights your skills and experience.',
  },
  {
    icon: FileSearch,
    title: 'Discover matching roles',
    description: 'Filter jobs by category, location, and salary to find the right fit.',
  },
  {
    icon: Send,
    title: 'Apply in a few clicks',
    description: 'Submit your application with your resume — no repeated forms.',
  },
  {
    icon: CheckCircle2,
    title: 'Track and get hired',
    description: 'Follow every application status from your dashboard, start to offer.',
  },
];

export function HowItWorksSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="font-heading text-3xl font-semibold text-foreground">
          How JobNest Works
        </h2>
        <p className="mx-auto mt-2 max-w-md text-muted-foreground">
          From sign-up to offer letter, in four simple steps.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.title} className="relative">
              <div className="flex size-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Icon className="size-5" />
              </div>
              <span className="mt-4 block font-heading text-sm font-semibold text-accent">
                Step {index + 1}
              </span>
              <h3 className="mt-1 font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}