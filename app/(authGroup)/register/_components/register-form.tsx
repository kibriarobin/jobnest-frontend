'use client';

import { useActionState, useState } from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { registerAction, TRegisterState } from '../_actions/register';
import { Role, TRole } from '@/lib/type';

const initialState: TRegisterState = { success: false };

export function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerAction, initialState);
  const [selectedRole, setSelectedRole] = useState<TRole>(Role.CANDIDATE);

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="font-heading text-2xl">Create your account</CardTitle>
        <CardDescription>Join JobNest as a candidate or employer</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          {state.message && (
            <div className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {state.message}
            </div>
          )}

          <div className="space-y-2">
            <Label>I am a</Label>
            <RadioGroup
              name="role"
              value={selectedRole}
              onValueChange={(value) => setSelectedRole(value as TRole)}
              className="grid grid-cols-2 gap-3"
            >
              <div>
                <RadioGroupItem
                  value={Role.CANDIDATE}
                  id="role-candidate"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="role-candidate"
                  className="flex cursor-pointer items-center justify-center rounded-md border border-input px-4 py-2.5 text-sm font-medium peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 peer-data-[state=checked]:text-primary"
                >
                  Candidate
                </Label>
              </div>
              <div>
                <RadioGroupItem
                  value={Role.EMPLOYER}
                  id="role-employer"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="role-employer"
                  className="flex cursor-pointer items-center justify-center rounded-md border border-input px-4 py-2.5 text-sm font-medium peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 peer-data-[state=checked]:text-primary"
                >
                  Employer
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter your name"
              autoComplete="name"
              disabled={isPending}
            />
            {state.errors?.name && (
              <p className="text-xs text-destructive">{state.errors.name[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              disabled={isPending}
            />
            {state.errors?.email && (
              <p className="text-xs text-destructive">{state.errors.email[0]}</p>
            )}
          </div>

          {selectedRole === Role.EMPLOYER && (
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                name="companyName"
                placeholder="Enter your company name"
                disabled={isPending}
              />
              {state.errors?.companyName && (
                <p className="text-xs text-destructive">{state.errors.companyName[0]}</p>
              )}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              autoComplete="new-password"
              disabled={isPending}
            />
            {state.errors?.password && (
              <p className="text-xs text-destructive">{state.errors.password[0]}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Creating account...
              </>
            ) : (
              'Create Account'
            )}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Log in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}