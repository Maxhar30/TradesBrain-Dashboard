import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

const technicians = [
  { name: "Mike Torres", status: "available", jobs: 0 },
  { name: "Sarah Chen", status: "busy", jobs: 2 },
  { name: "James Wright", status: "busy", jobs: 1 },
  { name: "Ana Reyes", status: "available", jobs: 0 },
  { name: "Tom Bradley", status: "offline", jobs: 0 },
  { name: "Lisa Park", status: "busy", jobs: 3 },
];

type Status = "available" | "busy" | "offline";

const statusConfig: Record<Status, { label: string; dot: string }> = {
  available: { label: "Available", dot: "bg-[#16A34A]" },
  busy: { label: "On Job", dot: "bg-[#F97316]" },
  offline: { label: "Offline", dot: "bg-slate-300" },
};

export function TechnicianStatus() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Technicians Today</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {technicians.map((tech) => {
          const config = statusConfig[tech.status as Status];
          return (
            <div key={tech.name} className="flex items-center gap-3">
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className="text-xs">
                  {getInitials(tech.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#0C2340] truncate">
                  {tech.name}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
                  <span className="text-xs text-[#64748B]">
                    {config.label}
                    {tech.jobs > 0 && ` · ${tech.jobs} job${tech.jobs > 1 ? "s" : ""}`}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
