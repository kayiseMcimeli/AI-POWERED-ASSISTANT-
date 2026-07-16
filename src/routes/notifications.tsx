import { createFileRoute } from "@tanstack/react-router";
import { Send, Sparkles, MessageSquareHeart } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { FloatingCard, Pill, SectionTitle } from "@/components/ui-kit";

export const Route = createFileRoute("/notifications")({
  component: NotificationsPage,
});

const templates = [
  { title: "Trip delay", body: "Good morning parents, Route 4B is running 15 min late due to traffic on N2. Safety first — thank you for your patience." },
  { title: "Payment reminder", body: "Hi {{parent}}, this is a friendly reminder that {{learner}}’s November transport fee (R{{amount}}) is due. Please pay by Friday." },
  { title: "Route change", body: "Dear parents, from Monday Route 2A pickup will move from Corner Street to Main Road, 5 min earlier." },
];

const sent = [
  { to: "All Route 4B parents", when: "Today · 07:20", preview: "Route 4B running 15 min late…", status: "Delivered" },
  { to: "Mrs. Ndlovu", when: "Yesterday", preview: "Charter confirmation to Mthatha…", status: "Read" },
  { to: "Route 2A group", when: "2 days ago", preview: "New pickup point starting Monday…", status: "Delivered" },
];

function NotificationsPage() {
  return (
    <AppShell>
      <PageHeader
        title="Parent Notifications"
        subtitle="Generate, review and send messages to parents."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <FloatingCard className="lg:col-span-2">
          <SectionTitle
            title="Parent Notification Generator"
            subtitle="AI drafts messages — always review before sending"
            action={<Pill tone="lavender"><Sparkles className="mr-1 h-3 w-3" />AI</Pill>}
          />

          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Situation
          </label>
          <input
            defaultValue="Route 4B is running 15 minutes late due to traffic"
            className="mb-4 w-full rounded-xl border border-border bg-white p-3 text-sm outline-none focus:border-[color:var(--purple)]"
          />

          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            AI Draft
          </label>
          <div className="rounded-2xl bg-[color:var(--peach-soft)] p-4 text-sm leading-relaxed">
            <p>Good morning parents 👋</p>
            <p className="mt-2">
              Route 4B is currently running about 15 minutes late due to heavy
              traffic on the N2. Our driver is safe and on the way — learners will
              be dropped off shortly. Thank you for your patience and understanding.
            </p>
            <p className="mt-2 text-muted-foreground">— PhoziFlow Transport</p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button className="bg-brand-gradient inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-md">
              <Send className="h-4 w-4" /> Send to Route 4B parents
            </button>
            <button className="rounded-xl border border-border bg-white px-4 py-2 text-sm font-semibold">
              Regenerate
            </button>
            <button className="rounded-xl border border-border bg-white px-4 py-2 text-sm font-semibold">
              Edit
            </button>
          </div>
        </FloatingCard>

        <FloatingCard>
          <SectionTitle title="Templates" />
          <div className="space-y-3">
            {templates.map((t) => (
              <div key={t.title} className="rounded-2xl bg-[color:var(--peach-soft)] p-3">
                <div className="text-sm font-semibold">{t.title}</div>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{t.body}</p>
              </div>
            ))}
          </div>
        </FloatingCard>
      </div>

      <FloatingCard>
        <SectionTitle title="Recent messages" />
        <div className="divide-y divide-border/60">
          {sent.map((s) => (
            <div key={s.to + s.when} className="flex items-center gap-3 py-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[color:var(--lavender)]/40 text-[color:var(--purple-deep)]">
                <MessageSquareHeart className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="font-medium">{s.to}</div>
                  <span className="text-xs text-muted-foreground">{s.when}</span>
                </div>
                <div className="truncate text-sm text-muted-foreground">{s.preview}</div>
              </div>
              <Pill tone="green">{s.status}</Pill>
            </div>
          ))}
        </div>
      </FloatingCard>
    </AppShell>
  );
}
