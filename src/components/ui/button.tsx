import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[#F97316] text-white hover:bg-[#EA6B0A] shadow",
        destructive:
          "bg-[#DC2626] text-white hover:bg-red-700 shadow-sm",
        outline:
          "border border-[#E2E8F0] bg-white hover:bg-slate-50 hover:text-[#0C2340]",
        secondary:
          "bg-[#1E3A5F] text-white hover:bg-[#0C2340]",
        ghost:
          "hover:bg-slate-100 hover:text-[#0C2340]",
        link:
          "text-[#F97316] underline-offset-4 hover:underline",
        navy:
          "bg-[#0C2340] text-white hover:bg-[#1E3A5F]",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
