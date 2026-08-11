import { getMe } from '@/service/getMe';
import { BasicInfoForm } from './_components/basic-info-form';

export default async function AdminSettingsPage() {
  const user = await getMe();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your admin account information.</p>
      </div>

      <BasicInfoForm name={user?.name ?? ''} email={user?.email ?? ''} />
    </div>
  );
}