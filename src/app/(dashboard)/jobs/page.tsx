"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDate, formatCurrency } from "@/lib/utils";
import { type Job } from "@/types";
import { JobCard } from "@/components/dashboard/job-card";
import { NewJobDialog } from "@/components/dashboard/new-job-dialog";

const MOCK_JOBS: Job[] = [
  {
    id: "j1",
    title: "HVAC Repair — Compressor Replacement",
    description: "Compressor failed. Customer reports no cooling for 2 days.",
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
    description: "Slow drain in kitchen sink, possible grease blockage.",
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
    title: "Electrical Panel Upgrade — 200A",
    description: "Customer wants 200A panel to support EV charger install.",
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
    description: "Yearly roof inspection for property management company.",
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
  {
    id: "j5",
    title: "Boiler Service — Annual Maintenance",
    description: "Annual boiler inspection and service.",
    status: "scheduled",
    priority: "medium",
    customerId: "c5",
    customerName: "City Library District",
    customerPhone: "555-0105",
    address: "100 Central Ave",
    technicianName: "James Wright",
    scheduledAt: "2026-04-29T09:00:00Z",
    estimatedDuration: 180,
    amount: 1100,
    createdAt: "2026-04-20T10:00:00Z",
    updatedAt: "2026-04-20T10:00:00Z",
  },
  {
    id: "j6",
    title: "Emergency Water Leak — Pipe Burst",
    description: "Burst pipe under kitchen sink, water shutoff already done.",
    status: "in_progress",
    priority: "urgent",
    customerId: "c6",
    customerName: "Marcus Webb",
    customerPhone: "555-0106",
    address: "77 Oak Street",
    technicianName: "Ana Reyes",
    scheduledAt: "2026-04-28T07:30:00Z",
    estimatedDuration: 120,
    amount: 920,
    createdAt: "2026-04-28T07:00:00Z",
    updatedAt: "2026-04-28T07:30:00Z",
  },
];

const STATUS_TABS: { value: string; label: string }[] = [
  { value: "all", label: "All Jobs" },
  { value: "pending", label: "Pending" },
  { value: "scheduled", label: "Scheduled" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];

export default function JobsPage() {
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("all");
  const [view, setView] = useState<"board" | "list">("board");
  const [newJobOpen, setNewJobOpen] = useState(false);

  const filteredJobs = (status: string) =>
    MOCK_JOBS.filter((j) => {
      const matchStatus = status === "all" || j.status === status;
      const matchSearch =
        !search ||
        j.title.toLowerCase().includes(search.toLowerCase()) ||
        j.customerName.toLowerCase().includes(search.toLowerCase());
      const matchPriority = priority === "all" || j.priority === priority;
      return matchStatus && matchSearch && matchPriority;
    });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#0C2340]">Jobs</h1>
          <p className="text-sm text-[#64748B]">{MOCK_JOBS.length} total jobs</p>
        </div>
        <Button onClick={() => setNewJobOpen(true)} className="sm:self-start">
          <Plus className="h-4 w-4 mr-2" />
          New Job
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B]" />
          <Input
            placeholder="Search jobs or customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={priority} onValueChange={setPriority}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="urgent">Urgent</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex rounded-md border border-[#E2E8F0] overflow-hidden">
          <button
            onClick={() => setView("board")}
            className={`px-3 py-1.5 text-sm font-medium transition-colors ${
              view === "board"
                ? "bg-[#0C2340] text-white"
                : "bg-white text-[#64748B] hover:bg-slate-50"
            }`}
          >
            Board
          </button>
          <button
            onClick={() => setView("list")}
            className={`px-3 py-1.5 text-sm font-medium transition-colors border-l border-[#E2E8F0] ${
              view === "list"
                ? "bg-[#0C2340] text-white"
                : "bg-white text-[#64748B] hover:bg-slate-50"
            }`}
          >
            List
          </button>
        </div>
      </div>

      {/* Board view */}
      {view === "board" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {["pending", "scheduled", "in_progress", "completed"].map((status) => {
            const jobs = filteredJobs(status);
            return (
              <div key={status} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-[#0C2340] capitalize">
                    {status.replace("_", " ")}
                  </h3>
                  <span className="text-xs bg-slate-100 text-[#64748B] rounded-full px-2 py-0.5 font-medium">
                    {jobs.length}
                  </span>
                </div>
                <div className="space-y-3">
                  {jobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                  {jobs.length === 0 && (
                    <div className="rounded-lg border-2 border-dashed border-[#E2E8F0] p-4 text-center text-sm text-[#64748B]">
                      No jobs
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List view */
        <Tabs defaultValue="all">
          <TabsList>
            {STATUS_TABS.map((t) => (
              <TabsTrigger key={t.value} value={t.value}>
                {t.label}
                <span className="ml-1.5 text-xs opacity-70">
                  ({filteredJobs(t.value).length})
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
          {STATUS_TABS.map((t) => (
            <TabsContent key={t.value} value={t.value}>
              <Card>
                <CardContent className="p-0">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#E2E8F0]">
                        <th className="text-left p-4 font-medium text-[#64748B]">Job</th>
                        <th className="text-left p-4 font-medium text-[#64748B] hidden sm:table-cell">Customer</th>
                        <th className="text-left p-4 font-medium text-[#64748B] hidden md:table-cell">Technician</th>
                        <th className="text-left p-4 font-medium text-[#64748B]">Status</th>
                        <th className="text-left p-4 font-medium text-[#64748B] hidden lg:table-cell">Priority</th>
                        <th className="text-right p-4 font-medium text-[#64748B]">Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0]">
                      {filteredJobs(t.value).map((job) => (
                        <tr key={job.id} className="hover:bg-slate-50">
                          <td className="p-4">
                            <Link
                              href={`/dashboard/jobs/${job.id}`}
                              className="font-medium text-[#0C2340] hover:text-[#F97316] block"
                            >
                              {job.title}
                            </Link>
                            <p className="text-xs text-[#64748B] mt-0.5">
                              {formatDate(job.scheduledAt ?? job.createdAt)}
                            </p>
                          </td>
                          <td className="p-4 hidden sm:table-cell text-[#64748B]">
                            {job.customerName}
                          </td>
                          <td className="p-4 hidden md:table-cell text-[#64748B]">
                            {job.technicianName ?? (
                              <span className="italic text-slate-400">Unassigned</span>
                            )}
                          </td>
                          <td className="p-4">
                            <Badge variant={job.status as never}>
                              {job.status.replace("_", " ")}
                            </Badge>
                          </td>
                          <td className="p-4 hidden lg:table-cell">
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
                          </td>
                          <td className="p-4 text-right font-medium text-[#0C2340]">
                            {job.amount ? formatCurrency(job.amount) : "—"}
                          </td>
                        </tr>
                      ))}
                      {filteredJobs(t.value).length === 0 && (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-[#64748B]">
                            No jobs found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      )}

      <NewJobDialog open={newJobOpen} onOpenChange={setNewJobOpen} />
    </div>
  );
}
