import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate, formatCurrency } from "@/lib/utils";
import { type Job } from "@/types";
import { ArrowRight } from "lucide-react";

const MOCK_JOBS: Job[] = [
  {
    id: "j1",
    title: "HVAC Repair — Compressor Replacement",
    description: "",
    status: "in_progress",
    priority: "urgent",
    customerId: "c1",
    customerName: "Riverside Office Park",
    customerPhone: "555-0101",
    address: "245 River Rd, Suite 300",
    technicianName: "Sarah Chen",
    scheduledAt: "2026-04-28T09:00:00Z",
    estimatedDuration: 240,
    amount: 3200,
    createdAt: "2026-04-27T14:00:00Z",
    updatedAt: "2026-04-28T09:30:00Z",
  },
  {
    id: "j2",
    title: "Drain Clearing — Kitchen Backup",
    description: "",
    status: "scheduled",
    priority: "medium",
    customerId: "c2",
    customerName: "Helen Morrison",
    customerPhone: "555-0102",
    address: "1803 Maple Ave",
    technicianName: "Mike Torres",
    scheduledAt: "2026-04-28T11:00:00Z",
    estimatedDuration: 90,
    amount: 480,
    createdAt: "2026-04-27T16:00:00Z",
    updatedAt: "2026-04-27T16:00:00Z",
  },
  {
    id: "j3",
    title: "Electrical Panel Upgrade",
    description: "",
    status: "pending",
    priority: "high",
    customerId: "c3",
    customerName: "Summit Retail Group",
    customerPhone: "555-0103",
    address: "900 Commerce Blvd",
    estimatedDuration: 480,
    amount: 5800,
    createdAt: "2026-04-28T08:00:00Z",
    updatedAt: "2026-04-28T08:00:00Z",
  },
  {
    id: "j4",
    title: "Roof Inspection — Annual",
    description: "",
    status: "completed",
    priority: "low",
    customerId: "c4",
    customerName: "Westgate Apartments",
    customerPhone: "555-0104",
    address: "55 Westgate Dr",
    technicianName: "Tom Bradley",
    scheduledAt: "2026-04-28T08:00:00Z",
    completedAt: "2026-04-28T10:15:00Z",
    estimatedDuration: 120,
    amount: 650,
    createdAt: "2026-04-25T12:00:00Z",
    updatedAt: "2026-04-28T10:15:00Z",
  },
];

const priorityLabel: Record<string, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  urgent: "Urgent",
};

const priorityColor: Record<string, string> = {
  low: "secondary",
  medium: "warning",
  high: "destructive",
  urgent: "destructive",
};

export function RecentJobs() {
  return (
    <Card>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-base">Recent Jobs</CardTitle>
        <Link href="/dashboard/jobs">
          <Button variant="ghost" size="sm" className="gap-1 text-[#F97316]">
            View all <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E2E8F0]">
                <th className="text-left py-2 pr-4 font-medium text-[#64748B]">Job</th>
                <th className="text-left py-2 pr-4 font-medium text-[#64748B] hidden sm:table-cell">Customer</th>
                <th className="text-left py-2 pr-4 font-medium text-[#64748B] hidden md:table-cell">Technician</th>
                <th className="text-left py-2 pr-4 font-medium text-[#64748B]">Status</th>
                <th className="text-left py-2 pr-4 font-medium text-[#64748B] hidden lg:table-cell">Priority</th>
                <th className="text-right py-2 font-medium text-[#64748B]">Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {MOCK_JOBS.map((job) => (
                <tr key={job.id} className="hover:bg-slate-50">
                  <td className="py-3 pr-4">
                    <Link
                      href={`/dashboard/jobs/${job.id}`}
                      className="font-medium text-[#0C2340] hover:text-[#F97316] line-clamp-1 max-w-[200px]"
                    >
                      {job.title}
                    </Link>
                    <p className="text-xs text-[#64748B] mt-0.5 hidden sm:block">
                      {formatDate(job.scheduledAt ?? job.createdAt)}
                    </p>
                  </td>
                  <td className="py-3 pr-4 hidden sm:table-cell text-[#64748B]">
                    {job.customerName}
                  </td>
                  <td className="py-3 pr-4 hidden md:table-cell text-[#64748B]">
                    {job.technicianName ?? <span className="italic text-slate-400">Unassigned</span>}
                  </td>
                  <td className="py-3 pr-4">
                    <Badge variant={job.status as never}>
                      {job.status.replace("_", " ")}
                    </Badge>
                  </td>
                  <td className="py-3 pr-4 hidden lg:table-cell">
                    <Badge variant={priorityColor[job.priority] as never}>
                      {priorityLabel[job.priority]}
                    </Badge>
                  </td>
                  <td className="py-3 text-right font-medium text-[#0C2340]">
                    {job.amount ? formatCurrency(job.amount) : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
