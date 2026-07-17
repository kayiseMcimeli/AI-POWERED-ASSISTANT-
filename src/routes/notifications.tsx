import { createFileRoute } from "@tanstack/react-router";
import { Send, Sparkles, MessageSquareHeart, Copy, Check } from "lucide-react";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { AppShell, PageHeader } from "@/components/app-shell";
import { FloatingCard, Pill, SectionTitle } from "@/components/ui-kit";
import { generateAssistantResponse } from "@/lib/ai-generate.functions";

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

const DEFAULT_SITUATION = "Route 4B is running 15 minutes late due to traffic";

const FALLBACK_DRAFT = (situation: string) =>
  `Good morning parents 👋\n\nWe want to let you know: ${situation}. Our team is on it and learners remain safe. We will share another update as soon as anything changes.\n\nThank you for your patience and understanding.\n\n— PhoziFlow Transport`;

function NotificationsPage() {
  const [situation, setSituation] = useState(DEFAULT_SITUATION);
  const [draft, setDraft] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const generate = useServerFn(generateAssistantResponse);

  const handleGenerate = async () => {
    if (!situation.trim() || isLoading) return;
    setIsLoading(true);
    setError(null);
    setCopied(false);
    try {
      const result = await generate({
        data: { feature: "notify", prompt: situation.trim() },
      });
      setDraft(result.text);
    } catch (err) {
      setDraft(FALLBACK_DRAFT(situation.trim()));
      setError(
        err instanceof Error
          ? `${err.message} Showing a template draft instead.`
          : "AI generation failed. Showing a template draft instead.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!draft) return;
    try {
      await navigator.clipboard.writeText(draft);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setError("Could not copy to clipboard.");
    }
  };

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
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
            className="mb-4 w-full rounded-xl border border-border bg-white p-3 text-sm outline-none focus:border-[color:var(--purple)]"
          />

          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            AI Draft
          </label>
          <div className="whitespace-pre-wrap rounded-2xl bg-[color:var(--peach-soft)] p-4 text-sm leading-relaxed min-h-[8rem]">
            {isLoading
              ? "Generating draft…"
              : draft
                ? draft
                : "Click Generate to draft a parent notification. Always review AI output before sending."}
          </div>

          {error && (
            <div className="mt-3 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={handleGenerate}
              disabled={isLoading || !situation.trim()}
              className="bg-brand-gradient inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-md disabled:opacity-60"
            >
              <Sparkles className="h-4 w-4" />
              {isLoading ? "Generating…" : draft ? "Regenerate" : "Generate"}
            </button>
            <button
              onClick={handleCopy}
              disabled={!draft || isLoading}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-2 text-sm font-semibold disabled:opacity-60"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied" : "Copy"}
            </button>
            <button
              disabled={!draft || isLoading}
              className="bg-brand-gradient inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-md disabled:opacity-60"
            >
              <Send className="h-4 w-4" /> Send to parents
            </button>
          </div>
        </FloatingCard>

        <FloatingCard>
          <SectionTitle title="Templates" />
          <div className="space-y-3">
            {templates.map((t) => (
              <button
                key={t.title}
                onClick={() => {
                  setSituation(t.title);
                  setDraft(t.body);
                  setError(null);
                  setCopied(false);
                }}
                className="w-full rounded-2xl bg-[color:var(--peach-soft)] p-3 text-left hover:bg-white transition"
              >
                <div className="text-sm font-semibold">{t.title}</div>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{t.body}</p>
              </button>
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
