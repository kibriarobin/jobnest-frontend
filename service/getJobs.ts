export async function getJobs(params?: {
  searchTerm?: string;
  category?: string;
  location?: string;
  type?: string;
  sort?: string;
  page?: number;
  limit?: number;
}) {
  const searchParams = new URLSearchParams();

  if (params?.searchTerm) searchParams.set('searchTerm', params.searchTerm);
  if (params?.category) searchParams.set('category', params.category);
  if (params?.location) searchParams.set('location', params.location);
  if (params?.type) searchParams.set('type', params.type);
  if (params?.page) searchParams.set('page', String(params.page));
  if (params?.limit) searchParams.set('limit', String(params.limit));

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/jobs?${searchParams.toString()}`,
      { next: { revalidate: 30 } }
    );

    const result = await res.json();

    if (!result.success) {
      return { jobs: [], total: 0, page: 1, limit: 9 };
    }

    let jobs = result.data;

    if (params?.sort === 'salary-high') {
      jobs = [...jobs].sort((a, b) => b.salaryMax - a.salaryMax);
    }

    return {
      jobs,
      total: result.meta.total,
      page: result.meta.page,
      limit: result.meta.limit,
    };
  } catch {
    return { jobs: [], total: 0, page: 1, limit: 9 };
  }
}