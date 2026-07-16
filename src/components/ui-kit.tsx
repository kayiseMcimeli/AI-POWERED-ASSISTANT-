import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function FloatingCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("card-float p-5", className)}>{children}</div>;
}

export function StatCard({
  label,
  value,
  hint,
  icon,
  accent = "purple",
}: {
  label: string;
  value: string;
  hint?: string;
  icon?: ReactNode;
  accent?: "purple" | "peach" | "lavender";
}) {
  const iconBg =
    accent === "peach"
      ? "bg-[color:var(--peach)] text-[color:var(--purple-deep)]"
      : accent === "lavender"
      ? "bg-[color:var(--lavender)]/40 text-[color:var(--purple-deep)]"
      : "bg-brand-gradient text-white";

  return (
    <FloatingCard>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </div>
          <div className="mt-2 text-2xl md:text-3xl font-bold text-foreground">
            {value}
          </div>
          {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
        </div>
        {icon && (
          <div className={cn("grid h-11 w-11 shrink-0 place-items-center rounded-2xl", iconBg)}>
            {icon}
          </div>
        )}
      </div>
    </FloatingCard>
  );
}

export function SectionTitle({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-3">
      <div className="min-w-0">
        <h2 className="text-lg md:text-xl font-bold">{title}</h2>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function Pill({
  children,
  tone = "lavender",
}: {
  children: ReactNode;
  tone?: "lavender" | "peach" | "green" | "red" | "gray";
}) {
  const styles: Record<string, string> = {
    lavender: "bg-[color:var(--lavender)]/30 text-[color:var(--purple-deep)]",
    peach: "bg-[color:var(--peach)] text-[color:var(--purple-deep)]",
    green: "bg-emerald-100 text-emerald-700",
    red: "bg-rose-100 text-rose-700",
    gray: "bg-slate-100 text-slate-600",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        styles[tone],
      )}
    >
      {children}
    </span>
  );
}
