"use client";

import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Phone,
  User,
  Clock,
  Calendar,
  DollarSign,
  AlertCircle,
  CheckCircle2,
  Edit2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDate, formatTime, formatCurrency } from "@/lib/utils";
import { type Job } from "@/types";

const MOCK_JOB: Job = {
  id: "j1",
  title: "HVAC Repair — Compressor Replacement",
  description:
    "Compressor failed completely. Customer reports no cooling for 2 days. Unit is a Carrier 5-ton system installed 2018. Need to inspect and replace compressor. Check refrigerant levels after replacement.",
  status: "in_progress",
  priority: "urgent",
  customerId: "c1",
  customerName: "Riverside Office Park",
  customerPhone: "555-0101",
  address: "245 River Rd, Suite 300",
  technicianId: "t2",
  technicianName: "Sarah Chen",
  scheduledAt: "2026-04-28T09:00:00Z",
  estimatedDuration: 240,
  amount: 3200,
  createdAt: "2026-04-27T14:00:00Z",
  updatedAt: "2026-04-28T09:30:00Z",
};

const STATUS_ACTIONS: Record<string, { label: string; next: string }> = {
  pending: { label: "Schedule Job", next: "scheduled" },
  scheduled: { label: "Start Job", next: "in_progress" },
  in_progress: { label: "Mark Complete", next: "completed" },
  completed: { label: "Completed", next: "" },
};

export default function JobDetailPage() {
  const router = useRouter();
  const job = MOCK_JOB;

  const action = STATUS_ACTIONS[job.status];

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-bold text-[#0C2340] truncate">{job.title}</h1>
          <p className="text-sm text-[#64748B]">Job #{job.id}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={job.status as never}>{job.status.replace("_", " ")}</Badge>
          <Badge
            variant={
              job.priority === "urgent" || job.priority === "high"
                ? "destructive"
                : job.priority === "medium"
                ? "warning"
                : "secondary"
            }
          >
            {job.priority}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {/* Details */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Job Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-[#64748B]">{job.description}</p>
              <Separator />
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-start gap-2">
                  <Calendar className="h-4 w-4 text-[#64748B] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-[#64748B]">Scheduled</p>
                    <p className="font-medium text-[#0C2340]">
                      {job.scheduledAt
                        ? `${formatDate(job.scheduledAt)} at ${formatTime(job.scheduledAt)}`
                        : "Not scheduled"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-[#64748B] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-[#64748B]">Est. Duration</p>
                    <p className="font-medium text-[#0C2340]">
                      {Math.floor(job.estimatedDuration / 60)}h{" "}
                      {job.estimatedDuration % 60 > 0
                        ? `${job.estimatedDuration % 60}m`
                        : ""}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-[#64748B] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-[#64748B]">Location</p>
                    <p className="font-medium text-[#0C2340]">{job.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <DollarSign className="h-4 w-4 text-[#64748B] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-[#64748B]">Job Value</p>
                    <p className="font-medium text-[#0C2340]">
                      {job.amount ? formatCurrency(job.amount) : "TBD"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity Timeline */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <CheckCircle2 className="h-5 w-5 text-[#16A34A]" />
                  <div className="flex-1 w-px bg-[#E2E8F0] my-1" />
                </div>
                <div className="pb-4">
                  <p className="text-sm font-medium text-[#0C2340]">Job created</p>
                  <p className="text-xs text-[#64748B]">
                    {formatDate(job.createdAt)} · {formatTime(job.createdAt)}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <CheckCircle2 className="h-5 w-5 text-[#16A34A]" />
                  <div className="flex-1 w-px bg-[#E2E8F0] my-1" />
                </div>
                <div className="pb-4">
                  <p className="text-sm font-medium text-[#0C2340]">
                    Assigned to {job.technicianName}
                  </p>
                  <p className="text-xs text-[#64748B]">Apr 27, 2026 · 4:30 PM</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <AlertCircle className="h-5 w-5 text-[#F97316]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#0C2340]">
                    Job started — technician on site
                  </p>
                  <p className="text-xs text-[#64748B]">Apr 28, 2026 · 9:30 AM</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Status Action */}
          <Card>
            <CardContent className="p-4 space-y-3">
              {action.next && (
                <Button className="w-full">{action.label}</Button>
              )}
              <Button variant="outline" className="w-full gap-2">
                <Edit2 className="h-4 w-4" />
                Edit Job
              </Button>
              <Button variant="outline" className="w-full text-[#DC2626] hover:text-[#DC2626] hover:border-[#DC2626]">
                Cancel Job
              </Button>
            </CardContent>
          </Card>

          {/* Customer */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-[#64748B] font-medium uppercase tracking-wide">
                Customer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 pt-0">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-[#64748B]" />
                <span className="text-sm font-medium text-[#0C2340]">
                  {job.customerName}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#64748B]" />
                <a
                  href={`tel:${job.customerPhone}`}
                  className="text-sm text-[#F97316] hover:underline"
                >
                  {job.customerPhone}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-[#64748B] mt-0.5" />
                <span className="text-sm text-[#64748B]">{job.address}</span>
              </div>
            </CardContent>
          </Card>

          {/* Technician */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-[#64748B] font-medium uppercase tracking-wide">
                Technician
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {job.technicianName ? (
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-[#1E3A5F] flex items-center justify-center text-white text-xs font-medium">
                    SC
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#0C2340]">
                      {job.technicianName}
                    </p>
                    <p className="text-xs text-[#64748B]">On site</p>
                  </div>
                </div>
              ) : (
                <Button variant="outline" size="sm" className="w-full">
                  Assign Technician
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
