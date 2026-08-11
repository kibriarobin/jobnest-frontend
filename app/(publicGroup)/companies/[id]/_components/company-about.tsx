import { Card, CardContent } from '@/components/ui/card';

export function CompanyAbout({ description }: { description: string }) {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="font-heading text-lg font-semibold text-foreground">About</h2>
        <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}