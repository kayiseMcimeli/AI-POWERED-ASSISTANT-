import { createFileRoute } from "@tanstack/react-router";
import { Bus, Wrench, Fuel, Plus } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { FloatingCard, Pill } from "@/components/ui-kit";

export const Route = createFileRoute("/fleet")({
  component: FleetPage,
});

const fleet = [
  { name: "Toyota Quantum · CA 123-456", driver: "Bongani M.", seats: 15, status: "On route", fuel: 72, next: "Service in 800km" },
  { name: "Toyota Hiace · CA 789-012", driver: "Nomsa T.", seats: 14, status: "Available", fuel: 90, next: "OK" },
  { name: "Nissan NV350 · CA 345-678", driver: "Sipho K.", seats: 16, status: "Maintenance", fuel: 30, next: "Brake pads" },
  { name: "Mercedes Sprinter · CA 901-234", driver: "Lindiwe P.", seats: 22, status: "Long-distance", fuel: 55, next: "Trip to Mthatha" },
  { name: "Toyota Quantum · CA 567-890", driver: "Unassigned", seats: 15, status: "Available", fuel: 100, next: "OK" },
];

function FleetPage() {
  return (
    <AppShell>
      <PageHeader
        title="Fleet"
        subtitle="Vehicles, drivers and maintenance at a glance."
        actions={
          <button className="bg-brand-gradient inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-md">
            <Plus className="h-4 w-4" /> Add vehicle
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {fleet.map((v) => (
          <FloatingCard key={v.name}>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <div className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-gradient text-white">
                    <Bus className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="truncate font-semibold">{v.name}</div>
                    <div className="text-xs text-muted-foreground">Driver: {v.driver}</div>
                  </div>
                </div>
              </div>
              <Pill
                tone={
                  v.status === "Available"
                    ? "green"
                    : v.status === "Maintenance"
                    ? "red"
                    : "lavender"
                }
              >
                {v.status}
              </Pill>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl bg-[color:var(--peach-soft)] p-3">
                <div className="text-xs text-muted-foreground">Seats</div>
                <div className="font-semibold">{v.seats}</div>
              </div>
              <div className="rounded-xl bg-[color:var(--peach-soft)] p-3">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Fuel className="h-3 w-3" /> Fuel
                </div>
                <div className="mt-1 h-2 rounded-full bg-white">
                  <div
                    className="h-full rounded-full bg-brand-gradient"
                    style={{ width: `${v.fuel}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <Wrench className="h-3 w-3" /> {v.next}
            </div>
          </FloatingCard>
        ))}
      </div>
    </AppShell>
  );
}
