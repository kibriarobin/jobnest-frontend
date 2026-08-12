import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ContactForm } from './_components/contact-form';

const contactInfo = [
  {
    icon: Mail,
    title: 'Email Us',
    detail: 'hello@jobnest.com',
    note: "We'll respond within 24 hours",
  },
  {
    icon: Phone,
    title: 'Call Us',
    detail: '+880 1XXX-XXXXXX',
    note: 'Sun - Thu, 9am - 6pm',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    detail: 'Dhaka, Bangladesh',
    note: 'By appointment only',
  },
  {
    icon: Clock,
    title: 'Office Hours',
    detail: 'Sun - Thu: 9am - 6pm',
    note: 'Closed on Friday & Saturday',
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="font-heading text-3xl font-semibold text-foreground sm:text-4xl">
          Get in Touch
        </h1>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          Have a question about JobNest? We&apos;d love to hear from you.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* Left side — Information */}
        <div>
          <h2 className="font-heading text-xl font-semibold text-foreground">
            Contact Information
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Reach out through any of these channels - our team is here to help.
          </p>

          <div className="mt-8 space-y-4">
            {contactInfo.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title}>
                  <CardContent className="flex items-start gap-4 p-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{item.title}</p>
                      <p className="mt-0.5 text-sm text-foreground">{item.detail}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{item.note}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Right side — Contact Form */}
        <div>
          <h2 className="font-heading text-xl font-semibold text-foreground">
            Send a Message
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Fill out the form and we&apos;ll get back to you shortly.
          </p>

          <div className="mt-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}