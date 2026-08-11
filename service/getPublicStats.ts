export async function getPublicStats() {
  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/analytics/public-stats`, {
      next: { revalidate: 120 },
    });

    const result = await res.json();

    if (!result.success) {
      return { totalJobs: 0, totalCategories: 0, totalCandidates: 0, totalCompanies: 0 };
    }

    return result.data;
  } catch {
    return { totalJobs: 0, totalCategories: 0, totalCandidates: 0, totalCompanies: 0 };
  }
}