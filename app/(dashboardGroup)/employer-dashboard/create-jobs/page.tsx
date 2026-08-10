
import { getCategories } from '@/service/getCategories';
import { CreateJobForm } from './_components/create-job-form';

export default async function CreateJobPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-foreground">Post a Job</h1>
        <p className="text-sm text-muted-foreground">
          Fill in the details — your post will go live after admin approval.
        </p>
      </div>

      <CreateJobForm categories={categories} />
    </div>
  );
}