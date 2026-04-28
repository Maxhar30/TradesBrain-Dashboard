import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-[#F97316] text-white",
        secondary: "border-transparent bg-slate-100 text-slate-800",
        destructive: "border-transparent bg-[#DC2626] text-white",
        outline: "text-slate-700",
        success: "border-transparent bg-[#16A34A] text-white",
        warning: "border-transparent bg-[#D97706] text-white",
        navy: "border-transparent bg-[#0C2340] text-white",
        pending: "border-transparent bg-amber-100 text-amber-800",
        scheduled: "border-transparent bg-blue-100 text-blue-800",
        in_progress: "border-transparent bg-purple-100 text-purple-800",
        completed: "border-transparent bg-green-100 text-green-800",
        cancelled: "border-transparent bg-slate-100 text-slate-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
