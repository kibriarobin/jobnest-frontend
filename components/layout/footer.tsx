import Link from 'next/link';
import { Briefcase, Mail, MapPin, Phone } from 'lucide-react';
import { PipelineDivider } from './pipeline-divider';

const footerLinks = {
  candidates: [
    { href: '/jobs', label: 'Browse Jobs' },
    { href: '/companies', label: 'Companies' },
    { href: '/blog', label: 'Career Blog' },
  ],
  employers: [
    { href: '/register', label: 'Post a Job' },
    { href: '/employer-dashboard', label: 'Employer Dashboard' },
  ],
  company: [
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/help', label: 'Help & Support' },
  ],
  legal: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
  ],
};

export function Footer() {
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <PipelineDivider />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-md bg-accent text-accent-foreground">
                <Briefcase className="size-4" />
              </span>
              <span className="font-heading text-xl font-semibold">
                Job<span className="text-accent">Nest</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-primary-foreground/70">
              Connecting ambitious candidates with companies across Bangladesh -
              one application at a time.
            </p>
            <div className="mt-5 space-y-2 text-sm text-primary-foreground/70">
              <div className="flex items-center gap-2">
                <Mail className="size-4 shrink-0" />
                <span>hello@jobnest.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="size-4 shrink-0" />
                <span>+880 1XXX-XXXXXX</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="size-4 shrink-0" />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          <FooterColumn title="For Candidates" links={footerLinks.candidates} />
          <FooterColumn title="For Employers" links={footerLinks.employers} />
          <FooterColumn title="Company" links={footerLinks.company} />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-primary-foreground/10 pt-6 sm:flex-row">
          <p className="text-xs text-primary-foreground/60">
            © {new Date().getFullYear()} JobNest. All rights reserved.
          </p>
          <div className="flex gap-5">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-primary-foreground/60 hover:text-primary-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-primary-foreground">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}