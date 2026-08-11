export async function getJobDetail(jobId: string) {
  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/jobs/${jobId}`, {
      next: { revalidate: 30 },
    });

    if (!res.ok) {
      return null;
    }

    const result = await res.json();
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}