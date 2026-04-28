import {
  Briefcase,
  DollarSign,
  Users,
  ClipboardList,
  Phone,
  Clock,
} from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { RecentJobs } from "@/components/dashboard/recent-jobs";
import { TechnicianStatus } from "@/components/dashboard/technician-status";
import { formatCurrency } from "@/lib/utils";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0C2340]">Dashboard</h1>
        <p className="text-sm text-[#64748B]">Welcome back — here&apos;s what&apos;s happening today.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Active Jobs"
          value={14}
          subtitle="3 urgent"
          icon={Briefcase}
          iconColor="text-[#F97316]"
        />
        <StatCard
          title="Completed Today"
          value={7}
          subtitle="of 12 scheduled"
          icon={Clock}
          iconColor="text-[#16A34A]"
        />
        <StatCard
          title="Revenue MTD"
          value={formatCurrency(48320)}
          change={12}
          icon={DollarSign}
          iconColor="text-[#16A34A]"
        />
        <StatCard
          title="Technicians"
          value="9 / 12"
          subtitle="available today"
          icon={Users}
          iconColor="text-[#0C2340]"
        />
        <StatCard
          title="Pending Quotes"
          value={6}
          subtitle="$12,400 value"
          icon={ClipboardList}
          iconColor="text-[#D97706]"
        />
        <StatCard
          title="Missed Calls"
          value={3}
          subtitle="last 24 hours"
          icon={Phone}
          iconColor="text-[#DC2626]"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div>
          <TechnicianStatus />
        </div>
      </div>

      <RecentJobs />
    </div>
  );
}
