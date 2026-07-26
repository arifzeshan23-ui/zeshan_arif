import * as React from "react";
import { cn } from "@/lib/utils";

const Badge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "outline" | "primary" }
>(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default: "bg-white/5 text-foreground border border-white/10",
    outline: "bg-transparent text-primary border border-primary/30",
    primary: "bg-primary/10 text-primary border border-primary/20",
  };
  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  );
});
Badge.displayName = "Badge";

export { Badge };
