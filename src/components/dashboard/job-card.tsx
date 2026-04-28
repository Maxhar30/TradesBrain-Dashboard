import Link from "next/link";
import { MapPin, User, Clock, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { type Job } from "@/types";
import { formatTime, formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

const priorityStyles: Record<string, string> = {
  urgent: "border-l-4 border-l-[#DC2626]",
  high: "border-l-4 border-l-[#F97316]",
  medium: "border-l-4 border-l-[#D97706]",
  low: "border-l-4 border-l-slate-300",
};

export function JobCard({ job }: { job: Job }) {
  return (
    <Link href={`/dashboard/jobs/${job.id}`}>
      <Card
        className={cn(
          "hover:shadow-md transition-shadow cursor-pointer",
          priorityStyles[job.priority]
        )}
      >
        <CardContent className="p-4 space-y-2.5">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-semibold text-[#0C2340] leading-snug line-clamp-2">
              {job.title}
            </p>
            {job.priority === "urgent" && (
              <AlertCircle className="h-4 w-4 text-[#DC2626] shrink-0 mt-0.5" />
            )}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
              <User className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{job.customerName}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{job.address}</span>
            </div>
            {job.scheduledAt && (
              <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                <Clock className="h-3.5 w-3.5 shrink-0" />
                <span>{formatTime(job.scheduledAt)}</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-[#64748B]">
              {job.technicianName ?? (
                <span className="italic text-slate-400">Unassigned</span>
              )}
            </span>
            {job.amount && (
              <span className="text-xs font-semibold text-[#0C2340]">
                {formatCurrency(job.amount)}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
