import { ICompanyDetail, TRole } from '@/lib/type';
import { CompanyReviewItem } from './company-review-item';
import { WriteReviewDialog } from './write-review-dialog';

export function CompanyReviewsSection({
  companyId,
  reviews,
  userRole,
}: {
  companyId: string;
  reviews: ICompanyDetail['reviews'];
  userRole?: TRole;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-xl font-semibold text-foreground">Reviews</h2>
        {userRole === 'CANDIDATE' && <WriteReviewDialog companyId={companyId} />}
      </div>

      {reviews.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">No reviews yet.</p>
      ) : (
        <div className="mt-4">
          {reviews.map((review) => (
            <CompanyReviewItem
              key={review.id}
              rating={review.rating}
              comment={review.comment}
              createdAt={review.createdAt}
            />
          ))}
        </div>
      )}
    </div>
  );
}