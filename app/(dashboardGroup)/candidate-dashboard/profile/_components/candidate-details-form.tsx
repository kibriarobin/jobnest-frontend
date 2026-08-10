'use client';

import { useActionState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { updateCandidateProfileAction } from '../_actions/update-candidate-profile';
import { TProfileState } from '../_actions/update-basic-info';
import { ICandidateProfile } from '@/lib/type';

const initialState: TProfileState = { success: false };

export function CandidateDetailsForm({ profile }: { profile: ICandidateProfile | null }) {
  const [state, formAction, isPending] = useActionState(
    updateCandidateProfileAction,
    initialState
  );

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Candidate Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="skills">Skills</Label>
            <Input
              id="skills"
              name="skills"
              placeholder="React, Node.js, TypeScript"
              defaultValue={profile?.skills?.join(', ') ?? ''}
              disabled={isPending}
            />
            <p className="text-xs text-muted-foreground">Separate skills with commas.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience">Experience</Label>
            <Input
              id="experience"
              name="experience"
              placeholder="2 years as a Frontend Developer"
              defaultValue={profile?.experience ?? ''}
              disabled={isPending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              rows={4}
              placeholder="Tell employers a little about yourself..."
              defaultValue={profile?.bio ?? ''}
              disabled={isPending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="resumeUrl">Resume URL</Label>
            <Input
              id="resumeUrl"
              name="resumeUrl"
              placeholder="https://..."
              defaultValue={profile?.resumeUrl ?? ''}
              disabled={isPending}
            />
          </div>

          <Button type="submit" disabled={isPending}>
            {isPending ? <Loader2 className="size-4 animate-spin" /> : 'Save Changes'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}