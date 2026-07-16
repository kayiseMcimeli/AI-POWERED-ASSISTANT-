import { createFileRoute } from "@tanstack/react-router";
import {
  Mail,
  MessageCircle,
  Bell,
  ListChecks,
  BrainCircuit,
  LineChart,
  Search,
  Sparkles,
  Send,
} from "lucide-react";
import { useState } from "react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { AiNotice } from "@/components/ai-notice";
import { FloatingCard, Pill, SectionTitle } from "@/components/ui-kit";

export const Route = createFileRoute("/assistant")({
  component: AssistantPage,
});

const features = [
  { key: "email", title: "Smart Email Generator", desc: "Draft professional emails to schools, parents and partners.", icon: Mail },
  { key: "whatsapp", title: "AI WhatsApp Reply Generator", desc: "Turn a quick note into a warm parent reply.", icon: MessageCircle },
  { key: "notify", title: "Parent Notification Generator", desc: "Bulk-friendly notifications for trip updates.", icon: Bell },
  { key: "tasks", title: "AI Task Planner", desc: "Turn today’s to-dos into a prioritised plan.", icon: ListChecks },
  { key: "business", title: "AI Business Assistant", desc: "Ask anything about your operations.", icon: BrainCircuit },
  { key: "revenue", title: "AI Revenue Insights", desc: "Spot growth, risks and cost savings.", icon: LineChart },
  { key: "research", title: "AI Research Assistant", desc: "Research routes, competitors and grants.", icon: Search },
];

function AssistantPage() {
  const [active, setActive] = useState("email");

  return (
    <AppShell>
      <PageHeader
        title="AI Assistant"
        subtitle="Your AI co-pilot for communication, planning and insights."
      />

      <div className="mb-6">
        <AiNotice />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-4">
        <FloatingCard>
          <SectionTitle title="AI Features" />
          <div className="space-y-2">
            {features.map((f) => {
              const Icon = f.icon;
              const isActive = active === f.key;
              return (
                <button
                  key={f.key}
                  onClick={() => setActive(f.key)}
                  className={
                    "flex w-full items-start gap-3 rounded-2xl p-3 text-left transition " +
                    (isActive
                      ? "bg-brand-gradient text-white shadow-md"
                      : "bg-[color:var(--peach-soft)] hover:bg-white")
                  }
                >
                  <div
                    className={
                      "grid h-9 w-9 shrink-0 place-items-center rounded-xl " +
                      (isActive ? "bg-white/20" : "bg-white text-[color:var(--purple-deep)]")
                    }
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold">{f.title}</div>
                    <div className={"text-xs " + (isActive ? "text-white/80" : "text-muted-foreground")}>
                      {f.desc}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </FloatingCard>

        <FloatingCard>
          <SectionTitle
            title={features.find((f) => f.key === active)?.title ?? "Assistant"}
            subtitle="Describe what you need — review AI output before sending."
            action={<Pill tone="lavender"><Sparkles className="mr-1 h-3 w-3" />AI</Pill>}
          />

          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Prompt
          </label>
          <textarea
            rows={4}
            placeholder="e.g. Draft an email to Rondebosch High confirming next term’s pickup times."
            className="w-full rounded-2xl border border-border bg-white p-3 text-sm outline-none focus:border-[color:var(--purple)]"
          />

          <div className="mt-4 flex flex-wrap gap-2">
            <button className="bg-brand-gradient inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-md">
              <Sparkles className="h-4 w-4" /> Generate
            </button>
            <button className="rounded-xl border border-border bg-white px-4 py-2 text-sm font-semibold">
              Clear
            </button>
          </div>

          <div className="mt-6">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              AI Response
            </div>
            <div className="rounded-2xl bg-[color:var(--peach-soft)] p-4 text-sm leading-relaxed text-foreground/80">
              Your generated response will appear here. Always review AI output for
              accuracy, tone and sensitive details before sending to parents,
              schools or partners.
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <button className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-3 py-1.5 text-xs font-semibold">
                <Send className="h-3 w-3" /> Copy
              </button>
              <button className="rounded-xl border border-border bg-white px-3 py-1.5 text-xs font-semibold">
                Regenerate
              </button>
            </div>
          </div>
        </FloatingCard>
      </div>
    </AppShell>
  );
}
