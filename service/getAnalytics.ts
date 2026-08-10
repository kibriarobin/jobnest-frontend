import { cookies } from 'next/headers';

async function fetchAnalytics(endpoint: string) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/analytics/${endpoint}`, {
      headers: { Cookie: `accessToken=${accessToken}` },
      cache: 'no-store',
    });

    const result = await res.json();

    if (!result.success) {
      return null;
    }

    return result.data;
  } catch {
    return null;
  }
}

export async function getCandidateOverview() {
  return fetchAnalytics('candidate-overview');
}

export async function getEmployerOverview() {
  return fetchAnalytics('employer-overview');
}

export async function getAdminOverview() {
  return fetchAnalytics('admin-overview');
}