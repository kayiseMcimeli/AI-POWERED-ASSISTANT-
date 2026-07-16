import { createFileRoute } from "@tanstack/react-router";
import { Building2, Bell, Shield, CreditCard } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { FloatingCard, SectionTitle } from "@/components/ui-kit";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
});

function Toggle({ label, hint, defaultOn = false }: { label: string; hint?: string; defaultOn?: boolean }) {
  return (
    <label className="flex items-start justify-between gap-4 rounded-2xl bg-[color:var(--peach-soft)] p-4 cursor-pointer">
      <div className="min-w-0">
        <div className="text-sm font-semibold">{label}</div>
        {hint && <div className="text-xs text-muted-foreground">{hint}</div>}
      </div>
      <input type="checkbox" defaultChecked={defaultOn} className="peer sr-only" />
      <span className="relative h-6 w-11 shrink-0 rounded-full bg-white border border-border transition peer-checked:bg-[color:var(--purple)] peer-checked:border-[color:var(--purple)]">
        <span className="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition peer-checked:translate-x-5" />
      </span>
    </label>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <input
        defaultValue={value}
        className="w-full rounded-xl border border-border bg-white p-3 text-sm outline-none focus:border-[color:var(--purple)]"
      />
    </div>
  );
}

function SettingsPage() {
  return (
    <AppShell>
      <PageHeader
        title="Settings"
        subtitle="Manage your business profile, notifications and preferences."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <FloatingCard>
          <SectionTitle title="Business profile" subtitle="Public info shown to parents & schools" />
          <div className="grid gap-3">
            <Field label="Business name" value="PhoziFlow Transport" />
            <Field label="Owner" value="Phozi Ndlovu" />
            <Field label="Contact number" value="+27 82 123 4567" />
            <Field label="Email" value="hello@phoziflow.co.za" />
            <Field label="Base city" value="Cape Town" />
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Registered as a school transport & long-distance operator</span>
          </div>
        </FloatingCard>

        <FloatingCard>
          <SectionTitle title="Notifications" subtitle="Choose what PhoziFlow AI alerts you about" />
          <div className="grid gap-3">
            <Toggle label="Daily trip summary" hint="Every evening at 18:00" defaultOn />
            <Toggle label="Payment reminders" hint="Alert when a parent is 7+ days late" defaultOn />
            <Toggle label="AI insights digest" hint="Weekly on Monday mornings" defaultOn />
            <Toggle label="SASSA payout reminders" hint="3 days before payout date" />
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Bell className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Delivered via WhatsApp and email</span>
          </div>
        </FloatingCard>

        <FloatingCard>
          <SectionTitle title="AI preferences" subtitle="How PhoziFlow AI should behave" />
          <div className="grid gap-3">
            <Toggle label="Warm, friendly tone" defaultOn />
            <Toggle label="Always require human review before sending" defaultOn />
            <Toggle label="Include isiXhosa greetings when appropriate" />
            <Toggle label="Suggest revenue opportunities weekly" defaultOn />
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Shield className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              AI output is reviewed by you before parents ever see it.
            </span>
          </div>
        </FloatingCard>

        <FloatingCard>
          <SectionTitle title="Billing plan" />
          <div className="rounded-2xl bg-brand-gradient p-5 text-white">
            <div className="text-xs uppercase tracking-wider opacity-80">Current plan</div>
            <div className="mt-1 text-2xl font-bold">Growth · R 499 / month</div>
            <div className="mt-1 text-sm opacity-90">
              Unlimited AI messages · Up to 25 vehicles · Priority support
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <CreditCard className="h-4 w-4" /> Next invoice on 1 December
          </div>
          <div className="mt-3 flex gap-2">
            <button className="rounded-xl border border-border bg-white px-4 py-2 text-sm font-semibold">
              Change plan
            </button>
            <button className="rounded-xl border border-border bg-white px-4 py-2 text-sm font-semibold">
              Payment methods
            </button>
          </div>
        </FloatingCard>
      </div>
    </AppShell>
  );
}
