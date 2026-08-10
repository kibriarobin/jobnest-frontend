'use client';

import { useActionState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createJobAction, TCreateJobState } from '../_actions/create-job';
import { ICategory } from '@/lib/type';

const initialState: TCreateJobState = { success: false };

export function CreateJobForm({ categories }: { categories: ICategory[] }) {
  const [state, formAction, isPending] = useActionState(createJobAction, initialState);

  return (
    <Card>
      <CardContent className="p-6">
        <form action={formAction} className="space-y-5">
          {state.message && (
            <div className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {state.message}
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input id="title" name="title" placeholder="Frontend Developer" disabled={isPending} />
              {state.errors?.title && (
                <p className="text-xs text-destructive">{state.errors.title[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoryId">Category</Label>
              <Select name="categoryId" disabled={isPending}>
                <SelectTrigger id="categoryId">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {state.errors?.categoryId && (
                <p className="text-xs text-destructive">{state.errors.categoryId[0]}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              rows={4}
              placeholder="Describe the role, responsibilities, and team..."
              disabled={isPending}
            />
            {state.errors?.description && (
              <p className="text-xs text-destructive">{state.errors.description[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements">Requirements</Label>
            <Textarea
              id="requirements"
              name="requirements"
              rows={4}
              placeholder={'One requirement per line, e.g.\n2+ years of React experience\nStrong TypeScript skills'}
              disabled={isPending}
            />
            {state.errors?.requirements && (
              <p className="text-xs text-destructive">{state.errors.requirements[0]}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" placeholder="Dhaka, Bangladesh" disabled={isPending} />
              {state.errors?.location && (
                <p className="text-xs text-destructive">{state.errors.location[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Job Type</Label>
              <Select name="type" disabled={isPending}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="REMOTE">Remote</SelectItem>
                  <SelectItem value="ONSITE">Onsite</SelectItem>
                  <SelectItem value="HYBRID">Hybrid</SelectItem>
                </SelectContent>
              </Select>
              {state.errors?.type && (
                <p className="text-xs text-destructive">{state.errors.type[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="experienceLevel">Experience Level</Label>
              <Input
                id="experienceLevel"
                name="experienceLevel"
                placeholder="Mid-Level (2-4 years)"
                disabled={isPending}
              />
              {state.errors?.experienceLevel && (
                <p className="text-xs text-destructive">{state.errors.experienceLevel[0]}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="salaryMin">Min Salary (৳)</Label>
              <Input id="salaryMin" name="salaryMin" type="number" placeholder="40000" disabled={isPending} />
              {state.errors?.salaryMin && (
                <p className="text-xs text-destructive">{state.errors.salaryMin[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="salaryMax">Max Salary (৳)</Label>
              <Input id="salaryMax" name="salaryMax" type="number" placeholder="65000" disabled={isPending} />
              {state.errors?.salaryMax && (
                <p className="text-xs text-destructive">{state.errors.salaryMax[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="vacancy">Vacancy</Label>
              <Input id="vacancy" name="vacancy" type="number" defaultValue={1} disabled={isPending} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="deadline">Deadline</Label>
              <Input id="deadline" name="deadline" type="date" disabled={isPending} />
              {state.errors?.deadline && (
                <p className="text-xs text-destructive">{state.errors.deadline[0]}</p>
              )}
            </div>
          </div>

          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Posting...
              </>
            ) : (
              'Post Job'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}