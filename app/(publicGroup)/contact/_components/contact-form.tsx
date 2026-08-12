'use client';

import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Loader2, Send } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

export function ContactForm() {
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);

    const form = e.currentTarget;

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
        form,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string
      );

      setIsSent(true);
      toast.success('Message sent successfully!');
    } catch {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  if (isSent) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center py-12 text-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
            <Send className="size-5" />
          </span>
          <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
            Message Sent
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            We&apos;ll get back to you as soon as possible.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="user_name">Name</Label>
              <Input
                id="user_name"
                name="user_name"
                placeholder="Your name"
                required
                disabled={isSending}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="user_email">Email</Label>
              <Input
                id="user_email"
                name="user_email"
                type="email"
                placeholder="you@example.com"
                required
                disabled={isSending}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              name="subject"
              placeholder="How can we help?"
              required
              disabled={isSending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Tell us more..."
              required
              disabled={isSending}
            />
          </div>

          <Button type="submit" disabled={isSending} className="gap-2">
            {isSending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="size-4" />
                Send Message
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}