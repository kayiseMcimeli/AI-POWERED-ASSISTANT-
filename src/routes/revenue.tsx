import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, TrendingDown, Sparkles } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { FloatingCard, StatCard, SectionTitle, Pill } from "@/components/ui-kit";

export const Route = createFileRoute("/revenue")({
  component: RevenuePage,
});

const bars = [
  { m: "Jun", v: 42 },
  { m: "Jul", v: 58 },
  { m: "Aug", v: 71 },
  { m: "Sep", v: 63 },
  { m: "Oct", v: 88 },
  { m: "Nov", v: 100 },
];

const streams = [
  { label: "School Transport", value: "R 92,400", pct: 62 },
  { label: "Long-distance Taxi", value: "R 38,720", pct: 26 },
  { label: "Charter & Events", value: "R 17,200", pct: 12 },
];

function RevenuePage() {
  return (
    <AppShell>
      <PageHeader
        title="Revenue"
        subtitle="Track income, outstanding payments and growth trends."
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard
          label="This Month"
          value="R 148,320"
          hint="+12% vs last month"
          icon={<TrendingUp className="h-5 w-5" />}
        />
        <StatCard
          label="Outstanding"
          value="R 22,450"
          hint="17 parents pending"
          icon={<TrendingDown className="h-5 w-5" />}
          accent="peach"
        />
        <StatCard
          label="Projected"
          value="R 172,000"
          hint="End of month (AI)"
          icon={<Sparkles className="h-5 w-5" />}
          accent="lavender"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <FloatingCard className="lg:col-span-2">
          <SectionTitle title="Monthly revenue" subtitle="Last 6 months (ZAR, thousands)" />
          <div className="flex h-56 items-end gap-3 px-2">
            {bars.map((b) => (
              <div key={b.m} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-2xl bg-brand-gradient"
                  style={{ height: `${b.v}%` }}
                />
                <div className="text-xs text-muted-foreground">{b.m}</div>
              </div>
            ))}
          </div>
        </FloatingCard>

        <FloatingCard>
          <SectionTitle title="Revenue streams" />
          <div className="space-y-4">
            {streams.map((s) => (
              <div key={s.label}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium">{s.label}</span>
                  <span className="text-muted-foreground">{s.value}</span>
                </div>
                <div className="h-2 rounded-full bg-[color:var(--peach-soft)]">
                  <div
                    className="h-full rounded-full bg-brand-gradient"
                    style={{ width: `${s.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </FloatingCard>
      </div>

      <FloatingCard>
        <SectionTitle
          title="AI Revenue Insights"
          subtitle="Automated observations — review before acting"
          action={<Pill tone="lavender">AI</Pill>}
        />
        <ul className="space-y-3 text-sm">
          <li className="rounded-2xl bg-[color:var(--peach-soft)] p-4">
            <span className="font-semibold">Growth opportunity: </span>
            Weekend Mthatha route consistently sells out. Adding a Friday afternoon
            departure could add ~R 6,800 / week.
          </li>
          <li className="rounded-2xl bg-[color:var(--peach-soft)] p-4">
            <span className="font-semibold">Risk: </span>
            4 parents on Route 4B are 60+ days overdue. Consider warm reminders
            before month-end.
          </li>
          <li className="rounded-2xl bg-[color:var(--peach-soft)] p-4">
            <span className="font-semibold">Cost saving: </span>
            Fuel spend on vehicle CA 345-678 is 18% above fleet average — worth a
            service check.
          </li>
        </ul>
      </FloatingCard>
    </AppShell>
  );
}
