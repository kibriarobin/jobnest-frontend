import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    name: 'Nusrat J.',
    role: 'Frontend Developer, hired via JobNest',
    quote:
      'I applied to three roles in one afternoon and heard back within a week. The status tracker meant I never had to email anyone asking for updates.',
  },
  {
    name: 'Tanvir A.',
    role: 'Hiring Manager, TechNova Ltd.',
    quote:
      'Posting a job takes minutes, and the applicant pipeline keeps our whole team aligned on who is where in the process.',
  },
  {
    name: 'Farhana K.',
    role: 'Marketing Specialist, hired via JobNest',
    quote:
      'The filters actually work — I found remote marketing roles within my salary range in under ten minutes.',
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-muted/30 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-semibold text-foreground">
            What people are saying
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.name}>
              <CardContent className="p-6">
                <p className="text-sm leading-relaxed text-foreground">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-5 flex items-center gap-3">
                  <Avatar className="size-9">
                    <AvatarFallback className="bg-secondary text-secondary-foreground">
                      {t.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}