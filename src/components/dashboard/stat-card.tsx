import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: number;
  icon: LucideIcon;
  iconColor?: string;
}

export function StatCard({
  title,
  value,
  subtitle,
  change,
  icon: Icon,
  iconColor = "text-[#F97316]",
}: StatCardProps) {
  const isPositive = change !== undefined && change >= 0;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-[#64748B]">{title}</p>
            <p className="mt-1 text-2xl font-bold text-[#0C2340]">{value}</p>
            {subtitle && (
              <p className="mt-0.5 text-xs text-[#64748B]">{subtitle}</p>
            )}
            {change !== undefined && (
              <div
                className={cn(
                  "mt-2 flex items-center gap-1 text-xs font-medium",
                  isPositive ? "text-[#16A34A]" : "text-[#DC2626]"
                )}
              >
                {isPositive ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {Math.abs(change)}% vs last month
              </div>
            )}
          </div>
          <div className={cn("p-2.5 rounded-lg bg-slate-50", iconColor)}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
