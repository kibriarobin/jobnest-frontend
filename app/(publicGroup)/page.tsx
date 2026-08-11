import { getJobs } from '@/service/getJobs';
import { getCategories } from '@/service/getCategories';
import { getPublicStats } from '@/service/getPublicStats';
import { HeroSection } from './_components/hero-section';
import { FeaturedJobsSection } from './_components/featured-jobs-section';
import { CategoriesSection } from './_components/categories-section';
import { HowItWorksSection } from './_components/how-it-works-section';
import { WhyJobNestSection } from './_components/why-jobnest-section';
import { StatsSection } from './_components/stats-section';
import { TestimonialsSection } from './_components/testimonials-section';
import { CtaSection } from './_components/cta-section';

export default async function HomePage() {
  const [jobsResult, categories, stats] = await Promise.all([
    getJobs({ limit: 6 }),
    getCategories(),
    getPublicStats(),
  ]);

  return (
    <>
      <HeroSection />
      <FeaturedJobsSection jobs={jobsResult.jobs} />
      <CategoriesSection categories={categories} />
      <HowItWorksSection />
      <WhyJobNestSection />
      <StatsSection
        totalJobs={stats.totalJobs}
        totalCategories={stats.totalCategories}
        totalCandidates={stats.totalCandidates}
        totalCompanies={stats.totalCompanies}
      />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}