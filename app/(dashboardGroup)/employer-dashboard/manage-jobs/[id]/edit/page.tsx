import { notFound } from 'next/navigation';
import { getCategories } from '@/service/getCategories';
import { getJobById } from '@/service/getJobById';
import { EditJobForm } from './_components/edit-job-form';

export default async function EditJobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [categories, job] = await Promise.all([getCategories(), getJobById(id)]);

  if (!job) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-foreground">Edit Job</h1>
        <p className="text-sm text-muted-foreground">Update the details of this job post.</p>
      </div>

      <EditJobForm categories={categories} job={job} />
    </div>
  );
}