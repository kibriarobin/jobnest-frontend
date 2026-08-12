'use client';

import { useState, useTransition } from 'react';
import { Loader2, Pencil } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { updateCategoryAction } from '../_actions/category-actions';
import { IAdminCategory } from '@/lib/type';

export function EditCategoryDialog({ category }: { category: IAdminCategory }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const boundAction = updateCategoryAction.bind(null, category.id);

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const result = await boundAction({ success: false }, formData);

      if (result.success) {
        toast.success(result.message);
        setOpen(false);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>
        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Category Name</Label>
            <Input
              id="edit-name"
              name="name"
              defaultValue={category.name}
              disabled={isPending}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-icon">Icon (emoji, optional)</Label>
            <Input
              id="edit-icon"
              name="icon"
              defaultValue={category.icon ?? ''}
              disabled={isPending}
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? <Loader2 className="size-4 animate-spin" /> : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}