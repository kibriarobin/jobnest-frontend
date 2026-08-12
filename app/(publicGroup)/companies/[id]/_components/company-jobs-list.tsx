import Link from "next/link";
import { Briefcase } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ICompanyDetail } from "@/lib/type";

export function CompanyJobsList({ jobs }: { jobs: ICompanyDetail["jobs"] }) {
  return (
    <div>
      <h2 className="font-heading text-xl font-semibold text-foreground">
        Open Positions
      </h2>

      {jobs.length === 0 ? (
        <div className="mt-4 flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-12 text-center">
          <Briefcase className="size-6 text-muted-foreground" />
          <p className="mt-2 text-sm text-muted-foreground">
            No open positions right now.
          </p>
        </div>
      ) : (
        <div className="mt-4 flex flex-col gap-3">
          {jobs.map((job) => (
            <Link key={job.id} href={`/jobs/${job.id}`} className="block">
              <Card className="transition-shadow hover:shadow-sm">
                <CardContent className="flex items-center justify-between p-4">
                  <p className="font-medium text-foreground">{job.title}</p>
                  <span className="text-xs text-muted-foreground">
                    {new Date(job.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                    })}
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
