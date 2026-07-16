import { createFileRoute } from "@tanstack/react-router";
import {
  Bus,
  GraduationCap,
  CalendarClock,
  Wallet,
  AlertCircle,
  CalendarDays,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { AiNotice } from "@/components/ai-notice";
import { FloatingCard, StatCard, SectionTitle, Pill } from "@/components/ui-kit";

export const Route = createFileRoute("/")({
  component: DashboardPage,
});

const stats = [
  { label: "Today’s Trips", value: "24", hint: "6 morning · 18 afternoon", icon: <CalendarClock className="h-5 w-5" />, accent: "purple" as const },
  { label: "Learners Transported", value: "312", hint: "Across 14 schools", icon: <GraduationCap className="h-5 w-5" />, accent: "lavender" as const },
  { label: "Available Taxis", value: "9 / 12", hint: "3 in service now", icon: <Bus className="h-5 w-5" />, accent: "peach" as const },
  { label: "Revenue This Month", value: "R 148,320", hint: "+12% vs last month", icon: <Wallet className="h-5 w-5" />, accent: "purple" as const },
  { label: "Outstanding Payments", value: "R 22,450", hint: "17 parents pending", icon: <AlertCircle className="h-5 w-5" />, accent: "peach" as const },
  { label: "Upcoming SASSA Dates", value: "3 Dec", hint: "Grant payout in 5 days", icon: <CalendarDays className="h-5 w-5" />, accent: "lavender" as const },
];

const aiSuggestions = [
  { title: "Reroute Route 4B", body: "Detected 22 min delay on N2. Suggest splitting into 4B-1 and 4B-2 tomorrow.", tag: "Ops" },
  { title: "Send payment reminders", body: "17 parents overdue. Draft warm WhatsApp messages ready for review.", tag: "Finance" },
  { title: "Weekend charter opportunity", body: "3 long-distance requests to Mthatha. Estimated R6,800 revenue.", tag: "Growth" },
];

function DashboardPage() {
  return (
    <AppShell>
      <PageHeader
        title="Good morning, Phozi 👋"
        subtitle="Here’s what your transport business looks like today."
        actions={
          <button className="bg-brand-gradient inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-md hover:opacity-95">
            <Sparkles className="h-4 w-4" /> Ask AI
          </button>
        }
      />

      <div className="mb-6">
        <AiNotice />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        <FloatingCard className="lg:col-span-2">
          <SectionTitle
            title="AI Suggestions"
            subtitle="Recommendations based on your operations this week"
            action={<Pill tone="lavender">Live</Pill>}
          />
          <div className="grid gap-3">
            {aiSuggestions.map((a) => (
              <div
                key={a.title}
                className="flex items-start justify-between gap-4 rounded-2xl border border-[color:var(--lavender)]/30 bg-[color:var(--peach-soft)] p-4"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <Pill tone="lavender">{a.tag}</Pill>
                    <div className="font-semibold">{a.title}</div>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{a.body}</p>
                </div>
                <button className="shrink-0 rounded-xl bg-white p-2 text-[color:var(--purple-deep)] shadow-sm hover:bg-[color:var(--lavender)]/20">
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </FloatingCard>

        <FloatingCard>
          <SectionTitle title="Today’s Schedule" subtitle="Next 5 trips" />
          <div className="space-y-3">
            {[
              { r: "Route 2A", t: "07:10", d: "Khayelitsha → Rondebosch High", s: "On route" },
              { r: "Route 4B", t: "07:35", d: "Gugulethu → SACS", s: "Boarding" },
              { r: "Charter", t: "09:00", d: "CPT → Mthatha", s: "Scheduled" },
              { r: "Route 1", t: "13:45", d: "School pickup — 12 learners", s: "Scheduled" },
              { r: "Route 3", t: "14:15", d: "School pickup — 18 learners", s: "Scheduled" },
            ].map((t) => (
              <div key={t.r + t.t} className="flex items-center justify-between gap-3 rounded-xl bg-white p-3 border border-border/60">
                <div className="min-w-0">
                  <div className="text-sm font-semibold">{t.r} · {t.t}</div>
                  <div className="truncate text-xs text-muted-foreground">{t.d}</div>
                </div>
                <Pill tone={t.s === "Boarding" ? "peach" : t.s === "On route" ? "green" : "gray"}>{t.s}</Pill>
              </div>
            ))}
          </div>
        </FloatingCard>
      </div>
    </AppShell>
  );
}
