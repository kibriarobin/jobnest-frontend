import { getMe } from '@/service/getMe';
import { CompanyForm } from './_components/company-form';

export default async function CompanySettingsPage() {
  const user = await getMe();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-foreground">
          Company Settings
        </h1>
        <p className="text-sm text-muted-foreground">
          Update how your company appears to candidates.
        </p>
      </div>

      <CompanyForm company={user?.company ?? null} />
    </div>
  );
}