import { Layers } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { serverFetch } from '@/lib/server-fetch';
import { IAdminCategory } from '@/lib/type';
import { CreateCategoryDialog } from './_components/create-category-dialog';
import { EditCategoryDialog } from './_components/edit-category-dialog';
import { DeleteCategoryButton } from './_components/delete-category-button';

export default async function ManageCategoriesPage() {
  const { result } = await serverFetch('/api/categories');
  const categories: IAdminCategory[] = result.success ? result.data : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-foreground">
            Manage Categories
          </h1>
          <p className="text-sm text-muted-foreground">
            Job categories available across the platform.
          </p>
        </div>
        <CreateCategoryDialog />
      </div>

      {categories.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16 text-center">
          <Layers className="size-8 text-muted-foreground" />
          <p className="mt-3 text-sm text-muted-foreground">No categories yet.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Icon</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Jobs Posted</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((cat) => (
                <TableRow key={cat.id}>
                  <TableCell className="text-lg">{cat.icon || '📁'}</TableCell>
                  <TableCell className="font-medium">{cat.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {cat._count.jobs}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <EditCategoryDialog category={cat} />
                      <DeleteCategoryButton categoryId={cat.id} jobCount={cat._count.jobs} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}