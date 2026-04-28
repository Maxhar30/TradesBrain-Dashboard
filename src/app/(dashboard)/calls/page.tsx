"use client";

import { useState } from "react";
import { PhoneIncoming, PhoneOutgoing, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDate, formatTime } from "@/lib/utils";
import { type Call } from "@/types";
import { cn } from "@/lib/utils";

const MOCK_CALLS: Call[] = [
  {
    id: "call1",
    customerId: "c1",
    customerName: "Riverside Office Park",
    customerPhone: "555-0101",
    type: "inbound",
    status: "answered",
    duration: 284,
    jobId: "j1",
    notes: "Customer called to check on job status. Reassured them technician is en route.",
    createdAt: "2026-04-28T08:45:00Z",
  },
  {
    id: "call2",
    customerId: "c7",
    customerName: "Frank Deluca",
    customerPhone: "555-0107",
    type: "inbound",
    status: "missed",
    createdAt: "2026-04-28T09:12:00Z",
  },
  {
    id: "call3",
    customerId: "c2",
    customerName: "Helen Morrison",
    customerPhone: "555-0102",
    type: "outbound",
    status: "answered",
    duration: 92,
    jobId: "j2",
    notes: "Called to confirm appointment for 11 AM drain clearing.",
    createdAt: "2026-04-28T09:30:00Z",
  },
  {
    id: "call4",
    customerId: "c8",
    customerName: "New Inquiry",
    customerPhone: "555-0108",
    type: "inbound",
    status: "voicemail",
    createdAt: "2026-04-28T10:00:00Z",
  },
  {
    id: "call5",
    customerId: "c3",
    customerName: "Summit Retail Group",
    customerPhone: "555-0103",
    type: "outbound",
    status: "answered",
    duration: 421,
    jobId: "j3",
    notes: "Discussed electrical panel upgrade timeline and permit requirements.",
    createdAt: "2026-04-28T10:30:00Z",
  },
  {
    id: "call6",
    customerId: "c9",
    customerName: "Maria Santos",
    customerPhone: "555-0109",
    type: "inbound",
    status: "missed",
    createdAt: "2026-04-28T11:05:00Z",
  },
];

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function CallsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = MOCK_CALLS.filter((c) => {
    const matchStatus = filter === "all" || c.status === filter;
    const matchSearch =
      !search ||
      c.customerName.toLowerCase().includes(search.toLowerCase()) ||
      c.customerPhone.includes(search);
    return matchStatus && matchSearch;
  });

  const missedCount = MOCK_CALLS.filter((c) => c.status === "missed").length;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0C2340]">Calls</h1>
          <p className="text-sm text-[#64748B]">
            {missedCount > 0 && (
              <span className="text-[#DC2626] font-medium">{missedCount} missed · </span>
            )}
            {MOCK_CALLS.length} total calls today
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B]" />
          <Input
            placeholder="Search by name or number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Calls</SelectItem>
            <SelectItem value="missed">Missed</SelectItem>
            <SelectItem value="answered">Answered</SelectItem>
            <SelectItem value="voicemail">Voicemail</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        {filtered.map((call) => (
          <Card key={call.id} className={cn(call.status === "missed" && "border-red-200 bg-red-50/30")}>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="flex-shrink-0">
                {call.type === "inbound" ? (
                  <PhoneIncoming
                    className={cn(
                      "h-5 w-5",
                      call.status === "missed"
                        ? "text-[#DC2626]"
                        : "text-[#16A34A]"
                    )}
                  />
                ) : (
                  <PhoneOutgoing className="h-5 w-5 text-[#F97316]" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-semibold text-[#0C2340]">
                    {call.customerName}
                  </p>
                  <Badge
                    variant={
                      call.status === "missed"
                        ? "destructive"
                        : call.status === "voicemail"
                        ? "warning"
                        : "success"
                    }
                  >
                    {call.status}
                  </Badge>
                  <span className="text-xs text-[#64748B] capitalize">
                    {call.type}
                  </span>
                </div>
                <p className="text-sm text-[#64748B]">{call.customerPhone}</p>
                {call.notes && (
                  <p className="text-xs text-[#64748B] mt-1 line-clamp-1">
                    {call.notes}
                  </p>
                )}
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs text-[#64748B]">
                  {formatTime(call.createdAt)}
                </p>
                <p className="text-xs text-[#64748B]">
                  {formatDate(call.createdAt)}
                </p>
                {call.duration && (
                  <p className="text-xs font-medium text-[#0C2340] mt-1">
                    {formatDuration(call.duration)}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-[#64748B]">No calls found.</div>
        )}
      </div>
    </div>
  );
}
