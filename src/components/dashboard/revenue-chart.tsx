"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { month: "Nov", revenue: 32000, jobs: 48 },
  { month: "Dec", revenue: 28000, jobs: 41 },
  { month: "Jan", revenue: 35000, jobs: 52 },
  { month: "Feb", revenue: 41000, jobs: 61 },
  { month: "Mar", revenue: 38000, jobs: 57 },
  { month: "Apr", revenue: 48320, jobs: 72 },
];

function formatRevenue(value: number) {
  return `$${(value / 1000).toFixed(0)}k`;
}

export function RevenueChart() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Revenue Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F97316" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: "#64748B" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={formatRevenue}
              tick={{ fontSize: 12, fill: "#64748B" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              formatter={(value) =>
                [`$${Number(value).toLocaleString()}`, "Revenue"]
              }
              contentStyle={{
                border: "1px solid #E2E8F0",
                borderRadius: "8px",
                fontSize: "13px",
              }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#F97316"
              strokeWidth={2}
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
