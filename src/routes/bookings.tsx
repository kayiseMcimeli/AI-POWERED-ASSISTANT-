import { createFileRoute } from "@tanstack/react-router";
import { Plus, MapPin, Calendar } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { FloatingCard, Pill, SectionTitle } from "@/components/ui-kit";

export const Route = createFileRoute("/bookings")({
  component: BookingsPage,
});

const bookings = [
  { ref: "BK-1042", customer: "Mrs. Ndlovu", type: "Long-distance", from: "Cape Town", to: "Mthatha", date: "12 Nov", pax: 4, price: "R 3,200", status: "Confirmed" },
  { ref: "BK-1041", customer: "Sipho Nkosi", type: "School", from: "Gugulethu", to: "SACS", date: "Recurring", pax: 1, price: "R 1,450 / mo", status: "Active" },
  { ref: "BK-1040", customer: "Ayanda Group", type: "Charter", from: "CPT Airport", to: "Stellenbosch", date: "14 Nov", pax: 12, price: "R 4,800", status: "Pending" },
  { ref: "BK-1039", customer: "Mrs. Khumalo", type: "Long-distance", from: "Cape Town", to: "Port Elizabeth", date: "18 Nov", pax: 2, price: "R 2,600", status: "Confirmed" },
];

function BookingsPage() {
  return (
    <AppShell>
      <PageHeader
        title="Bookings"
        subtitle="Charter, long-distance and recurring school trips."
        actions={
          <button className="bg-brand-gradient inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-md">
            <Plus className="h-4 w-4" /> New booking
          </button>
        }
      />

      <FloatingCard>
        <SectionTitle title="Upcoming bookings" subtitle="Latest 4 records" />
        <div className="grid gap-3">
          {bookings.map((b) => (
            <div
              key={b.ref}
              className="grid gap-3 rounded-2xl border border-border/60 bg-[color:var(--peach-soft)] p-4 md:grid-cols-[1fr_auto] md:items-center"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <Pill tone="lavender">{b.type}</Pill>
                  <span className="text-xs text-muted-foreground">{b.ref}</span>
                  <Pill tone={b.status === "Confirmed" || b.status === "Active" ? "green" : "peach"}>
                    {b.status}
                  </Pill>
                </div>
                <div className="mt-1 font-semibold">{b.customer}</div>
                <div className="mt-1 flex flex-wrap gap-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {b.from} → {b.to}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {b.date}
                  </span>
                  <span>{b.pax} pax</span>
                </div>
              </div>
              <div className="text-right">
                <div className="font-display text-xl font-bold text-[color:var(--purple-deep)]">
                  {b.price}
                </div>
                <button className="mt-1 text-xs font-semibold text-[color:var(--purple)]">
                  View details →
                </button>
              </div>
            </div>
          ))}
        </div>
      </FloatingCard>
    </AppShell>
  );
}
