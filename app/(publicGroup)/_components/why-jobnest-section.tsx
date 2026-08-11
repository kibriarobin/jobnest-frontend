import { ShieldCheck, Zap, LineChart } from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    title: 'Verified employers',
    description: 'Every company is reviewed before their job posts go live.',
  },
  {
    icon: Zap,
    title: 'Fast applications',
    description: 'One profile, one resume — apply to any job in seconds.',
  },
  {
    icon: LineChart,
    title: 'Real-time tracking',
    description: 'See exactly where each application stands, updated live.',
  },
];

export function WhyJobNestSection() {
  return (
    <section className="bg-brand-section-bg py-20 text-brand-section-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg">
          <h2 className="font-heading text-3xl font-semibold">Why JobNest</h2>
          <p className="mt-2 text-brand-section-foreground/70">
            Built to make hiring feel less like paperwork.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title}>
                <div className="flex size-11 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-4 font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-brand-section-foreground/70">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}