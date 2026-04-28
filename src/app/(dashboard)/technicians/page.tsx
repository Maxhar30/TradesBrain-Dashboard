"use client";

import { useState } from "react";
import { Plus, Search, Star, Briefcase, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type Technician } from "@/types";
import { getInitials } from "@/lib/utils";
import { cn } from "@/lib/utils";

const MOCK_TECHNICIANS: Technician[] = [
  {
    id: "t1",
    name: "Mike Torres",
    email: "mike@company.com",
    phone: "555-1001",
    status: "available",
    specializations: ["Plumbing", "HVAC"],
    activeJobs: 0,
    completedJobs: 312,
    rating: 4.9,
  },
  {
    id: "t2",
    name: "Sarah Chen",
    email: "sarah@company.com",
    phone: "555-1002",
    status: "busy",
    specializations: ["HVAC", "Refrigeration"],
    activeJobs: 2,
    completedJobs: 258,
    rating: 4.8,
  },
  {
    id: "t3",
    name: "James Wright",
    email: "james@company.com",
    phone: "555-1003",
    status: "busy",
    specializations: ["Electrical", "Solar"],
    activeJobs: 1,
    completedJobs: 195,
    rating: 4.7,
  },
  {
    id: "t4",
    name: "Ana Reyes",
    email: "ana@company.com",
    phone: "555-1004",
    status: "available",
    specializations: ["Plumbing", "Gas Fitting"],
    activeJobs: 0,
    completedJobs: 144,
    rating: 4.9,
  },
  {
    id: "t5",
    name: "Tom Bradley",
    email: "tom@company.com",
    phone: "555-1005",
    status: "offline",
    specializations: ["Roofing", "Gutters"],
    activeJobs: 0,
    completedJobs: 421,
    rating: 4.6,
  },
  {
    id: "t6",
    name: "Lisa Park",
    email: "lisa@company.com",
    phone: "555-1006",
    status: "busy",
    specializations: ["Electrical", "Smart Home"],
    activeJobs: 3,
    completedJobs: 87,
    rating: 4.8,
  },
];

const statusConfig = {
  available: { label: "Available", color: "bg-[#16A34A]", badge: "success" },
  busy: { label: "On Job", color: "bg-[#F97316]", badge: "default" },
  offline: { label: "Offline", color: "bg-slate-300", badge: "secondary" },
} as const;

export default function TechniciansPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = MOCK_TECHNICIANS.filter((t) => {
    const matchStatus = statusFilter === "all" || t.status === statusFilter;
    const matchSearch =
      !search ||
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.specializations.some((s) =>
        s.toLowerCase().includes(search.toLowerCase())
      );
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#0C2340]">Technicians</h1>
          <p className="text-sm text-[#64748B]">
            {MOCK_TECHNICIANS.filter((t) => t.status === "available").length} available ·{" "}
            {MOCK_TECHNICIANS.filter((t) => t.status === "busy").length} on job ·{" "}
            {MOCK_TECHNICIANS.filter((t) => t.status === "offline").length} offline
          </p>
        </div>
        <Button className="sm:self-start">
          <Plus className="h-4 w-4 mr-2" />
          Add Technician
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B]" />
          <Input
            placeholder="Search by name or skill..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="busy">On Job</SelectItem>
            <SelectItem value="offline">Offline</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((tech) => {
          const config = statusConfig[tech.status];
          return (
            <Card key={tech.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12 shrink-0">
                    <AvatarFallback className="text-sm">
                      {getInitials(tech.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold text-[#0C2340] truncate">
                        {tech.name}
                      </p>
                      <div className="flex items-center gap-1 shrink-0">
                        <span
                          className={cn(
                            "h-2 w-2 rounded-full",
                            config.color
                          )}
                        />
                        <span className="text-xs text-[#64748B]">
                          {config.label}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {tech.specializations.map((s) => (
                        <span
                          key={s}
                          className="text-xs bg-slate-100 text-[#64748B] px-2 py-0.5 rounded-full"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs">
                  <div>
                    <div className="flex items-center justify-center gap-1 text-[#F97316]">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      <span className="font-semibold">{tech.rating}</span>
                    </div>
                    <p className="text-[#64748B] mt-0.5">Rating</p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#0C2340]">{tech.activeJobs}</p>
                    <p className="text-[#64748B] mt-0.5">Active</p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#0C2340]">{tech.completedJobs}</p>
                    <p className="text-[#64748B] mt-0.5">Completed</p>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 gap-1.5">
                    <Briefcase className="h-3.5 w-3.5" />
                    Assign Job
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1.5" asChild>
                    <a href={`tel:${tech.phone}`}>
                      <Phone className="h-3.5 w-3.5" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-12 text-[#64748B]">
            No technicians found.
          </div>
        )}
      </div>
    </div>
  );
}
