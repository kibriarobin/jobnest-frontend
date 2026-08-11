import { Star } from 'lucide-react';

export function CompanyReviewItem({
  rating,
  comment,
  createdAt,
}: {
  rating: number;
  comment?: string | null;
  createdAt: string;
}) {
  return (
    <div className="border-b border-border py-4 last:border-0">
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`size-4 ${i < rating ? 'fill-accent text-accent' : 'text-muted'}`}
          />
        ))}
      </div>
      {comment && <p className="mt-2 text-sm text-muted-foreground">{comment}</p>}
      <p className="mt-1 text-xs text-muted-foreground">
        {new Date(createdAt).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })}
      </p>
    </div>
  );
}