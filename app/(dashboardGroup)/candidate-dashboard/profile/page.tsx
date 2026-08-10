import { getMe } from '@/service/getMe';
import { BasicInfoForm } from './_components/basic-info-form';
import { CandidateDetailsForm } from './_components/candidate-details-form';

export default async function CandidateProfilePage() {
  const user = await getMe();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-foreground">Profile</h1>
        <p className="text-sm text-muted-foreground">
          Keep your information up to date so employers can find you.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <BasicInfoForm name={user?.name ?? ''} email={user?.email ?? ''} />
        <CandidateDetailsForm profile={user?.candidateProfile ?? null} />
      </div>
    </div>
  );
}